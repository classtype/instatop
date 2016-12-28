//--------------------------------------------------------------------------------------------------

var colors = require('colors/safe');
const exec = require('child_process').exec;

/*--------------------------------------------------------------------------------------------------
|
| -> Загрузка на GitHub
|
|-------------------------------------------------------------------------------------------------*/

exec('clear && git add . && git commit -m "update" && git push', function(error, stdout, stderr) {
    if (error) {
        process.stdout.write(colors.red(error));
        return;
    }
    process.stdout.write(colors.green(stdout.toString()));
    process.stdout.write(colors.red(stderr.toString()));
});

//--------------------------------------------------------------------------------------------------