import React from "react";
import BarraLateral from "../components/BarraLateral";
import HeadC from "../components/HeadC";
import TablaE from "../components/TablaE";

const rol = localStorage.getItem("rol");
function EmployeePage() {
  return (
    <div className="Principal">
      <div className="Barra">
        <BarraLateral />
      </div>
      <div className="Head">
        <HeadC />
      </div>
      <div className="Tabla">
        <TablaE />
      </div>
    </div>
  );
}

export default EmployeePage;
