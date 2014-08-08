// Extractor
// =========

'use strict';

// Split a string into front matter and content part.
//
// input - String
//
// Returns an object with keys
// frontMatter - String
// body        - String
function extractFrontMatter(input) {
    var re = /^(-{3}(?:\n|\r)([\w\W]+?)-{3})?([\w\W]*)*/;
    var result = re.exec(input);


    return {
        frontMatter: result[2],
        body: (result[3] || '').replace(/^\n/, '')
    };
}

// Export
// ------

module.exports = extractFrontMatter;
