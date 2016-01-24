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
    socket.on("host", function(data){ // Register as host
        socket.clients = [];
        socket.title = ["Title!"];
        socket.author = socket.id;
        socket.on("register", function(id){ // 
            id = parseInt(id);
            if(!isNan(id) && socket[id]){
                if(socket.connected){
                    socket.emit("server",  {title: socket.title,
                                            id: socket.id,
                                            author: socket.id});
                }
            }
        });
    });
    socket.on("client", function(data){
        socket.server = [];
    });
    socket.id = sockets.push(socket) - 1;
    socket.emit("id", socket.id);
    console.log("issued " + socket.id);
});
