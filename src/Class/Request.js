//--------------------------------------------------------------------------------------------------

var request = require('request');
var _limit = 10;
var _list = {};
var _start = {};
var _types = {};
var _users = {};

//--------------------------------------------------------------------------------------------------

var Type = {
    countUpdate: function(type) {
        var i = 0;
        
        for (i in _types[type]) {
            i++;
        }
        
        if (i == 0) {
            delete _types[type];
        }
    },
    
    start: function(type) {
        _start[type] = new Date() - 0;
    },
    
    end: function(type) {
        delete _start[type];
    },
    
    is: function(type) {
        return type in _types || type in _start ? true : false;
    },
    
    add: function(type, user) {
    // Типы
        if (!(type in _types)) {
            _types[type] = {};
        }
        
    // Юзеры
        if (!(user in _users)) {
            _users[user] = {};
        }
        _types[type][user] = true;
        _users[user][type] = true;
    },
    
    remove: function(user) {
        if (user in _users) {
            for (var type in _users[user]) {
                if (type in _types) {
                    delete _types[type][user];
                    Type.countUpdate(type);
                }
            }
            delete _users[user];
        }
    }
};

//--------------------------------------------------------------------------------------------------

$.Request = {
    start: function(type) {
        Type.start(type);
    },
    
    end: function(type) {
        Type.end(type);
    },
    
    is: function(type) {
        var time = new Date() - _limit * 1000;
        
        for (var t in _start) {
            if (time > _start[t]) {
                delete _start[t];
            }
        }
        
        for (var id in _list) {
            if (time > _list[id].time) {
                $.Request.remove(id);
            }
        }
        
        return Type.is(type) ? false : true;
    },
    
    remove: function(id) {
        delete _list[id];
        Type.remove(id);
    },
    
    add: function(type, id, callback) {
        Type.add(type, id);
        
        var callbackNextTick = function() {
            if (callback) {
                var args = arguments;
                process.nextTick(function() {
                    callback.apply(this, args);
                });
            }
        };
        
        if (id in _list) {
            _list[id].callbacks.push(callbackNextTick);
        }
        
        else {
            _list[id] = {
                callbacks: [callbackNextTick],
                time: new Date() - 0
            };
            
            var url = 'https://www.instagram.com/'+ id +'/?__a=1';
            request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(body);
                    
                    if (json.user && json.user.followed_by) {
                        var count = json.user.followed_by.count;
                        var last_media = '';
                        
                        if (json.user.media
                        &&  json.user.media.nodes
                        &&  json.user.media.nodes[0]
                        &&  json.user.media.nodes[0].code) {
                            last_media = json.user.media.nodes[0].code;
                        }
                        
                        //console.log(count);
                        //console.log(last_media);
                        
                        $.Request.action(id, {
                           count: count,
                           last_media: last_media
                        });
                    }
                }
            });
        }
    },
    
    action: function(id, success) {
        if (id in _list) {
            for (var i = 0; i < _list[id].callbacks.length; i++) {
                _list[id].callbacks[i](success, function() {
                    $.Request.remove(id);
                });
            }
        }
    }
};

//--------------------------------------------------------------------------------------------------