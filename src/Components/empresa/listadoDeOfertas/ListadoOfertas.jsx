import { useState, useEffect } from "react";
import Header from "../../Header";
import { Typography, Box } from "@mui/material";
import BarraBusquedaOfertas from "./BarraBusquedaOfertas";
import ListaOfertas from "./ListaOfertas";
import BusquedaNoEncontrada from "./BusquedaNoEncontrada";
import { getOfertaByCuit, getOfertas } from "../../../services/ofertas_service";

const ListadoOfertas = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const [llamado, setLlamado] = useState(false);
  const [Ofertas, setOfertas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(20);
  const [ordenar, setOrdenar] = useState("DESC");
  const [idEstado, setIdEstado] = useState(1);
  const cuit = datosUsuario.id;

  useEffect(() => {
    async function primerLlamado() {
      if (!llamado) {
        try {
          const response = await getOfertaByCuit(
            pagina,
            limite,
            ordenar,
            idEstado,
            cuit
          );
          setLlamado(true);
          setOfertas(response.ofertas.rows);
        } catch (error) {
          console.log(error);
        }
      }
    }
    primerLlamado();
  }, [llamado, pagina, limite, ordenar, idEstado, cuit]);

  const traerOfertas = async (e) => {
    try {
      const response = await getOfertas(
        pagina,
        limite,
        e.target.value,
        ordenar,
        idEstado
      );
      setOfertas(response.ofertas.rows);
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
          Listado de Ofertas
        </Typography>
        <BarraBusquedaOfertas traerOfertas={traerOfertas} />
      </Box>
      {Ofertas.length === 0 && llamado === true ? (
        <BusquedaNoEncontrada />
      ) : (
        <ListaOfertas Ofertas={Ofertas} />
      )}
    </>
  );
};

export default ListadoOfertas;
