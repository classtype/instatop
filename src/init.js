//--------------------------------------------------------------------------------------------------

// Загружаем конфиг
    $.cfg = require('./config');
    
// Соединение базой данных
    $.InitDB(function() {
    // Создаем крон
        $.Cron();
        
    // Создаем крон
        setInterval($.Cron, 5000);
    });
    
// Загружаем шаблоны
    $.Tpl.init();
    
// Создаем http сервер
    $.InitHttpServer();
    
//--------------------------------------------------------------------------------------------------