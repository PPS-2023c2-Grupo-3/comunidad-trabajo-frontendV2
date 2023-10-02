import { useState, useEffect } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import NotFound from "../NotFound";
import Swal from "sweetalert2";
import "../../App.css";
import { getOfertaById, putOferta } from "../../services/ofertas_service";
import { postPostulacion } from "../../services/postulaciones_service";

const DescripcionOferta = () => {
  const { id } = useParams();
  const [oferta, setOferta] = useState({});

  useEffect(() => {
    const getOfertaData = async () => {
      try {
        const response = await getOfertaById(id);
        setOferta(response);
      } catch (error) {
        console.log(error);
      }
    };

    getOfertaData();
  }, [id]);

  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const token = sessionStorage.getItem("token");
  const grupo = sessionStorage.getItem("grupo");
  const estaLogeado = sessionStorage.getItem("estaLogeado");

  const timeoutReload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const postularse = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: `¿Deseas postularte a ${oferta.titulo_oferta}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, postularme!",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postulacionData = {
          postulante: datosUsuario.id,
          oferta: id,
          empresa: oferta.fk_id_empresa,
        };

        try {
          const response = await postPostulacion(postulacionData, token);
          console.log(response);
          Swal.fire(
            `Te has postulado a ${oferta.titulo_oferta}`,
            "¡Buena suerte!",
            "success"
          ).then(() => {
            timeoutReload();
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const activar = async (idOferta) => {
    const data = {
      idEstado: 1,
    };

    try {
      await putOferta(idOferta, data, token);
      Swal.fire({
        icon: "success",
        title: "La oferta fue aceptada exitosamente",
        confirmButtonText: "Finalizar",
        text: "Para continuar pulse el botón",
        footer: "",
        showCloseButton: true,
      })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Ocurrió un error al aceptar la oferta",
            confirmButtonText: "Volver",
            text: "Verifique sus datos",
            footer: "",
            showCloseButton: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const publicadoHace = (fechaPublicacion) => {
    const fechaPublicacionDate = new Date(fechaPublicacion);
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaPublicacionDate;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor(diferencia / (1000 * 60));

    if (dias > 0) {
      return `${dias} días`;
    } else if (horas > 0) {
      return `${horas} horas`;
    } else {
      return `${minutos} minutos`;
    }
  };

  const renderNotFound = () => <NotFound />;

  const renderButtons = () => (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      {grupo === "3" && oferta.Estado.id === 2 ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{ margin: "0.5rem" }}
              color="relaxed"
              variant="contained"
              onClick={async () => activar(id)}
            >
              Aceptar
            </Button>
            <Button sx={{ margin: "0.5rem" }} color="error" variant="contained">
              Rechazar
            </Button>
          </Box>
        </>
      ) : grupo === "3" &&
        (oferta.Estado?.id === 1 || oferta.Estado?.id === 3) ? null : grupo ===
        "2" ? (
        oferta.Empresa?.nombre_empresa === datosUsuario.nombre_empresa ? (
          <Box sx={{ width: "20rem" }}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/edicionOferta/${id}`}
            >
              <Button
                size="large"
                variant="contained"
                color="relaxed"
                sx={{ width: "20rem", marginBottom: "1rem" }}
              >
                Editar oferta
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              to={`/ListadoDePostulantes/${id}`}
            >
              <Button
                size="large"
                variant="outlined"
                color="relaxed"
                sx={{ width: "20rem" }}
              >
                Ver postulantes
              </Button>
            </Link>
          </Box>
        ) : (
          <Box></Box>
        )
      ) : estaLogeado === "true" ? (
        <Button
          size="large"
          variant="contained"
          color="relaxed"
          onClick={postularse}
          sx={{ width: "20rem" }}
          disabled
        >
          Ya estas postulado
        </Button>
      ) : estaLogeado === "true" ? (
        <Button
          size="large"
          variant="contained"
          color="relaxed"
          onClick={postularse}
          sx={{ width: "20rem" }}
        >
          Postularme
        </Button>
      ) : (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            size="large"
            variant="contained"
            color="relaxed"
            sx={{ width: "20rem" }}
          >
            Postularme
          </Button>
        </Link>
      )}
    </Box>
  );

  return (
    <>
      {oferta &&
      oferta.Estado &&
      oferta.Estado.id !== 1 &&
      (grupo === "1" || !estaLogeado) ? (
        { renderNotFound }
      ) : (
        <>
          <Header />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                maxWidth: "50rem",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    margin: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Grid item xs={12} sm={8} md={8}>
                    <Box>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h4">
                            {oferta.titulo_oferta}
                          </Typography>
                          <Typography variant="h6">
                            {oferta.Empresa?.nombre_empresa}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <PlaceIcon />
                            {oferta.zona_trabajo}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <CalendarMonthIcon />
                            Publicado hace: {publicadoHace(oferta.createdAt)}
                          </Typography>
                        </Box>
                        <img
                          src="https://cdn.discordapp.com/attachments/955646153297395722/996230598853148792/unknown.png"
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Grid item xs={12} sm={8} md={8}>
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Sobre la empresa
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ marginBottom: "0.5rem" }}
                      >
                        {oferta.Empresa?.descripcion}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Descripción
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ marginBottom: "0.5rem", whiteSpace: "pre-line" }}
                      >
                        {oferta.descripcion}
                      </Typography>
                    </Grid>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                      Horario
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginBottom: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ScheduleIcon /> De {oferta.horario_laboral_desde}hs a{" "}
                      {oferta.horario_laboral_hasta}hs
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                      Contrato
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                      {oferta.Contrato?.nombre_contrato}
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                      Salario
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      ${oferta.remuneracion}
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                      Beneficios
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                      {oferta.beneficios}
                    </Typography>

                    {renderButtons()}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};
export default DescripcionOferta;
