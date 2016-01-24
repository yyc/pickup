var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var sockets = [];

app.use('/js', express.static('js'));
app.use(express.static('demo'));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on("connection", function(socket){
    var type = "";
    socket.on("server", function(data){ // Register as server
        socket.clients = [];
        socket.on("register", function(){ // 
        });
    });
    socket.on("client", function(data){
        socket.server = [];
    });
    var id = sockets.push(socket) - 1;
    socket.emit("id", id);
});
