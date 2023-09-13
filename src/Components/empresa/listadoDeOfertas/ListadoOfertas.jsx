import { Fragment, useState } from "react";
import { Box } from "@mui/system";
import Header from "../../Header";
import { Typography } from "@mui/material";
import BarraBusquedaOfertas from "./BarraBusquedaOfertas";
import ListaOfertas from "./ListaOfertas";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { config } from "../../../config/config";

const ListadoOfertas = () => {
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const [llamado, setLlamado] = useState(false);
  const [Ofertas, setOfertas] = useState([]);
  const API_URL = `${config.apiUrl}/ofertas/cuit/${datosUsuario.id}/`;

  const primerLlamado = async () => {
    if (llamado === false) {
      try {
        const api = await fetch(API_URL);
        const datos = await api.json();
        setLlamado(true);
        setOfertas(datos.ofertas.rows);
        console.log(datos.ofertas.rows);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const traerOfertas = async (e) => {
    try {
      e.preventDefault();
      const { usuario } = e.target.elements;
      const usuarioValue = usuario.value;
      const api = await fetch(
        `${config.apiUrl}/usuariosOfertas/?buscarApellido=${usuarioValue}`
      );
      const datos = await api.json();
      console.log(datos.Ofertas.rows);
      setOfertas(datos.Ofertas.rows);
    } catch (err) {
      console.log(err);
    }
  };

  primerLlamado();
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
          Listado de Ofertas
        </Typography>
        <BarraBusquedaOfertas traerOfertas={traerOfertas} />
      </Box>
      {Ofertas.length === 0 && llamado === true ? (
        <BusquedaNoEncontrada />
      ) : (
        <ListaOfertas Ofertas={Ofertas} />
      )}
    </Fragment>
  );
};

export default ListadoOfertas;
