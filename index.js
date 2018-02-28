var exp = require('express'),
   pug = require('pug'),
   bp = require('body-parser'),
   es = require('express-session'),
   path = require('path'),
   goose = require('mongoose'),
   bcrypt = require('bcrypt'),
   app = exp(),
   myHash;

var urlep = bp.urlencoded({
   extended: true
});

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(exp.static(path.join(__dirname+'/public')));

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
   date: Date
});

var User = goose.model('Users_Collection', userSchema);
var Message = goose.model('Messages_Collection', messageSchema);

function add(num) { return num++; }
function sub(num) { return num--; }

function hash(the_str){
   bcrypt.hash(the_str, null, null, function(err, hash){
      myHash = hash;
   });
}

app.get('/', function (req, res) {
   res.render('home', {
      "title": "Home"
   });
});

app.get('/admin', function (req, res) {
   res.render('admin', {
      "title": "Admin"
   });
});

app.get('/login', function (req, res) {
   res.render('login', {
      "title": "Login"
   });
});

app.get('/edit', function (req, res) {
   var didiba = pug.compileFile('views/edit.pug');
   hahaha = "" + didiba();
   hahaha = hahaha.replace(/<\/body>/gi, "<script src='mod.js'></script><\/body>");
   res.send(hahaha);
});

app.get('/register', function (req, res) {
   var didiba = pug.compileFile('views/edit.pug');
   hahaha = "" + didiba();
   hahaha = hahaha.replace(/<\/body>/gi, "<script src='mod.js'></script><\/body>");
   hahaha = hahaha.replace(/<title>Edit/g, '<title>Register');
   res.send(hahaha);
});

app.post('/login_submit', urlep, function(req, res){
   console.log("In login post");
   User.find({'username': req.body.username}, 'password', function(err, users){
     if(err){
       err = "Login failed.";
       return handleError(err);
     }
     if(users.length == 0){
       console.log("users length is zero");
       res.redirect('/login');
     }
     console.log(users);
     // bcrypt.compare(users, myHash, function(err, res){
 
     // });
   })
 });

app.post('/edit_submit', urlep, function (req, res) {
   var user = new User({
      username: req.body.username,
      password: req.body.password,
      user_level: req.body.user_level,
      email: req.body.email,
      age: req.body.age
   });

   user.save(function(err, person){
      if(err) return console.error(err);
      console.log(req.body.username + " added.");
   })

   res.redirect('/');
});

app.post('/register', urlep, function (req, res) {
   var user = goose.model('User', userSchema);
   user.find({ 'username': req.body.user} , 'username password', function(err, users){
      if(err) return handleError(err);
      if(users.count == 0){
         var benutzer = new User({
            username: req.body.username,
            password: hash(req.body.password),
            user_level: req.body.user_level,
            email: req.body.email,
            age: req.body.age
         });

         user.create(function(err, user_created){
            if(err)return console.error(err);
            console.log(req.body.username + ' added.');
            res.redirect('/');
         })
      }else{
         res.redirect('/register');
      }
   });
});

app.listen(3000);