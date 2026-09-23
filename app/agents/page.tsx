'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_AGENTS } from '../../data/demoData';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Building,
  Star,
  ArrowRight,
  Search,
  CheckCircle2,
} from 'lucide-react';

export default function AgentsPage() {
  const { properties } = useApp();
  const [cityFilter, setCityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = DEMO_AGENTS.filter((agent) => {
    if (cityFilter !== 'All' && !agent.location.toLowerCase().includes(cityFilter.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        agent.name.toLowerCase().includes(q) ||
        agent.agency.toLowerCase().includes(q) ||
        agent.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
          Trusted Real Estate Professionals
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find Licensed Property Agents
        </h1>
        <p className="text-sm text-slate-500">
          Connect with top-rated, certified property advisors across Dhaka, Chattogram, and Sylhet for seamless transactions and verified legal documentation.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search agents by name, agency or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['All', 'Dhaka', 'Chattogram', 'Sylhet'].map((city) => (
            <button
              key={city}
              onClick={() => setCityFilter(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                cityFilter === city
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredAgents.map((agent) => {
          // Count agent's properties
          const agentListingsCount = properties.filter((p) => p.agentId === agent.id).length || agent.listingsCount;

          return (
            <div
              key={agent.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Top Profile Header */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={agent.avatar || agent.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-slate-900 truncate">
                        {agent.name}
                      </h3>
                      {agent.verified && (
                        <span title="Verified Agent" className="shrink-0 inline-flex">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate">{agent.agency}</p>

                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{agent.location}</span>
                    </div>
                  </div>
                </div>

                {/* Rating & Stats Bar */}
                <div className="grid grid-cols-2 gap-2 my-5 py-3 border-y border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">{agent.rating}</span>
                      <span className="text-slate-400 ml-1">({agent.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 font-bold text-slate-900">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>{agentListingsCount} Properties</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {agent.bio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href={`/agents/${agent.id}`}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Full Profile &amp; Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 border border-slate-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 border border-slate-200"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
