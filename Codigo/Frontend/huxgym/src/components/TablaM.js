import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Crud.css";
import swal from "sweetalert";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { isEmpty } from '../helpers/methods';
const url = "http://35.202.70.210/memberships/memberships/";

class TablaM extends Component {
  state = {
    busqueda: "",
    data: [] /* Aqui se almacena toda la informacion axios */,
    modalInsertar: false /* Esta es el estado para abrir y cerrar la ventana modal */,
    modalEliminar: false,
    membresias: [],
    errors: {},
    form: {
      /* Aqui guardaremos los datos que el usuario introduce en el formulario */
      id: "",
      name: "",
      price: "",
      description: "",
      day: 0,
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
    console.log(this.state.form);
  };

  peticionGet = async () => {
    try {
      const res = await axios.get(url, {
        headers: {},
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

  validar = () => {
    const { form } = this.state;
    if (isEmpty(form)) 
      return { error: true, msj: "Rellene los campos obligatorios" };
    const name = form.name;
    const price = form.price;
    const description = form.description;
    const day = form.day;

    if (isEmpty(name)) {
      return { error: true, msj: "El campo nombre no puede estar vacío" };
    }
    if(isEmpty(price))
      return {
        error: true,
        msj: "El campo precio no puede estar vacío",
      };
    if (price <= 0) {
      return {
        error: true,
        msj: "El campo precio no puede ser menor o igual a cero",
      };
    }
    if (isEmpty(description)) {
      return { error: true, msj: "El campo descripción no puede estar vacío" };
    }
    if(isEmpty(day))
    return {
      error: true,
      msj: "El campo cantidad de días no puede ser menor o igual a cero",
    };
    if (day <= 6) {
      return {
        error: true,
        msj: "La duración de días no puede ser menor a 7 días",
      };
    }
    return { error: false };
  };

  peticionPost = async () => {
    try {
      // Validaciones
      const validate = this.validar();
      if (validate.error) {
        swal({
          text: validate.msj,
          icon: "info",
          button: "Aceptar",
          timer: "5000",
        });
      } else {
        delete this.state.form.id;
        this.state.form.price = parseFloat(this.state.form.price)
        const res = await axios.post(url, this.state.form, {
          headers: {},
        });

        if (res.status === 200 || res.status === 201) {
          this.modalInsertar();
          this.peticionGet();
          swal({
            text: "Membresia agregada satisfactoriamente",
            icon: "success",
            button: "Aceptar",
            timer: "5000",
          });
        }
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

  peticionPut = async () => {
    /* con put enviamos informacion al endpoint para modificar*/
    try {
      
      const validate = this.validar();
      if (validate.error) {
        swal({
          text: validate.msj,
          icon: "info",
          button: "Aceptar",
          timer: "5000",
        });
      } else {
        this.state.form.price = parseFloat(this.state.form.price)
        const res = await axios.put(
          url + this.state.form.id + "/",
          this.state.form,
          {
            headers: {},
          }
        );
        if (res.status === 200 || res.status === 201) {
          this.modalInsertar(); /* Cambiamos el estado de modalInsertar y solicitamos de nuevo los datos */
          this.peticionGet();
          swal({
            text: "Membresia actualizada correctamente",
            icon: "success",
            button: "Aceptar",
            timer: "5000",
          });
        }
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
      const res = await axios.delete(url + this.state.form.id + "/", {
        headers: {},
      });
      if (res.status === 200 || res.status === 201) {
        this.setState({
          modalEliminar: false,
        });
        this.peticionGet();
        swal({
          text: "Membresia eliminada correctamente",
          icon: "success",
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

  componentDidMount() {
    /* Este metodo se ejecuta inmediatamente despues del renderizado */
    this.peticionGet();
  }

  modalInsertar = () => {
    /* Con este metodo cambiamos el estado de la variable modal insertar */
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarUsuario = (membresias) => {
    /* Para obtener los datos del usuario a eliminar */
    this.setState({
      tipoModal: "actualizar",
      busqueda: "",
      form: {
        id: membresias.id,
        name: membresias.name,
        description: membresias.description,
        price: membresias.price,
        day: membresias.day,
      },
    });
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
        if (item.name.toLowerCase().includes(this.state.busqueda.toLowerCase())) {
          i = 1;
          return item;
        }
      });
      this.setState({ membresias: search });
      this.setState({ data: this.state.membresias });
    } else {
      this.peticionGet();
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

    if (regex.test(value)) {
      console.log(name, value);
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    } else {
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
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
      if (val.length > 0) {
        e.target.value = Number(value).toFixed(2);
        this.setState({
          form: {
            ...this.state.form,
            [name]: Number(value).toFixed(2),
          },
        });
      }
    }
  };

  render() {
    const { form } = this.state;
    return (
      <div className="table-responsiveMain">
        <br />
        <div className="Busqueda">
          <button
            className="btn btn-success"
            onClick={() => {
              /* Cuando se presione el boton insertar se limpia el objeto form y se cambia el estado de la variable modalInsertar */
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }}
          >
            <i className="bx bxs-user">
              <box-icon
                type="solid"
                name="user"
                color="#fff"
                animation="tada"
              ></box-icon>
            </i>
            Registrar nueva membresía
          </button>
          <div className="esp"></div>
          <input
            type="text"
            className="textField"
            name="busqueda"
            id="busqueda"
            placeholder="Buscar"
            onChange={this.buscador}
            value={this.state.busqueda}
          />
          <button type="submit" className="add-on" onClick={() => {}}>
            <i className="bx bxs-user">
              <box-icon name="search-alt-2" color="#fff"></box-icon>
            </i>
          </button>
        </div>
        <br></br>
        <br></br>
        <br />
        <div className="table-responsive">
          <table className="table table-striped table-bordered ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre del membresía</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Duración (Días)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((membresias) => {
                /* Con esto recorremos todo nuestro arreglo data para rellenar filas */
                return (
                  <tr>
                    <td>{membresias.id}</td>
                    <td>{membresias.name}</td>
                    <td>{membresias.description}</td>
                    <td>{"$ " + membresias.price}</td>
                    <td>{membresias.day}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarUsuario(membresias);
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
                            this.seleccionarUsuario(membresias);
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
        <Modal isOpen={this.state.modalInsertar}>
          {/* Al metodo isOpen se le pasa el valor de modalInsertar */}
          <ModalHeader style={{ display: "block" }}>
            Membresía
            <span style={{ float: "right" }}></span>
          </ModalHeader>

          <ModalBody>
            <div className="form-group">
              {this.state.tipoModal == "insertar" ? (
                <></>
              ) : (
                <>
                  <label htmlFor="id">Id</label>
                  <input
                    className="form-control"
                    type="text"
                    name="id"
                    id="id"
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.id : this.state.data.length + 1}
                  />
                </>
              )}
              <label htmlFor="name">Nombre de la membresía (*):</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Nombre de la membresía"
                maxLength="50"
                onChange={this.handleChangeInput}
                value={form ? form.name : ""}
              />
              <br />
              <br />
              <label htmlFor="description">Descripción (*):</label>
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
                placeholder="Descripción"
                maxLength="100"
                onChange={this.handleChangeInput}
                value={form ? form.description : ""}
              />
              <br />
              <br />
              <label htmlFor="price">Precio (*):</label>
              <input
                className="form-control"
                type="number"
                name="price"
                id="price"
                min="0"
                placeholder="Precio de venta"
                onChange={this.handleChangeInputNumberDecimal}
                value={form ? form.price : 1}
              />
              <br />
              <br />
              <label htmlFor="price">Duración (cantidad de días) (*):</label>
              <input
                className="form-control"
                type="number"
                name="day"
                id="day"
                min="7"
                placeholder="Duración en días"
                onChange={this.handleChangeInputNumber}
                value={form ? form.day : 0}
              />
              <br />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal == "insertar" ? (
              <button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Agregar
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
              }}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Nombre de la membresía:</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                readOnly
                onChange={this.handleChange}
                value={form ? form.name : ""}
              />
              <br />
              <label htmlFor="description">Descripción:</label>
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
                readOnly
                onChange={this.handleChange}
                value={form ? form.description : ""}
              />
              <br />
              <label htmlFor="price">Precio:</label>
              <input
                className="form-control"
                type="text"
                name="price"
                id="price"
                readOnly
                onChange={this.handleChange}
                value={form ? form.price : ""}
              />
              <br />
              ¿Seguro de eliminar esta membresía?
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-success"
              onClick={() => this.peticionDelete()}
            >
              Sí
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TablaM;
