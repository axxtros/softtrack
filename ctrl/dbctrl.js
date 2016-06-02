//Adatbázis műveletekért felelős modul.

var dbctrl = module.exports = {};

var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = "datas.db";
var db = new sqlite3.Database(file);

//init
init();

//modul interfaces ------------------------------------------------------------

dbctrl.createDB = function(dbFileName) {
	createDatabase(dbFileName);	
};

//functions -------------------------------------------------------------------

function init() {
	var exists = fs.existsSync(file);
	if (!exists) {
	    fs.openSync(file, 'w');
	    console.log('Create database, filename: ' + file);
	    createDatabase(file);
	} else {
		console.log('Database file is exists!');
		getMAX_ID('SYS_PARAM');
	}
}



function createDatabase(dbFileName) {	
	//rendszer paraméter tábla
	var create_SYS_PARAM_TableSQL = ' CREATE TABLE IF NOT EXISTS SYS_PARAM (id INTEGER NOT NULL UNIQUE, key TEXT NOT NULL UNIQUE, value TEXT NOT NULL, PRIMARY KEY(id)); \
						   			  CREATE UNIQUE INDEX SYS_PARAM_IDX ON SYS_PARAM (id);';
	db.run(create_SYS_PARAM_TableSQL, insert_SYS_PARAM_Rows);	
	//ezt azért kell így csinálni, mert a run asszinkron módon dolgozik, és még nem fut le, amikor már az INSERT INTO futna
	//leírás: http://stackoverflow.com/questions/21716564/sqlite-error-no-such-table-in-node-js
	//példa: https://github.com/mapbox/node-sqlite3/blob/master/examples/simple-chaining.js

	//felhasználókat tartalmazó tábla	
	db.run(' CREATE TABLE IF NOT EXISTS DAT_USER (id INTEGER NOT NULL UNIQUE, username TEXT NOT NULL, loginname TEXT NOT NULL UNIQUE, password TEXT NOT NULL, PRIMARY KEY(id)); \
			 CREATE INDEX DAT_USER_IDX ON DAT_USER (id); \
			 CREATE INDEX DAT_USER_LGNX ON DAT_USER (loginname);');

	
}

function insert_SYS_PARAM_Rows() {
	var stmt = db.prepare(" INSERT INTO SYS_PARAM (id, key, value) VALUES \
							(1, 'PROGRAM_NAME', 'Softtrack'), \
						    (2, 'PROGRAM_MAJOR_VERSION', '0'), \
						    (3, 'PROGRAM_MINOR_VERSION', '0'), \
						    (4, 'PROGRAM_BUILD_NUMBER', '1000');");
    stmt.run();
    stmt.finalize(read_SYS_PARAM_rows);
}

function read_SYS_PARAM_rows() {
    //console.log("readAllRows sys_param");
    db.all("SELECT id, key, value FROM sys_param", function(err, rows) {
        rows.forEach(function (row) {
            //console.log(row.id + ", " + row.key + " : " + row.value);
        });
        //dbClose();
    });
}

function dbClose() {
	console.log("Database closed.");
    db.close();
}

//Visszaadja a paraméterben található tábla következő szabad id-ját.
function getMAX_ID(tableName) {	
	db.each("SELECT MAX(id) as id FROM " + tableName, function(err, row) {      
      //console.log(row.id + 1);
      return (row.id + 1);
  });
}
