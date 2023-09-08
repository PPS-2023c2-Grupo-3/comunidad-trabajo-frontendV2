import { Fragment } from "react";
import Header from "../../Header";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { config } from "../../../config/config";
import { supabase } from "../../../supabase/supabase.config";

let pdfURL = ``;

const MiCV = () => {
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var token = sessionStorage.getItem("token");
  // const [pdf, setPdf] = useState();
  const [uploadCV, setUploadCV] = useState(null);
  function timeoutReload() {
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }
  const [isPDFReady, setIsPDFReady] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", uploadCV);

      const { error } = await supabase.storage
        .from("files")
        .upload(uploadCV.name, uploadCV);
      pdfURL = `${config.apiUrl}/storage/v1/object/public/files/${uploadCV.name}`;

      if (error) {
        console.error("Error al cargar el archivo PDF: ", error.message);
        return;
      }

      setIsPDFReady(true);

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
            .get(
              `${config.apiUrl}/postulantes/idUsuario/${datosUsuario.Usuario.id}`
            )
            .then(({ data }) => {
              console.log(data);
              sessionStorage.setItem("datosUsuario", JSON.stringify(data));
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenPDF = () => {
    if (isPDFReady) {
      // Abre la URL del PDF en una nueva ventana o pestaña del navegador
      window.open(pdfURL, "_blank");
    }
  };

  const handleFileSelect = (e) => {
    setUploadCV(e.target.files[0]);
  };

  // function splitFileName(str) {
  //   return str.split("|")[1];
  // }

  // useEffect(() => {
  //   const traerPdf = async () => {
  //     const fetchedData = await axios.get(`${config.apiUrl}/files/`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         type: "application/pdf",
  //         file: splitFileName(datosUsuario.cv),
  //         authorization: token,
  //       },
  //       responseType: "blob",
  //     });

  //     console.log(fetchedData);
  //     const pdfBlob = new Blob([fetchedData.data], { type: "application/pdf" });
  //     console.log(pdfBlob);
  //     const virtualUrl = URL.createObjectURL(pdfBlob);
  //     console.log(virtualUrl);
  //     setPdf(virtualUrl);
  //   };
  //   traerPdf();
  // }, [datosUsuario.cv, token]);

  // function abrirPdf() {
  //   window.open(pdf);
  // }

  const handleOpenPDF2 = async () => {
    if (!uploadCV) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se ha cargado ningún CV",
        footer: "",
        showCloseButton: true,
      });
      return;
    }
    const { data, error } = await supabase.storage
      .from("files")
      .createSignedUrl(uploadCV.name, 60);

    if (error) {
      console.error("Error al cargar el archivo PDF: ", error.message);
      return;
    }

    window.open(data.signedUrl, "_blank");
  };

  return (
    <Fragment>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
        <Typography variant="h4">Mi CV</Typography>
      </Box>
      <Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleOpenPDF2}
            sx={{ width: "25rem" }}
          >
            VER MI CV
          </Button>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={handleFileSelect} />
            <input type="submit" value="SUBIR CV" />
          </form>
        </Box>
      </Box>
    </Fragment>
  );
};

export default MiCV;
