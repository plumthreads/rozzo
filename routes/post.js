var express = require('express');
var expressfileupload = require('express-fileupload')
var vision = require('@google-cloud/vision')
var translate = require('@google-cloud/translate')
var bcrypt = require('bcrypt');
//var session = require('express-session');


let Login = require('../models/login');

var routes = express.Router();

const clients = new vision.ImageAnnotatorClient();
const clientt = new translate.Translate();
//handles post request
async function textdetect(req){
    //clients.documentTextDetection(req).then((resp)=>{
    // return resp
    //})
    return clients.textDetection(req).then(([detections])=>{
        const annotation = detections.textAnnotations[0];
        text = annotation ? annotation.description : '';
        text=clientt.translate(text,'en');
        return text
    })
    
}

routes.post('/createAccount', (req, res) => {
    user = {
        username: req.body.username,
        password: req.body.password,
        weakness: req.body.weakness
    };
    console.log(req.body.weakness)
    let login = new Login(user);
    login.save(function(err){
        if(err){    
            console.log(err);
        } else{
            console.log(login);
            console.log('next page');
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
                    res.render('profile', {
                        req
                    })
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