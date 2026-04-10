import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import "../styles/contacts.css";
import { contactApi } from "../api/contactApi";
import { getAuthContext, getCompanyId } from "../api/authSession";

type ContactFormState = {
  countryCode: string;
  name: string;
  contactNo: string;
  email: string;
  tagging: string;
  companyName: string;
  alternateNumber: string;
  notes: string;
};

type ContactRecord = ContactFormState & {
  id: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type ImportPreview = {
  contactNo: string;
  name: string;
  email: string;
  tagging: string;
  companyName: string;
  alternateNumber: string;
  notes: string;
};

const CONTACT_CACHE_KEY = "contact-management-contacts";
const CONTACTS_PER_PAGE = 10;

const initialFormState: ContactFormState = {
  countryCode: "+91",
  name: "",
  contactNo: "",
  email: "",
  tagging: "",
  companyName: "",
  alternateNumber: "",
  notes: "",
};

const normalizeTags = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const parseStoredList = <T,>(key: string): T[] => {
  const raw = localStorage.getItem(key) || sessionStorage.getItem(key);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
};

const saveList = <T,>(key: string, value: T[]) => {
  const serialized = JSON.stringify(value);
  localStorage.setItem(key, serialized);
  sessionStorage.setItem(key, serialized);
};

const resolveContactId = (item: Partial<ContactRecord> & { _id?: string }) =>
  item.id || item._id || `${item.contactNo || "contact"}-${item.email || Date.now()}`;

const normalizeContact = (item: any): ContactRecord => {
  const tags = Array.isArray(item?.tagging)
    ? item.tagging.join(", ")
    : item?.tags
      ? Array.isArray(item.tags)
        ? item.tags.join(", ")
        : String(item.tags)
      : item?.tagging || "";

  return {
    id: resolveContactId(item),
    countryCode: item?.countryCode || item?.country_code || "+91",
    name: item?.name || "",
    contactNo: item?.contactNo || item?.contact_number || item?.phone || "",
    email: item?.email || "",
    tagging: tags,
    companyName: item?.companyName || item?.company_name || "",
    alternateNumber: item?.alternateNumber || item?.alternate_number || "",
    notes: item?.notes || "",
    isArchived: Boolean(item?.isArchived || item?.isDeleted || item?.deletedAt || item?.archived),
    createdAt: item?.createdAt,
    updatedAt: item?.updatedAt,
  };
};

const normalizeImportRow = (row: Record<string, unknown>): ImportPreview | null => {
  const normalized = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key.toLowerCase().replace(/[^a-z0-9]/g, ""),
      String(value ?? "").trim(),
    ])
  ) as Record<string, string>;

  const contactNo =
    normalized.contactno ||
    normalized.contactnumber ||
    normalized.phone ||
    normalized.mobile ||
    normalized.mobilenumber ||
    "";

  const name = normalized.name || normalized.fullname || "";
  const email = normalized.email || "";
  const tagging = normalized.tagging || normalized.tags || normalized.tag || "";
  const companyName = normalized.companyname || normalized.organization || "";
  const alternateNumber = normalized.alternatenumber || normalized.secondaryphone || "";
  const notes = normalized.notes || normalized.note || "";

  if (!contactNo && !name && !email) {
    return null;
  }

  return {
    contactNo,
    name,
    email,
    tagging,
    companyName,
    alternateNumber,
    notes,
  };
};

type ContactsPageState = {
  totalItems: number;
  totalPages: number;
  totalActive: number | null;
  totalArchived: number | null;
};

const resolveContactsPageState = (data: any, requestedPage: number) => {
  const pagination = data?.pagination || data?.meta || {};
  const contacts = Array.isArray(data)
    ? data
    : data?.contacts || data?.data || data?.items || [];
  const totalItems = Number(
    data?.total ??
      data?.totalContacts ??
      data?.totalCount ??
      data?.count ??
      pagination.total ??
      pagination.totalContacts ??
      pagination.totalCount ??
      pagination.count ??
      contacts.length
  );
  const totalActiveRaw =
    data?.totalActive ??
    data?.activeTotal ??
    pagination.totalActive ??
    pagination.activeTotal;
  const totalActive =
    totalActiveRaw === undefined || totalActiveRaw === null
      ? null
      : Number(totalActiveRaw);
  const totalArchivedRaw =
    data?.totalArchived ??
    data?.archivedTotal ??
    pagination.totalArchived ??
    pagination.archivedTotal;
  const totalArchived =
    totalArchivedRaw === undefined || totalArchivedRaw === null
      ? null
      : Number(totalArchivedRaw);
  const limit = Number(
    data?.limit ??
      pagination.limit ??
      data?.pageSize ??
      pagination.pageSize ??
      CONTACTS_PER_PAGE
  );
  const totalPages = Math.max(
    1,
    Number(
      data?.totalPages ??
        pagination.totalPages ??
        (limit > 0 ? Math.ceil(totalItems / limit) : 1)
    )
  );
  const page = Number(data?.page ?? pagination.page ?? (requestedPage || 1));

  return {
    contacts,
    page,
    totalItems,
    totalPages,
    totalActive,
    totalArchived,
  };
};

const Contacts: React.FC = () => {
  const { companyId } = getAuthContext();

  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [search, setSearch] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalActive, setTotalActive] = useState<number | null>(null);
  const [totalArchived, setTotalArchived] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [importSaving, setImportSaving] = useState(false);
  const [importFileName, setImportFileName] = useState("");
  const [importPreview, setImportPreview] = useState<ImportPreview[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const showToast = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 2200,
    });
  };

  const applyLocalFallback = () => {
    const cachedContacts = parseStoredList<ContactRecord>(CONTACT_CACHE_KEY);

    setContacts(cachedContacts);
  };

  const buildPayload = (source: ContactFormState) => ({
    countryCode: source.countryCode,
    name: source.name.trim(),
    contactNo: source.contactNo.trim(),
    email: source.email.trim(),
    tagging: normalizeTags(source.tagging),
    tags: normalizeTags(source.tagging),
    companyName: source.companyName.trim(),
    alternateNumber: source.alternateNumber.trim(),
    notes: source.notes.trim(),
    companyId: getCompanyId(),
  });

  const hydrateFromResponse = (items: any, requestedPage: number) => {
    const pageState = resolveContactsPageState(items, requestedPage);
    const nextContacts = pageState.contacts.map(normalizeContact);

    setContacts(nextContacts);
    setTotalItems(pageState.totalItems);
    setTotalPages(pageState.totalPages);
    setTotalActive(pageState.totalActive);
    setTotalArchived(pageState.totalArchived);

    if (pageState.page !== requestedPage) {
      setCurrentPage(pageState.page);
    }
  };

  const loadData = async (page = currentPage) => {
    setLoading(true);

    try {
      const contactsRes = await contactApi.listContacts({
        page,
        limit: CONTACTS_PER_PAGE,
        search,
        isArchived: showArchived,
      });

      hydrateFromResponse(contactsRes.data, page);
    } catch (error) {
      console.error(error);
      applyLocalFallback();
      showToast("info", "Loaded contacts from local cache.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, search, showArchived]);

  useEffect(() => {
    saveList(CONTACT_CACHE_KEY, contacts);
  }, [contacts]);

  const updateContactsState = (updater: (current: ContactRecord[]) => ContactRecord[]) => {
    setContacts(updater);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowContactModal(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const nextValue =
      name === "contactNo"
        ? value.replace(/\D/g, "").slice(0, 10)
        : name === "name"
          ? value.replace(/\d/g, "")
          : value;

    if (name === "contactNo" || name === "name") {
      setCurrentPage(1);
    }

    setForm((current) => ({
      ...current,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contactNoDigits = form.contactNo.trim();
    const nameValue = form.name.trim();

    if (!/^\+91$/.test(form.countryCode)) {
      showToast("warning", "Only India country code +91 is supported.");
      return;
    }

    if (!/^\d{10}$/.test(contactNoDigits)) {
      showToast("warning", "Contact number must contain exactly 10 digits.");
      return;
    }

    if (nameValue && /\d/.test(nameValue)) {
      showToast("warning", "Name cannot contain numbers.");
      return;
    }

    setSaving(true);

    const payload = buildPayload({
      ...form,
      contactNo: contactNoDigits,
    });

    try {
      const response = editingId
        ? await contactApi.updateContact(editingId, payload)
        : await contactApi.createContact(payload);

      const savedContact = normalizeContact(response.data?.contact || response.data);
      const finalContact = { ...savedContact };

      updateContactsState((current) => {
        const withoutCurrent = current.filter((contact) => contact.id !== finalContact.id);
        return [finalContact, ...withoutCurrent];
      });

      showToast(
        "success",
        editingId ? "Contact updated successfully." : "Contact added successfully."
      );
      resetForm();
      setShowContactModal(false);
      loadData(currentPage);
    } catch (error) {
      console.error(error);

      const fallbackId = editingId || `local-contact-${Date.now()}`;
      const nextContact: ContactRecord = {
        id: fallbackId,
        ...form,
        contactNo: contactNoDigits,
        countryCode: form.countryCode,
        name: nameValue,
        isArchived: false,
      };

      updateContactsState((current) => {
        const withoutCurrent = current.filter((contact) => contact.id !== fallbackId);
        return [nextContact, ...withoutCurrent];
      });

      showToast("info", "Saved locally because API is unavailable.");
      resetForm();
      setShowContactModal(false);
      loadData(currentPage);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (contact: ContactRecord) => {
    setEditingId(contact.id);
    setForm({
      countryCode: contact.countryCode || "+91",
      name: contact.name,
      contactNo: contact.contactNo,
      email: contact.email,
      tagging: contact.tagging,
      companyName: contact.companyName,
      alternateNumber: contact.alternateNumber,
      notes: contact.notes,
    });
    setShowContactModal(true);
  };

  const handleSoftDelete = async (contact: ContactRecord) => {
    try {
      await contactApi.softDeleteContact(contact.id);

      updateContactsState((current) =>
        current.map((item) =>
          item.id === contact.id ? { ...item, isArchived: true } : item
        )
      );

      showToast("success", "Contact archived.");
      loadData(currentPage);
    } catch (error) {
      console.error(error);
      updateContactsState((current) =>
        current.map((item) =>
          item.id === contact.id ? { ...item, isArchived: true } : item
        )
      );
      showToast("info", "Archived locally because API is unavailable.");
      loadData(currentPage);
    }
  };

  const handleRestore = async (contact: ContactRecord) => {
    try {
      await contactApi.restoreContact(contact.id);

      updateContactsState((current) =>
        current.map((item) =>
          item.id === contact.id ? { ...item, isArchived: false } : item
        )
      );

      showToast("success", "Contact restored.");
      loadData(currentPage);
    } catch (error) {
      console.error(error);
      updateContactsState((current) =>
        current.map((item) =>
          item.id === contact.id ? { ...item, isArchived: false } : item
        )
      );
      showToast("info", "Restored locally because API is unavailable.");
      loadData(currentPage);
    }
  };

  const parseFile = async (file: File) => {
    const fileName = file.name.toLowerCase();
    const isCsv = fileName.endsWith(".csv");
    const workbook = isCsv
      ? XLSX.read(await file.text(), { type: "string" })
      : XLSX.read(await file.arrayBuffer(), { type: "array" });

    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      return [];
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[firstSheetName], {
      defval: "",
    });

    return rows
      .map(normalizeImportRow)
      .filter((row): row is ImportPreview => Boolean(row));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const rows = await parseFile(file);
      setImportFileName(file.name);
      setImportPreview(rows);

      showToast("success", `${rows.length} contacts parsed from file.`);
    } catch (error) {
      console.error(error);
      setImportPreview([]);
      setImportFileName("");
      showToast("error", "Unable to read the selected file.");
    } finally {
      e.target.value = "";
    }
  };

  const openImportModal = () => {
    setShowImportModal(true);
  };

  const handleImport = async () => {
    if (!importPreview.length) {
      showToast("warning", "Choose a CSV or Excel file first.");
      return;
    }

    const payload = importPreview.map((row) =>
      buildPayload({
        name: row.name,
        contactNo: row.contactNo,
        email: row.email,
        tagging: row.tagging,
        companyName: row.companyName,
        alternateNumber: row.alternateNumber,
        notes: row.notes,
      })
    );

    setImportSaving(true);

    try {
      const response = await contactApi.bulkImportContacts(payload);
      const importedContacts = Array.isArray(response.data?.contacts)
        ? response.data.contacts.map(normalizeContact)
        : importPreview.map((row) =>
            normalizeContact({
              id: `local-contact-${row.contactNo}-${Date.now()}`,
              name: row.name,
              contactNo: row.contactNo,
              email: row.email,
              tagging: row.tagging,
              companyName: row.companyName,
              alternateNumber: row.alternateNumber,
              notes: row.notes,
            })
          );

      updateContactsState((current) => [...importedContacts, ...current]);
      setImportPreview([]);
      setImportFileName("");
      showToast("success", "Contacts imported successfully.");
      loadData(currentPage);
    } catch (error) {
      console.error(error);
      const importedContacts = importPreview.map((row) =>
        normalizeContact({
          id: `local-contact-${row.contactNo}-${Date.now()}`,
          name: row.name,
          contactNo: row.contactNo,
          email: row.email,
          tagging: row.tagging,
          companyName: row.companyName,
          alternateNumber: row.alternateNumber,
          notes: row.notes,
        })
      );

      updateContactsState((current) => [...importedContacts, ...current]);
      setImportPreview([]);
      setImportFileName("");
      showToast("info", "Imported locally because API is unavailable.");
      loadData(currentPage);
    } finally {
      setImportSaving(false);
    }
  };

  const visibleContacts = contacts;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = totalItems ? (safeCurrentPage - 1) * CONTACTS_PER_PAGE + 1 : 0;
  const pageEnd = Math.min(safeCurrentPage * CONTACTS_PER_PAGE, totalItems);

  const activeCount =
    totalActive ?? contacts.filter((contact) => !contact.isArchived).length;
  const archivedCount =
    totalArchived ?? contacts.filter((contact) => contact.isArchived).length;

  return (
    <div className="contacts-page">
      <section className="contacts-card">
        <div className="contacts-list-head contacts-card-header">
          <div>
            <h2 className="contacts-card-title">Contacts</h2>
            <p className="contacts-card-copy">
              Search, filter, edit, archive, and restore contacts.
            </p>
            <div className="contacts-inline-stats">
              <span className="contacts-chip">Total Active {activeCount}</span>
              <span className="contacts-chip">Archived {archivedCount}</span>
            </div>
          </div>
          <div className="contacts-actions">
            <button className="contacts-btn secondary" type="button" onClick={openImportModal}>
              Import Contacts
            </button>
            <button className="contacts-btn primary" type="button" onClick={openCreateModal}>
              Add Contact
            </button>
          </div>
        </div>

        <div className="contacts-toolbar">
          <input
            className="contacts-input"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, number, email, tag, or notes..."
          />

          <label className="contacts-input" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => {
                setShowArchived(e.target.checked);
                setCurrentPage(1);
              }}
            />
            Show archived
          </label>
        </div>

        {loading ? (
          <div className="contacts-loader">Loading contacts...</div>
        ) : visibleContacts.length ? (
          <div className="contacts-table-wrap">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Contact No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Tagging</th>
                  <th>More</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleContacts.map((contact) => {
                  return (
                    <tr key={contact.id}>
                      <td>
                        {contact.countryCode || "+91"} {contact.contactNo || "N/A"}
                      </td>
                      <td>{contact.name || "N/A"}</td>
                      <td>{contact.email || "N/A"}</td>
                      <td>
                        <div className="contacts-tag-list">
                          {normalizeTags(contact.tagging).length ? (
                            normalizeTags(contact.tagging).map((tag) => (
                              <span className="contacts-tag" key={`${contact.id}-${tag}`}>
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="contacts-muted">No tags</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="contacts-muted">
                          {contact.companyName && <div>Company: {contact.companyName}</div>}
                          {contact.alternateNumber && <div>Alt: {contact.alternateNumber}</div>}
                          {contact.notes && <div>Notes: {contact.notes}</div>}
                        </div>
                      </td>
                      <td>
                        <span className="contacts-badge">
                          {contact.isArchived ? "Archived" : "Active"}
                        </span>
                      </td>
                      <td>
                        <div className="contacts-row-actions">
                          <button
                            className="contacts-btn secondary"
                            type="button"
                            onClick={() => handleEdit(contact)}
                          >
                            Edit
                          </button>
                          {contact.isArchived ? (
                            <button
                              className="contacts-btn primary"
                              type="button"
                              onClick={() => handleRestore(contact)}
                            >
                              Restore
                            </button>
                          ) : (
                            <button
                              className="contacts-btn danger"
                              type="button"
                              onClick={() => handleSoftDelete(contact)}
                            >
                              Archive
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="contacts-empty">
            No contacts match the current filters. Add one above or import a file.
          </div>
        )}

        {totalPages > 1 && (
          <div className="contacts-pagination">
            <div className="contacts-pagination-info">
              Showing {pageStart}-{pageEnd} of {totalItems}
            </div>
            <div className="contacts-pagination-controls">
              <button
                className="contacts-btn secondary contacts-pagination-btn"
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safeCurrentPage === 1}
              >
                Previous
              </button>
              <div className="contacts-pagination-pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    className={`contacts-pagination-page ${
                      page === safeCurrentPage ? "is-active" : ""
                    }`}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className="contacts-btn secondary contacts-pagination-btn"
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={safeCurrentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {showContactModal && (
        <div
          className="contacts-modal-overlay"
          role="presentation"
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="contacts-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contacts-modal-header">
              <div>
                <h2 className="contacts-card-title" id="contact-modal-title">
                  {editingId ? "Edit Contact" : "Add Contact"}
                </h2>
                <p className="contacts-card-copy">
                  Contact number is required. Name is optional, but it cannot contain numbers.
                </p>
              </div>
              <button
                className="contacts-modal-close"
                type="button"
                onClick={() => setShowContactModal(false)}
                aria-label="Close contact form"
              >
                ×
              </button>
            </div>

            <div className="contacts-modal-body">
              <form className="contacts-form" onSubmit={handleSubmit}>
                <div className="contacts-form-grid">
                  <label className="contacts-field">
                    <span className="contacts-label">Country Code</span>
                    <select
                      className="contacts-select"
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleFormChange}
                      disabled
                    >
                      <option value="+91">India (+91)</option>
                    </select>
                  </label>

                  <label className="contacts-field">
                    <span className="contacts-label">Contact No</span>
                    <input
                      className="contacts-input"
                      type="text"
                      name="contactNo"
                      placeholder="9876543210"
                      value={form.contactNo}
                      onChange={handleFormChange}
                      inputMode="numeric"
                      maxLength={10}
                      pattern="\d{10}"
                      required
                    />
                  </label>

                  <label className="contacts-field">
                    <span className="contacts-label">Name</span>
                    <input
                      className="contacts-input"
                      type="text"
                      name="name"
                      placeholder="Contact name (optional)"
                      value={form.name}
                      onChange={handleFormChange}
                    />
                  </label>

                  <label className="contacts-field">
                    <span className="contacts-label">Email</span>
                    <input
                      className="contacts-input"
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={handleFormChange}
                    />
                  </label>

                  <label className="contacts-field">
                    <span className="contacts-label">Tagging</span>
                    <input
                      className="contacts-input"
                      type="text"
                      name="tagging"
                      placeholder="Loan, Insurance, etc."
                      value={form.tagging}
                      onChange={handleFormChange}
                    />
                  </label>
                </div>

                <div className="contacts-mini-grid">
                  <label className="contacts-field">
                    <span className="contacts-label">Company Name</span>
                    <input
                      className="contacts-input"
                      type="text"
                      name="companyName"
                      placeholder="Optional company name"
                      value={form.companyName}
                      onChange={handleFormChange}
                    />
                  </label>

                  <label className="contacts-field">
                    <span className="contacts-label">Alternate Number</span>
                    <input
                      className="contacts-input"
                      type="text"
                      name="alternateNumber"
                      placeholder="Secondary phone"
                      value={form.alternateNumber}
                      onChange={handleFormChange}
                    />
                  </label>

                  <label className="contacts-field">
                    <span className="contacts-label">Notes</span>
                    <input
                      className="contacts-input"
                      type="text"
                      name="notes"
                      placeholder="Call preference, remarks, etc."
                      value={form.notes}
                      onChange={handleFormChange}
                    />
                  </label>
                </div>

                <div className="contacts-actions">
                  <button className="contacts-btn primary" type="submit" disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update Contact" : "Save Contact"}
                  </button>
                  <button
                    className="contacts-btn secondary"
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowContactModal(false);
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div
          className="contacts-modal-overlay"
          role="presentation"
          onClick={() => setShowImportModal(false)}
        >
          <div
            className="contacts-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contacts-modal-header">
              <div>
                <h2 className="contacts-card-title" id="import-modal-title">
                  Import Contacts
                </h2>
                <p className="contacts-card-copy">
                  Upload CSV or Excel and import them into the current company.
                </p>
              </div>
              <button
                className="contacts-modal-close"
                type="button"
                onClick={() => setShowImportModal(false)}
                aria-label="Close import form"
              >
                ×
              </button>
            </div>

            <div className="contacts-modal-body">
              <div className="contacts-form">
                <label className="contacts-field">
                  <span className="contacts-label">Upload CSV / Excel</span>
                  <input
                    className="contacts-input"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelect}
                  />
                </label>

                {importFileName && (
                  <div className="contacts-muted">
                    Selected file: <strong>{importFileName}</strong>
                  </div>
                )}

                {importPreview.length > 0 && (
                  <div className="contacts-empty">
                    Parsed {importPreview.length} contacts from the file. Click import to
                    send them with the current authenticated company.
                  </div>
                )}

                <div className="contacts-actions">
                  <button
                    className="contacts-btn primary"
                    type="button"
                    onClick={handleImport}
                    disabled={importSaving || importPreview.length === 0}
                  >
                    {importSaving ? "Importing..." : "Import Contacts"}
                  </button>
                  <button
                    className="contacts-btn secondary"
                    type="button"
                    onClick={() => {
                      setImportPreview([]);
                      setImportFileName("");
                    }}
                  >
                    Clear Preview
                  </button>
                  <button
                    className="contacts-btn secondary"
                    type="button"
                    onClick={() => setShowImportModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
