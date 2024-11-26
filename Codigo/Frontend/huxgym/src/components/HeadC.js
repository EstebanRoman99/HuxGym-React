import React from "react";
import "../styles/Header.css";
import MenuDesplegable from "./MenuDesplegable";

function HeadC() {
  return (
    <div className="Heade">
      <div className="Correo">
        <h2>{localStorage.getItem("email")}</h2>
      </div>
      <div className="Spac"></div>
      <div className="Perfil">
        <div className="imagenP">
        <img src={`http://35.202.70.210/${localStorage.getItem("image")}`} width="50" height="50" align="center"/>
        </div>
        <div className="NombreRol">
          <div className="Nombre"> {localStorage.getItem("name")}</div>
          <div className="Rol"> {localStorage.getItem("rol")} </div>
          <div className="Opciones"></div>
        </div>
        <MenuDesplegable></MenuDesplegable>
      </div>
    </div>
  );
}

export default HeadC;
