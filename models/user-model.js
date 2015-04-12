var db = require('../lib/db');
var Sequelize = db.Sequelize;

var User = db.define('user', {

  username:{
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});


module.exports = User;
