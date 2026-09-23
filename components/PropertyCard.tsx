'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { formatBDT, formatArea } from '../lib/formatters';
import {
  Heart,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  CheckCircle2,
  Scale,
  ArrowUpRight,
  Clock,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard = ({ property, compact = false }: PropertyCardProps) => {
  const { isFavorite, toggleFavorite, isInCompare, toggleCompare } = useApp();
  const [imgError, setImgError] = useState(false);

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  // Fallback image placeholder
  const imageUrl =
    !imgError && property.images && property.images.length > 0
      ? property.images[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const isRent = property.listingType === 'For Rent' || property.listingType === 'For Lease';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Link href={`/property/${property.id}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={property.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Transaction Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
              property.listingType === 'For Sale'
                ? 'bg-slate-900/90 text-amber-400 border border-amber-400/30'
                : property.listingType === 'For Rent'
                ? 'bg-emerald-900/90 text-emerald-300 border border-emerald-400/30'
                : 'bg-indigo-900/90 text-indigo-200 border border-indigo-400/30'
            }`}
          >
            {property.listingType}
          </span>

          {/* Strictly Verified Badge */}
          {property.verified ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-700 shadow-md border border-emerald-200 backdrop-blur-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified</span>
            </span>
          ) : property.status === 'pending' ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold bg-amber-500/95 text-slate-950 shadow-md">
              <Clock className="w-3 h-3" />
              <span>Under Review</span>
            </span>
          ) : null}
        </div>

        {/* Action Buttons Top-Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Compare Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(property.id);
            }}
            aria-label="Add to comparison"
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md ${
              compared
                ? 'bg-amber-500 text-slate-950 scale-105'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-slate-950 hover:scale-105'
            }`}
            title={compared ? 'In comparison' : 'Compare property'}
          >
            <Scale className="w-4 h-4" />
          </button>

          {/* Favorite Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            aria-label="Add to favorites"
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md ${
              favorited
                ? 'bg-white text-rose-500 scale-105 shadow-rose-200'
                : 'bg-white/85 text-slate-700 hover:bg-white hover:text-rose-500 hover:scale-105'
            }`}
            title={favorited ? 'Remove from saved' : 'Save property'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Property Type Badge Bottom-Right */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-md">
            {property.type}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{property.location}, {property.city}</span>
          </div>

          {/* Title */}
          <Link href={`/property/${property.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Specs / Icons */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold">{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold">{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.area} Square Feet`}>
              <Maximize2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold">{formatArea(property.area)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Price and View Details Action */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              {isRent ? 'Rent Price' : 'Price'}
            </span>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              {formatBDT(property.price, {
                compact: false,
                period: property.pricePeriod,
                showPeriod: isRent,
              })}
            </span>
          </div>

          <Link
            href={`/property/${property.id}`}
            className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-slate-900 text-slate-700 group-hover:text-amber-400 flex items-center justify-center transition-all duration-200"
            title="View Details"
            aria-label={`View details for ${property.title}`}
          >
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
