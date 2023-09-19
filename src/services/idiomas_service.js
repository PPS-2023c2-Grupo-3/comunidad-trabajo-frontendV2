import axios from "axios";
import { config } from "../config/config";

// Trae todos los idiomas

export async function getIdiomas() {
  try {
    const response = await axios.get(`${config.apiUrl}/idiomas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
