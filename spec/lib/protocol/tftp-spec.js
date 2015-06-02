// Copyright (c) 2015, EMC Corporation
/* jshint node:true */

'use strict';

describe("TFTP protocol", function () {

    helper.before();

    before(function () {
        this.protocol = helper.injector.get('Protocol.Tftp');
    });

    helper.after();

    it("should return a TFTP protocol", function() {
        expect(this.protocol).to.be.an('Object');
    });

});