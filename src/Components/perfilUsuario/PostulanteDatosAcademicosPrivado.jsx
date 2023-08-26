import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Header from "../Header";
import { Box, Typography } from "@mui/material";

import DatosUsuarioContextProvider from "../../Context/DatosUsuarioContext";
import { useContext } from "react";
import { config } from "../../config/config";
import axios from "axios";

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

  React.useEffect(() => {
    axios
      .get(`${config.apiUrl}/postulantes/idUsuario/${datosUsuario.Usuario.id}`)
      .then(({ data }) => {
        cambiarDatosUsuario(data);
      });
  }, [cambiarDatosUsuario, datosUsuario.Usuario.id]);

  return (
    <React.Fragment>
      <Header />
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
                Carrera:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario.Carrera.nombre_carrera}
              </Typography>
            </Box>
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="ESTADO"
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
                Nivel academico:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario.Estudios.nombre_estudio} -{" "}
                {datosUsuario.Estudios.estado_estudio}
              </Typography>
            </Box>
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="¿ES ALUMNO UNAHUR?"
            />
          </Divider>
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
            >
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              ></Typography>
              {datosUsuario.alumno_unahur ? (
                <Typography
                  sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                  variant="body1"
                >
                  Si
                </Typography>
              ) : (
                <Typography
                  sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                  variant="body1"
                >
                  No
                </Typography>
              )}
            </Box>
          </Box>
        </Root>
      </Box>
    </React.Fragment>
  );
}
