import { useState, useEffect } from "react";
import Header from "../../Header";
import { Box, Button, Pagination, Typography } from "@mui/material";
import BarraBusquedaOfertas from "./BarraBusquedaOfertas";
import ListaOfertas from "./ListaOfertas";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { Link } from "react-router-dom";
import { getOfertas } from "../../../services/ofertas_service";

const ListadoOfertas = () => {
  const [llamado, setLlamado] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState("");
  const [cantOfertasPendientes, setCantOfertasPendientes] = useState(0);
  const [cantOfertasRevision, setCantOfertasRevision] = useState(0);
  const [cantOfertasFinalizadas, setCantOfertasFinalizadas] = useState(0);

  useEffect(() => {
    const fetchOfertas = async (page = 1) => {
      try {
        const response = await getOfertas(page-1, 6, busquedaActual, "id", 1);
        setLlamado(true);
        setOfertas(response.ofertas.rows);
        setCantPaginas(response.totalPaginas);
        setPagina(page);
      } catch (error) {
        console.log(error);
      }
    };

    if (!llamado) {
      fetchOfertas();
    }
  }, [llamado, busquedaActual]);

  useEffect(() => {
    const fetchCantidadOfertas = async (idEstado, setter) => {
      try {
        const response = await getOfertas(0, undefined, "", "id", idEstado);
        setter(response.ofertas.count);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCantidadOfertas(2, setCantOfertasPendientes);
    fetchCantidadOfertas(4, setCantOfertasRevision);
    fetchCantidadOfertas(5, setCantOfertasFinalizadas);
  }, []);

  const traerOfertas = async (e) => {
    e.preventDefault();
    const { oferta } = e.target.elements;
    const ofertaValue = oferta.value;
    console.log(ofertaValue);
    setBusquedaActual(ofertaValue);
    setPagina(1);
    await fetchOfertas();
  };

  const fetchOfertas = async (page = 1) => {
    try {
      const response = await getOfertas(page-1, 6, busquedaActual, "id", 1);
      setOfertas(response.ofertas.rows);
      setCantPaginas(response.totalPaginas);
      setPagina(page);
    } catch (err) {
      console.log(err);
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
          Ofertas activas
        </Typography>
        <BarraBusquedaOfertas traerOfertas={traerOfertas} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Box sx={{ display: "flex" }}>
          <Link
            to="/admin/listadoOfertasInactivas"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="edit" sx={{ margin: "0.5rem" }}>
              Ofertas pendientes ({cantOfertasPendientes})
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Link
            to="/admin/listadoOfertasRevision"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="error" sx={{ margin: "0.5rem" }}>
              Ofertas en revisión ({cantOfertasRevision})
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Link
            to="/admin/listadoOfertasFinalizadas"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="finalizado"
              sx={{ margin: "0.5rem" }}
            >
              Ofertas finalizadas ({cantOfertasFinalizadas})
            </Button>
          </Link>
        </Box>
      </Box>
      {ofertas.length === 0 && llamado === true ? (
        <BusquedaNoEncontrada />
      ) : (
        <ListaOfertas ofertas={ofertas} />
      )}
      <Pagination
        color="primary"
        page={pagina}
        count={cantPaginas}
        onChange={(_, p) => fetchOfertas(p)}
        sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      />
    </>
  );
};

export default ListadoOfertas;
