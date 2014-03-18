socketio = require( 'socket.io' );

exports.listen = function(server){

  io = socketio.listen(server);

  var MESSAGES = [];

  io.sockets.on( 'connection', function ( socket ) {
    // SOCKETS.push( socket );
    socket.on( 'message', function ( raw ) {

      //this gets broadcast to all but us
      socket.broadcast.emit( "update", { data: raw.data });

      //this only shows for us
      socket.emit( "update", { data: raw.data });
    });
  });

}