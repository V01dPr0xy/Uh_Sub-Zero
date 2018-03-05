var exp = require('express'),
   pug = require('pug'),
   bp = require('body-parser'),
   es = require('express-session'),
   path = require('path'),
   goose = require('mongoose'),
   bcrypt = require('bcrypt-nodejs'),
   app = exp();


var current_user;

var urlep = bp.urlencoded({
   extended: true
});

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(exp.static(path.join(__dirname + '/public')));

goose.Promise = global.Promise;
goose.connect('mongodb://localhost/data');

var mdb = goose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) { });

var userSchema = goose.Schema({
   username: String,
   password: String,
   image: String,
   userlevel: String,
   email: String,
   age: Number
});

var messageSchema = goose.Schema({
   name: String,
   image: String,
   text: String,
   date: Date
});

var User = goose.model('Users_Collection', userSchema);
var Message = goose.model('Messages_Collection', messageSchema);

app.use(es({
   secret: 'catscatscatsarebest',
   saveUninitialized: false,
   resave: true
}));

var loggedIn = false, admin = false;
var loginStatus = function (req, res, next) {
   if (!loggedIn) {
      res.redirect('/login');
   } else {
      next();
   }
}

var checkAuth = function (req, res, next) {
   if (req.session.user && req.session.user.isAuthenticated) {
      next();
   } else {
      res.redirect('/');
   }
}

app.get('/', function (req, res) {
   res.render('home', {
      "title": "Heimat",
      "loggedIn": loggedIn
   });
});

app.get('/admin', checkAuth, function (req, res) {
   res.render('admin', {
      "title": "Admin"
   });
});

app.get('/login', function (req, res) {
   res.render('login', {
      "title": "Login"
   });
});

app.get('/logout', function (req, res) {
   req.session.destroy(function (err) {
      if (err) {
         console.log(err);
      } else {
         loggedIn = false;
         res.redirect('/');
      }
   });
});

app.get('/edit', loginStatus, function (req, res) {
   var didiba = pug.compileFile('views/account.pug');
   hahaha = "" + didiba();
   hahaha = hahaha.replace(/<\/body>/gi, "<script src='mod.js'></script><\/body>");
   hahaha = hahaha.replace(/PAGETYP/gi, "edit");
   res.send(hahaha);
});

app.get('/register', function (req, res) {
   var didiba = pug.compileFile('views/account.pug');
   hahaha = "" + didiba();
   hahaha = hahaha.replace(/<\/body>/gi, "<script src='mod.js'></script><\/body>");
   hahaha = hahaha.replace(/PAGETYP/gi, "register");
   hahaha = hahaha.replace(/<title>/g, '<title>Register');
   if (current_user != undefined)
      hahaha = hahaha.replace(/CURRENTUSERNAME/g, current_user.username);
   res.send(hahaha);
});

app.post('/login_submit', urlep, function (req, res) {
   User.find({ 'username': req.body.username }, 'username password', function (err, users) {
      if (err) {
         err = "Login failed.";
         return handleError(err);
      }
      console.log(users);
      if (users.length == undefined || users.length == 0) {
         res.redirect('/login');
      } else {
         bcrypt.compare(users[0].password, current_user.password, function (err, res_) {
            if (res_ == "true") {
               loggedIn = true;
               current_user = users[0];
            } else {
               res.redirect('/login');
            }
         });
      }
   })
});

app.post('/edit_submit', urlep, function (req, res) {
   var benutzer = new User({
      username: req.body.username,
      password: req.body.password,
      user_level: req.body.user_level,
      email: req.body.email,
      age: req.body.age
   });

   benutzer.save(function (err, person) {
      if (err) return console.error(err);
      console.log(req.body.username + " added.");
   })

   res.redirect('/');
});

app.post('/register_submit', urlep, function (req, res) {
   // console.log(req);
   User.find({ 'username': req.body.user }, 'username', function (err, users) {
      if (err) return handleError(err);
      if (users.count == undefined) {
         var benutzer = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, null),
            user_level: req.body.user_level,
            email: req.body.email,
            age: req.body.age
         });
         console.log(benutzer);
         benutzer.save(function (err, benutzer) {
            if (err) return console.error(err);
            console.log(req.body.username + ' added.');
            current_user = benutzer;
            loggedIn = true;
            res.redirect('/');
         })
      } else {
         res.redirect('/register');
      }
   });
});

app.post('/sendmessage', urlep, function (req, res) {
   var time = new Date().getTime();
   var date = new Date(time);

   var message = new Message({
      name: req.body.name,
      text: req.body.text,
      date: date.toDateString()
   });
});

app.listen(3000);