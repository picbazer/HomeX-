'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { PropertyType, TransactionType } from '../../types';
import {
  Building,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Eye,
  Send,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { formatBDT } from '../../lib/formatters';

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

const CITIES = ['Dhaka', 'Chattogram', 'Khulna', 'Sylhet', 'Rajshahi', 'Barishal', "Cox's Bazar"];

const AMENITY_OPTIONS = [
  '24/7 Security & CCTV',
  'Full Generator Backup',
  'Passenger Lift',
  'Titas Gas Connection',
  'Dedicated Car Parking',
  'South Facing Balcony',
  'Rooftop Garden',
  'Swimming Pool',
  'Air Conditioning',
  'Intercom Facility',
  'Fire Safety System',
  'Children Play Area',
  'Community Hall',
  'Servant Quarter',
  'WASA Water Supply',
  'Deep Tubewell',
];

const SAMPLE_IMAGE_PRESETS = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
];

export default function AddPropertyPage() {
  const router = useRouter();
  const { addProperty, currentUser, addToast } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState<TransactionType>('For Sale');
  const [type, setType] = useState<PropertyType>('Apartment');
  const [price, setPrice] = useState<number>(15000000);
  const [pricePeriod, setPricePeriod] = useState<'month' | 'year' | 'total'>('total');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('Dhaka');

  // Step 2: Specs
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [area, setArea] = useState<number>(1850);
  const [parking, setParking] = useState<number>(1);
  const [floor, setFloor] = useState('5th Floor');
  const [furnished, setFurnished] = useState<'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished'>('Semi-Furnished');

  // Step 3: Description
  const [description, setDescription] = useState('');

  // Step 4: Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    '24/7 Security & CCTV',
    'Full Generator Backup',
    'Passenger Lift',
    'Dedicated Car Parking',
  ]);

  // Step 5: Images
  const [images, setImages] = useState<string[]>([SAMPLE_IMAGE_PRESETS[0]]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Step 6: Contact
  const [ownerName, setOwnerName] = useState(currentUser?.name || 'Mahmudul Hasan');
  const [ownerPhone, setOwnerPhone] = useState(currentUser?.phone || '+880 1711-987654');
  const [ownerEmail, setOwnerEmail] = useState(currentUser?.email || 'owner@homex.com.bd');

  // Add Image URL
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Submit Listing
  const handleSubmitListing = () => {
    if (!title || !location || !price) {
      addToast('Please complete required fields before submitting.', 'warning');
      return;
    }

    const newId = addProperty({
      title,
      description: description || 'No detailed description provided by seller.',
      type,
      listingType,
      price: Number(price),
      pricePeriod: listingType === 'For Sale' ? 'total' : pricePeriod,
      location,
      city,
      area: Number(area),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      parking: Number(parking),
      floor,
      furnished,
      amenities: selectedAmenities,
      images: images.length > 0 ? images : [SAMPLE_IMAGE_PRESETS[0]],
      ownerId: currentUser?.id || 'owner-user',
      ownerName,
      ownerPhone,
      ownerEmail,
      verified: false, // strictly false! Admin must verify
      status: 'pending', // pending review
      featured: false,
    });

    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
          Sell or Rent Your Property
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          List Your Property on HOME X
        </h1>
        <p className="text-sm text-slate-500">
          Reach thousands of qualified buyers and tenants across Bangladesh. Every submission is reviewed by our team for safety and accuracy.
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          {[
            { num: 1, name: 'Basic Info' },
            { num: 2, name: 'Details' },
            { num: 3, name: 'Description' },
            { num: 4, name: 'Amenities' },
            { num: 5, name: 'Photos' },
            { num: 6, name: 'Contact & Submit' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              className="flex items-center gap-2 text-xs font-bold transition-all"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  step === s.num
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                    : step > s.num
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`hidden sm:inline ${step === s.num ? 'text-slate-900 font-extrabold' : 'text-slate-500'}`}>
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              Step 1: Basic Property Information
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Title *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Modern Lakefront Apartment in Dhanmondi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Transaction Type *
                </label>
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value as TransactionType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="For Lease">For Lease</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Property Category *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PropertyType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Price (৳ Bangladeshi Taka) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 15000000"
                  value={price || ''}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <p className="text-xs text-amber-600 font-bold mt-1">
                  Preview: {formatBDT(price)}
                </p>
              </div>

              {listingType !== 'For Sale' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Rental Period
                  </label>
                  <select
                    value={pricePeriod}
                    onChange={(e) => setPricePeriod(e.target.value as 'month' | 'year' | 'total')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="month">Per Month (/month)</option>
                    <option value="year">Per Year (/year)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City / Division *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specific Street / Sector Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Road 12, Block D, Bashundhara R/A"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Property Details */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              Step 2: Property Specifications
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Area (Square Feet) *
                </label>
                <input
                  type="number"
                  min="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Parking Spaces
                </label>
                <input
                  type="number"
                  min="0"
                  value={parking}
                  onChange={(e) => setParking(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Floor Level
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7th Floor (Total 12)"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Furnishing
                </label>
                <select
                  value={furnished}
                  onChange={(e) => setFurnished(e.target.value as typeof furnished)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                >
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Description */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              Step 3: Property Description
            </h2>
            <p className="text-xs text-slate-500">
              Describe unique architectural characteristics, community surroundings, nearby landmarks (schools, hospitals, transit), orientation, and utility status.
            </p>
            <textarea
              rows={8}
              placeholder="e.g. Premium architecturally designed apartment with cross-ventilation, imported fittings, south-facing balcony, uninterrupted utility connections, and peaceful residential neighborhood..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        )}

        {/* STEP 4: Amenities */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              Step 4: Select Amenities &amp; Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AMENITY_OPTIONS.map((item) => {
                const checked = selectedAmenities.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-semibold cursor-pointer transition-colors ${
                      checked
                        ? 'border-amber-500 bg-amber-50/50 text-slate-900'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAmenity(item)}
                      className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Images */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              Step 5: Property Photos
            </h2>
            <p className="text-xs text-slate-500">
              Add clear, high-resolution photography URLs of the property interior, exterior, balconies, and surrounding view.
            </p>

            {/* URL Input */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Paste direct image URL (https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-5 py-2.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            {/* Quick Sample Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Or pick from architectural demo photos:
              </span>
              <div className="flex gap-2 flex-wrap">
                {SAMPLE_IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImages((prev) => [...prev, preset])}
                    className="w-16 h-12 rounded-lg overflow-hidden border border-slate-300 hover:border-amber-500 transition-colors shrink-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 group border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-amber-400">
                      Cover Photo
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Contact Information & Preview */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h2 className="text-xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
              Step 6: Contact Information &amp; Submission Preview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Contact Name *
                </label>
                <input
                  required
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900"
                />
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <span>Verification &amp; Moderation Notice</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upon submission, your property will be saved to your dashboard with status{' '}
                <strong className="text-slate-900">“Pending Review”</strong>. The listing will remain{' '}
                <strong className="text-slate-900">unverified</strong> until our administration team examines proof of ownership and approves it in the moderation console.
              </p>
            </div>
          </div>
        )}

        {/* Form Wizard Navigation Buttons */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl flex items-center gap-2 shadow-md transition-colors"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitListing}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Submit Property for Review</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
