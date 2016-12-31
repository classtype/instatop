var config = require('./bin/config');
var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection({
    user: 'root',
    password: 'Test'
});

var sql = 'Mysql none.';

connection.connect(function(err) {
    if (err) {
        sql = 'error connecting: '+ err.stack;
        return;
    }
    sql = 'connected as id '+ connection.threadId;
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        res.end('Всем привет!\n'+ rows[0].solution + '\nsql: '+ sql);
    });
    
}).listen(process.env.PORT||80, process.env.IP||null);

console.log('Server running at.');
