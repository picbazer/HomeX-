'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { formatBDT, formatArea } from '../../lib/formatters';
import {
  Scale,
  X,
  CheckCircle2,
  Bed,
  Bath,
  Maximize2,
  Car,
  Sofa,
  Layers,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

export default function ComparePage() {
  const { properties, compareList, toggleCompare, clearCompare } = useApp();

  const comparedProperties = properties.filter((p) => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Side-by-Side Analysis
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-3">
            <span>Compare Properties</span>
            <span className="text-xs font-extrabold bg-slate-900 text-amber-400 px-3 py-1 rounded-full">
              {comparedProperties.length} / 3
            </span>
          </h1>
        </div>

        {comparedProperties.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
            >
              Clear Comparison
            </button>
            <Link
              href="/properties"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl transition-colors"
            >
              + Add Another Property
            </Link>
          </div>
        )}
      </div>

      {comparedProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            No properties selected for comparison
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You can select up to 3 properties across our marketplace and compare their pricing, dimensions, bedrooms, and amenities side-by-side.
          </p>
          <div className="pt-2">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <span>Browse Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-5 font-bold text-xs uppercase tracking-wider text-slate-400 w-1/4">
                    Features
                  </th>
                  {comparedProperties.map((prop) => (
                    <th key={prop.id} className="p-5 w-1/4 align-top">
                      <div className="relative group">
                        <button
                          onClick={() => toggleCompare(prop.id)}
                          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors z-10"
                          title="Remove from comparison"
                          aria-label={`Remove ${prop.title}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prop.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                            alt={prop.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{prop.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1">{prop.location}, {prop.city}</p>
                        <Link
                          href={`/property/${prop.id}`}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
                        >
                          <span>View Full Listing</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - comparedProperties.length) }).map((_, i) => (
                    <th key={i} className="p-5 w-1/4 align-middle text-center bg-slate-50/40 border-l border-slate-100">
                      <Link
                        href="/properties"
                        className="inline-flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl text-slate-400 hover:text-amber-600 transition-colors"
                      >
                        <Scale className="w-6 h-6 mb-2" />
                        <span className="text-xs font-bold">+ Add Listing</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {/* Price */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Price</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-black text-slate-900 text-base">
                      {formatBDT(p.price, {
                        period: p.pricePeriod,
                        showPeriod: p.listingType === 'For Rent',
                      })}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Location */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">City &amp; Area</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-semibold text-slate-800 text-xs">
                      {p.location}, {p.city}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Property Type */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Type</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-medium text-slate-800">
                      {p.type}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Transaction Status */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Transaction</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                        {p.listingType}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Bedrooms */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Bedrooms</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-semibold text-slate-800">
                      {p.bedrooms > 0 ? `${p.bedrooms} Beds` : 'N/A'}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Bathrooms */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Bathrooms</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-semibold text-slate-800">
                      {p.bathrooms > 0 ? `${p.bathrooms} Baths` : 'N/A'}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Area */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Area Size</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-semibold text-slate-800">
                      {formatArea(p.area)}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Parking */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Parking Slots</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-semibold text-slate-800">
                      {p.parking > 0 ? `${p.parking} Bays` : 'None'}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Furnished */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Furnishing</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5 font-medium text-slate-800">
                      {p.furnished}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>

                {/* Verification */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-5 font-bold text-slate-500 text-xs uppercase">Verification</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-5">
                      {p.verified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          Pending Review
                        </span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="p-5 text-slate-300">-</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
