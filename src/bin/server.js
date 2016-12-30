//--------------------------------------------------------------------------------------------------

var colors = require('colors/safe');
var exec = require('./exec');
var ssh = require('./ssh');
var request = require('request');

//--------------------------------------------------------------------------------------------------

    if (process.argv[2] == 'restart') {
        var restart = function() {
            request('http://95.213.229.167/', function (error, response, body) {
                if (!error) {
                    console.log(colors.green('Сервер доступен!'));
                    process.exit();
                }
                console.log(colors.red('Сервер не доступен.'));
                setTimeout(restart, 1000);
            })
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
                "echo '#!/bin/sh -e' > /etc/rc.local",
                "echo 'forever start /var/projects/instatop/src/index.js' >> /etc/rc.local",
                "echo 'exit 0' >> /etc/rc.local",
                'shutdown -r now'
            ], function() {
                setTimeout(restart, 1000);
            });
        });
    }

//--------------------------------------------------------------------------------------------------