import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Header from '../Header';
import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import DatosUsuarioContextProvider from '../../Context/DatosUsuarioContext';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { config } from '../../config/config';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function DividerText() {
  const { id } = useParams();
  const [nombrePostulante, setNombrePostulante] = useState()
  const [apellidoPostulante, setApellidoPostulante] = useState()
  const [emailPostulante, setEmailPostulante] = useState()
  const [telefonoPostulante, setTelefonoPostulante] = useState()
  const [paisPostulante, setPaisPostulante] = useState()
  const [provinciaPostulante, setProvinciaPostulante] = useState()
  const [ciudadPostulante, setCiudadPostulante] = useState()
  const [fechaNacPostulante, setFechaNacPostulante] = useState()
  axios.get(`${config.apiUrl}/postulantes/dni/${id}`)
    .then(({ data }) => {
      setNombrePostulante(data.nombre)
      setApellidoPostulante(data.apellido)
      setEmailPostulante(data.Usuario.usuario)
      setTelefonoPostulante(data.telefono)
      setPaisPostulante(data.pais)
      setProvinciaPostulante(data.Provincia.nombre)
      setCiudadPostulante(data.Ciudad.nombre)
      setFechaNacPostulante(data.fecha_nac)
    })

  const formatoFechaNacimiento = (fecha) => {
    var fechaNacimiento = new Date(fecha);
    var hora = fechaNacimiento.getHours();
    var dia = fechaNacimiento.getDate() + 1;
    var mes = fechaNacimiento.getMonth() + 1;
    var anio = fechaNacimiento.getFullYear();
    return dia + "/" + mes + "/" + anio;
  }
  return (
    <React.Fragment>
      <Header />
      <Typography style={{ margin: "2rem" }}>
        <Root>
          <Divider>
            <Chip sx={{ backgroundColor: '#009688', color: '#ffffff' }} label="SOBRE EL POSTULANTE" />
          </Divider>
          <Box>
            <Typography sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">Nombre:</Typography>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">{nombrePostulante} {apellidoPostulante}</Typography>
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">Fecha de nacimiento:</Typography>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">{formatoFechaNacimiento(fechaNacPostulante)}</Typography>
            </Typography>
          </Box>
          <Divider>
            <Chip sx={{ backgroundColor: '#009688', color: '#ffffff' }} label="CONTACTO" />
          </Divider>
          <Box>
            <Typography sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">Email:</Typography>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">{emailPostulante}</Typography>
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">Número de contacto:</Typography>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">+54 9 {telefonoPostulante}</Typography>
            </Typography>
          </Box>
          <Divider>
            <Chip sx={{ backgroundColor: '#009688', color: '#ffffff' }} label="UBICACIÓN" />
          </Divider>
          <Box>
            <Typography sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">País:</Typography>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">{paisPostulante}</Typography>
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">Provincia:</Typography>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">{provinciaPostulante}</Typography>
            </Typography>
            <Typography sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">Ciudad:</Typography>
              <Typography sx={{ fontSize: "20px", paddingLeft: "0.5rem" }} variant="body1">{ciudadPostulante}</Typography>
            </Typography>
          </Box>
        </Root>
      </Typography>
    </React.Fragment>
  );

}
