import Image from "next/image";

const propertyImages = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=450&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop",
];

export function PropertyImage({ index, title }: { index: number; title: string }) {
  const src = propertyImages[index % propertyImages.length];

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={src}
        alt={`${title} - property listing photo`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Bottom gradient for badge/text legibility on bright photos */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
    </div>
  );
}
