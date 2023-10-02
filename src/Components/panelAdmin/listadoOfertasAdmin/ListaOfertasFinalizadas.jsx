import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";

export default function ListaOfertas({ ofertas }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">ID Oferta</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Titulo</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Empresa</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Estado</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Acciones</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ofertas.map((oferta, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {oferta.id}
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{oferta.titulo_oferta}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1"></Typography>
                {oferta.Empresa.nombre_empresa}
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircleIcon />
                  <Typography variant="body1">
                    {oferta.Estado.nombre_estado}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/oferta/${oferta.id}`}
                >
                  <Button
                    variant="contained"
                    color="relaxed"
                    sx={{ margin: "0.5rem" }}
                  >
                    VER OFERTA
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
