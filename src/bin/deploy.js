//--------------------------------------------------------------------------------------------------

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
    ssh({
        host: '95.213.229.167',
        port: 22,
        username: 'root',
        password: 'yesqzgf5ej'
    },[
        'rm -rf /var/projects/instatop',
        'mkdir -p /var/projects/instatop',
        'git clone https://github.com/classtype/instatop.git /var/projects/instatop',
        'cd /var/projects/instatop && npm i --unsafe-perm',
        'forever stopall',
        'forever start /var/projects/instatop/src/index.js'
    ]);
});

//--------------------------------------------------------------------------------------------------