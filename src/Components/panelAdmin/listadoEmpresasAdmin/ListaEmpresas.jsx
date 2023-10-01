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
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ListaEmpresas({ empresas }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">CUIT</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Nombre</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Representante</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Email</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Acciones</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empresas.map((empresa, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {empresa.id}
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {empresa.nombre_empresa}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {empresa.nombre_representante}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {empresa.email_representante}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/empresa/${empresa.id}`}
                >
                  <Button
                    variant="contained"
                    color="relaxed"
                    sx={{ margin: "0.5rem" }}
                  >
                    Ver empresa
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
