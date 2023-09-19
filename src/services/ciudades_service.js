import axios from "axios";
import { config } from "../config/config";

// Trae todas las ciudades

export async function getCiudades(idProvincia) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/ciudades/?idProvincia=${idProvincia}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
