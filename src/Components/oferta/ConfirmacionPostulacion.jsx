import { Link } from "react-router-dom";
import "../../App.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function PostulationConfirmation(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ padding: "1rem" }}>
        Postulación confirmada!
      </Typography>
      <Card sx={{ maxWidth: 250, margin: "1rem" }}>
        <CardMedia
          component="img"
          height="140"
          image="https://cdn.discordapp.com/attachments/955646153297395722/996230598853148792/unknown.png"
          alt="Offer"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {props.tituloOferta}
          </Typography>
          <Typography variant="body1" component="div">
            {props.nombreEmpresa}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button size="large" variant="contained" color="primary">
              Volver a inicio
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
