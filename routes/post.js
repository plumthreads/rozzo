var express = require('express');
var expressfileupload = require('express-fileupload')
var vision = require('@google-cloud/vision')
let login = require('../models/login');

var routes = express.Router();

const clients = vision.ImageAnnotatorClient();
//handles post request
function textdetect(req){
    clients.documentTextDetection(req).then(resp=>{
     return resp
    })
}

routes.post('/createAccount', (req, res) => {
    //method = post  action = creatAccount
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
            res.render('index')
        }
    })
});

routes.post('/login', (req, res)=>{
    var username = req.body.username;
    var password = req.body.password;

    let query = {username: username};

    login.find(query, (err, info)=>{
        if(err){
            console.log("Something wrong with login");
        };
        console.log(info);
        bcrypt.compare(password, info.password, function(err, isMatch){
            if(err){
                console.log("pass error");
                console.log(err);
            };
            if(isMatch){
                req.session.username = info.username;
                req.session.weakness = info.weakness;
                res.render('')
            }
        })
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