import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NotFound from "../NotFound";
import "../../App.css";
import { useEffect } from "react";
import { getOfertaById, putOferta } from "../../services/ofertas_service";
import { postPostulacion } from "../../services/postulaciones_service";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const CustomizedDialogs = () => {
  const { id } = useParams();
  const [tituloOferta, setTituloOferta] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [descripcionEmpresa, setDescripcionEmpresa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [zona, setZona] = useState("");
  const [salario, setSalario] = useState("");
  const [horarioEntrada, setHorarioEntrada] = useState("");
  const [horarioSalida, setHorarioSalida] = useState("");
  const [contrato, setContrato] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");

  useEffect(() => {
    const getOfertaData = async () => {
      try {
        const datos = await getOfertaById(id);
        if (datos) {
          setTituloOferta(datos.titulo_oferta || "");
          setNombreEmpresa(datos.Empresa?.nombre_empresa || "");
          setDescripcionEmpresa(datos.Empresa?.descripcion || "");
          setIdEmpresa(datos.Empresa?.id || "");
          setDescripcion(datos.descripcion || "");
          setZona(datos.zona_trabajo || "");
          setSalario(datos.remuneracion || "");
          setHorarioEntrada(datos.horario_laboral_desde || "");
          setHorarioSalida(datos.horario_laboral_hasta || "");
          setContrato(datos.Contrato?.nombre_contrato || "");
          setBeneficios(datos.beneficios || "");
          setEstado(datos.Estado?.id || "");
          setFechaPublicacion(datos.createdAt || "");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    if (id) {
      getOfertaData();
    }
  }, [id]);

  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var token = sessionStorage.getItem("token");
  var grupo = sessionStorage.getItem("grupo");
  var estaLogeado = sessionStorage.getItem("estaLogeado");

  // eslint-disable-next-line no-unused-vars
  const [encontrado, setEcontrado] = useState(false);

  function timeoutReload() {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  // estaPostulado();
  const postularse = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: `¿Deseas postularte a ${tituloOferta}?`,

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
          empresa: idEmpresa,
        };

        try {
          const response = await postPostulacion(postulacionData, token);
          console.log(response);
          Swal.fire(
            `Te has postulado a ${tituloOferta}`,
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
      idEstado: 1
    };
  
    try {
      const response = await putOferta(idOferta, data, token);
  
      console.log(response);
  
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

  function publicadoHace(fechaPublicacion) {
    var fechaPublicacionDate = new Date(fechaPublicacion);
    var fechaActual = new Date();
    var diferencia = fechaActual - fechaPublicacionDate;
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor(diferencia / (1000 * 60 * 60));
    var minutos = Math.floor(diferencia / (1000 * 60));

    if (dias > 0) {
      return dias + " dias";
    } else if (horas > 0) {
      return horas + " horas";
    } else {
      return minutos + " minutos";
    }
  }
  return (
    <Fragment>
      {estado !== 1 && (grupo === "1" || !estaLogeado) ? (
        <NotFound></NotFound>
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
                          <Typography variant="h4">{tituloOferta}</Typography>
                          <Typography variant="h6">{nombreEmpresa}</Typography>
                          <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <PlaceIcon />
                            {zona}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <CalendarMonthIcon />
                            Publicado hace: {publicadoHace(fechaPublicacion)}
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
                      {" "}
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Sobre la empresa
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ marginBottom: "0.5rem" }}
                      >
                        {descripcionEmpresa}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                      {" "}
                      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                        Descripción
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ marginBottom: "0.5rem", whiteSpace: "pre-line" }}
                      >
                        {descripcion}
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
                      <ScheduleIcon /> De {horarioEntrada}hs a {horarioSalida}hs
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                      Contrato
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                      {contrato}
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                      Salario
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      ${salario}
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                      Beneficios
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
                      {beneficios}
                    </Typography>

                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      {grupo === "3" && estado === 2 ? (
                        <>
                          {" "}
                          <Box sx={{ display: "flex" }}>
                            <Button
                              sx={{ margin: "0.5rem" }}
                              color="relaxed"
                              variant="contained"
                              onClick={async () => activar(id)}
                            >
                              {" "}
                              Aceptar{" "}
                            </Button>
                            <Button
                              sx={{ margin: "0.5rem" }}
                              color="error"
                              variant="contained"
                            >
                              Rechazar
                            </Button>
                          </Box>
                        </>
                      ) : grupo === "3" &&
                        (estado === 1 || estado === 3) ? null : grupo ===
                        "2" ? (
                        nombreEmpresa === datosUsuario.nombre_empresa ? (
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
                      ) : estaLogeado === "true" && encontrado ? (
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
                      ) : estaLogeado === "true" && !encontrado ? (
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
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </>
      )}
    </Fragment>
  );
};
export default CustomizedDialogs;
