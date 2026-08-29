import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, UtensilsCrossed, Calendar, Play, Pause, RefreshCw, Sparkles } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';
import { getRotatingHeroMessages, getDayTimeContext } from '../data/greetingsData';

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

  // Rotating custom enticing messages strictly tailored to current day & time
  const [dayTimeContext] = useState(() => getDayTimeContext());
  const [rotatingMessages, setRotatingMessages] = useState<string[]>(() => getRotatingHeroMessages());
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const messages = getRotatingHeroMessages();
    setRotatingMessages(messages);

    // Slow down rotating messages so guests can comfortably read full sentences (10 seconds per message)
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsFading(false);
      }, 400);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleNextMessage = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
      setIsFading(false);
    }, 250);
  };

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

      {/* Center Headline Content */}
      <RevealOnScroll direction="up" delay={100} duration={850} className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-6 sm:mt-0 flex flex-col items-center">
        
        {/* Experience Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/70 border border-[#d4a359]/60 text-[#f5d79e] text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 backdrop-blur-md shadow-xl font-['Raleway'] font-medium">
          <Sparkles size={14} className="text-[#f5d79e]" />
          <span>Authentic Persian Cuisine & Live Entertainment</span>
        </div>

        {/* Script Top Title: "The true taste of" */}
        <h2 
          className="font-script text-[#d4a359] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight drop-shadow-[0_2px_12px_rgba(212,163,89,0.4)] tracking-wide"
        >
          The true taste of
        </h2>

        {/* Main Brand Name: "FLAME INTERNATIONAL" in Raleway */}
        <h1 
          className="font-['Raleway'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#ffffff] font-medium tracking-wider mt-0 mb-4 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
        >
          FLAME INTERNATIONAL
        </h1>

        {/* 3 to 4 Rotating Context-Aware Welcome Lines strictly determined by Day and Time */}
        <div 
          onClick={handleNextMessage}
          title="Click to view next message"
          className="cursor-pointer group flex flex-col items-center justify-center max-w-2xl mx-auto my-2 px-2 select-none"
        >
          <p 
            className={`text-[#f1ece1] text-base sm:text-lg md:text-xl font-normal tracking-wide text-center leading-relaxed drop-shadow-md min-h-[58px] sm:min-h-[64px] flex items-center justify-center transition-all duration-300 ${
              isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            {rotatingMessages[currentMessageIndex]}
          </p>

          {/* Discreet Message Pagination Indicator Dots */}
          <div className="flex items-center space-x-1.5 mt-2 mb-6">
            {rotatingMessages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFading(true);
                  setTimeout(() => {
                    setCurrentMessageIndex(idx);
                    setIsFading(false);
                  }, 150);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentMessageIndex
                    ? 'w-6 bg-[#d4a359] shadow-[0_0_8px_rgba(212,163,89,0.8)]'
                    : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to message ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to action buttons with direct conversion hierarchy */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
          {/* Primary Action: Solid Flame Red / Intense Burnt Orange */}
          <button
            id="hero-reserve-btn"
            onClick={onBookTable}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d9381e] via-[#e64a19] to-[#ea580c] text-white font-medium text-sm sm:text-base uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_10px_30px_rgba(230,74,25,0.45)] hover:brightness-110 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 cursor-pointer border border-[#ff8a65]/40 font-['Raleway']"
          >
            <Calendar size={18} className="text-white" />
            <span>Reserve a Table</span>
          </button>

          {/* Secondary Action: Outlined button with white text */}
          <button
            id="hero-view-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-black/40 hover:bg-black/60 text-white hover:text-[#d4a359] border-2 border-white/80 hover:border-[#d4a359] font-medium text-sm sm:text-base uppercase tracking-[0.16em] transition-all duration-300 backdrop-blur-md flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 font-['Raleway']"
          >
            <UtensilsCrossed size={18} />
            <span>Explore Menu</span>
          </button>
        </div>
      </RevealOnScroll>

      {/* Floating Centered Down Arrow Button - No Background, Pure Chevron */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-auto">
        <button
          id="hero-scroll-down-btn"
          onClick={onScrollToStory}
          aria-label="Scroll to Discover Our Story"
          className="p-2 bg-transparent text-[#f3cf8a] hover:text-white hover:scale-125 active:scale-95 transition-all duration-300 cursor-pointer drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] focus:outline-none"
        >
          <ChevronDown size={32} strokeWidth={2.5} className="animate-bounce" />
        </button>
      </div>

      {/* Organic Architectural Bottom Wave Curve Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden leading-none">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`w-full h-10 sm:h-16 md:h-20 transition-colors duration-700 ${
            mode === 'night' ? 'text-[#000000]' : 'text-[#ffffff]'
          }`}
        >
          <path 
            d="M 0,55 C 380,95 860,10 1440,28 L 1440,100 L 0,100 Z" 
            fill="currentColor" 
          />
        </svg>
      </div>

    </section>
  );
};
