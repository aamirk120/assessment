let associations = (sequelize) => {
    const {User, Customer} = sequelize.models;

    User.hasMany(Customer, {foreignKey: 'user_id'});
    Customer.belongsTo(User, {foreignKey: 'user_id'});
}

module.exports = {associations};
