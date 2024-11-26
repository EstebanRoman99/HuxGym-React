import React from "react";
import BarraLateral from "../components/BarraLateral";
import BotonProducts from "../components/BotonProducts";
import HeadC from "../components/HeadC";
import "../styles/Crud.css";
import TablaP from "../components/TablaP";

function ProductsPage() {
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
        </div>
        <br />
        <TablaP />
      </div>
    </div>
  );
}

export default ProductsPage;
