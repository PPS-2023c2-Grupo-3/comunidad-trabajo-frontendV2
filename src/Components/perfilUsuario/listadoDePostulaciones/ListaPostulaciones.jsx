import {
  Button,
  Box,
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
import Swal from "sweetalert2";
import CircleIcon from "@mui/icons-material/Circle";
import { deletePostulacion } from "../../../services/postulaciones_service";

const ListaOfertas = ({ ofertas }) => {
  const token = sessionStorage.getItem("token");

  const eliminarPostulacion = (id) => {
    Swal.fire({
      icon: "warning",
      title: `¿Desea eliminar su postulación a la oferta?`,
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((res) => {
      if (res.isConfirmed) {
        deletePostulacion(id, token).then(() => {
          Swal.fire("Eliminado!", "", "success").then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">ID Oferta</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Nombre</Typography>
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
                {oferta?.Oferta?.id}
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {oferta?.Oferta?.titulo_oferta}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {oferta?.Empresa?.nombre_empresa}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box>
                  {oferta?.Estado?.id === 1 ? (
                    <CircleIcon color="success" />
                  ) : oferta?.Estado?.id === 2 ? (
                    <CircleIcon color="warning" />
                  ) : (
                    <CircleIcon color="error" />
                  )}
                  <Typography variant="body1">
                    {oferta?.Estado?.nombre_estado}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Link
                  to={`/oferta/${oferta?.Oferta?.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    color="relaxed"
                    sx={{ margin: "0.5rem" }}
                  >
                    Ver
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ margin: "0.5rem" }}
                  onClick={() => eliminarPostulacion(oferta.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListaOfertas;
