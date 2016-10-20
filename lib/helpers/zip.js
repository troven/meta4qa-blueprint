var ApiGeek = require('apigeek-dialect'), helps = ApiGeek.helpers;
var assert = require("assert");
var debug = require("debug")("apigeek:zip");
var path = require("path");
var _ = require("underscore");
var AdmZip = require('adm-zip');

var zips = helps.zip = module.exports;


zips.contains = function(archive, paths, done) {
    assert(archive, "missing archive filename");
    assert(helps.files.exists(archive), "archive does not exist: "+archive);
    assert(paths, "missing paths");
    assert(_.isArray(paths), "invalid paths");

    debug("UNZIP: %s -> %j", archive, paths);

    var zipped = new AdmZip(archive);
    var found = false;
    _.each(paths, function(name) {
        var entry = zipped.getEntry(name);
        debug("zip entry: %j", entry);
    })
}

zips.archive = function(archive, folder, done) {
    assert(archive, "missing archive filename");
    assert(folder, "missing folder");

    assert(!helps.files.exists(archive), "archive already exists: "+archive);
    assert(helps.files.exists(folder), "folder not found: "+folder);
    assert(helps.files.isFolder(folder), "folder is a file: "+folder);

    var excludeRootFolder = (folder.endsWith("/") || folder.endsWith("\\"));
    var rootFolder = excludeRootFolder?folder:path.dirname(folder)+"/";
    // debug("ZIP: %s (%s) -> %s", folder, rootFolder, archive);

    var zipped = new AdmZip();

    helps.files.follow(folder,
        function(file) {
            var zipFile = file.substring(rootFolder.length);
//debug("ZIP add: %s -> %s", file, zipFile);
            zipped.addLocalFile(file, "", zipFile);
        }, function() {
            debug("ZIP write: %s -> %s", folder, archive);
            zipped.writeZip(archive);
            done && done();
        }
    );
}

zips.entries = function(archive) {
    assert(archive, "missing archive filename");
    assert(helps.files.exists(archive), "archive does not exist: "+archive);

    var zipped = new AdmZip(archive);
    var entries = zipped.getEntries();
    var found = _.map(entries, function(v,k) {
        return _.pick(v, ["entryName", "name", "isDirectory", "header"]);
    })
//    debug("ZIP entries: %s -> %j", archive, found);
    return entries;
}
//
// zips.unzip = function(archive, folder, done) {
//     assert(archive, "missing archive filename");
//     assert(helps.files.exists(archive), "archive does not exist: "+archive);
//     assert(folder, "missing folder");
//     assert(done, "Missing callback");
//
//     debug("UNZIP: %s -> %j", archive, paths);
//
//     var zipped = new AdmZip(archive);
//     var found = false;
//     _.each(paths, function(name) {
//         var entry = zipped.getEntry(name);
//         debug("zip entry: %j", entry);
//     })
//     done && done();
// }
//
