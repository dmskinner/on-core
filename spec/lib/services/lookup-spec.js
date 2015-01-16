// Copyright 2014, Renasar Technologies Inc.
/* jshint node:true */

'use strict';

describe('Lookup Service', function() {
    helper.before(function(context) {
        context.lookupService = helper.injector.get('Services.Lookup');
        context.dhcpProtocol = helper.injector.get('Protocol.Dhcp');
    });

    helper.after();

    it('should lookup the mac address for an IP', function() {
        var self = this;

        function lookupIpLease(ip) {
            if (ip === '10.1.1.2') {
                return '01:01:01:01:01:01';
            }
            if (ip === '10.1.1.3') {
                return '02:02:02:02:02:02';
            }
        }

        return self.dhcpProtocol.subscribeLookupIpLease(lookupIpLease)
            .then(function(subscription) {
                expect(subscription).to.be.ok;
                self.subscription = subscription;
                return self.lookupService.ipAddressToMacAddress('10.1.1.2');
            })
            .then(function(mac) {
                expect(mac).to.equal('01:01:01:01:01:01');
                return self.lookupService.ipAddressToMacAddress('10.1.1.3');
            })
            .then(function(mac) {
                expect(mac).to.equal('02:02:02:02:02:02');
            });
    });

    it('should cache the mac address for an IP', function() {
        var self = this,
            calledOnce = false,
            cachedIp = '10.1.1.4';

        function lookupIpLease() {
            if (calledOnce) {
                return '04:04:04:04:04:04';
            } else {
                calledOnce = true;
                return '03:03:03:03:03:03';
            }
        }

        return self.dhcpProtocol.subscribeLookupIpLease(lookupIpLease)
            .then(function(subscription) {
                expect(subscription).to.be.ok;
                self.subscription = subscription;
                return self.lookupService.ipAddressToMacAddress(cachedIp);
            })
            .then(function(mac) {
                expect(mac).to.equal('03:03:03:03:03:03');
                return self.lookupService.ipAddressToMacAddress(cachedIp);
            })
            .then(function(mac) {
                expect(lookupIpLease()).to.equal('04:04:04:04:04:04');
                expect(mac).to.equal('03:03:03:03:03:03');
            });
    });
});
