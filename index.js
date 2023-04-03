const express = require('express');
const routes = require('./src/routes.js');
const cors = require('cors');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const port = process.env.port || 4000;

dotenv.config();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
app.use(routes);
// app.use(express.json());

app.listen(port, () => console.log("Server running"));