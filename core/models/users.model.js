var manager = require('../libs/db.queries');
var params = require('../parameters');
var md5 = require('md5');

var table = 'users';


var add = function (values, db, callback) {
    values.password = md5(params.salt+values.password);
    return manager.insert(table, values, db, callback);
};

var getAll = function (db, callback) {
    return manager.findAll(table, db, callback);
};

var get = function (id, db, callback) {
    return manager.find(table, id, db, callback);
};

var getByUsername = function (username, db, callback) {
    return manager.findBy(table, 'username', username, db, callback);
};

var authenticate = function (user, db, callback) {
    var sql = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var inserts = [table, 'username', user.username, 'password', md5(params.salt+user.password)];
    
    return manager.query(sql, inserts, db, function (data) {
        if ((data == false) || (data.length == 0)) {
            callback(false);
        } else {
            callback(data[0]);
        }
    });
};

exports.add = add;
exports.getAll = getAll;
exports.get = get;
exports.getByUsername = getByUsername;
exports.authenticate = authenticate;