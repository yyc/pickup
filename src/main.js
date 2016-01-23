var SonicSocket = require('./lib/sonic-socket.js');
var SonicServer = require('./lib/sonic-server.js');
var SonicCoder = require('./lib/sonic-coder.js');
function PickUp() {
  this.sonicSocket = undefined;
  this.sonicServet = undefined;
  var sonicSoc = 1;
  var sonicSer = 2;
  createSonicNetwork();
}

function createSonicNetwork(opt_coder) {
  // Stop the sonic server if it is listening.
  var ALPHABET = "temp";
  this.sonicServer = new SonicServer({alphabet: ALPHABET, debug: false});
  this.sonicSocket = new SonicSocket({alphabet: ALPHABET});

  this.sonicServer.start();
  console.log(this.sonicServer);
  this.sonicServer.on('message', hihi);
}
function hihi(x) {
  alert("MESSAGE RECEIVED");
  console.log(x);
}
//Listening
PickUp.prototype.listenFor = function(tone, duration, callback) {
    callback();
}

function hello(){


}
PickUp.prototype.listenForSequence = function(tones, duration, callback) {


    callback();
}

//Broadcasting

PickUp.prototype.broadcast = function(message, callback) {

    callback();
}

PickUp.prototype.broadcast = function(message, options, callback) {

    callback();
}

//Both

PickUp.prototype.broadcastAcknowledge = function(message, permittedResponses, callback) {


}


//Others

module.exports = PickUp;
