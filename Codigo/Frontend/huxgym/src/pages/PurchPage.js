import React from "react";
import BarraLateral from "../components/BarraLateral";
import HeadC from "../components/HeadC";
import TablaCompras from "../components/TablaCompras";

import "../styles/Crud.css";

function PurchPage() {
  return (
    <div className="Principal">
      <div className="Barra">
        <BarraLateral />
      </div>
      <div className="Head">
        <HeadC />
      </div>
      <div className="Tabla">
        <TablaCompras />
      </div>
    </div>
  );
}

export default PurchPage;
