import {
  Button,
  Typography,
  Box,
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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CircleIcon from "@mui/icons-material/Circle";
import { putPostulacion } from "../../../services/postulaciones_service";

export default function ListaPostulantesDeOfertaAdmin({ postulantes }) {
  const token = sessionStorage.getItem("token");

  const realizarAccion = async (idPostulacion, estado, successTitle) => {
    const data = {
      estado,
    };

    Swal.fire({
      icon: "warning",
      title: `¿Desea ${estado === 1 ? "aceptar" : "rechazar"} la postulación?`,
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await putPostulacion(idPostulacion, data, token);
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          icon: "success",
          title: `El postulante fue ${successTitle} correctamente`,
          confirmButtonText: "Aceptar",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  async function abrirPdf(cvPostulante) {
    window.open(cvPostulante);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Nombre</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">DNI</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Teléfono</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">CV</Typography>
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
            {postulantes.map((postulante, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {postulante?.Postulante?.nombre}{" "}
                  {postulante?.Postulante?.apellido}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    {postulante?.Postulante?.id}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    {postulante?.Postulante?.telefono}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={async () => abrirPdf(postulante?.Postulante?.cv)}
                  >
                    <PictureAsPdfIcon color="error" />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Box>
                    <CircleIcon
                      color={
                        postulante?.Estado?.id === 1
                          ? "success"
                          : postulante?.Estado?.id === 2
                          ? "warning"
                          : "error"
                      }
                    />
                    <Typography variant="body1">
                      {postulante?.Estado?.nombre_estado}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Link
                    to={`/postulantes/${postulante.Postulante.id}`}
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
                  {postulante?.Estado?.id === 2 ? (
                    <>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          realizarAccion(postulante.id, 1, "aceptado")
                        }
                        sx={{ margin: "0.5rem" }}
                      >
                        Aceptar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          realizarAccion(postulante.id, 3, "rechazado")
                        }
                        sx={{ margin: "0.5rem" }}
                      >
                        Rechazar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        disabled
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          realizarAccion(postulante.id, 1, "aceptado")
                        }
                        sx={{ margin: "0.5rem" }}
                      >
                        Aceptar
                      </Button>
                      <Button
                        disabled
                        variant="contained"
                        color="error"
                        onClick={() =>
                          realizarAccion(postulante.id, 3, "rechazado")
                        }
                        sx={{ margin: "0.5rem" }}
                      >
                        Rechazar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
