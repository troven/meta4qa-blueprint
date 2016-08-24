var _ = require('underscore');
var assert = require('assert');
var debug = require('debug')("dialect:blueprint");

module.exports = function(learn, config) {

    debug("builds artefacts");
    return {
        annotations: function(dialect, annotations, scope) {
        }
    }
};
