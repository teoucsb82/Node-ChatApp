var static = require( 'node-static' ),
       app = require( 'http' ).createServer( router ),
        fs = require( 'fs' ),
      file = new static.Server( './public' ),
      chat = require( './chat.js' ).listen(app);

app.listen( 8080 );

function router( req, res ) {
  req.addListener( 'end', function ( data ) {
    file.serve( req, res );
  }).resume();
}