import { Fragment, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../Header";
import ListaPostulantes from "./ListaPostulantes";
import { useParams } from "react-router-dom";
import NotFound from "../../NotFound";
import { config } from "../../../config/config";

const ListadoPostulantes = () => {
  const { id } = useParams();
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const grupo = sessionStorage.getItem("grupo");

  const [llamado, setLlamado] = useState(false);
  const [postulantes, setPostulantes] = useState([]);
  const [ofertaActual, setOfertaActual] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState("");

  const API_URL = `${config.apiUrl}/postulacionesId/oferta/?pagina=0&limite=10&id=${id}`;
  const API_OFERTA = `${config.apiUrl}/ofertas/idOferta/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      if (!llamado) {
        try {
          const api = await fetch(API_URL);
          const datos = await api.json();
          setLlamado(true);
          setPostulantes(datos.postulaciones.rows);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        const api = await fetch(API_OFERTA);
        const datos = await api.json();
        setOfertaActual(datos);
        setIdEmpresa(datos.fk_id_empresa);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [API_URL, API_OFERTA, llamado]);

  return (
    <Fragment>
      {grupo === "2" && datosUsuario.id === idEmpresa ? (
        <Box>
          <Header />
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
            }}
          >
            Postulantes a {ofertaActual.titulo_oferta}
          </Typography>
          <ListaPostulantes postulantes={postulantes} />
        </Box>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default ListadoPostulantes;
