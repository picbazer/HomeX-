'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../../components/PropertyCard';
import { Heart, Search, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const { properties, favorites } = useApp();

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Saved Properties
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            <span>Your Favorites</span>
            <span className="text-sm font-bold bg-rose-50 text-rose-600 px-3 py-1 rounded-full border border-rose-200">
              {savedProperties.length}
            </span>
          </h1>
        </div>

        {savedProperties.length > 0 && (
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-amber-600 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Discover More Properties</span>
          </Link>
        )}
      </div>

      {/* Grid or Empty State */}
      {savedProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Your saved properties will appear here.
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Browse homes, apartments, and commercial spaces. Click the heart icon on any listing to save and compare them later.
          </p>
          <div className="pt-2">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
