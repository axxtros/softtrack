//Statikus tagok

var staticCtrl = module.exports = {};

var dbControl = require('../ctrl/dbctrl.js');

//init
init();

//modul interfaces ------------------------------------------------------------

staticCtrl.getProgramName = function() {
	return dbControl.getProgramName();
};

//functions -------------------------------------------------------------------

function init() {

}