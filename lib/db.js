var Sequelize = require('sequelize');
var db = new Sequelize('sqlite://db.sqlite');

module.exports = db;
