import Link from 'next/link';
import { Home, Search, Building } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 shadow-inner">
        <Building className="w-10 h-10" />
      </div>
      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
        404 Page Not Found
      </span>
      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2 mb-4">
        We Couldn&apos;t Find That Property
      </h1>
      <p className="text-slate-500 text-sm max-w-md mb-8 leading-relaxed">
        The page you are looking for might have been moved, renamed, or is temporarily unavailable in the HOME X marketplace.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/properties"
          className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors"
        >
          <Search className="w-4 h-4 text-amber-600" />
          <span>Explore Properties</span>
        </Link>
      </div>
    </div>
  );
}
