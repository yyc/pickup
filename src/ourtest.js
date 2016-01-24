var PickUp = require("./main.js");
var $ = require("jquery");

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$(document).ready(function(){
    var xx = new PickUp();
    var ourid = makeid();

    $("#identity").text("ID: "+ourid);

    xx.listenFor("reqreply", /\w+@!#\w+/);
    xx.listenFor("message", /\w+#@\w+/);
    //xx.listenFor("message", /.+/);


    xx.on("reqreply", function(message) {
      var regex = /(\w+)@!#(\w+)/;
      var match = regex.exec(message);
      //alert(match[1] + ": " + match[2]);
      //broadcast ack
      xx.broadcast(match[2]);
      //receive
      xx.emit("message", match[1]);

    });

    xx.on("message", function(message){
        $("#log").append("<li>" + message + "</li>");
    });


    $("#clicker").click(function(){
    window.addEventListener('touchstart', function() {
        $("#status").html("touched");
    	// create empty buffer
      var myContext = new window.AudioContext || new webkitAudioContext();

    	var buffer = myContext.createBuffer(1, 1, 22050);
    	var source = myContext.createBufferSource();
    	source.buffer = buffer;

    	// connect to output (your speakers)
    	source.connect(myContext.destination);

    	// play the file
    	source.noteOn(0);

    	$("#status").html(source.playbackState);
    }, false);
//        (xx._messageDelegatorConstructor(xx))($("#msg").val());
        xx.broadcast($("#msg").val(), {});
    })
    $('#bnack').click(function() {




    });
});
