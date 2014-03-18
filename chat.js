socketio = require( 'socket.io' );

exports.listen = function(server){

  io = socketio.listen(server);

  var MESSAGES = [];
  var NICKNAMES = {};

  io.sockets.on( 'connection', function ( socket ) {
    socket.username = 'Anon';
    NICKNAMES[socket.id] = socket.username;
    allNames(socket);

    socket.on( 'message', function ( raw ) {
      socket.broadcast.emit( "newMessage", { data: raw.data, user: socket.username });
      socket.emit( "newMessage", { data: raw.data, user: socket.username });
    });

    socket.on( 'newName', function ( raw ) {
      socket.username = raw.data;
      NICKNAMES[socket.id] = socket.username;
      socket.broadcast.emit( "updateNickname", { id: socket.id, user: socket.username });
      socket.emit( "updateNickname", { id: socket.id, user: socket.username });
      allNames(socket);
    });

    socket.on('getAllNicknames', function() {
      allNames(socket);
    });

    socket.on('disconnect', function() {
      delete NICKNAMES[socket.id];
      allNames(socket);
    });

  });

  var allNames = function(socket) {
    socket.broadcast.emit("names", { names: NICKNAMES });
    socket.emit("names", { names: NICKNAMES });
  };

}

