var express = require("express");
var app = express();

app.get('/', function(req, res) {
	res.send("Hello world 2");
});

app.listen(5000, function() {
	console.log("App 2 listening on port 5000");
});