var sdk = require('../lib/sdk');

sdk.auth({
  email: 'shyvo1987@gmail.com',
  password: 'jackson_123'
}, function (err, account) {
  console.log(arguments);
  sdk.channels(function (err, channels) {
    console.log(arguments);
    sdk.fetch({
      channel: 0,
      user_id: account.user_id,
      expire: account.expire,
      token: account.token,
      kbps: 192
    }, function (err, result) {
      console.log(result.song);
      
    });
  });
});
