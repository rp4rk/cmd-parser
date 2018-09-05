/**
 * Checks if a string is of the 'wildcard' type
 * @param {String} str Check if string is a wildcard matcher
 */
const isWildcard = str => str === '*';

/**
 * Parses potential types from strings
 * @param {Any} val The value to parse
 * @param {String} type The target type
 */
const typeParse = (val, type) => {
  if (!type) return val;

  const typeMap = {
    number: val => Number(val),
    string: val => String(val),
    boolean: val => Boolean(val),
  };

  return typeMap[type](val) || undefined;
};

/**
 * Checks if the provided value matches the type
 * @param {Any} val The value to check
 * @param {String} type The type to check for
 */
const isType = (val, type) => {
  const typeMap = {
    number: val => Number.isFinite(parseFloat(val)) && !Number.isNaN(parseFloat(val)),
    string: val => typeof val === 'string' || val instanceof String,
    boolean: val => typeof Boolean(val) === 'boolean',
  };

  return typeMap[type] && typeMap[type](val) || false;
};


module.exports = {
  isWildcard,
  typeParse,
  isType,
};
