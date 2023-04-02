const { Router } = require("express");
const {createProject, getProject, finishProject} = require("./controller/projectController.js");
const createUser = require("./controller/userController.js");

const routes = Router();

routes.post("/user", createUser);
routes.post("/project", createProject);
routes.get("/projects", getProject);
routes.patch("/projects/:id/done", finishProject);




module.exports = routes;