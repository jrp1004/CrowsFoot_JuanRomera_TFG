const persona={
    nombre : "Juan",
    apellido:"Romera",
    id:1,
    nombreCompleto:function(){
        return this.nombre+" "+this.apellido;
    }
}

function mostrarDatos(){
    document.getElementById("nombre").innerHTML=concatenarTexto("nombre",persona.nombre);
    document.getElementById("apellido").innerHTML=concatenarTexto("apellido",persona.apellido);
    document.getElementById("identificador").innerHTML=concatenarTexto("identificador",persona.id);
    document.getElementById("nombreCompleto").innerHTML=concatenarTexto("nombreCompleto",persona.nombreCompleto());
}

function concatenarTexto(id,texto){
    let textoOriginal=document.getElementById(id).textContent;
    return textoOriginal+texto;
}