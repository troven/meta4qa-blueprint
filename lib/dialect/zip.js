var assert = require('assert');
var _ = require('underscore');
var debug = require('debug')("dialect:zip");
var zips = require('../helpers/zip.js');
var ApiGeek = require('apigeek-dialect'), helps = ApiGeek.helpers;

/**
 * ZIP Tools
 * Configures the Yadda parser with phrases that support operations on ZIP archives
 *
 * @module Blueprint Dialect
 * @class ZIP Tools
 *
 */

module.exports = function(learn, config) {

    learn.when(["I zip $folder to $zip", "I zip $folder as $zip"], function(folder, archive, done) {
        folder = helps.files.path(this.files, folder);
        archive = helps.files.path(this.files, archive);

        debug("zip %s -> %s", folder, archive);
        zips.archive(archive, folder, done);
    });

}


