//--------------------------------------------------------------------------------------------------

var config = require('./config');
var colors = require('colors/safe');
var exec = require('./exec');
var ssh = require('./ssh');
var request = require('request');

//--------------------------------------------------------------------------------------------------

    if (process.argv[2] == 'restart') {
        var restartOn = false;
        var restart = function() {
            request(config.url, function (error, response, body) {
                if (!error) {
                    console.log(colors.bgGreen('Сервер работает!'));
                    if (restartOn) {
                        process.exit();
                    }
                }
                restartOn = true;
                console.log(colors.red('Сервер не доступен.'));
                setTimeout(restart, 1000);
            })
        };
        
    // Очищаем консоль
        exec([['clear']], function() {
        // Заходим на сервер
            ssh(config.ssh, ['shutdown -r now'], function() {
                console.log(colors.red('Выключение...'));
                setTimeout(restart, 10000);
            });
        });
    }
    
//--------------------------------------------------------------------------------------------------

    if (process.argv[2] == 'install') {
    // Очищаем консоль
        exec([['clear']], function() {
        // Заходим на сервер
            ssh(config.ssh, [
                "echo '#!/bin/sh -e' > /etc/rc.local",
                "echo 'forever start /var/projects/instatop/src/index.js' >> /etc/rc.local",
                "echo 'exit 0' >> /etc/rc.local"
            ], function() {
                console.log(colors.bgGreen('Установка завершена!'));
            });
        });
    }

//--------------------------------------------------------------------------------------------------