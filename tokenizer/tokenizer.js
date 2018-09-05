const matchExp = /"[^"]*"|'[^']*'|\S+/g

const tokenize = str => {
  if (typeof str !== 'string' || str && !str.length)
    throw new Error('Invalid input to tokenizer.');
  return str.match(matchExp).map(str => str.replace(/^"|"$|^'|'$/g,''))
}

module.exports = {
  tokenize,
};
