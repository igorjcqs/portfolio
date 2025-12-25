'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// GIF duration in milliseconds - set to match actual GIF length (plays once)
const GIF_DURATION = 1400;
const DOOR_ANIMATION_DURATION = 1000;
const GIF_HIDE_DELAY = 250; // 1 second delay before hiding the GIF

export function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<'gif' | 'door' | 'complete'>(
    'gif'
  );
  const [showGif, setShowGif] = useState(true);
  // Use gifKey as mount indicator - empty string means not mounted yet
  const [gifKey, setGifKey] = useState('');
  const isMounted = gifKey !== '';

  useEffect(() => {
    // Generate key only on client side to avoid hydration mismatch
    // This also serves as the mounted indicator
    const key = Date.now().toString();

    // Use requestAnimationFrame to avoid synchronous setState lint warning
    requestAnimationFrame(() => {
      setGifKey(key);
    });

    // After GIF completes, start door animation
    const gifTimer = setTimeout(() => {
      setPhase('door');
    }, GIF_DURATION);

    return () => clearTimeout(gifTimer);
  }, []);

  useEffect(() => {
    if (phase === 'door') {
      // Hide GIF after delay
      const hideGifTimer = setTimeout(() => {
        setShowGif(false);
      }, GIF_HIDE_DELAY);

      // After door animation completes, remove loading screen
      const doorTimer = setTimeout(() => {
        setPhase('complete');
      }, DOOR_ANIMATION_DURATION);

      return () => {
        clearTimeout(hideGifTimer);
        clearTimeout(doorTimer);
      };
    }
  }, [phase]);

  return (
    <>
      {/* Main content - always rendered in the same place */}
      {children}

      {/* Loading overlay with doors - only render on client after mount, until complete */}
      {isMounted && phase !== 'complete' && (
        <div className="fixed inset-0 z-9999 pointer-events-none">
          {/* Left door */}
          <div
            className="absolute top-0 left-0 h-full bg-black overflow-hidden transition-[width] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              width: phase === 'door' ? '0%' : '50%',
              transitionDuration: `${DOOR_ANIMATION_DURATION}ms`,
            }}
          >
            {/* GIF on left door - positioned to show left half, hidden after delay */}
            {showGif && (
              <div
                className="absolute top-0 left-0 h-full"
                style={{ width: '200%' }}
              >
                <Image
                  key={gifKey}
                  src={`/assets/creation-of-adam.gif?t=${gifKey}`}
                  alt="Loading..."
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Right door */}
          <div
            className="absolute top-0 right-0 h-full bg-black overflow-hidden transition-[width] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              width: phase === 'door' ? '0%' : '50%',
              transitionDuration: `${DOOR_ANIMATION_DURATION}ms`,
            }}
          >
            {/* GIF on right door - positioned to show right half, hidden after delay */}
            {showGif && (
              <div
                className="absolute top-0 right-0 h-full"
                style={{ width: '200%' }}
              >
                <Image
                  key={`${gifKey}-right`}
                  src={`/assets/creation-of-adam.gif?t=${gifKey}`}
                  alt="Loading..."
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
