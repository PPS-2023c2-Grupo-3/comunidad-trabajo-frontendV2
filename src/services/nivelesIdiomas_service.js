import axios from "axios";
import { config } from "../config/config";

// Trae todos los niveles de idiomas

export async function getNivelesIdiomas() {
  try {
    const response = await axios.get(`${config.apiUrl}/nivelesIdiomas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
