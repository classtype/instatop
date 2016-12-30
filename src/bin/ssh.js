//--------------------------------------------------------------------------------------------------

var colors = require('colors/safe');
var async = require('async');
var ssh2 = require('ssh2');

//--------------------------------------------------------------------------------------------------

var streem = function(message, color) {
    process.stdout.write(colors[color](message.toString()));
};

//--------------------------------------------------------------------------------------------------

var exec = function(ssh, command, callback) {
    console.log(colors.bgCyan('Старт: "'+ command +'"'));
    
// Init
    ssh.exec(command, function(error, ch) {
    // Error
        if (error) {
            console.log(colors.bgRed('Ошибка: "'+ error +'"'));
            return;
        }
        
    // StdOut
        ch.on('data', function(data) {
            streem(data, 'green');
        });
        
    // StdErr
        ch.stderr.on('data', function(data) {
            streem(data, 'red');
        });
        
    // Close
        ch.on('close', function() {
            callback();
        });
    });
};

//--------------------------------------------------------------------------------------------------

module.exports = function(cfg, commands, callback) {
    callback = callback || function() {};
    var ssh = new ssh2();
    
    console.log(colors.bgGreen('Вход на сервер...'));
    
    ssh.connect(cfg);
    
    ssh.on('ready', function(stream) {
        console.log(colors.bgGreen('Соединение установлено.'));
        
        var array = [];
        
        for (var i = 0; i < commands.length; i++) {
            array[i] = (function(command) {
                return function(callback) {
                    exec(ssh, command, callback);
                };
            })(commands[i]);
        }
        
        async.waterfall(array, function() {
            ssh.disconnect();
        });
    });
    
    ssh.disconnect = function() {
        console.log(colors.bgMagenta('Соединение прервано!'));
        ssh.end();
        callback();
    };
    
    ssh.on('error', function(error) {
        if (!('disconnect' in ssh)) {
            ssh.disconnect = function() {};
        }
        console.log(colors.bgRed('Ошибка: "'+ error +'"'));
        ssh.disconnect();
    });
};

//--------------------------------------------------------------------------------------------------