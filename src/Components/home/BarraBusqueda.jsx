import { Fragment } from "react";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const BarraBusqueda = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.ofertasAPI}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          pt={2}
          pb={2}
        >
          <Grid item xs={10} sm={8} lg={6}>
            <TextField
              placeholder="Buscar empleo..."
              type="search"
              name="ofertas"
              fullWidth
              InputProps={{
                endAdornment: (
                  <Button type="submit">
                    <SearchIcon />
                  </Button>
                ),
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default BarraBusqueda;
