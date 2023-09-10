import * as React from "react";
import Stack from "@mui/material/Stack";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Header from "../Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import { useRef } from "react";
import Swal from "sweetalert2";
import { AddAPhoto } from "@mui/icons-material";
import { config } from "../../config/config";
import { supabase } from "../../supabase/supabase.config";

export default function PerfilUsuario() {
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var token = sessionStorage.getItem("token");
  const postulanteId = datosUsuario.id; // Reemplaza con el ID correcto
  // const [foto, setFoto] = useState();
  const [uploadFoto, setUploadFoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  console.log(photoURL);

  // Realizar una solicitud HTTP para obtener el valor del campo 'foto' al cargar el componente
  useEffect(() => {
    async function fetchPhotoURL() {
      try {
        // Realiza una solicitud GET para obtener el valor del campo 'foto' desde tu backend
        const response = await axios.get(
          `${config.apiUrl}/postulantes/dni/${postulanteId}`
        );
        const fotoValor = response.data.foto;

        // Actualiza el estado de 'photoURL' con el valor obtenido
        setPhotoURL(fotoValor);
      } catch (error) {
        console.error(
          "Error al obtener el valor de 'foto' desde el backend:",
          error
        );
      }
    }

    // Llama a la función para obtener y establecer el valor de 'photoURL' al cargar el componente
    fetchPhotoURL();
  }, []); // El segundo argumento es un array vacío para que se ejecute solo una vez al cargar el componente

  // function timeoutReload() {
  //   setTimeout(function () {
  //     window.location.reload();
  //   }, 2000);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", uploadFoto);

      const { error } = await supabase.storage
        .from("files")
        .upload(uploadFoto.name, uploadFoto);

      if (error) {
        console.error("Error al cargar el archivo: ", error.message);
        return;
      }

      const { data: signedURLData, error: signedURLError } =
        await supabase.storage
          .from("files")
          .createSignedUrl(uploadFoto.name, 999999999999999);

      if (signedURLError) {
        console.error(
          "Error al obtener la URL firmada: ",
          signedURLError.message
        );
        return;
      }

      const newPhotoURL = signedURLData.signedUrl; // Obtén la nueva URL
      console.log("Datos a enviar al servidor:", { foto: newPhotoURL });

      // Actualiza el estado de 'photoURL' con la nueva URL
      setPhotoURL(newPhotoURL);

      console.log("Datos a enviar al servidor:", { foto: photoURL });

      const response = await axios.put(
        `${config.apiUrl}/postulantes/dni/${postulanteId}?authorization=${token}`,
        { foto: newPhotoURL }
      );
      console.log(newPhotoURL);
      if (response.status === 200) {
        console.log("Campo 'foto' actualizado en el backend:", newPhotoURL);
      }
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
              // timeoutReload();
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileSelect = (e) => {
    setUploadFoto(e.target.files[0]);
  };

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
                src={photoURL}
                sx={{
                  height: "8rem",
                  width: "8rem",
                  border: "4px solid",
                  borderColor: "primary.main",
                }}
              />

              <form onSubmit={handleSubmit}>
                <label htmlFor="uploadFoto">
                  <AddAPhoto color="primary" className="botonCambioFoto" />
                </label>
                <input
                  type="file"
                  name="file"
                  id="uploadFoto"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
                <input type="submit" value="SUBIR FOTO" />
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
