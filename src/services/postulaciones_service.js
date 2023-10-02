import axios from "axios";
import { config } from "../config/config";

// Trae todas las postulaciones

export async function getPostulaciones() {
  try {
    const response = await axios.get(`${config.apiUrl}/postulaciones`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae una postulación por id

export async function getPostulacionById(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/postulaciones/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de postulación

export async function postPostulacion(postulacion, token) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulaciones/?authorization=${token}`,
      postulacion
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Put de postulación

export async function putPostulacion(idPostulacion, postulacion, token) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulaciones/${idPostulacion}?authorization=${token}`,
      postulacion
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Delete de postulación

export async function deletePostulacion(idPostulacion, token) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulaciones/${idPostulacion}?authorization=${token}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
