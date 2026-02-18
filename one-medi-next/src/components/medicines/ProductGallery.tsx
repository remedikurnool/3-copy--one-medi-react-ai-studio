import React, { useState } from 'react';
import { LazyImage } from '../ui/LazyImage';

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImg, setSelectedImg] = useState(images[0]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[400px]">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImg(img)}
                        className={`size-16 md:size-20 rounded-xl border-2 shrink-0 relative overflow-hidden transition-all ${selectedImg === img ? 'border-primary ring-2 ring-primary/20' : 'border-slate-100 dark:border-gray-700 hover:border-slate-300'}`}
                    >
                        <LazyImage src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-square md:aspect-auto md:h-[400px] bg-white dark:bg-gray-800 rounded-[2rem] border border-slate-100 dark:border-gray-700 relative overflow-hidden flex items-center justify-center p-8 group">
                <LazyImage
                    src={selectedImg}
                    alt="Product"
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4 bg-red-50 text-red-500 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border border-red-100">
                    Proprietary
                </div>
            </div>
        </div>
    );
}
