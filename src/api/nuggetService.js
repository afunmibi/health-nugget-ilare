const API_BASE_URL = 'http://localhost:3001';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getAllNuggets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/nuggets`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch nuggets: ${error.message}`);
  }
};

export const getNuggetById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/nuggets/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch nugget ${id}: ${error.message}`);
  }
};

export const getNuggetsByType = async (type) => {
  try {
    const response = await fetch(`${API_BASE_URL}/nuggets?type=${type}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch nuggets by type ${type}: ${error.message}`);
  }
};

export const getNuggetsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/nuggets?category=${category}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch nuggets by category ${category}: ${error.message}`);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

export const getWelcomeData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/welcome`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch welcome data: ${error.message}`);
  }
};