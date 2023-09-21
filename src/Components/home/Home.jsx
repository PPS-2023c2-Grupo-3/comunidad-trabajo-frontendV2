import "../../App.css";
import { Fragment } from "react";
import Header from "../Header";
import Ofertas from "./Ofertas";
import { useState } from "react";
import BarraBusqueda from "./BarraBusqueda";

import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { Pagination } from "@mui/material";
import { config } from "../../config/config";
import { getOfertaByCuit, getOfertas } from "../../services/ofertas_service";

const Home = () => {
  const [listaOfertas, setListaOfertas] = useState([]);
  const [llamado, setLlamado] = useState(false);
  const [cantPaginas, setCantPaginas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [busquedaActual, setBusquedaActual] = useState("");

  var grupo = sessionStorage.getItem("grupo");
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));

  const primerLlamado = async () => {
    if (llamado === false) {
      try {
        if(grupo === "2") {
          const ofertas = await getOfertaByCuit(0, 6, "id", 1, datosUsuario.id);
          setListaOfertas(ofertas.ofertas.rows);
          setCantPaginas(ofertas.totalPaginas);
        } else {
          const response = await getOfertas(0, 6, "", "id", 1);
          setListaOfertas(response.ofertas.rows);
          setCantPaginas(response.totalPaginas);
        }
        setLlamado(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ofertasAPI = async (e) => {
    try {
      e.preventDefault();
      const { ofertas } = e.target.elements;
      const ofertasValue = ofertas.value;
      setBusquedaActual(ofertasValue);
      var api;
      if (grupo === "2") {
        api = await fetch(
          `${config.apiUrl}/ofertas/cuit/${datosUsuario.id}?pagina=0&limite=&buscarTitulo=${ofertasValue}3&ordenar=id&idEstado=1`
        );
      } else {
        api = await fetch(
          `${config.apiUrl}/ofertas/?pagina=0&limite=6&buscarTitulo=${ofertasValue}&ordenar=id&idEstado=1`
        );
      }
      const datos = await api.json();
      setPagina(1);
      setListaOfertas(datos.ofertas.rows);
      setCantPaginas(datos.totalPaginas);
      console.log(datos.ofertas.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const cambiarPagina = async (e, p) => {
    var api;
    if (grupo === "2") {
      api = await fetch(
        `${config.apiUrl}/ofertas/cuit/${datosUsuario.id}?pagina=${
          p - 1
        }&limite=6&ordenar=id&buscarTitulo=${busquedaActual}&idEstado=1`
      );
    } else {
      api = await fetch(
        `${config.apiUrl}/ofertas/?pagina=${
          p - 1
        }&limite=6&ordenar=id&buscarTitulo=${busquedaActual}&idEstado=1`
      );
    }
    const datos = await api.json();
    setListaOfertas(datos.ofertas.rows);
    setPagina(p);
    console.log(datos.ofertas.rows);
  };

  primerLlamado();

  return (
    <Fragment>
      <div style={{ backgroundColor: "#f3f3f3" }}>
        <Header />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "1rem",
          }}
        >
          <BarraBusqueda ofertasAPI={ofertasAPI} />
          {listaOfertas.length === 0 && llamado === true ? (
            <BusquedaNoEncontrada />
          ) : (
            <Ofertas listaOfertas={listaOfertas} />
          )}
          <Pagination
            color="primary"
            count={cantPaginas}
            page={pagina}
            onChange={cambiarPagina}
            variant="text"
            sx={{ display: "flex", justifyContent: "center" }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
