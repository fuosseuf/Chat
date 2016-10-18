var manager = require('../libs/db.queries');

var table = 'messages';


var add = function (values, callback) {
    return manager.insert(table, values, callback);
};

var getAll = function (callback) {
    return manager.findAll(table, callback);
};

var get = function (id, callback) {
    return manager.find(table, id, callback);
};

var getLastMessages = function (username, callback) {
    return manager.findBy(table, 'username', username, callback);
};

var authenticate = function (user, callback) {
    var sql = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var inserts = [table, 'username', user.username, 'password', user.password];
    
    return manager.query(sql, inserts, function (data) {
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