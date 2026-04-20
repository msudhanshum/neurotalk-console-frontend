const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },

  COMPANY: {
    ME: `${BASE_URL}/company/me`,
    COMPLETE_PROFILE: `${BASE_URL}/company/complete-profile`,
  },
  TICKETS:{
    CREATE_TICKET:`${BASE_URL}/ticket/create`,
    GET_TICKET: `${BASE_URL}/ticket/my-tickets`,
  },
};