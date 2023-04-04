const { User } = require('../models');

const createUser = async (req, res) => {
    const { name, username, password } = req.body;

    const userAlreadyExists = await User.findOne({ where: { username }});
    
    if (userAlreadyExists) {
        console.log("userAlreadyExists", userAlreadyExists);
        return res.status(400).json({message: "User already exists"});
    }

    if (!name || !username || !password) {
        return res.status(400).send({message: "Please submit all fields!"});

    }

    const createdUser = await User.create({
        name, 
        username, 
        password
    });

    return res.status(201).json({message: "User created successfully!"});

};

module.exports = createUser;