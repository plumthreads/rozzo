var express = require('express');
var expressfileupload = require('express-fileupload')
var vision = require('@google-cloud/vision')
var bcrypt = require('bcrypt');
//var session = require('express-session');

let Login = require('../models/login');

var routes = express.Router();

const clients = new vision.ImageAnnotatorClient();

//handles post request
async function textdetect(req){
    //clients.documentTextDetection(req).then((resp)=>{
    // return resp
    //})
    var [result] = await clients.textDetection(req);
    return result;
}

routes.post('/createAccount', (req, res) => {
    //var weakness = req.body.weakness;
    //var str = weakness.split(', ');
    user = {
        username: req.body.username,
        password: req.body.password,
        weakness: req.body.weakness
    };

    let login = new Login(user);
    login.save(function(err){
        if(err){
            console.log(err);
        } else{
            console.log('added')
            res.render('login')
        }
    })
});

routes.post('/login', (req, res)=>{
    var username = req.body.username;
    var password = req.body.password;

    console.log(req.body.username)
    console.log(req.body.password)

    let query = {username: username};

    Login.findOne(query, function (err, user) {
        if (user === null) {
            res.render('login', {
                message: 'No user found'
            });
        } else {
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) {
                    console.log("Error");
                };
                if (isMatch) {
                    req.session.username = user.username;
                    req.session.weakness = user.weakness;
                    res.render('profile', req.session)
                }
            })
        }
    })
})
routes.post('/upload', (req, res)=>{
    var name = req.files.images.name;
    var image = req.files.images.data;
    print(textdetect(image));
})

/*
<form class="sign-up-form ">
        
        <input type = "text" id = "username" placeholder="Username">
  
        <input type = "text" id = "password" placeholder="Password">
   
        <input type = "text" id = "weakness" placeholder="What can't you eat?">

</form>
*/
module.exports = routes;


module.exports = {
    textdetect: textdetect
}