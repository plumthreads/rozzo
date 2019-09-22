const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
})

router.get('/login', (req, res)=>{
	res.render('login');
})

router.get('/profile', (req, res)=>{
	res.render('profile')
})

router.get('/upload', (req, res)=>{
	res.render('upload')
})

module.exports = router; 