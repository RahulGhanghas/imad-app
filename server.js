var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res) {
    res.send('Article-one requested will be displayed here');
});

app.get('/article-two',function(req,res) {
    res.send('Article-two requested will be displayed here');
});

function hash (input, salt) {
    //How do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2Sync", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input',function(req,res) {
    var hashedString = hash(req.params.input, 'random-string');
    res.send(hashedString);
});




app.get('/article-three',function(req,res) {
    res.send('Article-three requested will be displayed here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
