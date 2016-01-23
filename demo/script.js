function $(id) { return document.getElementById(id); }

// What to do when page loads
function initialize() {
	get_servers();
}

// Structure of Server
function make_server(name, id) {
	return {
		"name": name,
		"id": id
	};
}

// Find Server using ultrasound
// Returns list of servers (created with make_server)
function find_servers() {
	// --- Locate Broadcasting Signals ---

	// --- End of Locate Broadcasting Signals ---
	return [
		make_server("Test Device", 0),
		make_server("Test Device 2", 1)
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
		$("status"+server_id).style.backgroundColor = "#00FF00";
		$("status"+server_id).innerHTML = "Connected";
	} else {
		$("status"+server_id).style.backgroundColor = "#FF0000";
		$("status"+server_id).innerHTML = "Error";
	}
}

// Send message to other side
function send(server_id) {
	// Check if server online
	if ($("status"+server_id).style.backgroundColor != rgb(0,255,0)) return;

	$("chat"+server_id).innerHTML += "Me > " + $("msg"+server_id).value;

	// --- Message sending ---

	// --- End of message sending ---
}

function get_servers() {

	var servers = find_servers();

	var output = "";
	for (var i = 0; i < servers.length; i++) {
		output += "<div class='server'>";
		output += "<div class='server-name'>"+servers[i].name+"</div>";
		output += "<div class='server-connect'><button onClick='pair("+servers[i].id+")'>Connect</button></div>";
		output += "<div class='server-status' id='status"+servers[i].id+"'></div>";
		output += "<div class='server-chat'>";
		output += "<div id='chat"+servers[i].id+"'></div>";
		output += "<textarea id='msg"+servers[i].id+"'></textarea>";
		output += "<button onClick='send("+servers[i].id+")'>Send</button>";
		output += "</div>";
		output += "</div>";
	}
	$("servers").innerHTML = output;
}