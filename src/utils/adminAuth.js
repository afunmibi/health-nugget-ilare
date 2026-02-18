const ADMIN_STORAGE_KEY = 'health_nugget_admin_session';

const defaultUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const defaultPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export const getDemoCredentials = () => ({
  username: defaultUsername,
  password: defaultPassword,
});

export const authenticateAdmin = (username, password) => {
  const isValid = username === defaultUsername && password === defaultPassword;

  if (isValid) {
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
  }

  return isValid;
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
};

export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
};
