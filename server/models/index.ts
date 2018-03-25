'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const config    = require('../config/env/config')();
const env       = config.env || 'development';
const db: any   = {};
const modelRelations = require('./relations/relations');

let sequelize;
if (config.dbURL) {
  sequelize = new Sequelize(config.dbURL);
} else {
  sequelize = new Sequelize(config.db, config.username, config.password);
}
console.log(__dirname); //tslint:disable-line
fs
  .readdirSync(__dirname)
  .filter((file) => {
    let extension = '.js';
    if (process.env.NODE_ENV === 'development') {
      extension = '.ts';
    }
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === `${extension}`);
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file)); //tslint:disable-line
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

modelRelations(db);

module.exports = db;
