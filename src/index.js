var config = require('./bin/config');
var mysql = require('mysql');
var http = require('http');

var connection = mysql.createConnection({
    host: config.host,
    user: 'root',
    password: '',
    database: 'Test'
});

var sql = 'Mysql none.';

connection.connect(function(err) {
    if (err) {
        sql = 'error connecting: '+ err.stack;
        return;
    }
    
    sql = 'connected as id '+ connection.threadId;
});
var count = 0;
http.createServer(function (req, res) {
    count++;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(count +' = Всем привет!\n' + '<br>sql: '+ sql);
}).listen(process.env.PORT||80, process.env.IP||null);

console.log('Server running at.');
