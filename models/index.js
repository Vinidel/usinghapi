var fs = require('fs');
var str = require('underscore.string');
var files = fs.readdirSync(__dirname);

files.forEach(function(file){
  if(file !== 'index.js'){
    exports[str.classify(file.replace('.js', ''))] = require('./' + file);
  }
});
