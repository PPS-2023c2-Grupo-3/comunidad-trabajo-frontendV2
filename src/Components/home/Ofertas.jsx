import { Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Ofertas = ({ listaOfertas }) => {
  function publicadoHace(fechaPublicacion) {
    var fechaPublicacionDate = new Date(fechaPublicacion);
    var fechaActual = new Date();
    var diferencia = fechaActual - fechaPublicacionDate;
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor(diferencia / (1000 * 60 * 60));
    var minutos = Math.floor(diferencia / (1000 * 60));

    if (dias > 0) {
      return dias + " días";
    } else if (horas > 0) {
      return horas + " horas";
    } else {
      return minutos + " minutos";
    }
  }

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {listaOfertas.map((oferta) => (
          <Card
            sx={{
              width: 500,
              margin: "1rem",
              "&:hover": {
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              },
              "&:not(:hover)": {
                transform: "scale(1)",
                transition: "all 0.3s ease-in-out",
              },
            }}
            key={oferta.id}
            //className="oferta"
          >
            <Box sx={{ height: 400, margin: "1rem" }}>
              <CardMedia
                component="img"
                height="140"
                image="https://cdn.discordapp.com/attachments/955646153297395722/996230598853148792/unknown.png"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component="div">
                  {oferta.titulo_oferta.toUpperCase()}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                  {oferta.Empresa.nombre_empresa}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  {oferta.zona_trabajo}
                </Typography>
                <Typography variant="body2" gutterBottom component="div">
                  Hace {publicadoHace(oferta.createdAt)}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  {oferta.descripcion.length < 70 ? (
                    oferta.descripcion
                  ) : (
                    <p>{oferta.descripcion.substring(0, 70)}...</p>
                  )}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
                margin: "1rem",
              }}
            >
              <Link
                to={`/oferta/${oferta.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="relaxed">
                  Ver oferta
                </Button>
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </Fragment>
  );
};

export default Ofertas;
