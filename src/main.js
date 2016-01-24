var SonicSocket = require('./lib/sonic-socket.js');
var SonicServer = require('./lib/sonic-server.js');
var SonicCoder = require('./lib/sonic-coder.js');
var util = require("util");
var EventEmitter = require("events");

function PickUp() {
  this.sonicSocket = undefined;
  this.sonicServet = undefined;
  this.filters = [];
  this.listeners = [];

  this._createSonicNetwork();
  console.log(this.filters);
}

util.inherits(PickUp, EventEmitter);

PickUp.prototype._createSonicNetwork = function(opt_coder) {
  // Stop the sonic server if it is listening.
  this.sonicServer = new SonicServer({debug: true, freqMin: 19500, freqMax: 20500});
  this.sonicSocket = new SonicSocket({freqMin: 19500, freqMax: 20500});
  this.sonicServer.start();
  console.log(this.sonicServer);
  var self = this;
  this.sonicServer.on('message', this._messageDelegatorConstructor(self));
}
PickUp.prototype._messageDelegatorConstructor = function(self) {
    return function(message){
        console.log("MESSAGE RECEIVED");
        console.log(message);
        console.log(self);
        self.filters.forEach(function(elem){
          if(message.match(elem.regex)){
              self.emit(elem.event, message);
          }
        });
    }
}

//Listening
PickUp.prototype.listenFor = function(event, regex) {
    this.filters.push({'event': event, 'regex': regex});
}

//Broadcasting

PickUp.prototype.broadcast = function(message, options) {
  console.log("broadcast: " + message);
  this.sonicSocket.send(message.toString());
}

PickUp.prototype.broadcastandreceiveack = function(message,option) {
  console.log("HI");

}

//Others
module.exports = PickUp;
