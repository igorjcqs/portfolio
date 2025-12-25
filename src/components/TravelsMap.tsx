'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Set your Mapbox access token
mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface Media {
  url: string;
  type: 'image' | 'video';
}

interface Place {
  id: number;
  name: string;
  coords: [number, number];
  desc: string;
  folder?: string; // folder name in public/assets/trips/
  media: Media[];
}

const places: Place[] = [
  // Brazil
  {
    id: 1,
    name: 'São Paulo',
    coords: [-46.6333, -23.5505],
    desc: 'Brazil',
    folder: 'sao-paulo',
    media: [
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5299.png', type: 'image' },
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5320.png', type: 'image' },
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5518.mp4', type: 'video' },
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5526.png', type: 'image' },
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5534.png', type: 'image' },
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5535.png', type: 'image' },
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5537.png', type: 'image' },
      { url: 'https://gtv7flgtdfpl3phe.public.blob.vercel-storage.com/sao-paulo/IMG_5560.png', type: 'image' },
    ],
  },
  {
    id: 2,
    name: 'Rio de Janeiro',
    coords: [-43.1729, -22.9068],
    desc: 'Brazil',
    media: [],
  },
  {
    id: 4,
    name: 'João Pessoa',
    coords: [-34.861, -7.115],
    desc: 'Brazil',
    media: [],
  },
  {
    id: 5,
    name: 'Maragogi',
    coords: [-35.2214, -9.0122],
    desc: 'Brazil',
    media: [],
  },
  {
    id: 6,
    name: 'Itamaracá',
    coords: [-34.8411, -7.7471],
    desc: 'Brazil',
    media: [],
  },
  // Italy
  {
    id: 7,
    name: 'Capri',
    coords: [14.2435, 40.5507],
    desc: 'Italy',
    media: [],
  },
  {
    id: 8,
    name: 'Positano',
    coords: [14.484, 40.6281],
    desc: 'Italy',
    media: [],
  },
  {
    id: 9,
    name: 'Amalfi',
    coords: [14.6027, 40.634],
    desc: 'Italy',
    media: [],
  },
  {
    id: 10,
    name: 'Ravello',
    coords: [14.6119, 40.6491],
    desc: 'Italy',
    media: [],
  },
  {
    id: 11,
    name: 'Sorrento',
    coords: [14.3758, 40.6263],
    desc: 'Italy',
    media: [],
  },
  {
    id: 12,
    name: 'Nápoles',
    coords: [14.2681, 40.8518],
    desc: 'Italy',
    media: [],
  },
  {
    id: 13,
    name: 'Veneza',
    coords: [12.3155, 45.4408],
    desc: 'Italy',
    media: [],
  },
  {
    id: 14,
    name: 'Roma',
    coords: [12.4964, 41.9028],
    desc: 'Italy',
    media: [],
  },
  {
    id: 15,
    name: 'Vaticano',
    coords: [12.4534, 41.9029],
    desc: 'Italy',
    media: [],
  },
  // Argentina
  {
    id: 16,
    name: 'Buenos Aires',
    coords: [-58.3816, -34.6037],
    desc: 'Argentina',
    media: [],
  },
];

export default function TravelsMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(
    null
  );
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleNextPlace = () => {
    if (!selectedPlace) return;
    const currentIndex = places.findIndex(
      (p) => p.id === selectedPlace.id
    );
    const nextIndex = (currentIndex + 1) % places.length;
    const nextPlace = places[nextIndex];
    setSelectedPlace(nextPlace);
    setCurrentPhotoIndex(0);
    mapRef.current?.flyTo({
      center: nextPlace.coords,
      zoom: 10,
      essential: true,
    });
  };

  const handleBackPlace = () => {
    if (!selectedPlace) return;
    const currentIndex = places.findIndex(
      (p) => p.id === selectedPlace.id
    );
    const prevIndex =
      (currentIndex - 1 + places.length) % places.length;
    const prevPlace = places[prevIndex];
    setSelectedPlace(prevPlace);
    setCurrentPhotoIndex(0);
    mapRef.current?.flyTo({
      center: prevPlace.coords,
      zoom: 10,
      essential: true,
    });
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPlace) return;
    setCurrentPhotoIndex(
      (prev) => (prev + 1) % selectedPlace.media.length
    );
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPlace) return;
    setCurrentPhotoIndex(
      (prev) =>
        (prev - 1 + selectedPlace.media.length) %
        selectedPlace.media.length
    );
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      config: {
        basemap: {
          lightPreset: 'dawn',
        },
      },
      center: [-44.72208, -7.88141],
      zoom: 1.37,
      bearing: 0.0,
      pitch: 5.5,
    });

    mapRef.current = map;

    // Add markers for each place
    places.forEach((place) => {
      const marker = new mapboxgl.Marker({
        color: '#6366f1',
      })
        .setLngLat(place.coords)
        .addTo(map);

      // Add click listener to the marker element
      marker.getElement().addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent map click event
        setSelectedPlace(place);
        setCurrentPhotoIndex(0);

        // Fly to the location when clicked
        map.flyTo({
          center: place.coords,
          zoom: 10,
          essential: true,
        });
      });
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-[700px] md:h-[800px] relative">
      <div className="flex-1 relative z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
            }}
            className="w-full md:w-[400px] bg-black border-l border-white/10 z-10 flex flex-col relative overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="p-6 pb-0 flex justify-between items-start z-20">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {selectedPlace.name}
                </h3>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
                  {selectedPlace.desc}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Narrative / Description */}
            <div className="px-6 py-4 z-20">
              <p className="text-sm font-serif italic text-white/80 leading-relaxed">
                &quot;A wonderful journey to {selectedPlace.name},
                exploring the culture and landscapes of{' '}
                {selectedPlace.desc}.&quot;
              </p>
            </div>

            {/* Instagram Story UI - Only shown when media is available */}
            {selectedPlace.media.length > 0 ? (
              <div className="flex-1 px-6 relative w-full group">
                <div className="relative w-full h-full bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Segmented Lines (Progress Bar) */}
                  <div className="absolute top-4 left-4 right-4 z-30 flex gap-1">
                    {selectedPlace.media.map((_, idx) => (
                      <div
                        key={idx}
                        className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden"
                      >
                        <motion.div
                          className="h-full bg-white/80"
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              idx === currentPhotoIndex
                                ? '100%'
                                : idx < currentPhotoIndex
                                ? '100%'
                                : '0%',
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Profile Overlay (Subtle) */}
                  <div className="absolute top-8 left-4 z-30 flex items-center gap-2 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/5">
                    <div className="w-5 h-5 rounded-full border border-white/20 overflow-hidden relative">
                      <Image
                        src="https://github.com/igorjcqs.png"
                        alt="igorjfarias"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white/90 text-[10px] font-semibold">
                      igorjfarias
                    </span>
                  </div>

                  {/* Audio Toggle Button */}
                  {selectedPlace.media[currentPhotoIndex]?.type ===
                    'video' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="absolute bottom-4 right-4 z-50 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 transition-all shadow-lg"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  )}

                  {/* Photo/Video Display */}
                  <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentPhotoIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-full h-full"
                      >
                        {selectedPlace.media[currentPhotoIndex]?.type ===
                        'image' ? (
                          <Image
                            src={
                              selectedPlace.media[currentPhotoIndex].url
                            }
                            alt={`${selectedPlace.name} photo ${
                              currentPhotoIndex + 1
                            }`}
                            fill
                            className="object-cover"
                            priority
                          />
                        ) : (
                          <video
                            src={
                              selectedPlace.media[currentPhotoIndex]?.url
                            }
                            autoPlay
                            muted={isMuted}
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Story Navigation Controls */}
                  <div
                    className="absolute inset-y-0 left-0 w-1/4 z-30 cursor-w-resize"
                    onClick={prevPhoto}
                  />
                  <div
                    className="absolute inset-y-0 right-0 w-1/4 z-30 cursor-e-resize"
                    onClick={nextPhoto}
                  />

                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 px-6 relative w-full flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-white/40 text-sm font-mono">
                    No photos yet
                  </p>
                  <p className="text-white/20 text-xs mt-1">
                    Check back soon for memories from this trip
                  </p>
                </div>
              </div>
            )}

            {/* Sidebar Footer */}
            <div className="p-6 pt-4 space-y-6 bg-black z-20">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">
                    Latitude
                  </p>
                  <p className="text-xs font-mono text-white/80">
                    {selectedPlace.coords[1].toFixed(4)}
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">
                    Longitude
                  </p>
                  <p className="text-xs font-mono text-white/80">
                    {selectedPlace.coords[0].toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-12 bg-transparent border-white/10 hover:bg-white/5 text-[10px] uppercase tracking-[0.2em] font-mono"
                  onClick={handleBackPlace}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 bg-transparent border-white/10 hover:bg-white/5 text-[10px] uppercase tracking-[0.2em] font-mono"
                  onClick={handleNextPlace}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
