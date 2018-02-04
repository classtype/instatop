//--------------------------------------------------------------------------------------------------

var cfg = {};
/* 40011.selvpc.ru */
cfg.isDev = (process.env.C9_USER ? true : false);
//cfg.host = '95.213.230.1990';
cfg.host = '31.186.100.172';
cfg.port = 22;
cfg.username = 'root';
//cfg.password = 'p4ue9yfx8k';
cfg.password = '9ysfbvxx17';

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
    PORT: 81
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
    }
    
//--------------------------------------------------------------------------------------------------

module.exports = cfg;

//--------------------------------------------------------------------------------------------------