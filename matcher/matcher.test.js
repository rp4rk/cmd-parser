const { matcher } = require('./matcher');

test('adds structured matches to the state', () => {
  const state = {};
  const sut = matcher(state);

  sut.addStructuredMatch({
    argumentLabel: 'Test',
    argumentType: 'string',
    argumentValues: '*',
  });

  expect(state.schema.length).toBe(1);
});

test('throws if a structured match has no label', () => {
  const state = {};
  const sut = matcher(state);

  expect(() => {
    sut.addStructuredMatch({
      argumentType: 'number',
    });
  }).toThrow();
});

test('allows all optional values to be omitted', () => {
  const state = {};
  const sut = matcher(state);

  expect(
    sut.addStructuredMatch({
      argumentLabel: 'severity',
    })
  ).toBeTruthy();
});

test('allows for an array of matches', () => {
  const state = {};
  const sut = matcher(state);

  sut.addStructuredMatches([
    {
      argumentLabel: 'severity',
    },
    {
      argumentLabel: 'resolution',
    },
  ]);

  expect(state.schema.length).toEqual(2);
});

test('informs of attempts to insert non arrays', () => {
  const state = {};
  const sut = matcher(state);

  expect(() => sut.addStructuredMatches('not an array!')).toThrow();
});

test('allows for a structured match', () => {
  const state = {
    command: '!test',
  };
  const sut = matcher(state);

  sut.addStructuredMatches([
    { argumentLabel: 'test' },
    { argumentLabel: 'testtwo' },
  ]);

  expect(sut.structuredMatch(['one', 'two'])).toEqual({
    command: '!test',
    test: 'one',
    testtwo: 'two',
  });
});

test('allows schema to not be met fully', () => {
  const state = {
    command: '!test',
  };
  const sut = matcher(state);

  sut.addStructuredMatches([
    { argumentLabel: 'test' },
    { argumentLabel: 'testtwo' },
    { argumentLabel: 'testthree' },
  ]);

  expect(sut.structuredMatch(['one', 'two'])).toEqual({
    command: '!test',
    test: 'one',
    testtwo: 'two',
  });
});

test('exits early if no schema is available', () => {
  const state = {
    command: '!test',
    schema: [],
  };
  const sut = matcher(state);

  expect(() => sut.structuredMatch([1])).toThrow();
});

test('does not allow for wrong type matching', () => {
  const state = {
    command: '!test',
  };
  const sut = matcher(state);

  sut.addStructuredMatches([
    {
      argumentLabel: 'string',
      argumentType: 'string',
    },
    {
      argumentLabel: 'number',
      argumentType: 'number',
    },
  ]);

  expect(() => sut.structuredMatch(['this is a string', 'two'])).toThrow();
});

test('does not allow for wrong value matching', () => {
  const state = {
    command: '!test',
  };
  const sut = matcher(state);

  sut.addStructuredMatch({
    argumentLabel: 'test',
    argumentValues: ['one', 'two'],
  });

  expect(() => sut.structuredMatch(['three'])).toThrow();
});

test('allows for value matching', () => {
  const state = {
    command: '!test',
  };
  const sut = matcher(state);

  sut.addStructuredMatch({
    argumentLabel: 'test',
    argumentValues: ['one', 'two'],
  });

  expect(sut.structuredMatch(['one'])).toEqual({
    command: '!test',
    test: 'one',
  });

  expect(sut.structuredMatch(['two'])).toEqual({
    command: '!test',
    test: 'two',
  });
});
