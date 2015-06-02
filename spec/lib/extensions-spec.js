// Copyright (c) 2015, EMC Corporation
/* jshint node:true */

'use strict';

describe('Extensions', function () {
    helper.before();
    helper.after();

    describe('String', function () {
        it('should format string literals', function () {
            "Hello %s".format('World').should.equal('Hello World');
        });

        it ('should format multiple string literals', function () {
            "%s %s".format('Hello', 'World').should.equal('Hello World');
        });
    });
});