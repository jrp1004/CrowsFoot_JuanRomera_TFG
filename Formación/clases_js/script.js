class Car{
    constructor(name,year){
        this.name=name;
        this.year=year;
    }

    age(x){
        return x-this.year;
    }
}

const date=new Date();
let year=date.getFullYear();

const coche=new Car("Ferrari",2009);

function mostrarDatos(){
    document.getElementById("datos").innerHTML=coche.age(year)+" años";
}