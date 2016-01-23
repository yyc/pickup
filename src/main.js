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

  this._createSonicNetwork();
}

util.inherits(PickUp, EventEmitter);

PickUp.prototype._createSonicNetwork = function(opt_coder) {
  // Stop the sonic server if it is listening.
  this.sonicServer = new SonicServer({debug: true, freqMin: 19500, freqMax: 20600});
  this.sonicSocket = new SonicSocket({debug: true, freqMin: 19500, freqMax: 20600});

  this.sonicServer.start();
  console.log(this.sonicServer);
  this.sonicServer.on('message', this._messageDelegator);
}
PickUp.prototype._messageDelegator = function(x) {
  console.log("MESSAGE RECEIVED");
  console.log(x);
  for(event in this.filters){
      if(x.match(this.filters[event])){
            this.emit(event);
      }
  }
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

PickUp.prototype.broadcast = function(message, options) {

  console.log("broadcast: " + message);
    this.sonicSocket.send(message.toString());
}

//Both

PickUp.prototype.broadcastAcknowledge = function(message, permittedResponses, callback) {


}


//Others

module.exports = PickUp;
