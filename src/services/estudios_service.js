import axios from "axios";
import { config } from "../config/config";

// Trae todos los estudios

export async function getEstudios() {
  try {
    const response = await axios.get(`${config.apiUrl}/estudios`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
