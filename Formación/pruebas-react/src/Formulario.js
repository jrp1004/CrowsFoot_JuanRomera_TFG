import React from "react";
import { useState } from "react";

function Formulario(){
    //Valor por defecto para el select
    const [inputs,setInputs]=useState({"posicion":"Alumno"});

    const handleSubmit=(event)=>{
        event.preventDefault();
        alert("Nombre: "+inputs.nombre+" Edad: "+inputs.edad+" Posicion: "+inputs.posicion);
    }

    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setInputs(values=>({...values,[name]:value}));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Introduce tu nombre: 
            <input type="text" name="nombre" value={inputs.nombre} onChange={handleChange} required/>
            </label>
            <br/>
            <label>Introduce tu edad: 
                <input type="number" name="edad" value={inputs.edad} onChange={handleChange} required/>
            </label>
            <br/>
            <select name="posicion" value={inputs.posicion} onChange={handleChange}>
                <option value="Profesor">Profesor</option>
                <option value="Alumno" selected>Alumno</option>
            </select>
            <input type="submit"/>
        </form>
    );
}

export default Formulario;