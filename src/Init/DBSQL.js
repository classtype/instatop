//--------------------------------------------------------------------------------------------------

$.InitDBSQL = function() {
    return [
    // Удаляем старую базу данных (временно)
        //"DROP DATABASE IF EXISTS `"+ $.cfg.mysql.database +"`",
        
    // Создаем базу данных
        "CREATE DATABASE IF NOT EXISTS `"+ $.cfg.mysql.database +"` " +
        "DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'",
        
    // Выбираем созданную базу
        "USE `"+ $.cfg.mysql.database +"`",
        
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
            "`user_name` varchar(30) NOT NULL," +
            "`last_hour` tinyint(3) unsigned NOT NULL," +
            "PRIMARY KEY (`user_id`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Создаем таблицу "count_day"
        "CREATE TABLE IF NOT EXISTS `count_day` (" +
            "`user_id` int(10) unsigned NOT NULL," +
            "`count` int(10) unsigned NOT NULL," +
            "`time` int(10) unsigned NOT NULL," +
            "KEY `user_id` (`user_id`,`time`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Создаем таблицу "count_hour"
        "CREATE TABLE IF NOT EXISTS `count_hour` (" +
            "`user_id` int(10) unsigned NOT NULL," +
            "`count` int(10) unsigned NOT NULL," +
            "`time` int(10) unsigned NOT NULL," +
            "KEY `user_id` (`user_id`,`time`)," +
            "KEY `time` (`time`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Создаем таблицу "count_minute"
        "CREATE TABLE IF NOT EXISTS `count_minute` (" +
            "`user_id` int(10) unsigned NOT NULL," +
            "`count` int(10) unsigned NOT NULL," +
            "`time` int(10) unsigned NOT NULL," +
            "KEY `user_id` (`user_id`,`time`)," +
            "KEY `time` (`time`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Добавляем строки в таблицу "users"
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('yana_havana')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('svoyboi')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('timatiofficial')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('kadyrov_95')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('artempolishchuk')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('lena_komar')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('lisavetaav')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('vladislavderugka')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('julia_diadyk')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('tatianatkachuk')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('sashashapik')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('andrey.martynenko')",
        
    // Добавляем строки в таблицу "users_full"
        "INSERT IGNORE INTO `users_full` (" +
        
            "`user_id`," +
            "`user_name`" +
            
            ") VALUES (" +
            
            "(SELECT `user_id` FROM `users` WHERE `user_name` = 'yana_havana' LIMIT 1)," +
            "'yana_havana'" +
            
        ")",
        
        "INSERT IGNORE INTO `users_full` (" +
        
            "`user_id`," +
            "`user_name`" +
            
            ") VALUES (" +
            
            "(SELECT `user_id` FROM `users` WHERE `user_name` = 'kadyrov_95' LIMIT 1)," +
            "'kadyrov_95'" +
            
        ")",
        
        "INSERT IGNORE INTO `users_full` (" +
        
            "`user_id`," +
            "`user_name`" +
            
            ") VALUES (" +
            
            "(SELECT `user_id` FROM `users` WHERE `user_name` = 'svoyboi' LIMIT 1)," +
            "'svoyboi'" +
            
        ")"
    ];
};

//--------------------------------------------------------------------------------------------------