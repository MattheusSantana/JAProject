import Sequelize from 'sequelize';
import configDatabase from './database.js';

const sequelize = new Sequelize(configDatabase);

export default sequelize;