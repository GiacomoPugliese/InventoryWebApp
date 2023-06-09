// Require your database connection
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

// SQL command to insert sample data into 'chemicals' table
const insert_chemical_sql = `
INSERT INTO chemicals 
    (name, empiricalFormula, quantity, hazardLabel) 
VALUES 
    (?, ?, ?, ?);
`;

// Drop 'chemicals' table if it exists
db.execute(drop_table_sql, error => {
    if (error) throw error;
    console.log("'chemicals' table dropped.");

    // Create 'chemicals' table
    db.execute(create_table_sql, error => {
        if (error) throw error;
        console.log("'chemicals' table created.");

        // Populate 'chemicals' table with sample data
        const chemicals = [
            ['Water', 'H2O', '100L', 'No danger'],
            ['Sodium Hydroxide', 'NaOH', '500g', 'Corrosive'],
            ['Methane', 'CH4', '10L', 'Flammable']
        ];
        chemicals.forEach(([name, empiricalFormula, quantity, hazardLabel]) => {
            db.execute(insert_chemical_sql, [name, empiricalFormula, quantity, hazardLabel], error => {
                if (error) throw error;
                console.log(`Inserted '${name}' into 'chemicals' table.`);
            });
        });

        // Close the connection
        db.end();
    });
});
