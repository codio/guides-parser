# Codio Guides Parser

[![Build Status](https://travis-ci.org/codio/guides-parser.svg?branch=master)](https://travis-ci.org/codio/guides-parser)

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


## Supported Directives

### `title`

* `required: true`
* `type: string`

### `files`

* `required: false`
* `type: array of objects`

### `layout`

* `required: false`
* `type: string`

### `editable`

* `required: false`
* `type: boolean`


## Examples

See the tests for examples.


## Development

### Build

```bash
$ npm run build
```

### Tests

Run test suite.

```bash
$ npm test
$ karma start --single-run
```
