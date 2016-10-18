

var execute = function (sql, db, callback) {
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            callback(false);
        }
        callback(results);
    });
}

var query = function (sql, inserts, db, callback) {
    sql = db.format(sql, inserts);
    return execute(sql, db, callback);
}

var findAll = function (table, db, callback) {
    var sql = "SELECT * FROM ??";
    var inserts = [table];
    sql = db.format(sql, inserts);
    return execute(sql, db, callback);
};

var findBy = function (table, field, value, db, callback) {
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = [table, field, value];
    sql = db.format(sql, inserts);
    return execute(sql, db, callback);
};

var find = function (table, value, db, callback) {
    return findBy(table, 'id', value, db, callback);
};

var remove = function (table, value, db, callback) {
    var sql = "DELETE FROM ?? WHERE ?? = ?";
    var inserts = [table, value];
    sql = db.format(sql, inserts);
    return execute(sql, db, callback);
};


var insert = function (table, values, db, callback) {
    var sql = "INSERT INTO ?? SET ?";
    var inserts = [table, values];
    sql = db.format(sql, inserts);
    return execute(sql, db, callback);
};

exports.find = find;
exports.findAll = findAll;
exports.findBy = findBy;
exports.remove = remove;
exports.insert = insert;
exports.query = query;