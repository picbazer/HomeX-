'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 font-black text-xl shadow-inner">
                HX
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black tracking-tight text-white">HOME</span>
                <span className="text-2xl font-black tracking-tight text-amber-500">X</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Buy • Sell • Rent • Discover. Bangladesh&apos;s premier modern real-estate marketplace connecting verified sellers, buyers, renters, and licensed agents.
            </p>

            {/* Local BD Presence */}
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Level 14, Crystal Palace, Road 140, Gulshan-2, Dhaka 1212</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+880 9612-466391 (HOME-X1)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>support@homex.com.bd</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-amber-400 transition-colors">All Properties</Link>
              </li>
              <li>
                <Link href="/properties?listingType=For%20Sale" className="hover:text-amber-400 transition-colors">Buy Property</Link>
              </li>
              <li>
                <Link href="/properties?listingType=For%20Rent" className="hover:text-amber-400 transition-colors">Rent Property</Link>
              </li>
              <li>
                <Link href="/add-property" className="hover:text-amber-400 transition-colors">Post Property (Sell)</Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-amber-400 transition-colors">Verified Agents</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Top Locations */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Top Locations</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/properties?city=Dhaka" className="hover:text-amber-400 transition-colors">Dhaka Division</Link>
              </li>
              <li>
                <Link href="/properties?city=Chattogram" className="hover:text-amber-400 transition-colors">Chattogram</Link>
              </li>
              <li>
                <Link href="/properties?city=Khulna" className="hover:text-amber-400 transition-colors">Khulna</Link>
              </li>
              <li>
                <Link href="/properties?city=Sylhet" className="hover:text-amber-400 transition-colors">Sylhet</Link>
              </li>
              <li>
                <Link href="/properties?city=Rajshahi" className="hover:text-amber-400 transition-colors">Rajshahi</Link>
              </li>
              <li>
                <Link href="/properties?city=Barishal" className="hover:text-amber-400 transition-colors">Barishal</Link>
              </li>
              <li>
                <Link href="/properties?city=Cox%27s%20Bazar" className="hover:text-amber-400 transition-colors">Cox&apos;s Bazar</Link>
              </li>
            </ul>
          </div>

          {/* Trust & Support */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Trust & Support</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about#safety" className="hover:text-amber-400 transition-colors">Listing Verification</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Moderation</span>
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-amber-400 transition-colors">Help Center & FAQ</Link>
              </li>
              <li>
                <Link href="/about#terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/about#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Connect</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 HOME X. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-slate-400 transition-colors">Disclaimer</Link>
            <span className="text-slate-600">Built with Next.js &amp; Firebase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
