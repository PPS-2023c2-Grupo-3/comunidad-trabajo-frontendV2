import DatosUsuarioContextProvider from "../Context/DatosUsuarioContext";
import { Avatar, MenuItem, Menu } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

const AvatarUsuario = () => {
  const {
    cambiarDatosUsuario,
    cambiarToken,
    cambiarIdUsuario,
    cambiarEstadoLogeado,
    cambiarGrupo,
  } = useContext(DatosUsuarioContextProvider);
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var grupo = sessionStorage.getItem("grupo");

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(nombre) {
    if (grupo === "2" || grupo === "1") {
      return {
        sx: {
          bgcolor: stringToColor(nombre),
        },

        children: `${nombre.split(" ")[0][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: stringToColor(nombre),
        },

        children: `${nombre.split(" ")[0][0]}${nombre.split(" ")[1][0]}`,
      };
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cerrarSesion = () => {
    cambiarToken("");
    cambiarEstadoLogeado(false);
    setAnchorEl(null);
    cambiarDatosUsuario([]);
    cambiarIdUsuario(0);
    cambiarGrupo(0);
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <Fragment>
      {grupo === "3" ? (
        <Avatar
          onClick={handleClick}
          src="https://cdn.discordapp.com/attachments/955646153297395722/1046571441262432257/hurlingham.png"
          className="fotoPerfil"
        />
      ) : grupo === "2" ? (
        datosUsuario.logo === null ? (
          <Avatar
            onClick={handleClick}
            {...stringAvatar(`${datosUsuario.nombre} ${datosUsuario.apellido}`)}
            className="fotoPerfil"
          />
        ) : (
          <Avatar
            onClick={handleClick}
            src={ datosUsuario.logo }
            className="fotoPerfil"
          />
        )
      ) : grupo === "1" ? (
        datosUsuario.foto === null ? (
          <Avatar
            onClick={handleClick}
            {...stringAvatar(`${datosUsuario.nombre} ${datosUsuario.apellido}`)}
            className="fotoPerfil"
          />
        ) : (
          <Avatar
            onClick={handleClick}
            src={ datosUsuario.foto }
            className="fotoPerfil"
          />
        )
      ) : (
        <Avatar
          onClick={handleClick}
          {...stringAvatar(`${datosUsuario.nombre} ${datosUsuario.apellido}`)}
          className="fotoPerfil"
        />
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {grupo === "1" ? (
          <Link
            to="/miPerfil"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>Perfil</MenuItem>
          </Link>
        ) : null}
        {grupo === "2" ? (
          <Link
            to="/perfilEmpresa"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>Perfil Empresa</MenuItem>
          </Link>
        ) : null}
        {grupo === "3" ? (
          <Link to="/admin" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            <MenuItem>Panel Administrador</MenuItem>
          </Link>
        ) : null}
        <MenuItem onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default AvatarUsuario;
