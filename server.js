// creating express instance
var express = require("express");
var app = express();

// creating http instance
var http = require("http").createServer(app);

// creating socket io instance
var io = require("socket.io")(http);


//app.get('/', (req, res) => res.send('INDEX'));
//app.use('/route', require('./routes/route')); // sets the paths

//const PORT= process.env.PORT || 5000; // tells the port num for nodejs server

//app.listen((PORT), console.log(`Server started on port number ${PORT}`));

//Database
const db = require('./config/database')
// Test db
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ', err))


/* // Create instance of mysql
var mysql = require("mysql");

// make a connection
var connection = mysql.createConnection({
	"host": "localhost",
	"user": "root",
	"password": "",
	"database": "onetoonedatabase"
});

// connect
connection.connect(function (error) {
	// show error if any
	console.log(error)
});
 */
var users = [];




io.on("db", function (socket) {
	console.log("User connected", socket.id);

	// attach incoming listener for new user
	socket.on("user_connected", function (username) {
		// save in array
		users[username] = socket.id;

		// socket ID will be used to send message to individual person

		// notify all connected clients
		io.emit("user_connected", username);
	});
	// listen from client inside IO "connection" event
	socket.on("send_message", function (data) {
		console.log(data)
	// send event to receiver
	var socketId = users[data.receiver];

	io.to(socketId).emit("new_message", data);
	// save in database
	db.query("INSERT INTO chat (sender, receiver, message) VALUES ('" + data.sender + "', '" + data.receiver + "', '" + data.message + "')", function (error, result) {
		//
	});
	});
});

// start the server
http.listen(5000, function () {
	console.log("Server started");
});