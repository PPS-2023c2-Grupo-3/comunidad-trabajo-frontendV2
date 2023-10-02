import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "../Header";
import { Box, Typography, Chip, Divider } from "@mui/material";
import { getPostulanteByDni } from "../../services/postulantes_service";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const DividerText = () => {
  const { id } = useParams();
  const [postulanteInfo, setPostulanteInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getPostulanteByDni(id);
      setPostulanteInfo(response);
    }
    fetchData();
  }, [id]);

  const formatDate = (fecha) => {
    const fechaNacimiento = new Date(fecha);
    const dia = fechaNacimiento.getDate() + 1;
    const mes = fechaNacimiento.getMonth() + 1;
    const anio = fechaNacimiento.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

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
                Nombre:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {postulanteInfo?.nombre} {postulanteInfo?.apellido}
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
                {formatDate(postulanteInfo?.fecha_nac)}
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
                Email:
              </Typography>
              <Typography
                sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
                variant="body1"
              >
                {postulanteInfo?.Usuario.usuario}
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
                +54 9 {postulanteInfo?.telefono}
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
                {postulanteInfo?.pais}
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
                {postulanteInfo?.Provincia.nombre}
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
                {postulanteInfo?.Ciudad.nombre}
              </Typography>
            </Box>
          </Box>
        </Root>
      </Box>
    </>
  );
};

export default DividerText;
