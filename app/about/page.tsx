'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Building,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  const { addToast } = useApp();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setSubmitted(true);
    addToast('Thank you! Your message has been routed to our support team.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Brand Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About HOME X Bangladesh</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Building Trust in Every Transaction
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          HOME X is Bangladesh&apos;s modern real estate marketplace. We bridge the gap between discerning property seekers, verified sellers, and certified agents with transparency, rigor, and cutting-edge technology.
        </p>
      </div>

      {/* Mission & Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Zero Unverified Claims</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We enforce strict verification. A listing is never awarded the &quot;Verified&quot; badge until title deed, mutation parchis, and owner identity have been cross-checked by our legal desk.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Community Safety &amp; Reporting</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every user has the power to flag duplicate, misleading, or suspiciously priced properties. Reported listings are investigated by administrators and removed immediately if fraudulent.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Building className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Localized for Bangladesh</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Built from the ground up for Bangladeshi property seekers — native Taka (৳) currency, Dhaka, Chattogram, Sylhet, and Khulna division coverage, and direct WhatsApp integration.
          </p>
        </div>
      </div>

      {/* Office & Contact Section */}
      <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Contact Info */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">Visit or Contact Our Headquarters</h2>
            <p className="text-sm text-slate-400 mt-2">
              Have questions about listing your apartment or verifying deed documents? Our client advisors are ready to assist.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Corporate Office</strong>
                <span>Level 14, Crystal Palace, Road 140, Gulshan-2, Dhaka 1212, Bangladesh</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Hotline &amp; Telephone</strong>
                <span>+880 9612-466391 / +880 1711-987654</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Official Email</strong>
                <span>support@homex.com.bd / legal@homex.com.bd</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Office Hours</strong>
                <span>Sunday - Thursday: 9:00 AM – 7:00 PM BST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Send Us a Direct Message</h3>
          <p className="text-xs text-slate-500 mb-6">
            Fill out the form below and an agent will reply within 24 business hours.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-emerald-900">Message Received</h4>
              <p className="text-xs text-emerald-700">
                Our support team has received your message and will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Tanvir Ahmed"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Listing assistance"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you today?"
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
