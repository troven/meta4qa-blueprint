var ApiGeek = require('apigeek-dialect'), helps = ApiGeek.helpers;
var assert = require("assert");
var debug = require("debug");
var AdmZip = require('adm-zip');

var zips = helps.zip = module.exports;

zips.archive = function(archive, folder, done) {
    assert(archive, "missing archive filename");
    assert(folder, "missing folder");

    assert(!helps.files.exists(archive), "archive already exists: "+folder);
    assert(helps.files.exists(folder), "folder not found: "+folder);
    assert(helps.files.isFolder(folder), "folder is a file: "+folder);

    var zipped = new AdmZip();

    helps.files.follow(folder,
        function(file) {
            zipped.addLocalFile(file);
        }, function() {
            zipped.writeZip(archive);
            done && done();
        }
    );
}