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
    	host();
	})
	socket.on("id", function(id){
    	socket.bbId = id;
    	if(socket.mode == "host"){
        	host();
    	} else if(socket.mode == "client"){
        	client();
    	}
	});
});

function host(){
	if(socket.bbId && socket.mode){
        pu.listenFor("connection", /[[:digit:]]+/);
        pu.on("connection", function(message){
            $("#users").append("<li>" + message + "</li>");
        });
        socket.on("bbChange", function(message){
            $("#billboard h1").html(message.title);
            $("#billboard #author").html
        })
	}
    
}
function client(){
	if(socket.bbId && socket.mode){
        pu.broadcast(""+id);
        socket.on("server", function(server){
            socket.servers = socket.servers || [];
            socket.servers.push(server);
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
	for (var i = 0; i < socket.servers.length; i++) {
		output += "<div class='server' id='server"+i+"' onClick='select("+i+")'>";
		output += "Currently Displaying: <div class='server-name'>"+servers[i].title+"</div>";
		output += "<a class='btn btn-default' onClick='edit("+servers[i].id+")'>Edit</a>";
/*
		output += "<div class='server-chat'>";
		output += "<div id='chat"+servers[i].id+"' style='display:none;'></div>";
*/
		//output += "<textarea id='msg"+servers[i].id+"'></textarea>";
		//output += "<button onClick='send("+servers[i].id+", false)'>Send</button>";
		output += "</div>";
// 		output += "</div>";
	}
	$("servers").html(output);
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

