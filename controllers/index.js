var fs = require('fs');
var files = fs.readdirSync(__dirname);
module.exports = [];

files.forEach(function(file){
  if(file !== 'index.js'){
    module.exports.push(require('./' + file));
  }
});
