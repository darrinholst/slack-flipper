const handlers = {
  '/flip': require('./commands/flip')
}

module.exports = function(command, params, responseUrl) {
  return new Promise(function(resolve, reject) {
    if (handlers[command]) {
      resolve(handlers[command](params));
    } else {
      reject(`I don't know how to handle ${command}`);
    }
  });
}
