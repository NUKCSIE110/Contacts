var express = require('express');
var router = express.Router();
var Session = require('express-session')
var google = require('googleapis').google
var plus = google.plus('v1');
var oauth2 = google.auth.OAuth2
var firebase = require('firebase')
var config = {
  apiKey: process.env.firebase_apikey,
  authDomain: "nuk-contacts.firebaseapp.com",
  databaseURL: "https://nuk-contacts.firebaseio.com",
  projectId: "nuk-contacts",
  storageBucket: "nuk-contacts.appspot.com",
  messagingSenderId: "432628078259"
};
var clientid = process.env.clientid
var clientsecret = process.env.clientsecret
var redirection = 'http://localhost/loginCallback'
firebase.initializeApp(config);
console.log(clientid, clientsecret)
var db = firebase.database();

router.use(Session({
  secret: '803b49765bbd574d2ee22f70b565dd661daafc5e',
  resave: true,
  saveUninitialized: true
}));

var getOAuthClient = () => new oauth2(clientid, clientsecret, redirection)

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
  if (req.session['email'] === undefined) res.redirect(302, '/login')
  else res.redirect(302, '/profile')
  res.send()
});

router.get('/login', function (req, res, next) {
  console.log(req.session["email"])
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
    if (!err) {
      oauth2Client.setCredentials(tokens);
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
        let email = data.data.emails[0].value
        if (email.slice(4, 6) == '55' && email.split('@')[1] == 'mail.nuk.edu.tw') {
          let stuid = email.split('@')[0]
          session["stuid"] = stuid
          db.ref(`users/${stuid}`).once("value", snapshot => {
            if (!snapshot.exists()) {
              db.ref(`/users/${stuid}`).set({
                name: email.split('@')[0],
                grade: parseInt(email.slice(1, 4)) + 4,
                avatar: ''
              })
            }
          });
          res.render('loginCallback', {
            title: '登入成功 - 高大資工系友交流平臺',
            href: 'profile',
            status: 'success',
            message: '登入成功，3秒後導向至首頁。'
          })
        } else throw new Error('wrong email')
      }).catch(function (err) {
        console.log(err)
        res.render('loginCallback', {
          title: '登入失敗 - 高大資工系友交流平臺',
          href: 'login',
          status: 'danger',
          message: '登入失敗，請確認是否爲高大G Suite帳號，3秒後導向至登入頁面。'
        })
      })
    }
  });
});

router.get('/profile', (req, res, next) => {
  if (req.session['stuid'] != undefined) res.render('profile', {
    title: '資料 - 高大資工系友交流平臺',
    stuid: req.session['stuid']
  })
  else {
    res.redirect(302, '/login')
    res.send()
  }
})

router.get("/event", (req, res) => {
  res.render('event', {
    title: '高大資工系友交流平臺',
    stuid: req.session['stuid']
  })
})
router.get("/twohand/market", (req, res) => {
  res.render('twohand_market', {
    title: '二手商場',
    stuid: req.session['stuid']
  })
})
router.get("/twohand/down", (req, res) => {
  res.render('twohand_down', {
    title: '下架商品',
    stuid: req.session['stuid']
  })
})
router.get("/twohand/up", (req, res) => {
  res.render('twohand_up', {
    title: '上架商品',
    stuid: req.session['stuid']
  })
})
router.get("/twohand/buy", (req, res) => {
  res.render('twohand_buy', {
    title: '購買商品',
    stuid: req.session['stuid']
  })
})
router.get("/establish", (req, res) => {
  res.render('establish', {
    title: '建立活動',
    stuid: req.session['stuid']
  })
})

module.exports = router;