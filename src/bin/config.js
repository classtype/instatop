//--------------------------------------------------------------------------------------------------

var cfg = {};

cfg.host = '95.213.229.167';
cfg.port = 22;
cfg.username = 'root';
cfg.password = 'neo9t3yx52';
cfg.path = '/var/projects/instatop';
cfg.gitURL = 'https://github.com/classtype/instatop.git';
cfg.startNode = 'src/index.js';

cfg.url = 'http://'+ cfg.host +'/';

cfg.ssh = {
    host: cfg.host,
    port: cfg.port,
    username: cfg.username,
    password: cfg.password
};

module.exports = cfg;

//--------------------------------------------------------------------------------------------------