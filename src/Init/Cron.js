//--------------------------------------------------------------------------------------------------

var async = require('async');

/*--------------------------------------------------------------------------------------------------
|
| -> Full
|
|-------------------------------------------------------------------------------------------------*/

var Full = {
// Update
    update: false,
    
// Clear
    clear: function() {
        var hour = new Date();
        hour.setMinutes(0, 0, 0);
        hour -= 1000 * 60 * 60 * 2160;// 2160 ч. (90 дн.)
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
            var ms = new Date() - 0;
            var date_hour = new Date();
            var date_minutes = new Date();
            
        // Переводим время в yyyy.mm.dd hh:00:00.000
            date_hour.setMinutes(0, 0, 0);
            
        // Переводим время в yyyy.mm.dd hh:mm:00.000
            date_minutes.setSeconds(0, 0);
            
            var time_hour = date_hour / 1000;
            var time_minute = date_minutes / 1000;
            var last_hour = date_hour.getHours() + 1;
            var last_minute = date_minutes.getMinutes() + 1;
            
            $.Request.start('full');
            
            $.query("SELECT * FROM `users`", function(row, rows) {
                $.Request.end('full');
                
                for (var i = 0; i < rows.length; i++) {
                    (function(row) {
                        $.Request.add('full', row.user_name, function(success, callbackComplete) {
                            async.waterfall([
                            // Media
                                function(callback) {
                                    Full.media(callback, ms, row, success, time_minute);
                                },
                                
                            // Change
                                function(callback) {
                                    Full.change(callback, ms, row, success);
                                },
                                
                            // Minute
                                function(callback) {
                                    Full.minute(callback, ms, row, success, time_minute, last_minute);
                                },
                                
                            // Hour
                                function(callback) {
                                    Full.hour(callback, ms, row, success, time_hour, last_hour);
                                }
                            ],
                            
                        // UserFull
                            function() {
                                if (Full.update == false) {
                                    return callbackComplete();
                                }
                                
                            // Update
                                var sql =
                                    "UPDATE `users` SET " +
                                    
                                        "`last_media` = '"+ row.last_media +"'," +
                                        "`last_hour` = '"+ row.last_hour +"'," +
                                        "`last_minute` = '"+ row.last_minute +"'," +
                                        "`last_plus` = '"+ row.last_plus +"'," +
                                        "`last_minus` = '"+ row.last_minus +"'" +
                                        
                                    " WHERE `user_id` = '"+ row.user_id +" LIMIT 1'";
                                    
                                $.query(sql, function() {
                                    Full.update = false;
                                    callbackComplete();
                                });
                            });
                        });
                    })(rows[i]);
                }
            });
        }
    },
    
// Media
    media: function(complete, ms, row, success, time) {
    // Is
        if (success.last_media == '' || success.last_media == row.last_media) {
            return complete();
        }
        
    // Add
        var sql =
            "INSERT INTO `users_media` (" +
            
                "`media_code`," +
                "`user_id`," +
                "`user_name`," +
                "`tags`," +
                "`time`" +
                
            ") VALUES (" +
            
                "'"+ success.last_media +"'," +
                "'"+ row.user_id +"'," +
                "'"+ row.user_name +"'," +
                "''," +
                "'"+ time +"'" +
                
            ")";
            
        $.query(sql, function() {
        // Update
            row.last_media = success.last_media;
            Full.update = true;
            
        // Log
            $.log(
                $.Colors.bgCyan(
                    'Media: '+ row.user_name +
                    ', '+ row.last_media +
                    ', '+ (new Date() - ms) +'ms'
                )
            );
            
        // Complete
            complete();
        });
    },
    
// Change
    change: function(complete, ms, row, success) {
    // Hour
        Last.plus.hour[row.user_id] = Last.plus.hour[row.user_id]||row.last_plus||0;
        Last.minus.hour[row.user_id] = Last.minus.hour[row.user_id]||row.last_minus||0;
        
    // Minute
        Last.plus.minute[row.user_id] = Last.plus.minute[row.user_id]||0;
        Last.minus.minute[row.user_id] = Last.minus.minute[row.user_id]||0;
        
    // Plus
        if (success.count > Last.count.minute[row.user_id]) {
            Last.plus.hour[row.user_id] += success.count - Last.count.hour[row.user_id];
            Last.plus.minute[row.user_id] += success.count - Last.count.minute[row.user_id];
        }
        
    // Minus
        if (success.count < Last.count.minute[row.user_id]) {
            Last.minus.hour[row.user_id] += Last.count.hour[row.user_id] - success.count;
            Last.minus.minute[row.user_id] += Last.count.minute[row.user_id] - success.count;
        }
        
    // Count
        Last.count.hour[row.user_id] = success.count;
        Last.count.minute[row.user_id] = success.count;
        /*
    // Log
        $.log(
            $.Colors.green(
                'Change: '+ row.user_name +
                ', h[+'+ Last.plus.hour[row.user_id] +
                ', -'+ Last.minus.hour[row.user_id] +']' +
                ', m[+'+ Last.plus.minute[row.user_id] +
                ', -'+ Last.minus.minute[row.user_id] +']' +
                ', '+ (new Date() - ms) +'ms'
            )
        );
        */
    // Complete
        complete();
    },
    
// Minute
    minute: function(complete, ms, row, success, time, last_minute) {
    // Is
        if (row.last_minute == last_minute) {
            return complete();
        }
        
    // Add
        var sql =
            "INSERT INTO `count_minute` (" +
            
                "`user_id`," +
                "`count`," +
                "`plus`," +
                "`minus`," +
                "`time`" +
                
            ") VALUES (" +
            
                "'"+ row.user_id +"'," +
                "'"+ success.count +"'," +
                "'"+ Last.plus.minute[row.user_id] +"'," +
                "'"+ Last.minus.minute[row.user_id] +"'," +
                "'"+ time +"'" +
                
            ")";
            
        $.query(sql, function() {
        // Update
            row.last_minute = last_minute;
            row.last_plus = Last.plus.hour[row.user_id];
            row.last_minus = Last.minus.hour[row.user_id];
            Last.plus.minute[row.user_id] = 0;
            Last.minus.minute[row.user_id] = 0;
            Full.update = true;
            
        // Log
            $.log(
                $.Colors.bgGreen(
                    'Minute: '+ row.user_name +
                    ', '+ success.count +
                    ', '+ (new Date() - ms) +'ms'
                )
            );
            
        // Complete
            complete();
        });
    },
    
// Hour
    hour: function(complete, ms, row, success, time, last_hour) {
    // Is
        if (row.last_hour == last_hour) {
            return complete();
        }
        
    // Add
        var sql =
            "INSERT INTO `count_hour` (" +
            
                "`user_id`," +
                "`count`," +
                "`plus`," +
                "`minus`," +
                "`time`" +
                
            ") VALUES (" +
            
                "'"+ row.user_id +"'," +
                "'"+ success.count +"'," +
                "'"+ Last.plus.hour[row.user_id] +"'," +
                "'"+ Last.minus.hour[row.user_id] +"'," +
                "'"+ time +"'" +
                
            ")";
            
        $.query(sql, function() {
        // Update
            row.last_hour = last_hour;
            row.last_plus = 0;
            row.last_minus = 0;
            Last.plus.hour[row.user_id] = 0;
            Last.minus.hour[row.user_id] = 0;
            Full.update = true;
            
        // Log
            $.log(
                $.Colors.bgYellow(
                    'Hour: '+ row.user_name +
                    ', '+ success.count +
                    ', '+ (new Date() - ms) +'ms'
                )
            );
            
        // Complete
            complete();
        });
    }
};

/*--------------------------------------------------------------------------------------------------
|
| -> Last
|
|-------------------------------------------------------------------------------------------------*/

var Last = {
    count: {hour: {}, minute: {}},
    plus: {hour: {}, minute: {}},
    minus: {hour: {}, minute: {}},
};
/*
 * - Проверить как записывается в таблицу users_media
 * - Новый крон для прогона users_media
**/
/*--------------------------------------------------------------------------------------------------
|
| -> Cron
|
|-------------------------------------------------------------------------------------------------*/

$.Cron = function() {
    Full.action();
    Full.clear();
    //$.log('Cron init!');
};

//--------------------------------------------------------------------------------------------------
/*

// Tags
https://www.instagram.com/explore/tags/vscoflowers/?__a=1

// Reg
https://github.com/Stosiu/as-insta/blob/master/lib/InstagramSimple.js


*/