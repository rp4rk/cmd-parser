const { tokenize } = require('./tokenizer');

test('should find the corresponding closing quotation', () => {
  expect(tokenize(`!test normal 'quote value' "double quote" "have some 'mixed quotes'"`)).toEqual([
    '!test',
    'normal',
    'quote value',
    'double quote',
    `have some 'mixed quotes'`
  ]);
});

test('should throw on an error if invalid input', () => {
  expect(tokenize).toThrowError();
  expect(() => tokenize([1, 2, 3])).toThrowError();
  expect(() => tokenize({ invalid: 'object' })).toThrowError();
});

