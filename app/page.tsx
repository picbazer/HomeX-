'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyType, TransactionType } from '../types';
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Bed,
  ShieldCheck,
  Headphones,
  Heart,
  ArrowRight,
  Sparkles,
  Building2,
  Home as HomeIcon,
  TreePine,
  Store,
  Briefcase,
  Car,
  Warehouse,
} from 'lucide-react';

const CATEGORIES: { label: PropertyType; icon: React.ReactNode; count: number; image: string }[] = [
  {
    label: 'Apartment',
    icon: <Building className="w-5 h-5" />,
    count: 42,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'House',
    icon: <HomeIcon className="w-5 h-5" />,
    count: 28,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Villa',
    icon: <Building2 className="w-5 h-5" />,
    count: 15,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Land',
    icon: <TreePine className="w-5 h-5" />,
    count: 19,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Shop',
    icon: <Store className="w-5 h-5" />,
    count: 14,
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Office',
    icon: <Briefcase className="w-5 h-5" />,
    count: 22,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Garage/Parking',
    icon: <Car className="w-5 h-5" />,
    count: 8,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Commercial Property',
    icon: <Warehouse className="w-5 h-5" />,
    count: 16,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { properties } = useApp();

  // Search Bar State
  const [activeTab, setActiveTab] = useState<TransactionType>('For Sale');
  const [locationQuery, setLocationQuery] = useState('');
  const [propertyType, setPropertyType] = useState<string>('All');
  const [budgetTier, setBudgetTier] = useState<string>('any');
  const [bedroomChoice, setBedroomChoice] = useState<string>('any');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab) params.set('listingType', activeTab);
    if (locationQuery) params.set('city', locationQuery);
    if (propertyType && propertyType !== 'All') params.set('propertyType', propertyType);
    if (bedroomChoice && bedroomChoice !== 'any') params.set('bedrooms', bedroomChoice);

    // Budget parse
    if (budgetTier === 'under-50k') {
      params.set('maxPrice', '50000');
    } else if (budgetTier === '50k-1lakh') {
      params.set('minPrice', '50000');
      params.set('maxPrice', '100000');
    } else if (budgetTier === '1cr-3cr') {
      params.set('minPrice', '10000000');
      params.set('maxPrice', '30000000');
    } else if (budgetTier === 'above-3cr') {
      params.set('minPrice', '30000000');
    }

    router.push(`/properties?${params.toString()}`);
  };

  // Featured Properties: Active & handpicked
  const featuredProperties = properties
    .filter((p) => p.status === 'active' && p.featured)
    .slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-slate-950 pt-10 pb-16">
        {/* Background Image with Dark Tint Gradient */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
            alt="Modern luxury villa background"
            className="w-full h-full object-cover object-center brightness-60 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-top-3 duration-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Properties • Better Living</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Find a Place <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">You&apos;ll Love</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed">
            Discover homes, apartments, land and commercial properties in locations that matter to you.
          </p>

          {/* Hero Search Box Card */}
          <div className="mt-8 sm:mt-10 w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/40 text-left">
            {/* Tabs: BUY / RENT / SELL */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200/80 pb-3">
              {(['For Sale', 'For Rent', 'For Lease'] as const).map((tab) => {
                const label = tab === 'For Sale' ? 'BUY' : tab === 'For Rent' ? 'RENT' : 'SELL / LEASE';
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-900 text-amber-400 shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input Controls */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Location */}
              <div className="flex flex-col">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Location</span>
                </label>
                <select
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-slate-100/80 hover:bg-slate-100 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 border border-transparent focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="">Enter city or area</option>
                  <option value="Dhaka">Dhaka (Gulshan, Banani, Uttara)</option>
                  <option value="Chattogram">Chattogram (Khulshi, Agrabad)</option>
                  <option value="Khulna">Khulna (Sonadanga, Boyra)</option>
                  <option value="Sylhet">Sylhet (Upashahar, Zindabazar)</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Cox's Bazar">Cox&apos;s Bazar</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="flex flex-col">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-amber-600" />
                  <span>Property Type</span>
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-100/80 hover:bg-slate-100 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 border border-transparent focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="All">Any Property</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.label} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="flex flex-col">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                  <span>Budget</span>
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full bg-slate-100/80 hover:bg-slate-100 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 border border-transparent focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="any">Any Budget</option>
                  <option value="under-50k">Under ৳50,000 /mo</option>
                  <option value="50k-1lakh">৳50,000 - ৳1 Lakh /mo</option>
                  <option value="1cr-3cr">৳1 Cr - ৳3 Cr</option>
                  <option value="above-3cr">Above ৳3 Crore</option>
                </select>
              </div>

              {/* Bedrooms & Search Button Container */}
              <div className="flex flex-col sm:flex-row gap-2 lg:flex-col justify-end">
                <div className="flex flex-col flex-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bedrooms</span>
                  </label>
                  <select
                    value={bedroomChoice}
                    onChange={(e) => setBedroomChoice(e.target.value)}
                    className="w-full bg-slate-100/80 hover:bg-slate-100 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 border border-transparent focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
                  >
                    <option value="any">Any Beds</option>
                    <option value="1">1+ Beds</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>
              </div>

              {/* Full Width Search Button on Row below or grid */}
              <div className="sm:col-span-2 lg:col-span-4 mt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-amber-400 font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE HOME X (4 Feature Cards matching prompt Section 8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Verified Listings</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Listings can be reviewed before verification with transparent document checks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Trusted &amp; Secure</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Clear property information and transparent listing details for genuine peace of mind.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Headphones className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Expert Support</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Helpful guidance throughout your property journey from licensed local advisors.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Better Living</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Find properties that fit your needs and lifestyle in prime communities.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROPERTY CATEGORIES (Explore Properties matching Section 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Explore Properties
            </h2>
          </div>
          <Link
            href="/properties"
            className="text-sm font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1 group transition-colors"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={`/properties?propertyType=${encodeURIComponent(cat.label)}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  {cat.label}
                </h3>
                <span className="text-xs text-slate-300 font-medium">
                  {cat.count}+ Available
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROPERTIES (Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Featured Properties
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Handpicked Properties for You
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Handpicked properties worth exploring across Bangladesh.
            </p>
          </div>
          <Link
            href="/properties"
            className="text-sm font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1.5 group transition-colors"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 5. BRAND STORY BANNER (Matching reference visual image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f7f4ed] rounded-3xl sm:rounded-4xl p-6 sm:p-10 lg:p-14 border border-amber-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Visual Photo Card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury living space interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg">
                <span className="font-serif italic font-bold text-slate-900 text-lg">
                  More Than Just a Home
                </span>
              </div>
            </div>

            {/* Copy & Metrics */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Why Choose HOME X
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                More Than Properties.<br />
                <span className="text-amber-700">We Build Futures.</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you&apos;re buying, selling or renting, we make the process simple, transparent and stress-free. Your dream home or commercial space is closer than you think.
              </p>

              {/* 4 Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-amber-200">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">12K+</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Happy Clients</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">500+</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Properties Listed</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">25+</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Cities Covered</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">98%</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (Matching bottom banner in reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 lg:opacity-40 hidden sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
              alt="City skyline"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Ready to find your perfect home?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Let&apos;s Make It Happen
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Explore verified properties, consult licensed local agents, and take the next step toward your dream space.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/properties"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/add-property"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl backdrop-blur-md transition-colors"
              >
                <span>List Your Property</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
