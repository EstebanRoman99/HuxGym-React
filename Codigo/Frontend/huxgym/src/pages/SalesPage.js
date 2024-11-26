import React from "react";
import BarraLateral from "../components/BarraLateral";
import HeadC from "../components/HeadC";

import TablaV from "../components/TablaV";

import "../styles/Crud.css";

function SalesPage() {
  return (
    <div className="Principal">
      <div className="Barra">
        <BarraLateral />
      </div>
      <div className="Head">
        <HeadC />
      </div>
      <div className="Tabla">
        <TablaV />
      </div>
    </div>
  );
}

export default SalesPage;
