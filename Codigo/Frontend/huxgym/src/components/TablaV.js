import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import swal from "sweetalert";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { isEmpty } from "../helpers/methods";
import "../styles/Crud.css";
import "../styles/Ventas.css";

const url = "http://35.202.70.210/sales/"; /* Aqui va la url principal */
const urlC = "http://35.202.70.210/customers/customers/";
const urlP = "http://35.202.70.210/products/products/";
const urlM = "http://35.202.70.210/memberships/memberships/";
class TablaV extends Component {
  state = {
    busqueda: "",
    dataP: [],
    dataC: [],
    dataS: [],
    dataM: [],
    data: [] /* Aqui se almacena toda la informacion axios de ventas */,
    modalInsertar: false /* Esta es el estado para abrir y cerrar la ventana modal */,
    modalMembresia: false,
    modalEliminar: false,
    modalSeleccionarCliente: false,
    modalSeleccionarProducto: false,
    productos: [],
    id_cliente: "",
    id_producto: "",
    name_cliente: "",
    name_producto: "",
    clientesBA: [],
    productosBA: [],
    cantidades: [],
    membresiasBA: [],
    total: 0,
    cambio: 0,
    pago: 0,
    user_id: 0,
    form: {
      /* Aqui guardaremos los datos que el usuario introduce en el formulario */
      id: "",
      name_employee: "",
      observation: "",
      total: "",
      cash: "",
      customer: "",
      date: "",
      sale_details: [],
    },
    form2: {
      id: "",
      cantidad: 1,
      precio: "",
    },
    form3: {
      customer_id: "",
      products: [],
      cash: 0,
      is_products: true,
      observation: "",
    },
  };

  handleChange = async (e) => {
    /* handleChange se ejecuta cada vez que una tecla es presionada */
    e.persist();
    await this.setState({
      form: {
        ...this.state
          .form /* Con esto evitamos que los datos almacenados en el forma se borren */,
        /* con e.target.name seleccionamos el campo y con e.targe.value le asignamos la letra que se pulso */
        [e.target.name]: e.target.value,
      },
    });
    /* console.log(this.state.form); */
  };

  handleChange2 = async (e) => {
    /* handleChange se ejecuta cada vez que una tecla es presionada */
    e.persist();
    await this.setState({
      form2: {
        ...this.state
          .form2 /* Con esto evitamos que los datos almacenados en el forma se borren */,
        /* con e.target.name seleccionamos el campo y con e.targe.value le asignamos la letra que se pulso */
        [e.target.name]: e.target.value,
      },
    });
    /* console.log(this.state.form2); */
  };

  handleChange3 = async (e) => {
    /* handleChange se ejecuta cada vez que una tecla es presionada */
    e.persist();
    await this.setState({
      ...this.state,
      pago: e.target.value,
    });
    this.calcularCambio();
    /* console.log(this.state.pago); */
  };

  nuevaCantidad = (Producto) => {
    var p = 0;
    if (this.state.modalMembresia) {
      p = parseFloat(Producto.price);
    } else {
      p = parseFloat(Producto.price_s);
    }
    const c = {
      id: Producto.id,
      cantidad: 1,
      precio: p,
    };
    let a = [c.id, c.cantidad, c.precio];
    this.state.cantidades.push(a);
    console.log(this.state.cantidades);
    /* console.log(this.state.cantidades); */
  };

  calcularCambio = async () => {
    var r = 0;
    r = this.state.pago - this.total();
    /* console.log(r); */
    await this.setState({ cambio: r });
    return r;
  };

  eliminar = (producto) => {
    var i = 0;
    if (this.state.dataS.length > 0) {
      /* console.log(this.state.dataS.length); */
      this.state.dataS.map((dato) => {
        if (dato.id == producto.id) {
          this.state.dataS.splice(i, 1);
          /* console.log(this.state.dataS); */
          this.peticionGetP();
          return true;
        } else {
          console.log("No encontrado");
        }
        i++;
      });
    } else {
      console.log("No hay nada que eliminar");
      return false;
    }
  };

  eliminarCantidad = (producto) => {
    var i = 0;
    if (this.state.cantidades.length > 0) {
      /* console.log(this.state.cantidades.length); */
      this.state.cantidades.map((dato) => {
        if (dato[0] == producto.id) {
          this.state.cantidades.splice(i, 1);
          /* console.log(this.state.cantidades); */
          this.peticionGetP();
          return true;
        }
        i++;
      });
    } else {
      console.log("No hay nada que eliminar");
      return false;
    }
  };

  buscar = (producto) => {
    var res = false;
    if (this.state.dataS.length == 0) {
      console.log("Puede Agregarlo");
      res = false;
    } else {
      this.state.dataS.map((dato) => {
        if (dato.id == producto.id) {
          console.log("Ese producto ya se encuentra seleccionado");
          res = true;
        }
      });
    }
    return res;
  };

  arregloCantidad = (form) => {
    var r = false;
    console.log(this.state.cantidades);
    if (this.state.cantidades.length == 0) {
      let a = [form.id, form.cantidad, form.precio];
      this.state.cantidades.push(a);

      console.log("Se agrego a las cantidades");
      console.log(this.state.cantidades);
      return;
    }
    this.state.cantidades.map((dato) => {
      console.log(dato[0]);
      console.log(form.id);
      if (dato[0] === form.id) {
        console.log("Entre papu");
        dato[1] = parseFloat(form.cantidad);
        console.log(this.state.cantidades);
        /*  console.log("Se ha modificado la cantidad");
        console.log(this.state.cantidades); */
        r = true;
        return;
      }
    });
    if (r) {
      return;
    }
    let a = [form.id, form.cantidad, form.precio];
    this.state.cantidades.push(a);
    console.log("Se agrego a las cantidades2");
    /* console.log(this.state.cantidades); */
    return;
  };

  devolverCantidad = (producto) => {
    var r = 1;
    if (this.state.cantidades.length == 0) {
      /*  console.log("No hay nada en cantidades");
      console.log(this.state.cantidades); */
      return r;
    }
    this.state.cantidades.map((dato) => {
      /* console.log(dato); */
      if (dato[0] == producto.id) {
        /* console.log("Se ha encontrado la cantidad");
        console.log(dato.cantidad); */
        r = parseInt(dato[1], 10);
      }
    });
    return r;
  };
  total = () => {
    var t = 0;
    if (this.state.cantidades.length == 0) {
      this.setState({ total: t });
      return t;
    }
    this.state.cantidades.map((cantidad) => {
      t += parseFloat(cantidad[1], 10) * parseFloat(cantidad[2], 10);
    });
    this.setState({ total: t });
    return t;
  };

  peticionGet = async () => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      console.log(res);
      this.setState({
        data: res.data,
      });
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
    }
  };

  peticionGetC = async () => {
    try {
      const res = await axios.get(urlC, {
        headers: {},
      });
      /* console.log(res); */
      this.setState({
        dataC: res.data,
      });
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
    }
  };
  peticionGetP = async () => {
    try {
      const res = await axios.get(urlP, {
        headers: {},
      });
      /* console.log(res); */
      this.setState({
        dataP: res.data,
      });
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
    }
  };
  peticionGetM = async () => {
    try {
      const res = await axios.get(urlM, {
        headers: {},
      });
      console.log(res);
      this.setState({
        dataM: res.data,
      });
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
    }
  };

  peticionPost = async () => {
    /* Son asincronas por que se ejeuctan en segundo plano */
    /* Con esto enviamos los datos al servidor */
    try {
      /* delete this.state.form.id; */

      console.log(this.state.form3);
      const validate = this.validar();
      if (validate.error) {
        swal({
          text: validate.msj,
          icon: "info",
          button: "Aceptar",
          timer: "5000",
        });
      } else {
        await this.setState({
          form3: {
            customer_id: this.state.form.cliente_id,
            products: this.state.cantidades,
            cash: parseFloat(this.state.pago),
            is_products: !this.state.modalMembresia,
            observation: this.state.form.observation,
          },
        });
        this.state.form3.products[0].pop();
        const res = await axios.post(url, this.state.form3, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        });
        /* cambiamos el estado de modalInsertar y volvemos a pedir los datos*/
        if (res.status === 200 || res.status === 201) {
          this.peticionGet();
          swal({
            text: "Venta realizada satisfactoriamente",
            icon: "success",
            button: "Aceptar",
            timer: "5000",
          });
          this.modalInsertar();
          this.limpiarTablaS();
        }
      }
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
      // if(msj === "El cliente ya tiene una membresía activa"){
        this.limpiarTablaS()
        this.modalInsertar()
        this.modalInsertar()
      // }
      swal({
        text: Array.isArray(msj) ? msj[0] : msj,
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  peticionPut = async () => {
    /* con put enviamos informacion al endpoint para modificar*/
    try {
      delete this.state.form.image;
      if (this.state.form.observation != "") {
        const res = await axios.put(
          url + this.state.form.id + "/",
          this.state.form,
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("token"),
            },
          }
        );
        if (res.status === 200 || res.status === 201) {
          this.modalInsertar(); /* Cambiamos el estado de modalInsertar y solicitamos de nuevo los datos */
          this.peticionGet();
          swal({
            text: "Venta actualizada correctamente",
            icon: "success",
            button: "Aceptar",
            timer: "5000",
          });
        }
      } else {
        swal({
          text: "El campo observacion no puede estar vacio ",
          icon: "info",
          button: "Aceptar",
          timer: "5000",
        });
      }
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);

      swal({
        text: Array.isArray(msj) ? msj[0] : msj,
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  peticionDelete = async () => {
    try {
      const res = await axios.delete(
        url + this.state.user_id + "/" + this.state.form.id,
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        this.setState({
          modalEliminar: false,
        });
        swal({
          text: "Venta eliminada correctamente",
          icon: "info",
          button: "Aceptar",
          timer: "5000",
        });
        this.peticionGet();
      }
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
      this.setState({
        error: true,
        errorMsg: msj,
      });
      swal({
        text: Array.isArray(msj) ? msj[0] : msj,
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  limpiarTablaS = () => {
    this.setState({
      total: 0,
      cambio: 0,
      pago: 0,
      name_cliente: "",
      customer_id: "",
      form3: { customer_id: "", products: [], cash: 0, observation: "" },
      form:  {
        observation : ""
      } 
    });
    this.state.dataS = [];
    this.state.cantidades = [];
  };

  componentDidMount() {
    /* Este metodo se ejecuta inmediatamente despues del renderizado */
    this.peticionGet();
    /* this.peticionGetC();
    this.peticionGetP(); */
  }

  modalInsertar = () => {
    /* Con este metodo cambiamos el estado de la variable modal insertar */
    this.setState({
      /* modalSeleccionarCategoria: false,
      modalSeleccionarProveedor: false, */
      modalInsertar: !this.state.modalInsertar,
    });
  };
  opcionMembresia = () => {
    this.setState({
      modalMembresia: !this.state.modalMembresia,
    });
    console.log(this.state.modalMembresia);
  };

  modalCliente = () => {
    /* Con este metodo cambiamos el estado de la variable modal insertar */
    this.setState({
      /* modalInsertar: false,
      modalSeleccionarProveedor: false, */
      modalSeleccionarCliente: !this.state.modalSeleccionarCliente,
    });
  };

  modalProducto = () => {
    /* Con este metodo cambiamos el estado de la variable modal insertar */
    this.setState({
      /* modalInsertar: false,
      modalSeleccionarCategoria: false, */
      modalSeleccionarProducto: !this.state.modalSeleccionarProducto,
    });
  };

  seleccionarUsuario = (venta) => {
    /* Para obtener los datos del usuario a eliminar */
    console.log(venta.sale_detail.length);

    var info = [];
    if (venta.sale_detail.length == 1) {
      if (venta.is_product) {
        venta.sale_detail.map((o) => {
          info.push({
            id: o.id,
            name: o.product.name,
            cantidad: o.amount,
            price_s: o.product.price_s,
            total: o.total,
          });
        });
        this.setState({
          ...this.state.form,
          tipoModal: "actualizar",
          dataS: info,
          busqueda: "",
          user_id: venta.sale.user.id,
          name_cliente: venta.sale.customer.name,
          pago: venta.sale.cash,
          cambio: venta.sale.cash - venta.sale.total,
          total: venta.sale.total,
          form: {
            id: venta.sale.id,
            name_employee: venta.sale.user.name,
            observation: venta.sale.observation,
            total: venta.sale.total,
            cash: venta.sale.cash,
            customer: venta.sale.customer.name,
            date: venta.sale.data,
            sale_details: venta.sale_detail,
          },
        });
      } else {
        venta.sale_detail.map((o) => {
          info.push({
            id: o.id,
            name: o.membership.name,
            cantidad: o.amount,
            price_s: o.membership.price,
            total: o.total,
          });
        });
        console.log("No we");
        this.setState({
          ...this.state.form,
          tipoModal: "actualizar",
          dataS: info,
          busqueda: "",
          user_id: venta.sale.user.id,
          name_cliente: venta.sale.customer.name,
          pago: venta.sale.cash,
          cambio: venta.sale.cash - venta.sale.total,
          total: venta.sale.total,
          form: {
            id: venta.sale.id,
            name_employee: venta.sale.user.name,
            observation: venta.sale.observation,
            total: venta.sale.total,
            cash: venta.sale.cash,
            customer: venta.sale.customer.name,
            date: venta.sale.data,
            sale_details: venta.sale_detail,
          },
        });
      }
    } else {
      venta.sale_detail.forEach((x) => {
        info.push({
          id: x.id,
          name: x.product.name,
          cantidad: x.amount,
          price_s: x.product.price_s,
          total: x.total,
        });
      });
      this.setState({
        ...this.state.form,
        tipoModal: "actualizar",
        dataS: info,
        busqueda: "",
        user_id: venta.sale.user.id,
        name_cliente: venta.sale.customer.name,
        pago: venta.sale.cash,
        cambio: venta.sale.cash - venta.sale.total,
        total: venta.sale.total,
        form: {
          id: venta.sale.id,
          name_employee: venta.sale.user.name,
          observation: venta.sale.observation,
          total: venta.sale.total,
          cash: venta.sale.cash,
          customer: venta.sale.customer.name,
          date: venta.sale.data,
          sale_details: venta.sale_detail,
        },
      });
    }
    console.log(venta.sale_detail);
    console.log(this.state.cambio);
  };

  buscador = async (e) => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    console.log(this.state.busqueda);
    this.filtrarElementos();
  };

  filtrarElementos = () => {
    var i = 0;
    if (this.state.busqueda != "") {
      var search = this.state.data.filter((item) => {
        if (item.name.includes(this.state.busqueda)) {
          i = 1;
          return item;
        }
      });
      this.setState({ productosBA: search });
      this.setState({ dataP: this.state.productosBA });
    } else {
      this.peticionGetP();
    }
  };

  buscador2 = async (e) => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    console.log(this.state.busqueda);
    this.filtrarElementos2();
  };

  filtrarElementos2 = () => {
    var i = 0;
    if (this.state.busqueda != "") {
      var search = this.state.dataC.filter((item) => {
        if (item.name.includes(this.state.busqueda)) {
          i = 1;
          return item;
        }
      });
      this.setState({ clientesBA: search });
      this.setState({ dataC: this.state.clientesBA });
    } else {
      this.peticionGetC();
    }
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    // let regex = new RegExp("^[a-zA-Z ]+$");
    let regex = new RegExp("[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$");

    if (regex.test(value) || isEmpty(value)) {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    } else {
      e.target.value = ""
      swal({
        text: "Solo se permiten letras y acentos",
        icon: "info",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  handleChangeInputNumber = (e) => {
    const { name, value } = e.target;
    let regex = new RegExp("^[0-9]+$");

    if (regex.test(value) || isEmpty(value)) {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    } else {
      e.target.value = ""
      swal({
        text: "No se permiten letras",
        icon: "info",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  handleChangeInputNumberDecimal = (e) => {
    let val = e.target.value;
    const name = e.target.name;
    if(val.toString().includes('-')){
      swal({
        text: "No se permiten negativos",
        icon: "info",
        button: "Aceptar",
        timer: "5000",
      });
    }else{
      val = val.replace(/([^0-9.]+)/, "");
      val = val.replace(/^(0|\.)/, "");
      const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(val);
      const value = match[1] + match[2];
      e.target.value = value;
      this.setState({
          ...this.state,
          [name]: value,
        },
      );
      if (val.length > 0) {
        e.target.value = Number(value).toFixed(2);
        this.setState({
            ...this.state,
            [name]: Number(value).toFixed(2),
          },
        );
      }
    }
  };


  // limpiarTablaS = () => {
  //   this.setState({
  //     total: 0,
  //     cambio: 0,
  //     pago: 0,
  //     name_cliente: "",
  //     customer_id: "",
  //     form3: { customer_id: "", products: [], cash: 0, observation: "" },
  //   });
  //   this.state.dataS = [];
  //   this.state.cantidades = [];
  // };

  validar = () => {
    if (
      this.state.name_cliente == "" &&
      this.state.cantidades.length == 0 &&
      this.state.pago == 0 &&
      this.state.form == null
    ) {
      return { error: true, msj: "Rellene los campos" };
    }
    if (this.state.cantidades.length == 0) {
      return {
        error: true,
        msj: "Seleccione al menos un articulo para vender",
      };
    }
    if (this.state.name_cliente === "") {
      return { error: true, msj: "Seleccione un cliente" };
    }
    if (
      this.state.form.observation == undefined ||
      this.state.form.observation == ""
    ) {
      return { error: true, msj: "El campo observacion no puede estar vacío" };
    }
    if (this.state.pago == "") {
      return {
        error: true,
        msj: "El campo de dinero en efectivo no puede estar vacio",
      };
    }
    if (this.state.pago < 0) {
      return {
        error: true,
        msj: "No puede ingresar valores negativos",
      };
    }
    if (this.state.cambio < 0) {
      return {
        error: true,
        msj: "No te alcanza",
      };
    }
    return false;
  };

  render() {
    const { form } = this.state;
    const { form2 } = this.state;
    return (
      <div className="table-responsiveMain">
        <br />
        <div className="Busqueda">
          <button
            className="btn btn-success"
            onClick={() => {
              this.setState({
                modalMembresia: true,
                form: null,
                tipoModal: "insertar",
                name_category: "",
                name_provider: "",
              });
              /* this.opcionMembresia(); */
              this.limpiarTablaS();
              this.modalInsertar();
            }}
          >
            Vender Membresía
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              /* Cuando se presione el boton insertar se limpia el objeto form y se cambia el estado de la variable modalInsertar */
              this.setState({
                modalMembresia: false,
                form: null,
                tipoModal: "insertar",
                name_category: "",
                name_provider: "",
              });
              this.limpiarTablaS();
              this.modalInsertar();
            }}
          >
            {/* <i className="bx bxs-user">
              <box-icon
                type="solid"
                name="user"
                color="#fff"
                animation="tada"
              ></box-icon>
            </i> */}
            Vender Producto
          </button>
          <div className="esp"></div>
          <input
            type="text"
            className="textField"
            name="busqueda"
            id="busqueda"
            readOnly
            /* onChange={() => {
              this.buscador();
            }}
            value={this.state.busqueda} */
          />
          {/* <button type="submit" className="add-on" onClick={() => {}}>
            <i className="bx bxs-user">
              <box-icon name="search-alt-2" color="#fff"></box-icon>
            </i>
          </button> */}
        </div>

        <br />
        <div className="table-responsiveV">
          <table className="table table-striped table-bordered ">
            <thead>
              <tr>
                <th>Id de venta</th>
                <th>Empleado que realizó la venta</th>
                <th>Total de la venta</th>
                <th>Dinero recibido</th>
                <th>Fecha de registro</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((ventas) => {
                /* Con esto recorremos todo nuestro arreglo data para rellenar filas */
                return (
                  <tr>
                    <td>{ventas.sale.id}</td>
                    <td>{ventas.sale.user.name}</td>
                    <td>{ventas.sale.total}</td>
                    <td>{ventas.sale.cash}</td>
                    <td>{ventas.sale.date}</td>
                    <td>{ventas.sale.customer.name}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarUsuario(ventas);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {"  "}
                      {localStorage.getItem("rol") == "Administrador" ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.seleccionarUsuario(ventas);
                            this.setState({ modalEliminar: true });
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Modal className="ModalVenta" isOpen={this.state.modalInsertar}>
          {/* Al metodo isOpen se le pasa el valor de modalInsertar */}
          <ModalHeader className="HeadVenta" style={{ display: "block" }}>
            {this.state.modalMembresia ? (
              <h2>Realizar Venta de Membresia</h2>
            ) : (
              <h2>Realizar Venta de Productos</h2>
            )}

            <span style={{ float: "right" }}></span>
          </ModalHeader>

          <ModalBody className="SVentaP">
            <div className="form-groupD">
              {this.state.tipoModal == "insertar" ? (
                <>
                  {this.state.modalMembresia ? (
                    this.state.cantidades.length == 0 ? (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          this.peticionGetP();
                          this.peticionGetM();
                          this.modalProducto();
                        }}
                      >
                        Seleccionar Membresia
                      </button>
                    ) : (
                      <button className="btn btn-success" disabled="true">
                        Seleccionar Membresia
                      </button>
                    )
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        this.peticionGetP();
                        this.peticionGetM();
                        this.modalProducto();
                      }}
                    >
                      Seleccionar Producto
                    </button>
                  )}
                  <br />
                  <br />
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      this.peticionGetC();

                      this.modalCliente();
                    }}
                  >
                    Seleccionar Cliente
                  </button>
                  <br />
                  <label htmlFor="name">Cliente*:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    readOnly
                    onChange={this.handleChange}
                    value={form ? this.state.name_cliente : ""}
                  />
                  <br />
                  <label htmlFor="price_c">Observación*:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="observation"
                    id="observation"
                    maxLength="50"
                    placeholder="Observación de la venta"
                    onChange={this.handleChangeInput}
                    value={form ? form.observation : ""}
                  />
                  <br />
                  <label htmlFor="description">Dinero en efectivo*:</label>
                  <input
                    className="form-control"
                    type="number"
                    name="pago"
                    min="0"
                    pattern="^[0-9]+"
                    id="pago"
                    onChange={this.handleChange3}
                    value={this.state.pago ? this.state.pago : 0}
                  />
                  <br />
                </>
              ) : (
                <>
                  <label htmlFor="id">Id de la venta</label>
                  <input
                    className="form-control"
                    type="text"
                    name="id"
                    id="id"
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.id : ""}
                  />
                  <label htmlFor="name">Cliente:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    readOnly
                    onChange={this.handleChange}
                    value={form ? this.state.name_cliente : ""}
                  />
                  <br />
                  <label htmlFor="price_c">Observacion*:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="observation"
                    id="observation"
                    onChange={this.handleChangeInput}
                    value={form ? form.observation : ""}
                  />
                  <br />
                  <label htmlFor="description">Dinero en efectivo:</label>
                  <input
                    className="form-control"
                    type="number"
                    name="pago"
                    min="0"
                    pattern="^[0-9]+"
                    id="pago"
                    readOnly
                    onChange={this.handleChange3}
                    value={this.state.pago != 0 ? this.state.pago : ""}
                  />
                  <br />
                </>
              )}

              <br />

              <label htmlFor="price_s">Total de venta:</label>
              <input
                className="form-control"
                type="Number"
                name="price_s"
                id="pprice_s"
                readOnly
                onChange={this.total}
                value={this.state.total > 0 ? this.state.total : 0}
              />
              <br />
              <label htmlFor="image">Cambio:</label>
              <input
                className="form-control"
                type="Number"
                name="cambio"
                id="cambio"
                readOnly
                onChange={this.handleChange}
                value={this.state.cambio > 0 ? Number(this.state.cambio).toFixed(2) : 0}
              />
              <br />

              <br />
            </div>
            {/* Tabla Productos Seleccionados */}
            <div className="form-groupT">
              <div className="table-responsiveV">
                <table className="table table-striped table-bordered ">
                  <thead>
                    <tr>
                      {this.state.modalMembresia ? (
                        <>
                          {this.state.tipoModal === "insertar" ? (
                            <>
                              <th>Id</th>
                            </>
                          ) : (
                            <></>
                          )}
                          <th>Nombre</th>
                          <th>Precio</th>

                          {this.state.tipoModal === "insertar" ? (
                            <th>Accion</th>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          {this.state.tipoModal === "insertar" ? (
                            <>
                              <th>Id</th>
                            </>
                          ) : (
                            <></>
                          )}
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th>Total</th>
                          {this.state.tipoModal === "insertar" ? (
                            <th>Accion</th>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataS.map((ProductoS) => {
                      return (
                        <tr>
                          {this.state.tipoModal === "insertar" ? (
                            <>
                              <td>{ProductoS.id}</td>
                            </>
                          ) : (
                            <></>
                          )}

                          <td>{ProductoS.name}</td>

                          {this.state.modalMembresia ? (
                            <>
                              <td>{ProductoS.price}</td>
                              <td>
                                <Button
                                  className="btn-danger"
                                  onClick={() => {
                                    this.eliminar(ProductoS);
                                    this.eliminarCantidad(ProductoS);
                                    this.total();
                                    this.calcularCambio();
                                  }}
                                >
                                  Eliminar
                                </Button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{ProductoS.price_s}</td>
                              {this.state.tipoModal == "actualizar" ? (
                                <>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="Number"
                                      name="cantidad"
                                      id="cantidad"
                                      readOnly
                                      value={ProductoS.cantidad}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="Number"
                                      min="0"
                                      name="total"
                                      id="total"
                                      readOnly
                                      value={ProductoS.total}
                                    />
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="Number"
                                      min="1"
                                      name="cantidad"
                                      id="cantidad"
                                      onChange={async (e) => {
                                        var v = e.target.value;
                                        if (v == "") {
                                          v = 1;
                                        }
                                        await this.setState({
                                          form2: {
                                            ...this.state.form2,
                                            cantidad: v /* e.target.value */,
                                            id: ProductoS.id,
                                            precio: ProductoS.price_s,
                                          },
                                        });
                                        await this.arregloCantidad(
                                          this.state.form2
                                        );
                                        /* console.log(this.state.form2);
                                console.log(this.devolverCantidad(ProductoS)); */
                                        console.log(this.state.cantidades);
                                        this.total();
                                        this.calcularCambio();
                                      }}
                                      value={
                                        form2
                                          ? this.devolverCantidad(ProductoS)
                                          : this.devolverCantidad(ProductoS)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="Number"
                                      min="0"
                                      name="total"
                                      id="total"
                                      readOnly
                                      /* onChange={} */
                                      value={
                                        this.devolverCantidad(ProductoS) *
                                        ProductoS.price_s
                                      }
                                    />
                                  </td>

                                  <td>
                                    <Button
                                      className="btn-danger"
                                      onClick={() => {
                                        this.eliminar(ProductoS);
                                        this.eliminarCantidad(ProductoS);
                                        this.total();
                                        this.calcularCambio();
                                      }}
                                    >
                                      Eliminar
                                    </Button>
                                  </td>
                                </>
                              )}
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="FooterVenta">
            {this.state.tipoModal == "insertar" ? (
              <button
                className="btn btn-success" /*  */
                onClick={async () => {
                  /* console.log(this.state.cantidades); */

                  this.peticionPost();
                  /* if (this.state.cantidades.length > 0) {
                    if (this.state.name_cliente != "") {
                      if (this.state.cambio >= 0) {
                        if (this.state.modalMembresia) {
                          await this.setState({
                            form3: {
                              customer_id: this.state.form.cliente_id,
                              products: this.state.cantidades,
                              cash: parseInt(this.state.pago, 10),
                              is_products: false,
                              observation: this.state.form.observation,
                            },
                          });
                        } else {
                          await this.setState({
                            form3: {
                              customer_id: this.state.form.cliente_id,
                              products: this.state.cantidades,
                              cash: parseInt(this.state.pago, 10),
                              is_products: true,
                              observation: this.state.form.observation,
                            },
                          });
                        }
                       
                        
                        this.peticionPost();
                      } else {
                        swal({
                          text: "No te alcanza",
                          icon: "error",
                          button: "Aceptar",
                          timer: "5000",
                        });
                      }
                    } else {
                      swal({
                        text: "Seleccione un cliente",
                        icon: "error",
                        button: "Aceptar",
                        timer: "5000",
                      });
                    }
                  } else {
                    swal({
                      text: "Seleccione al menos un producto",
                      icon: "error",
                      button: "Aceptar",
                      timer: "5000",
                    });
                  } */
                }}

                /*  console.log(this.state.cantidades) */
                /* () => this.peticionPost() */
              >
                Guardar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </button>
            )}

            <button
              className="btn btn-danger"
              onClick={() => {
                this.modalInsertar();
                this.limpiarTablaS();
              }}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Id:</label>
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : ""}
              />
              <br />
              <label htmlFor="description">Descripcion:</label>
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
                readOnly
                onChange={this.handleChange}
                value={form ? form.observation : ""}
              />
              <br />
              <br />
              ¿Seguro de eliminar la Venta?
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-success"
              onClick={() => this.peticionDelete()}
            >
              Si
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        {/* Aqui va el modal para seleccionar la cliente */}
        <Modal
          className="ModalVClientes"
          isOpen={this.state.modalSeleccionarCliente}
        >
          <ModalHeader style={{ display: "block" }}>
            Seleccione Cliente
            <span style={{ float: "right" }}></span>
          </ModalHeader>
          <ModalBody className="SCliente">
            <div className="form-group">
              <input
                type="text"
                className="textField"
                name="busqueda"
                id="busqueda"
                placeholder="Buscar"
                onChange={this.buscador2}
                value={this.state.busqueda}
              />
              <div className="table-responsiveC">
                <table className="table table-striped table-bordered ">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Membresía Activa</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dataC.map((clientes) => {
                      /* Con esto recorremos todo nuestro arreglo data para rellenar filas */
                      return (
                        <tr>
                          <td>{clientes.id}</td>
                          <td>{clientes.name}</td>
                          <td>{clientes.membershipActivate ? "Sí" : "No"}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                /* this.seleccionarCategoria(categorias); */
                                this.setState({
                                  name_cliente: clientes.name,
                                  cliente_id: clientes.id,
                                  form: {
                                    ...this.state.form,
                                    cliente_id: clientes.id,
                                  },
                                });
                                console.log(clientes.id);
                                this.total();
                                this.modalCliente();
                              }}
                            >
                              Seleccionar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="Cancelar-Cliente">
            <button className="btn btn-danger" onClick={this.modalCliente}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
        {/* Aqui comienza el modal de Productos */}
        <Modal
          className="ModalVProductos"
          isOpen={this.state.modalSeleccionarProducto}
        >
          <ModalHeader style={{ display: "block" }}>
            {this.state.modalMembresia ? (
              <>Seleccione Membresia</>
            ) : (
              <>Seleccione Producto</>
            )}
            <span style={{ float: "right" }}></span>
          </ModalHeader>
          <ModalBody className="SProducto">
            <div className="form-group">
              <input
                type="text"
                className="textField"
                name="busqueda"
                id="busqueda"
                placeholder="Buscar"
                onChange={this.buscador}
                value={this.state.busqueda}
              />
              <div className="table-responsiveP">
                <table className="table table-striped table-bordered ">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>

                      <th>Precio</th>
                      {/* <th>Stock</th> */}

                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.modalMembresia ? (
                      <>
                        {this.state.dataM.map((membresias) => {
                          /* Con esto recorremos todo nuestro arreglo data para rellenar filas */
                          return (
                            <tr>
                              <td>{membresias.id}</td>
                              <td>{membresias.name}</td>
                              <td>{membresias.price}</td>
                              {/* <td>Nose xd </td> */}
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    /* this.setState({
                                name_producto: productos.name,
                                form: {
                                  ...this.state.form,
                                  producto_id: productos.id,
                                },
                              }); */
                                    if (this.buscar(membresias)) {
                                      swal({
                                        text: "Ya está seleccionada",
                                        icon: "error",
                                        button: "Aceptar",
                                        timer: "5000",
                                      });
                                    } else {
                                      this.state.dataS.push(membresias);
                                      console.log(this.state.dataS);
                                      this.state.form2.id = membresias.id;
                                      console.log(membresias.price);
                                      this.state.form2.precio =
                                        membresias.price;

                                      this.modalProducto();
                                      this.nuevaCantidad(membresias);
                                      this.total();
                                      this.calcularCambio();
                                      /* console.log(this.state.form2); */
                                    }
                                    /* console.log(this.state.cantidades); */

                                    /* this.seleccionarUsuario(proveedores); */

                                    /* console.log(this.state.dataS); */
                                  }}
                                >
                                  Seleccionar
                                </button>
                                {"  "}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {this.state.dataP
                          .filter((p) => this.state.dataS.includes(p) !== true)
                          .map((productos) => {
                            /* Con esto recorremos todo nuestro arreglo data para rellenar filas */
                            return (
                              <tr>
                                <td>{productos.id}</td>
                                <td>{productos.name}</td>
                                <td>{productos.price_s}</td>
                                {/* <td>Nose xd </td> */}
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      /* this.setState({
                                name_producto: productos.name,
                                form: {
                                  ...this.state.form,
                                  producto_id: productos.id,
                                },
                              }); */
                                      if (this.buscar(productos)) {
                                        swal({
                                          text: "Ya está seleccionado",
                                          icon: "error",
                                          button: "Aceptar",
                                          timer: "5000",
                                        });
                                      } else {
                                        this.state.dataS.push(productos);
                                        this.state.form2.id = productos.id;
                                        this.state.form2.precio =
                                          productos.price_s;
                                        this.modalProducto();
                                        this.nuevaCantidad(productos);
                                        this.total();
                                        this.calcularCambio();
                                        /* console.log(this.state.form2); */
                                      }
                                      /* console.log(this.state.cantidades); */

                                      /* this.seleccionarUsuario(proveedores); */

                                      /* console.log(this.state.dataS); */
                                    }}
                                  >
                                    Seleccionar
                                  </button>
                                  {"  "}
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="Cancelar-Categoria">
            <button className="btn btn-danger" onClick={this.modalProducto}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TablaV;
