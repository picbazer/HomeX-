'use client';

import React, { useState } from 'react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { Phone, MessageSquare, Send, X, Check, Copy } from 'lucide-react';

interface ContactModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'inquiry' | 'call' | 'whatsapp';
}

export const ContactModal = ({
  property,
  isOpen,
  onClose,
  initialMode = 'inquiry',
}: ContactModalProps) => {
  const { submitInquiry, currentUser, addToast } = useApp();
  const [mode, setMode] = useState<'inquiry' | 'call' | 'whatsapp'>(initialMode);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+880 1');
  const [message, setMessage] = useState(
    `Hello ${property.ownerName}, I am interested in your property "${property.title}" in ${property.location}, ${property.city}. Please let me know if it is available for viewing.`
  );
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      senderName: name,
      senderEmail: email,
      senderPhone: phone,
      message,
    });
    onClose();
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(property.ownerPhone);
    setCopiedPhone(true);
    addToast('Phone number copied to clipboard', 'info');
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const whatsappUrl = `https://wa.me/${property.ownerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi ${property.ownerName}, I found your listing "${property.title}" on HOME X (${property.location}, ${property.city}) and would like to learn more.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Contact Property Representative</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {property.ownerName} • {property.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode switcher tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl my-4">
          <button
            onClick={() => setMode('inquiry')}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === 'inquiry' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-amber-600" />
            <span>Send Message</span>
          </button>
          <button
            onClick={() => setMode('call')}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === 'call' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Phone Call</span>
          </button>
          <button
            onClick={() => setMode('whatsapp')}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === 'whatsapp' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Tab 1: Send In-App Inquiry */}
        {mode === 'inquiry' && (
          <form onSubmit={handleInquirySubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Shakib Al Hasan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+880 1..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Inquiry Message
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl flex items-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry Now</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Direct Call */}
        {mode === 'call' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Owner / Agent Direct Number</p>
              <p className="text-2xl font-black text-slate-900 tracking-wide mt-1">
                {property.ownerPhone}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={`tel:${property.ownerPhone}`}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly</span>
              </a>
              <button
                onClick={handleCopyPhone}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl flex items-center gap-2 transition-colors"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Please mention you discovered this listing on HOME X for prompt verification.
            </p>
          </div>
        )}

        {/* Tab 3: WhatsApp */}
        {mode === 'whatsapp' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Chat with {property.ownerName}</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Open WhatsApp with a prefilled inquiry including property ID <span className="font-mono font-bold text-slate-700">{property.id}</span>.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Launch WhatsApp Chat</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
