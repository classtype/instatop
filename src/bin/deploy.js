/*
var colors = require('colors/safe');
process.stdout.write(colors.red(data.toString()));
*/

const exec = require('child_process').exec;
exec('git add . && git commit -m "update" && git push', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
