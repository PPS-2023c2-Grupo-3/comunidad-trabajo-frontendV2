import { useState, useEffect } from "react";
import Header from "../../Header";
import { Pagination, Typography, Box } from "@mui/material";
import BarraBusquedaEmpresas from "./BarraBusquedaEmpresas";
import ListaEmpresasInactivas from "./ListaEmpresasInactivas";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { getEmpresas } from "../../../services/empresas_service";

const ListadoEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await getEmpresas(0, 5, "id", 2, "");
      setEmpresas(response.empresas.rows);
      setCantPaginas(response.totalPaginas);
    }
    fetchData();
  }, []);

  const traerEmpresas = async (e) => {
    e.preventDefault();
    const { empresa } = e.target.elements;
    const empresaValue = empresa.value;
    setBusquedaActual(empresaValue);
    const response = await getEmpresas(0, 5, "id", 2, empresaValue);
    setPagina(1);
    setEmpresas(response.empresas.rows);
    setCantPaginas(response.totalPaginas);
  };

  const cambiarPagina = async (e, p) => {
    const response = await getEmpresas(p - 1, 5, "id", 2, busquedaActual);
    setEmpresas(response.empresas.rows);
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
          Empresas pendientes
        </Typography>
        <BarraBusquedaEmpresas traerEmpresas={traerEmpresas} />
      </Box>
      {empresas.length === 0 && busquedaActual ? (
        <BusquedaNoEncontrada />
      ) : (
        <ListaEmpresasInactivas empresas={empresas} />
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

export default ListadoEmpresas;
