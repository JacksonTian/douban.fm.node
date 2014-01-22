var sdk = require('./sdk');

var API = function (email, password) {
  this.email = email;
  this.password = password;
};

API.prototype.auth = function (callback) {
  var that = this;
  sdk.auth({
    email: this.email,
    password: this.password
  }, function (err, info) {
    if (err) {
      return callback(err);
    }
    that.token = info.token;
    that.expire = info.expire;
    that.user_id = info.user_id;
    that.user_name = info.user_name;
    that.email = info.email;
    callback(null, info);
  });
};

API.prototype.getChannels = function (callback) {
  sdk.channels(callback);
};

API.prototype.getChannel = function (channelId, callback) {
  sdk.fetch({
    channel: channelId,
    user_id: this.user_id,
    expire: this.expire,
    token: this.token,
    kbps: 192
  }, function(err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result.song);
  });
};

module.exports = API;
