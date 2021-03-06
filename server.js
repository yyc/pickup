var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var sockets = [];

app.use('/js', express.static('js'));
app.use('/chat', express.static('demo/chat.html'));
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
                    socket.clients.push(id);
                    console.log(id + " is connected");
                    sockets[id].server.push(socket.id);
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
        socket.on("changeTitle",function(message){
            console.log(JSON.stringify(message));
            var title = message.title;
            var id = message.id;
            if((message.id || message.id == 0) && socket.server.indexOf(id) != -1){
                console.log("Sending");
                if(sockets[id] && sockets[id].connected){
                    console.log(JSON.stringify(message) + " to " + id);
                    sockets[id].emit("bbChange", {title: title,
                                                  id: socket.id});
                    sockets[id].server
                }
            }
        });
    });
    socket.id = sockets.push(socket) - 1;
    if(socket.id % 11 == 0 || socket.id % 111 == 0){
        socket.id = sockets.push(socket) - 1;
    }
    socket.emit("id", socket.id);
    console.log("issued " + socket.id);
});
