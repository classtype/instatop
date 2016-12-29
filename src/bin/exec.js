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
    var ch = spawn(command, args);
    
    ch.stdout.on('data', function(data) {
        streem(data, 'green');
    });
    ch.stderr.on('data', function(data) {
        streem(data, 'red');
    });
    ch.on('close', function(code) {
        callback(null);
    });
};

module.exports = function(commands) {
    var array = [];

    for (var i = 0; i < commands.length; i++) {
        array[i] = (function(com) {
            return function(callback) {
                exec(com, callback);
            };
        })(commands[i]);
    }
    
    async.waterfall(array);
};