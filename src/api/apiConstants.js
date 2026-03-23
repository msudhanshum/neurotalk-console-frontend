const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URLS = {
 AUTH: {
  LOGIN: `${BASE_URL}/api/v1/auth/login`,
  LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
}, 
 
 COMPANY: {
   CREATE_COMPANY: `${BASE_URL}/api/v1/company`,
   LIST: `${BASE_URL}/api/v1/company`,
   DELETE: `${BASE_URL}/api/v1/company`,
   CHANGE_STATUS: `${BASE_URL}/api/v1/company`,
   DETAILS: `${BASE_URL}/api/v1/company`,
   UPDATE: `${BASE_URL}/api/v1/company`,
  },
};