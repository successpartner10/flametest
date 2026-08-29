import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* Pinned Top Viewport Gold Scroll Progress Bar (#d4a359) */
    <div 
      id="global-scroll-progress-top"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/20 backdrop-blur-xs"
    >
      <div
        className="h-full bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f7d688] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(212,163,89,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
