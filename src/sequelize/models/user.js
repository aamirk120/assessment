const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("User", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user',
        },
        status: {
            type: DataTypes.ENUM('active', 'disabled'),
            defaultValue: 'disabled',
        },
    });
};