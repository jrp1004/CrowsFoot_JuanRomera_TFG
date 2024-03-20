var express=require('express');
var app=express();

app.get('/',function(req,res){
    res.send("Hola mundo!");
});

app.route("/Contacto").get(function (req,res){
    res.send("CONTACTO");
});

app.listen(8080,()=>{
    console.log("server running on localhost:8080");
});