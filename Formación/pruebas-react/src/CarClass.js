import React from "react";

class Car extends React.Component{
    constructor(props){
        super(props);
        this.state={color:"rojo", marca:"Ford"};

        if('marca' in this.props){
            this.state.marca=this.props.marca;
        }
    }

    cambiarMarca=(marcaNueva)=>{
        this.setState({marca:marcaNueva});
    }

    render(){
        return (
            <div>
            <h2>Hola, soy un coche de color {this.state.color} de la marca {this.state.marca}</h2>
            <button type="button" onClick={()=>this.cambiarMarca("Ford")}>Cambiar marca</button>
            </div>
        );
    }
}

export default Car;