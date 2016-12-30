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
        'rm -rf /var/projects/instatop',
        'mkdir -p /var/projects/instatop',
        'git clone https://github.com/classtype/instatop.git /var/projects/instatop',
        'cd /var/projects/instatop && npm i --unsafe-perm',
        'forever stopall',
        'forever start /var/projects/instatop/src/index.js'
    ]);
});

//--------------------------------------------------------------------------------------------------