import { styled } from "@mui/material/styles";
import Header from "../Header";
import { Box, Typography, Divider, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEmpresaByCuit } from "../../services/empresas_service";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const InfoItem = ({ label, value }) => (
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

export default function EmpresaInfo() {
  const { id } = useParams();
  const [empresaInfo, setEmpresaInfo] = useState({
    nombreEmpresa: "",
    descripcionEmpresa: "",
    emailRepresentanteEmpresa: "",
    numContactoEmpresa: "",
    webEmpresa: "",
    paisEmpresa: "",
    provinciaEmpresa: "",
    ciudadEmpresa: "",
  });

  useEffect(() => {
    getEmpresaByCuit(id).then((res) => {
      setEmpresaInfo({
        nombreEmpresa: res.nombre_empresa,
        descripcionEmpresa: res.descripcion,
        emailRepresentanteEmpresa: res.email_representante,
        numContactoEmpresa: res.telefono,
        webEmpresa: res.web,
        paisEmpresa: res.pais,
        provinciaEmpresa: res.Provincia.nombre,
        ciudadEmpresa: res.Ciudad.nombre,
      });
    });
  }, [id]);

  return (
    <>
      <Header />
      <Box style={{ margin: "2rem" }}>
        <Root>
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="SOBRE LA EMPRESA"
            />
          </Divider>
          <InfoItem label="Nombre" value={empresaInfo.nombreEmpresa} />
          <InfoItem
            label="Descripción"
            value={empresaInfo.descripcionEmpresa}
          />
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="CONTACTO"
            />
          </Divider>
          <InfoItem
            label="Email del representante"
            value={empresaInfo.emailRepresentanteEmpresa}
          />
          <InfoItem
            label="Número de contacto"
            value={`+54 9 ${empresaInfo.numContactoEmpresa}`}
          />
          <InfoItem label="Página web" value={empresaInfo.webEmpresa} />
          <Divider>
            <Chip
              sx={{ backgroundColor: "#009688", color: "#ffffff" }}
              label="UBICACIÓN"
            />
          </Divider>
          <InfoItem label="País" value={empresaInfo.paisEmpresa} />
          <InfoItem label="Provincia" value={empresaInfo.provinciaEmpresa} />
          <InfoItem label="Ciudad" value={empresaInfo.ciudadEmpresa} />
        </Root>
      </Box>
    </>
  );
}
