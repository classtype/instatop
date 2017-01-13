//--------------------------------------------------------------------------------------------------

var config = require('./config');

//--------------------------------------------------------------------------------------------------

module.exports = [
// Создаем базу данных
    "CREATE DATABASE IF NOT EXISTS `" + config.mysql.database + "` " +
    "DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'",
    
// Выбираем созданную базу
    "USE `" + config.mysql.database + "`",
    
// Создаем таблицу "count_day"
    "CREATE TABLE IF NOT EXISTS `count_day` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`count` int(10) unsigned NOT NULL," +
        "`time` int(10) unsigned NOT NULL," +
        "KEY `user_id` (`user_id`,`time`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
    
// Создаем таблицу "count_hours"
    "CREATE TABLE IF NOT EXISTS `count_hours` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`count` int(10) unsigned NOT NULL," +
        "`time` int(10) unsigned NOT NULL," +
        "KEY `user_id` (`user_id`,`time`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
    
// Создаем таблицу "count_minutes"
    "CREATE TABLE IF NOT EXISTS `count_minutes` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`count` int(10) unsigned NOT NULL," +
        "`time` int(10) unsigned NOT NULL," +
        "KEY `user_id` (`user_id`,`time`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
    
// Создаем таблицу "count_seconds"
    "CREATE TABLE IF NOT EXISTS `count_seconds` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`count` int(10) unsigned NOT NULL," +
        "`time` int(10) unsigned NOT NULL," +
        "KEY `user_id` (`user_id`,`time`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
    
// Создаем таблицу "users"
    "CREATE TABLE IF NOT EXISTS `users` (" +
        "`user_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "`user_name` varchar(30) NOT NULL," +
        "`last_day` tinyint(3) unsigned NOT NULL," +
        "PRIMARY KEY (`user_id`)," +
        "UNIQUE KEY `user_name` (`user_name`)," +
        "KEY `last_day` (`last_day`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1",
    
// Создаем таблицу "users_full"
    "CREATE TABLE IF NOT EXISTS `users_full` (" +
        "`user_id` int(10) unsigned NOT NULL," +
        "`last_m` tinyint(3) unsigned NOT NULL," +
        "`last_h` tinyint(3) unsigned NOT NULL," +
        "PRIMARY KEY (`user_id`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
    
    "INSERT IGNORE INTO `users` (`user_name`) VALUES ('yana_havana')"
];

//--------------------------------------------------------------------------------------------------