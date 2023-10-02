import { styled } from "@mui/material/styles";
import Header from "../Header";
import { Box, Typography, Button, Chip, Divider } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DatosUsuarioContextProvider from "../../Context/DatosUsuarioContext";
import { getEmpresaByIdUsuario } from "../../services/empresas_service";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

function InfoItem({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "2rem",
      }}
    >
      <Typography
        sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
        variant="body1"
      >
        {label}:
      </Typography>
      <Typography
        sx={{ fontSize: "20px", paddingLeft: "0.5rem" }}
        variant="body1"
      >
        {value}
      </Typography>
    </Box>
  );
}

export default function EmpresaInfo() {
  const { cambiarDatosUsuario } = useContext(DatosUsuarioContextProvider);
  const [llamado, setLlamado] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState({
    nombre_empresa: "",
    descripcion: "",
    email_representante: "",
    telefono: "",
    web: "",
    pais: "",
    Provincia: { nombre: "" },
    Ciudad: { nombre: "" },
  });

  useEffect(() => {
    const idUsuario = sessionStorage.getItem("idUsuario");

    async function actualizarDatos() {
      if (!llamado) {
        const data = await getEmpresaByIdUsuario(idUsuario);
        setDatosUsuario(data);
        cambiarDatosUsuario(data);
        setLlamado(true);
      }
    }

    actualizarDatos();
  }, [llamado, cambiarDatosUsuario]);

  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Link to="/edicionEmpresa" style={{ textDecoration: "none" }}>
          <Button variant="contained">Editar</Button>
        </Link>
      </Box>
      <Box style={{ margin: "2rem" }}>
        <Root>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="SOBRE LA EMPRESA"
            />
          </Divider>
          <Box>
            <InfoItem label="Nombre" value={datosUsuario.nombre_empresa} />
            <InfoItem label="Descripción" value={datosUsuario.descripcion} />
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="CONTACTO"
            />
          </Divider>
          <Box>
            <InfoItem
              label="Email del representante"
              value={datosUsuario.email_representante}
            />
            <InfoItem
              label="Número de contacto"
              value={`+54 9 ${datosUsuario.telefono}`}
            />
            <InfoItem label="Página web" value={datosUsuario.web} />
          </Box>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="UBICACIÓN"
            />
          </Divider>
          <Box>
            <InfoItem label="País" value={datosUsuario.pais} />
            <InfoItem label="Provincia" value={datosUsuario.Provincia.nombre} />
            <InfoItem label="Ciudad" value={datosUsuario.Ciudad.nombre} />
          </Box>
        </Root>
      </Box>
    </>
  );
}
