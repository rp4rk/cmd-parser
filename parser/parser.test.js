const { register, parser, CmdParser } = require('./parser');

test('registers command to state', () => {
  const state = {};
  const sut = register(state);

  sut.addCommand('!ping');

  expect(state['!ping']).toBeTruthy();
});

test('prevents duplicate commands', () => {
  const state = {};
  const sut = register(state);

  sut.addCommand('!ping');

  expect(() => sut.addCommand('!ping')).toThrow();
});

test('fetches a command from the register', () => {
  const state = {};
  const sut = register(state);

  sut.addCommand('!ping');

  expect(sut.command('!ping')).toBeTruthy();
});

test('throws an error if it cannot fetch the desired command', () => {
  const state = {};
  const sut = register(state);

  expect(() => sut.command('!ping')).toThrow();
});


test('throws if command does not exist', () => {
  const state = {};
  const sut = parser(state);

  expect(() => sut.parse('!alien')).toThrow();
});

test('integrates with everything as expected', () => {
  const parser = CmdParser();

  parser
    .addCommand('!ping')
    .addStructuredMatch({
      argumentLabel: 'username',
      type: 'string',
    })
    .addStructuredMatch({
      argumentLabel: 'message',
      type: 'string',
    });

  expect(parser.parse('!ping ryan "stop that"')).toEqual({
    command: '!ping',
    username: 'ryan',
    message: 'stop that',
  });
});
