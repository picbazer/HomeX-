'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { formatBDT } from '../../lib/formatters';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trash2,
  Eye,
  Check,
  Building,
  TrendingUp,
  Clock,
  Layers,
  Search,
} from 'lucide-react';

export default function AdminPage() {
  const {
    properties,
    reports,
    currentUser,
    loginAsAdmin,
    loginAsUser,
    updateProperty,
    deleteProperty,
    dismissReport,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'reports'>('listings');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'reported'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Stats calculation
  const totalCount = properties.length;
  const activeCount = properties.filter((p) => p.status === 'active').length;
  const pendingCount = properties.filter((p) => p.status === 'pending').length;
  const reportedCount = reports.filter((r) => r.status === 'pending').length;
  const verifiedCount = properties.filter((p) => p.verified).length;

  // Filtered properties
  const displayedProperties = properties.filter((p) => {
    if (filterStatus === 'pending' && p.status !== 'pending') return false;
    if (filterStatus === 'active' && p.status !== 'active') return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.ownerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApprove = (id: string, title: string) => {
    updateProperty(id, { status: 'active' });
    addToast(`Approved listing: "${title}" is now active on marketplace.`, 'success');
  };

  const handleReject = (id: string, title: string) => {
    updateProperty(id, { status: 'rejected' });
    addToast(`Listing "${title}" rejected.`, 'info');
  };

  const handleToggleVerified = (id: string, currentVerified: boolean, title: string) => {
    updateProperty(id, { verified: !currentVerified });
    addToast(
      !currentVerified
        ? `Badge awarded: "${title}" is now Verified.`
        : `Badge revoked: "${title}" is unverified.`,
      'info'
    );
  };

  const handleDeleteListing = (id: string, title: string) => {
    if (confirm(`Permanently delete "${title}"?`)) {
      deleteProperty(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner & Role Switcher */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight">HOME X Moderation Console</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-slate-950 uppercase">
                Admin Panel
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Verify legal ownership documents, approve seller submissions, and review reports.
            </p>
          </div>
        </div>

        {/* Role Switcher for Tester */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold px-2">Role:</span>
          <button
            onClick={loginAsAdmin}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentUser?.role === 'ADMIN'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin Moderator
          </button>
          <button
            onClick={loginAsUser}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentUser?.role === 'USER'
                ? 'bg-white text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Regular User
          </button>
        </div>
      </div>

      {/* Metric Cards (Section 17 requirements) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Listings</span>
            <Building className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{totalCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Active on Site</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">{activeCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-2">{pendingCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Pending Reports</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-600 mt-2">{reportedCount}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'listings'
                ? 'bg-slate-900 text-amber-400'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Property Listings ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-slate-900 text-amber-400'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Reported Listings ({reports.length})</span>
          </button>
        </div>

        {activeTab === 'listings' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Only</option>
              <option value="active">Active Only</option>
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Listings Table */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px] text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Property</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Owner / Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Verified Badge</th>
                  <th className="p-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {displayedProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Property info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80'}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/property/${p.id}`}
                            className="font-bold text-slate-900 hover:text-amber-600 line-clamp-1"
                          >
                            {p.title}
                          </Link>
                          <p className="text-[11px] text-slate-400">
                            {p.type} • {p.location}, {p.city}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-bold text-slate-900 whitespace-nowrap">
                      {formatBDT(p.price)}
                    </td>

                    {/* Owner */}
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{p.ownerName}</p>
                      <p className="text-[11px] text-slate-400">{p.ownerPhone}</p>
                    </td>

                    {/* Status */}
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                          p.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* Verified Badge Toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleVerified(p.id, p.verified, p.title)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all inline-flex items-center gap-1 ${
                          p.verified
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                        title="Click to toggle Verified badge"
                      >
                        {p.verified ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{p.verified ? 'Verified' : 'Unverified'}</span>
                      </button>
                    </td>

                    {/* Moderation Actions */}
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {p.status !== 'active' && (
                          <button
                            onClick={() => handleApprove(p.id, p.title)}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-bold"
                            title="Approve listing"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}

                        {p.status !== 'rejected' && (
                          <button
                            onClick={() => handleReject(p.id, p.title)}
                            className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold"
                            title="Reject listing"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <Link
                          href={`/property/${p.id}`}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDeleteListing(p.id, p.title)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Reported Listings */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Zero Suspicious Reports</h3>
              <p className="text-xs text-slate-500">
                All marketplace properties comply with community safety standards.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 uppercase">
                        {rep.reason}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Reported {new Date(rep.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900">
                      Target Property: <span className="text-amber-700">{rep.propertyTitle}</span>
                    </h4>

                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      &ldquo;{rep.details}&rdquo;
                    </p>

                    {rep.reporterEmail && (
                      <p className="text-[11px] text-slate-400">
                        Reporter: <span className="font-semibold">{rep.reporterEmail}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/property/${rep.propertyId}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </Link>

                    <button
                      onClick={() => dismissReport(rep.id)}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl"
                    >
                      Dismiss Report
                    </button>

                    <button
                      onClick={() => {
                        deleteProperty(rep.propertyId);
                        dismissReport(rep.id);
                      }}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl"
                    >
                      Remove Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
