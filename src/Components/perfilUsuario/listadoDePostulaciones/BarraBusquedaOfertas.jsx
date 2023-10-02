import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField } from "@mui/material";

const BarraBusquedaPostulaciones = (props) => {
  return (
    <form onSubmit={props.traerPostulaciones}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "row",
          margin: "1rem",
        }}
      >
        <TextField
          placeholder="Buscar Ofertas..."
          type="search"
          name="tituloPostulacion"
        ></TextField>
        <Button type="submit" variant="contained">
          <SearchIcon />
        </Button>
      </Box>
    </form>
  );
};

export default BarraBusquedaPostulaciones;
