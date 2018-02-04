//--------------------------------------------------------------------------------------------------

$.InitDBSQL = function() {
    return [
    // Удаляем старую базу данных (временно)
        "DROP DATABASE IF EXISTS `"+ $.cfg.mysql.database +"`",
        
    // Создаем базу данных
        "CREATE DATABASE IF NOT EXISTS `"+ $.cfg.mysql.database +"` " +
        "DEFAULT CHARACTER SET = 'utf8' DEFAULT COLLATE 'utf8_general_ci'",
        
    // Выбираем созданную базу
        "USE `"+ $.cfg.mysql.database +"`",
        
    // Создаем таблицу "users"
        "CREATE TABLE IF NOT EXISTS `users` (" +
            "`user_id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
            "`user_name` varchar(30) NOT NULL," +
            "`last_media` varchar(30) NOT NULL," +
            "`last_hour` tinyint(3) unsigned NOT NULL," +
            "`last_minute` tinyint(3) unsigned NOT NULL," +
            "`last_plus` int(10) unsigned NOT NULL," +
            "`last_minus` int(10) unsigned NOT NULL," +
            "PRIMARY KEY (`user_id`)," +
            "UNIQUE KEY `user_name` (`user_name`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Создаем таблицу "users_media"
        "CREATE TABLE IF NOT EXISTS `users_media` (" +
            "`media_code` varchar(30) NOT NULL," +
            "`user_id` int(10) unsigned NOT NULL," +
            "`user_name` varchar(30) NOT NULL," +
            "`tags` text NOT NULL," +
            "`time` int(10) unsigned NOT NULL," +
            "UNIQUE KEY `media_code` (`media_code`)," +
            "KEY `user_id` (`user_id`,`time`)," +
            "KEY `time` (`time`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Создаем таблицу "count_hour"
        "CREATE TABLE IF NOT EXISTS `count_hour` (" +
            "`user_id` int(10) unsigned NOT NULL," +
            "`count` int(10) unsigned NOT NULL," +
            "`plus` int(10) unsigned NOT NULL," +
            "`minus` int(10) unsigned NOT NULL," +
            "`time` int(10) unsigned NOT NULL," +
            "KEY `user_id` (`user_id`,`time`)," +
            "KEY `time` (`time`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Создаем таблицу "count_minute"
        "CREATE TABLE IF NOT EXISTS `count_minute` (" +
            "`user_id` int(10) unsigned NOT NULL," +
            "`count` int(10) unsigned NOT NULL," +
            "`plus` int(10) unsigned NOT NULL," +
            "`minus` int(10) unsigned NOT NULL," +
            "`time` int(10) unsigned NOT NULL," +
            "KEY `user_id` (`user_id`,`time`)," +
            "KEY `time` (`time`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8",
        
    // Добавляем строки в таблицу "users"
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('yana_havana')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('svoyboy')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('svoyboi')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('osgard.jpg')"
        /*
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('andrey.martynenko')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('sashashapik')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('tatianatkachuk')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('julia_diadyk')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('lena_komar')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('lisavetaav')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('artempolishchuk')",
        "INSERT IGNORE INTO `users` (`user_name`) VALUES ('vladislavderugka')",
        */
    ];
};

//--------------------------------------------------------------------------------------------------