var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./config/database');
var mongoose = require('mongoose');

//session midedleware
app.use(cookieParser);
app.use(session({token: "Session token"}));


mongoose.connect(config.database, { useNewUrlParser: true });
var db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to mongoDB');
});

db.on('error', function (err) {
    console.log("Error connecting to database. Check connection string");
});


var app = express();


app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static folder
app.use(express.static(path.join(__dirname, '/public')));

//routes folder
const get = require('./routes/get');
app.use(get);

/*
var post = require('./routes/post');
app.use(post);
*/

app.listen(5500, ()=>{
    console.log("Server is on port 57");
})