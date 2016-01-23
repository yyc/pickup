var PickUp = require("./main.js");
var $ = require("jquery");

var opts = {"message": /.+/};
var xx = new PickUp(opts);

xx.on("message", function(message){
    alert(message);
});


$(document).ready(function(){
    $("#clicker").click(function(){
        xx.broadcast($("#msg").val(), {});
    })
});
