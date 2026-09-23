'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { PropertyGallery } from '../../../components/PropertyGallery';
import { ReportModal } from '../../../components/ReportModal';
import { ContactModal } from '../../../components/ContactModal';
import { PropertyCard } from '../../../components/PropertyCard';
import { formatBDT, formatArea } from '../../../lib/formatters';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Car,
  Layers,
  Sofa,
  CheckCircle2,
  Clock,
  Heart,
  Scale,
  Share2,
  AlertTriangle,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  ShieldCheck,
  Building,
  ArrowLeft,
  Check,
} from 'lucide-react';

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params?.id as string;

  const { properties, isFavorite, toggleFavorite, isInCompare, toggleCompare, addToast } = useApp();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactMode, setContactMode] = useState<'inquiry' | 'call' | 'whatsapp'>('inquiry');

  // Find Property
  const property = properties.find((p) => p.id === propertyId || p.slug === propertyId);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Property Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The property listing you are searching for does not exist or may have been removed.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-amber-400 font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);
  const isRent = property.listingType === 'For Rent' || property.listingType === 'For Lease';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      addToast('Property listing link copied to clipboard!', 'success');
    }
  };

  const openContact = (mode: 'inquiry' | 'call' | 'whatsapp') => {
    setContactMode(mode);
    setContactModalOpen(true);
  };

  // Similar Properties
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Back Button & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        <div className="text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/properties" className="hover:text-slate-600">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700 font-semibold truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      {/* Main Image Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Title Header & Price Block */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                property.listingType === 'For Sale'
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-emerald-900 text-emerald-300'
              }`}
            >
              {property.listingType}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {property.type}
            </span>

            {/* STRICT VERIFIED BADGE */}
            {property.verified ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Listing</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Under Review (Unverified)</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {property.title}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{property.location}, {property.city}</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex flex-col md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="flex flex-col md:text-right">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              {isRent ? 'Rental Rate' : 'Asking Price'}
            </span>
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {formatBDT(property.price, {
                period: property.pricePeriod,
                showPeriod: isRent,
              })}
            </span>
          </div>

          {/* Action Row: Save, Compare, Share, Report */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={favorited ? 'Saved' : 'Save'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden sm:inline">{favorited ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => toggleCompare(property.id)}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                compared
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={compared ? 'In comparison' : 'Compare'}
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{compared ? 'Compared' : 'Compare'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Report Suspicious Listing"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details on Left, Sticky Contact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Stats Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-base mb-4">Property Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">Bedrooms</p>
                  <p className="text-sm font-black text-slate-900">{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">Bathrooms</p>
                  <p className="text-sm font-black text-slate-900">{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">Area Size</p>
                  <p className="text-sm font-black text-slate-900">{formatArea(property.area)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">Parking</p>
                  <p className="text-sm font-black text-slate-900">{property.parking > 0 ? `${property.parking} Bays` : 'No Parking'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">Floor Level</p>
                  <p className="text-sm font-black text-slate-900">{property.floor || 'Standard'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Sofa className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-semibold uppercase">Furnishing</p>
                  <p className="text-sm font-black text-slate-900">{property.furnished}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Property Description</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Amenities &amp; Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Property Metadata Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Listing Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400 font-bold uppercase">Property ID</span>
                <span className="font-mono font-bold text-slate-800">{property.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400 font-bold uppercase">Property Type</span>
                <span className="font-bold text-slate-800">{property.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400 font-bold uppercase">Transaction</span>
                <span className="font-bold text-slate-800">{property.listingType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400 font-bold uppercase">Listed Date</span>
                <span className="font-semibold text-slate-800">
                  {new Date(property.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400 font-bold uppercase">Verification Status</span>
                <span className={`font-bold ${property.verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {property.verified ? 'Verified by HOME X' : 'Pending Verification'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-400 font-bold uppercase">Views / Inquiries</span>
                <span className="font-semibold text-slate-800">{property.views} views • {property.inquiries} inquiries</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Column: Contact Owner / Agent Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl sticky top-24 space-y-6">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 font-bold text-lg flex items-center justify-center overflow-hidden shadow-md">
                {property.ownerName.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  {property.agentId ? 'Verified Agent' : 'Property Owner'}
                </p>
                <h4 className="text-base font-extrabold text-slate-900">{property.ownerName}</h4>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Identity</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => openContact('inquiry')}
                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all group"
              >
                <Mail className="w-4 h-4" />
                <span>Send Inquiry Message</span>
              </button>

              <button
                onClick={() => openContact('call')}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {property.ownerPhone}</span>
              </button>

              <button
                onClick={() => openContact('whatsapp')}
                className="w-full py-3 px-4 bg-white border border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-500 space-y-1.5">
              <p className="font-bold text-slate-700">Safety Tip from HOME X:</p>
              <p>Never transfer booking money without physically inspecting the deed and signing an official deed agreement.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-10 border-t border-slate-200/80 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Recommendations
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Similar Properties You May Like
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <ReportModal
        property={property}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <ContactModal
        property={property}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialMode={contactMode}
      />
    </div>
  );
}
