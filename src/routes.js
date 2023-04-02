const { Router } = require("express");
const {createProject, getProject, finishProject} = require("./controller/projectController.js");
const createUser = require("./controller/userController.js");
const login = require("./controller/authController");
// const authMiddleware = require("./middleware/authMiddleware.js");
const routes = Router();

routes.post("/", login);
routes.post("/user", createUser);
routes.post("/project", createProject);
routes.get("/projects", getProject);
routes.patch("/projects/:id/done", finishProject);




module.exports = routes;