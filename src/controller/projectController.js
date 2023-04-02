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

module.exports = createProject;