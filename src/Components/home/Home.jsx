import "../../App.css";
import { Fragment } from "react";
import Header from "../Header";
import Ofertas from "./Ofertas";
import { useState } from "react";
import BarraBusqueda from "./BarraBusqueda";

import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { Pagination } from "@mui/material";
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
      
      const pagina = 0;
      const limite = grupo === "2" ? "" : 6;
      const ordenar = "id";
      const idEstado = 1;
      
      let resultados;
      if (grupo === "2") {
        resultados = await getOfertaByCuit(pagina, limite, ordenar, idEstado, datosUsuario.id);
      } else {
        resultados = await getOfertas(pagina, limite, ofertasValue, ordenar, idEstado);
      }
      
      setPagina(1);
      setListaOfertas(resultados.ofertas.rows);
      setCantPaginas(resultados.totalPaginas);
    } catch (err) {
      console.log(err);
    }
  };  

  const cambiarPagina = async (e, p) => {
    try {
      const pagina = p - 1;
      const limite = 6;
      const ordenar = "id";
      const idEstado = 1;
  
      let resultados;
      if (grupo === "2") {
        resultados = await getOfertaByCuit(pagina, limite, ordenar, idEstado, datosUsuario.id);
      } else {
        resultados = await getOfertas(pagina, limite, busquedaActual, ordenar, idEstado);
      }
      setListaOfertas(resultados.ofertas.rows);
      setPagina(p);
    } catch (err) {
      console.log(err);
    }
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
