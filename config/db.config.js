const mysql = require("mysql");

// Setup mysql connection (credentials should be placed in .env file)
const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "school_mgmt_db",
    flags: "-MULTI_RESULTS,MULTI_STATEMENTS",
});

// Connect to mysql database
dbConn.connect(function (error) {
    if (error) throw error;
    console.log("Successfully connected to DB!");
});

module.exports = dbConn;
