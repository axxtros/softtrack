var express = require('express');
var router = express.Router();

var dbControl = require('../ctrl/dbctrl.js');
//dbControl.createDB('softrack');

//var staticControl = require('../ctrl/static.js');

//var sqlite3 = require('sqlite3').verbose();
//var fs = require("fs");
//var file = "datas.db";
//var db = new sqlite3.Database(file);

/*
router.get('/', function(req, res, next) {
 	console.log('pn1: ' + dbControl.getProgramName());
 	res.render('index', { title: dbControl.getProgramName() });
 	console.log('pn2: ' + dbControl.getProgramName());
 	res.end();
});
*/

router.get('/', function(req, res, next) {
	dbControl.getProgramName(function(programName) {		
   		res.render('index', { program_name: programName });
   		res.end();
 	});
});

/* GET home page. */
/*
router.use('/', function(req, res, next) {
	var prname;
	db.each("SELECT VALUE FROM SYS_PARAM WHERE KEY = 'PROGRAM_NAME'", function(err, row){			
		prname = row.value;
		console.log('pn0: ' + prname);		
	});
	next();	
});

router.use('/', function(req, res, next) {
	console.log('pn1: ' + prname);
	res.render('index', { title: prname });	
	res.end();
});
*/

module.exports = router;
