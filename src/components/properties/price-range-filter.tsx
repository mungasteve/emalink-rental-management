"use client";

import { useState, useEffect } from "react";

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onRangeChange: (min: number, max: number) => void;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onRangeChange,
}: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    const timer = setTimeout(() => {
      onRangeChange(localMin, localMax);
    }, 300);
    return () => clearTimeout(timer);
  }, [localMin, localMax, onRangeChange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), localMax);
    setLocalMin(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), localMin);
    setLocalMax(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-navy-800 mb-2 block">
          Price Range
        </label>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="300000"
              step="5000"
              value={localMin}
              onChange={handleMinChange}
              className="w-full h-2 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              style={{ touchAction: "pan-y" }}
              aria-label="Minimum price"
            />
          </div>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="300000"
              step="5000"
              value={localMax}
              onChange={handleMaxChange}
              className="w-full h-2 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              style={{ touchAction: "pan-y" }}
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs text-navy-600 mb-1 block">Min</label>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-navy-600 text-sm">
              KES
            </span>
            <input
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(Math.max(0, Number(e.target.value)))}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg text-sm"
              min="0"
              max={localMax}
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-navy-600 mb-1 block">Max</label>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-navy-600 text-sm">
              KES
            </span>
            <input
              type="number"
              value={localMax}
              onChange={(e) =>
                setLocalMax(Math.min(300000, Number(e.target.value)))
              }
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg text-sm"
              min={localMin}
              max="300000"
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-navy-600 bg-cream-50 p-2 rounded">
        KES {localMin.toLocaleString()} - KES {localMax.toLocaleString()}
      </div>
    </div>
  );
}
