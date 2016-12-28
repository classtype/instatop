// Вход
ssh -o StrictHostKeyChecking=no root@95.213.229.167
yesqzgf5ej



// Git push
git add . && git commit --amend -m "update" && git push -f
git add . && git commit -m "update" && git push



// Reinstall Project
rm -rf /var/projects/instatop && 
mkdir -p /var/projects/instatop && 
cd /var/projects/instatop && 
git clone https://github.com/classtype/instatop.git /var/projects/instatop && 
npm i --unsafe-perm && 
forever stopall && 
forever start /var/projects/instatop/index.js && 



// Перезагрузка сервера
shutdown -r now



// Update
cd /var/projects/test && git pull && npm i && forever restart /var/projects/test/index.js



// Автозагрузка
echo '#!/bin/sh -e' > /etc/rc.local && 
echo 'forever start /var/projects/test/index.js' >> /etc/rc.local && 
echo 'exit 0' >> /etc/rc.local && 



// Install
apt-get update && 
apt-get install htop -y && 
apt-get install python-software-properties -y && 
apt-get install curl -y && 
apt-get install git -y && 
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs && 
npm install -g forever && 



// Install MySQL
apt-get install mysql-server mysql-client mysql-common -y && 
mysql && 
CREATE DATABASE Test; SHOW DATABASES; EXIT;



// Reinstall MySQL
mysql && 
DROP DATABASE Test; SHOW DATABASES; EXIT;
