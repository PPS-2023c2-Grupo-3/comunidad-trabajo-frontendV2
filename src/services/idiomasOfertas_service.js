import axios from "axios";
import { config } from "../config/config";

// ESTO NO SE USA EN NINGÚN LADO

// YA NO EXISTE ESTO, SE PODRIA CAMBIAR POR APTITUDES DE OFERTA QUE TIENE EL IDIOMA, NIVEL Y APTITUP DE LA OFERTA.

// Trae todos los idiomas de las ofertas (???)

export async function getIdiomasOfertas() {
  try {

    // Cambiarlo por aptitudes_ofertas
    const response = await axios.get(`${config.apiUrl}/idiomasOfertas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todos los idiomas de una oferta por id de oferta (???)

export async function getIdiomasOferta(id) {
  try {
    // Cambiarlo por aptitudes_ofertas

    const response = await axios.get(`${config.apiUrl}/idiomasOfertas/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de idiomas (No recibe nada? Con que info se hace el post?)

export async function postIdiomasOfertas() {
  try {
    // Cambiarlo por aptitudes_ofertas

    const response = await axios.post(`${config.apiUrl}/idiomasOfertas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
