var http=require('http');
var url=require('url');//para leer los parámetros

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    var q=url.parse(req.url,true).query;//obtenemos los parámetros
    var txt=q.year+" "+q.month;//localhost:8080/?year=año&month=mes     muestra en pantalla esos parámetros
    res.end(txt);
}).listen(8080);