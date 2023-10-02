import { useContext, useEffect, useState, useRef } from "react";
import { Avatar, Box, Button, Stack } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Header from "../Header";
import DatosUsuarioContextProvider from "../../Context/DatosUsuarioContext";
import Swal from "sweetalert2";

import {
  getEmpresaByIdUsuario,
  putEmpresa,
  getEmpresaByCuit,
} from "../../services/empresas_service";
import { supabase } from "../../supabase/supabase.config";

export default function PerfilEmpresa() {
  const { cambiarDatosUsuario } = useContext(DatosUsuarioContextProvider);
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const token = sessionStorage.getItem("token");
  const idUsuario = sessionStorage.getItem("idUsuario");
  const uploadFoto = useRef(null);
  const [photoURL, setPhotoURL] = useState("");

  const [llamado, setLlamado] = useState(false);

  useEffect(() => {
    async function actualizarDatos() {
      if (!llamado) {
        const response = await getEmpresaByIdUsuario(idUsuario);
        cambiarDatosUsuario(response);
        setLlamado(true);
      }
    }
    actualizarDatos();
  }, [cambiarDatosUsuario, idUsuario, llamado]);

  useEffect(() => {
    async function fetchPhotoURL() {
      try {
        const response = await getEmpresaByIdUsuario(idUsuario);
        const fotoValor = response.logo;
        setPhotoURL(fotoValor);
      } catch (error) {
        console.error(
          "Error al obtener el valor de 'foto' desde el backend:",
          error
        );
      }
    }

    fetchPhotoURL();
  }, [idUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", uploadFoto.current);

      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(uploadFoto.current.name, uploadFoto.current);

      if (uploadError) {
        console.error("Error al cargar el archivo: ", uploadError.message);
        return;
      }

      const { data: signedURLData, error: signedURLError } =
        await supabase.storage
          .from("files")
          .createSignedUrl(uploadFoto.current.name, 999999999999999);

      if (signedURLError) {
        console.error(
          "Error al obtener la URL firmada: ",
          signedURLError.message
        );
        return;
      }

      const newPhotoURL = signedURLData.signedUrl;
      setPhotoURL(newPhotoURL);

      const response = await putEmpresa(
        datosUsuario.id,
        { logo: newPhotoURL },
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
        if (result.isConfirmed) {
          const response = await getEmpresaByCuit(datosUsuario.id);
          sessionStorage.setItem("datosUsuario", JSON.stringify(response));
          window.location.reload();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileSelect = (e) => {
    uploadFoto.current = e.target.files[0];
  };

  return (
    <>
      <Header />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "center",
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
          <Box sx={{ padding: "1rem" }}>
            <h1 style={{ display: "flex" }}>{datosUsuario.nombre_empresa}</h1>
            <h3 style={{ display: "flex" }}>{datosUsuario.web}</h3>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link to="/empresaDatosPrivado" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ width: "25rem" }}>
              Datos
            </Button>
          </Link>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link to="/listadoOfertasEmpresa" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ width: "25rem" }}>
              Ver ofertas
            </Button>
          </Link>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link to="/RegistroOferta" style={{ textDecoration: "none" }}>
            <Button variant="contained" sx={{ width: "25rem" }}>
              Crear oferta
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
