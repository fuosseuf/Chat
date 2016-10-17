var manager = require('../libs/db.queries');

var table = 'users';


var add = function(values, callback){
	return manager.insert(table, values, callback);
};

var getAll = function(callback){
	return manager.findAll(table, callback);
};

var get = function(id, callback){
	return manager.find(table, id, callback);
};

var getByUsername = function(username, callback){
	return manager.findBy(table, 'username', username, callback);
};

exports.add = add;
exports.getAll = getAll;
exports.get = get;
exports.getByUsername = getByUsername;