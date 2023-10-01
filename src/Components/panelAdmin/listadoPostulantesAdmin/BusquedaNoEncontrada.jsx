import { Typography, Box } from "@mui/material";

const BusquedaNoEncontrada = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Ups, no encontramos lo que estabas buscando.
        </Typography>
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Probá usando otras palabras en el cuadro de búsqueda
        </Typography>
      </Box>
    </>
  );
};

export default BusquedaNoEncontrada;
