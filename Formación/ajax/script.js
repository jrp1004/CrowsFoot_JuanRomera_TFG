let xhttp=new XMLHttpRequest();
xhttp.onreadystatechange=function(){
    if(this.readyState==4&&this.status==200){
        const obj=JSON.parse(this.responseText);
        console.log(obj);

        const pokemones=obj.results;
        let datos="";
        for(let pok of pokemones){
            datos+=pok.name+"<br>";
            console.log(pok);
        }
        document.getElementById("datos").innerHTML=datos;
    }
};

xhttp.open("GET","https://pokeapi.co/api/v2/pokemon",true);
xhttp.setRequestHeader("Content-type","application/json");

xhttp.send(null);