const db = require("./db_connection");

// SQL command to drop 'chemicals' table if it exists
const drop_table_sql = `
DROP TABLE IF EXISTS chemicals;
`;

// SQL command to create 'chemicals' table
const create_table_sql = `
CREATE TABLE chemicals (
    chemicalId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    empiricalFormula VARCHAR(100) NOT NULL,
    quantity VARCHAR(45) NOT NULL,
    hazardLabel VARCHAR(45) NOT NULL,
    PRIMARY KEY (chemicalId)
);
`;

// Execute the DROP TABLE command
db.execute(drop_table_sql, error => {
    if (error) throw error;
    console.log("'chemicals' table dropped if it existed.");

    // If no errors in dropping the table, execute the CREATE TABLE command
    db.execute(create_table_sql, error => {
        if (error) throw error;
        console.log("'chemicals' table created.");

        // Finally close the database connection
        db.end();
    });
});
