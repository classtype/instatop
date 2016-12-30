//--------------------------------------------------------------------------------------------------

var spawn = require('child_process').spawn;
var colors = require('colors/safe');
var exec = require('./exec');
var ssh = require('./ssh');

//--------------------------------------------------------------------------------------------------

    if (process.argv[2] == 'restart') {
        var restart = function() {
        // Init
            var ch = spawn('ping', ['algame.ru1', '-c', '1']);
            
        // Error
            ch.on('error', function(error) {
                console.log(colors.bgRed('Ошибка: "'+ error +'"'));
                process.exit();
            });
            
        // StdOut
            ch.stdout.on('data', function(data) {
                console.log(colors.green('Сервер доступен!'));
                process.exit();
            });
            
        // StdErr
            ch.stderr.on('data', function(data) {
                console.log(colors.red('Сервер не доступен.'));
            });
            
        // Close
            ch.on('close', function(code) {
                setTimeout(restart, 1000);
            });
        };
        
        
    // Очищаем консоль
        exec([['clear']], function() {
        // Заходим на сервер
            ssh({
                host: '95.213.229.167',
                port: 22,
                username: 'root',
                password: 'yesqzgf5ej'
            },[
                'shutdown -r now'
            ], restart);
        });
    }

//--------------------------------------------------------------------------------------------------