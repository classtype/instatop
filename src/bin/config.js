//--------------------------------------------------------------------------------------------------

var cfg = {};

cfg.host = '95.213.229.167';
cfg.port = 22;
cfg.username = 'root';
cfg.password = 'i012ruyvzz';
cfg.path = '/var/projects/instatop';
cfg.gitURL = 'https://github.com/classtype/instatop.git';
cfg.startNode = 'src/index.js';
cfg.mysql = {
    user: 'root',
    password: 'Test',
    database: 'Test'
};

cfg.url = 'http://'+ cfg.host +'/';

cfg.ssh = {
    host: cfg.host,
    port: cfg.port,
    username: cfg.username,
    password: cfg.password
};

module.exports = cfg;

//--------------------------------------------------------------------------------------------------