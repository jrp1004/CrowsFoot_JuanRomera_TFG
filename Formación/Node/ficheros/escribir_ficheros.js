const path=require('path');
const rutaFichero=path.join(__dirname,'nuevoFichero.txt');

var fs=require('fs');

fs.appendFile(rutaFichero,'Hola mundo',function(err){
    if(err) throw err;
    console.log('guardado');
});