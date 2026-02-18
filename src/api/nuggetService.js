const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001').replace(/\/$/, '');

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  return handleResponse(response);
};

export const getAllNuggets = async () => {
  try {
    return await request('/nuggets');
  } catch (error) {
    throw new Error(`Failed to fetch nuggets: ${error.message}`);
  }
};

export const getNuggetById = async (id) => {
  try {
    return await request(`/nuggets/${id}`);
  } catch (error) {
    throw new Error(`Failed to fetch nugget ${id}: ${error.message}`);
  }
};

export const getNuggetsByType = async (type) => {
  try {
    return await request(`/nuggets?type=${encodeURIComponent(type)}`);
  } catch (error) {
    throw new Error(`Failed to fetch nuggets by type ${type}: ${error.message}`);
  }
};

export const getNuggetsByCategory = async (category) => {
  try {
    return await request(`/nuggets?category=${encodeURIComponent(category)}`);
  } catch (error) {
    throw new Error(`Failed to fetch nuggets by category ${category}: ${error.message}`);
  }
};

export const createNugget = async (payload) => {
  try {
    return await request('/nuggets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(`Failed to create nugget: ${error.message}`);
  }
};

export const updateNugget = async (id, payload) => {
  try {
    return await request(`/nuggets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(`Failed to update nugget ${id}: ${error.message}`);
  }
};

export const deleteNugget = async (id) => {
  try {
    await request(`/nuggets/${id}`, { method: 'DELETE' });
  } catch (error) {
    throw new Error(`Failed to delete nugget ${id}: ${error.message}`);
  }
};

export const getCategories = async () => {
  try {
    return await request('/categories');
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

export const createCategory = async (payload) => {
  try {
    return await request('/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};

export const updateCategory = async (id, payload) => {
  try {
    return await request(`/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(`Failed to update category ${id}: ${error.message}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    await request(`/categories/${id}`, { method: 'DELETE' });
  } catch (error) {
    throw new Error(`Failed to delete category ${id}: ${error.message}`);
  }
};

export const getWelcomeData = async () => {
  try {
    return await request('/welcome');
  } catch (error) {
    throw new Error(`Failed to fetch welcome data: ${error.message}`);
  }
};

export const updateWelcomeData = async (payload) => {
  try {
    return await request('/welcome', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(`Failed to update welcome data: ${error.message}`);
  }
};
