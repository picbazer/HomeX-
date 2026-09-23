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

interface PropertyDetailsClientProps {
  id?: string;
}

export default function PropertyDetailsClient({ id: propId }: PropertyDetailsClientProps) {
  const params = useParams();
  const router = useRouter();
  const propertyId = propId || (params?.id as string);

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
          <span>Back to Browse</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Compare Button */}
          <button
            onClick={() => {
              toggleCompare(property.id);
              addToast(
                compared ? 'Removed from compare list' : 'Added to compare list',
                compared ? 'info' : 'success'
              );
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              compared
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{compared ? 'In Compare List' : 'Compare'}</span>
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2 rounded-xl border transition-all ${
              favorited
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all"
            title="Share property"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Report Button */}
          <button
            onClick={() => setReportModalOpen(true)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
            title="Report this listing"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Title Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                property.listingType === 'For Sale'
                  ? 'bg-amber-400 text-slate-950'
                  : property.listingType === 'For Rent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}
            >
              {property.listingType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
              {property.type}
            </span>
            {property.verified && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified by HOME X</span>
              </span>
            )}
            <span className="text-xs text-slate-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Listed {new Date(property.createdAt).toLocaleDateString('en-GB')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-sm sm:text-base text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {property.location}, {property.city}
            </span>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="flex flex-col lg:items-end bg-slate-900 text-white p-5 rounded-3xl shadow-lg border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            {isRent ? 'Monthly Rental' : 'Asking Price'}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
            {formatBDT(property.price)}
          </div>
          {isRent && (
            <span className="text-xs text-slate-400 mt-0.5">per month (service charge excluded)</span>
          )}
          {!isRent && property.area > 0 && (
            <span className="text-xs text-slate-400 mt-1">
              Approx. ৳{Math.round(property.price / property.area).toLocaleString('en-US')} / sqft
            </span>
          )}
        </div>
      </div>

      {/* Media Gallery Component */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Grid: Details (Left 8 cols) & Agent/Owner Card (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Quick Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Total Area</p>
                <p className="text-sm sm:text-base font-black text-slate-900">{formatArea(property.area)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Bedrooms</p>
                <p className="text-sm sm:text-base font-black text-slate-900">{property.bedrooms} Beds</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Bathrooms</p>
                <p className="text-sm sm:text-base font-black text-slate-900">{property.bathrooms} Baths</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Parking</p>
                <p className="text-sm sm:text-base font-black text-slate-900">{property.parking} Spots</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Property Overview</h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Detailed Specifications */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Technical Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-600">
                  <Building className="w-4 h-4 text-slate-400" />
                  <span>Property Type</span>
                </div>
                <span className="font-bold text-slate-900">{property.type}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-600">
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>Floor Level</span>
                </div>
                <span className="font-bold text-slate-900">{property.floor || 'Not specified'}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-600">
                  <Sofa className="w-4 h-4 text-slate-400" />
                  <span>Furnishing Status</span>
                </div>
                <span className="font-bold text-slate-900">{property.furnished}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>Verification Status</span>
                </div>
                <span className="font-bold text-emerald-700">
                  {property.verified ? 'Verified Ownership' : 'Community Listed'}
                </span>
              </div>
            </div>
          </div>

          {/* Amenities & Features */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Amenities & Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs sm:text-sm font-semibold text-slate-800"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-400/30 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Monthly Installment (Mortgage Calculator) */}
          {!isRent && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                    Bank Finance & EMI Helper
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    Estimated Monthly Mortgage: ~৳
                    {Math.round((property.price * 0.7 * 0.09) / 12).toLocaleString('en-US')} / mo
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    Based on standard 70% bank loan financing over 20 years at approx. 9% annual interest rate.
                    Partnered banks: City Bank, BRAC Bank, Standard Chartered Bangladesh.
                  </p>
                </div>
                <Link
                  href="/services"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl self-start sm:self-auto shrink-0 transition-colors"
                >
                  Consult Finance Expert
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Column - Owner/Agent Contact */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl font-black">
                {property.ownerName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  Listing Agent / Owner
                </span>
                <h3 className="font-black text-slate-900 text-base truncate">{property.ownerName}</h3>
                <p className="text-xs text-slate-500 font-medium">HOME X Verified Partner</p>
              </div>
            </div>

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
