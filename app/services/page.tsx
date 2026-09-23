'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  FileCheck,
  TrendingUp,
  ShieldAlert,
  Key,
  Briefcase,
  ArrowRight,
  Phone,
  CheckCircle2,
} from 'lucide-react';

const SERVICES = [
  {
    icon: <Building2 className="w-8 h-8 text-amber-600" />,
    title: 'Property Buying & Acquisition',
    desc: 'Full-cycle guidance for finding your dream home, negotiating prices, and ensuring title purity across prime residential zones in Bangladesh.',
    benefits: ['Curated listings matched to your budget', 'Private site visits & inspection', 'Zero hidden buyer commission'],
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-amber-600" />,
    title: 'Property Selling & High-Yield Marketing',
    desc: 'Showcase your property with architectural photography, 3D floorplans, and reach thousands of verified buyers through targeted marketing.',
    benefits: ['Professional photography', 'Market pricing advisory', 'Speedy closing with verified buyers'],
  },
  {
    icon: <Key className="w-8 h-8 text-amber-600" />,
    title: 'Rental & Tenant Management',
    desc: 'Hassle-free tenancy for property owners. We screen background checks, execute standard deed contracts, and handle recurring rent collections.',
    benefits: ['Verified tenant screening', 'Official stamp agreement drafting', 'Timely monthly rent dispersal'],
  },
  {
    icon: <FileCheck className="w-8 h-8 text-amber-600" />,
    title: 'Legal & Deed Verification (Title Search)',
    desc: 'Specialized real-estate legal vetting. We verify CS, SA, RS, City Jarip Khatiyan, Mutation Parchas, DCR, and RAJUK / CDA approvals before you buy.',
    benefits: ['Sub-registry office record searches', 'RAJUK plan validation', 'Title defect indemnification check'],
  },
  {
    icon: <Briefcase className="w-8 h-8 text-amber-600" />,
    title: 'Commercial Real Estate Advisory',
    desc: 'Strategic office, retail, warehouse, and land acquisition for corporations, multinational brands, and tech enterprises.',
    benefits: ['Grade-A commercial spaces', 'Floorplate efficiency analysis', 'Long-term corporate lease structuring'],
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-amber-600" />,
    title: 'Home Valuation & Market Appraisal',
    desc: 'Data-grounded pricing reports comparing historical transacted values across Dhaka, Chattogram, and Sylhet sub-markets.',
    benefits: ['Certified valuation report', 'Yield & ROI projection', 'Bank financing documentation support'],
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
          End-to-End Real Estate Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Comprehensive Solutions for Buyers, Sellers &amp; Investors
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From legal deed search and RAJUK verification to tenant management and commercial acquisitions, HOME X offers professional, transparent real-estate support across Bangladesh.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((s, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{s.desc}</p>

              <ul className="space-y-2.5 border-t border-slate-100 pt-4 mb-6">
                {s.benefits.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-amber-600 group transition-colors"
            >
              <span>Explore Related Listings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-black">Need custom consultation or deed search?</h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Our specialized legal and property advisory desk is available Sunday through Thursday, 9 AM to 7 PM.
          </p>
        </div>
        <a
          href="tel:+8809612466391"
          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 shrink-0 transition-transform hover:scale-105"
        >
          <Phone className="w-4 h-4" />
          <span>Call: +880 9612-466391</span>
        </a>
      </div>
    </div>
  );
}
