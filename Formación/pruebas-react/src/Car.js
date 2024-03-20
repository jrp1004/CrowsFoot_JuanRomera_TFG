function Car(props){
    let texto;
    
    //Comprobamos que props no esté vacío
    if(Object.keys(props).length===0){
        texto=<h2>Hola, soy un coche</h2>;
    }else{
        texto=<h2>Hola, soy un coche de marca {props.marca}</h2>;
    }
    
    return texto;
}

function Garage(props){
    const tam = props.num<0?1:props.num;
    let texto=[ <h1>¿Quién está en mi garaje?</h1> ]
    for(let i=0;i<tam;i++){
        texto.push(<Car />);
    }
    return texto;
}

export {Car, Garage};