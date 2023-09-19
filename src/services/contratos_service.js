import axios from "axios";
import { config } from "../config/config";

// Trae todos los tipos de contratos

export async function getTiposContratos() {
  try {
    const response = await axios.get(`${config.apiUrl}/contratos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
