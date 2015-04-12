var Joi = require('joi');
var Boom = require('boom');
var jwt = require('jsonwebtoken');
var models = require('../models');



exports.register = function (server, options, next) {

  server.route({
    method: 'POST',
    path: '/api/v1/auth',
    handler: function (request, reply) {
      var auth = request.payload;
      var User = models.UserModel;

      User.find({
        where:{
          username: auth.username
        }
      }).then(function(user) {
        if (!user) {
          reply(Boom.unauthorized('Usuario inválido!'))
        } else if (auth.password !== user.get('password')) {
          reply(Boom.unauthorized('Senha inválida!'))
          } else {
              var token = jwt.sign({usuario: auth.username}, 'shhh!', {
              expiresInSeconds: 320
              });
              reply({token: token});
            }
      });
    },
    config:{
      validate:{
        payload:{
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    }
  });

  server.route({
    method:'GET',
    path: '/api/v1/auth',
    handler: function (request, reply) {
    //  console.log(request);
      reply(request.auth.credentials);
    },
    config: {
      auth: 'token'
    }
  });
  next();
};

exports.register.attributes = {
  name: 'auth-ctrl',
  version: '0.0.1'
};
