// import { API_URL } from "../utils/constants";
import axios from "axios";
import { config } from "../config/config";

// Trae todos los usuarios
export async function getUsuarios() {
  try {
    const response = await axios.get(`${config.apiUrl}/usuarios`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Sign in de usuario
export async function signIn(usuario) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/usuarios/signin`,
      usuario
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Sign up de usuario
export async function signUp(usuario) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/usuarios/signup`,
      usuario
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
