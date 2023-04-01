import Sequelize from 'sequelize';

import sequelize from '../config/sequelize.js';

import User from '../models/user.model.js';

const user = User(sequelize, Sequelize.DataTypes);

const database = {
    user,
    sequelize
};

export default database;