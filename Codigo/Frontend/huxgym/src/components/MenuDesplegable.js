import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BtnLogout from "./BtnLogout";
import VerEditarPerfil from "./VerEditarPerfil";
import CambiarContra from "./CambiarContra";
import '../styles/menu.css'

export default function MenuDesplegable() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
      <Button onClick={handleClick}>
        <box-icon
          size="lg"
          className="iconop"
          type="solid"
          name="info-circle"
          color="#fff"
          /* animation="tada" */
        ></box-icon>
      </Button>
      <div className="dise">
      <Menu className="disa"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <VerEditarPerfil accion="Ver perfil" tipo="ver" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <VerEditarPerfil accion="Editar perfil" tipo="editar" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <CambiarContra />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <BtnLogout />
        </MenuItem>
      </Menu>
      </div>
    </div>
  );
}
