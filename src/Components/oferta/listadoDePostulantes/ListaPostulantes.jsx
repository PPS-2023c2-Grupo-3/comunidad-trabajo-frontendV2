import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ListaPostulantes({postulantes}) {
  
  const contactar = async (idPostulacion) => {
    var data = {
      contactado: true
    };
      await fetch(`https://comunidad-backend-v3.herokuapp.com/postulaciones/${idPostulacion}`, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
      
      })
      Swal.fire({
        icon: 'success',
        title: 'El postulante fue contactado',
        confirmButtonText: 'Finalizar',
        text: 'Para continuar pulse el boton',
        footer: '',
        showCloseButton: true
      })
      .then(
        window.location.reload()
      )
      .catch((error) => console.error("Error:", error,
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al contactar al postulante',
        confirmButtonText: 'Volver',
        text: 'Verifique sus datos',
        footer: '',
        showCloseButton: true
      })),)
  }
  

  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h6'>Nombre</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>DNI</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Telefono</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>CV</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Contactado</Typography></TableCell>
            <TableCell align="center"><Typography variant='h6'>Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postulantes.map((postulante) => (
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {postulante.Postulante.nombre} {postulante.Postulante.apellido}
              </TableCell>
              <TableCell align="center"><Typography variant="body1">{postulante.Postulante.id}</Typography></TableCell>
              <TableCell align="center"><Typography variant="body1"></Typography>{postulante.Postulante.telefono}</TableCell>
              <TableCell align="center"><Typography variant="body1">{postulante.Postulante.email}</Typography></TableCell>
              <TableCell align="center"><Typography variant="body1"></Typography>{postulante.contactado? "si" : "no" }</TableCell>
              <TableCell align="center">
                <Link to={`/postulante/${postulante.Postulante.id}`} style={{textDecoration:'none'}}>
                  <Button variant="contained" color='relaxed'sx={{margin:"0.5rem"}}>
                    Ver
                  </Button>
                </Link>
                <Button variant="outlined" color='error'sx={{margin:"0.5rem"}}>Borrar</Button>
                <Button variant="contained" color='info'sx={{margin:"0.5rem"}} onClick={ async ()=> contactar(postulante.id)} >Contactado</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}