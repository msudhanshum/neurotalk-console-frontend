import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/contacts.css";
import { contactApi } from "../api/contactApi";
import { getAuthContext } from "../api/authSession";

type ContactGroup = {
  id: string;
  name: string;
};

const GROUP_CACHE_KEY = "contact-management-groups";

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

const normalizeGroup = (item: any): ContactGroup => ({
  id: item?.id || item?._id || item?.groupId || item?.name,
  name: item?.name || item?.groupName || item?.label || "",
});

const GroupManagement: React.FC = () => {
  const { companyId } = getAuthContext();
  const [groups, setGroups] = useState<ContactGroup[]>([]);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const loadGroups = async () => {
    setLoading(true);

    try {
      const res = await contactApi.listGroups();
      const nextGroups = Array.isArray(res.data)
        ? res.data.map(normalizeGroup).filter((group) => group.name)
        : (res.data?.groups || res.data?.data || [])
            .map(normalizeGroup)
            .filter((group: ContactGroup) => group.name);

      setGroups(nextGroups);
    } catch (error) {
      console.error(error);
      const cached = parseStoredList<ContactGroup>(GROUP_CACHE_KEY);
      setGroups(cached);
      showToast("info", "Loaded groups from local cache.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    saveList(GROUP_CACHE_KEY, groups);
  }, [groups]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = groupName.trim();

    if (!trimmed) {
      showToast("warning", "Please enter a group name.");
      return;
    }

    setSaving(true);

    try {
      const res = await contactApi.createGroup(trimmed);
      const nextGroup = normalizeGroup(res.data?.group || res.data || { name: trimmed });
      setGroups((current) => [nextGroup, ...current.filter((group) => group.id !== nextGroup.id)]);
      setGroupName("");
      showToast("success", "Group created.");
    } catch (error) {
      console.error(error);
      const fallbackGroup = { id: `local-group-${Date.now()}`, name: trimmed };
      setGroups((current) => [
        fallbackGroup,
        ...current.filter((group) => group.id !== fallbackGroup.id),
      ]);
      setGroupName("");
      showToast("info", "Saved locally because API is unavailable.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (groupId: string) => {
    try {
      await contactApi.deleteGroup(groupId);
      setGroups((current) => current.filter((group) => group.id !== groupId));
      showToast("success", "Group deleted.");
    } catch (error) {
      console.error(error);
      setGroups((current) => current.filter((group) => group.id !== groupId));
      showToast("info", "Deleted locally because API is unavailable.");
    }
  };

  return (
    <div className="contacts-page">
      <section className="contacts-card">
        <div className="contacts-card-header">
          <div>
            <h2 className="contacts-card-title">Group Management</h2>
            <p className="contacts-card-copy">Create and manage contact groups.</p>
          </div>
          <span className="contacts-badge">Company {companyId || "N/A"}</span>
        </div>

        <form className="contacts-form" onSubmit={handleSubmit}>
          <div className="contacts-form-grid">
            <label className="contacts-field">
              <span className="contacts-label">Group Name</span>
              <input
                className="contacts-input"
                type="text"
                placeholder="Loan, Insurance, Follow-up..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                autoFocus
              />
            </label>
          </div>

          <div className="contacts-actions">
            <button className="contacts-btn primary" type="submit" disabled={saving}>
              {saving ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </section>

      <section className="contacts-card">
        <div className="contacts-card-header">
          <div>
            <h2 className="contacts-card-title">Existing Groups</h2>
            <p className="contacts-card-copy">Remove groups when they are no longer needed.</p>
          </div>
          <span className="contacts-badge">{groups.length} total</span>
        </div>

        {loading ? (
          <div className="contacts-loader">Loading groups...</div>
        ) : groups.length ? (
          <div className="contacts-chip-row">
            {groups.map((group) => (
              <span className="contacts-chip" key={group.id}>
                {group.name}
                <button
                  type="button"
                  className="contacts-btn ghost"
                  onClick={() => handleDelete(group.id)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="contacts-empty">No groups found.</div>
        )}
      </section>
    </div>
  );
};

export default GroupManagement;
