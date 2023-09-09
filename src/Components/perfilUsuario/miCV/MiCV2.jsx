import { useState } from "react";
import Header from "../../Header";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { config } from "../../../config/config";
import { supabase } from "../../../supabase/supabase.config";
import Swal from "sweetalert2";

const MiCV2 = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const id = datosUsuario.id;
  const token = sessionStorage.getItem("token");

  const [pdf, setPdf] = useState();
  const [pdfURL, setPdfURL] = useState(datosUsuario.cv);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.storage
      .from("files")
      .upload(pdf.name, pdf);
    console.log(error);

    const { data, error: error2 } = await supabase.storage
      .from("files")
      .createSignedUrl(pdf.name, 6000);
    console.log(data);
    console.log(error2);

    try {
      const response = await axios.put(
        `${config.apiUrl}/postulantes/dni/${id}?authorization=${token}`,
        { cv: data.signedUrl }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

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
        await axios
          .get(`${config.apiUrl}/postulantes/dni/${id}`)
          .then(({ data }) => {
            console.log(data);
            sessionStorage.setItem("datosUsuario", JSON.stringify(data));
          });
      }
    });
  };

  const handleOpenPDF = () => {
    window.open(pdfURL, "_blank");
  };

  const handleFileSelected = (e) => {
    setPdf(e.target.files[0]);
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
        <input type="file" onChange={handleFileSelected} />
        <input type="submit" value="Subir CV" />
      </Box>
    </>
  );
};

export default MiCV2;
