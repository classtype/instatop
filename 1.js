    var t = new Date() - 0;
    var date_hour = new Date();
    var date_minutes = new Date();
    
// Переводим время в yyyy.mm.dd hh:00:00.000
    date_hour.setMinutes(0, 0, 0);
    
// Переводим время в yyyy.mm.dd hh:mm:00.000
    date_minutes.setSeconds(0, 0);
    
    var time = date_hour / 1000;
    var time_minutes = date_minutes / 1000;
    var last_hour = date_hour.getHours() + 1;
    var last_minute = date_minutes.getMinutes() + 1;
    
    console.log(last_hour);
    console.log(last_minute);