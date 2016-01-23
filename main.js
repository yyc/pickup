var SonicNet = require("./lib/build/sonicnet.js")

function PickUp() {




}
//Listening
PickUp.prototype.listenFor(tone, duration, callback) {

    callback();
}

PickUp.prototype.listenForSequence(tones, duration, callback) {


    callback();
}

//Broadcasting

PickUp.prototype.broadcast(message, callback) {

    callback();
}

PickUp.prototype.broadcast(message, options, callback) {

    callback();
}

//Both

PickUp.prototype.broadcastAcknowledge(message, permittedResponses, callback) {


}


//Others

module.exports = PickUp;
