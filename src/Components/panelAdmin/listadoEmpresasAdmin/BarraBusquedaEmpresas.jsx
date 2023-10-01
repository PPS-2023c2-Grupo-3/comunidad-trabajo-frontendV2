import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BarraBusquedaPostulantes = (props) => {
  return (
    <form onSubmit={props.traerEmpresas}>
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
          placeholder="Buscar empresa..."
          type="search"
          name="empresa"
        ></TextField>
        <Button type="submit" variant="contained">
          <SearchIcon />
        </Button>
      </Box>
    </form>
  );
};

export default BarraBusquedaPostulantes;
