//--------------------------------------------------------------------------------------------------

var spawn = require('child_process').spawn;
var colors = require('colors/safe');
var async = require('async');

//--------------------------------------------------------------------------------------------------

var streem = function(message, color) {
    process.stdout.write(colors[color](message.toString()));
};

//--------------------------------------------------------------------------------------------------

var exec = function(args, callback) {
    var command = args.shift();
    var ch = spawn(command, args);
    
    ch.stdout.on('data', function(data) {
        streem(data, 'green');
    });
    ch.stderr.on('data', function(data) {
        streem(data, 'red');
    });
    ch.on('close', function(code) {
        callback(null);
        console.log('close = '+ args);
    });
};

//--------------------------------------------------------------------------------------------------

var commands = [
    ['clear'],
    ['git', 'add', '.'],
    ['git', 'commit', '-m', '"update"'],
    ['ls', '-la'],
    ['git', 'push']
];

//--------------------------------------------------------------------------------------------------

var arr = [];

    for (var i = 0; i < commands.length; i++) {
        arr[i] = (function(com) {
            return function(callback) {
                exec(com, callback);
            };
        })(commands[i]);
    }
    
async.waterfall(arr);

//--------------------------------------------------------------------------------------------------
/*
var colors = require('colors/safe');
const exec = require('child_process').exec;
*/
/*--------------------------------------------------------------------------------------------------
|
| -> Загрузка на GitHub
|
|-------------------------------------------------------------------------------------------------*/
/*
//exec('clear && git add . && git commit -m "update" && git push', function(error, stdout, stderr) {
exec('git', function(error, stdout, stderr) {
    if (error) {
        process.stdout.write(colors.red(error));
        return;
    }
    process.stdout.write(colors.green(stdout.toString()));
    process.stdout.write(colors.red(stderr.toString()));
});
*/
//--------------------------------------------------------------------------------------------------