var config = require('./bin/config');
var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection({
    user: config.mysql.user,
    password: config.mysql.password
});

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
        //if (err) throw err;
        //res.end('Всем привет!\n'+ rows[0].solution +'\nsql: '+ sql);
        res.end('"' + process.env.C9_USER + '" = Всем привет!\nsql: '+ sql);
    });
    
}).listen(process.env.PORT||80, process.env.IP||null);

console.log('Server running at.');
