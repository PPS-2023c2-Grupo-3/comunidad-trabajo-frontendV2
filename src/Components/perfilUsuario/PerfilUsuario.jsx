import * as React from "react";
import Stack from "@mui/material/Stack";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Header from "../Header";
import { Link } from "react-router-dom";
// import { useState } from "react";
import axios from "axios";
// import { useEffect } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { AddAPhoto } from "@mui/icons-material";
import { config } from "../../config/config";

export default function PerfilUsuario() {
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var token = sessionStorage.getItem("token");
  // const [foto, setFoto] = useState();
  const uploadFoto = useRef();

  function timeoutReload() {
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploadFoto", uploadFoto.current);
    try {
      await axios({
        method: "post",
        url: `${config.apiUrl}/files/foto/?authorization=${token}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          id: datosUsuario.id,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Su foto fue actualizada correctamente",
        confirmButtonText: "Finalizar",
        text: "Para continuar pulse finalizar",
        footer: "",
        showCloseButton: true,
      }).then(async function (result) {
        if (result.value) {
          await axios
            .get(
              `${config.apiUrl}/postulantes/idUsuario/${datosUsuario.Usuario.id}?`
            )
            .then(({ data }) => {
              console.log(data);
              sessionStorage.setItem("datosUsuario", JSON.stringify(data));
              timeoutReload();
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileSelect = (e) => {
    uploadFoto.current = e.target.files[0];
    handleSubmit(e);
  };

  // function splitFileName(str) {
  //   return str.split("|")[1];
  // }

  // useEffect(() => {
  //   const traerFoto = async () => {
  //     const fetchedData = await axios.get(`${config.apiUrl}/files`, {
  //       headers: {
  //         type: "image/jpeg",
  //         file: splitFileName(datosUsuario.foto),
  //         authorization: token,
  //       },
  //       responseType: "blob",
  //     });

  //     console.log(fetchedData);
  //     const imageBlob = new Blob([fetchedData.data], { type: "image/jpeg" });
  //     console.log(imageBlob);
  //     const virtualUrl = URL.createObjectURL(imageBlob);
  //     console.log(virtualUrl);
  //     setFoto(virtualUrl);
  //   };
  //   traerFoto();
  // }, [datosUsuario.foto, token]);

  return (
    <React.Fragment>
      <Header />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} sx={{ padding: "1rem" }}>
              <Avatar
                src={
                  "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                }
                sx={{
                  height: "8rem",
                  width: "8rem",
                  border: "4px solid",
                  borderColor: "primary.main",
                }}
              />

              <form>
                <label htmlFor="uploadFoto">
                  <AddAPhoto color="primary" className="botonCambioFoto" />
                </label>
                <input
                  type="file"
                  id="uploadFoto"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </form>
            </Stack>
          </Box>
          <Box>
            <h1 style={{ display: "flex" }}>
              {datosUsuario.nombre} {datosUsuario.apellido}
            </h1>
            <h2 style={{ display: "flex" }}>{datosUsuario.Usuario.usuario}</h2>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link to="/miPerfil/misDatos" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ width: "25rem" }}>
              Datos personales
            </Button>
          </Link>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link
            to="/miPerfil/datosAcademicos"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" sx={{ width: "25rem" }}>
              Datos academicos
            </Button>
          </Link>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link to="/miPerfil/MiCV" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ width: "25rem" }}>
              MI CV
            </Button>
          </Link>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link to="/ofertasPostulante" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ width: "25rem" }}>
              Postulaciones
            </Button>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}
