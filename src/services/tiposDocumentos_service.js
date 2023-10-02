import axios from "axios";
import { config } from "../config/config";

// Trae todos los tipos de documentos

export async function getTiposDocumentos() {
  try {
    const response = await axios.get(`${config.apiUrl}/tiposDocumento`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
