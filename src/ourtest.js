var PickUp = require("./main.js");
var $ = require("jquery");

$(document).ready(function(){
    var xx = new PickUp();
    
    xx.listenFor("message", /.+/);
    xx.on("message", function(message){
        $("#log").append("<li>" + message + "</li>");
    });
    $("#clicker").click(function(){
    window.addEventListener('touchstart', function() {
    	// create empty buffer
    	var buffer = myContext.createBuffer(1, 1, 22050);
    	var source = myContext.createBufferSource();
    	source.buffer = buffer;
    
    	// connect to output (your speakers)
    	source.connect(myContext.destination);
    
    	// play the file
    	source.noteOn(0);
    }, false);
//        (xx._messageDelegatorConstructor(xx))($("#msg").val());
        xx.broadcast($("#msg").val(), {});
    })

});
