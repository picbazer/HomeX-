'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import {
  Home,
  Heart,
  Scale,
  Menu,
  X,
  PlusCircle,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Search,
  Building2,
  ChevronDown,
  Bell,
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, favorites, compareList, unreadNotificationsCount, logout, loginDemoUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Buy', href: '/properties?listingType=For%20Sale' },
    { name: 'Rent', href: '/properties?listingType=For%20Rent' },
    { name: 'Sell', href: '/add-property' },
    { name: 'Agents', href: '/agents' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400 font-black text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="tracking-tighter">HX</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-slate-900">HOME</span>
                <span className="text-2xl font-black tracking-tight text-amber-600">X</span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase -mt-1 hidden sm:block">
                Buy • Sell • Rent • Discover
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'text-amber-600 bg-amber-50/70 font-bold'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Button */}
            <Link
              href="/compare"
              className="relative p-2.5 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex items-center justify-center"
              title="Compare Properties"
              aria-label="Compare properties"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Favorites Icon */}
            <Link
              href="/favorites"
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center justify-center"
              title="Saved Properties"
              aria-label="Saved favorites"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Notifications Bell */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Notifications</span>
                    <span className="text-xs text-amber-600 font-semibold">{unreadNotificationsCount} alert(s)</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {unreadNotificationsCount > 0 ? (
                      <Link
                        href="/admin"
                        onClick={() => setNotificationsOpen(false)}
                        className="p-3 block hover:bg-slate-50 text-slate-700 transition-colors"
                      >
                        <p className="font-semibold text-rose-600">Pending Reports</p>
                        <p className="text-slate-500 mt-0.5">{unreadNotificationsCount} listing report(s) require moderation review.</p>
                      </Link>
                    ) : (
                      <div className="p-4 text-center text-slate-400">No new notifications</div>
                    )}
                    <Link
                      href="/dashboard"
                      onClick={() => setNotificationsOpen(false)}
                      className="p-3 block hover:bg-slate-50 text-slate-700 transition-colors"
                    >
                      <p className="font-semibold text-slate-900">Marketplace Activity</p>
                      <p className="text-slate-500 mt-0.5">Explore the latest handpicked verified properties in Dhaka & Khulna.</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* List Property / Add Property Desktop Button */}
            <Link
              href="/add-property"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm shadow-amber-500/20 hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Property</span>
            </Link>

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  aria-expanded={userDropdownOpen}
                  aria-label="User profile menu"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center overflow-hidden">
                    {currentUser.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 max-w-[90px] truncate">{currentUser.name}</span>
                    <span className="text-[10px] font-semibold text-amber-600">{currentUser.role}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
                        {currentUser.role} Account
                      </span>
                    </div>

                    <div className="py-1 text-sm text-slate-700">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        <span>User Dashboard</span>
                      </Link>
                      <Link
                        href="/add-property"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 font-medium"
                      >
                        <PlusCircle className="w-4 h-4 text-slate-500" />
                        <span>Add New Listing</span>
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50 hover:text-amber-900 font-semibold text-amber-700"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Admin Moderation</span>
                      </Link>
                    </div>

                    {/* Switch Demo Roles for complete testing convenience */}
                    <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Switch Test Persona
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => {
                            loginDemoUser('USER');
                            setUserDropdownOpen(false);
                          }}
                          className={`text-xs py-1 rounded font-semibold border ${
                            currentUser.role === 'USER' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          User
                        </button>
                        <button
                          onClick={() => {
                            loginDemoUser('AGENT');
                            setUserDropdownOpen(false);
                          }}
                          className={`text-xs py-1 rounded font-semibold border ${
                            currentUser.role === 'AGENT' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          Agent
                        </button>
                        <button
                          onClick={() => {
                            loginDemoUser('ADMIN');
                            setUserDropdownOpen(false);
                          }}
                          className={`text-xs py-1 rounded font-semibold border ${
                            currentUser.role === 'ADMIN' ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 text-sm font-medium transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-2 text-slate-700 hover:text-slate-950 font-semibold text-sm rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-b border-slate-200 px-6 py-6 max-h-[85vh] overflow-y-auto shadow-2xl rounded-b-3xl">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <hr className="my-2 border-slate-100" />

              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100"
              >
                <span className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-slate-600" /> Compare Properties
                </span>
                {compareList.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-xs font-bold">
                    {compareList.length}
                  </span>
                )}
              </Link>

              <Link
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" /> Saved Favorites
                </span>
                {favorites.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                href="/add-property"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-base text-center justify-center mt-2 shadow-sm"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Post Property for Free</span>
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-800 font-bold rounded-xl text-base text-center justify-center mt-2"
              >
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Admin Moderation Panel</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
