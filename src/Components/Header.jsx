import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import BotonInicioSesion from "./home/BotonInicioSesion";
import DatosUsuarioContextProvider from "../Context/DatosUsuarioContext";
import { useContext } from "react";
import AvatarUsuario from "./AvatarUsuario";
import { Link } from "react-router-dom";

const Header = () => {
  useContext(DatosUsuarioContextProvider);
  var estaLogeado = sessionStorage.getItem("estaLogeado");

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex", xl: "flex" },
              justifyContent: "center",
            }}
          />
          <Link to="/">
            <img
              src="https://cdn.discordapp.com/attachments/956988369693454466/989600731369709669/Logoblanco.png"
              style={{ height: "4rem", padding: "0.5rem" }}
              alt="Logo"
            ></img>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {estaLogeado === "true" ? <AvatarUsuario /> : <BotonInicioSesion />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
