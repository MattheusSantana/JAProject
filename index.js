import express from 'express';
const app = express();


import database from './src/models/index.model.js';

const port = process.env.port || 4000;

app.use("/",(req, res) => {
    res.send("Hello World!")
});



database.sequelize.sync().then(() => {
    console.log("conectado com o banco");
});


app.listen(port, () => console.log("Server running"));