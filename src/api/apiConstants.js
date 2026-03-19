const BASE_URL = "http://127.0.0.1:5000/api/v1";

export const API_URLS = {
 AUTH: {
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
}, 
 
 COMPANY: {
   CREATE_COMPANY: `${BASE_URL}/company/create`,
   LIST: `${BASE_URL}/company/list`,
   DELETE: `${BASE_URL}/company/delete`,
   CHANGE_STATUS: `${BASE_URL}/company/change-status`,
   DETAILS: `${BASE_URL}/company/details`,
   UPDATE: `${BASE_URL}/company/update`,
  },
};