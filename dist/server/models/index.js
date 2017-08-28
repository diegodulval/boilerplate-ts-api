'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = require('../config/env/config')();
var env = config.env || 'development';
var db = {};
var sequelize;
if (config.dbURL) {
    sequelize = new Sequelize(config.dbURL);
}
else {
    sequelize = new Sequelize(config.db, config.username, config.password);
}
console.log(__dirname); //tslint:disable-line
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    var extension = '.js';
    if (process.env.NODE_ENV === 'development') {
        extension = '.ts';
    }
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === "" + extension);
})
    .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file)); //tslint:disable-line
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
