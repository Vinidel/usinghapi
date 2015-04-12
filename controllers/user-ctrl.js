var Joi = require('joi');
var models = require('../models');
var db = require('../lib/db');
var Boom = require('boom');

exports.register = function(server, options, next){
  //Controlador de usuários

  server.route({
    method:'GET',
    path: '/api/v1/user',
    handler: function(request, reply){

      var User = models.UserModel;

      User.findAll().then(function(users) {
        reply(users);
      });
    },
    config:{
      auth:'token'
    }
  });

  server.route({
    method: 'POST',
    path:'/api/v1/user',
    handler: function (request, reply) {
      var User = models.UserModel;
      User.create(request.payload).then(function(user){
        reply(user.get());
      });
      // reply({
      //   success: true,
      //   message: 'Usuário cadastrado com sucesso'
      // });
    },
    config:{
      validate:{
        payload:{
          username: Joi.string().required(),
          password: Joi.string().required(),
          email: Joi.string().email().required()
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path:'/api/v1/user/{id}',
    handler: function (request, reply) {
    //Deletar o usuário
    var User = models.UserModel;

    User.find(request.params.id).then(function(user) {
      if(!user){
        return null;
      } else {
        return user.destroy();
      }
    }).then(function() {
      reply({acess: true})
    });
  },
  config:{
    auth: 'token',
    validate:{
      params:{
        id: Joi.number().required()
      }
    }
  }
  });

  server.route({
    method: 'PUT',
    path: '/api/v1/user/{id}',
    handler: function (request, reply) {
      //atualizar o usuario
      var User = models.UserModel;
      //retorna uma promise baseada no lock adquirido
      db.transaction(function(t) {
        return User.find(request.params.id, {
          transaction: t
        }).then(function(user) {
          if(!user){
            return null;
          } else {
             return user.set(request.payload).save({
              transction: t
            });
          }
        });
      }).then(function(user) {
        if(!user){
          reply(Boom.notFound('Usuário inexistente'));
        } else{
          reply(user);
        }
      });
    },
    config:{
      auth: 'token',
      validate:{
        payload:{
          username: Joi.string().optional(),
          email: Joi.string().email().optional(),
          password: Joi.string().optional()
        },
        params:{
          id: Joi.number().required()
        }
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'user-ctrl',
  version: '0.0.1'
};
