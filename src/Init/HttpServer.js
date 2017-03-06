//--------------------------------------------------------------------------------------------------

var express = require('express');
var path = require('path');
var fs = require('fs');

//--------------------------------------------------------------------------------------------------

$.InitHttpServer = function() {
    var app = express();
    
// "/"
    app.get('/', function(req, res) {
        $.Tpl.getCharts(req, res, req.get('host') == 'svoyboi.com' ? 'svoyboi' : 'yana_havana');
    });
    
// "/:user_name"
    app.get('/:user_name', function(req, res) {
        $.Tpl.getCharts(req, res, req.params.user_name);
    });
    
// /user/:user_id
    app.get('/user/:user_id', function(req, res) {
        $.User.isID(req.params.user_id, function(user_id) {
            if (!user_id) {
                return res.send(
                    $.Tpl.error('Аккаунт с ID "'+ req.params.user_id +'" не найден!')
                );
            }
            
            var json = {
            // Всего подписчиков
                total: 0,
                
            // Количество подписчиков за определенное время
                count: {
                    day: [0,0],// За день
                    week: [0,0],// За неделю
                    month: [0,0],// За месяц
                    total: [0,0]// За все время
                },
                
            // Чарты
                charts: {
                    day: [],// За день
                    week: [],// За неделю
                    month: [],// За месяц
                    total: []// За все время
                }
            };
            
        // За день
            var sql =
                "SELECT * FROM `count_minute` " +
                "WHERE `user_id` = ? " +
                "ORDER BY `time` ASC";
                
            $.query(sql, [user_id], function(row, rows) {
                for (var i = 0; i < rows.length; i++) {
                    json.charts.day.push([rows[i].time, rows[i].count]);
                }
                
            // По минутам
                if (rows.length) {
                // Всего подписчиков
                    json.total = json.total || rows[rows.length - 1].count;
                    
                // За последние 15 минут
                    json.count.day[0] = (rows.length - 16 >= 0 ? json.total - rows[rows.length - 16].count : json.total - rows[0].count);
                    
                // За последние 60 минут
                    json.count.day[1] = (rows.length - 61 >= 0 ? json.total - rows[rows.length - 61].count : json.total - rows[0].count);
                    
                // За последние 3 часа
                    json.count.week[0] = (rows.length - 181 >= 0 ? json.total - rows[rows.length - 181].count : json.total - rows[0].count);
                    
                // За последние 12 часов
                    json.count.week[1] = (rows.length - 721 >= 0 ? json.total - rows[rows.length - 721].count : json.total - rows[0].count);
                    
                // За последний 1 день
                    json.count.month[0] = json.total - rows[0].count;
                }
                
            // За неделю
                var sql =
                    "SELECT * FROM `count_hour` " +
                    "WHERE `user_id` = ? " +
                    "ORDER BY `time` DESC LIMIT 168";
                    
                $.query(sql, [user_id], function(row, rows) {
                    for (var i = 0; i < rows.length; i++) {
                        json.charts.week.push([rows[i].time, rows[i].count]);
                    }
                    
                // За месяц
                    var sql =
                        "SELECT * FROM `count_hour` " +
                        "WHERE `user_id` = ? " +
                        "ORDER BY `time` ASC";
                        
                    $.query(sql, [user_id], function(row, rows) {
                        for (var i = 0; i < rows.length; i++) {
                            json.charts.month.push([rows[i].time, rows[i].count]);
                        }
                        
                    // За все время
                        var sql =
                            "SELECT * FROM `count_day` " +
                            "WHERE `user_id` = ? " +
                            "ORDER BY `time` ASC";
                            
                        $.query(sql, [user_id], function(row, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                json.charts.total.push([rows[i].time, rows[i].count]);
                            }
                            
                        // По дням
                            if (rows.length) {
                            // Всего подписчиков
                                json.total = json.total || rows[rows.length - 1].count;
                                
                            // За последний 1 день
                                json.count.month[0] = json.count.month[0] || (rows.length - 2 >= 0 ? json.total - rows[rows.length - 2].count : 0);
                                
                            // За последние 7 дней
                                json.count.month[1] = (rows.length - 8 >= 0 ? json.total - rows[rows.length - 8].count : json.total - rows[0].count);

                            // За последние 30 дней
                                json.count.total[0] = (rows.length - 31 >= 0 ? json.total - rows[rows.length - 31].count : json.total - rows[0].count);

                            // За последние 365 дней
                                json.count.total[1] = (rows.length - 366 >= 0 ? json.total - rows[rows.length - 365].count : json.total - rows[0].count);
                            }
                            
                        // Форматируем
                            for (var t in json.charts) {
                                for (var i = 0; i < json.count[t].length; i++) {
                                    json.count[t][i] =  [(json.count[t][i] >= 0 ? '+' : '–'), Math.abs(json.count[t][i]).toLocaleString()];
                                }
                            }
                            
                            json.total = json.total.toLocaleString();
                            
                            res.send(JSON.stringify(json));
                        });
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