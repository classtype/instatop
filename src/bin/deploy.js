//--------------------------------------------------------------------------------------------------

var spawn = require('child_process').spawn;
var colors = require('colors/safe');
var async = require('async');

//--------------------------------------------------------------------------------------------------

var exec = function(args, callback) {
    var command = args.shift();
    var child = spawn(command, args);
    child.stderr.on('data', function (data) {
        process.stdout.write(colors.green(data.toString()));
    });
    child.on('close', function (code) {
        callback(null, command);
    });
};

//--------------------------------------------------------------------------------------------------

async.map([
    ['git', 'add', '.'],
    ['git', 'commit', '-m', '"update"'],
    ['git', 'push']], exec, function(err, r) {
    console.log('Results:');
    console.log(r);
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