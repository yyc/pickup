var PickUp = require("./main.js");
var $ = require("jquery");

function makeid(){
    var text = "";
    var possible = "abcdef0123456789";

    //for( var i=0; i < 3; i++ )
    text += possible.charAt(Math.floor(Math.random() * 6));
    text += possible.charAt(Math.floor(Math.random() * 10 + 6));
    text += possible.charAt(Math.floor(Math.random() * 6));

    return text;
}

$(document).ready(function(){
    var xx = new PickUp();
    var ourid = makeid();

    $("#identity").text("ID: "+ourid);

    xx.listenFor("reqreply", /\w+@!#\w+/);
    xx.listenFor("message", /\w+#@\w*/);
    xx.listenFor("vanillamessage", /.+/);


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
      //Support two types of message(s), one without an id identifier #@
      //and one with
        var regex = /(\w+)#@(\w*)/;
        var match = regex.exec(message);

        console.log(match);
        //expand match[1];

        var colour = match[1][0] + match[1][0];
        colour += match[1][1] + match[1][1];
        colour += match[1][1] + match[1][1];

        $("#log").append("<li style='background-color:#"+colour+"''>" + message[2] + "</li>");
    });

    xx.on("vanillamessage", function(message){
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
