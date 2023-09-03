import React, { Fragment, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Header from "../Header";
import {
  Box,
  MenuList,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Popover,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../config/config";

const validationSchema = yup.object({
  nombre: yup
    .string("Ingrese su nombre")
    .min(1, "Este campo no puede estar vacio")
    .required("Nombre requerido"),
  apellido: yup
    .string("Ingrese su apellido")
    .min(1, "Este campo no puede estar vacio")
    .required("Apellido requerido"),
  tipoDocumento: yup
    .string("Ingrese su tipo de documento")
    .required("Tipo de documento es requerido"),
  dni: yup.string("Ingrese su DNI").required("DNI requerido").optional(),
  ciudad: yup.string("Ingrese su ciudad").optional(),
  nacionalidad: yup.string("Ingrese su nacionalidad").optional(),
  provincia: yup.string("Ingrese su provincia de residencia").optional(),
  calle: yup.string("Ingrese el nombre de su calle").optional(),
  nro: yup.string("Ingrese altura").optional(),
  telefono: yup.string("Ingrese su telefono de contacto").optional(),
});

export default function WithMaterialUI() {
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var token = sessionStorage.getItem("token");

  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedCiudad, setSelectedCiudad] = useState("");

  useEffect(() => {
    setSelectedTipoDocumento(datosUsuario.Tipo_documento.id || "");
    setSelectedProvincia(datosUsuario.provincia || "");
    setSelectedCiudad(datosUsuario.ciudad || "");
  }, [
    datosUsuario.Tipo_documento.id,
    datosUsuario.provincia,
    datosUsuario.ciudad,
  ]);

  const formatoFechaNacimiento = (fecha) => {
    var fechaNacimiento = new Date(fecha);
    var dia = fechaNacimiento.getDate() + 1;
    var mes = fechaNacimiento.getMonth() + 1;
    var anio = fechaNacimiento.getFullYear();
    return dia + "/" + mes + "/" + anio;
  };

  /*Llama a los TIPOS DE DOCUMENTOS para seleccionar en el formulario*/
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [llamadoTipoDocumento, setLlamadoTipoDocumento] = useState(false);

  const llamarTipoDocumento = async () => {
    if (llamadoTipoDocumento === false) {
      try {
        const api = await fetch(`${config.apiUrl}/tiposDocumento/`);
        const datos = await api.json();
        setTiposDocumentos(datos.tipos_documentos);
        setLlamadoTipoDocumento(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarTipoDocumento();

  const [listaProvincias, setListaProvincias] = useState([]);
  const [llamadoProvincias, setLlamadoProvincias] = useState(false);
  const [provinciaActual, setProvinciaActual] = useState();
  const llamarProvincias = async () => {
    if (llamadoProvincias === false) {
      try {
        const api = await fetch(`${config.apiUrl}/provincias/?`);
        const datos = await api.json();
        setListaProvincias(datos.provincias);
        setLlamadoProvincias(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  llamarProvincias();

  const [listaCiudades, setListaCiudades] = useState([]);
  const llamarCiudades = async (provincia) => {
    if (provinciaActual !== provincia) {
      try {
        const api = await fetch(
          `${config.apiUrl}/ciudades/?idProvincia=${provincia}&`
        );
        const datos = await api.json();
        console.log(datos);
        setListaCiudades(datos.ciudades);
      } catch (error) {
        console.log(error);
      }
      setProvinciaActual(provincia);
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: datosUsuario.nombre,
      apellido: datosUsuario.apellido,

      tipoDocumento: datosUsuario.Tipo_documento.id,
      dni: datosUsuario.id,
      nacionalidad: datosUsuario.nacionalidad,
      provincia: datosUsuario.provincia,
      ciudad: datosUsuario.ciudad,
      calle: datosUsuario.calle,
      nro: datosUsuario.nro,
      telefono: datosUsuario.telefono,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var data = {
        documento: values.dni,
        tipoDocumento: values.tipoDocumento,
        idUsuario: datosUsuario.Usuario.id,
        nombre: values.nombre,
        apellido: values.apellido,
        nacionalidad: values.nacionalidad,

        provincia: values.provincia,
        ciudad: values.ciudad,
        calle: values.calle,
        nro: values.nro,
        telefono: values.telefono,
      };
      fetch(
        `${config.apiUrl}/postulantes/dni/${datosUsuario.id}?authorization=${token}`,
        {
          method: "PUT", // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Sus datos fueron actualizados correctaemente",
        confirmButtonText: "Finalizar",
        text: "Para continuar pulse el boton",
        footer: "",
        showCloseButton: true,
      })
        .then(function (result) {
          if (result.value) {
            axios
              .get(
                `${config.apiUrl}/postulantes/idUsuario/${datosUsuario.Usuario.id}?`
              )
              .then(({ data }) => {
                sessionStorage.setItem("datosUsuario", JSON.stringify(data));
              });
            window.location.href = "/miPerfil/misDatos";
          }
        })
        .catch((err) =>
          console.error(
            "Error:",
            err,
            Swal.fire({
              icon: "error",
              title: "Ocurrio un error al registrarse",
              confirmButtonText: "Volver",
              text: "Verifique sus datos",
              footer: "",
              showCloseButton: true,
            })
          )
        );
    },
  });

  return (
    <Fragment>
      <Header />
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        Datos personales
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <div id="datosPersonales">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  color="primary"
                  variant="outlined"
                  id="nombre"
                  name="nombre"
                  label="Nombre"
                  fullWidth
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nombre &&
                    Boolean(formik.errors.nombre) &&
                    true
                  }
                  helperText={formik.touched.nombre && formik.errors.nombre}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  id="apellido"
                  name="apellido"
                  label="Apellido"
                  fullWidth
                  disabled
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.apellido &&
                    Boolean(formik.errors.apellido) &&
                    true
                  }
                  helperText={formik.touched.apellido && formik.errors.apellido}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  variant="outlined"
                  label="Fecha de nacimiento"
                  value={formatoFechaNacimiento(datosUsuario.fecha_nac)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de documento</InputLabel>
                  <Select
                    labelId="demo-simple-select-error-label"
                    id="tipoDocumento"
                    variant="outlined"
                    name="tipoDocumento"
                    label="Tipo de documento"
                    type="number"
                    fullWidth
                    value={selectedTipoDocumento}
                    onChange={(e) => {
                      setSelectedTipoDocumento(e.target.value);
                    }}
                    error={
                      formik.touched.tipoDocumento &&
                      Boolean(formik.errors.tipoDocumento)
                    }
                    disabled
                  >
                    {tiposDocumentos.map((documento) => (
                      <MenuList
                        className="selectCss"
                        value={documento.id}
                        key={documento.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {documento.tipo_documento}
                        </Box>
                      </MenuList>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="dni"
                  name="dni"
                  label="Numero de documento"
                  type="number"
                  fullWidth
                  disabled
                  variant="outlined"
                  value={formik.values.dni}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dni && Boolean(formik.errors.dni) && true
                  }
                  helperText={formik.touched.dni && formik.errors.dni}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="nacionalidad"
                  name="nacionalidad"
                  label="Nacionalidad"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={formik.values.nacionalidad}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nacionalidad &&
                    Boolean(formik.errors.nacionalidad)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Provincia</InputLabel>
                  <Select
                    labelId="demo-simple-select-error-label"
                    id="provincia"
                    variant="outlined"
                    name="provincia"
                    label="Provincia"
                    type="number"
                    fullWidth
                    value={selectedProvincia}
                    onChange={(e) => {
                      setSelectedProvincia(e.target.value);
                      setSelectedCiudad("");
                    }}
                    error={
                      formik.touched.tipoDocumento &&
                      Boolean(formik.errors.tipoDocumento)
                    }
                  >
                    {listaProvincias.map((provincia) => (
                      <MenuList
                        className="selectCss"
                        value={provincia.id}
                        key={provincia.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {provincia.nombre}
                        </Box>
                      </MenuList>
                    ))}
                  </Select>
                </FormControl>
                {formik.values.provincia === undefined ? null : (
                  <Popover>
                    {console.log("aca" + formik.values.provincia)}
                    {llamarCiudades(formik.values.provincia)}
                    {console.log("aaaaaaaaaaaa" + formik.values.provincia)}
                    {listaCiudades.map((ciudad) => (
                      <MenuList
                        className="selectCss"
                        value={ciudad.id}
                        key={ciudad.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {ciudad.nombre}
                        </Box>
                      </MenuList>
                    ))}
                  </Popover>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Ciudad</InputLabel>
                  <Select
                    labelId="demo-simple-select-error-label"
                    id="ciudad"
                    variant="outlined"
                    name="ciudad"
                    label="Ciudad"
                    type="number"
                    fullWidth
                    value={selectedCiudad}
                    onChange={(e) => {
                      setSelectedCiudad(e.target.value);
                    }}
                    error={
                      formik.touched.tipoDocumento &&
                      Boolean(formik.errors.tipoDocumento)
                    }
                  >
                    {listaCiudades.map((ciudad) => (
                      <MenuList
                        className="selectCss"
                        value={ciudad.id}
                        key={ciudad.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {ciudad.nombre}
                        </Box>
                      </MenuList>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="calle"
                  name="calle"
                  variant="outlined"
                  label="Nombre de calle"
                  fullWidth
                  value={formik.values.calle}
                  onChange={formik.handleChange}
                  error={formik.touched.calle && Boolean(formik.errors.calle)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="nro"
                  name="nro"
                  variant="outlined"
                  label="Altura de calle"
                  type="number"
                  fullWidth
                  value={formik.values.nro}
                  onChange={formik.handleChange}
                  error={formik.touched.nro && Boolean(formik.errors.nro)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="telefono"
                  name="telefono"
                  variant="outlined"
                  label="Telefono de contacto"
                  type="number"
                  fullWidth
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.telefono && Boolean(formik.errors.telefono)
                  }
                />
              </Grid>
            </Grid>
          </div>

          <Button
            style={{ display: "flex", margin: "1rem" }}
            id="confirmar"
            variant="contained"
            type="submit"
          >
            Confirmar
          </Button>
        </form>
      </Box>
    </Fragment>
  );
}
