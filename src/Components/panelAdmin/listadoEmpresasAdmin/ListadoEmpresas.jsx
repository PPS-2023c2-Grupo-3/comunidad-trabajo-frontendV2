import { useState, useEffect } from "react";
import Header from "../../Header";
import { Pagination, Typography, Box, Button } from "@mui/material";
import BarraBusquedaEmpresas from "./BarraBusquedaEmpresas";
import ListaEmpresas from "./ListaEmpresas";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { Link } from "react-router-dom";
import { getEmpresas } from "../../../services/empresas_service";

const ListadoEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState("");
  const [cantEmpresasPendientes, setCantEmpresasPendientes] = useState(0);

  useEffect(() => {
    primerLlamado();
    traerCantEmpresasPendientes();
  }, []);

  const primerLlamado = async () => {
    try {
      const response = await getEmpresas(0, 5, "createdAt", "Activo", "");
      setEmpresas(response.empresas.rows);
      setCantPaginas(response.totalPaginas);
    } catch (error) {
      console.log(error);
    }
  };

  const traerEmpresas = async (e) => {
    try {
      e.preventDefault();
      const { empresa } = e.target.elements;
      const empresaValue = empresa.value;
      setBusquedaActual(empresaValue);
      const response = await getEmpresas(0, 5, "createdAt", "Activo", empresaValue);
      setPagina(1);
      setEmpresas(response.empresas.rows);
      setCantPaginas(response.totalPaginas);
    } catch (err) {
      console.log(err);
    }
  };

  const traerCantEmpresasPendientes = async () => {
    try {
      const response = await getEmpresas(0, 5, "createdAt", "Observado", "");
      setCantEmpresasPendientes(response.empresas.count);
    } catch (err) {
      console.log(err);
    }
  };

  const cambiarPagina = async (e, p) => {
    const response = await getEmpresas(p - 1, 5, "createdAt", "Activo", busquedaActual);
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
          Empresas activas
        </Typography>
        <BarraBusquedaEmpresas traerEmpresas={traerEmpresas} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "start" }}>
        <Link
          to="/admin/listadoEmpresasInactivas"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="edit" sx={{ margin: "0.5rem" }}>
            Empresas pendientes ({cantEmpresasPendientes})
          </Button>
        </Link>
      </Box>
      {empresas.length === 0 ? (
        busquedaActual !== "" ? (
          <BusquedaNoEncontrada />
        ) : null
      ) : (
        <ListaEmpresas empresas={empresas} />
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
