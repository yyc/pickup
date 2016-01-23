var SonicSocket = require('./lib/sonic-socket.js');
var SonicServer = require('./lib/sonic-server.js');
var SonicCoder = require('./lib/sonic-coder.js');
function PickUp() {
    var sonicSoc = 1;
    var sonicSer = 2;
    
        


}
PickUp.prototype.xx = 3;
//Listening
PickUp.prototype.listenFor = function(tone, duration, callback) {

    callback();
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
