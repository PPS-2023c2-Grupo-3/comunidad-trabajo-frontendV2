import { useState } from "react";
import Header from "../../Header";
import { Box, Button, Typography } from "@mui/material";
import { supabase } from "../../../supabase/supabase.config";
import Swal from "sweetalert2";
import {
  getPostulanteByDni,
  putPostulante,
} from "../../../services/postulantes_service";

const MiCV2 = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const id = datosUsuario.id;
  const token = sessionStorage.getItem("token");

  const [pdf, setPdf] = useState();
  const [pdfURL, setPdfURL] = useState(datosUsuario.cv);

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["pdf", "docx"];
      if (allowedExtensions.includes(fileExtension)) {
        setPdf(selectedFile);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Solo se permiten archivos PDF o DOCX",
          footer: "",
          showCloseButton: true,
        });
      }
    }
  };

  const handleOpenPDF = () => {
    window.open(pdfURL, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.storage
        .from("files")
        .upload(pdf.name, pdf);

      if (error) {
        console.log(error);
        return;
      }

      const { data, error: error2 } = await supabase.storage
        .from("files")
        .createSignedUrl(pdf.name, 999999999999999);

      if (error2) {
        console.log(error2);
        return;
      }

      await putPostulante(
        id,
        {
          cv: data.signedUrl,
        },
        token
      );

      setPdfURL(data.signedUrl);

      Swal.fire({
        icon: "success",
        title: "Su CV fue actualizado correctamente",
        confirmButtonText: "Finalizar",
        text: "Para continuar pulse finalizar",
        footer: "",
        showCloseButton: true,
      }).then(async function (result) {
        if (result.value) {
          const postulante = await getPostulanteByDni(id);
          sessionStorage.setItem("datosUsuario", JSON.stringify(postulante));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
        <Typography variant="h4">Mi CV</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "25rem" }}
          onClick={handleOpenPDF}
        >
          Ver CV
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        <input type="file" accept=".pdf,.docx" onChange={handleFileSelected} />
        <input type="submit" value="Subir CV" />
      </Box>
    </>
  );
};

export default MiCV2;
