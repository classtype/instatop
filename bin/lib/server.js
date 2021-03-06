//--------------------------------------------------------------------------------------------------

var path = require('path');
var config = require(
    path.resolve(
        __dirname, '..', '..', 'src', 'config'
    )
);
var colors = require('colors/safe');
var exec = require('./exec');
var ssh = require('./ssh');
var request = require('request');

/*--------------------------------------------------------------------------------------------------
|
| -> Установка сервера
|
|-------------------------------------------------------------------------------------------------*/

    if (process.argv[2] == 'install') {
    // Очищаем консоль
        exec([['clear']], function() {
        // Заходим на сервер
            ssh(config.ssh, [
                'apt-get update',
                'apt-get install htop -y',
                'apt-get install python-software-properties -y',
            // Установка curl
                'apt-get install curl -y',
            // Установка git
                'apt-get install git -y',
            // Установка mysql
                'echo "mysql-server mysql-server/root_password '+
                'password '+ config.mysql.password +'" | sudo debconf-set-selections',
                'echo "mysql-server mysql-server/root_password_again '+
                'password '+ config.mysql.password +'" | sudo debconf-set-selections',
                'apt-get install mysql-server mysql-client mysql-common -y',
            // Установка node
                'curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && '+
                'sudo apt-get install -y nodejs',
            // Установка forever
                'npm install -g forever',
            // Добавляем в /etc/rc.local автозапуск src/index.js
                "echo '#!/bin/sh -e' > /etc/rc.local",
                "echo 'forever start "+ config.path +"/"+ config.startNode +"' >> /etc/rc.local",
                "echo 'exit 0' >> /etc/rc.local"
            ], function() {
                console.log(colors.bgGreen('Установка завершена!'));
            });
        });
    }
    
/*--------------------------------------------------------------------------------------------------
|
| -> Рестарт сервера
|
|-------------------------------------------------------------------------------------------------*/

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
            ssh(config.ssh, [
                'shutdown -r now'// Перезагрузка сервера
            ], function() {
                console.log(colors.red('Выключение...'));
                setTimeout(restart, 10000);
            });
        });
    }

//--------------------------------------------------------------------------------------------------