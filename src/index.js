var config = require('./config');
var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection(config.mysql.connect);

var sql = 'Mysql none.';

connection.connect(function(err) {
    if (err) {
        sql = 'error connecting: '+ err.stack;
        return;
    }
    sql = 'connected as id '+ connection.threadId;
});

connection.query(
    "CREATE DATABASE IF NOT EXISTS `"+ config.mysql.database +"` "+
    "DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'"
);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        res.end('Всем привет!\n'+ rows[0].solution +'\nsql: '+ sql);
    });
    
}).listen(config.http.PORT, config.http.IP);

console.log('Server running at.');
