var api = require('beer'),
  _ = require('underscore');

var wrap = function (callback) {
  return function (err, res) {
    if (err) {
      return callback(err);
    }
    var result = res.body;
    if (result.r === 0) {
      return callback(null, result);
    }
    return callback(new Error(result.err));
  };
};

// 模拟登录
exports.auth = function(account, callback) {
  api.post('http://www.douban.com/j/app/login', {
    form: {
      app_name: 'radio_desktop_win',
      version: 100,
      email: account.email.toString(),
      password: account.password.toString()
    }
  }, wrap(callback));
};

// 获取频道曲目
exports.fetch = function (params, callback) {
  var configs = {
    app_name: 'radio_desktop_win',
    version: 100,
    type: 'n'
  };
  api.get('http://douban.fm/j/app/radio/people', {
    query: _.extend(configs, params)
  }, wrap(callback));
};

// 切换设置红心曲目
exports.love = function (params, callback) {
  exports.fetch(_.extend({ type: 'r' }, params), callback);
};

// 获取频道列表
exports.channels = function(callback) {
  var privateHz = {
    seq_id: -3,
    abbr_en: "",
    name: "红心兆赫",
    channel_id: -3,
    name_en: ""
  };
  api.get('http://douban.fm/j/app/radio/channels', {}, function (err, res) {
    if (err) {
      return callback(err);
    }
    var result = res.body;
    callback(null, [privateHz].concat(result.channels));
  });
};
