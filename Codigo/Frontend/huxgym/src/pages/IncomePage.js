import React from "react";
import BarraLateral from "../components/BarraLateral";
import BotonContabilidad from "../components/BotonContabilidad";
import HeadC from "../components/HeadC";
import "../styles/Crud.css";
import TablaIngresos from "../components/TablaIngresos";

function IncomePage() {
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
        <TablaIngresos />
      </div>
    </div>
  );
}

export default IncomePage;
