const { Project } = require("../models");
const { User } = require("../models");
const zipCode = require("zipcodes");

const createProject = async (req, res) => {
  const { title, zip_code, cost, done, deadline, username } = req.body;

  if (!username || !title || !zip_code) {
    return res
      .status(400)
      .send({
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

  return res.status(201).json(createdProject);
};

const getProjects = async (req, res) => {
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

    const userAlreadyExists = await User.findOne({ where: { username } });
    if (!userAlreadyExists) {
      return res.status(400).json({ message: "User does not exists" });
    }

    let project = await Project.findByPk(id);

    if (!project) {
      return res.status(400).send({ message: "Project not found" });
    }

    const { country, city, state } = getLocation(project.zip_code);
    project = {
      ...project.dataValues,
      country,
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
    const projectUpdated = await Project.update(
      {
        title,
        cost,
        deadline,
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

      await Project.destroy({ where: { id }});
  
      return res.status(200).json({
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

const getLocation = (zip_code) => {
  const { country, city, state } = zipCode.lookup(zip_code);
  return { country, city, state };
};

module.exports = {
  createProject,
  getProjects,
  finishProject,
  updateProject,
  getProject,
  deleteProject
};
