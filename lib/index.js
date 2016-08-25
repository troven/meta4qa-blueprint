var _ = require('underscore');
var assert = require('assert');
var debug = require('debug')("dialect:blueprint");

module.exports = function(learn, config) {
    assert(learn, "missing learn");
    assert(config, "missing config");

    debug("builds artefacts");
    return {
        annotations: function(dialect, annotations, scope) {
        }
    }
};
