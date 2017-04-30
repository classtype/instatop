//--------------------------------------------------------------------------------------------------

var express = require('express');

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
    
// "change/:user_name"
    app.get('/change/:user_name', function(req, res) {
        $.Tpl.getChange(req, res, req.params.user_name);
    });
    
// /user_change/:user_id
    app.get('/user_change/:user_id', function(req, res) {
        $.User.isID(req.params.user_id, function(user_id) {
        // Проверка
            if (!user_id) {
                return res.send(
                    $.Tpl.error('Аккаунт с ID "'+ req.params.user_id +'" не найден!')
                );
            }
            
        // Json
            var json = {
            // Всего подписчиков
                total: 0,
                
            // Количество подписчиков за определенное время
                count: {
                    day: [0,0],// За день
                    week: [0,0],// За неделю
                    month: [0,0],// За месяц
                    month3: [0,0]// За три месяца
                },
                
            // Чарты
                charts: {
                    day: [],// За день
                    week: [],// За неделю
                    month: [],// За месяц
                    month3: []// За три месяца
                }
            };
            
        // За день
            var sql =
                "SELECT * FROM `count_minute` " +
                "WHERE `user_id` = ? " +
                "ORDER BY `time` ASC";
                
            $.query(sql, [user_id], function(row, rows) {
                var day = [0,0];
                
                for (var i = 0; i < rows.length; i++) {
                    day[0] += rows[i].plus;
                    day[1] += rows[i].minus;
                    json.charts.day.push([rows[i].time, day[0], day[1]]);
                    //json.charts.day.push([rows[i].time, rows[i].plus, rows[i].minus]);
                    
                // За последние 60 минут
                    if (rows.length - 61 <= i) {
                        json.count.day[0] += rows[i].plus;
                        json.count.day[1] -= rows[i].minus;
                    }
                    
                // За последние 12 часов
                    if (rows.length - 721 <= i) {
                        json.count.week[0] += rows[i].plus;
                        json.count.week[1] -= rows[i].minus;
                    }
                    
                // За последние 24 часа
                    json.count.month[0] += rows[i].plus;
                    json.count.month[1] -= rows[i].minus;
                }
                
            // Всего подписчиков
                json.total = json.total || rows[rows.length - 1].count;
                
            // За неделю
                var sql =
                    "SELECT * FROM `count_hour` " +
                    "WHERE `user_id` = ? " +
                    "ORDER BY `time` DESC LIMIT 168";
                    
                $.query(sql, [user_id], function(row, rows) {
                    var week = [0,0];
                    
                    for (var i = rows.length - 1; i >= 0; i--) {
                        week[0] += rows[i].plus;
                        week[1] += rows[i].minus;
                        json.charts.week.push([rows[i].time, week[0], week[1]]);
                        //json.charts.week.push([rows[i].time, rows[i].plus, rows[i].minus]);
                        
                    // За последние 7 дней
                        json.count.month3[0] += rows[i].plus;
                        json.count.month3[1] -= rows[i].minus;
                    }
                    
                // За месяц
                    var sql =
                        "SELECT * FROM `count_hour` " +
                        "WHERE `user_id` = ? " +
                        "ORDER BY `time` DESC LIMIT 720";
                        
                    $.query(sql, [user_id], function(row, rows) {
                        var month = [0,0];
                        
                        for (var i = rows.length - 1; i >= 0; i--) {
                            month[0] += rows[i].plus;
                            month[1] += rows[i].minus;
                            json.charts.month.push([rows[i].time, month[0], month[1]]);
                            //json.charts.month.push([rows[i].time, rows[i].plus, rows[i].minus]);
                        }
                        
                    // За три месяца
                        var sql =
                            "SELECT * FROM `count_hour` " +
                            "WHERE `user_id` = ? " +
                            "ORDER BY `time` ASC";
                            
                        $.query(sql, [user_id], function(row, rows) {
                            var month3 = [0,0];
                            
                            for (var i = 0; i < rows.length; i++) {
                                month3[0] += rows[i].plus;
                                month3[1] += rows[i].minus;
                                json.charts.month3.push([rows[i].time, month3[0], month3[1]]);
                                //json.charts.month3.push([rows[i].time, rows[i].plus, rows[i].minus]);
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
    
// /user/:user_id
    app.get('/user/:user_id', function(req, res) {
        $.User.isID(req.params.user_id, function(user_id) {
        // Проверка
            if (!user_id) {
                return res.send(
                    $.Tpl.error('Аккаунт с ID "'+ req.params.user_id +'" не найден!')
                );
            }
            
        // Json
            var json = {
            // Всего подписчиков
                total: 0,
                
            // Количество подписчиков за определенное время
                count: {
                    day: [0,0],// За день
                    week: [0,0],// За неделю
                    month: [0,0],// За месяц
                    month3: [0,0]// За три месяца
                },
                
            // Чарты
                charts: {
                    day: [],// За день
                    week: [],// За неделю
                    month: [],// За месяц
                    month3: []// За три месяца
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
                
            // За неделю
                var sql =
                    "SELECT * FROM `count_hour` " +
                    "WHERE `user_id` = ? " +
                    "ORDER BY `time` DESC LIMIT 168";
                    
                $.query(sql, [user_id], function(row, rows) {
                    for (var i = rows.length - 1; i >= 0; i--) {
                        json.charts.week.push([rows[i].time, rows[i].count]);
                    }
                    
                // За последние 7 дней
                    json.count.month[1] = json.total - rows[rows.length - 1].count;
                    
                // За месяц
                    var sql =
                        "SELECT * FROM `count_hour` " +
                        "WHERE `user_id` = ? " +
                        "ORDER BY `time` DESC LIMIT 720";
                        
                    $.query(sql, [user_id], function(row, rows) {
                        for (var i = rows.length - 1; i >= 0; i--) {
                            json.charts.month.push([rows[i].time, rows[i].count]);
                        }
                        
                    // За последние 30 дней
                        json.count.month3[0] = json.total - rows[rows.length - 1].count;
                        
                    // За три месяца
                        var sql =
                            "SELECT * FROM `count_hour` " +
                            "WHERE `user_id` = ? " +
                            "ORDER BY `time` ASC";
                            
                        $.query(sql, [user_id], function(row, rows) {
                            for (var i = 0; i < rows.length; i++) {
                                json.charts.month3.push([rows[i].time, rows[i].count]);
                            }
                            
                        // За последние 90 дней
                            json.count.month3[1] = json.total - rows[0].count;
                            
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