var static = require('node-static'),
       app = require('http').createServer(handler),
        io = require('socket.io').listen(app),
        fs = require('fs'),
      file = new static.Server('./public');

app.listen(8080);


function handler( req, res ) {
  req.addListener('end', function (data) {
    file.serve(req, res);
  }).resume();
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});