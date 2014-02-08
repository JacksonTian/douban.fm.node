var urllib = require('urllib');

var extend = function () {
  var obj = {};
  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  }
  return obj;
};

var wrap = function (callback) {
  return function (err, data, res) {
    if (err) {
      return callback(err);
    }
    if (data.r === 0) {
      return callback(null, data);
    }
    return callback(new Error(data.err));
  };
};

// 模拟登录
exports.auth = function(account, callback) {
  var data = {
    app_name: 'radio_desktop_win',
    version: 100,
    email: account.email.toString(),
    password: account.password.toString()
  };
  var opts = {
    data: data,
    method: 'POST',
    dataType: 'json'
  };
  urllib.request('http://www.douban.com/j/app/login', opts, wrap(callback));
};

// 获取频道曲目
exports.fetch = function (params, callback) {
  var configs = {
    app_name: 'radio_desktop_win',
    version: 100,
    type: 'n'
  };
  var opts = {
    data: extend(configs, params),
    dataType: 'json'
  };
  urllib.request('http://douban.fm/j/app/radio/people', opts, wrap(callback));
};

// 切换设置红心曲目
exports.love = function (params, callback) {
  exports.fetch(extend({type: 'r'}, params), callback);
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

  var opts = {dataType: 'json'};
  urllib.request('http://douban.fm/j/app/radio/channels', opts, function (err, data, res) {
    if (err) {
      return callback(err);
    }
    callback(null, [privateHz].concat(data.channels));
  });
};
