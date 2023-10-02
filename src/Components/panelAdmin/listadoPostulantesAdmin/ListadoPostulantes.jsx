import { useState, useEffect } from "react";
import Header from "../../Header";
import { Pagination, Typography, Box } from "@mui/material";
import BarraBusquedaPostulantes from "./BarraBusquedaPostulantes";
import ListaPostulantes from "./ListaPostulantes";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { getPostulantes } from "../../../services/postulantes_service";

const ListadoPostulantes = () => {
  const [postulantes, setPostulantes] = useState([]);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState("");

  useEffect(() => {
    primerLlamado();
  }, []);

  const primerLlamado = async () => {
    try {
      const response = await getPostulantes(0, 6, "id", "");
      setPostulantes(response.postulantes.rows);
      setCantPaginas(response.totalPaginas);
    } catch (error) {
      console.log(error);
    }
  };

  const traerPostulantes = async (e) => {
    try {
      e.preventDefault();
      const { usuario } = e.target.elements;
      const usuarioValue = usuario.value;
      setBusquedaActual(usuarioValue);
      const response = await getPostulantes(0, 6, "id", usuarioValue);
      setPagina(1);
      setPostulantes(response.postulantes.rows);
      setCantPaginas(response.totalPaginas);
    } catch (err) {
      console.log(err);
    }
  };

  const cambiarPagina = async (event, p) => {
    const response = await getPostulantes(p - 1, 6, "id", busquedaActual);
    setPostulantes(response.postulantes.rows);
    setPagina(p);
  };

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
          Listado de postulantes
        </Typography>
        <BarraBusquedaPostulantes traerPostulantes={traerPostulantes} />
      </Box>
      {postulantes.length === 0 ? (
        busquedaActual !== "" ? (
          <BusquedaNoEncontrada />
        ) : null
      ) : (
        <ListaPostulantes postulantes={postulantes} />
      )}
      <Pagination
        color="primary"
        count={cantPaginas}
        page={pagina}
        onChange={cambiarPagina}
        sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      />
    </>
  );
};

export default ListadoPostulantes;
