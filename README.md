douban.fm API
================
Node.js Douban.FM SDK

## Installation

```bash
$ npm install douban.fm.node
```

## Usage

```js
// init
var api = new API(your_email, your_password);
// auth & login
api.auth(function (err) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  // passed
  next();
});

// get play list
api.getPlayList(0, function (err, songs) {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  // your list
});
```

## License
The MIT Licese
