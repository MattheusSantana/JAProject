const express = require('express');
const routes = require('./src/routes.js');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.port || 4000;


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(routes);
// app.use(express.json());
app.use(cors())

app.listen(port, () => console.log("Server running"));