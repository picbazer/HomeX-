'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { formatBDT } from '../../lib/formatters';
import {
  Building,
  PlusCircle,
  Heart,
  MessageSquare,
  User,
  Settings,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Mail,
  Phone,
  Edit,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    currentUser,
    properties,
    favorites,
    inquiries,
    deleteProperty,
    updateProperty,
    addToast,
    loginAsUser,
    loginAsAdmin,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'profile'>('listings');

  // Properties belonging to this user (or if none, demo properties mapped to user)
  const userProperties = properties.filter((p) =>
    currentUser ? p.ownerEmail === currentUser.email || p.ownerId === currentUser.id : false
  );

  // Inquiries for user's properties
  const userPropertyIds = userProperties.map((p) => p.id);
  const relevantInquiries = inquiries.filter((inq) => userPropertyIds.includes(inq.propertyId));

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove the listing "${title}"?`)) {
      deleteProperty(id);
    }
  };

  const handleToggleSold = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'sold' : 'active';
    updateProperty(id, { status: newStatus as 'active' | 'sold' });
    addToast(`Listing status updated to ${newStatus}.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner / User Welcome */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 font-black text-2xl flex items-center justify-center shadow-lg">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">
                Welcome, {currentUser?.name || 'User'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 uppercase">
                {currentUser?.role || 'CLIENT'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentUser?.email || 'Logged in user'} • Member of HOME X Bangladesh
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/add-property"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl flex items-center gap-2 shadow-md transition-transform hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Listing</span>
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Admin Console</span>
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'bg-slate-900 text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>My Listings ({userProperties.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'inquiries'
              ? 'bg-slate-900 text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquiries Received ({relevantInquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-slate-900 text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account Settings</span>
        </button>

        <Link
          href="/favorites"
          className="ml-auto px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Saved Listings ({favorites.length})</span>
        </Link>
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {userProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">You haven&apos;t posted any properties yet</h3>
              <p className="text-xs text-slate-500">
                Are you looking to sell an apartment, house, or rent a shop? Post your listing today for free.
              </p>
              <Link
                href="/add-property"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create First Listing</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {userProperties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {p.status === 'active' ? 'Active' : p.status === 'pending' ? 'Pending Review' : 'Sold / Inactive'}
                        </span>

                        {p.verified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            Unverified
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mt-1">{p.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {p.location}, {p.city} • <strong className="text-slate-900">{formatBDT(p.price)}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <Link
                      href={`/property/${p.id}`}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                      title="View public page"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Link>

                    <button
                      onClick={() => handleToggleSold(p.id, p.status)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      title="Toggle sold/rented status"
                    >
                      {p.status === 'active' ? 'Mark Sold' : 'Mark Active'}
                    </button>

                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1 transition-colors"
                      title="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {relevantInquiries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No customer inquiries yet</h3>
              <p className="text-xs text-slate-500">
                When buyers or renters reach out regarding your listed properties, their inquiry messages and contact details will be logged here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {relevantInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                        Inquiry on: {inq.propertyTitle}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                        {inq.senderName}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed">
                    &ldquo;{inq.message}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${inq.senderEmail}`} className="hover:text-amber-600">{inq.senderEmail}</a>
                    </span>
                    {inq.senderPhone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${inq.senderPhone}`} className="hover:text-amber-600">{inq.senderPhone}</a>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900 pb-2 border-b border-slate-100">
            Profile &amp; Contact Information
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={currentUser?.name || ''}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                readOnly
                defaultValue={currentUser?.email || ''}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 font-semibold text-slate-600 cursor-not-allowed"
              />
              <span className="text-[11px] text-slate-400">Authenticated via Firebase / Google Sign-in</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                defaultValue={currentUser?.phone || '+880 1711-987654'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Account Role
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => loginAsUser()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    currentUser?.role === 'USER'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Standard User
                </button>
                <button
                  type="button"
                  onClick={() => loginAsAdmin()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    currentUser?.role === 'ADMIN'
                      ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-500'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  Admin Moderator
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => addToast('Profile settings saved successfully.', 'success')}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
