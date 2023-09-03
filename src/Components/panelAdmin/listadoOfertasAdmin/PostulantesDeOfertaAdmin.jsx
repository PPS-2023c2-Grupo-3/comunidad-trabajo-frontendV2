import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "../../Header";
import NotFound from "../../NotFound";
import ListaPostulantesDeOfertaAdmin from "./ListaPostulantesDeOfertaAdmin";
import { config } from "../../../config/config";

export default function PostulantesDeOfertaAdmin() {
  const { id } = useParams();
  const grupo = sessionStorage.getItem("grupo");
  const [llamado, setLlamado] = useState(false);
  const [postulantes, setPostulantes] = useState([]);
  const [ofertaActual, setOfertaActual] = useState(null);

  const API_URL = `${config.apiUrl}/postulacionesId/oferta/?pagina=0&limite=10&id=${id}`;
  const API_OFERTA = `${config.apiUrl}/ofertas/idOferta/${id}`;

  useEffect(() => {
    const primerLlamado = async () => {
      if (!llamado) {
        try {
          const response = await fetch(API_URL);
          const datos = await response.json();
          setLlamado(true);
          setPostulantes(datos.postulaciones.rows);
          console.log(datos.postulaciones.rows);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const traerIdEmpresa = async () => {
      try {
        const response = await fetch(API_OFERTA);
        const datos = await response.json();
        setOfertaActual(datos);
      } catch (error) {
        console.log(error);
      }
    };

    primerLlamado();
    traerIdEmpresa();
  }, [API_URL, API_OFERTA, llamado]);

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
