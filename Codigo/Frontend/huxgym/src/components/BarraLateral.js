import React, { Component } from "react";
import "../styles/BarraL.css";
import { link, NavLink } from "react-router-dom";
import BtnLogout from "../components/BtnLogout";

const rol = localStorage.getItem("rol");

export default function BarraLateral() {
  /* constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  } */

  return (
    <div>
      <div className="sidebar">
        <div className="logo_content">
          <div className="logo">
            <div className="logo_name">Hux-Gym</div>
          </div>
          <i className="bx bxs-home" id="btn"></i>
        </div>
        <ul className="nav_list">
          <li>
            <NavLink to="/Dashboard" activeClass="active">
              <i className="bx bx-grid-alt">
                <box-icon
                  name="home"
                  type="solid"
                  type="solid"
                  color="#fff"
                  animation="tada"
                ></box-icon>
              </i>
              <span className="links_names">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ClientPage" activeClass="active">
              <i className="bx bxs-user">
                <box-icon
                  type="solid"
                  name="user"
                  color="#fff"
                  animation="tada"
                ></box-icon>
              </i>
              <span className="links_names">Clientes</span>
            </NavLink>
          </li>
          {rol == "Administrador" ? (
            <li>
              <NavLink to="/EmployeePage">
                <i className="bx bxs-user">
                  <box-icon
                    type="solid"
                    name="user"
                    color="#fff"
                    animation="tada"
                  ></box-icon>
                </i>
                <span className="links_names">Empleados</span>
              </NavLink>
            </li>
          ) : (
            <></>
          )}

          <li>
            <NavLink to="/MembershipPage">
              <i className="bx bxs-credit-card-front">
                <box-icon
                  name="credit-card-front"
                  type="solid"
                  color="#ffffff"
                  animation="tada"
                ></box-icon>
              </i>
              <span className="links_names">Membresias</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/SalesPage">
              <i className="bx bx-purchase-tag-alt">
                <box-icon
                  name="purchase-tag-alt"
                  type="solid"
                  color="#f9f5f5"
                  animation="tada"
                ></box-icon>
              </i>
              <span className="links_names">Ventas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ProductsPage">
              <i className="bx bxl-product-hunt">
                <box-icon
                  name="package"
                  color="#ffffff"
                  type="solid"
                  animation="tada"
                ></box-icon>
              </i>
              <span className="links_names">Productos</span>
            </NavLink>
          </li>
          {rol == "Administrador" || rol == "Encargado" ? (
            <li>
              <NavLink to="/PurchPage">
                <i className="bx bxs-cart">
                  <box-icon
                    name="cart"
                    type="solid"
                    color="#ffffff"
                    animation="tada"
                  ></box-icon>
                </i>
                <span className="links_names">Compras</span>
              </NavLink>
            </li>
          ) : (
            <></>
          )}
        {rol == "Administrador" ? ( <> <li>
            <NavLink to="/AccountingPage">
              <i className="bx bxs-coin-stack">
                <box-icon
                  name="coin-stack"
                  type="solid"
                  color="#ffffff"
                  animation="tada"
                ></box-icon>
              </i>
              <span className="links_names">Contabilidad</span>
            </NavLink>
          </li>  </>):(<></>)}
          
        </ul>
      </div>
    </div>
  );
}
