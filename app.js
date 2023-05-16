//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the assignment list page
app.get( "/inventory", ( req, res ) => {
    res.sendFile( __dirname + "/views/inventory.html" );
} );

// define a route for the assignment detail page
app.get( "/detail", ( req, res ) => {
    res.sendFile( __dirname + "/views/detail.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );