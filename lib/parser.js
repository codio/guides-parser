// Parser
// ======


// Dependencies
// ------------

var _ = require('lodash');
var yaml = require('js-yaml');
var Validator = require('jsonschema').Validator;
var validator = new Validator();
var configSchema = require('../schemas/config.json');

var parser = module.exports = {};


// Parse a given string.
//
// input    - String.
// filename - String, optional specifies the filename for errors.
//
// Returns an object
//   header - Object, containing the front matter information.
//   body   - String, the rest of the original string.
parser.parse = function (input, filename) {
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
};


function extractFrontMatter(input) {
    var re = /^(-{3}(?:\n|\r)([\w\W]+?)-{3})?([\w\W]*)*/;
    var result = re.exec(input);


    return {
        frontMatter: result[2],
        body: (result[3] || '').replace(/^\n/, '')
    };
}


function validate(header) {

    var schemas = [
        'title',
        'file',
        'files',
        'layout',
        'editable'
    ];

    _.forEach(schemas, function (name) {
        var schema = require('../schemas/' + name + '.json');
        validator.addSchema(schema, '/' + name);
    });

    var result = validator.validate(header, configSchema, {
        throwError: false
    });

    if (!_.isEmpty(result.errors)) {
        return result.errors;
    }
}
