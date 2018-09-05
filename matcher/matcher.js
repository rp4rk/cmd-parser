const { isWildcard, typeParse, isType } = require('../utils/types');

const Matcher = command => {
  const state = {
    command,
    schema: [],
  };

  return {
    ...matcher(state),
  };
};

const matcher = state => ({
  structuredMatch: function(tokens, command = state.command) {
    if (state.schema.length === 0)
      throw new Error('No schema to attempt a structured match.');

    const structuredResults = state.schema.reduce(
      (acc, schema, idx) => {
        if (!tokens[idx]) return acc;

        const value = typeParse(tokens[idx], schema.argumentType);

        // Check for a type match
        if (
          !value ||
          (!isType(value, schema.argumentType) && schema.argumentType)
        ) {
          throw new Error(
            `Argument "${schema.argumentLabel}" for command ${
              state.command
            } is not of the correct type ${schema.argumentType}.`
          );
        }

        // Check for a wildcard match, otherwise ensure the argument value is valid
        if (
          !isWildcard(schema.argumentValues) &&
          !schema.argumentValues.includes(value)
        ) {
          throw new Error(
            `Argument "${schema.argumentLabel}" for command ${
              state.command
            } does not match allowed values.`
          );
        }

        // Return the structured argument
        return {
          ...acc,
          [schema.argumentLabel]: value,
        };
      },
      {
        command,
      }
    );

    return structuredResults;
  },
  addStructuredMatch: function({
    argumentValues = '*',
    argumentLabel,
    argumentType,
  }) {
    if (!argumentLabel)
      throw new Error('Argument label not specified for match.');

    if (!state.schema) {
      state.schema = [];
    }

    state.schema.push({
      argumentLabel,
      argumentValues,
      argumentType,
    });

    return this;
  },
  addStructuredMatches: function(matches) {
    if (!Array.isArray(matches))
      throw new Error('Expected Array to be passed to addStructuredMatches.');

    matches.forEach(this.addStructuredMatch);

    return this;
  },
});

module.exports = {
  Matcher,
  matcher,
};
