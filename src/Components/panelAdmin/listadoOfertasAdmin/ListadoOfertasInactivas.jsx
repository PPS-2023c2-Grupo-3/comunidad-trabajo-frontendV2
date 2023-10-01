import { useState, useEffect } from "react";
import Header from "../../Header";
import { Box, Pagination, Typography } from "@mui/material";
import BarraBusquedaOfertas from "./BarraBusquedaOfertas";
import ListaOfertasInactivas from "./ListaOfertasInactivas";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { getOfertas } from "../../../services/ofertas_service";

const ListadoOfertas = () => {
  const [ofertas, setOfertas] = useState([]);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState("");

  useEffect(() => {
    const primerLlamado = async () => {
      try {
        const response = await getOfertas(0, 6, "", "id", 2);
        setOfertas(response.ofertas.rows);
        setCantPaginas(response.totalPaginas);
      } catch (error) {
        console.log(error);
      }
    };

    primerLlamado();
  }, []);

  const traerOfertas = async (e) => {
    try {
      e.preventDefault();
      const { oferta } = e.target.elements;
      const ofertaValue = oferta.value;
      setBusquedaActual(ofertaValue);
      setPagina(1);

      const response = await getOfertas(0, 6, ofertaValue, "id", 2);
      setOfertas(response.ofertas.rows);
      setCantPaginas(response.totalPaginas);
    } catch (err) {
      console.log(err);
    }
  };

  const cambiarPagina = async (e, p) => {
    try {
      const response = await getOfertas(p - 1, 6, busquedaActual, "id", 2);
      setOfertas(response.ofertas.rows);
      setPagina(p);
    } catch (error) {
      console.log(error);
    }
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
          Ofertas pendientes
        </Typography>
        <BarraBusquedaOfertas traerOfertas={traerOfertas} />
      </Box>
      {ofertas.length === 0 ? (
        <BusquedaNoEncontrada />
      ) : (
        <ListaOfertasInactivas ofertas={ofertas} />
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

export default ListadoOfertas;
