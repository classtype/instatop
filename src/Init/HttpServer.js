//--------------------------------------------------------------------------------------------------

var express = require('express');
var path = require('path');
var fs = require('fs');

//--------------------------------------------------------------------------------------------------

$.InitHttpServer = function() {
    var app = express();
    
// "/"
    app.get('/', function(req, res) {
        res.send(
            $.Tpl.render('UserInfo', {
                user_id: 1,
                user_name: 'yana_havana'
            })
        );
    });
    
// "/:user_name"
    app.get('/:user_name', function(req, res) {
        var user_name = req.params.user_name;
        
        $.User.getID(user_name, function(user_id) {
            if (!user_id) {
                return res.send(
                    $.Tpl.render('Error', {
                        error_msg: 'Ник "'+ user_name +'" не найден!'
                    })
                );
            }
            
            res.send(
                $.Tpl.render('UserInfo', {
                    user_id: user_id,
                    user_name: user_name
                })
            );
        });
    });
    
// /user/:user_id
    app.get('/user/:user_id', function(req, res) {
        $.User.isID(req.params.user_id, function(user_id) {
            if (!user_id) {
                return res.send(
                    $.Tpl.error('ID "'+ req.params.user_id +'" не найден!')
                );
            }
            
            var json = {
                total: 0,
                day: [0,0,0],
                hour: [0,0,0],
                minute: [0,0,0],
                
            // Чарты
                charts: {
                    day: [],// За все время
                    hour: [],// За месяц
                    minute: []// За день
                }
            };
            
            var sql =
                "SELECT * FROM `count_day` " +
                "WHERE `user_id` = ? " +
                "ORDER BY `time` ASC";
                
            $.query(sql, [user_id], function(row, rows) {
                for (var i = 0; i < rows.length; i++) {
                    json.charts.day.push([rows[i].time, rows[i].count]);
                }
                
            // По дням
                if (rows.length) {
                // Всего подписчиков
                    json.total = rows[rows.length - 1].count;
                    
                // За последний 1 день
                    json.day[2] = (rows.length - 2 >= 0 ? json.total - rows[rows.length - 2].count : 0);
                    
                // За последние 7 дней
                    json.day[1] = (rows.length - 8 >= 0 ? json.total - rows[rows.length - 8].count : json.total - rows[0].count);
                    
                // За последние 14 дней
                    json.day[0] = (rows.length - 15 >= 0 ? json.total - rows[rows.length - 15].count : json.total - rows[0].count);
                }
                
                var sql =
                    "SELECT * FROM `count_hour` " +
                    "WHERE `user_id` = ? " +
                    "ORDER BY `time` ASC";
                    
                $.query(sql, [user_id], function(row, rows) {
                    for (var i = 0; i < rows.length; i++) {
                        json.charts.hour.push([rows[i].time, rows[i].count]);
                    }
                    
                // По часам
                    if (rows.length) {
                    // Всего подписчиков
                        json.total = rows[rows.length - 1].count;
                        
                    // За последние 3 часа
                        json.hour[2] = (rows.length - 5 >= 0 ? json.total - rows[rows.length - 5].count : json.total - rows[0].count);
                        
                    // За последние 6 часов
                        json.hour[1] = (rows.length - 7 >= 0 ? json.total - rows[rows.length - 7].count : json.total - rows[0].count);
                        
                    // За последние 12 часов
                        json.hour[0] = (rows.length - 13 >= 0 ? json.total - rows[rows.length - 13].count : json.total - rows[0].count);
                    }
                    
                    var sql =
                        "SELECT * FROM `count_minute` " +
                        "WHERE `user_id` = ? " +
                        "ORDER BY `time` ASC";
                        
                    $.query(sql, [user_id], function(row, rows) {
                        for (var i = 0; i < rows.length; i++) {
                            json.charts.minute.push([rows[i].time, rows[i].count]);
                        }
                        
                    // По минутам
                        if (rows.length) {
                        // Всего подписчиков
                            json.total = rows[rows.length - 1].count;
                            
                        // За последние 15 минут
                            json.minute[2] = (rows.length - 16 >= 0 ? json.total - rows[rows.length - 16].count : json.total - rows[0].count);
                            
                        // За последние 30 минут
                            json.minute[1] = (rows.length - 31 >= 0 ? json.total - rows[rows.length - 31].count : json.total - rows[0].count);
                            
                        // За последние 60 минут
                            json.minute[0] = (rows.length - 61 >= 0 ? json.total - rows[rows.length - 61].count : json.total - rows[0].count);
                        }
                        
                    // Форматируем
                        for (var t in json.charts) {
                            for (var i = 0; i < json[t].length; i++) {
                                json[t][i] =  [(json[t][i] > 0 ? '+' : '–'), Math.abs(json[t][i]).toLocaleString()];
                            }
                        }
                        
                        json.total = json.total.toLocaleString();
                        
                        res.send(JSON.stringify(json));
                    });
                });
            });
        });
    });
    
    app.listen($.cfg.http.PORT, $.cfg.http.IP);
    
// Записываем в лог
    $.log('Server running at.');
};

//--------------------------------------------------------------------------------------------------