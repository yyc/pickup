var SonicNet = require("./lib/main.js");

function PickUp() {
    


}
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
