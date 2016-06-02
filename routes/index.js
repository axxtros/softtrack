var express = require('express');
var router = express.Router();

var dbControl = require('../ctrl/dbctrl.js');
//dbControl.createDB('softrack');

//var staticControl = require('../ctrl/static.js');

var t_programName = dbControl.getProgramName();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('pn1: ' + dbControl.getProgramName());
	//res.render('index', { title: dbControl.getProgramName() });
	res.render('index', { title: t_programName });
	console.log('pn2: ' + dbControl.getProgramName());
	res.end();
});

module.exports = router;
