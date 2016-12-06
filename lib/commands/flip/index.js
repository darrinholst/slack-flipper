let flip = require('flip');

module.exports = function(text = 'fumullins') {
  return {
    response_type: 'in_channel',
    text: `(╯°□°）╯︵${flip(text)}`
  };
}
