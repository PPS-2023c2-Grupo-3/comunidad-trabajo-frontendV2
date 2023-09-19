import axios from "axios";
import { config } from "../config/config";

// Trae todas las carreras

export async function getCarreras() {
  try {
    const response = await axios.get(`${config.apiUrl}/carreras`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
