import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import swal from "sweetalert";

const url = "http://35.202.70.210/user/attendance/checkin/";
const url_checkout = "http://35.202.70.210/user/attendance/checkout/";

class Checkin extends Component {
  peticionPost = async () => {
    try {
      var config = {
        method: "post",
        url,
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      };
      const res = await axios(config);
      if (res.status === 200 || res.status === 201) {
        const { check_in } = res.data;
        swal({
          text: "Checkin correcto a las " + check_in,
          icon: "success",
          button: "Aceptar",
          timer: "3000",
        });
      }
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
      swal({
        text: msj,
        icon: "info",
        button: "Aceptar",
        timer: "3000",
      });
    }
  };

  peticionCheckOut = async () => {
    try {
      var config = {
        method: "post",
        url: url_checkout,
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      };
      const res = await axios(config);
      if (res.status === 200 || res.status === 201) {
        const { check_out } = res.data;
        swal({
          text: "Checkout realizado a las " + check_out,
          icon: "success",
          button: "Aceptar",
          timer: "3000",
        });
      }
    } catch (error) {
      const msj = JSON.parse(error.request.response).message;
      console.log(msj);
      swal({
        text: msj,
        icon: "info",
        button: "Aceptar",
        timer: "3000",
      });
    }
  };

  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }
  
  render() {
    return (
      <div className="check">
        <p>Realiza tu hora de entrada:</p>
        <p>
          La hora actual es:{" "}
          <label>{this.state.date.toLocaleTimeString()} </label>
        </p>
        <button
          variant="success"
          className="btn btn-success"
          onClick={() => this.peticionPost()}
        >
          Realizar
        </button>
        <p>
          Realiza tu hora de salida: <br />
          <br />
          La hora actual es:{" "}
          <label>{this.state.date.toLocaleTimeString()} </label>
        </p>
        <Button variant="danger" onClick={() => this.peticionCheckOut()}>
          Realizar
        </Button>{" "}
      </div>
    );
  }
}

export default Checkin;
