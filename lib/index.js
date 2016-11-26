var assert = require('assert');
var _ = require('underscore');
var fs = require('fs');
var debug = require('debug')("meta4qa:blueprint");

var self = module.exports = function(learn, config) {
    assert(learn, "missing learn");
    assert(config, "missing config");

    require("./dialect/zip")(learn,config);

    self.feature = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

    };

    self.scenario = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

    };

    self.annotations = function(dialect, annotations, scope) {
        assert(dialect, "missing dialect");
        assert(annotations, "missing annotations");
        assert(scope, "missing scope");

    };

    debug("as-built artefacts");
    return self;
};
