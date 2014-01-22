var sdk = require('../lib/sdk');
var should = require('should');

describe('adk', function () {
  describe('auth', function () {
    it('password not ok', function (done) {
      sdk.auth({
        email: 'shyvo1987@gmail.com',
        password: 'incorrect'
      }, function (err, account) {
        should.exist(err);
        err.should.have.property('message', 'wrong_password');
        done();
      });
    });

    it('email not ok', function (done) {
      sdk.auth({
        email: 'shyvo1987xgmail.com',
        password: 'incorrect'
      }, function (err, account) {
        should.exist(err);
        err.should.have.property('message', 'invalidate_email');
        done();
      });
    });

    it('should ok', function (done) {
      sdk.auth({
        email: 'shyvo1987@gmail.com',
        password: 'jackson_123'
      }, function (err, account) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('channels', function () {
    it('should ok', function (done) {
      sdk.channels(function (err, channels) {
        should.not.exist(err);
        channels.length.should.be.above(1);
        done();
      });
    });
  });

  describe('fetch', function () {
    var account;
    before(function (done) {
      sdk.auth({
        email: 'shyvo1987@gmail.com',
        password: 'jackson_123'
      }, function (err, info) {
        should.not.exist(err);
        account = info;
        done();
      });
    });

    it('should ok', function (done) {
      sdk.fetch({
        channel: 0,
        user_id: account.user_id,
        expire: account.expire,
        token: account.token,
        kbps: 192
      }, function (err, result) {
        should.not.exist(err);
        done();
      });
    });
  });
});
