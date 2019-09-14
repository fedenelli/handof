const _ = require("lodash");
const { spawn, exec, execFile } = require('child_process');

const colors = require('colors');

exports.runProcess = function(command, args) {
  const process = spawn(command, args);
  process.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  
  process.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

exports.runShell = function(command, callback) {
  exec(command, callback);
}
