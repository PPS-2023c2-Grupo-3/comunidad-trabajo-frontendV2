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
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { putOferta } from "../../../services/ofertas_service";

function ListaOfertas({ ofertas }) {
  const token = sessionStorage.getItem("token");

  const realizarAccion = async (idOferta, titulo, data) => {
    Swal.fire({
      icon: "warning",
      title: `¿Deseas ${data.title} la oferta ${titulo}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: data.confirmText,
      cancelButtonText: data.cancelText,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await putOferta(idOferta, data.payload, token);
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          icon: "success",
          title: `La oferta fue ${data.successTitle} correctamente`,
          confirmButtonText: "Continuar",
        }).then(() => {
          window.location.reload();
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
                  <CircleIcon color="warning" />
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
                <Button
                  variant="contained"
                  color="relaxed"
                  sx={{ margin: "0.5rem" }}
                  onClick={async () =>
                    realizarAccion(oferta.id, oferta.titulo_oferta, {
                      title: "activar",
                      confirmText: "Activar",
                      cancelText: "Cancelar",
                      payload: { idEstado: 1 },
                      successTitle: "activada",
                    })
                  }
                >
                  Activar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ margin: "0.5rem" }}
                  onClick={async () =>
                    realizarAccion(oferta.id, oferta.titulo_oferta, {
                      title: "mandar a revisión",
                      confirmText: "¡Si, mandar!",
                      cancelText: "No, cancelar",
                      payload: { idEstado: 4 },
                      successTitle: "mandada a revisión",
                    })
                  }
                >
                  Suspender
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListaOfertas;
