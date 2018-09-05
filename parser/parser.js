const { tokenize } = require('../tokenizer/tokenizer');
const { Matcher } = require('../matcher/matcher');

/**
 * Main class and entrypoint
 */
const CmdParser = () => {
  const state = {
    commands: {},
    structuredMatch: true,
  };

  return {
    ...register(state),
    ...parser(state),
  }
};


/**
 * Register behaviors
 */
const register = state => ({
  addCommand: command => {
    if (state[command]) {
      throw new Error(`Command "${command}" already exists in parser.`);
    };

    state[command] = Matcher(command);

    return state[command];
  },
  command: command => {
    if (!state[command]) {
      throw new Error(`Command "${command}" does not exist.`);
    };

    return state[command];
  }
});


/**
 * Parser behaviors
 */
const parser = state => ({
  parse: function(str) {
    const [command, ...cmdArguments] = tokenize(str);

    const cmdParser = this.command(command);

    return cmdParser.structuredMatch(cmdArguments);
  },
});


module.exports = {
  CmdParser,
  register,
  parser,
}
