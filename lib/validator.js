// Validator
// =========

'use strict';

// Dependencies
// ------------

var fs = require('fs');
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



// Validate an object with the json schemas.
//
// header - Object
//
// Returns undefined if it's valid or an array of errors.
function validate(header) {

    Object.keys(schemas).forEach(function (name) {
        validator.addSchema(schemas[name], '/' + name);
    });

    var result = validator.validate(header, schemas.config, {
        throwError: false
    });

    if (result.errors.length > 0) {
        return result.errors;
    }
}

// Export
// ------

module.exports = validate;
