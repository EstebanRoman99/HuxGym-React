import React from "react";
import BarraLateral from "../components/BarraLateral";
import BotonProducts from "../components/BotonProducts";
import HeadC from "../components/HeadC";
import "../styles/Crud.css";
import TablaGastos from "../components/TablaGastos";
import BotonContabilidad from "../components/BotonContabilidad";

function ExpensePage() {
  return (
    <div className="Principal">
      <div className="Barra">
        <BarraLateral />
      </div>
      <div className="Head">
        <HeadC />
      </div>
      <div className="Tabla">
        <div className="Barra_opciones">
          <BotonContabilidad />
        </div>
        <br/>
        <TablaGastos />
      </div>
    </div>
  );
}

export default ExpensePage;
