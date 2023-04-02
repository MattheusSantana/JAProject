const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT,{ expiresIn: 3600});

module.exports = generateToken;