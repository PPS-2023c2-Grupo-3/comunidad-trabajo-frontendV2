import axios from "axios";
import { config } from "../config/config";

// Trae todas las provincias

export async function getProvincias() {
  try {
    const response = await axios.get(`${config.apiUrl}/provincias`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
