import { Fragment } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const BarraBusqueda = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.ofertasAPI}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <TextField
            placeholder="Buscar empleo..."
            type="search"
            name="ofertas"
            sx={{
              width: "50%",
              margin: "1rem",
            }}
            InputProps={{
              endAdornment: (
                <Button type="submit">
                  <SearchIcon />
                </Button>
              ),
            }}
          />
        </Box>
      </form>
    </Fragment>
  );
};

export default BarraBusqueda;
