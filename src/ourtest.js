var PickUp = require("./main.js");

var opts = {"message": /.+/};
var xx = new PickUp(opts);

xx.listen("message", function(message){
    alert(message);
});

xx.broadcast(0,null,function() {
	alert("HI");
});
