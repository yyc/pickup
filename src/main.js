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

  //Iterate through all listeners, and call callbacks
  for(var i = 0; i < this.listeners.length; i++) {
    var obj = this.listeners[i];
    if (obj.char === x) {
      (obj.callback)();
    }
  }
}
//Listening
PickUp.prototype.listenFor = function(char, callback) {
  var obj = {type: "char"};
  obj.char = char;
  obj.callback = callback;

  this.listeners.push(obj);
}

PickUp.prototype.removeListenerChar = function(char) {
  // find listener(s)
  var indexesToRemove = [];

  for (var i = 0; i < this.listeners.length; i++) {
    var obj = this.listeners[i];
    if (obj.char === char) {
      indexesToRemove.push(i);
    }
  }

  for(var w = 0; w < indexesToRemove.length; w++) {
    this.listeners.splice(indexesToRemove[w],1);
  }
}

PickUp.prototype.listenForSequence = function(tones, duration, callback) {


  callback();
}

//Broadcasting

PickUp.prototype.broadcast = function(message, callback) {
  alert("CALLED");
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
