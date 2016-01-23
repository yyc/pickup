var PickUp = require("./main.js");
var $ = require("jquery");

var xx = new PickUp();

xx.listenFor("message", /.+/);
xx.on("message", function(message){
    $("#log").append("<li>" + message + "</li>");
});
$(document).ready(function(){
});

$(document).ready(function(){
    $("#clicker").click(function(){
        xx.broadcast($("#msg").val(), {});
    })
});
