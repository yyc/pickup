var PickUp = require("./main.js");
var $ = require("jquery");
var io = require("socket.io-client");
window.jQuery = $;
window.$ = window.jQuery;
require("bootstrap");
var pu = new PickUp();
var socket = io();

// What to do when page loads
$(document).ready(function(){
    socket = io();
	$("#startModal").modal();
	$("#host").click(function(){
    	socket.mode = "host";
    	$(".client").hide();
    	host();
	});
	$("#connect").click(function(){
    	socket.mode = "client";
    	$(".billboard").hide();
    	client();
	});
	socket.on("id", function(id){
    	socket.bbId = id;
    	console.log("Got ID " + id);
    	$("#serverId").html(id);
    	if(socket.mode == "host"){
        	host();
    	} else if(socket.mode == "client"){
        	client();
    	}
	});
});

function host(){
	if(socket.bbId && socket.mode){
    	socket.emit("host");
        pu.listenFor("connection", /^\d+$/);
        pu.on("connection", function(message){
            $("#users").append("<li>" + message.message + "</li>");
            socket.emit("register", message.message);
        });
        pu.on("vanillamessage", function(message){
            console.log("message event" + message);
            });
        socket.on("bbChange", function(message){
            console.log("Billboard Change");
            $("#billboard h1").html(message.title);
            $("#billboard #author").html(message.id);
        })
	}
    
}
function client(){
	if(socket.bbId && socket.mode){
    	socket.emit("client");
    	$("#refresh").click(function(){
    socket.servers = {};
    pu.broadcast(socket.bbId, socket.bbId);
});
        pu.broadcast(socket.bbId, socket.bbId);
        socket.on("server", function(server){
            console.log("Got server " + JSON.stringify(server));
            socket.servers = socket.servers || {};
            socket.servers[server.id] = server;
            get_servers();
        });
	}
    
}
//very clever anti-OOP methods hehe


// Find Server using ultrasound
// Returns list of servers (created with make_server)
// Send message to other side
function send(is_broadcast) {
	// Check if server online
	for(var i = 0; i < num_servers && is_broadcast; i++) {
		if($("status"+i).innerHTML == "Connected") {
			$("chat"+i).innerHTML += "Me > " + $("message").value + "<br/>";
		}
	}

	if(!is_broadcast && selected_id != -1) {
		$("chat"+selected_id).innerHTML += "Me > " + $("message").value + "<br/>";
	}
	$("main-chat").innerHTML = $("chat"+selected_id).innerHTML;
	$("message").value = "";

	// --- Message sending ---

	// --- End of message sending ---
}

//IMPT server id
var selected_id = -1;

function select(server_id) {
	if ($("status"+server_id).innerHTML != "Connected") return;
	for(var i = 0; i < num_servers; i++) {
		if(i == server_id) {
			// Chinese New Year Huat Ah
			$("server"+i).style.backgroundColor = "#DDDDDD";
			selected_id = i;
		} else {
			$("server"+i).style.backgroundColor = "#FFF";
		}
	}
	$("main-chat").innerHTML = $("chat"+selected_id).innerHTML;
}

function get_servers() {
	var output = "";
	console.log(socket.servers);
    var keys = Object.keys(socket.servers);	
	for (var id in keys) {
        if (socket.servers.hasOwnProperty(keys[id])) {
        	var server = socket.servers[keys[id]];
    		output += "<div class='server' id='server"+id+"'>";
    		output += "Currently Displaying: <span class='server-name'>"+server.title+"</span> ";
    		output += "<a class='btn btn-default' data-target='"+keys[id]+"' data-title='" + server.title + "'>Edit</a>";
    /*
    		output += "<div class='server-chat'>";
    		output += "<div id='chat"+servers[i].id+"' style='display:none;'></div>";
    */
    		//output += "<textarea id='msg"+servers[i].id+"'></textarea>";
    		//output += "<button onClick='send("+servers[i].id+", false)'>Send</button>";
    		output += "</div>";
    // 		output += "</div>";
        }
	}
	$("#servers").html(output);
	$("#servers a").click(function(e){
    	var target = $(this).data("target");
    	$("#editModal .btn-primary").data("target", target);
    	$("#editModal").modal();
    	$("#new-title").attr("placeholder", $(this).data("title"));
    	$("#editModal .btn-primary").click(function(){
        	console.log($("#new-title").val());
            $("#editModal").modal('hide');
        	socket.emit("changeTitle", {
            	title: $("#new-title").val(),
            	id: $(this).data("target")
        	});
    	});
	});
}


// Initiate Pairing convention
function pair(server_id) {


	// Set to true if successful, false otherwise
	var success = true;
	// --- Pairing ---

	// --- End of Pairing ---

	alert(server_id);


	if (success) {
		select(server_id);
		$("status"+server_id).style.backgroundColor = "#00FF00";
		$("status"+server_id).innerHTML = "Connected";
	} else {
		$("status"+server_id).style.backgroundColor = "#FF0000";
		$("status"+server_id).innerHTML = "Error";
	}
}

// Unpairing
function unpair(server_id) {

	// --- Unpairing Code ---

	// --- End of Unpairing
	$("chat"+server_id).innerHTML = "";
	$("status"+server_id).style.backgroundColor = "#FFF";
	$("status"+server_id).innerHTML = "Not Connected";
	$("server"+server_id).style.backgroundColor = "#FFF";
	if(selected_id == server_id) selected_id = -1;
}

