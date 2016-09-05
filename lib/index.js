var _ = require('underscore');
var assert = require('assert');
var debug = require('debug')("apigeek:blueprint");

module.exports = function(learn, config) {
    assert(learn, "missing learn");
    assert(config, "missing config");


    learn.given(["I use $frag flow"], function(frag, done) {
        assert(frag, "Missing flow fragment");

        this.edge = _.extend({ flows: [] }, this.edge);
        this.edge.flows.push(frag);

        done && done();
    });

    learn.given(["I build an edge proxy"], function(done) {
        assert(frag, "Missing flow fragment");

        done && done();
    });

    debug("builds artefacts");
    return {
        annotations: function(dialect, annotations, scope) {
        }
    }
};
