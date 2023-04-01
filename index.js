import express from 'express';
const app = express();

const port = process.env.port || 4000;

app.use("/",(req, res) => {
    res.send("Hello World!")
});


app.listen(port, () => console.log("Server running"));