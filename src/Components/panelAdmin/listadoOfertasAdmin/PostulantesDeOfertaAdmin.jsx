import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "../../Header";
import NotFound from "../../NotFound";
import ListaPostulantesDeOfertaAdmin from "./ListaPostulantesDeOfertaAdmin";
import { getPostulacionesPorIdOferta } from "../../../services/postulacionesId_service";
import { getOfertaById } from "../../../services/ofertas_service";

export default function PostulantesDeOfertaAdmin() {
  const { id } = useParams();
  const grupo = sessionStorage.getItem("grupo");
  const [postulantes, setPostulantes] = useState([]);
  const [ofertaActual, setOfertaActual] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePostulantes = await getPostulacionesPorIdOferta(
          0,
          10,
          id
        );
        const responseOferta = await getOfertaById(id);

        setPostulantes(responsePostulantes.postulaciones.rows);
        setOfertaActual(responseOferta);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      <Box>
        {grupo === "3" ? (
          <Box>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
              }}
            >
              Postulantes a {ofertaActual?.titulo_oferta}
            </Typography>
            <ListaPostulantesDeOfertaAdmin postulantes={postulantes} />
          </Box>
        ) : (
          <NotFound />
        )}
      </Box>
    </>
  );
}
