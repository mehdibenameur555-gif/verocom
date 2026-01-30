"use client";

import type { ComponentType, InputHTMLAttributes, SVGProps } from "react";
import { useMemo, useState, useEffect } from "react";
import { useAdminImagesStore } from "@/lib/adminImages";
import Image from "next/image";
import {
  CheckCircle,
  CircleDot,
  Database,
  RefreshCcw,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";

type UserRecord = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  verified: boolean;
  lastSearch: string;
};

type MasterDataRecord = {
  id: number;
  label: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  logo: string;
  updatedAt: string;
};

const initialUsers: UserRecord[] = [];

const initialMasterData: MasterDataRecord[] = [];

export default function AdminDashboardPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoConfirmed, setLogoConfirmed] = useState<boolean>(false);
  // جلب الشعار عند تحميل الصفحة
  useEffect(() => {
    fetch('/api/logo')
      .then(res => res.json())
      .then(data => {
        if (data.dataUrl) {
          setLogo(data.dataUrl);
        }
      });
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoPreview(reader.result);
        setLogoConfirmed(false);
      }
    };
    reader.readAsDataURL(file);
  };
  const confirmLogo = async () => {
    if (!logoPreview) return;
    setLogo(logoPreview);
    setLogoConfirmed(true);
    // حفظ الشعار في الخادم
    await fetch('/api/logo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl: logoPreview })
    });
  };
  const clearLogo = () => {
    setLogoPreview(null);
    setLogo(null);
    setLogoConfirmed(false);
  };
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [masterData, setMasterData] = useState<MasterDataRecord[]>(initialMasterData);
  const [userSearch, setUserSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [userToDelete, setUserToDelete] = useState<UserRecord | null>(null);
  const [recordToDelete, setRecordToDelete] = useState<MasterDataRecord | null>(null);
    const [userToEdit, setUserToEdit] = useState<UserRecord | null>(null);
    const [userToView, setUserToView] = useState<UserRecord | null>(null);
    const [recordToEdit, setRecordToEdit] = useState<MasterDataRecord | null>(null);
  const adminImages = useAdminImagesStore();

  const filteredUsers = useMemo(() => {
    const normalized = userSearch.toLowerCase();
    const visible = users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(normalized),
    );
    return visible.slice(0, limit);
  }, [userSearch, users, limit]);

  const toggleUserStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
  };

  const resetPassword = (id: number) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, lastSearch: "Reset envoyé" } : user)),
    );
  };

  const confirmUserDeletion = () => {
    if (!userToDelete) return;
    setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
    setUserToDelete(null);
  };

  const handleAdminImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onerror = () => {
      console.error("FileReader error:", reader.error);
      alert("Erreur lors de la lecture du fichier.");
    };
    reader.onload = () => {
      try {
        const dataUrl = typeof reader.result === "string" ? reader.result : null;
        if (dataUrl) {
          adminImages.setSlot(index, dataUrl);
          alert(`${file.name} ajouté avec succès.`);
        }
      } catch (error) {
        console.error("Error storing file:", error);
        alert("Erreur lors du stockage du fichier.");
      }
    };
    reader.readAsDataURL(file);
  };

  const confirmRecordDeletion = () => {
    if (!recordToDelete) return;
    setMasterData((prev) => prev.filter((record) => record.id !== recordToDelete.id));
    setRecordToDelete(null);
  };

    const saveUserEdit = () => {
      if (!userToEdit) return;
      setUsers((prev) => prev.map((user) => (user.id === userToEdit.id ? userToEdit : user)));
      setUserToEdit(null);
    };

    const saveRecordEdit = () => {
      if (!recordToEdit) return;
      setMasterData((prev) =>
        prev.map((record) => (record.id === recordToEdit.id ? recordToEdit : record))
      );
      setRecordToEdit(null);
    };

  return (
    <div className="space-y-8">
      {/* قسم رفع اللوجو */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">إعدادات الشعار</p>
            <h2 className="text-xl font-bold text-slate-900">شعار المنصة</h2>
            <p className="text-sm text-slate-500">يمكنك هنا رفع أو تغيير شعار المنصة الذي يظهر في السايدبار.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-48 h-48 flex items-center justify-center bg-slate-100 rounded-lg border border-slate-200">
            {logoPreview || logo ? (
              <Image src={logoPreview || logo || ""} alt="Logo preview" width={180} height={180} className="object-contain w-44 h-44" />
            ) : (
              <span className="text-sm text-slate-400">لا يوجد شعار</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="logo-upload" className="inline-flex items-center gap-2 rounded bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer">
              رفع شعار جديد
            </label>
            <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            <div className="flex gap-2 mt-2">
              <button type="button" className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100" onClick={clearLogo} disabled={!logoPreview && !logo}>
                إزالة
              </button>
              <button type="button" className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50" onClick={confirmLogo} disabled={!logoPreview}>
                حفظ الشعار
              </button>
              {logoConfirmed && <span className="text-xs font-semibold text-emerald-700">تم الحفظ</span>}
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Paramètres admin</p>
            <h2 className="text-xl font-bold text-slate-900">Images du tableau de bord</h2>
            <p className="text-sm text-slate-500">Seul l&apos;admin peut définir les visuels affichés en haut du tableau de bord.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Bloc 1", "Bloc 2"].map((label, idx) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex flex-col gap-3">
              <div className="text-sm font-semibold text-slate-700">{label}</div>
              {adminImages.slots[idx] ? (
                <div className="w-full h-40 rounded-lg bg-gray-100 flex items-center justify-center">
                  {adminImages.slots[idx]?.startsWith("data:video") ? (
                    <video src={adminImages.slots[idx] || ""} controls className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <Image
                      src={adminImages.slots[idx] || ""}
                      alt={`${label} preview`}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover rounded-lg"
                      unoptimized
                    />
                  )}
                </div>
              ) : (
                <div className="w-full h-40 flex items-center justify-center rounded border border-dashed border-slate-300 text-xs font-semibold text-slate-400">
                  Aucun fichier
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <label
                  htmlFor={`admin-slot-upload-${idx}`}
                  className="inline-flex items-center gap-2 rounded bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
                >
                  Ajouter un fichier
                </label>
                <input
                  id={`admin-slot-upload-${idx}`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleAdminImageUpload(idx, e)}
                />
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  onClick={() => adminImages.clearSlot(idx)}
                  disabled={!adminImages.slots[idx]}
                >
                  Effacer
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                  onClick={() => adminImages.confirmSlot(idx)}
                  disabled={!adminImages.slots[idx]}
                >
                  Valider l&apos;image
                </button>
                {adminImages.slots[idx] && (
                  <span className={`text-xs font-semibold ${
                    adminImages.confirmed[idx]
                      ? "text-emerald-700"
                      : "text-amber-600"
                  }`}>
                    {adminImages.confirmed[idx] ? "Validée" : "En attente de validation"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Total Users"
          value="210,000"
          helper="+2.1% vs last week"
          icon={Users}
          accent="from-[#1e3a8a] to-[#1e40af]"
        />
        <AnalyticsCard
          title="Verified Users"
          value="180,000"
          helper="85% verified"
          icon={ShieldCheck}
          accent="from-emerald-500 to-teal-500"
        />
        <AnalyticsCard
          title="Admins Active"
          value="3,000"
          helper="+140 new"
          icon={UserCheck}
          accent="from-[#1e3a8a] to-[#2563eb]"
        />
        <AnalyticsCard
          title="Searches Today"
          value="10,000"
          helper="Peak 09:15"
          icon={Search}
          accent="from-amber-500 to-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <section className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">User Management</p>
              <h2 className="text-xl font-bold text-slate-900">Manage Users</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <input
                  aria-label="Search users"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1e40af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Search by name or email"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <span className="text-xs font-semibold text-slate-500">Limit</span>
                <select
                  aria-label="Results limit"
                  className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:border-[#1e40af] focus:outline-none"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  {[5, 10, 25, 50].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </header>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Verification</th>
                  <th className="px-4 py-3">Last Search</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <CircleDot className="h-4 w-4" />
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          user.verified ? "bg-blue-50 text-[#1e40af]" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.verified ? (
                          <ShieldCheck className="h-4 w-4" />
                        ) : (
                          <UserCheck className="h-4 w-4" />
                        )}
                        {user.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{user.lastSearch}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2 text-xs font-semibold">
                          <button
                            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-[#1e40af] hover:text-[#1e40af]"
                            onClick={() => setUserToView(user)}
                          >
                            View
                          </button>
                          <button
                            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-[#1e40af] hover:text-[#1e40af]"
                            onClick={() => setUserToEdit({ ...user })}
                          >
                            Edit
                          </button>
                        <button
                          className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-[#1e40af] hover:text-[#1e40af]"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-[#1e40af] hover:text-[#1e40af]"
                          onClick={() => resetPassword(user.id)}
                        >
                          Reset Password
                        </button>
                        <button
                          className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1 text-red-600 transition hover:bg-red-50"
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={5}>
                      No users match this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex items-center gap-3">
            <Database className="h-10 w-10 rounded-xl bg-[#1e3a8a] p-2 text-white" />
            <div>
              <p className="text-sm font-semibold text-slate-500">Data Stewardship</p>
              <h2 className="text-xl font-bold text-slate-900">Master Data Control</h2>
            </div>
          </header>

          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <Input label="Contact email" defaultValue="ops@admin.io" type="email" />
              <Input label="Contact phone" defaultValue="+216 55 808 404" />
              <Input label="Default description" defaultValue="Central admin portal" className="sm:col-span-2" />
              <Input label="Brand logo URL" defaultValue="https://dummyimage.com/120x40/0f172a/ffffff&text=ADMIN" className="sm:col-span-2" />
            </div>
            <button className="w-full rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e40af]">
              Update master data
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Available records</p>
                <p className="text-sm text-slate-700">Last updates or deletions</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {masterData.length} items
              </span>
            </div>
            <ul className="divide-y divide-slate-200">
              {masterData.map((record) => (
                <li key={record.id} className="flex items-start gap-3 px-4 py-4">
                  <Image
                    alt={`${record.label} logo`}
                    className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                    src={record.logo}
                    width={48}
                    height={48}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{record.label}</p>
                        <p className="text-xs text-slate-500">Updated {record.updatedAt}</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Synced
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">{record.description}</p>
                    <div className="mt-2 grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-2">
                      <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1 font-semibold">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        {record.contactEmail}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1 font-semibold">
                        <RefreshCcw className="h-4 w-4 text-sky-500" />
                        {record.contactPhone}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                      <button
                        className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-[#1e40af] hover:text-[#1e40af]"
                        onClick={() => setRecordToEdit({ ...record })}
                      >
                        Edit
                      </button>
                      <button
                        className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1 text-red-600 transition hover:bg-red-50"
                        onClick={() => setRecordToDelete(record)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {masterData.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-slate-500">No master data records.</li>
              )}
            </ul>
          </div>
        </section>
      </div>

      {userToDelete && (
        <ConfirmModal
          title="Delete user"
          description={`Are you sure you want to delete ${userToDelete.name}? This action cannot be undone.`}
          onCancel={() => setUserToDelete(null)}
          onConfirm={confirmUserDeletion}
        />
      )}

      {recordToDelete && (
        <ConfirmModal
          title="Delete master data"
          description={`Delete ${recordToDelete.label} from master data? This will remove linked assets until re-synced.`}
          onCancel={() => setRecordToDelete(null)}
          onConfirm={confirmRecordDeletion}
        />
      )}

        {userToEdit && (
          <EditUserModal user={userToEdit} onSave={saveUserEdit} onCancel={() => setUserToEdit(null)} />
        )}

        {userToView && (
          <ViewUserModal user={userToView} onClose={() => setUserToView(null)} />
        )}

        {recordToEdit && (
          <EditRecordModal record={recordToEdit} onSave={saveRecordEdit} onCancel={() => setRecordToEdit(null)} />
        )}
    </div>
  );
}

type AnalyticsCardProps = {
  title: string;
  value: string;
  helper: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
};

function AnalyticsCard({ title, value, helper, icon: Icon, accent }: AnalyticsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-10`} />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <p className="text-sm text-slate-600">{helper}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a8a] text-white">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</span>
      <input
        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1e40af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        {...props}
      />
    </label>
  );
}

type ConfirmModalProps = {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function ConfirmModal({ title, description, onCancel, onConfirm }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3 text-sm font-semibold">
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:bg-slate-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-full bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm delete
          </button>
        </div>
      </div>
    </div>
  );
}

  type EditUserModalProps = {
    user: UserRecord;
    onSave: () => void;
    onCancel: () => void;
  };

  function EditUserModal({ user, onSave, onCancel }: EditUserModalProps) {
    const [editedUser, setEditedUser] = useState(user);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900">Edit User</h3>
          <div className="mt-4 space-y-4">
            <Input
              label="Name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Status</span>
              <select
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-[#1e40af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={editedUser.status}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, status: e.target.value as "active" | "inactive" })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editedUser.verified}
                onChange={(e) => setEditedUser({ ...editedUser, verified: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-[#1e40af] focus:ring-[#1e40af]"
              />
              <span className="text-sm font-semibold text-slate-700">Verified</span>
            </label>
          </div>
          <div className="mt-6 flex justify-end gap-3 text-sm font-semibold">
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:bg-slate-50"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-[#1e3a8a] px-4 py-2 text-white transition hover:bg-[#1e40af]"
              onClick={() => {
                Object.assign(user, editedUser);
                onSave();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  type ViewUserModalProps = {
    user: UserRecord;
    onClose: () => void;
  };

  function ViewUserModal({ user, onClose }: ViewUserModalProps) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900">User Details</h3>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{user.name}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 text-slate-900">{user.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</p>
                <p className="mt-1 font-semibold text-slate-900">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                      user.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Verified</p>
                <p className="mt-1 font-semibold text-slate-900">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                      user.verified ? "bg-blue-50 text-[#1e40af]" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.verified ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Last Search</p>
              <p className="mt-1 text-slate-900">{user.lastSearch}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="rounded-full bg-[#1e3a8a] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#1e40af]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  type EditRecordModalProps = {
    record: MasterDataRecord;
    onSave: () => void;
    onCancel: () => void;
  };

  function EditRecordModal({ record, onSave, onCancel }: EditRecordModalProps) {
    const [editedRecord, setEditedRecord] = useState(record);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900">Edit Master Data</h3>
          <div className="mt-4 space-y-4">
            <Input
              label="Label"
              value={editedRecord.label}
              onChange={(e) => setEditedRecord({ ...editedRecord, label: e.target.value })}
            />
            <Input
              label="Contact Email"
              type="email"
              value={editedRecord.contactEmail}
              onChange={(e) => setEditedRecord({ ...editedRecord, contactEmail: e.target.value })}
            />
            <Input
              label="Contact Phone"
              value={editedRecord.contactPhone}
              onChange={(e) => setEditedRecord({ ...editedRecord, contactPhone: e.target.value })}
            />
            <Input
              label="Description"
              value={editedRecord.description}
              onChange={(e) => setEditedRecord({ ...editedRecord, description: e.target.value })}
            />
            <Input
              label="Logo URL"
              value={editedRecord.logo}
              onChange={(e) => setEditedRecord({ ...editedRecord, logo: e.target.value })}
            />
          </div>
          <div className="mt-6 flex justify-end gap-3 text-sm font-semibold">
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:bg-slate-50"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-[#1e3a8a] px-4 py-2 text-white transition hover:bg-[#1e40af]"
              onClick={() => {
                Object.assign(record, editedRecord);
                onSave();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
