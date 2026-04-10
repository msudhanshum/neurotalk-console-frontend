const readStoredJson = (storage, key) => {
  const raw = storage.getItem(key);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getStoredCompany = () =>
  readStoredJson(localStorage, "company") || readStoredJson(sessionStorage, "company");

export const getStoredUser = () =>
  readStoredJson(localStorage, "user") || readStoredJson(sessionStorage, "user");

export const getAuthToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token") || "";

export const getCompanyId = () => {
  const company = getStoredCompany();
  const user = getStoredUser();

  return (
    company?.companyId ||
    user?.companyId ||
    user?.company?.companyId ||
    ""
  );
};

export const getAuthHeaders = () => {
  const token = getAuthToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAuthContext = () => ({
  token: getAuthToken(),
  companyId: getCompanyId(),
  company: getStoredCompany(),
  user: getStoredUser(),
});
