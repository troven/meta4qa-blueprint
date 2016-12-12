var pkg = require("../../package");
var assert = require('assert');
var request = require('request');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('meta4qa:dialect:builder');
var log = require('debug')('meta4qa:log');
var error = require('debug')('meta4qa:error');

var meta4qa = require('meta4qa'), helps = meta4qa.helpers, files = helps.files, http = helps.http, _ = meta4qa._;

/**
 * Builder
 * Configures the Gherkin parser with phrases that support generating software assets
 *
 * @module Default Dialect
 * @class Builder
 *
 */

var self = module.exports = function(learn, config, dialect) {
    assert(learn, "missing learn");
    assert(config, "missing config");
    assert(dialect, "missing dialect");
    assert(helps, "missing helpers");

    config = _.defaults({ blueprint: {} }, config);
    config.paths.blueprints = config.paths.blueprints || config.blueprint.from || "";
    config.paths.target = config.paths.target || config.blueprint.to || "./as.built";

    debug("learning to build");

    learn.when(["I build $blueprint", "I build some $blueprint"], function(recipe, done) {
        var from = this.paths.blueprints || config.blueprint.from, to = this.paths.target || config.blueprint.to;

        assert(from, "Missing blueprint path");
        assert(to, "Missing blueprint target path");

        debug("blueprint: %s -> %s", from, to)
        from = helps.build.path(from , recipe);
        to = helps.build.path(to, recipe);

        assert( helps.files.exists(from), "Blueprint source is missing: "+from);
        debug("building: %s  --> %s", from, to);

        var ctx = _.extend({}, this.vars, {self: this });
        helps.build.assets(from, to, ctx, done);
    });

    learn.when(["I build $blueprint as $name", "I build some $blueprint as $name"], function(recipe, name, done) {
        var from = this.paths.blueprints || config.blueprint.from, to = this.paths.target || config.blueprint.to;
        assert(from, "Missing blueprint path");
        assert(to, "Missing blueprint target path");

        from = helps.build.path(from, recipe);
        to = helps.build.path(to, name);

        debug("blueprint %s: %s -> %s", recipe, from, to)
        assert( helps.files.exists(from), "Blueprint source is missing: "+from);

        var ctx = _.extend({}, this.vars, {self: this });
        debug("building: %s -> %s  --> %s", recipe, from, to);

        helps.build.assets(from, to, ctx, done);
    });

    // **********************************************************************
    // * Dialect Controller
    // **********************************************************************

    self.feature = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

    };

    self.scenario = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

    };
    self.annotations = function(dialect, annotations, scope) {
    }

    debug("builds building blueprints");
    return self;
}

