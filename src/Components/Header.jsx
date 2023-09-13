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

{
  /*
  import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Link,
  Paper,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const Buscador = () => {
    const [buscador, setBuscador] = useState("");

    const handleChange = (e) => {
      setBuscador(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(buscador);
    };

    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "50px",
          borderRadius: "5px",
        }}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            fontSize: "1rem",
          }}
          placeholder="Buscar empleo..."
          value={buscador}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px", color: "#009688" }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              padding: "10px",
            }}
          >
            <Grid
              container
              item
              xs={3}
              justifyContent="flex-start"
              alignItems="center"
              alignContent="center"
            >
              <Link to="/">
                <img
                  src="https://cdn.discordapp.com/attachments/956988369693454466/989600731369709669/Logoblanco.png"
                  alt="logo"
                  style={{
                    height: "4rem",
                    width: "auto",
                    padding: "5px",
                    marginTop: "5px",
                    alignContent: "center",
                  }}
                />
              </Link>
            </Grid>
            <Grid
              container
              item
              xs={6}
              justifyContent="center"
              alignItems="center"
            >
              <Buscador />
            </Grid>
            <Grid
              container
              item
              xs={3}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                variant="outlined"
                color="inherit"
                href="/"
                size="small"
                sx={{
                  borderRadius: "5px",
                  padding: "8px",
                }}
              >
                Iniciar sesión
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
  );
};

export default Header;

  */
}
