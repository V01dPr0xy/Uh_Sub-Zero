var exp = require('express'),
   pug = require('pug'),
   bp = require('body-parser'),
   es = require('express-session'),
   path = require('path'),
   goose = require('mongoose'),
   app = exp();

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

});

var User = goose.model('Users_Collection', userSchema);

function add(num) { return num++; }
function sub(num) { return num--; }

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

function interceptor(req, res, next){
   
}

function add(){
   console.log("I worked");
}

app.get('/edit', function (req, res) {
   var didiba = pug.compileFile('views/edit.pug');
   hahaha = "" + didiba();
   hahaha = hahaha.replace(/<\/body>/gi, "<script src='mod.js'></script><\/body>");
   res.send(hahaha);
});

app.get('/register', function (req, res) {
   res.render('edit', {
      "title": "Register a User"
   });
});

app.post('/edit', urlep, function (req, res) {

});

app.post('/register', urlep, function (req, res) {

});

app.listen(3000);