import axios from "axios";
import { config } from "../config/config";

// ESTO NO SE USA EN NINGÚN LADO

// Trae todos los idiomas de los postulantes (???)

// YA NO EXISTE, SE PODRIA CAMBIAR POR APTITUDES DE POSTULANTE QUE TIENE EL IDIOMA, NIVEL Y APTITUP DE LA OFERTA.

export async function getIdiomasPostulantes() {
  try {
    const response = await axios.get(`${config.apiUrl}/idiomasPostulantes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todos los idiomas de un postulante por id de postulante (???)

export async function getIdiomasPostulante(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/idiomasPostulantes/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de idiomas (No recibe nada? Con que info se hace el post?)

export async function postIdiomasPostulantes() {
  try {
    const response = await axios.post(`${config.apiUrl}/idiomasPostulantes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
