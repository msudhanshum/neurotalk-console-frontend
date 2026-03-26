const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URLS = {

  AUTH: {
    LOGIN: `${BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
  },
};