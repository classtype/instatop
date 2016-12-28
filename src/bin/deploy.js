//--------------------------------------------------------------------------------------------------

var colors = require('colors/safe');
//process.stdout.write(colors.red(data.toString()));

//--------------------------------------------------------------------------------------------------

const exec = require('child_process').exec;
exec('git add . && git commit -m "update" && git push', function(error, stdout, stderr) {
    if (error) {
        process.stdout.write(colors.red(error));
        return;
    }
    process.stdout.write(colors.green(stdout.toString()));
    process.stdout.write(colors.red(stderr.toString()));
});

//--------------------------------------------------------------------------------------------------