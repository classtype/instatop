//--------------------------------------------------------------------------------------------------

var cfg = {};

cfg.isDev = (process.env.C9_USER ? true : false);
cfg.host = '95.213.229.167';
cfg.port = 22;
cfg.username = 'root';
cfg.password = 'wk44uceu3y';

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

cfg.http = {
    IP: null,
    PORT: 80
};

cfg.mysql = {
    password: 'Test',
    database: 'Test',
    connect: {}
};

cfg.mysql.connect = {
    host: 'localhost',
    user: 'root',
    password: cfg.mysql.password,
    database: null
};

//--------------------------------------------------------------------------------------------------

    if (cfg.isDev) {
        cfg.http.IP = process.env.IP;
        cfg.http.PORT = process.env.PORT;
        
        cfg.mysql.connect.user = 'classtype';
        cfg.mysql.connect.password = '';
        cfg.mysql.connect.database = 'c9';
    }
    
//--------------------------------------------------------------------------------------------------

module.exports = cfg;

//--------------------------------------------------------------------------------------------------