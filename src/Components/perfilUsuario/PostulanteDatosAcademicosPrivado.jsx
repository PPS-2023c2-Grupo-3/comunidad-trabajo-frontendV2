import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Chip, Divider } from "@mui/material";
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

export default function DividerText() {
  const { cambiarDatosUsuario } = useContext(DatosUsuarioContextProvider);
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const idUsuario = sessionStorage.getItem("idUsuario");
      const datos = await getPostulanteById(idUsuario);
      setDatosUsuario(datos);
      cambiarDatosUsuario(datos);
    }
    fetchData();
  }, [cambiarDatosUsuario]);

  return (
    <>
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
                {datosUsuario?.Carrera.nombre_carrera}
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
                Nivel académico:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario?.Estudios.nombre_estudio} -{" "}
                {datosUsuario?.Estudios.estado_estudio}
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
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {datosUsuario?.alumno_unahur ? "Si" : "No"}
              </Typography>
            </Box>
          </Box>
        </Root>
      </Box>
    </>
  );
}
