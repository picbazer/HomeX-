'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DEMO_AGENTS } from '../../../data/demoData';
import { useApp } from '../../../context/AppContext';
import { PropertyCard } from '../../../components/PropertyCard';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Star,
  Building,
  ArrowLeft,
} from 'lucide-react';

export default function AgentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params?.id as string;
  const { properties } = useApp();

  const agent = DEMO_AGENTS.find((a) => a.id === agentId) || DEMO_AGENTS[0];

  // Properties associated with this agent
  const agentListings = properties.filter((p) => p.agentId === agent.id);

  const whatsappUrl = `https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello ${agent.name}, I am reaching out to you from HOME X regarding property consultation.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Agents</span>
      </button>

      {/* Agent Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={agent.avatar || agent.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'} alt={agent.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{agent.name}</h1>
              {agent.verified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Agent</span>
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-amber-700">{agent.agency}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{agent.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-900">{agent.rating}</span>
                <span>({agent.reviewsCount} verified reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4 text-slate-400" />
                <span>{agentListings.length} Active Listings</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pt-2 max-w-3xl">
              {agent.bio}
            </p>
          </div>

          {/* Contact CTAs */}
          <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
            <a
              href={`tel:${agent.phone}`}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {agent.phone}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${agent.email}`}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email Agent</span>
            </a>
          </div>
        </div>
      </div>

      {/* Agent's Listings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Active Listings Managed by {agent.name}
            </h2>
          </div>
          <span className="text-sm font-bold text-slate-500">{agentListings.length} properties</span>
        </div>

        {agentListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Building className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-600 font-semibold">No active listings under this agent profile currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {agentListings.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
