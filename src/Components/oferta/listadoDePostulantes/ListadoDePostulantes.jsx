import { Fragment, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../Header";
import ListaPostulantes from "./ListaPostulantes";
import { useParams } from "react-router-dom";
import NotFound from "../../NotFound";
import { getOfertaById } from "../../../services/ofertas_service";
import { getPostulacionesPorIdOferta } from "../../../services/postulacionesId_service";

const ListadoPostulantes = () => {
  const { id } = useParams();
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const grupo = sessionStorage.getItem("grupo");

  const [llamado, setLlamado] = useState(false);
  const [postulantes, setPostulantes] = useState([]);
  const [ofertaActual, setOfertaActual] = useState([]);
  const [idEmpresa, setIdEmpresa] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!llamado) {
        try {
          const api = await getPostulacionesPorIdOferta(0, 10, id);
          setLlamado(true);
          setPostulantes(api.postulaciones.rows);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        const api = await getOfertaById(id);
        setOfertaActual(api);
        setIdEmpresa(api.fk_id_empresa);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [llamado]);

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
