socketio = require( 'socket.io' );

exports.listen = function(server){

  io = socketio.listen(server);

  var MESSAGES = [];

  io.sockets.on( 'connection', function ( socket ) {
    socket.username = 'Anon';

    socket.on( 'message', function ( raw ) {
      var txt = raw.data;
      var reg = new RegExp("^\/nick ");
      if ( txt.match(reg) ) {
        socket.username = txt.replace(reg, "");
      } else {
        socket.broadcast.emit( "update", { data: raw.data, user: socket.username });
        socket.emit( "update", { data: raw.data, user: socket.username });
      }
    });
  });

}