import axios from "axios";
import { config } from "../config/config";

// Trae todas las ofertas con filtros

export async function getOfertas(
  pagina,
  limite,
  buscarTitulo,
  ordenar,
  idEstado
) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/ofertas/?pagina=${pagina}&limite=${limite}&buscarTitulo=${buscarTitulo}&ordenar=${ordenar}&idEstado=${idEstado}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todas las ofertas sin filtros (No entiendo este endpoint)

export async function getOfertasSinFiltros() {
  try {
    const response = await axios.get(`${config.apiUrl}/ofertas/all`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae una oferta por id de la oferta

export async function getOfertaById(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/ofertas/idOferta/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae una oferta por id de la empresa

export async function getOfertaByCuit(pagina, limite, ordenar, idEstado, cuit) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/ofertas/cuit/${cuit}?pagina=${pagina}&limite=${limite}&ordenar=${ordenar}&idEstado=${idEstado}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de oferta

export async function postOferta(oferta, token) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/ofertas/?authorization=${token}`,
      oferta
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Put de oferta

export async function putOferta(idOferta, oferta, token) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/ofertas/idOferta/${idOferta}?authorization=${token}`,
      oferta
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Delete de oferta

export async function deleteOferta(idOferta, token) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/ofertas/idOferta/${idOferta}?authorization=${token}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
