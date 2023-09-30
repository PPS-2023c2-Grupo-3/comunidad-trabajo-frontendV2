import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Stack, Avatar } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import Swal from "sweetalert2";
import Header from "../Header";
import {
  getPostulanteByDni,
  putPostulante,
  getPostulanteById,
} from "../../services/postulantes_service";
import { supabase } from "../../supabase/supabase.config";

export default function PerfilUsuario() {
  const [uploadFoto, setUploadFoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const token = sessionStorage.getItem("token");
  const postulanteId = datosUsuario.id;

  useEffect(() => {
    async function fetchPhotoURL() {
      try {
        const response = await getPostulanteByDni(postulanteId);
        const fotoValor = response.foto;
        setPhotoURL(fotoValor);
      } catch (error) {
        console.error(
          "Error al obtener el valor de 'foto' desde el backend:",
          error
        );
      }
    }

    fetchPhotoURL();
  }, []);

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

      const newPhotoURL = signedURLData.signedUrl;
      setPhotoURL(newPhotoURL);

      console.log("Datos a enviar al servidor:", { foto: newPhotoURL });

      const response = await putPostulante(
        postulanteId,
        { foto: newPhotoURL },
        token
      );

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
          const response = await getPostulanteById(datosUsuario.Usuario.id);
          sessionStorage.setItem("datosUsuario", JSON.stringify(response));
          window.location.reload();
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
    <>
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
        {[
          { to: "/miPerfil/misDatos", label: "Datos personales" },
          { to: "/miPerfil/datosAcademicos", label: "Datos académicos" },
          { to: "/miPerfil/MiCV", label: "MI CV" },
          { to: "/ofertasPostulante", label: "Postulaciones" },
        ].map((link) => (
          <Box
            key={link.to}
            sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
          >
            <Link to={link.to} style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ width: "25rem" }}>
                {link.label}
              </Button>
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
}
