//--------------------------------------------------------------------------------------------------

var config = require('./config');
var exec = require('./exec');
var ssh = require('./ssh');

//--------------------------------------------------------------------------------------------------

// Заливаем на GitHub
exec([
    ['clear'],
    ['git', 'add', '.'],
    ['git', 'commit', '-m', '"update"'],
    ['git', 'push']
], function() {
// Заходим на сервер
    ssh(config.ssh, [
        'rm -rf '+ config.path,
        'mkdir -p '+ config.path,
        'git clone '+ config.gitURL +' '+config.path,
        'cd '+ config.path +' && npm i --unsafe-perm',
        'forever stopall',
        'forever start '+ config.path +'/'+ config.startNode
    ]);
});

//--------------------------------------------------------------------------------------------------