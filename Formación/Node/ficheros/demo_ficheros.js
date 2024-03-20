//cambio para poder acceder al fichero desde la carpeta del script
const path=require('path');
const rutaFicheroHtml=path.join(__dirname,'demo.html');
//console.log('Ruta: '+rutaFicheroHtml);

var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  //Open a file on the server and return its content:
  fs.readFile(rutaFicheroHtml, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);