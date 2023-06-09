//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");
const db = require('./db/db_connection');
const DEBUG = true;
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
});

const read_chemicals_all_sql = `
    SELECT 
        chemicalId, name, empiricalFormula, quantity, hazardLabel
    FROM chemicals
    ORDER BY chemicalId DESC
`;

app.get( "/inventory", ( req, res ) => {
    db.execute(read_chemicals_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = { inventoryList : results };
            res.render('inventory', data);
        }
    });
});

// define a route for the chemical detail page
const read_chemical_detail_sql = `
    SELECT
        chemicalId, name, empiricalFormula, 
        quantity, hazardLabel
    FROM chemicals
    WHERE chemicalId = ?
`;

app.get("/inventory/:id", (req, res) => {
    const chemicalId = req.params.id;
    db.execute(read_chemical_detail_sql, [chemicalId], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send(error); // Internal Server Error
        }
        else if (results.length == 0)
            res.status(404).send(`No chemical found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = {chem: results[0]}; // results is still an array, get first (only) element
            res.render('detail', data); 
            // What's passed to the rendered view: 
            //  chemical: { chemicalId: ___, name: ___, empiricalFormula: ___, 
            //    quantity: ___, hazardLabel: ___ }
        }
    });
});



// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );