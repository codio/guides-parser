// Parser
// ======


// Dependencies
// ------------

var _ = require('lodash');
var fs = require('fs');
var yaml = require('js-yaml');
var Validator = require('jsonschema').Validator;
var validator = new Validator();

// No dynamic loading as browserify doesn't support that yet :(
var schemas = {
    config: JSON.parse(fs.readFileSync(__dirname + '/../schemas/config.json', 'utf8')),
    title: JSON.parse(fs.readFileSync(__dirname + '/../schemas/title.json', 'utf8')),
    file: JSON.parse(fs.readFileSync(__dirname + '/../schemas/file.json', 'utf8')),
    files: JSON.parse(fs.readFileSync(__dirname + '/../schemas/files.json', 'utf8')),
    layout: JSON.parse(fs.readFileSync(__dirname + '/../schemas/layout.json', 'utf8')),
    editable: JSON.parse(fs.readFileSync(__dirname + '/../schemas/editable.json', 'utf8'))
};

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

    _.forEach(_.keys(schemas), function (name) {
        validator.addSchema(schemas[name], '/' + name);
    });

    var result = validator.validate(header, schemas.config, {
        throwError: false
    });

    if (!_.isEmpty(result.errors)) {
        return result.errors;
    }
}
