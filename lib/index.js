var assert = require('assert');
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var debug = require('debug')("dialect:blueprint");

module.exports = function(learn, config) {

    debug("understands building artefacts");
    return {
        annotations: function(dialect, annotations, scope) {
        }
    }
};
