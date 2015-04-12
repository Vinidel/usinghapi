var jwt = require('jsonwebtoken');
var Boom = require('boom');

exports.register = function (server, options, next) {
  server.auth.scheme('token', function() {
    return {
      authenticate: function(request, reply){
        var req = request.raw.req;
        var headers = req.headers;
        
        if(!headers.authorization){
          reply(Boom.unauthorized('Login necessário!'));

        } else {
          var token = headers.authorization.replace('Bearer ', '');
          jwt.verify(token, 'shhh!', function (err, user) {
            if(err){
              reply(Boom.unauthorized('Token ruim'));
            } else {
              reply.continue({
                credentials: user
              });
            }
          });
        }
      }
    };
  });
  server.auth.strategy('token', 'token');

  next();
};

exports.register.attributes = {
  name: 'token',
  version: '0.0.1'
};
