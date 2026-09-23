'use client';

import React from 'react';
import { FilterState, PropertyType, TransactionType } from '../types';
import { RotateCcw, Check, CheckCircle2, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'House',
  'Villa',
  'Land',
  'Shop',
  'Office',
  'Room',
  'Warehouse',
  'Garage/Parking',
  'Commercial Property',
];

const CITIES = [
  'All Cities',
  'Dhaka',
  'Chattogram',
  'Khulna',
  'Sylhet',
  'Rajshahi',
  'Barishal',
  "Cox's Bazar",
];

export const FilterPanel = ({
  filters,
  onChange,
  onReset,
  totalResults,
  isMobileDrawer = false,
  onCloseMobile,
}: FilterPanelProps) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 ${isMobileDrawer ? '' : 'sticky top-24'}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-600" />
          <h2 className="font-extrabold text-slate-900 text-lg">Filters</h2>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-amber-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      <div className="space-y-6 pt-5">
        {/* Transaction Type Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Listing Type
          </label>
          <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
            {(['All', 'For Sale', 'For Rent', 'For Lease'] as const).map((type) => (
              <button
                key={type}
                onClick={() => onChange({ listingType: type as TransactionType | 'All' })}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  filters.listingType === type
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'For Sale' ? 'Sale' : type === 'For Rent' ? 'Rent' : type === 'For Lease' ? 'Lease' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* City Location */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            City / Division
          </label>
          <select
            value={filters.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Property Category
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => onChange({ propertyType: e.target.value as PropertyType | 'All' })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="All">All Property Types</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Verified Only Toggle */}
        <div className="pt-1">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 cursor-pointer hover:bg-emerald-50 transition-colors">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onChange({ verifiedOnly: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500"
            />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-950">Verified Listings Only</span>
            </div>
          </label>
          <p className="text-[11px] text-slate-500 mt-1 pl-1">
            Shows properties with verified ownership documents.
          </p>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Price Range (৳)
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block mb-1">Min (৳)</span>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => onChange({ minPrice: Number(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block mb-1">Max (৳)</span>
              <input
                type="number"
                placeholder="Any"
                value={filters.maxPrice || ''}
                onChange={(e) => onChange({ maxPrice: Number(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Bedrooms
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {(['any', 1, 2, 3, 4, 5] as const).map((val) => (
              <button
                key={val}
                onClick={() => onChange({ bedrooms: val })}
                className={`flex-1 min-w-[40px] py-2 text-xs font-bold rounded-xl border transition-all ${
                  filters.bedrooms === val
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {val === 'any' ? 'Any' : `${val}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Bathrooms
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {(['any', 1, 2, 3, 4] as const).map((val) => (
              <button
                key={val}
                onClick={() => onChange({ bathrooms: val })}
                className={`flex-1 min-w-[40px] py-2 text-xs font-bold rounded-xl border transition-all ${
                  filters.bathrooms === val
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {val === 'any' ? 'Any' : `${val}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Furnished */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Furnishing
          </label>
          <select
            value={filters.furnished}
            onChange={(e) => onChange({ furnished: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="All">All</option>
            <option value="Fully Furnished">Fully Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        {/* Parking Checkbox */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.parking}
              onChange={(e) => onChange({ parking: e.target.checked })}
              className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
            />
            <span>Must Include Parking Slot</span>
          </label>
        </div>

        {/* Mobile Close / Apply Button */}
        {isMobileDrawer && (
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={onCloseMobile}
              className="w-full py-3 bg-slate-900 text-amber-400 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Show {totalResults} Properties</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
