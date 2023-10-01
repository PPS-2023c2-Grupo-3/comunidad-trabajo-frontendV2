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
import Swal from "sweetalert2";
import { putOferta } from "../../../services/ofertas_service";

export default function ListaOfertas({ Ofertas }) {
  const token = sessionStorage.getItem("token");

  const finalizarOferta = (idOferta) => {
    Swal.fire({
      icon: "warning",
      title: "¿Deseas finalizar la oferta?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, finalizar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          idEstado: 5,
        };

        try {
          putOferta(idOferta, data, token).then(() => {
            Swal.fire({
              icon: "success",
              title: "Oferta finalizada",
              showConfirmButton: true,
            }).then(() => {
              window.location.reload();
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
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
          {Ofertas.map((oferta, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {oferta.titulo_oferta}
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">
                  {oferta.Empresa.nombre_empresa}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box sx={{}}>
                  <CircleIcon
                    color={
                      oferta.Estado.id === 1
                        ? "success"
                        : oferta.Estado.id === 2
                        ? "warning"
                        : oferta.Estado.id === 5
                        ? undefined
                        : "error"
                    }
                  />
                  <Typography variant="body1">
                    {oferta.Estado.nombre_estado}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Link
                  to={`/oferta/${oferta.id}`}
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
                <Link
                  to={`/ListadoDePostulantes/${oferta.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outlined" color="relaxed">
                    Ver postulantes
                  </Button>
                </Link>
                {oferta.Estado.id !== 5 ? (
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ margin: "0.5rem" }}
                    onClick={() => finalizarOferta(oferta.id)}
                  >
                    Finalizar
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="contained"
                    color="relaxed"
                    sx={{ margin: "0.5rem" }}
                  >
                    Finalizar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
