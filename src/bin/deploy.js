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
    
    console.log(123);
    
    ch.stdout.on('data', function (data) {
        streem(data, 'green');
    });
    ch.stderr.on('data', function (data) {
        streem(data, 'red');
    });
    ch.on('close', function (code) {
        callback(null, command);
        console.log('close = '+ command + args);
    });
};

//--------------------------------------------------------------------------------------------------

var commands = [
    ['git', 'add', '.'],
    ['git', 'commit', '-m', '"update"'],
    ['git', 'push']
];
async.map([['clear']], exec, function(err, r) {
    async.map(commands, exec, function(err, r) {
    });
});

/*
async.series([
    function(callback) {
        exec('git', ['status'], callback);
    },
    function(callback) {
        exec('git', ['status'], callback);
    },
    function(callback) {
        exec('git', ['status'], callback);
    }
]);
*/
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