var chai = require('chai');
var assert = chai.assert;
var blake2b256 = require('../packages/web3-utils').blake2b256;


describe('web3.blake2b256', function () {
    it('should return blake2b256 with hex prefix', function() {
        test1 = blake2b256('test123');
        test2 = blake2b256('test(int)');
        assert.deepEqual(test1, '0x' + cjsblake2b256('test123', {
            outputLength: 256
        }).toString());
        assert.deepEqual(test2, '0x' + cjsblake2b256('test(int)', {
                outputLength: 256
            }).toString());
    });
    it('should return blake2b256 with hex prefix when hex input', function() {
        var blake2b256Hex = function(value){
            if (value.length > 2 && value.substr(0, 2) === '0x') {
                value = value.substr(2);
            }
            value = CryptoJS.enc.Hex.parse(value);

            return cjsblake2b256(value, {
                outputLength: 256
            }).toString();
        };

        test3 = blake2b256('0x80');
        test4 = blake2b256('0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1');
        assert.deepEqual(test3, '0x' + blake2b256Hex('0x80'));
        assert.deepEqual(test4, '0x' + blake2b256Hex('0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'));
    });
    it('should return blake2b256 with hex prefix when hex input', function() {

        var test = function (v, e, o) {
            it('should encode ' + v + ' to ' + e, function () {
                assert.equal(blake2b256(v, o), e);
            });
        };

        test('test123', '0xf81b517a242b218999ec8eec0ea6e2ddbef2a367a14e93f4a32a39e260f686ad');
        test('test(int)', '0xf4d03772bec1e62fbe8c5691e1a9101e520e8f8b5ca612123694632bf3cb51b1');
        test('0x80', '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421');
        test('0x80', '0x6b03a5eef7706e3fb52a61c19ab1122fad7237726601ac665bd4def888f0e4a0');
        test('0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', '0x82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28');

    });
});
