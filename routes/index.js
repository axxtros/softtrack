var express = require('express');
var router = express.Router();

var dbControl = require('../ctrl/dbctrl.js');

//dbControl.createDB('softrack');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
