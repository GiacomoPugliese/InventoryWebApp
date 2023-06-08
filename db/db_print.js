// Require your database connection
const db = require("./db_connection");

// SQL query
const select_chemicals_sql = `
SELECT *
FROM chemicals
ORDER BY
    chemicalId;
`;

// Execute the query
db.execute(select_chemicals_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'chemicals' contents:")
        console.log(results);
    }
);

// Close the connection
db.end();
