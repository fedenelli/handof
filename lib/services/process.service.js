const execute = require("./execute.service");
const mail = require("./mail.service");

exports.checkProcess = function(command, bin, title, callback) {
  execute.runShell(command, function(error, stdout, stderr) {
      if (error) {
        console.error(`exec error: ${error}`);
        if (callback) callback(error);
        return;
      }
      if (stderr) {
        console.log(stderr.toString());
        return;
      }
      console.log(stdout.toString());
      var lines = stdout.split('\n');
      var processRunning = false;
      lines.forEach((l) =>  {
        if (l.indexOf(bin) !== -1) {
          processRunning = true;
          console.log(title + ' is running');
          if (callback) callback();
        } 
      });
      if (!processRunning) {
        mail.sendAlertEmail(title + ' is down', function() {
          if (callback) callback();
        });
      }
  });
};

exports.checkElastic = function(callback) {
  exports.checkProcess('ps ax | grep elasticsearch', '/usr/share/elasticsearch/', 'ElasticSearch', callback);
};

exports.checkScylla = function(callback) {
  exports.checkProcess('ps ax | grep scylla', '/usr/bin/scylla', 'Scylla', callback);
};

exports.checkMongo = function(callback) {
  exports.checkProcess('ps ax | grep mongod', '/usr/bin/mongod', 'Mongodb', callback);
};

exports.checkCassandra = function(callback) {
  exports.checkProcess('ps ax | grep cassandra', '/usr/local/cassandra/bin', 'Cassandra', callback);
};

exports.checkRedisMemory = function(memory, password, callback) {
  var command = "/usr/bin/redis-cli" + (password ? " -a " + password : "") + " INFO | grep 'used_memory:' | cut -d':' -f2";
  console.log(command);
  execute.runShell(command, function(error, stdout, stderr) {
    var usedMemory = parseInt(stdout);
    if (usedMemory > memory) {
      mail.sendAlertEmail('redis memory high', function() {
        if (callback) callback();
      });
    }
  });
};
