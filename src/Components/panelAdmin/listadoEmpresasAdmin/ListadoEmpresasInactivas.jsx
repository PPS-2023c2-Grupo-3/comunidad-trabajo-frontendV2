import React, { Fragment, useState } from "react";
import { Box } from "@mui/system";
import Header from "../../Header";
import { Pagination, Typography } from "@mui/material";
import BarraBusquedaEmpresas from "./BarraBusquedaEmpresas";
import ListaEmpresasInactivas from "./ListaEmpresasInactivas";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { config } from "../../../config/config";

const ListadoEmpresas = () => {
  const [llamado, setLlamado] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState("");
  const API_URL = `${config.apiUrl}/empresas/?pagina=0&limite=5&idEstado=2&ordenar=id`;

  const primerLlamado = async () => {
    if (llamado === false) {
      try {
        const api = await fetch(API_URL);
        const datos = await api.json();
        setLlamado(true);
        setEmpresas(datos.empresas.rows);
        setCantPaginas(datos.totalPaginas);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const traerEmpresas = async (e, p) => {
    try {
      e.preventDefault();
      const { empresa } = e.target.elements;
      const empresaValue = empresa.value;
      setBusquedaActual(empresaValue);
      const api = await fetch(
        `${config.apiUrl}/empresas/?pagina=0&limite=5&idEstado=2&ordenar=id&nombreEmpresa=${empresaValue}`
      );
      const datos = await api.json();
      setPagina(1);
      console.log(datos);
      setEmpresas(datos.empresas.rows);
      setCantPaginas(datos.totalPaginas);
      console.log(empresas);
    } catch (err) {
      console.log(err);
    }
  };

  const cambiarPagina = async (e, p) => {
    const api = await fetch(
      `${config.apiUrl}/empresas/?pagina=${
        p - 1
      }&limite=5&idEstado=2&ordenar=id&nombreEmpresa=${busquedaActual}`
    );
    const datos = await api.json();
    setEmpresas(datos.empresas.rows);
    setPagina(p);
    console.log(datos.empresas.rows);
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
        <Typography variant="h4" sx={{ textAlign: "center", margin_: "1rem" }}>
          Empresas pendientes
        </Typography>
        <BarraBusquedaEmpresas traerEmpresas={traerEmpresas} />
      </Box>
      {empresas.length === 0 && llamado === true ? (
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
    </Fragment>
  );
};

export default ListadoEmpresas;
