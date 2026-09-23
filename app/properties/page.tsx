'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../../components/PropertyCard';
import { FilterPanel } from '../../components/FilterPanel';
import { MapExplorer } from '../../components/MapExplorer';
import { FilterState, PropertyType, TransactionType } from '../../types';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Map as MapIcon,
  X,
  ArrowUpDown,
  Building,
} from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { properties } = useApp();

  // Initial Filter State parsed from URL parameters
  const initialListingType = (searchParams.get('listingType') as TransactionType) || 'All';
  const initialCity = searchParams.get('city') || 'All Cities';
  const initialPropertyType = (searchParams.get('propertyType') as PropertyType) || 'All';
  const initialBedrooms = searchParams.get('bedrooms')
    ? Number(searchParams.get('bedrooms'))
    : 'any';
  const initialMinPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 0;

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchParams.get('q') || '',
    listingType: initialListingType,
    city: initialCity,
    propertyType: initialPropertyType,
    minPrice: initialMinPrice,
    maxPrice: initialMaxPrice,
    bedrooms: initialBedrooms,
    bathrooms: 'any',
    minArea: 0,
    maxArea: 0,
    furnished: 'All',
    parking: false,
    verifiedOnly: false,
    sortBy: 'newest',
  });

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(9);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setDisplayCount(9); // Reset pagination on filter change
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      listingType: 'All',
      city: 'All Cities',
      propertyType: 'All',
      minPrice: 0,
      maxPrice: 0,
      bedrooms: 'any',
      bathrooms: 'any',
      minArea: 0,
      maxArea: 0,
      furnished: 'All',
      parking: false,
      verifiedOnly: false,
      sortBy: 'newest',
    });
    setDisplayCount(9);
  };

  // Comprehensive Filtering & Sorting Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Status check: Only show active properties in search
      if (prop.status !== 'active') return false;

      // 2. Search query (Title, Location, City, Description, Property Type)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLocation = prop.location.toLowerCase().includes(query);
        const matchesCity = prop.city.toLowerCase().includes(query);
        const matchesType = prop.type.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesCity && !matchesType && !matchesDesc) {
          return false;
        }
      }

      // 3. Listing Type (For Sale / For Rent / For Lease)
      if (filters.listingType !== 'All' && prop.listingType !== filters.listingType) {
        return false;
      }

      // 4. City
      if (filters.city !== 'All Cities' && prop.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // 5. Property Type
      if (filters.propertyType !== 'All' && prop.type !== filters.propertyType) {
        return false;
      }

      // 6. Verified Only
      if (filters.verifiedOnly && !prop.verified) {
        return false;
      }

      // 7. Price Range
      if (filters.minPrice > 0 && prop.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && prop.price > filters.maxPrice) return false;

      // 8. Bedrooms
      if (filters.bedrooms !== 'any' && prop.bedrooms < Number(filters.bedrooms)) {
        return false;
      }

      // 9. Bathrooms
      if (filters.bathrooms !== 'any' && prop.bathrooms < Number(filters.bathrooms)) {
        return false;
      }

      // 10. Furnished
      if (filters.furnished !== 'All' && prop.furnished !== filters.furnished) {
        return false;
      }

      // 11. Parking
      if (filters.parking && prop.parking < 1) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'area-asc') return a.area - b.area;
      if (filters.sortBy === 'area-desc') return b.area - a.area;
      // 'newest' default
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, filters]);

  const visibleProperties = filteredProperties.slice(0, displayCount);
  const hasMore = displayCount < filteredProperties.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Search & Controls Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by city, area, property type, keywords..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white pl-11 pr-4 py-3 rounded-2xl text-sm font-semibold text-slate-800 border border-slate-200 focus:border-amber-500 focus:outline-none transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => handleFilterChange({ searchQuery: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
            <span>Filters</span>
          </button>

          {/* List vs Map Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Map View</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-asc">Area: Small to Large</option>
              <option value="area-desc">Area: Large to Small</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid OR Map View */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 font-semibold">
              Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> properties on interactive map
            </p>
          </div>
          <MapExplorer properties={filteredProperties} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResults={filteredProperties.length}
            />
          </div>

          {/* Right Property Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-600">
                Found <span className="font-extrabold text-slate-900">{filteredProperties.length}</span> properties matching your criteria
              </p>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Building className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No properties match your search</h3>
                <p className="text-sm text-slate-500 max-w-md">
                  Try adjusting or resetting some of your filters (such as price, bedrooms, or location) to discover more listings.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-slate-900 text-amber-400 font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visibleProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="pt-6 text-center">
                    <button
                      onClick={() => setDisplayCount((prev) => prev + 6)}
                      className="px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all"
                    >
                      Load More Properties ({filteredProperties.length - visibleProperties.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="font-extrabold text-slate-900 text-lg">Filter Properties</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResults={filteredProperties.length}
                isMobileDrawer={true}
                onCloseMobile={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-semibold">Loading marketplace listings...</p>
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}
