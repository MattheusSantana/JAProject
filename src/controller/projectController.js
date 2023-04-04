const moment = require('moment');
const { Project } = require("../models");
const { User } = require("../models");
const cep = require("cep-promise");
const createProject = async (req, res) => {
  try {
    const { title, zip_code, cost, done, deadline } = req.body;
    const { username } = req.headers;

    if (!username) {
      return res.status(400).json({ message: "Please submit username!" });
    }
    
    if ( !title || !zip_code) {
      return res.status(400).send({
        message: "Please submit at least username, title and zip code fields!",
      });
    }
    const userAlreadyExists = await User.findOne({ where: { username } });

    if (!userAlreadyExists) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const createdProject = await Project.create({
      user_name: username,
      title,
      zip_code,
      cost,
      done,
      deadline,
    });

    return res.status(201).json({ message: "Project created Sucessfully!" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const { username } = req.headers;

    if (!username) {
      return res.status(400).json({ message: "Please submit username!" });
    }

    const userAlreadyExists = await User.findOne({ where: { username } });
    if (!userAlreadyExists) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const projects = await Project.findAll({ where: { user_name: username } });

    return res.send(projects);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const { username } = req.headers;
    const { id } = req.params;

    if (!id || !username) {
      return res
        .status(400)
        .json({ message: "Please submit id and username!" });
    }

    let project = await Project.findByPk(id);

    if (!project) {
      return res.status(400).send({ message: "Project not found" });
    }

    if (project.user_name !== username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { city, state } = await getLocation(project.zip_code);
    project = {
      ...project.dataValues,
      city,
      state,
    };

    return res.send(project);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const finishProject = async (req, res) => {
  try {
    const { username } = req.headers;
    const { id } = req.params;

    if (!id || !username) {
      return res
        .status(400)
        .json({ message: "Please submit id and username!" });
    }

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }

    if (project.user_name !== username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Project.update({ done: true }, { where: { id } });

    return res.status(201).json({
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, cost, deadline, zip_code } = req.body;
    const { username } = req.headers;
    const { id } = req.params;

    if (!title && !cost && !deadline && !zip_code) {
      res
        .status(400)
        .json({ message: "Please submit  at least one field for update!" });
    }

    if (!username || !id) {
      return res.status(400).send({ message: "please submit username and id" });
    }

    const project = await Project.findOne({ where: { id } });

    if (!project) {
      return res.status(400).send({ message: "project not found!" });
    }

    if (project.user_name !== username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log('dead', deadline);

    const newDeadline = moment(deadline).format('YYYY-MM-DD HH:mm:ss');
    console.log('new', newDeadline);

    const projectUpdated = await Project.update(
      {
        title,
        cost,
        deadline: newDeadline,
        zip_code,
      },
      { where: { id } }
    );

    res.status(201).json({
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { username } = req.headers;
    const { id } = req.params;

    if (!id || !username) {
      return res
        .status(400)
        .json({ message: "Please submit id and username!" });
    }

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }

    if (project.user_name !== username) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Project.destroy({ where: { id } });

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getLocation = async (zipCode) => {
    let state = '';
    let city = '';
    try {
        const response = await cep(zipCode);
        state = response.state;
        city = response.city;
        return {state, city};
    } catch (error) {
        console.log(error);
        return {state, city};
    }
};

module.exports = {
  createProject,
  getProjects,
  finishProject,
  updateProject,
  getProject,
  deleteProject,
};
