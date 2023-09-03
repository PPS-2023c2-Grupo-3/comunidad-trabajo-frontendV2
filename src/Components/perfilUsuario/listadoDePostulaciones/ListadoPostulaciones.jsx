import React, { Fragment, useState, useEffect } from "react";
import { Box } from "@mui/system";
import Header from "../../Header";
import { Typography } from "@mui/material";
import BarraBusquedaOfertas from "./BarraBusquedaOfertas";
import ListaOfertas from "./ListaPostulaciones";
import { config } from "../../../config/config";

const ListadoOfertas = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const [llamado, setLlamado] = useState(false);
  const [ofertas, setOfertas] = useState([]);

  const API_URL = `${config.apiUrl}/postulacionesId/postulante/?pagina=0&limite=10&id=${datosUsuario.id}`;

  useEffect(() => {
    const primerLlamado = async () => {
      if (llamado === false) {
        try {
          const api = await fetch(API_URL);
          const datos = await api.json();
          setLlamado(true);
          setOfertas(datos.postulaciones.rows);
          console.log(datos.postulaciones.rows);
        } catch (error) {
          console.log(error);
        }
      }
    };

    primerLlamado();
  }, [llamado, API_URL]);

  return (
    <Fragment>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", margin: "1rem" }}>
          Mis postulaciones
        </Typography>
        <BarraBusquedaOfertas />
      </Box>
      <ListaOfertas ofertas={ofertas} />
    </Fragment>
  );
};

export default ListadoOfertas;
