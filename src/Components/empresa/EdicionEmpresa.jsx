import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Header from "../Header";
import { config } from "../../config/config";
import {
  Box,
  Select,
  InputLabel,
  FormControl,
  Typography,
  MenuList,
  Popover,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import axios from "axios";

const validationSchema = yup.object({
  nombreEmpresa: yup
    .string("Ingrese su un titulo para la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional("El titulo de la oferta requerido"),
  cuit: yup
    .number("Ingrese una cuit a la cuit")
    .min(1, "Este campo no puede estar vacio")
    .optional("cuit requerido"),
  descripcion: yup
    .string("Ingrese su horario laboral desde")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  ciudad: yup
    .string("Ingrese su edad hasta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  provincia: yup.string("Ingrese su edad desde de residencia").optional(),
  calle: yup
    .string("cuit de experiencia previa")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  nro: yup
    .number("Ingrese altura")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  piso: yup
    .string("Ingrese su piso de contacto")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  depto: yup
    .string("Ingrese otros detalles de la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  cp: yup
    .string("Ingrese otros detalles de la oferta")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  telefono: yup
    .number("Ingrese la telefono")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  web: yup
    .string("Ingrese la web")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  nombreRepresentante: yup
    .string("Ingrese la nombreRepresentante")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  emailRepresentante: yup
    .string("Ingrese la emailRepresentante")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  idRubro: yup
    .number("Ingrese la telefono")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  idEstado: yup
    .number("Ingrese la telefono")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
  idUsuario: yup
    .number("Ingrese la telefono")
    .min(1, "Este campo no puede estar vacio")
    .optional(),
});

export default function WithMaterialUI() {
  var datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  var token = sessionStorage.getItem("token");
  var idUsuario = parseInt(sessionStorage.getItem("idUsuario"));
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
  const [llamadoCiudades, setLlamadoCiudades] = useState(false);
  const llamarCiudades = async (provincia) => {
    if (provinciaActual !== provincia) {
      try {
        const api = await fetch(
          `${config.apiUrl}/ciudades/?idProvincia=${provincia}&`
        );
        const datos = await api.json();
        console.log(datos);
        setListaCiudades(datos.ciudades);
        setLlamadoCiudades(true);
      } catch (error) {
        console.log(error);
      }
      setProvinciaActual(provincia);
    }
  };

  const formik = useFormik({
    initialValues: {
      nombreEmpresa: datosUsuario.nombre_empresa,
      cuit: datosUsuario.id,
      descripcion: datosUsuario.descripcion,
      pais: "Argentina",
      provincia: datosUsuario.provincia,
      ciudad: datosUsuario.ciudad,
      calle: datosUsuario.calle,
      nro: datosUsuario.nro,
      piso: datosUsuario.piso,
      depto: datosUsuario.depto,
      cp: datosUsuario.cp,
      telefono: datosUsuario.telefono,
      web: datosUsuario.web,
      nombreRepresentante: datosUsuario.nombre_representante,
      emailRepresentante: datosUsuario.email_representante,
      idUsuario: idUsuario,
      idRubro: 1,
      idEstado: 2,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      var data = {
        nombreEmpresa: datosUsuario.nombre_empresa,
        cuit: parseInt(datosUsuario.id),
        idUsuario: idUsuario,
        idRubro: 1,
        idEstado: 2,
        descripcion: values.descripcion,
        pais: "Argentina",
        provincia: values.provincia,
        ciudad: values.ciudad,
        calle: values.calle,
        nro: values.nro,
        piso: values.piso,
        depto: values.depto,
        cp: values.cp,
        telefono: values.telefono,
        web: values.web,
        nombreRepresentante: values.nombreRepresentante,
        emailRepresentante: values.emailRepresentante,
      };
      console.log(data);
      await fetch(
        `${config.apiUrl}/empresas/cuit/${datosUsuario.id}?authorization=${token}`,
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
        title: "La empresa fue editada exitosamente",
        confirmButtonText: "Finalizar",
        text: "Para continuar pulse el boton",
        footer: "",
        showCloseButton: true,
      })
        .then(function (result) {
          if (result.value) {
            axios
              .get(`${config.apiUrl}/empresas/idUsuario/${idUsuario}&`)
              .then(({ data }) => {
                sessionStorage.setItem("datosUsuario", JSON.stringify(data));
              });
            window.location = "empresaDatosPrivado";
          }
        })
        .catch((err) =>
          console.error(
            "Error:",
            err,
            Swal.fire({
              icon: "error",
              title: "Ocurrio un error al editar la empresa",
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
        Edicion de empresa
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="descripcion"
                  name="descripcion"
                  label="Descripcion"
                  fullWidth
                  variant="outlined"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.descripcion &&
                    Boolean(formik.errors.descripcion) &&
                    true
                  }
                  helperText={
                    formik.touched.descripcion && formik.errors.descripcion
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="pais"
                  name="pais"
                  label="Argentina"
                  variant="outlined"
                  fullWidth
                  disabled
                  value={formik.values.pais}
                  onChange={formik.handleChange}
                  error={formik.touched.pais && Boolean(formik.errors.pais)}
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
                    value={formik.values.provincia}
                    onChange={formik.handleChange}
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
                    value={formik.values.ciudad}
                    onChange={formik.handleChange}
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
                  label="Calle"
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
                  label="Numero"
                  fullWidth
                  type="number"
                  value={formik.values.nro}
                  onChange={formik.handleChange}
                  error={formik.touched.nro && Boolean(formik.errors.nro)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="piso"
                  name="piso"
                  variant="outlined"
                  label="Piso"
                  fullWidth
                  type="number"
                  value={formik.values.piso}
                  onChange={formik.handleChange}
                  error={formik.touched.piso && Boolean(formik.errors.piso)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="depto"
                  name="depto"
                  variant="outlined"
                  label="Depto"
                  fullWidth
                  value={formik.values.depto}
                  onChange={formik.handleChange}
                  error={formik.touched.depto && Boolean(formik.errors.depto)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="cp"
                  name="cp"
                  variant="outlined"
                  label="Codigo postal"
                  fullWidth
                  type="number"
                  value={formik.values.cp}
                  onChange={formik.handleChange}
                  error={formik.touched.cp && Boolean(formik.errors.cp)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="telefono"
                  name="telefono"
                  variant="outlined"
                  label="Telefono"
                  fullWidth
                  type="number"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.telefono && Boolean(formik.errors.telefono)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="web"
                  name="web"
                  variant="outlined"
                  label="Web"
                  fullWidth
                  value={formik.values.web}
                  onChange={formik.handleChange}
                  error={formik.touched.web && Boolean(formik.errors.web)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="nombreRepresentante"
                  name="nombreRepresentante"
                  variant="outlined"
                  label="Nombre representante"
                  fullWidth
                  value={formik.values.nombreRepresentante}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nombreRepresentante &&
                    Boolean(formik.errors.nombreRepresentante)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  id="emailRepresentante"
                  name="emailRepresentante"
                  variant="outlined"
                  label="Email del representante"
                  fullWidth
                  value={formik.values.emailRepresentante}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.emailRepresentante &&
                    Boolean(formik.errors.emailRepresentante)
                  }
                />
              </Grid>
            </Grid>
          </div>
          <Box>
            <Button
              style={{ display: "flex", margin: "1rem" }}
              id="confirmar"
              variant="contained"
              type="submit"
            >
              Confirmar
            </Button>
          </Box>
        </form>
      </Box>
    </Fragment>
  );
}
