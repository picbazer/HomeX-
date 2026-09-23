'use client';

import React, { useState } from 'react';
import { Property } from '../types';
import { formatBDT } from '../lib/formatters';
import Link from 'next/link';
import {
  MapPin,
  X,
  ArrowUpRight,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
} from 'lucide-react';

interface MapExplorerProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty?: (id: string) => void;
}

export const MapExplorer = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
}: MapExplorerProps) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    properties.find((p) => p.id === selectedPropertyId) || properties[0] || null
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [activeRegion, setActiveRegion] = useState<'All' | 'Dhaka' | 'Chattogram' | 'Khulna' | 'Sylhet'>('All');

  const filteredProperties = activeRegion === 'All'
    ? properties
    : properties.filter((p) => p.city.toLowerCase() === activeRegion.toLowerCase());

  const handleMarkerClick = (property: Property) => {
    setActiveProperty(property);
    onSelectProperty?.(property.id);
  };

  return (
    <div className="relative w-full h-[600px] sm:h-[680px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 select-none">
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Region selector chips */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-lg">
          {(['All', 'Dhaka', 'Chattogram', 'Khulna', 'Sylhet'] as const).map((reg) => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRegion === reg
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {reg === 'All' ? 'Whole BD' : reg}
            </button>
          ))}
        </div>

        {/* Layer style & Zoom controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-lg text-xs">
            <button
              onClick={() => setMapStyle('streets')}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                mapStyle === 'streets' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                mapStyle === 'satellite' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
              className="p-1.5 text-slate-300 hover:text-amber-400 rounded-xl"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="p-1.5 text-slate-300 hover:text-amber-400 rounded-xl"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Realistic Cartographic Canvas (CSS/SVG) */}
      <div
        className="w-full h-full relative transition-transform duration-300 ease-out origin-center"
        style={{
          transform: `scale(${zoomLevel})`,
          backgroundColor: mapStyle === 'satellite' ? '#0d1821' : '#141e2b',
        }}
      >
        {/* SVG Grid, Roads & Geographic waterways */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2a3b50" strokeWidth="1" />
            </pattern>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Waterways / River system (Buriganga, Meghna, Karnaphuli, Rupsha) */}
          <path
            d="M -50,150 Q 200,120 380,240 T 700,450 T 1100,520 T 1500,750"
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M 650,-20 Q 720,180 750,320 T 950,600"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="24"
            opacity="0.3"
          />

          {/* Highway network (N1, N2, N3, N8 Expressway) */}
          <path d="M 120,0 L 480,320 L 780,620 L 980,800" fill="none" stroke="#374151" strokeWidth="6" strokeDasharray="10 5" />
          <path d="M 30,300 L 480,320 L 1200,310" fill="none" stroke="#4b5563" strokeWidth="5" />
          <path d="M 480,320 L 520,140 L 720,20" fill="none" stroke="#374151" strokeWidth="5" />

          {/* Dhaka Metropolitan Glow */}
          <circle cx="48%" cy="34%" r="140" fill="url(#hubGlow)" />
          {/* Chattogram Metropolitan Glow */}
          <circle cx="72%" cy="72%" r="100" fill="url(#hubGlow)" />
          {/* Khulna Glow */}
          <circle cx="30%" cy="65%" r="80" fill="url(#hubGlow)" />
        </svg>

        {/* City Hub Labels on Map */}
        <div className="absolute top-[28%] left-[45%] text-[11px] font-extrabold tracking-widest text-slate-400 uppercase pointer-events-none">
          Dhaka Metro
        </div>
        <div className="absolute top-[68%] left-[70%] text-[11px] font-extrabold tracking-widest text-slate-400 uppercase pointer-events-none">
          Chattogram Port
        </div>
        <div className="absolute top-[62%] left-[26%] text-[11px] font-extrabold tracking-widest text-slate-400 uppercase pointer-events-none">
          Khulna
        </div>
        <div className="absolute top-[26%] left-[78%] text-[11px] font-extrabold tracking-widest text-slate-400 uppercase pointer-events-none">
          Sylhet
        </div>
        <div className="absolute top-[86%] left-[80%] text-[11px] font-extrabold tracking-widest text-slate-400 uppercase pointer-events-none">
          Cox&apos;s Bazar
        </div>

        {/* Dynamic Property Price Markers */}
        {filteredProperties.map((prop) => {
          const isSelected = activeProperty?.id === prop.id;
          const coords = prop.mapCoordinates || { displayX: 50, displayY: 50 };

          return (
            <button
              key={prop.id}
              onClick={() => handleMarkerClick(prop)}
              style={{
                left: `${coords.displayX || 50}%`,
                top: `${coords.displayY || 50}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200 group ${
                isSelected ? 'scale-110 z-30' : 'hover:scale-110 hover:z-20'
              }`}
              title={`${prop.title} - ${formatBDT(prop.price)}`}
            >
              <div
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full font-black text-xs shadow-xl border backdrop-blur-md transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-500/30'
                    : 'bg-slate-900 text-white border-slate-600 hover:border-amber-400 hover:text-amber-400'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {formatBDT(prop.price, {
                    compact: true,
                    period: prop.pricePeriod,
                    showPeriod: prop.listingType === 'For Rent',
                  })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Property Preview Card (Bottom-Left) */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-30 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 flex gap-3.5 relative">
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute -top-2 -right-2 w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Thumbnail */}
            <div className="w-28 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProperty.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                alt={activeProperty.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md uppercase">
                {activeProperty.listingType}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium truncate">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate">{activeProperty.location}, {activeProperty.city}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                  {activeProperty.title}
                </h4>

                <div className="flex items-center gap-2.5 text-[11px] text-slate-600 mt-1">
                  {activeProperty.bedrooms > 0 && (
                    <span className="flex items-center gap-1 font-semibold">
                      <Bed className="w-3.5 h-3.5 text-slate-400" /> {activeProperty.bedrooms} Beds
                    </span>
                  )}
                  {activeProperty.bathrooms > 0 && (
                    <span className="flex items-center gap-1 font-semibold">
                      <Bath className="w-3.5 h-3.5 text-slate-400" /> {activeProperty.bathrooms} Baths
                    </span>
                  )}
                  <span className="flex items-center gap-1 font-semibold">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400" /> {activeProperty.area} sq ft
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                <span className="text-sm font-black text-slate-900">
                  {formatBDT(activeProperty.price, {
                    period: activeProperty.pricePeriod,
                    showPeriod: activeProperty.listingType === 'For Rent',
                  })}
                </span>
                <Link
                  href={`/property/${activeProperty.id}`}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Info Ribbon */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-[11px] text-slate-300 border border-slate-700">
        <Navigation className="w-3 h-3 text-amber-400" />
        <span>Click any price marker to inspect listing preview</span>
      </div>
    </div>
  );
};
