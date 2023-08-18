import React, { Fragment, useState } from 'react'

import Header from "../../Header"
import { Box, Button, Pagination, Typography } from '@mui/material';
import BarraBusquedaOfertas from './BarraBusquedaOfertas';
import ListaOfertasFinalizadas from './ListaOfertasFinalizadas';
import BusquedaNoEncontrada from './BusquedaNoEncontrada';
import { Link } from 'react-router-dom';
import {config} from '../../../config/config'


const ListadoOfertas = () => {


    const [llamado, setLlamado] = useState(false);
    const [ofertas, setOfertas] = useState([]);
    const [cantPaginas, setCantPaginas] = useState(0);
    const [pagina, setPagina] = useState(1);
    const [busquedaActual, setBusquedaActual] = useState('');

    const API_URL = `${config.apiUrl}/ofertas/?pagina=0&limite=6&idEstado=5&ordenar=id`;

    const primerLlamado = async () => {
        if (llamado === false) {
            try {
                const api = await fetch(API_URL);
                const datos = await api.json();
                setLlamado(true)
                setOfertas(datos.ofertas.rows)
                setCantPaginas(datos.totalPaginas)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const traerOfertas = async (e, p) => {
        try {
            e.preventDefault()
            const { oferta } = e.target.elements;
            const ofertaValue = oferta.value;
            setBusquedaActual(ofertaValue);
            const api = await fetch(`${config.apiUrl}/ofertas/?pagina=0&limite=6&idEstado=5&ordenar=id&buscarTitulo=${ofertaValue}`);
            const datos = await api.json();
            console.log(datos)
            setPagina(1)
            setOfertas(datos.ofertas.rows)
            setCantPaginas(datos.totalPaginas)
            console.log(ofertas)
        }
        catch (err) {
            console.log(err)
        }
    }

    const cambiarPagina = async (e, p) => {

        const api = await fetch(`${config.apiUrl}/ofertas/?pagina=${p - 1}&limite=6&ordenar=id&buscarTitulo=${busquedaActual}&idEstado=5`);
        const datos = await api.json();
        setOfertas(datos.ofertas.rows);
        setPagina(p)
        console.log(datos.ofertas.rows)
    }


    primerLlamado()
    return (
        <Fragment>
            <Header />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ textAlign: 'center', margin: "1rem" }}>Ofertas finalizadas </Typography>
                <BarraBusquedaOfertas
                    traerOfertas={traerOfertas} /></Box>
            {ofertas.length === 0 && llamado === true ?
                <BusquedaNoEncontrada /> :
                <ListaOfertasFinalizadas
                    ofertas={ofertas} />}
            <Pagination color="primary" count={cantPaginas} page={pagina} onChange={cambiarPagina} sx={{ display: "flex", justifyContent: "center", margin: "1rem" }} />
        </Fragment>
    );
}

export default ListadoOfertas;