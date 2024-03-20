import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"

//import { Garage } from './Car';
//import Car from './CarClass';
//import Formulario from './Formulario';

/*
const miPrimerElemento=<h1>Hola React</h1>

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(miPrimerElemento);

const tablaPrueba=(
  <table>
    <tr>
      <th>Nombre</th>
    </tr>
    <tr>
      <td>Juan</td>
    </tr>
  </table>
)
//sobrescribe lo anterior
//root.render(tablaPrueba);

//con otro root en otro div podemos mostrar ambas
const root2=ReactDOM.createRoot(document.getElementById('tabla'));
root2.render(tablaPrueba);
*/

//const root=ReactDOM.createRoot(document.getElementById('root'));
//root.render(<Garage num="5" />)
//let coche=<Car marca="Ferrari" />;
//root.render(coche);

//root.render(<Formulario />);


import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='blogs' element={<Blogs />}/>
          <Route path='contact' element={<Contact />}/>
          <Route path='*' element={<NoPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);