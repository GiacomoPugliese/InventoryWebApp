const db = require("./db_connection");
const create_chemicals_table_sql = `
CREATE TABLE chemicals (
    chemicalId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    empiricalFormula VARCHAR(100) NOT NULL,
    quantity VARCHAR(45) NOT NULL,
    hazardLabel VARCHAR(45) NOT NULL,
    PRIMARY KEY (chemicalId)
  );
`
db.execute(create_chemicals_table_sql);
db.end();