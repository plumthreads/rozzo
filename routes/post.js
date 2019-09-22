var express = require('express');
let login = require('../models/login');

var routes = express.Router();

//handles post request
routes.post('/createAccount', (req, res) => {
    //method = post  action = creatAccount
    user = {
        username: req.body.username,
        password: req.body.password,
        weakness: req.body.weakness
    };

    let userInfo = new login(user);

    userInfo.save(function(err){
        if(err){
            console.log("error");
        } else{
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
        bcrypt.compare(password, info.password, function(err, isMatch){
            if(err){
                console.log("pass error");
            };
            if(isMatch){
                res.render('', user)
            }
        })
    })
})
routes.post('/upload', (req, res)=>{
    var name = req.files.images.name;
    var image = req.files.images.data;
    
})
/*
<form class="sign-up-form ">
        
        <input type = "text" id = "username" placeholder="Username">
  
        <input type = "text" id = "password" placeholder="Password">
   
        <input type = "text" id = "weakness" placeholder="What can't you eat?">

</form>
*/
module.exports = routes;