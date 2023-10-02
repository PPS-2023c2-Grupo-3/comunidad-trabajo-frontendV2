import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  TextField,
  Button,
  MenuList,
} from "@mui/material";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import Header from "../Header";
import { getEstudios } from "../../services/estudios_service";
import { getCarreras } from "../../services/carreras_service";
import { getJornadas } from "../../services/jornadas_service";
import { getTiposContratos } from "../../services/contratos_service";
import { postOferta } from "../../services/ofertas_service";

const validationSchema = yup.object({
  tituloOferta: yup
    .string("Ingrese un título para la oferta")
    .min(1, "Este campo no puede estar vacío")
    .optional("El título de la oferta es requerido"),
  descripcion: yup
    .string("Ingrese una descripción para la oferta")
    .min(1, "Este campo no puede estar vacío")
    .optional("Descripción requerida"),
  fechaVigencia: yup
    .string("Ingrese la fecha de vigencia")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  horarioLaboralDesde: yup
    .number("Ingrese el horario laboral desde")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  edadDesde: yup
    .number("Ingrese la edad desde")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  edadHasta: yup
    .number("Ingrese la edad hasta")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  experienciaPreviaDesc: yup
    .string("Descripción de experiencia previa")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  zonaTrabajo: yup
    .string("Ingrese la zona de trabajo")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  areasEstudio: yup
    .string("Ingrese las áreas de estudio")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  otrosDetalles: yup
    .string("Ingrese otros detalles de la oferta")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  beneficios: yup
    .string("Ingrese los beneficios de la oferta")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  remuneracion: yup
    .number("Ingrese la remuneración")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  idEstudio: yup
    .number("Seleccione el nivel de estudio")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  idCarrera: yup
    .number("Seleccione la carrera")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  idContrato: yup
    .number("Seleccione el tipo de contrato")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
  idJornada: yup
    .number("Seleccione la jornada")
    .min(1, "Este campo no puede estar vacío")
    .optional(),
});

export default function WithMaterialUI() {
  const history = useHistory();
  const [listaEstudio, setListaEstudio] = useState([]);
  const [listaCarrera, setListaCarrera] = useState([]);
  const [listaJornada, setListaJornada] = useState([]);
  const [listaContrato, setListaContrato] = useState([]);

  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const llamarEstudios = async () => {
      try {
        const response = await getEstudios();
        setListaEstudio(response.estudios);
      } catch (error) {
        console.log(error);
      }
    };
    llamarEstudios();

    const llamarCarreras = async () => {
      try {
        const response = await getCarreras();
        setListaCarrera(response.carreras);
      } catch (error) {
        console.log(error);
      }
    };
    llamarCarreras();

    const llamarJornada = async () => {
      try {
        const response = await getJornadas();
        setListaJornada(response.jornadas);
      } catch (error) {
        console.log(error);
      }
    };
    llamarJornada();

    const llamarContrato = async () => {
      try {
        const response = await getTiposContratos();
        setListaContrato(response.contratos);
      } catch (error) {
        console.log(error);
      }
    };
    llamarContrato();
  }, []);

  console.log("Componente");

  const formik = useFormik({
    initialValues: {
      tituloOferta: "",
      descripcion: "",
      fechaVigencia: undefined,
      horarioLaboralDesde: "",
      horarioLaboralHasta: "",
      edadHasta: "",
      edadDesde: "",
      experienciaPreviaDesc: "",
      zonaTrabajo: "",
      areasEstudio: "",
      otrosDetalles: "",
      beneficios: "",
      idEmpresa: datosUsuario.id,
      remuneracion: undefined,
      idEstudio: "",
      idCarrera: "",
      idContrato: "",
      idJornada: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        idEmpresa: datosUsuario.id,
        idCarrera: values.idCarrera,
        idContrato: values.idContrato,
        idEstudio: values.idEstudio,
        idJornada: values.idJornada,
        fechaVigencia: values.fechaVigencia,
        tituloOferta: values.tituloOferta,
        descripcion: values.descripcion,
        horarioLaboralDesde: values.horarioLaboralDesde,
        horarioLaboralHasta: values.horarioLaboralHasta,
        edadHasta: values.edadHasta,
        edadDesde: values.edadDesde,
        experienciaPreviaDesc: values.experienciaPreviaDesc,
        zonaTrabajo: values.zonaTrabajo,
        areasEstudio: values.areasEstudio,
        otrosDetalles: values.otrosDetalles,
        beneficios: values.beneficios,
        remuneracion: values.remuneracion,
      };
      {
        console.log("aaa");
      }

      postOferta(data, token).then((response) => {
        if (response) {
          Swal.fire({
            icon: "success",
            title: "La oferta fue creada exitosamente",
            confirmButtonText: "Finalizar",
            text: "Para continuar, pulse el botón",
            footer: "",
            showCloseButton: true,
          }).then(function (result) {
            if (result.value) {
              history.push("/listadoOfertasEmpresa");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ocurrió un error al crear la oferta",
            confirmButtonText: "Volver",
            text: "Verifique sus datos",
            footer: "",
            showCloseButton: true,
          });
        }
      });
    },
  });

  return (
    <>
      <Header />
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        Datos de oferta
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              container
              spacing={2}
            >
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  variant="outlined"
                  id="tituloOferta"
                  name="tituloOferta"
                  label="Nombre de la oferta"
                  fullWidth
                  value={formik.values.tituloOferta}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.tituloOferta &&
                    Boolean(formik.errors.tituloOferta) &&
                    true
                  }
                  helperText={
                    formik.touched.tituloOferta && formik.errors.tituloOferta
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  variant="outlined"
                  id="descripcion"
                  name="descripcion"
                  label="Descripción"
                  fullWidth
                  multiline
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
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  variant="outlined"
                  id="fechaVigencia"
                  name="fechaVigencia"
                  label="Fecha de vigencia"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formik.values.fechaVigencia || ""}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fechaVigencia &&
                    Boolean(formik.errors.fechaVigencia)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="horarioLaboralDesde"
                  name="horarioLaboralDesde"
                  label="Horario laboral desde:"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.horarioLaboralDesde}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.horarioLaboralDesde &&
                    Boolean(formik.errors.horarioLaboralDesde) &&
                    true
                  }
                  helperText={
                    formik.touched.horarioLaboralDesde &&
                    formik.errors.horarioLaboralDesde
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="horarioLaboralHasta"
                  name="horarioLaboralHasta"
                  label="Horario laboral hasta:"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={formik.values.horarioLaboralHasta}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.horarioLaboralHasta &&
                    Boolean(formik.errors.horarioLaboralHasta)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="edadDesde"
                  name="edadDesde"
                  label="Edad desde: "
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={formik.values.edadDesde}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.edadDesde && Boolean(formik.errors.edadDesde)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="edadHasta"
                  name="edadHasta"
                  variant="outlined"
                  label="Edad hasta:"
                  type="number"
                  fullWidth
                  value={formik.values.edadHasta}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.edadHasta && Boolean(formik.errors.edadHasta)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="experienciaPreviaDesc"
                  name="experienciaPreviaDesc"
                  variant="outlined"
                  label="Experiencia previa descripcion"
                  fullWidth
                  value={formik.values.experienciaPreviaDesc}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.experienciaPreviaDesc &&
                    Boolean(formik.errors.experienciaPreviaDesc)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="zonaTrabajo"
                  name="zonaTrabajo"
                  variant="outlined"
                  label="Zona de trabajo"
                  fullWidth
                  value={formik.values.zonaTrabajo}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.zonaTrabajo &&
                    Boolean(formik.errors.zonaTrabajo)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="areasEstudio"
                  name="areasEstudio"
                  variant="outlined"
                  label="Areas de estudio"
                  fullWidth
                  value={formik.values.areasEstudio}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.areasEstudio &&
                    Boolean(formik.errors.areasEstudio)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="otrosDetalles"
                  name="otrosDetalles"
                  variant="outlined"
                  label="Otros detalles"
                  fullWidth
                  multiline
                  value={formik.values.otrosDetalles}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.otrosDetalles &&
                    Boolean(formik.errors.otrosDetalles)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="beneficios"
                  name="beneficios"
                  variant="outlined"
                  label="Beneficios"
                  fullWidth
                  value={formik.values.beneficios}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.beneficios &&
                    Boolean(formik.errors.beneficios)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  id="remuneracion"
                  name="remuneracion"
                  variant="outlined"
                  label="Remuneración"
                  fullWidth
                  type="number"
                  value={formik.values.remuneracion}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.remuneracion &&
                    Boolean(formik.errors.remuneracion)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <FormControl fullWidth>
                  <InputLabel>Estudio</InputLabel>
                  <Select
                    id="idEstudio"
                    name="idEstudio"
                    label="Nivel de estudio"
                    variant="outlined"
                    type="number"
                    value={formik.values.idEstudio}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.idEstudio &&
                      Boolean(formik.errors.idEstudio)
                    }
                  >
                    {listaEstudio.map((estudio) => (
                      <MenuList
                        className="selectCss"
                        value={estudio.id}
                        key={estudio.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {estudio.id}: {estudio.nombre_estudio} -{" "}
                          {estudio.estado_estudio}
                        </Box>
                      </MenuList>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <FormControl fullWidth>
                  <InputLabel>Carrera</InputLabel>
                  <Select
                    id="idCarrera"
                    name="idCarrera"
                    variant="outlined"
                    label="Carrera"
                    type="number"
                    value={formik.values.idCarrera}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.idCarrera &&
                      Boolean(formik.errors.idCarrera)
                    }
                  >
                    {listaCarrera.map((carrera) => (
                      <MenuList
                        className="selectCss"
                        value={carrera.id}
                        key={carrera.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {" "}
                          {carrera.id}: {carrera.nombre_carrera}
                        </Box>
                      </MenuList>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <FormControl fullWidth>
                  <InputLabel>Jornada</InputLabel>
                  <Select
                    id="idJornada"
                    name="idJornada"
                    label="Ingrese la jornada"
                    variant="outlined"
                    type="number"
                    value={formik.values.idJornada}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.idJornada &&
                      Boolean(formik.errors.idJornada)
                    }
                  >
                    {listaJornada.map((jornada) => (
                      <MenuList
                        className="selectCss"
                        value={jornada.id}
                        key={jornada.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {jornada.id} : {jornada.nombre_jornada}
                        </Box>
                      </MenuList>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <FormControl fullWidth>
                  <InputLabel>Contrato</InputLabel>
                  <Select
                    id="idContrato"
                    name="idContrato"
                    variant="outlined"
                    label="Tipo de contrato"
                    type="number"
                    value={formik.values.idContrato}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.idContrato &&
                      Boolean(formik.errors.idContrato)
                    }
                  >
                    {listaContrato.map((contrato) => (
                      <MenuList
                        className="selectCss"
                        value={contrato.id}
                        key={contrato.id}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {" "}
                          {contrato.id} : {contrato.nombre_contrato}
                        </Box>
                      </MenuList>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Button
                  fullWidth
                  id="confirmar"
                  variant="contained"
                  type="submit"
                >
                  Confirmar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </>
  );
}
