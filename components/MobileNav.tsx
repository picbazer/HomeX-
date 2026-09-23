'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, PlusCircle, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileNav = () => {
  const pathname = usePathname();
  const { favorites, currentUser } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <nav className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-w-[56px] py-1.5 rounded-lg transition-colors ${
            pathname === '/' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">Home</span>
        </Link>

        <Link
          href="/properties"
          className={`flex flex-col items-center justify-center min-w-[56px] py-1.5 rounded-lg transition-colors ${
            pathname === '/properties' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">Explore</span>
        </Link>

        {/* Highlighted Add Property Button */}
        <Link
          href="/add-property"
          className="flex flex-col items-center justify-center -mt-4 group"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500 group-hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transition-transform active:scale-95">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 mt-0.5">Sell/Rent</span>
        </Link>

        <Link
          href="/favorites"
          className={`relative flex flex-col items-center justify-center min-w-[56px] py-1.5 rounded-lg transition-colors ${
            pathname === '/favorites' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-5 h-5" />
          {favorites.length > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
              {favorites.length}
            </span>
          )}
          <span className="text-[11px] mt-0.5">Saved</span>
        </Link>

        {currentUser?.role === 'ADMIN' ? (
          <Link
            href="/admin"
            className={`flex flex-col items-center justify-center min-w-[56px] py-1.5 rounded-lg transition-colors ${
              pathname === '/admin' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Admin</span>
          </Link>
        ) : (
          <Link
            href={currentUser ? '/dashboard' : '/login'}
            className={`flex flex-col items-center justify-center min-w-[56px] py-1.5 rounded-lg transition-colors ${
              pathname === '/dashboard' || pathname === '/login' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">{currentUser ? 'Account' : 'Login'}</span>
          </Link>
        )}
      </nav>
    </div>
  );
};
