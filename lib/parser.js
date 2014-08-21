// Parser
// ======

'use strict';

// Dependencies
// ------------

var yaml = require('js-yaml');
var validate = require('./validator');
var extractFrontMatter = require('./extractor');

// Parse a given string.
//
// input    - String.
// filename - String, optional specifies the filename for errors.
//
// Returns an object
//   header - Object, containing the front matter information.
//   body   - String, the rest of the original string.
function parse (input, filename) {
    var result = {};

    // Parsing

    var split = extractFrontMatter(input);

    result.body = split.body;

    result.header = yaml.load(split.frontMatter, {
        filename: filename
    });

    // Validation

    var errors = validate(result.header);

    if (errors) {
        result.errors = errors;
    }

    return result;
}

function serialize(input, options) {
    return yaml.safeDump(input, options);
}

// Export
// ------

exports.parse = parse;
exports.serialize = serialize;
