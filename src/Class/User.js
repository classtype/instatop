//--------------------------------------------------------------------------------------------------

$.User = {
    isID: function(user_id, callback) {
        $.query("SELECT * FROM `users` WHERE `user_id` = ? LIMIT 1", [user_id], function(row) {
            if (typeof callback == 'function') {
                callback(typeof row == 'object' ? row.user_id : undefined);
            }
        });
    },
    
    getID: function(user_name, callback) {
        $.query("SELECT * FROM `users` WHERE `user_name` = ? LIMIT 1", [user_name], function(row) {
            if (typeof callback == 'function') {
                callback(typeof row == 'object' ? row.user_id : undefined);
            }
        });
    }
};

//--------------------------------------------------------------------------------------------------