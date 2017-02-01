/*--------------------------------------------------------------------------------------------------
|
| -> Day
|
|-------------------------------------------------------------------------------------------------*/

var Day = {
// Action
    action: function() {
        if ($.Request.is('day')) {
            var t = new Date() - 0;
            var date = new Date();
            
        // Переводим время в yyyy.mm.dd 00:00:00.000
            date.setHours(0, 0, 0, 0);
            
            var time = date / 1000;
            var last_day = date.getDay() + 1;
            
            var sql =
            "SELECT * FROM `users` " +
            "WHERE `last_day` != '"+ last_day +"' LIMIT 1000";
            
            $.Request.start('day');
            
            $.query(sql, function(row, rows) {
                $.Request.end('day');
                
                for (var i = 0; i < rows.length; i++) {
                    Day.add(
                        rows[i].user_id,
                        rows[i].user_name,
                        time,
                        last_day, t
                    );
                }
            });
        }
    },
    
// Add
    add: function(user_id, user_name, time, last_day, t) {
        $.Request.add('day', user_name, function(count, callbackComplete) {
            var sql =
                "UPDATE `users` SET `last_day` = '"+ last_day +"' " +
                "WHERE `user_id` = '"+ user_id +" LIMIT 1'";
                
            $.query(sql, function() {
                var sql =
                    "INSERT INTO `count_day` (" +
                    
                        "`user_id`," +
                        "`count`," +
                        "`time`" +
                        
                    ") VALUES (" +
                    
                        "'"+ user_id +"'," +
                        "'"+ count +"'," +
                        "'"+ time +"'" +
                        
                    ")";
                    
                $.query(sql, function() {
                    callbackComplete();
                });
            });
            
            $.log('Day: ' + user_name + ', ' + count + ', ' + (new Date() - t) + 'ms');
        });
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Full
|
|-------------------------------------------------------------------------------------------------*/

var Full = {
// Clear
    clear: function() {
        var hour = new Date();
        hour.setMinutes(0, 0, 0);
        hour -= 1000 * 60 * 60 * 720;// 720 ч. (30 дн.)
        hour /= 1000;
        
        var minute = new Date();
        minute.setSeconds(0, 0);
        minute -= 1000 * 60 * 1440;// 1440 мин. (24 ч.)
        minute /= 1000;
        
        $.query("DELETE FROM `count_hour` WHERE `time` < '"+ hour +"'");
        $.query("DELETE FROM `count_minute` WHERE `time` < '"+ minute +"'");
    },
    
// Action
    action: function() {
        if ($.Request.is('full')) {
            var t = new Date() - 0;
            var date_hour = new Date();
            var date_minutes = new Date();
            
        // Переводим время в yyyy.mm.dd hh:00:00.000
            date_hour.setMinutes(0, 0, 0);
            
        // Переводим время в yyyy.mm.dd hh:mm:00.000
            date_minutes.setSeconds(0, 0);
            
            var time = date_hour / 1000;
            var time_minutes = date_minutes / 1000;
            var last_hour = date_hour.getHours() + 1;
            
            $.Request.start('full');
            
            $.query("SELECT * FROM `users_full`", function(row, rows) {
                $.Request.end('full');
                
                for (var i = 0; i < rows.length; i++) {
                // Hour
                    if (rows[i].last_hour != last_hour) {
                        Full.hour(
                            rows[i].user_id,
                            rows[i].user_name,
                            time,
                            last_hour, t
                        );
                    }
                    
                // Minute
                    Full.minute(
                        rows[i].user_id,
                        rows[i].user_name,
                        time_minutes, t
                    );
                }
            });
        }
    },
    
// Hour
    hour: function(user_id, user_name, time, last_hour, t) {
        $.Request.add('full', user_name, function(count, callbackComplete) {
            var sql =
                "UPDATE `users_full` SET `last_hour` = '"+ last_hour +"' " +
                "WHERE `user_id` = '"+ user_id +" LIMIT 1'";
                
            $.query(sql, function() {
                var sql =
                    "INSERT INTO `count_hour` (" +
                    
                        "`user_id`," +
                        "`count`," +
                        "`time`" +
                        
                    ") VALUES (" +
                    
                        "'"+ user_id +"'," +
                        "'"+ count +"'," +
                        "'"+ time +"'" +
                        
                    ")";
                    
                $.query(sql, function() {
                    callbackComplete();
                });
            });
            
            $.log('Hour: ' + user_name + ', ' + count + ', ' + (new Date() - t) + 'ms');
        });
    },
    
// Minute
    minute: function(user_id, user_name, time, t) {
        $.Request.add('full', user_name, function(count, callbackComplete) {
            var sql =
                "INSERT INTO `count_minute` (" +
                
                    "`user_id`," +
                    "`count`," +
                    "`time`" +
                    
                ") VALUES (" +
                
                    "'"+ user_id +"'," +
                    "'"+ count +"'," +
                    "'"+ time +"'" +
                    
                ")";
                
            $.query(sql, function() {
                callbackComplete();
            });
            
            $.log('Minute: ' + user_name + ', ' + count + ', ' + (new Date() - t) + 'ms');
        });
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Cron
|
|-------------------------------------------------------------------------------------------------*/

$.Cron = function() {
    Day.action();
    Full.action();
    Full.clear();
    $.log('Cron init!');
};

//--------------------------------------------------------------------------------------------------