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

var checkAuth = function (req, res, next) {
   if (req.session.user && req.session.user.isAuthenticated) {
      next();
   } else {
      res.redirect('/');
   }
}

app.get('/', function (req, res) {
   Message.find(function (err, message) {
      if (err) return console.error(err);
      console.log(message);
      if (req.session.user) {
         if (req.session.user.isAuthenticated) {
            res.render('home', {
               "title": "Home",
               "messages": message,
               "user": req.session.user
            });
         }
      } else {
         res.render('home', {
            "title": "Home",
            "messages": message
         });
      }
   });
});

app.get('/admin', checkAuth, function (req, res) {
   res.render('admin', {
      "title": "Admin"
   });
});

app.get('/login/:id', function (req, res) {
   res.render('login', {
      "title": "Login"
   });
});



app.get('/logout', function (req, res) {
   req.session.destroy(function (err) {
      if (err) {
         console.log(err);
      } else {
         res.redirect('/');
      }
   });
});

app.get('/edit', checkAuth, function (req, res) {
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
   hahaha = hahaha.replace(/CURRENTUSERNAME/g, req.session.username);
   res.send(hahaha);
});

app.post('/login_submit/:id', urlep, function (req, res) {
   User.findById(req.params.id, function (err, benutzer) {
      if (err) {
         err = "Login failed.";
         return handleError(err);
      }
      if (req.body.username == benutzer.username) {
         bcrypt.compare(benutzer.password, req.body.password, function (err, res_) {
            if (res_ == "true") {
               req.session.user = {
                  isAuthenticated: true,
                  username: req.body.username
               }
            }
            res.redirect('/');
         });
      }
   })
});

//Edit Message
app.get('/editmessage/:id', function (req, res) {

});

app.post('/editmessage/:id', function (req, res) {

});

//Delete Message
app.get('/deletemessage/:id', function (req, res) {

});

//Detail of User account and messages
app.get('/details/:id', function (req, res) {

});

app.post('/details/:id', function (req, res) {

});

//Deleting an account
app.get('deleteaccount/:id', function (req, res) {

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
   console.log(req.body);
   User.findById(req.params.id, function (err, users) {
      if (err) return handleError(err);
      var benutzer = new User({
         username: req.body.username,
         password: bcrypt.hashSync(req.body.password, null),
         user_level: req.body.user_level,
         image: "https://api.adorable.io/avatars/face/eyes" + req.body.eyes + "/nose" + req.body.nose + "/mouth" + req.body.mouth + "/" + req.body.R_VALUE + req.body.G_VALUE + req.body.B_VALUE,
         email: req.body.email,
         age: req.body.age
      });
      console.log(req.body.username + ' added.');

      benutzer.save(function (err, benutzer) {
         if (err) return console.error(err);
         req.session.user = {
            isAuthenticated: true,
            username: req.body.username
         }
         res.redirect('/');
      })
   });
});

app.post('/sendmessage/:id', urlep, function (req, res) {
   var time = new Date().getTime();
   var date = new Date(time);
   User.findById(req.params.id, function (err, benutzer) {
      var message = new Message({
         image: benutzer.image,
         name: benutzer.username,
         text: req.body.message_text,
         date: date.toDateString()
      });
      message.save(function (err, message) {
         if (err) return console.error(err);
         console.log('Message posted');
      });
   });

   res.redirect('/');
});

app.listen(3000);