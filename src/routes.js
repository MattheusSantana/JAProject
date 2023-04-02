const { Router } = require("express");
const createUser = require("./controller/userController.js");

const routes = Router();

routes.post("/user", createUser);

module.exports = routes;