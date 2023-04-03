const { Router } = require("express");
const {createProject, getProjects, finishProject, updateProject, getProject} = require("./controller/projectController.js");
const createUser = require("./controller/userController.js");
const login = require("./controller/authController");
// const authMiddleware = require("./middleware/authMiddleware.js");
const routes = Router();

routes.post("/auth", login);
routes.post("/user", createUser);
routes.post("/project", createProject);
routes.get("/projects", getProjects);
routes.patch("/projects/:id/done", finishProject);
routes.put("/projects/:id", updateProject);
routes.get("/project/:id", getProject);


module.exports = routes;