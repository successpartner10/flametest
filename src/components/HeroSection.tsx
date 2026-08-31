import React, { useState, useEffect, useRef } from 'react';
import { UtensilsCrossed, Calendar, Ticket, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { AppMode } from '../types';
import flameConcertHero from '../assets/images/flame_concert_hero_1788098658069.jpg';
import flameDiningRoom from '../assets/images/flame_dining_room.jpg';

interface HeroSectionProps {
  mode: AppMode;
  onExploreMenu: () => void;
  onBookTable: () => void;
  onScrollToStory: () => void;
}

const CINEMATIC_SCENES = [
  {
    id: 'shahyar-arand-live',
    title: 'Shahyar Ghanbari & Arand Live Concert',
    subtitle: 'Saturday Night Stage at Flame International',
    image: flameConcertHero,
    motionClass: 'animate-hero-pan-zoom-1',
  },
  {
    id: 'flame-dining-room',
    title: 'Opulent West LA Dining Room',
    subtitle: '11330 Santa Monica Blvd, West Los Angeles',
    image: flameDiningRoom,
    motionClass: 'animate-hero-pan-zoom-2',
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-cycle between cinematic scenes with smooth crossfade (faster transition)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % CINEMATIC_SCENES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Live sparkling light particles & stage dust over the video canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool for ambient golden stage dust & light gleams
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.3 ? '#f7d688' : '#ffffff',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * 0.002 + p.radius) * 0.01;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > 0.85) p.alpha = 0.85;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#d4a359';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-end justify-center pb-20 sm:pb-24 overflow-hidden bg-[#180309] font-['Raleway']">
      
      {/* 
        Full Unobscured Video & Cinematic Image Canvas
        Removed heavy dark overlay so imagery is vibrant, clear, and visible
      */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#180309] select-none">
        {CINEMATIC_SCENES.map((scene, index) => {
          const isActive = index === activeSceneIndex;
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Animated Cinematic Motion Image Video layer with Ken-Burns pan and zoom */}
              <div 
                className={`w-full h-full transform transition-transform duration-[4000ms] ease-out ${
                  isPlaying ? (index === 0 ? 'scale-110 translate-x-2 -translate-y-1' : 'scale-105 -translate-x-2') : 'scale-100'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero-catering.png';
                  }}
                  className="w-full h-full object-cover object-center filter contrast-[1.04]"
                />
              </div>
            </div>
          );
        })}

        {/* Ambient Live Golden Particles Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 pointer-events-none w-full h-full"
        />
      </div>

      {/* Organic Architectural Bottom Wave Curve Transition with Animated Glowing Gold Line */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden leading-none">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`w-full h-8 sm:h-12 md:h-16 transition-colors duration-700 ${
            mode === 'night' ? 'text-[#180309]' : 'text-[#ffffff]'
          }`}
        >
          <defs>
            <linearGradient id="heroGoldShimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b37a2b" />
              <stop offset="25%" stopColor="#f7d688" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f7d688" />
              <stop offset="100%" stopColor="#b37a2b" />
              <animate
                attributeName="x1"
                from="-100%"
                to="100%"
                dur="4.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                from="0%"
                to="200%"
                dur="4.5s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <filter id="heroGoldGlow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#d4a359" floodOpacity="0.85" />
            </filter>
          </defs>
          <path 
            d="M 0,55 C 380,95 860,10 1440,28 L 1440,100 L 0,100 Z" 
            fill="currentColor" 
          />
          <path 
            d="M 0,55 C 380,95 860,10 1440,28" 
            fill="none" 
            stroke="url(#heroGoldShimmerGrad)" 
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#heroGoldGlow)"
          />
        </svg>
      </div>

    </section>
  );
};
