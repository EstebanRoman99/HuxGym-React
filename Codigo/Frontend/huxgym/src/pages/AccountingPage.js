import React from "react";
import BarraLateral from "../components/BarraLateral";
import HeadC from "../components/HeadC";
import "../styles/Crud.css";
import TablaCortes from "../components/TablaCortes";
import BotonContabilidad from "../components/BotonContabilidad";

function AccountingPage() {
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
        <TablaCortes />
      </div>
    </div>
  );
}

export default AccountingPage;
