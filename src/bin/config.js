//--------------------------------------------------------------------------------------------------

var cfg = {};

cfg.host = '95.213.229.167';
cfg.port = 22;
cfg.username = 'root';
cfg.password = 'k0i3n1eqxd';
cfg.path = '/var/projects/instatop';
cfg.gitURL = 'https://github.com/classtype/instatop.git';
cfg.startNode = 'src/index.js';
cfg.mysqlBase = 'Test';

cfg.url = 'http://'+ cfg.host +'/';

cfg.ssh = {
    host: cfg.host,
    port: cfg.port,
    username: cfg.username,
    password: cfg.password
};

module.exports = cfg;

//--------------------------------------------------------------------------------------------------