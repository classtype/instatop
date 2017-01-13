var config = require('./config');
var sql_create = require('./sql_create');
var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection(config.mysql.connect);
require('./lib/mysql')(connection);

var log = function(msg) {
    if (msg) {
        this.msg = this.msg||'';
        this.msg += msg + '\n';
        console.log(msg);
    }
    return this.msg;
};

log('Start');

connection.connect(function(err) {
    if (err) {
        log('error connecting: ' + err.stack);
        return;
    }
    log('connected as id ' + connection.threadId);
});

connection.querys(require('./sql_create'), function(err) {
    if (err) {
        log('error create: ' + err);
        return;
    }
}, function() {
    var sql =
    "SELECT * FROM `users` " +
    "WHERE `user_name` = 'yana_havana' LIMIT 1";
    
    connection.query(sql, function(err, rows, fields) {
        if (err) return log('SQL ERROR: ' + err);
        if (rows[0]) {
            log('SQL: ' + rows[0].user_name);
        } else {
            log('QUERY EMPTY: ' + sql);
        }
    });
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(log());
}).listen(config.http.PORT, config.http.IP);

log('Server running at.');