var Hapi = require('hapi');
var Joi = require('joi');
var server = new Hapi.Server();
//var controllers = [];
var controllers = require('../controllers');
var plugins = require('../plugins');

//Configurando server e porta
server.connection({
  host: 'localhost',
  port: 8080
});

//Carregando controladores somente um
//controllers.push(require('../controllers/user-ctrl.js'));



//Injetar plugins
server.register(plugins.concat(controllers), function(err) {
  if (err) {
    throw err
  } else {
    console.log('Plugins carregados');
  }
});

module.exports = server;
