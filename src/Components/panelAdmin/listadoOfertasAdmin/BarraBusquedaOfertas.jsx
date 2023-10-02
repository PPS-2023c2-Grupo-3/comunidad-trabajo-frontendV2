import { TextField, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
          placeholder="Buscar ofertas..."
          type="search"
          name="oferta"
        ></TextField>
        <Button type="submit" variant="contained">
          <SearchIcon />
        </Button>
      </Box>
    </form>
  );
};

export default BarraBusquedaOfertas;
