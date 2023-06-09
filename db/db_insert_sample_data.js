const db = require("./db_connection");

// SQL command to delete all records from 'chemicals' table
const delete_records_sql = `
DELETE FROM chemicals;
`;

// Execute the DELETE command
db.execute(delete_records_sql, error => {
    if (error) throw error;
    console.log("All records removed from 'chemicals' table.");

    // SQL command to insert a record into 'chemicals' table
    const insert_chemical_sql = `
        INSERT INTO chemicals 
            (name, empiricalFormula, quantity, hazardLabel) 
        VALUES 
            (?, ?, ?, ?);
    `;

    // Execute the INSERT command with sample data
    db.execute(insert_chemical_sql, ['Water', 'H2O', '100L', 'No danger']);
    db.execute(insert_chemical_sql, ['Sodium Hydroxide', 'NaOH', '500g', 'Corrosive']);
    db.execute(insert_chemical_sql, ['Methane', 'CH4', '10L', 'Flammable']);

    // Close the database connection
    db.end();
});
