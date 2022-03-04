'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const model_dir = __dirname + "/models"
const { associations } = require('./associations');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__config}/config.json`)[env];
const db = {};
let models = [];

let sequelize = new Sequelize(config["database"], config["username"], config["password"], config);

let files = fs.readdirSync(model_dir);

for (const file of files) {
    const model = require(path.join(model_dir, file))(sequelize, Sequelize);
    db[model.name] = model;
    models.push(model);
}


associations(sequelize)
sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
