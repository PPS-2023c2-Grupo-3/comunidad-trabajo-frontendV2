import axios from "axios";
import { config } from "../config/config";

// Trae todas las empresas con filtros

export async function getEmpresas(
  pagina,
  limite,
  ordenar,
  idEstado,
  nombreEmpresa
) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/empresas/?pagina=${pagina}&limite=${limite}&ordenar=${ordenar}&idEstado=${idEstado}&nombreEmpresa=${nombreEmpresa}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todas las empresas sin filtros

export async function getEmpresasSinFiltros() {
  try {
    const response = await axios.get(`${config.apiUrl}/empresas/all`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae una empresa por id/cuit

export async function getEmpresaByCuit(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/empresas/cuit/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae una empresa por id de usuario

export async function getEmpresaByIdUsuario(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/empresas/idUsuario/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de empresa

export async function postEmpresa(empresa) {
  try {
    const response = await axios.post(`${config.apiUrl}/empresas`, empresa);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Put de empresa

export async function putEmpresa(id, empresa, token) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/empresas/cuit/${id}?authorization=${token}`,
      empresa
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Delete de empresa

export async function deleteEmpresa(id, token) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/empresas/cuit/${id}?authorization=${token}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Path de empresa
// No se que es esto. Ademas no se usa en ningún lado
