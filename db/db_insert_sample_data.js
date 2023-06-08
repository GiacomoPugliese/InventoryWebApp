// Require your database connection
const db = require("./db_connection");

// Insert command
const insert_chemical_sql = `
    INSERT INTO chemicals 
        (name, empiricalFormula, quantity, hazardLabel) 
    VALUES 
        (?, ?, ?, ?);
`;

// Execute the command with sample data
// 'Water', 'H2O', '100L', 'No danger'
db.execute(insert_chemical_sql, ['Water', 'H2O', '100L', 'No danger']);

// 'Sodium Hydroxide', 'NaOH', '500g', 'Corrosive'
db.execute(insert_chemical_sql, ['Sodium Hydroxide', 'NaOH', '500g', 'Corrosive']);

// 'Methane', 'CH4', '10L', 'Flammable'
db.execute(insert_chemical_sql, ['Methane', 'CH4', '10L', 'Flammable']);

db.end();
