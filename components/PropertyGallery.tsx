'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imgErrors, setImgErrors] = useState<{ [key: number]: boolean }>({});

  const fallbackUrl = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
  const displayImages = images && images.length > 0 ? images : [fallbackUrl];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const currentImageSrc = imgErrors[currentIndex] ? fallbackUrl : displayImages[currentIndex];

  return (
    <div className="space-y-3">
      {/* Main Image Banner */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 shadow-md group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImageSrc}
          alt={`${title} - Photo ${currentIndex + 1}`}
          onError={() => setImgErrors((prev) => ({ ...prev, [currentIndex]: true }))}
          className="w-full h-full object-cover select-none"
        />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold tracking-wide">
          {currentIndex + 1} / {displayImages.length} Photos
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition-all hover:scale-105"
          title="View Fullscreen"
          aria-label="View Fullscreen Gallery"
        >
          <Maximize className="w-4 h-4" />
        </button>

        {/* Prev & Next Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center transition-all opacity-90 group-hover:opacity-100 hover:scale-105"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center transition-all opacity-90 group-hover:opacity-100 hover:scale-105"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Bar */}
      {displayImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {displayImages.map((img, idx) => {
            const isSelected = idx === currentIndex;
            const src = imgErrors[idx] ? fallbackUrl : img;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-20 sm:w-24 md:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                  isSelected ? 'border-amber-500 scale-102 ring-2 ring-amber-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={() => setImgErrors((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImageSrc}
              alt={title}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          <div className="text-white text-sm mt-4 font-semibold">
            {currentIndex + 1} of {displayImages.length} • {title}
          </div>
        </div>
      )}
    </div>
  );
};
