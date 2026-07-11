"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyCarouselProps {
  images: string[];
  title: string;
}

export function PropertyCarousel({ images, title }: PropertyCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative w-full h-96 bg-gray-200 rounded-xl overflow-hidden group">
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {displayImages[current] === "/placeholder.jpg" ? (
            <span>No image available</span>
          ) : (
            <img
              src={displayImages[current]}
              alt={`${title} - Image ${current + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {current + 1} / {displayImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                idx === current
                  ? "border-gold-500 ring-2 ring-gold-500/50"
                  : "border-gray-300 hover:border-gold-300"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
