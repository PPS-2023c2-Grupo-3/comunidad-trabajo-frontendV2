import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Header from "../Header";
import { Box, Typography, Button } from "@mui/material";
import DatosUsuarioContextProvider from "../../Context/DatosUsuarioContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../config/config";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  const { cambiarDatosUsuario } = useContext(DatosUsuarioContextProvider);
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));

  async function traerDatos() {
    await axios
      .get(`${config.apiUrl}/postulantes/idUsuario/${datosUsuario.Usuario.id}?`)
      .then(({ data }) => {
        cambiarDatosUsuario(data);
      });
  }
  traerDatos();
  const formatoFechaNacimiento = (fecha) => {
    var fechaNacimiento = new Date(fecha);
    var dia = fechaNacimiento.getDate() + 1;
    var mes = fechaNacimiento.getMonth() + 1;
    var anio = fechaNacimiento.getFullYear();
    return dia + "/" + mes + "/" + anio;
  };
  return (
    <React.Fragment>
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Link to="/miPerfil/misDatos/editar" style={{ textDecoration: "none" }}>
          <Button variant="contained">Editar</Button>
        </Link>
      </Box>
      <Typography style={{ margin: "2rem" }}>
        <Root>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="SOBRE EL POSTULANTE"
            />
          </Divider>
          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
            >
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                Nombre:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario.nombre} {datosUsuario.apellido}
              </Typography>
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
            >
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                Fecha de nacimiento:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {formatoFechaNacimiento(datosUsuario.fecha_nac)}
              </Typography>
            </Typography>
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="CONTACTO"
            />
          </Divider>
          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
            >
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                email:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario.Usuario.usuario}
              </Typography>
            </Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                Número de contacto:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {" "}
                +54 9 {datosUsuario.telefono}
              </Typography>
            </Typography>
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="UBICACION"
            />
          </Divider>
          <Box>
            <Typography
              sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
            >
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                País:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario.pais}
              </Typography>
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
            >
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                Provincia:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario.Provincia.nombre}
              </Typography>
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
            >
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                Ciudad:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario.Ciudad.nombre}
              </Typography>
            </Typography>
          </Box>
        </Root>
      </Typography>
    </React.Fragment>
  );
}
