const { Project } = require('../models');
const { User } = require('../models');


const createProject = async (req, res) => {
    const { title, zip_code, cost, done, deadline, username } = req.body;
    
    
    if (!username || !title || !zip_code) {
        return res.status(400).send({message: "Please submit at least username, title and zip code fields!"});

    }
    const userAlreadyExists = await User.findOne({ where: { username }});
    
    if (!userAlreadyExists) {
        return res.status(400).json({message: "User does not exists"});
    }


    const createdProject = await Project.create({
        user_name: username, title, zip_code, cost, done, deadline
    });

    return res.status(201).json(createdProject);

};

const getProject = async (req, res) => {
    const { username } = req.headers;
    
    const userAlreadyExists = await User.findOne({ where: {username }});
    if (!userAlreadyExists) {
        return res.status(400).json({message: "User does not exists"});
    }

    const projects = await Project.findAll({where: {user_name: username }});

    return res.send(projects);
}


const finishProject = async (req, res) => {
    try {
        const { username } = req.headers;
        const { id } = req.params;


        const project = await Project.findByPk(id);
        
        if (!project){
            return res.status(400).json({message: "Project not found"});
        }

        if (!id || !username) {
            return res
            .status(400)
            .json({ message: "Please submit id and username!" });
        }
    
        await Project.update(
            {done: true},
            {where: {id}}
        );
    
        return res.status(201).json({
          message: "Project updated successfully"
        });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    
} 


module.exports = {createProject, getProject, finishProject};