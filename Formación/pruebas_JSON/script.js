let text='{"coches":[' +
'{"nombre":"Ford","fechaCompra":2015},'+
'{"nombre":"Ferrari","fechaCompra":2019}]}';

const datosCoche={
    nombreFecha:function(){
        return this.nombre+" "+this.fechaCompra;
    }
}

function mostrarDatos(){
    const obj=JSON.parse(text);
    //document.getElementById("datos").innerHTML=obj.coches[0].nombre+" "+obj.coches[0].fechaCompra;

    let datos="";
    const coches=obj.coches;
    for(let coche of obj.coches){
        //datos+=coche.nombre+" "+coche.fechaCompra+"<br>";
        datos+=datosCoche.nombreFecha.call(coche)+"<br>";
        console.log(coche.nombre)
    }
    
    document.getElementById("datos").innerHTML=datos;
}