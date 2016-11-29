var assert = require('assert');
var _ = require('underscore');
var fs = require('fs');
var debug = require('debug')("meta4qa:blueprint");

var self = module.exports = function(learn, config, dialect) {
    assert(learn, "missing learn");
    assert(config, "missing config");

    var Zip = require("./dialect/zip")(learn,config, dialect);
    var Builder = require("./dialect/builder")(learn,config, dialect);

    self.feature = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

        Builder.feature && Builder.feature(dialect,scope);
        Zip.feature && Zip.feature(dialect,scope);
    };

    self.scenario = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

        Builder.scenario && Builder.scenario(dialect,scope);
        Zip.scenario && Zip.scenario(dialect,scope);
    };

    self.annotations = function(dialect, annotations, scope) {
        assert(dialect, "missing dialect");
        assert(annotations, "missing annotations");
        assert(scope, "missing scope");

        Builder.annotations && Builder.annotations(dialect,annotations, scope);
        Zip.annotations && Zip.annotations(dialect,annotations, scope);
    };

    debug("as-built artefacts");
    return self;
};
