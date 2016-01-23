var PickUp = require("./main.js");
var $ = require("jquery");


// What to do when page loads
$(document).ready(function(){
	get_servers();    
});

// Structure of Server
function make_server(name, id) {
	return {
		"name": name,
		"id": id
	};
}

// Find Server usin g ultrasound
// Returns list of servers (created with make_server)

var num_servers = 0;

function find_servers() {
	// --- Locate Broadcasting Signals ---

	// --- End of Locate Broadcasting Signals ---
	num_servers = 4;
	return [
		make_server("Test Device", 0),
		make_server("Test Device 2", 1),
		make_server("Test Device 3", 2),
		make_server("Test Device 4", 3)
	];
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

	var servers = find_servers();

	var output = "";
	for (var i = 0; i < servers.length; i++) {
		output += "<div class='server' id='server"+i+"' onClick='select("+i+")'>";
		output += "<div class='server-name'>"+servers[i].name+"</div>";
		output += "<div class='server-connect'><button onClick='pair("+servers[i].id+")'>Connect</button><br/><button onClick='unpair("+servers[i].id+")'>Disconnect</button></div>";
		output += "<div class='server-status' id='status"+servers[i].id+"'>Not Connected</div>";
		output += "<div class='server-chat'>";
		output += "<div id='chat"+servers[i].id+"' style='display:none;'></div>";
		//output += "<textarea id='msg"+servers[i].id+"'></textarea>";
		//output += "<button onClick='send("+servers[i].id+", false)'>Send</button>";
		output += "</div>";
		output += "</div>";
	}
	$("servers").innerHTML = output;
}