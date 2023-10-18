import axios from "axios";
import { config } from "../config/config";

// Trae todas las postulaciones por id de la oferta

export async function getPostulacionesPorIdOferta(pagina, limite, id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulaciones/oferta/${id}/?pagina=${pagina}&limite=${limite}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todas las postulaciones por id del postulante

export async function getPostulacionesPorIdPostulante(pagina, limite, id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulaciones/postulante/${id}/?pagina=${pagina}&limite=${limite}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
