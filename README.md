// Загрузить(применить) изменения на локальный сервер
npm i

// Загрузить(применить) изменения на удаленный сервер
deploy

// Установить новый сервер
server install

// Перезагрузить сервер
server restart

// Версия ОС
ubuntu 12.04





// users
user_id
user_name
last_day(.getDay())(0-6)


// users_full
user_id
user_name
last_hour(.getHours())(0-23)


// count_day
user_id
count
time


// count_hour
user_id
count
time


// count_minute
user_id
count
time












// Вход
ssh -o StrictHostKeyChecking=no root@95.213.229.167
<пароль>



// Git push
git add . && git commit --amend -m "update" && git push -f
git add . && git commit -m "update" && git push



// Reinstall Project
rm -rf /var/projects/instatop && 
mkdir -p /var/projects/instatop && 
git clone https://github.com/classtype/instatop.git /var/projects/instatop && 
cd /var/projects/instatop && 
npm i --unsafe-perm && 
forever stopall && 
forever start /var/projects/instatop/index.js && 



// Перезагрузка сервера
shutdown -r now



// Update
cd /var/projects/instatop && git pull && npm i && forever restart /var/projects/instatop/index.js



// Install
apt-get update && 
apt-get install htop -y && 
apt-get install python-software-properties -y && 
apt-get install curl -y && 
apt-get install git -y && 
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs && 
npm install -g forever && 



// Автозагрузка
echo '#!/bin/sh -e' > /etc/rc.local && 
echo 'forever start /var/projects/instatop/src/index.js' >> /etc/rc.local && 
echo 'exit 0' >> /etc/rc.local && 



// Install MySQL
apt-get install mysql-server mysql-client mysql-common -y && 
mysql && 
CREATE DATABASE Test; SHOW DATABASES; EXIT;



// Reinstall MySQL
mysql && 
DROP DATABASE Test; SHOW DATABASES; EXIT;


https://gist.github.com/sheikhwaqas/9088872
