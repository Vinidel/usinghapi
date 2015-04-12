server.route({
  method: 'POST',
  path: '/',
  handler: function(request, reply){
    console.log(request.payload);
    reply({message: 'Inserido com sucesso!'});
  },
  config:{
    validate:{
      payload:{
        nome: Joi.string().max(50),
        email: Joi.string().email(),
        idade: Joi.number().min(18).max(100)
      }
    }
  }
});

server.start();
