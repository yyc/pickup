var PickUp = require("./main.js");
var $ = require("jquery");

$(document).ready(function(){
    var xx = new PickUp();
    
    xx.listenFor("message", /.+/);
    xx.on("message", function(message){
        $("#log").append("<li>" + message + "</li>");
    });
    $("#clicker").click(function(){
        xx._messageDelegator($("#msg").val());
        xx.broadcast($("#msg").val(), {});
    })
});
