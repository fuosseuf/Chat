var mysql = require('mysql'),
	params = require('../parameters');

var db = mysql.createConnection({
	  host     : params.dbhost,
	  user     : params.dbuser,
	  password : params.dbpwd,
	  database : params.dbname
	});

var execute = function(sql, callback){
	console.log(sql);
	db.connect();
	db.query(sql, function(err, results) {
  		if(err){  console.log(er);
  			return false;
  		}
  		callback(results);
	});
	db.end();
}

var findAll = function(table, callback){
	var sql = "SELECT * FROM ??";
	var inserts = ['users'];
	sql = mysql.format(sql, inserts);
	return execute(sql, callback);
};

var findBy = function(table, field, value, callback){
	var sql = "SELECT * FROM ?? WHERE ?? = ?";
	var inserts = [table, field, value];
	sql = mysql.format(sql, inserts);
	return execute(sql, callback);
};

var find = function(table, value, callback){
	return findBy(table, 'id', value, callback);
};

var remove = function(table, value, callback){
	var sql = "DELETE FROM ?? WHERE ?? = ?";
	var inserts = [table, value];
	sql = mysql.format(sql, inserts);
	return execute(sql, callback);
};


var insert = function(table, values, callback){
	var sql = "INSERT INTO ?? SET ?";
	var inserts = [table, values];
	sql = mysql.format(sql, inserts);
	return execute(sql, callback);
};

exports.find = find;
exports.findAll = findAll;
exports.findBy = findBy;
exports.remove = remove;
exports.insert = insert;