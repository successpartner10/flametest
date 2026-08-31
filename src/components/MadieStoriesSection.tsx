import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, Flame, Sparkles, Utensils } from 'lucide-react';
import { STORY_SLIDES } from '../data/mockData';
import { AppMode } from '../types';
import { FlameLogo } from './FlameLogo';
import { RevealOnScroll } from './RevealOnScroll';

interface MadieStoriesSectionProps {
  onOpenStory: (slideIndex: number) => void;
  mode?: AppMode;
}

export const MadieStoriesSection: React.FC<MadieStoriesSectionProps> = ({ 
  onOpenStory,
  mode = 'lunch'
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const totalSlides = STORY_SLIDES.length;
  const isNight = mode === 'night';

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="relative bg-[#180309] text-[#f7e8ea] pt-20 lg:pt-28 pb-28 lg:pb-36 px-4 sm:px-6 lg:px-12 overflow-hidden select-none font-['Raleway']">
      
      {/* Subtle Warm Amber & Crimson Radial Ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,89,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(158,28,56,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Persian Flame Crest + Quote + Carousel Controls */}
        <RevealOnScroll 
          direction="up" 
          delay={0}
          duration={800}
          className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7"
        >
          
          {/* Catering Badge */}
          <div className="flex flex-col items-center lg:items-start space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3d0917]/90 border border-[#831f3b]/70 text-[#f5d79e] text-[11px] sm:text-xs font-['Raleway'] font-black uppercase tracking-[0.2em] shadow-lg">
              <Sparkles size={13} className="text-[#f5d79e]" />
              <span>Full-Service Catering</span>
            </div>
          </div>

          {/* Catering-focused copy */}
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold tracking-tight leading-tight">
              We Bring the Feast <span className="text-[#f3cf8a]">To You</span>
            </h2>
            <p className="text-base sm:text-lg text-[#f3d2d8] leading-relaxed font-light max-w-md">
              From intimate home dinners to grand wedding banquets and corporate luncheons — <span className="font-bold text-white tracking-wider">FLAME INTERNATIONAL</span> delivers authentic Persian kababs, saffron feasts, and full banquet setups directly to your venue.
            </p>
          </div>

          {/* Navigation Controls: Circular Previous / Next / Counter */}
          <div className="flex items-center space-x-3.5 pt-1">
            <button
              id="madie-prev-btn"
              onClick={handlePrev}
              aria-label="Previous catering slide"
              className="w-11 h-11 rounded-full bg-[#3d0917]/90 hover:bg-[#5e1026] border border-[#831f3b]/70 flex items-center justify-center text-[#f5d79e] transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              id="madie-next-btn"
              onClick={handleNext}
              aria-label="Next catering slide"
              className="w-11 h-11 rounded-full bg-[#3d0917]/90 hover:bg-[#5e1026] border border-[#831f3b]/70 flex items-center justify-center text-[#f5d79e] transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <ArrowRight size={16} />
            </button>

            <span className="text-xs tracking-widest text-[#f5d79e] font-mono pl-3 font-semibold">
              0{currentIdx + 1} / 0{totalSlides}
            </span>
          </div>

        </RevealOnScroll>

        {/* Right Column: Layered 3D Swipable Card Stack */}
        <RevealOnScroll 
          direction="up" 
          delay={200}
          duration={850}
          className="lg:col-span-7 flex items-center justify-center py-4 lg:py-6"
        >
          <div className="relative w-72 sm:w-84 md:w-96 aspect-[3/4] max-w-full">
            
            {/* Render stacked cards with rotational offsets */}
            {STORY_SLIDES.map((slide, idx) => {
              const offset = (idx - currentIdx + totalSlides) % totalSlides;
              const isTop = offset === 0;

              // Stack styling
              let transformStyle = '';
              let zIndex = 10 - offset;
              let opacity = 1;

              if (offset === 0) {
                transformStyle = 'rotate(0deg) scale(1) translate(0px, 0px)';
              } else if (offset === 1) {
                transformStyle = 'rotate(4deg) scale(0.96) translate(22px, 8px)';
                opacity = 0.85;
              } else if (offset === 2) {
                transformStyle = 'rotate(8deg) scale(0.92) translate(40px, 16px)';
                opacity = 0.65;
              } else {
                transformStyle = 'rotate(12deg) scale(0.88) translate(56px, 24px)';
                opacity = 0.45;
              }

              return (
                <div
                  key={slide.id}
                  onClick={() => onOpenStory(idx)}
                  className={`absolute inset-0 rounded-3xl overflow-hidden border-2 border-[#521324] shadow-[0_25px_60px_rgba(0,0,0,0.75)] cursor-pointer transition-all duration-500 ease-out group ${
                    isTop ? 'hover:scale-[1.02]' : ''
                  }`}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    onError={(e) => {
                      e.currentTarget.src = '/images/hero-catering.png';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  
                  {/* Subtle Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180309]/95 via-[#180309]/40 to-[#180309]/50" />

                  {/* Flame Logo Crest in top-center */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#24060f]/80 backdrop-blur-md border border-[#d4a359]/40">
                    <Flame size={13} className="text-[#d4a359]" />
                    <span className="font-['Raleway'] text-[10px] tracking-[0.2em] font-extrabold uppercase text-[#f5d79e]">
                      FLAME
                    </span>
                  </div>

                  {/* Card bottom info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.25em] text-[#f5d79e] px-2.5 py-0.5 rounded-full bg-[#1b030b]/85 border border-[#831f3b]/70 backdrop-blur-sm inline-block font-semibold">
                      {slide.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium drop-shadow-md leading-snug">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-[#fce4ec]/85 line-clamp-1">
                      {slide.subtitle}
                    </p>
                    
                    {isTop && (
                      <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#ffd54f] font-semibold">
                        <Play size={12} fill="currentColor" />
                        <span>Tap to request catering</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        </RevealOnScroll>

      </div>

      {/* Seamless Curvy Bottom Transition with Animated Glowing Gold Line */}
      <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none select-none">
        <svg 
          viewBox="0 0 1440 90" 
          preserveAspectRatio="none" 
          className="w-full h-10 sm:h-16 md:h-20 lg:h-24 block transition-colors duration-700"
        >
          <defs>
            <linearGradient id="madieGoldShimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b37a2b" />
              <stop offset="25%" stopColor="#f7d688" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f7d688" />
              <stop offset="100%" stopColor="#b37a2b" />
              <animate
                attributeName="x1"
                from="-100%"
                to="100%"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                from="0%"
                to="200%"
                dur="4s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <filter id="madieGoldGlow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#d4a359" floodOpacity="0.85" />
            </filter>
          </defs>
          <path 
            d="M 0,90 L 0,40 C 220,85 540,88 920,42 C 1140,16 1320,25 1440,30 L 1440,90 Z" 
            fill={isNight ? '#180309' : '#ffffff'} 
          />
          {/* Animated Gold Shimmer Edge */}
          <path 
            d="M 0,40 C 220,85 540,88 920,42 C 1140,16 1320,25 1440,30" 
            fill="none"
            stroke="url(#madieGoldShimmerGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#madieGoldGlow)"
          />
        </svg>
      </div>

    </section>
  );
};

