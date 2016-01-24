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
    socket.type = "";
    socket.on("host", function(data){ // Register as host
        socket.clients = [];
        socket.title = "Title!";
        socket.author = socket.id;
        socket.type = "host"
        socket.on("register", function(id){
            id = parseInt(id);
            console.log("Registered " + id + " to " + socket.id);
            if(!isNaN(id) && sockets[id]){
                console.log(id + " is valid socket");
                if(sockets[id].connected){
                    console.log(id + " is connected");
                    sockets[id].emit("server",  {title: socket.title,
                                            id: socket.id,
                                            author: socket.id});
                } else{
                    console.log(id + " is not connected");
                }
            }
        });
    });
    socket.on("client", function(data){
        socket.type = "client";
        socket.server = [];
    });
    socket.id = sockets.push(socket) - 1;
    socket.emit("id", socket.id);
    console.log("issued " + socket.id);
});
