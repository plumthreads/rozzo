var express = require('express');
var vision = require('@google-cloud/vision')
var translate = require('@google-cloud/translate')
var storage = require('@google-cloud/storage')
var bcrypt = require('bcrypt');
var cloud = require('cloudinary').v2;
var formidable = require('formidable')
//var session = require('express-session');


let Login = require('../models/login');

var routes = express.Router();

const clients = new vision.ImageAnnotatorClient();
const clientt = new translate.Translate();
const fileclient = new storage.Storage();
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
    
    var list = req.body.weakness.split(', ');

    user = {
        username: req.body.username,
        password: req.body.password,
        weakness: list
    };
    
    let login = new Login(user);
    login.save(function(err){
        if(err){    
            console.log(err);
        } else{
            console.log('next page');
            res.render('login')
        }
    })
});

routes.post('/login', (req, res)=>{
    var username = req.body.username;
    var password = req.body.password;

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
                    res.render('upload', {
                        req
                    })
                } else{
                    res.render('index');
                }
            })
        }
    })
})

routes.post('/update', (req,res)=>{
    let query = {username: req.session.username}
    Login.findOne(query, (err, user)=>{
        if(err){
            console.log(err)
        };
        if(user == null){
            res.render('index');
        }else{
            res.render('upload', {
                req
            });
        }
    })
})

routes.post('/uploadfile', async (req, res)=> {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('file', async function (name, file){
        console.log('Uploaded ' + file.name);
        textdetect(file.path).then((text)=>{
            req.session.ml = text;
            res.render('upload', {
                req
            })    
        });
        });

    
})

routes.post('/delete', (req, res)=>{
    let query = {username: req.session.username}
    
    Login.deleteOne(query, (err)=>{
        if(err){
            console.log(err);
        }

        res.render(index);
    })
})
module.exports = routes;





