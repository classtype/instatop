//--------------------------------------------------------------------------------------------------

var mysql = require('mysql');
var async = require('async');

//--------------------------------------------------------------------------------------------------

$.InitDB = function(callback_inited_db) {
// Создаем соединение
    var connection = mysql.createConnection($.cfg.mysql.connect);
    
// Одни запрос
    $.query = function(sql, args, callback) {
        if (typeof args == 'function') {
            callback = args;
            args = [];
        }
        
        connection.query(sql, args, function(err, rows, fields) {
            if (err) {
                $.log('-------------');
                $.log('SQL: ' + sql);
                $.log('-------------');
                $.log('ERROR: ' + err);
                $.log('-------------');
                return;
            }
            
            if (typeof callback == 'function') {
                callback.call(
                    {err:err, row:rows[0], rows:rows, fields:fields, sql:sql},
                    rows[0], rows, sql
                );
            }
        });
        //return connection.query.apply(connection, arguments);
    };
    
// Несколько запросов
    $.querys = function(commands, callback_i, callback_end) {
        var array = [];
        for (var i = 0; i < commands.length; i++) {
            array[i] = (function(sql) {
                return function(callback) {
                    $.query(sql, function() {
                        callback_i.apply(this, arguments);
                        callback();
                    });
                };
            })(commands[i]);
        }
        async.waterfall(array, callback_end);
    };
    
// Добавляем в лог
    $.log('Start');
    
// Соединяемся с сервером
    connection.connect(function(err) {
        if (err) {
            $.log('Error connecting database: ' + err.stack);
            return;
        }
        $.log('Connected as id ' + connection.threadId);
    });
    
// Выполняем стартовые запросы
    $.querys($.InitDBSQL(), function() {
    }, function() {
        callback_inited_db();
        /*
        var sql =
        "SELECT * FROM `users` LIMIT 1";
        
        $.query(sql, function(row) {
            if (row) {
                $.log('QUERY Result: ' + row.user_name);
            } else {
                $.log('QUERY EMPTY: ' + this.sql);
            }
        });
        */
    });
};

//--------------------------------------------------------------------------------------------------