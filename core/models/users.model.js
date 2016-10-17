var manager = require('../libs/db.queries');

var table = 'mvondo_users';


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

var authenticate = function(user, callback){
	return manager.findBy(table, 'username', user.username, function(data){
            if ((data == false) || (data.length == 0)) {
                callback(false);
            } else {
                if(data[0].password == user.password)
                callback(data[0]);
            }
        });
};

exports.add = add;
exports.getAll = getAll;
exports.get = get;
exports.getByUsername = getByUsername;
exports.authenticate = authenticate;