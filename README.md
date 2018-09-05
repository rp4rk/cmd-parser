# What is this?
A structured command parser, allowing for a somewhat rigid interpretation of command strings of varying types. Developed to make Discord bots a little less of a pain.

## Examples
###  Basic
```js
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

  const testString = `!ping ryan "Remember to set your alarm tonight!"`;

  parser.parse(testString);
  /** Result
    {
      command: '!ping',
      username: 'ryan',
      message: 'stop that',
    }
  */
```

### Set inputs
Sometimes, it's better to match to a limited set of options:
```js
  const parser = CmdParser();

  parser
    .addCommand('!alarm')
    .addStructuredMatch({
      argumentLabel: 'operation',
      argumentType: 'string',
      argumentValues: ['add', 'remove'],
    })
    .addStructuredMatch({
      argumentLabel: 'time',
      argumentType: 'number',
    });

  const testString = `!alarm add 0830"`;

  parser.parse(testString);
  /** Result
    {
      command: '!alarm',
      operation: 'add',
      time: 0830,
    }
  */

```

### Error Handling
We just throw an error when any exception to our rules is found:
```js
  parser
    .addCommand('!alarm')
    .addStructuredMatch({
      argumentLabel: 'operation',
      argumentType: 'string',
      argumentValues: ['add', 'remove'],
    })
    .addStructuredMatch({
      argumentLabel: 'time',
      argumentType: 'number',
    });

  try {
    parser.parse('!alarm destroy now');
  } catch (error) {
    logLibrary.sendOff(error);
  }
```


