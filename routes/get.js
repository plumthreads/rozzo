const express = require('express');
const router = express.Router();

let login = require('../models/login');

router.get('/', (req, res)=>{
    res.render('login');
})

router.get('/', (req, res)=> {
    res.render('index');
	if(!req.session.created){
		req.session.created =1;
	}
})


module.exports = router; 