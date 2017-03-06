//--------------------------------------------------------------------------------------------------

var path = require('path');
var fs = require('fs');
var ejs = require('ejs');

//--------------------------------------------------------------------------------------------------

$.Tpl = {
    list: {},
    ids: [
        'UserInfo',// Статистика юзеа
        'Error'// Вывод ошибок
    ],
    
    init: function() {
        for (var i = 0; i < this.ids.length; i++) {
            var id = this.ids[i];
            this.list[id] =
            fs.readFileSync(path.resolve(__dirname, '..', '..', 'src', 'Static', id +'.html'), 'utf8');
        }
    },
    
    render: function(id, options) {
        return ejs.render(this.list[id], options);
    },
    
    error: function(error_msg) {
        return JSON.stringify({
            status: 'error',
            error_msg: error_msg
        });
    },
    
    getCharts: function(req, res, user_name) {
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
    }
};

//--------------------------------------------------------------------------------------------------