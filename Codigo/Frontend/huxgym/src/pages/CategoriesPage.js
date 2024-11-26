import React from "react";
import BarraLateral from "../components/BarraLateral";
import BotonProducts from "../components/BotonProducts";
import HeadC from "../components/HeadC";
import TablaC from "../components/TablaC";
import "../styles/ProductsPage.css";

function CategoriesPage() {
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
        <TablaC />
      </div>
    </div>
  );
}
export default CategoriesPage;
