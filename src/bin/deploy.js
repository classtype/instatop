var colors = require('colors/safe');
var spawn = require('child_process').spawn;





var child = spawn('git', ['add', '.']);

var callback = function(data) {
    process.stdout.write(data.toString());
};

child.stdout.on('data', function(data) {
    process.stdout.write(colors.green(data.toString()));
});

child.stderr.on('data', function(data) {
    process.stdout.write(colors.red(data.toString()));
});

child.stdin.on('data', callback);

child.on('close', function(code) {
    console.log('close');
});

child.on('data', function(code) {
    console.log('Code = '+ code);
});