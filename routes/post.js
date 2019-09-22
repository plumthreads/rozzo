var express = require('express');
const bcrypt = require('bcrypt');

let Login = require('../models/login');

var session = require('express-session');

var routes = express.Router();


//handles post request
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

module.exports = routes;