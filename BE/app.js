"use strict";

const app = require('http').createServer();
const io = require('socket.io')(app);
const port = 8081;

/**
 * 所有房间及房间里所有人的基本数据 {room_1: [{user_id, nickname},...],...}
 */
var roomAllGuy = {};

function setRoomUser(room, data) {
	if (!roomAllGuy[room]) {
		roomAllGuy[room] = [];
	}
	roomAllGuy[room].push(data);
}

function getRoomUser(room) {
	return roomAllGuy[room];
}

function leaveRoom(room, socket_id) {
	roomAllGuy[room] = roomAllGuy[room].filter((item) => item.socket_id != socket_id);
}

io.on('connection', function(socket) {
	socket.on('newGuy', function(data) {
		var room = 'room_' + data.room_id;
		console.log(room, data);
		socket.join(room, function() {
			data.socket_id = socket.id;
			socket.user_data = data;
			socket.user_room = room;
			socket.user_id = data.user_id;
			setRoomUser(room, data)
			// console.log(socket.rooms); // [ <socket.id>, 'room 237' ]
			// io.to(socket.user_room).emit('newGuy', data);
			// socket.to(socket.user_room).emit('newGuy', data);
			socket.broadcast.to(socket.user_room).emit('newGuy', data); // 除了本人，传递给房间里的其他所有人
			socket.emit('allGuy', getRoomUser(room)); // 传递给本人现在房间里的所有人
		})
	});

	socket.on('msg', function(data) {
		io.to(socket.user_room).emit('msg', data);
	});

	socket.on('disconnect', function() {
		socket.broadcast.to(socket.user_room).emit('leaveGuy', socket.user_data); // 告诉房间里的其他人，这个人离开了
		leaveRoom(socket.user_room, socket.id);
	});
});

app.listen(port);

console.log('server runing on ' + port);