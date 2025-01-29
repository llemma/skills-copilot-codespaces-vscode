//Create web server
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var comments = require('./comments.json');
var port = 3000;

// Set up the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up the view engine
app.set('view engine', 'ejs');

// Set up the views directory
app.set('views', path.join(__dirname, 'views'));

// Set up the comments route
app.get('/comments', function(req, res) {
  res.render('index', {comments: comments});
});

// Set up the comments route
app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.redirect('/comments');
});

// Set up the comments route
app.get('/comments/new', function(req, res) {
  res.render('new');
});

app.listen(port, function() {
  console.log('Server running on http://localhost:' + port);
});