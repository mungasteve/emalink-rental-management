"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  propertyId: string;
  className?: string;
}

export function WishlistButton({ propertyId, className = "" }: WishlistButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("saved-properties");
    const savedList = saved ? JSON.parse(saved) : [];
    setIsSaved(savedList.includes(propertyId));
  }, [propertyId]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const saved = localStorage.getItem("saved-properties");
    const savedList = saved ? JSON.parse(saved) : [];

    if (isSaved) {
      const updated = savedList.filter((id: string) => id !== propertyId);
      localStorage.setItem("saved-properties", JSON.stringify(updated));
    } else {
      savedList.push(propertyId);
      localStorage.setItem("saved-properties", JSON.stringify(savedList));
    }

    setIsSaved(!isSaved);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleSave}
      className={`p-2 rounded-full transition-all ${
        isSaved
          ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          : "bg-white/20 text-white hover:bg-white/30"
      } ${className}`}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
    </button>
  );
}
