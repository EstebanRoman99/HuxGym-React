import React from "react";
import BarraLateral from "../components/BarraLateral";
import HeadC from "../components/HeadC";
import '../styles/Crud.css'
import Tabla from "../components/Tabla";

function ClientPage() {
  return (
    
    <div className="Principal">
      <div className="Barra">
        <BarraLateral />
      </div>
      <div className="Head">
        <HeadC />
      </div>
      <div className="Tabla">
        <Tabla />
      </div>
    
    </div>
  );
}

export default ClientPage;
