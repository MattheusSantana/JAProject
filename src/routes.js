const { Router } = require("express");
const {createProject, getProject} = require("./controller/projectController.js");
const createUser = require("./controller/userController.js");

const routes = Router();

routes.post("/user", createUser);
routes.post("/project", createProject);
routes.get("/projects", getProject);


module.exports = routes;