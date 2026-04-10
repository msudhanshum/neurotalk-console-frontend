import axios from "axios";
import { API_URLS } from "./apiConstants";
import { getAuthContext, getAuthHeaders } from "./authSession";

const buildCompanyParams = () => {
  const { companyId } = getAuthContext();

  return companyId ? { companyId } : {};
};

const withCompanyId = (payload = {}) => {
  const { companyId } = getAuthContext();

  return {
    ...payload,
    companyId,
  };
};

export const contactApi = {
  async listContacts(params = {}) {
    return axios.get(API_URLS.CONTACTS.LIST, {
      params,
      headers: getAuthHeaders(),
    });
  },

  async createContact(payload) {
    return axios.post(API_URLS.CONTACTS.CREATE, withCompanyId(payload), {
      headers: getAuthHeaders(),
    });
  },

  async bulkImportContacts(contacts) {
    return axios.post(
      API_URLS.CONTACTS.BULK_IMPORT,
      {
        ...buildCompanyParams(),
        contacts,
      },
      {
        headers: getAuthHeaders(),
      }
    );
  },

  async updateContact(id, payload) {
    return axios.put(API_URLS.CONTACTS.UPDATE(id), withCompanyId(payload), {
      headers: getAuthHeaders(),
    });
  },

  async softDeleteContact(id) {
    return axios.patch(API_URLS.CONTACTS.SOFT_DELETE(id), buildCompanyParams(), {
      headers: getAuthHeaders(),
    });
  },

  async restoreContact(id) {
    return axios.patch(API_URLS.CONTACTS.RESTORE(id), buildCompanyParams(), {
      headers: getAuthHeaders(),
    });
  },

  async listGroups() {
    return axios.get(API_URLS.CONTACT_GROUPS.LIST, {
      params: buildCompanyParams(),
      headers: getAuthHeaders(),
    });
  },

  async createGroup(name) {
    return axios.post(
      API_URLS.CONTACT_GROUPS.CREATE,
      {
        ...buildCompanyParams(),
        name,
      },
      {
        headers: getAuthHeaders(),
      }
    );
  },

  async deleteGroup(id) {
    return axios.delete(API_URLS.CONTACT_GROUPS.DELETE(id), {
      data: buildCompanyParams(),
      headers: getAuthHeaders(),
    });
  },
};
