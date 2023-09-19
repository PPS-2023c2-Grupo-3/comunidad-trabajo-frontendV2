import axios from "axios";
import { config } from "../config/config";

// ESTO NO SE USA EN NINGÚN LADO

// Trae todos los idiomas de las ofertas (???)

export async function getIdiomasOfertas() {
  try {
    const response = await axios.get(`${config.apiUrl}/idiomasOfertas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todos los idiomas de una oferta por id de oferta (???)

export async function getIdiomasOferta(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/idiomasOfertas/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de idiomas (No recibe nada? Con que info se hace el post?)

export async function postIdiomasOfertas() {
  try {
    const response = await axios.post(`${config.apiUrl}/idiomasOfertas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
