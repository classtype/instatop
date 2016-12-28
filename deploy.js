
var spawn = require('child_process').spawn;

console.log('Deploy!');

exports.start = function() {
    var child = spawn('git', ['status']);
    
    child.stdout.on('data', function (data) {
        console.log('---------------');
        console.log('stdout: ' + data);
    });
    
    child.stderr.on('data', function (data) {
        console.log('---------------');
        child.stdin.write('g8p2g5mg');
        console.log('stderr'+data);
    });
    
    
    child.stdin.on('data', function (data) {
        console.log('---------------');
        console.log('stdin: ' + data);
    });
    
    
    child.on('close', function (code) {
        console.log('---------------');
        console.log('close1');
    });
    
    child.on('data', function (code) {
        console.log('---------------');
        console.log('data');
    });
};

