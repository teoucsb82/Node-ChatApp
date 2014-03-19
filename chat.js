socketio = require( 'socket.io' );

exports.listen = function(server){

  io = socketio.listen(server);

  var DEFAULT_ROOM = "lobby";

  io.sockets.on( 'connection', function ( socket ) {
    socket.username = 'Anon';
    socket.room = DEFAULT_ROOM;
    socket.color = "black";

    socket.join(DEFAULT_ROOM);
    allNames(socket.room);

    socket.on( 'message', function ( raw ) {
      io.sockets.in(socket.room).emit( "newMessage", { data: raw.data, user: socket.username, color: socket.color });
    });

    socket.on( 'newName', function ( raw ) {
      socket.username = raw.data;
      socket.broadcast.emit( "updateNickname", { id: socket.id, user: socket.username });
      socket.emit( "updateNickname", { id: socket.id, user: socket.username });
      allNames(socket.room);
    });

    socket.on('getAllNicknames', function() {
      allNames(socket.room);
    });

    socket.on('disconnect', function() {
      socket.leave(socket.room);
      allNames(socket.room);
    });

    socket.on('newColor', function( raw ) {
      socket.color = raw.color;
    })

    socket.on('updateRoom', function( raw ) {
      var oldRoom = socket.room;
      socket.leave(socket.room);
      io.sockets.in(socket.room).emit("leave", { name: socket.username });
      socket.room = raw.room;
      socket.join(socket.room);
      allNames(oldRoom);
      socket.emit("newRoom", { name: socket.username, room: socket.room });
      allNames(socket.room);
    });
  });

  var allNames = function(room) {
    users = io.sockets.clients(room).map(function(user) {
      return user.username;
    });
    io.sockets.in(room).emit("names", { names: users });
  };

}

