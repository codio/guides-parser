# Codio Guides Parser


## Usage

```js
var parser = require('guides-parser');

var input = [
  '---',
  'title: Hello world',
  '---',
  'this is me'
].join('\n');

var result = parser.parse(input);

//  result = {
//    header: {
//      title: 'Hello world'
//    }
//    body: 'this is me'
//  }
//
```


## Development


Run test suite.

```bash
$ npm test
```
