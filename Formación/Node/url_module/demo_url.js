const path=require('path');

var http=require('http');
var url=require('url');
var fs=require('fs');

http.createServer(function(req,res){
    var q=url.parse(req.url,true);
    //var filename=path.join(__dirname,q.pathname);
    var filename=__dirname+q.pathname;
    fs.readFile(filename,function(err,data){
        if(err){
            console.log(err);
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end("404 not found");
        }
        console.log(q.path);
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);