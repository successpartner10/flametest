import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, UtensilsCrossed, Calendar, Play, Pause, RefreshCw } from 'lucide-react';
import { AppMode } from '../types';

interface HeroSectionProps {
  mode: AppMode;
  onExploreMenu: () => void;
  onBookTable: () => void;
  onScrollToStory: () => void;
}

// Cinematic Persian Culinary & Open Flame Grill Video Streams with Multi-Source & High Reliability
const HERO_SCENES = [
  {
    id: 'flame-charcoal-grill',
    title: 'Open Charcoal Flame & Skewered Kababs',
    subtitle: 'Koobideh & Joojeh skewers sizzling over open oak embers',
    videoSources: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://assets.mixkit.co/videos/42978/42978-720.mp4',
    ],
    posterUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'persian-banquet-feast',
    title: 'Royal Persian Banquet Spread',
    subtitle: 'Saffron Basmati, Ruby Zereshk, Pomegranates & Candlelight',
    videoSources: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      'https://assets.mixkit.co/videos/42988/42988-720.mp4',
    ],
    posterUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'saffron-pot-stews',
    title: 'Simmering Khoresht & Golden Tahdig',
    subtitle: 'Slow-braised herbs, saffron rice crust & Persian tea',
    videoSources: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      'https://assets.mixkit.co/videos/43004/43004-720.mp4',
    ],
    posterUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1600&q=80',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  mode,
  onExploreMenu,
  onBookTable,
  onScrollToStory,
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Automatically cycle through video scenes smoothly every 7 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % HERO_SCENES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Ensure current active video starts playing whenever the scene changes
  useEffect(() => {
    const currentVideo = videoRefs.current[activeSceneIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled gracefully
        });
      }
    }
  }, [activeSceneIndex]);

  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[activeSceneIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-[#0d1013] font-['Raleway']">
      
      {/* Background Multi-Video Canvas with Slow Ken-Burns Scale & Soft Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {HERO_SCENES.map((scene, index) => {
          const isActive = index === activeSceneIndex;
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* HTML5 Looping Video with Multiple Source Fallbacks & Autoplay Handlers */}
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                poster={scene.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  if (isActive && isPlaying) {
                    e.currentTarget.play().catch(() => {});
                  }
                }}
                onCanPlay={(e) => {
                  if (isActive && isPlaying) {
                    e.currentTarget.play().catch(() => {});
                  }
                }}
                className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                } filter brightness-[0.72] contrast-[1.08]`}
              >
                {scene.videoSources.map((src, sIdx) => (
                  <source key={sIdx} src={src} type="video/mp4" />
                ))}
              </video>

              {/* Poster Image Backdrop Fallback */}
              <img
                src={scene.posterUrl}
                alt={scene.title}
                className="absolute inset-0 w-full h-full object-cover -z-10 filter brightness-60"
              />

              {/* Ambient Texture & Film Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1013] via-[#0d1013]/60 to-[#0d1013]/85" />
            </div>
          );
        })}

        {/* Dynamic Mode Lighting Vignette */}
        <div 
          className={`absolute inset-0 z-15 pointer-events-none transition-opacity duration-1000 ${
            mode === 'lunch'
              ? 'bg-radial from-amber-600/20 via-transparent to-transparent opacity-80'
              : 'bg-radial from-rose-950/40 via-transparent to-transparent opacity-100'
          }`} 
        />
      </div>

      {/* Interactive Video Playback & Scene Switcher Bar */}
      <div className="absolute top-24 right-4 sm:right-8 z-30 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xl">
        <button
          onClick={togglePlayPause}
          className="p-1 text-[#d4a359] hover:text-white transition-colors cursor-pointer"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        </button>

        <span className="text-[10px] uppercase tracking-widest text-[#d4a359] font-bold">
          Scene {activeSceneIndex + 1}/{HERO_SCENES.length}
        </span>

        <div className="flex space-x-1.5 ml-1">
          {HERO_SCENES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSceneIndex(idx);
                setIsPlaying(true);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeSceneIndex ? 'w-6 bg-[#d4a359]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Switch to video scene ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Center Headline Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-6 sm:mt-0 flex flex-col items-center">
        
        {/* Mode Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#181d22]/85 border border-[#d4a359]/40 text-[#d4a359] text-xs uppercase tracking-[0.25em] mb-4 backdrop-blur-md shadow-lg">
          <Sparkles size={13} className="text-[#d4a359]" />
          <span className="font-bold">{mode === 'lunch' ? 'Lunch Hub & Afternoon Dining' : 'Cabaret, Persian Live Stage & Night'}</span>
        </div>

        {/* Script Top Title: "The true taste of" */}
        <h2 
          className="font-script text-[#d4a359] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight drop-shadow-[0_2px_12px_rgba(212,163,89,0.4)] tracking-wide"
        >
          The true taste of
        </h2>

        {/* Main Brand Name: "FLAME INTERNATIONAL" in Raleway */}
        <h1 
          className="font-['Raleway'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#fbf8f2] font-black tracking-tight mt-0 mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
        >
          FLAME INTERNATIONAL
        </h1>

        {/* Subtitle */}
        <p className="text-[#e2dacd] text-sm sm:text-base md:text-lg lg:text-xl font-normal tracking-wide max-w-xl mx-auto mb-2 drop-shadow-md">
          An experience that awakens all the senses
        </p>

        {/* Active Scene Subtitle Pill */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-md bg-black/60 border border-[#d4a359]/40 text-[#f5d79e] text-xs font-semibold tracking-wider mb-6 backdrop-blur-sm transition-all duration-700 shadow-md">
          <span>✨ {HERO_SCENES[activeSceneIndex].subtitle}</span>
        </div>

        {/* Year indicator: "• 2026 •" */}
        <div className="text-xs sm:text-sm tracking-[0.35em] text-[#d4a359] font-extrabold uppercase mb-8 font-['Raleway']">
          • 2026 •
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
          <button
            id="hero-view-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#d4a359] hover:bg-[#e0b46d] text-[#121619] font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_25px_rgba(212,163,89,0.3)] hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <UtensilsCrossed size={16} />
            <span>Explore Menu</span>
          </button>
          
          <button
            id="hero-reserve-btn"
            onClick={onBookTable}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1e242b]/90 hover:bg-[#28303a] text-[#f5f1ea] border border-[#434d5b] hover:border-[#d4a359]/70 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
          >
            <Calendar size={16} className="text-[#d4a359]" />
            <span>Reserve a Table</span>
          </button>
        </div>
      </div>

      {/* Floating Centered Down Arrow Button (No colored SVG background blocking below) */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center pointer-events-auto">
        <button
          id="hero-scroll-down-btn"
          onClick={onScrollToStory}
          aria-label="Scroll to Discover Our Story"
          className="w-10 h-10 rounded-full bg-[#d4a359] text-black flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:bg-[#f3cf8a] hover:scale-110 active:scale-95 transition-all cursor-pointer border border-[#fff3cf]/50"
        >
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </div>

    </section>
  );
};
