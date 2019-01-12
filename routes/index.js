var express = require('express');
var router = express.Router();
var Session = require('express-session')
var {
  google
} = require('googleapis')
var plus = google.plus('v1');
var oauth2 = google.auth.OAuth2

const clientid = process.env.clientid
const clientsecret = process.env.clientsecret
const redirection = 'http://localhost/loginCallback'
console.log(clientid, clientsecret)

router.use(Session({
  secret: '803b49765bbd574d2ee22f70b565dd661daafc5e',
  resave: true,
  saveUninitialized: true
}));

const getOAuthClient = () => new oauth2(clientid, clientsecret, redirection)

function getAuthurl() {
  var oauth2Client = getOAuthClient();
  var scopes = [
    'https://www.googleapis.com/auth/userinfo.email'
  ];
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  return url;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '高大資工系友交流平臺'
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: '登入 - 高大資工系友交流平臺',
    authUrl: getAuthurl()
  });
});

router.get('/loginCallback', function (req, res, next) {
  var code = req.query.code;
  var session = req.session;
  var oauth2Client = getOAuthClient();
  oauth2Client.getToken(code, function (err, tokens) {
    // tokens包含一个access_token和一个可选的refresh_token
    if (!err) {
      oauth2Client.setCredentials(tokens);
      session["tokens"] = tokens;
      res.send(`<h3>Login successful!</h3><a href="/details">Go to details page</a>`)
    } else {
      res.send(`<h3>Login failed!!</h3>`)
    }
  });
});

router.get("/details", function (req, res) {
  var oauth2Client = getOAuthClient();
  oauth2Client.setCredentials(req.session["tokens"]);
  new Promise(function (resolve, reject) {
    plus.people.get({
      userId: 'me',
      fields: 'emails',
      auth: oauth2Client
    }, function (err, response) {
      if (!err) {
        resolve(response)
      } else {
        reject(err)
      }
    });
  }).then(function (data) {
    res.send(`<h3>email ${data.data.emails[0].value}</h3>`);
  }).catch(function (err) {
    console.log(err)
    res.send(`message get failed!`)
  })
});

router.get("/event", (req, res) => {
  res.render('eventShopping', {
    title: '高大資工系友交流平臺'
  })
})
router.get("/Twohand_Market", (req, res) => {
  res.render('Twohand_Market', {
    title: '高大資工系友交流平臺'
  })
})
router.get("/Twohand_Down", (req, res) => {
  res.render('Twohand_Down', {
    title: '高大資工系友交流平臺'
  })
})
router.get("/Twohand_Up", (req, res) => {
  res.render('Twohand_Up', {
    title: '高大資工系友交流平臺'
  })
})

module.exports = router;