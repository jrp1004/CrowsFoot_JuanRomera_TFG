//Mismo ejercicio que con AJAX
async function getPokemones(){
    let myObject=await fetch("https://pokeapi.co/api/v2/pokemon");
    let myText=await myObject.text();
    const obj=JSON.parse(myText);
    console.log(obj);

    const pokemones=obj.results;
    let datos="";
    for(let pok of pokemones){
        datos+=pok.name+"<br>";
        console.log(pok);
    }
    document.getElementById("datos").innerHTML=datos;
}