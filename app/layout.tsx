import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { ToastContainer } from '../components/ToastContainer';

export const metadata: Metadata = {
  title: 'HOME X - Real Estate Marketplace | Buy • Sell • Rent • Discover',
  description:
    'Discover homes, apartments, land and commercial properties in locations that matter to you across Bangladesh. Explore verified listings in Dhaka, Chattogram, Khulna, and Sylhet.',
  openGraph: {
    title: 'HOME X - Real Estate Marketplace',
    description:
      'Buy, sell, rent, and discover verified homes, apartments, villas, and commercial properties across Bangladesh.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOME X - Real Estate Marketplace',
    description:
      'Buy, sell, rent, and discover verified homes, apartments, villas, and commercial properties across Bangladesh.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
