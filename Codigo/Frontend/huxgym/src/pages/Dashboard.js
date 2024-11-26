import React from "react";
import BarraLateral from "../components/BarraLateral";
import HeadC from "../components/HeadC";
import Checkin from "../components/Checkin";
import "../styles/checkin.css";
import Botones from "../components/Botones";
import Monto from "../components/Monto";
import Check_Client from "../components/Check_Client";
import Grafica_Barras from "../components/Grafica_Barras";

function Dashboard() {
  return (
    <div className="Principal">
      <div className="Barra">
        <BarraLateral />
      </div>
      <div className="Head">
        <HeadC />
      </div>
      <div className="Tabla">
        <br />
        <Checkin />
        <br />

        <Check_Client />
        {/* <Botones /> */}
        <Monto />
        <Grafica_Barras />
      </div>
    </div>
  );
}

export default Dashboard;
