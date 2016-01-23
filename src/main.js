var SonicSocket = require('./lib/sonic-socket.js');
var SonicServer = require('./lib/sonic-server.js');
var SonicCoder = require('./lib/sonic-coder.js');
function PickUp() {
  this.sonicSocket = undefined;
  this.sonicServet = undefined;

  this.listeners = [];

  createSonicNetwork();
}

function createSonicNetwork(opt_coder) {
  // Stop the sonic server if it is listening.
  var ALPHABET = "temp";
  this.sonicServer = new SonicServer({alphabet: ALPHABET, debug: false});
  this.sonicSocket = new SonicSocket({alphabet: ALPHABET});

  this.sonicServer.start();
  console.log(this.sonicServer);
  this.sonicServer.on('message', messageDelegator);
}
function messageDelegator(x) {
  console.log("MESSAGE RECEIVED");
  console.log(x);
}
//Listening
PickUp.prototype.listenFor = function(tone, callback) {
  var obj = {type: "tone"};
  obj.tone = tone;

  this.listeners.push(obj);

  callback();
}

PickUp.prototype.listenForSequence = function(tones, duration, callback) {


  callback();
}

//Broadcasting

PickUp.prototype.broadcast = function(message, callback) {
  this.sonicSocket.send(message.toString());
    callback();
}

PickUp.prototype.broadcast = function(message, options, callback) {
  alert("CALLED");
  this.sonicSocket.send(message.toString());
  callback();
}

//Both

PickUp.prototype.broadcastAcknowledge = function(message, permittedResponses, callback) {


}


//Others

module.exports = PickUp;
