const BASE_URL = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

const buildUrl = (path) => `${BASE_URL}${path}`;

export const API_URLS = {
  AUTH: {
    LOGIN: buildUrl("/api/v1/auth/login"),
    LOGOUT: buildUrl("/api/v1/auth/logout"),
  },
  COMPANY: {
    ME: buildUrl("/api/v1/company/me"),
  },
};
