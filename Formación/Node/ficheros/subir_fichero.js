var http=require('http');
var fs=require('fs');
var formidable=require('formidable');

http.createServer(function(req,res){
    if(req.url=='/fileupload'){
        var form=new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            var oldpath=files.filetoupload[0].filepath;
            var rawdata=fs.readFileSync(oldpath);
            var newpath=__dirname+"/"+files.filetoupload[0].originalFilename;
            
            fs.writeFile(newpath,rawdata,function(err){
                if(err) throw err;
                res.write("Fichero almacenado");
                res.end();
            });
        });
    }else{
        var formulario=__dirname+"/formulario.html";
        
        fs.readFile(formulario,function(err,data){
            if(err){
                res.writeHead(404,{'Content-Type':'text/html'});
                return res.end("404 file not found");
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            return res.end();
        });
    }  
}).listen(8080);