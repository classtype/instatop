var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Всем привет!\n');
}).listen(process.env.PORT||80, process.env.IP||null);

console.log('Server running at.');