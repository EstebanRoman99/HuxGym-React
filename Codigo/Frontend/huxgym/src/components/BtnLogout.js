import React from "react";
import axios from "axios";
import swal from 'sweetalert';
const baseUrl = "http://35.202.70.210/logout/";

export default function BtnLogout() {
  const handleOut = async() => {
    try{
      const res = await axios.post(baseUrl, {
        token: localStorage.getItem("token")
      });
      swal({
        text: 'Sesión cerrada',
        icon: "info",
        button: "Aceptar",
       
      }).then(respuesta=>{
        if(respuesta){
          localStorage.removeItem("token")
          localStorage.removeItem("id")
          localStorage.removeItem("email")
          localStorage.removeItem("rol")
          localStorage.removeItem("role")
          window.location.href = "/";
        }
      })
        
    }catch(error){
      const msj = JSON.parse(error.request.response).error
      alert(msj)
    }
  };

  return (
    <div>
      <button className="btn btn-danger" href="/" onClick={handleOut}>
        Cerrar sesión
      </button>
    </div>
  );
}
