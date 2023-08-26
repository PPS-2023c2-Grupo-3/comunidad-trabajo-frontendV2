import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Header from "../Header";
import { Box, Typography, Button } from "@mui/material";
import DatosUsuarioContextProvider from "../../Context/DatosUsuarioContext";
import { config } from "../../config/config";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const DividerText = () => {
  const { cambiarDatosUsuario } = useContext(DatosUsuarioContextProvider);
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));

  useEffect(() => {
    async function traerDatos() {
      try {
        const response = await axios.get(
          `${config.apiUrl}/postulantes/idUsuario/${datosUsuario.Usuario.id}`
        );
        cambiarDatosUsuario(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    traerDatos();
  }, [cambiarDatosUsuario, datosUsuario.Usuario.id]);

  const formatoFechaNacimiento = (fecha) => {
    const fechaNacimiento = new Date(fecha);
    const dia = fechaNacimiento.getDate() + 1;
    const mes = fechaNacimiento.getMonth() + 1;
    const anio = fechaNacimiento.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <Link to="/miPerfil/misDatos/editar" style={{ textDecoration: "none" }}>
          <Button variant="contained">Editar</Button>
        </Link>
      </Box>
      <Box style={{ margin: "2rem" }}>
        <Root>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="SOBRE EL POSTULANTE"
            />
          </Divider>
          <Box>
            <Box
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
            </Box>
            <Box
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
            </Box>
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="CONTACTO"
            />
          </Divider>
          <Box>
            <Box
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
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                +54 9 {datosUsuario.telefono}
              </Typography>
            </Box>
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="UBICACION"
            />
          </Divider>
          <Box>
            <Box
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
            </Box>
            <Box
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
            </Box>
            <Box
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
            </Box>
          </Box>
        </Root>
      </Box>
    </>
  );
};

export default DividerText;
