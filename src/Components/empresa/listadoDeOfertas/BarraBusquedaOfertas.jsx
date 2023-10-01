import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField } from "@mui/material";

const BarraBusquedaOfertas = (props) => {
  return (
    <form onSubmit={props.traerOfertas}>
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
          name="tituloOferta"
        ></TextField>
        <Button type="submit" variant="contained">
          <SearchIcon />
        </Button>
      </Box>
    </form>
  );
};

export default BarraBusquedaOfertas;
