var models = require('../models');
var User = models.UserModel;

User.sync().then(function(){
  console.log('Terminou!');
});
