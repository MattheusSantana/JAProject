'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    title: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    cost: DataTypes.DOUBLE,
    done: DataTypes.BOOLEAN,
    deadline: DataTypes.DATE,
    user_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });

  Project.beforeCreate(user => user.id = uuidv4());
  return Project;
};