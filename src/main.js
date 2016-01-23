var SonicSocket = require('./lib/sonic-socket.js');
var SonicServer = require('./lib/sonic-server.js');
var SonicCoder = require('./lib/sonic-coder.js');
var util = require("util");
var EventEmitter = require("events");

function PickUp(events) {
  this.sonicSocket = undefined;
  this.sonicServet = undefined;
  this.filters = events;
  this.listeners = [];

  createSonicNetwork();
}

function createSonicNetwork(opt_coder) {
  // Stop the sonic server if it is listening.
  var ALPHABET = "123456";
  this.sonicServer = new SonicServer({alphabet: ALPHABET, debug: false});
  this.sonicSocket = new SonicSocket({alphabet: ALPHABET});

  this.sonicServer.start();
  console.log(this.sonicServer);
  this.sonicServer.on('message', messageDelegator);
}
function messageDelegator(x) {
  console.log("MESSAGE RECEIVED");
  console.log(x);
  for(event in this.filters){
      if(x.match(this.filters[event])){
            this.emit(event);
      }
  }
  //Iterate through all listeners, and call callbacks
/*
  
  for(var i = 0; i < this.listeners.length; i++) {
    var obj = this.listeners[i];
    if (obj.char === x) {
      (obj.callback)();
    }
  }
*/
}
//Listening
PickUp.prototype.listenFor = function(event, regex) {
    this.filters[event] = regex;
}

PickUp.prototype.removeListenerChar = function(event) {
  // find listener(s)
    delete this.filters[event];
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
