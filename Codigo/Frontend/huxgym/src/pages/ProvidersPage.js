import React from "react";
import BarraLateral from "../components/BarraLateral";
import BotonProducts from "../components/BotonProducts";
import HeadC from "../components/HeadC";
import TablaProvedor from "../components/TablaProvedor";
import "../styles/ProductsPage.css";

function ProvidersPage() {
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
          <BotonProducts />
          <br />
        </div>
        <br />
        <TablaProvedor />
      </div>
    </div>
  );
}
export default ProvidersPage;
