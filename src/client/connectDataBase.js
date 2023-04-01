const { Client } = require("pg");

const connectDB = async () => {
    try {
        const client = new Client({
            user: "root",
            host: "localhost",
            database: "root",
            password: "root",
            port: 2
        });

        await client.connect();
        const response = await client.query('SELECT * FROM table');
        console.log(response);


    } catch (error) {
        console.log(error);
    }
}