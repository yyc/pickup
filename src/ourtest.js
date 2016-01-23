var PickUp = require("./main.js");
var $ = require("jquery");

$(document).ready(function(){
    var xx = new PickUp();
    
    xx.listenFor("message", /.+/);
    xx.on("message", function(message){
        $("#log").append("<li>" + message + "</li>");
    });
    xx._messageDelegator("omg why");
    $("#clicker").click(function(){
        xx.broadcast($("#msg").val(), {});
    })
});
