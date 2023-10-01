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
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { putEmpresa } from "../../../services/empresas_service";

export default function ListaEmpresas({ empresas }) {
  const token = sessionStorage.getItem("token");

  const handleActivarEmpresa = async (idEmpresa, nombre) => {
    const data = {
      idEstado: 1,
    };

    const confirmResult = await Swal.fire({
      icon: "warning",
      title: `¿Deseas activar la empresa ${nombre}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Activar",
      cancelButtonText: "Cancelar",
    });

    if (confirmResult.isConfirmed) {
      try {
        await putEmpresa(idEmpresa, data, token);
        await Swal.fire({
          icon: "success",
          title: `La empresa fue aceptada correctamente`,
          confirmButtonText: "Aceptar",
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                <Button
                  variant="contained"
                  color="relaxed"
                  sx={{ margin: "0.5rem" }}
                  onClick={() =>
                    handleActivarEmpresa(empresa.id, empresa.nombre_empresa)
                  }
                >
                  Activar
                </Button>
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
