#!/usr/bin/env node

const async = require('async');
const processes = require("../lib/services/process.service");

var argv = require('minimist')(process.argv.slice(2));

const OPERATIONS = {
  CHECK_MONGO: 1,
  CHECK_CASSANDRA: 2,
  CHECK_REDIS_MEMORY: 3,
  CHECK_SCYLLA: 4,
  CHECK_ELASTICSEARCH: 5,
};

chooseOperations = function() {
  var operations = [];
  console.log(JSON.stringify(argv));
  if (argv['checkMongo']) {
    operations.push(OPERATIONS.CHECK_MONGO);
  }
  if (argv['checkCassandra']) {
    operations.push(OPERATIONS.CHECK_CASSANDRA);
  }
  if (argv['checkScylla']) {
    operations.push(OPERATIONS.CHECK_SCYLLA);
  }
  if (argv['checkElastic']) {
    operations.push(OPERATIONS.CHECK_ELASTICSEARCH);
  }
  if (argv['checkRedisMemory']) {
    operations.push(OPERATIONS.CHECK_REDIS_MEMORY);
  }
  return operations;
};

(function() {
  var operations = chooseOperations();
  if (operations.length === 0) {
    console.log('Please provide operations to perform')
  }
  var callback = function(err) {
    if (err) {
      console.log(err);
    }
    process.exit(1);
  }
  async.forEachLimit(operations, 1, function(op, cb) {
    console.log(JSON.stringify(operations));
    if (op === OPERATIONS.CHECK_MONGO) {
      processes.checkMongo(cb);
    } else if (op === OPERATIONS.CHECK_CASSANDRA) {
      processes.checkCassandra(cb);
    } else if (op === OPERATIONS.CHECK_SCYLLA) {
      processes.checkScylla(cb);
    } else if (op === OPERATIONS.CHECK_ELASTICSEARCH) {
      processes.checkElastic(cb);
    } else if (op === OPERATIONS.CHECK_REDIS_MEMORY) {
      var memory = parseInt(argv['checkRedisMemory']);
      var auth = argv['redisAuth'];
      processes.checkRedisMemory(memory, auth, cb);
    }
  }, callback);
})();
