import { TextField, Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { useState } from "react";
import Header from "../Header";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import DatosUsuarioContextProvider from "../../Context/DatosUsuarioContext";
import { useContext } from "react";
import Swal from "sweetalert2";
import { signIn } from "../../services/usuarios_service";
import { getPostulanteById } from "../../services/postulantes_service";
import { getEmpresaByIdUsuario } from "../../services/empresas_service";

const Login = () => {
  const {
    cambiarDatosUsuario,
    cambiarToken,
    cambiarIdUsuario,
    cambiarEstadoLogeado,
    cambiarGrupo,
  } = useContext(DatosUsuarioContextProvider);
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var idUsuario = sessionStorage.getItem("idUsuario");
  var estaLogeado = sessionStorage.getItem("estaLogeado");
  const [body, setBody] = useState({ usuario: "", password: "" });
  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    const response = await signIn(body);

    cambiarToken(response.token);
    cambiarGrupo(response.grupo);
    cambiarIdUsuario(response.id);
    console.log(idUsuario);
    if (response.estado === false) {
      Swal.fire({
        icon: "error",
        title: "Su cuenta aun no se encuentra activa",
        confirmButtonText: "Volver",
        text: "Verifique sus datos",
        footer: "",
        showCloseButton: true,
      });
    } else if (response.grupo === 1) {
      const dataPostulante = await getPostulanteById(response.id);
      cambiarEstadoLogeado(true);
      cambiarDatosUsuario(dataPostulante);
      console.log(dataPostulante);
      window.location.href = "/";
    } else if (response.grupo === 2) {
      const dataEmpresa = await getEmpresaByIdUsuario(response.id);
      cambiarEstadoLogeado(true);
      cambiarDatosUsuario(dataEmpresa);
      console.log(dataEmpresa);
      window.location.href = "/";
    } else if (response.grupo === 3) {
      cambiarEstadoLogeado(true);
      window.location.href = "/";
    } else {
      Swal.fire({
        icon: "error",
        title: "Su grupo de usuario no es valido",
        confirmButtonText: "Volver",
        text: "Verifique sus datos",
        footer: "",
        showCloseButton: true,
      });
    }
  };
  return (
    <Fragment>
      <Header datosUsuario={datosUsuario} estaLogeado={estaLogeado} />
      <Typography
        sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        variant="h4"
      >
        Iniciar sesión
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "1.5rem",
              width: "20rem",
            }}
          >
            <TextField
              type="text"
              value={body.usuario}
              name="usuario"
              placeholder="Usuario"
              onChange={inputChange}
            ></TextField>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", margin: "1.5rem" }}
          >
            <TextField
              type="password"
              value={body.password}
              name="password"
              placeholder="Contraseña"
              onChange={inputChange}
            ></TextField>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "1.5rem" }}
          >
            <Button
              fullWidth
              color="relaxed"
              onClick={handleSubmit}
              variant="contained"
            >
              Ingresar
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/recuperarContrasena" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              display: "flex",
              margin: "0.5rem",
              justifyContent: "flex-start",
              color: "#3f50b5",
            }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Link>
        <Link to="/registroUsuario" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              display: "flex",
              margin: "0.5rem",
              justifyContent: "flex-end",
              color: "#3f50b5",
            }}
          >
            Registrate
          </Typography>
        </Link>
      </Box>
    </Fragment>
  );
};

export default Login;
