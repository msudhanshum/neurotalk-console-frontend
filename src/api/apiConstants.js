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
  CONTACTS: {
    LIST: buildUrl("/api/v1/company/contacts"),
    CREATE: buildUrl("/api/v1/company/contacts"),
    BULK_IMPORT: buildUrl("/api/v1/company/contacts/bulk"),
    UPDATE: (id) => buildUrl(`/api/v1/company/contacts/${id}`),
    SOFT_DELETE: (id) => buildUrl(`/api/v1/company/contacts/${id}/archive`),
    RESTORE: (id) => buildUrl(`/api/v1/company/contacts/${id}/restore`),
  },
  CONTACT_GROUPS: {
    LIST: buildUrl("/api/v1/company/contact-groups"),
    CREATE: buildUrl("/api/v1/company/contact-groups"),
    DELETE: (id) => buildUrl(`/api/v1/company/contact-groups/${id}`),
  },
};
