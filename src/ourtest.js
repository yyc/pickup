var PickUp = require("./main.js");
var $ = require("jquery");

var xx = new PickUp();

xx.listenFor("message", /.+/);
xx.on("message", function(message){
    alert(message);
});


$(document).ready(function(){
    $("#clicker").click(function(){
        xx.broadcast($("#msg").val(), {});
    })
});
