import { useState, useEffect } from "react";
import Header from "../../Header";
import { Typography, Box } from "@mui/material";
import BarraBusquedaOfertas from "./BarraBusquedaOfertas";
import ListaOfertas from "./ListaPostulaciones";
import { getPostulacionesPorIdPostulante } from "../../../services/postulacionesId_service";

const ListadoOfertas = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const id = datosUsuario.id;

  const [ofertas, setOfertas] = useState([]);
  // Acá tendríamos que agregar paginación y el limite de ofertas por página
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(10);

  useEffect(() => {
    const primerLlamado = async () => {
      try {
        const response = await getPostulacionesPorIdPostulante(
          pagina,
          limite,
          id
        );
        setOfertas(response.postulaciones.rows);
      } catch (error) {
        console.log(error);
      }
    };

    primerLlamado();
  }, [pagina, limite, id]);

  return (
    <>
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
    </>
  );
};

export default ListadoOfertas;
