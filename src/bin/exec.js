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
    var line = '';
    
    for (var i = 0; i < args.length; i++) {
        line += (i != 0 ? ' ' : '') + args[i];
    }
    
    console.log(colors.bgCyan('Старт: "'+ line +'"'));
    
    var command = args.shift();
    
// Init
    var ch = spawn(command, args);
    
// Error
    ch.on('error', function(error) {
        console.log(colors.bgRed('Ошибка: "'+ error +'"'));
        process.exit();
    });
    
// StdOut
    ch.stdout.on('data', function(data) {
        streem(data, 'green');
    });
    
// StdErr
    ch.stderr.on('data', function(data) {
        streem(data, 'red');
    });
    
// Close
    ch.on('close', function(code) {
        callback(null);
    });
};

//--------------------------------------------------------------------------------------------------

module.exports = function(commands, callback) {
    var array = [];

    for (var i = 0; i < commands.length; i++) {
        array[i] = (function(command) {
            return function(callback) {
                exec(command, callback);
            };
        })(commands[i]);
    }
    
    async.waterfall(array, callback);
};

//--------------------------------------------------------------------------------------------------