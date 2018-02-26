var exp = require('express'),
   pug = require('pug'),
   bp = require('body-parser'),
   es = require('express-session'),
   path = require('path'),
   app = express();

var urlep = bp.urlencoded({
   extended: true
})

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) { });

var userSchema = mongoose.Schema({

});

var User = mongoose.model('Users_Collection', userSchema);

function add(num) { return num++; }
function sub(num) { return num--; }

var compiledEdit = pug.compileFile('views/edit.pug');

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

app.get('/board', function (req, res) {
   res.render('board', {
      "title": "Board"
   });
});

app.get('/topics', function (req, res) {
   res.render('topics', {
      "title": "Topics"
   });
});

app.get('/edit', function (req, res) {
   res.send(compiledEdit)({
      "title": "Edit a User"
   });
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