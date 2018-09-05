const { isWildcard, typeParse, isType } = require('./types');

test('checks if provided string is a wildcard string', () => {
  expect(isWildcard('*')).toBeTruthy();
  expect(isWildcard('/')).toBeFalsy();
});

test('parses types to the intended type', () => {
  expect(typeParse('true', 'boolean')).toEqual(true);
  expect(typeParse('24', 'number')).toEqual(24);
  expect(
    typeParse('everything is a string if you believe in yourself', 'string')
  ).toEqual('everything is a string if you believe in yourself');
});

test('checks if value is a given type', () => {
  expect(isType('true', 'boolean')).toBe(true);
  expect(isType('42', 'number')).toBe(true);
  expect(isType('stringy', 'string')).toBe(true);
  expect(isType(new String('wow!'), 'string')).toBe(true);
});
