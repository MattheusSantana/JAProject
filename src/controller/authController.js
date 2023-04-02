const generateToken =  require("../services/authService.js");
const { User } = require('../models');

const login = async (req, res) => {
    const {username, password} = req.body;
    
    try {
        if (!username || !password){
            return res.status(400).send({message: "Please submit username and password"});
        }


        let user = await User.findOne({where: {username}});
        if (!user) {
            return res.status(401).send({ message: "user not found!" });
          }

        const passwordIsValid = password === user.password ? true : false;
        
        if(!passwordIsValid){
            return res.status(401).send({message: "Incorrect password"});
        }
        const token = generateToken(user.id);
        
        res.status(200).send({message:"OK", user, token});
    } catch (e) {
        res.status(500).send(e.message); 
    }
};

module.exports = login;