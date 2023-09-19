import axios from "axios";
import { config } from "../config/config";

// Trae todas las jornadas

export async function getJornadas() {
  try {
    const response = await axios.get(`${config.apiUrl}/jornadas`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
