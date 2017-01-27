//--------------------------------------------------------------------------------------------------

var express = require('express');
var fs = require('fs');
var page_content = '';

//--------------------------------------------------------------------------------------------------

fs.readFile('/var/projects/instatop/src/Static/index.html', 'utf8', function(err, data) {
    if (err) {
        $.log(err);
        return;
    }
    
    page_content += data;
});

$.log('patch: '+ __filename);

//--------------------------------------------------------------------------------------------------

$.InitHttpServer = function() {
    var app = express();
    
// "/"
    app.get('/', function (req, res) {
        res.send(page_content ? page_content : $.log());
    });
    
    app.listen($.cfg.http.PORT, $.cfg.http.IP);
    
// "yana_havana"
    app.get('/yana_havana', function (req, res) {
        var sql =
            "SELECT * FROM `count_hour` " +
            "WHERE `user_id` = '1' " +
            "ORDER BY `time` ASC";
            
        $.query(sql, function(row, rows) {
            var charts = {hour: [], minute: []};
            
            for (var i = 0; i < rows.length; i++) {
                charts.hour.push({time: rows[i].time, count: rows[i].count});
            }

            var sql =
                "SELECT * FROM `count_minute` " +
                "WHERE `user_id` = '1' " +
                "ORDER BY `time` ASC";
                
            $.query(sql, function(row, rows) {
                for (var i = 0; i < rows.length; i++) {
                    charts.minute.push({time: rows[i].time, count: rows[i].count});
                }
                
                res.send(JSON.stringify(charts));
            });
        });
    });
    
    app.listen($.cfg.http.PORT, $.cfg.http.IP);
    
// Записываем в лог
    $.log('Server running at.');
};

//--------------------------------------------------------------------------------------------------