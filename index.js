var exp = require('express'),
   pug = require('pug'),
   bp = require('body-parser'),
   es = require('express-session'),
   path = require('path');

app.get('/', function(req, res){
   res.render('home', {
      "title" : "Home"
   });
});

app.get('/admin', function(req, res){
   res.render('admin', {
      "title" : ""
   });
});

app.get('/login', function(req, res){
   res.render('login', {
      "title" : ""
   });
});

app.get('/board', function(req, res){
   res.render('board', {
      "title" : ""
   });
});

app.get('/topics', function(req, res){
   res.render('topics', {
      "title" : ""
   });
});

app.get('/edit', function(req, res){
   res.render('edit', {
      "title" : ""
   });
});

app.get('/register', function(req, res){
   res.render('edit', {
      "title" : ""
   });
});