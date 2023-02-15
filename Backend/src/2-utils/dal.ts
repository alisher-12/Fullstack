import mysql from "mysql";

// Creating a connection object:
const connection = mysql.createPool({
    host: "localhost", // Computer
    user: "root", // Database username
    password: "", // Database password (Northwind doesn't contain a password)
    database: "northwind" // Database name
});

console.log("We're connected to MySQL");

function execute(sql: string): Promise<any> {

    return new Promise<any>((resolve, reject) => { // To Promisify an asynchronous function

        // Execute the sql on MySQL:
        connection.query(sql, (err, result) => {

            // If there is an error: 
            if (err) {
                reject(err);
                return;
            }

            // No error - report data: 
            resolve(result);
        });

    });
}

export default {
    execute
};