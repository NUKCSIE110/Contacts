var express = require('express');
var router = express.Router();
var Session = require('express-session')
var google = require('googleapis').google
var plus = google.plus('v1');
var oauth2 = google.auth.OAuth2
var firebase = require('firebase')
var imgur = require('imgur')
imgur.setClientId('3f0312bbb4f882d');
imgur.setAPIUrl('https://api.imgur.com/3/');
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
var redirection = 'http://nuk-csie-contacts.herokuapp.com/loginCallback'
// var redirection = 'http://localhost/loginCallback'
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
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  return url;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session['stuid'] === undefined) res.redirect(302, '/login')
  else res.redirect(302, '/profile')
  res.send()
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
    if (!err) {
      oauth2Client.setCredentials(tokens);
      new Promise(function (resolve, reject) {
        plus.people.get({
          userId: 'me',
          fields: 'displayName,emails',
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
                avatar: `https://api.adorable.io/avatars/400/${email.split('@')[0]}.png`,
                email: '',
                facebook: '',
                grade: parseInt(email.slice(1, 4)) + 4,
                line: '',
                name: data.data.displayName,
                phone: '',
                telegram: '',
              })
            } else {
              let data = snapshot.val()
              session['name'] = data.name
              session.save()
            }
          })
          res.render('loginCallback', {
            title: '登入成功 - 高大資工系友交流平臺',
            href: 'profile',
            status: 'success',
            message: '登入成功，3秒後導向至首頁。'
          })
        } else throw new Error('wrong email')
      }).catch(function (err) {
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

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.render('logout', {
    title: '登出成功 - 高大資工系友交流平臺',
    href: 'login',
    status: 'success',
    message: '登出成功，3秒後導向至登入畫面。'
  })
})

router.get('/profile', (req, res, next) => {
  if (req.session['stuid'] != undefined) {
    var page = req.query['p']
    if (page === undefined) page = 1
    else page = parseInt(page)
    if (page === 0) page = 1
    db.ref('/users/').once('value',snapshot=>{
      var ifend = false
      var data = snapshot.val()
      var data_arr = new Array
      var length = Object.keys(data).length
      for (let index in data) {
        data_arr.push({stu:index,...data[index]})
      }
      for(let i=1;i<page;i++){
        if (data_arr.length > 8) for(let j = 0;j<8;j++) {
           data_arr.shift()
        }
      }
      if (data_arr.length <=8) ifend = true
        res.render('profile', {
        title: '資料 - 高大資工系友交流平臺',
        name: req.session['name'],
        arr:data_arr,
        next:page+1,
        pre:page-1,
        end:ifend
      })
    })
  } else {
    res.redirect(302, '/login')
    res.send()
  }
})

router.get('/profile/*', (req, res, next) => {
  if (req.session['stuid'] != undefined) {
    db.ref(`/users/${req.url.split('/')[2]}`).once('value', snapshot => {
      if (snapshot.exists()) {
        let data = snapshot.val()
        if (req.session['stuid'] === req.url.split('/')[2]) res.render('profile_self', {
          title: '資料 - 高大資工系友交流平臺',
          name: req.session['name'],
          data: data
        })
        else res.render('profile_id', {
          title: '資料 - 高大資工系友交流平臺',
          name: req.session['name'],
          data: data
        })
      } else res.send(404)
    })
  } else {
    res.redirect(302, '/login')
    res.send()
  }
})

router.post('/profile/edit', (req, res, next) => {
  var session = req.session
  if (session['stuid'] === undefined) {
    res.send(403)
  } else {
    if (req.body.avatar != '') imgur.uploadBase64(req.body.avatar)
      .then(function (json) {
        var update_obj = {
          ...req.body,
          avatar: json.data.link
        }
        db.ref(`/users/${req.session['stuid']}`).update(update_obj)
        res.redirect(303, `/profile/${req.session['stuid']}`)
        res.send()
      })
      .catch(function (err) {
        res.send(500)
        console.error(err.message);
      });
    else {
      var update_obj = req.body
      delete update_obj['avatar']
      db.ref(`/users/${req.session['stuid']}`).update(update_obj)
      res.redirect(303, `/profile/${req.session['stuid']}`)
      res.send()
    }
  }
})

router.post('/profile/all', (req, res, next) => {
  if (req.session['stuid'] != undefined) {
    db.ref(`/users/`).once('value', snapshot => {
      if (snapshot.exists()) {
        let data = snapshot.val()
        res.send(200,data)
      } else res.send(404)
    })
  } else {
    res.send(403)
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
router.get("/attempt", (req, res) => {
  res.render('attempt', {
    title: '參加活動',
    stuid: req.session['stuid']
  })
})

router.get("/zupu", (req, res) =>{
  res.render('zupu', {
    title: '族譜',
    stuid: req.session['stuid'],
    name: req.session['name'],
  })  
})

module.exports = router;