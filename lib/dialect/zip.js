var assert = require('assert');
var _ = require('underscore');
var debug = require('debug')("dialect:zip");
var zips = require('../helpers/zip.js');
var meta4qa = require('meta4qa'), helps = meta4qa.helpers;

/**
 * ZIP Tools
 * Configures the Yadda parser with phrases that support operations on ZIP archives
 *
 * @module Blueprint Dialect
 * @class ZIP Tools
 *
 */

var self = module.exports = function(learn, config, dialect) {

    learn.when(["I unzip $zip to $folder"], function(folder, archive, done) {
        assert(folder, "Missing folder");
        assert(archive, "Missing ZIP");

        folder = helps.files.path(this.paths.files, folder);
        archive = helps.files.path(this.paths.files, archive);
        assert(helps.files.exists(archive), "ZIP does not exist: "+archive);

        debug("zip %s -> %s", folder, archive);

        zips.unzip(archive, folder, done);
    });

    learn.when(["I read zip $zip", "I open zip $zip"], function(archive, done) {
        assert(archive, "Missing ZIP");

        archive = helps.files.path(this.paths.files, archive);
        assert(helps.files.exists(archive), "ZIP does not exist: "+archive);
        var zip = this.vars.zip = {};
        zip.entries = zips.entries(archive);
        done && done();
    });

    learn.when(["I read $path zip $zip", "I open $path zip $zip"], function(name, archive, done) {
        assert(archive, "Missing ZIP");

        var root = this.paths[name] || config.paths[name] || helps.vars.get(this.vars,name) || helps.vars.get(this,name);
        assert(root, "Missing root folder: "+name);

        archive = helps.files.path(root, archive);
        assert(helps.files.exists(archive), "ZIP does not exist: "+archive);

        var zip = this.vars.zip = {};
        zip.entries = zips.entries(archive);
        done && done();
    });

    learn.when(["I zip $folder to $zip", "I zip $folder as $zip"], function(folder, archive, done) {
        assert(folder, "Missing folder");
        assert(archive, "Missing ZIP");

        folder = helps.files.path(this.paths.files, folder);
        assert(helps.files.exists(folder), "Folder not found: "+folder);

        archive = helps.files.path(this.paths.files, archive);
        assert(!helps.files.exists(archive), "Zip already exists: "+archive);
        var self = this;

        debug("ZIP %s -> %s", folder, archive);
        zips.archive(archive, folder, function() {
            var zip = self.vars.zip = {};
            zip.entries = zips.entries(archive);
            done && done();
        });
    });

    learn.when(["I zip $name $folder to $zip", "I zip $name $folder as $zip"], function(name, folder, archive, done) {
        assert(name, "Missing path name");
        assert(folder, "Missing folder");
        assert(archive, "Missing ZIP");

        var root = this.paths[name] || config.paths[name] || helps.vars.get(this.vars,name) || helps.vars.get(this,name);
        assert(root, "Missing root folder: "+name);

        folder = helps.files.path(root, folder);
        assert(helps.files.exists(folder), "Folder not found: "+folder);

        archive = helps.files.path(root, archive);
        assert(!helps.files.exists(archive), "ZIP already exists: "+archive);

        debug("ZIP (%s) %s -> %s", name, folder, archive);
        zips.archive(archive, folder, done);
    });

    learn.then(["I zip contains $file"], function(archive, done) {

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
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");
    }

    return self;
}


