import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button, Divider, Chip } from "@mui/material";
import Header from "../Header";
import DatosUsuarioContextProvider from "../../Context/DatosUsuarioContext";
import { getPostulanteById } from "../../services/postulantes_service";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const formatDate = (date) => {
  const birthDate = new Date(date);
  const day = birthDate.getDate() + 1;
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  return `${day}/${month}/${year}`;
};

const DividerText = () => {
  const { cambiarDatosUsuario } = useContext(DatosUsuarioContextProvider);
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const idUsuario = sessionStorage.getItem("idUsuario");
      const response = await getPostulanteById(idUsuario);
      setDatosUsuario(response);
      cambiarDatosUsuario(response);
    }
    fetchData();
  }, [cambiarDatosUsuario]);

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
                {datosUsuario?.nombre} {datosUsuario?.apellido}
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
                {formatDate(datosUsuario?.fecha_nac)}
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
                {datosUsuario?.Usuario.usuario}
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
                +54 9 {datosUsuario?.telefono}
              </Typography>
            </Box>
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="UBICACIÓN"
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
                {datosUsuario?.pais}
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
                {datosUsuario?.Provincia.nombre}
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
                {datosUsuario?.Ciudad.nombre}
              </Typography>
            </Box>
          </Box>
        </Root>
      </Box>
    </>
  );
};

export default DividerText;
