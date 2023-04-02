const { Router } = require("express");
const createProject = require("./controller/projectController.js");
const createUser = require("./controller/userController.js");

const routes = Router();

routes.post("/user", createUser);
routes.post("/project", createProject);


module.exports = routes;