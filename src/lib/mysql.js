//--------------------------------------------------------------------------------------------------

var async = require('async');

//--------------------------------------------------------------------------------------------------

module.exports = function(connection) {
    connection.querys = function(commands, callback_i, callback_end) {
        var array = [];
        for (var i = 0; i < commands.length; i++) {
            array[i] = (function(sql) {
                return function(callback) {
                    connection.query(sql, function() {
                        callback_i.apply({sql:sql}, arguments);
                        callback();
                    });
                };
            })(commands[i]);
        }
        async.waterfall(array, callback_end);
    };
};

//--------------------------------------------------------------------------------------------------