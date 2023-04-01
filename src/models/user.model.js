import { DataTypes } from "sequelize";
import Sequelize from 'sequelize';

const user = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            allowNull: false
        },

    }, {
        tableName: 'user'
    });

    return User;
};

export default user;