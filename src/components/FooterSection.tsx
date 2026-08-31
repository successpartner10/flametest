import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Phone, Mail, Instagram, Facebook, Linkedin, Navigation, ExternalLink, 
  Heart, Globe, Star, Plus, Minus, RotateCcw, Compass, Car, MessageCircle, ArrowRight,
  Route, CheckCircle2, AlertCircle, LocateFixed
} from 'lucide-react';
import { AppMode } from '../types';
import { FlameLogo } from './FlameLogo';
import { RevealOnScroll } from './RevealOnScroll';

interface FooterSectionProps {
  onOpenReserve: () => void;
  onOpenFunctions: () => void;
  onScrollToTop?: () => void;
  onOpenMenu?: () => void;
  onOpenStories?: () => void;
  onOpenAbout?: () => void;
  mode?: AppMode;
}

// Helper: Calculate distance in miles between two coordinates (Haversine Formula)
function calculateDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper: Format travel time in minutes to hours and minutes if >= 60 mins
function formatTravelTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} mins`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  const hourText = hours === 1 ? '1 hour' : `${hours} hours`;
  if (remainingMins === 0) {
    return hourText;
  }
  const minText = remainingMins === 1 ? '1 min' : `${remainingMins} mins`;
  return `${hourText}, ${minText}`;
}

// Preset origin locations for quick route calculations on the street map (clean 2-row layout)
const ROUTE_ORIGINS = [
  { id: 'santa-monica', name: 'Santa Monica', distance: '3.9 mi', minutes: 11, traffic: 'Smooth (🟢)', linePath: 'M 0 175 L 255 175 L 255 140' },
  { id: 'beverly-hills', name: 'Beverly Hills', distance: '4.2 mi', minutes: 13, traffic: 'Light (🟢)', linePath: 'M 500 175 L 255 175 L 255 140' },
  { id: 'ucla', name: 'Westwood / UCLA', distance: '1.8 mi', minutes: 6, traffic: 'Smooth (🟢)', linePath: 'M 255 0 L 255 140' },
  { id: 'century-city', name: 'Century City', distance: '2.7 mi', minutes: 8, traffic: 'Smooth (🟢)', linePath: 'M 500 175 L 255 175 L 255 140' },
  { id: 'culver-city', name: 'Culver City', distance: '4.8 mi', minutes: 12, traffic: 'Smooth (🟢)', linePath: 'M 180 350 L 180 180 L 255 180 L 255 130' },
  { id: 'lax', name: 'LAX Airport', distance: '10.5 mi', minutes: 18, traffic: 'Moderate (🟡)', linePath: 'M 100 350 L 100 175 L 255 175 L 255 140' },
  { id: 'dtla', name: 'Downtown LA', distance: '12.4 mi', minutes: 22, traffic: 'Normal (🟢)', linePath: 'M 500 175 L 255 175 L 255 140' },
];

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenReserve,
  onOpenFunctions,
  onScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  onOpenMenu,
  onOpenStories,
  onOpenAbout,
  mode = 'lunch',
}) => {
  // Map zoom level: 1 = Super Regional (West LA & Freeways), 2 = Regional (HWY 405 & Arteries), 3 = District (Sawtelle + Corinth), 4 = Corridor Focus, 5 = Close-Up
  const [zoomLevel, setZoomLevel] = useState<number>(3);
  
  // Directions state
  const [selectedOriginId, setSelectedOriginId] = useState<string>('santa-monica');
  const [customOrigin, setCustomOrigin] = useState<string>('');
  const [gpsData, setGpsData] = useState<{ distance: string; time: string; coords: string } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const activeOrigin = ROUTE_ORIGINS.find(o => o.id === selectedOriginId) || ROUTE_ORIGINS[0];
  const displayDistance = gpsData && customOrigin ? gpsData.distance : activeOrigin.distance;
  const displayTime = gpsData && customOrigin ? gpsData.time : formatTravelTime(activeOrigin.minutes);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(3);
  };

  // Helper for dynamic route line overlay over the actual street map
  const getRoutePathForZoom = (zoom: number, originId: string) => {
    if (zoom === 1) {
      switch (originId) {
        case 'santa-monica': return 'M 0 170 L 255 170 L 255 125';
        case 'beverly-hills': return 'M 500 170 L 255 170 L 255 125';
        case 'ucla': return 'M 345 0 L 345 170 L 255 170 L 255 125';
        case 'culver-city': return 'M 220 350 L 220 170 L 255 170 L 255 125';
        case 'century-city': return 'M 460 170 L 255 170 L 255 125';
        case 'lax': return 'M 345 350 L 345 170 L 255 170 L 255 125';
        case 'brentwood': return 'M 60 70 L 60 170 L 255 170 L 255 125';
        case 'dtla': return 'M 500 300 L 345 300 L 345 170 L 255 170 L 255 125';
        default: return 'M 0 170 L 255 170 L 255 125';
      }
    } else if (zoom === 2) {
      switch (originId) {
        case 'santa-monica': return 'M 0 165 L 250 165 L 250 115';
        case 'beverly-hills': return 'M 500 165 L 250 165 L 250 115';
        case 'ucla': return 'M 345 0 L 345 165 L 250 165 L 250 115';
        case 'culver-city': return 'M 190 350 L 190 165 L 250 165 L 250 115';
        case 'century-city': return 'M 480 165 L 250 165 L 250 115';
        case 'lax': return 'M 345 350 L 345 165 L 250 165 L 250 115';
        case 'brentwood': return 'M 60 65 L 60 165 L 250 165 L 250 115';
        case 'dtla': return 'M 500 165 L 250 165 L 250 115';
        default: return 'M 0 165 L 250 165 L 250 115';
      }
    } else if (zoom === 3) {
      switch (originId) {
        case 'santa-monica': return 'M 0 160 L 250 160 L 250 110';
        case 'beverly-hills': return 'M 500 160 L 250 160 L 250 110';
        case 'ucla': return 'M 250 0 L 250 110';
        case 'culver-city': return 'M 115 350 L 115 160 L 250 160 L 250 110';
        case 'century-city': return 'M 500 160 L 250 160 L 250 110';
        case 'lax': return 'M 115 350 L 115 160 L 250 160 L 250 110';
        case 'brentwood': return 'M 115 0 L 115 160 L 250 160 L 250 110';
        case 'dtla': return 'M 500 160 L 250 160 L 250 110';
        default: return 'M 0 160 L 250 160 L 250 110';
      }
    } else if (zoom === 4) {
      switch (originId) {
        case 'santa-monica': return 'M 0 180 L 250 180 L 250 120';
        case 'beverly-hills': return 'M 500 180 L 250 180 L 250 120';
        case 'ucla': return 'M 250 0 L 250 120';
        case 'culver-city': return 'M 85 350 L 85 180 L 250 180 L 250 120';
        case 'century-city': return 'M 500 180 L 250 180 L 250 120';
        case 'lax': return 'M 85 350 L 85 180 L 250 180 L 250 120';
        case 'brentwood': return 'M 85 0 L 85 180 L 250 180 L 250 120';
        case 'dtla': return 'M 500 180 L 250 180 L 250 120';
        default: return 'M 0 180 L 250 180 L 250 120';
      }
    } else {
      // zoomLevel === 5 (Close-Up)
      switch (originId) {
        case 'santa-monica': return 'M 0 190 L 250 190 L 250 135';
        case 'beverly-hills': return 'M 500 190 L 250 190 L 250 135';
        case 'ucla': return 'M 250 0 L 250 135';
        case 'culver-city': return 'M 50 350 L 50 190 L 250 190 L 250 135';
        case 'century-city': return 'M 500 190 L 250 190 L 250 135';
        case 'lax': return 'M 50 350 L 50 190 L 250 190 L 250 135';
        case 'brentwood': return 'M 50 0 L 50 190 L 250 190 L 250 135';
        case 'dtla': return 'M 500 190 L 250 190 L 250 135';
        default: return 'M 0 190 L 250 190 L 250 135';
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported in this browser. Click "Open Live Google Navigation" below!');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Accessing device GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const distMiles = calculateDistanceMiles(userLat, userLon, 34.0416, -118.4552);
        
        let estMins = Math.max(3, Math.round(distMiles * 2.2 + 2));
        if (distMiles < 0.5) estMins = 2;
        else if (distMiles > 60) estMins = Math.round(distMiles * 1.1 + 10);

        const distStr = `${distMiles.toFixed(1)} mi`;
        const timeStr = formatTravelTime(estMins);
        const coordsStr = `${userLat.toFixed(3)}, ${userLon.toFixed(3)}`;

        setGpsData({ distance: distStr, time: timeStr, coords: coordsStr });
        setCustomOrigin(`Your Current GPS Location (${distStr})`);
        setIsLocating(false);
        setLocationStatus(`GPS Locked! ~${distStr} to Flame (${timeStr} drive).`);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === 1) {
          setLocationStatus('GPS permission blocked. Tap "Open Live Google Navigation" below to route directly!');
        } else if (error.code === 2) {
          setLocationStatus('GPS signal unavailable. Tap "Open Live Google Navigation" below.');
        } else {
          setLocationStatus('GPS request timed out. Tap "Open Live Google Navigation" below.');
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  };

  return (
    <footer id="find-us-footer" className="relative bg-[#180309] text-[#f7e8ea] pt-20 sm:pt-28 pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden font-['Raleway']">
      
      {/* Curved Architectural Top Wave Transition - With Animated Continuous Moving Gold Glow Line */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden leading-none z-10">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`w-full h-10 sm:h-16 md:h-20 transition-colors duration-700 ${
            mode === 'night' ? 'text-[#180309]' : 'text-[#ffffff]'
          }`}
        >
          <defs>
            <linearGradient id="footerGoldWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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
            <filter id="footerGoldGlow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#d4a359" floodOpacity="0.85" />
            </filter>
          </defs>
          <path 
            d="M 0,0 L 1440,0 L 1440,28 C 860,10 380,95 0,55 Z" 
            fill="currentColor" 
          />
          {/* Radiant Gold Indicator Line with Animated Continuous Moving Shimmer */}
          <path 
            d="M 0,55 C 380,95 860,10 1440,28" 
            fill="none" 
            stroke="url(#footerGoldWaveGrad)" 
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#footerGoldGlow)"
          />
        </svg>
      </div>

      {/* Subtle Warm Amber Ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,163,89,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Prominent Official Flame International Color Logo Header */}
        <RevealOnScroll direction="up" delay={0} duration={800} className="text-center mb-8 flex flex-col items-center">
          <div className="mb-5 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <FlameLogo variant="color-full" size="xl" />
          </div>

          <span className="text-xs sm:text-sm tracking-[0.3em] text-[#f5a7b8] uppercase font-['Raleway'] font-medium block mb-1">
            FIND US / VISIT US
          </span>
          <h2 className="font-['Raleway'] text-lg sm:text-2xl text-white font-medium tracking-wider uppercase">
            ON <span className="text-[#f3cf8a] font-semibold ml-1">SANTA MONICA BOULEVARD</span>
          </h2>
          <p className="text-base sm:text-lg text-white font-normal mt-2 font-['Raleway']">
            11330 Santa Monica Blvd, West Los Angeles, CA 90025
          </p>
          
          {/* Valet Parking Info Pill directly below Address */}
          <div className="mt-3 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#3d0a1c]/95 border border-[#831f3b] text-sm text-[#f3cf8a] font-medium shadow-lg">
            <Car size={18} className="text-[#f3cf8a] shrink-0" />
            <span>Complimentary Guest Valet Parking at Main Entrance</span>
          </div>
        </RevealOnScroll>

        {/* Unified 2-Column Responsive Layout: Map Functionality Grouped Together (Left) vs Hours & Contact (Right) */}
        <RevealOnScroll direction="up" delay={150} duration={850} className="w-full max-w-6xl">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-7 items-start font-['Raleway']">
            
            {/* ========================================================================= */}
            {/* 🗺️ LEFT COLUMN (lg:col-span-7): UNIFIED STREET MAP & DIRECTIONS MODULE */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7">
              
              <div className="bg-[#1c030b]/90 border border-[#6b152d]/70 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-3.5">
                
                {/* Estimate Time From - Origin Selector Chips */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm uppercase font-medium tracking-widest text-[#f5a7b8] flex items-center space-x-1.5">
                      <Route size={16} className="text-[#f3cf8a]" />
                      <span>Estimate Time From:</span>
                    </span>
                    <span className="text-xs text-[#f5d79e] font-normal">Select start point or GPS</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {/* 1st Option: GPS Button */}
                    <button
                      onClick={handleUseCurrentLocation}
                      disabled={isLocating}
                      className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer font-['Raleway'] flex items-center justify-center text-center border shadow-sm ${
                        customOrigin
                          ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black border-[#d4a359] shadow-md scale-105 ring-2 ring-[#d4a359]/40 font-semibold'
                          : 'bg-[#400918] hover:bg-[#5e1026] text-[#f5d79e] border-[#a32b4b] hover:border-[#d4a359]'
                      }`}
                    >
                      <span>{isLocating ? 'LOCATING...' : 'MY GPS'}</span>
                    </button>

                    {/* Presets */}
                    {ROUTE_ORIGINS.map((origin) => (
                      <button
                        key={origin.id}
                        onClick={() => {
                          setSelectedOriginId(origin.id);
                          setCustomOrigin('');
                          setLocationStatus(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer font-['Raleway'] border ${
                          selectedOriginId === origin.id && !customOrigin
                            ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black border-[#d4a359] shadow-md scale-105 font-semibold'
                            : 'bg-[#280510] text-[#e2e8f0] hover:bg-[#3d0818] border-[#5c1125]'
                        }`}
                      >
                        {origin.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Route Metrics: Straight Line on Top of Map, Centralised Alignment */}
                <div className="py-2.5 px-4 rounded-2xl bg-[#280510]/80 border border-[#521324] flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center shadow-inner">
                  {/* Estimated Time Header & Number */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] sm:text-xs uppercase font-medium tracking-widest text-[#f5a7b8]">
                      Estimated Time
                    </span>
                    <span className="text-xl sm:text-2xl font-medium text-[#f3cf8a] leading-none">
                      {displayTime}
                    </span>
                  </div>

                  <span className="text-[#6b152d] hidden sm:inline">•</span>

                  {/* Miles / Distance */}
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs sm:text-sm text-[#e2e8f0]/90 font-normal">
                      {displayDistance}
                    </span>
                  </div>

                  <span className="text-[#6b152d] hidden sm:inline">•</span>

                  {/* Traffic Badge */}
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-green-950/80 border border-green-500/40 text-green-300 text-xs font-medium shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0"></span>
                    <span>{customOrigin ? 'Live GPS (🟢)' : activeOrigin.traffic}</span>
                  </div>
                </div>

                {locationStatus && (
                  <p className="text-[11px] sm:text-xs text-[#f5d79e] font-normal flex items-center justify-center space-x-1 bg-[#280510] px-3 py-1 rounded-lg border border-[#6b152d] mx-auto text-center">
                    <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                    <span className="truncate">{locationStatus}</span>
                  </p>
                )}

                {/* Map Viewport Area with Street Names & Route Overlay Line */}
                <div className="relative h-84 sm:h-96 rounded-2xl overflow-hidden bg-[#24050f] border border-[#5c1125] p-2 select-none">
                  
                  {/* Floating Map Zoom Navigation Bar (+ / - / Reset) */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col items-end space-y-1.5">
                    <div className="bg-[#121619]/95 backdrop-blur-md border border-[#d4a359]/70 rounded-xl p-1.5 shadow-2xl flex flex-col items-center space-y-1 ring-1 ring-[#d4a359]/40">
                      <span className="text-[9px] font-['Raleway'] font-medium text-[#d4a359] tracking-wider uppercase px-1">NAV</span>
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel === 5}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          zoomLevel === 5 ? 'text-white/20 bg-white/5 cursor-not-allowed' : 'text-[#f5d79e] bg-[#280510] hover:bg-[#d4a359] hover:text-black border border-[#68152c] cursor-pointer shadow-md'
                        }`}
                        title="Zoom In (+)"
                        aria-label="Zoom In (+)"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel === 1}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          zoomLevel === 1 ? 'text-white/20 bg-white/5 cursor-not-allowed' : 'text-[#f5d79e] bg-[#280510] hover:bg-[#d4a359] hover:text-black border border-[#68152c] cursor-pointer shadow-md'
                        }`}
                        title="Zoom Out (-)"
                        aria-label="Zoom Out (-)"
                      >
                        <Minus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Map Vector Graphic Rendering with ALL CAPS SANS-SERIF Typography */}
                  <div className="w-full h-full relative rounded-xl overflow-hidden bg-[#24050f]">
                    
                    {/* ZOOM LEVEL 1: SUPER REGIONAL OVERVIEW (GREATER WEST LA & FREEWAYS) */}
                    {zoomLevel === 1 && (
                      <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                        <defs>
                          <linearGradient id="mapGoldRouteGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b37a2b" />
                            <stop offset="35%" stopColor="#f7d688" />
                            <stop offset="70%" stopColor="#d4a359" />
                            <stop offset="100%" stopColor="#f3cf8a" />
                          </linearGradient>
                          <filter id="goldRouteGlow1" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#d4a359" floodOpacity="0.9" />
                          </filter>
                        </defs>
                        <rect width="500" height="350" fill="#1b030b" />
                        
                        {/* Freeway: I-405 (San Diego Freeway) */}
                        <path d="M 345 0 L 345 350" stroke="#003366" strokeWidth="44" />
                        <path d="M 345 0 L 345 350" stroke="#1d4ed8" strokeWidth="38" opacity="0.3" />
                        <path d="M 345 0 L 345 350" stroke="#25050e" strokeWidth="28" />
                        
                        {/* I-405 Shield Badges */}
                        <g transform="translate(345, 34)">
                          <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#003366" stroke="#ffffff" strokeWidth="1.8" />
                          <rect x="-18" y="-12" width="36" height="8" rx="2" fill="#cc0000" />
                          <text x="0" y="7" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">405</text>
                        </g>
                        <g transform="translate(345, 260)">
                          <rect x="-16" y="-10" width="32" height="20" rx="3" fill="#003366" stroke="#ffffff" strokeWidth="1.5" />
                          <rect x="-16" y="-10" width="32" height="7" rx="2" fill="#cc0000" />
                          <text x="0" y="5" fill="#ffffff" fontSize="9.5" fontWeight="700" textAnchor="middle">405</text>
                        </g>
                        <text x="345" y="160" fill="#60a5fa" fontSize="9" fontWeight="700" letterSpacing="0.12em" transform="rotate(90 345 160)" textAnchor="middle">INTERSTATE 405 (SAN DIEGO FWY)</text>

                        {/* Freeway: I-10 (Santa Monica Freeway) */}
                        <path d="M 0 305 L 500 305" stroke="#003366" strokeWidth="36" />
                        <path d="M 0 305 L 500 305" stroke="#25050e" strokeWidth="26" />
                        
                        {/* I-10 Shield Badge */}
                        <g transform="translate(45, 305)">
                          <rect x="-16" y="-11" width="32" height="22" rx="4" fill="#003366" stroke="#ffffff" strokeWidth="1.5" />
                          <rect x="-16" y="-11" width="32" height="7" rx="2" fill="#cc0000" />
                          <text x="0" y="6" fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle">10</text>
                        </g>
                        <text x="250" y="309" fill="#93c5fd" fontSize="9" fontWeight="700" letterSpacing="0.1em" textAnchor="middle">INTERSTATE 10 (SANTA MONICA FWY)</text>

                        {/* North-South Major Roads */}
                        {/* Lincoln Blvd (West) */}
                        <path d="M 60 0 L 60 305" stroke="#521324" strokeWidth="22" />
                        <path d="M 60 0 L 60 305" stroke="#1f040b" strokeWidth="16" />
                        <text x="60" y="150" fill="#f5d79e" fontSize="9" fontWeight="700" letterSpacing="0.08em" transform="rotate(-90 60 150)" textAnchor="middle">LINCOLN BLVD</text>

                        {/* Sawtelle Blvd */}
                        <path d="M 270 0 L 270 305" stroke="#521324" strokeWidth="22" />
                        <path d="M 270 0 L 270 305" stroke="#1f040b" strokeWidth="16" />
                        <text x="270" y="80" fill="#f3cf8a" fontSize="9" fontWeight="700" letterSpacing="0.08em" transform="rotate(-90 270 80)" textAnchor="middle">SAWTELLE BLVD</text>

                        {/* Sepulveda Blvd */}
                        <path d="M 420 0 L 420 305" stroke="#521324" strokeWidth="22" />
                        <path d="M 420 0 L 420 305" stroke="#1f040b" strokeWidth="16" />
                        <text x="420" y="220" fill="#f5d79e" fontSize="9" fontWeight="700" letterSpacing="0.08em" transform="rotate(90 420 220)" textAnchor="middle">SEPULVEDA BLVD</text>

                        {/* East-West Major Arteries */}
                        {/* Sunset Blvd (North) */}
                        <path d="M 0 50 L 500 50" stroke="#68152c" strokeWidth="22" />
                        <path d="M 0 50 L 500 50" stroke="#1f040b" strokeWidth="16" />
                        <text x="160" y="54" fill="#f3cf8a" fontSize="9.5" fontWeight="700" letterSpacing="0.08em">SUNSET BLVD</text>

                        {/* Wilshire Blvd */}
                        <path d="M 0 108 L 500 108" stroke="#68152c" strokeWidth="24" />
                        <path d="M 0 108 L 500 108" stroke="#1f040b" strokeWidth="18" />
                        <text x="160" y="112" fill="#f3cf8a" fontSize="10" fontWeight="700" letterSpacing="0.08em">WILSHIRE BLVD</text>

                        {/* Santa Monica Blvd (CA-2) - Primary Highlighted Corridor */}
                        <path d="M 0 170 L 500 170" stroke="#9e2343" strokeWidth="32" />
                        <path d="M 0 170 L 500 170" stroke="#1c0309" strokeWidth="24" />
                        <text x="145" y="174" fill="#ffffff" fontSize="10.5" fontWeight="700" letterSpacing="0.1em">SANTA MONICA BLVD (CA-2)</text>

                        {/* Olympic Blvd (South) */}
                        <path d="M 0 230 L 500 230" stroke="#68152c" strokeWidth="22" />
                        <path d="M 0 230 L 500 230" stroke="#1f040b" strokeWidth="16" />
                        <text x="160" y="234" fill="#f3cf8a" fontSize="9.5" fontWeight="700" letterSpacing="0.08em">OLYMPIC BLVD</text>

                        {/* Route Line Overlay (Golden Yellow Glowing Route matching Reserve Table Button) */}
                        <g>
                          <path
                            d={getRoutePathForZoom(1, selectedOriginId)}
                            fill="none"
                            stroke="#b37a2b"
                            strokeWidth="11"
                            strokeLinecap="round"
                            strokeOpacity="0.4"
                          />
                          <path
                            d={getRoutePathForZoom(1, selectedOriginId)}
                            fill="none"
                            stroke="url(#mapGoldRouteGrad1)"
                            strokeWidth="6.5"
                            strokeLinecap="round"
                            strokeOpacity="0.95"
                            filter="url(#goldRouteGlow1)"
                          />
                          <path
                            d={getRoutePathForZoom(1, selectedOriginId)}
                            fill="none"
                            stroke="#fff9e6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeOpacity="0.9"
                          />
                        </g>

                        {/* Destination Label Box (Taller, Split Address into 2 lines) */}
                        <g transform="translate(190, 95)">
                          <rect x="0" y="0" width="130" height="64" rx="7" fill="#121619" stroke="#d4a359" strokeWidth="2" />
                          <text x="65" y="18" fill="#ffffff" fontSize="10.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">FLAME</text>
                          <text x="65" y="31" fill="#ffffff" fontSize="9.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">INTERNATIONAL</text>
                          <text x="65" y="46" fill="#f3cf8a" fontSize="10" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">11330</text>
                          <text x="65" y="58" fill="#f3cf8a" fontSize="8.5" fontWeight="600" letterSpacing="0.06em" textAnchor="middle">SANTA MONICA BLVD</text>
                        </g>
                      </svg>
                    )}

                    {/* ZOOM LEVEL 2: REGIONAL FREEWAY & ARTERIES (I-405 & WEST LA) */}
                    {zoomLevel === 2 && (
                      <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                        <defs>
                          <linearGradient id="mapGoldRouteGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b37a2b" />
                            <stop offset="35%" stopColor="#f7d688" />
                            <stop offset="70%" stopColor="#d4a359" />
                            <stop offset="100%" stopColor="#f3cf8a" />
                          </linearGradient>
                          <filter id="goldRouteGlow2" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#d4a359" floodOpacity="0.9" />
                          </filter>
                        </defs>
                        <rect width="500" height="350" fill="#1b030b" />
                        
                        {/* Highway 405 (San Diego Freeway) */}
                        <path d="M 345 0 L 345 350" stroke="#003366" strokeWidth="48" />
                        <path d="M 345 0 L 345 350" stroke="#1d4ed8" strokeWidth="40" opacity="0.3" />
                        <path d="M 345 0 L 345 350" stroke="#25050e" strokeWidth="32" />

                        {/* Interstate 405 Blue/Red Shield Badge */}
                        <g transform="translate(345, 42)">
                          <rect x="-20" y="-14" width="40" height="28" rx="5" fill="#003366" stroke="#ffffff" strokeWidth="2" />
                          <rect x="-20" y="-14" width="40" height="9" rx="2" fill="#cc0000" />
                          <text x="0" y="8" fill="#ffffff" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">405</text>
                        </g>
                        <g transform="translate(345, 270)">
                          <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#003366" stroke="#ffffff" strokeWidth="1.8" />
                          <rect x="-18" y="-12" width="36" height="8" rx="2" fill="#cc0000" />
                          <text x="0" y="6" fill="#ffffff" fontSize="10.5" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">405</text>
                        </g>
                        <text x="345" y="160" fill="#60a5fa" fontSize="10" fontWeight="700" letterSpacing="0.12em" transform="rotate(90 345 160)" textAnchor="middle">I-405 SAN DIEGO FREEWAY</text>

                        {/* North-South Major Roads */}
                        {/* Sawtelle Blvd */}
                        <path d="M 210 0 L 210 350" stroke="#521324" strokeWidth="28" />
                        <path d="M 210 0 L 210 350" stroke="#1f040b" strokeWidth="22" />
                        <text x="210" y="260" fill="#f3cf8a" fontSize="10" fontWeight="700" letterSpacing="0.08em" transform="rotate(-90 210 260)" textAnchor="middle">SAWTELLE BLVD</text>

                        {/* Sepulveda Blvd */}
                        <path d="M 425 0 L 425 350" stroke="#521324" strokeWidth="28" />
                        <path d="M 425 0 L 425 350" stroke="#1f040b" strokeWidth="22" />
                        <text x="425" y="260" fill="#f5d79e" fontSize="10" fontWeight="700" letterSpacing="0.08em" transform="rotate(90 425 260)" textAnchor="middle">SEPULVEDA BLVD</text>

                        {/* Major East-West Arteries */}
                        {/* Wilshire Blvd */}
                        <path d="M 0 65 L 500 65" stroke="#68152c" strokeWidth="28" />
                        <path d="M 0 65 L 500 65" stroke="#1f040b" strokeWidth="22" />
                        <text x="130" y="70" fill="#f3cf8a" fontSize="10.5" fontWeight="700" letterSpacing="0.1em">WILSHIRE BLVD</text>

                        {/* Santa Monica Blvd (CA-2) - Primary Corridor */}
                        <path d="M 0 165 L 500 165" stroke="#9e2343" strokeWidth="38" />
                        <path d="M 0 165 L 500 165" stroke="#1c0309" strokeWidth="30" />
                        <text x="125" y="170" fill="#ffffff" fontSize="11.5" fontWeight="700" letterSpacing="0.12em">SANTA MONICA BOULEVARD (CA-2)</text>

                        {/* Olympic Blvd (South) */}
                        <path d="M 0 265 L 500 265" stroke="#68152c" strokeWidth="28" />
                        <path d="M 0 265 L 500 265" stroke="#1f040b" strokeWidth="22" />
                        <text x="130" y="270" fill="#f3cf8a" fontSize="10.5" fontWeight="700" letterSpacing="0.1em">OLYMPIC BLVD</text>

                        {/* Route Line Overlay (Golden Yellow Glowing Route matching Reserve Table Button) */}
                        <g>
                          <path
                            d={getRoutePathForZoom(2, selectedOriginId)}
                            fill="none"
                            stroke="#b37a2b"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeOpacity="0.4"
                          />
                          <path
                            d={getRoutePathForZoom(2, selectedOriginId)}
                            fill="none"
                            stroke="url(#mapGoldRouteGrad2)"
                            strokeWidth="7.5"
                            strokeLinecap="round"
                            strokeOpacity="0.95"
                            filter="url(#goldRouteGlow2)"
                          />
                          <path
                            d={getRoutePathForZoom(2, selectedOriginId)}
                            fill="none"
                            stroke="#fff9e6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeOpacity="0.9"
                          />
                        </g>

                        {/* Destination Label Box (Taller, Split Address) */}
                        <g transform="translate(185, 85)">
                          <rect x="0" y="0" width="130" height="68" rx="7" fill="#121619" stroke="#d4a359" strokeWidth="2.5" />
                          <text x="65" y="19" fill="#ffffff" fontSize="11.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">FLAME</text>
                          <text x="65" y="33" fill="#ffffff" fontSize="10.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">INTERNATIONAL</text>
                          <text x="65" y="49" fill="#f3cf8a" fontSize="11" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">11330</text>
                          <text x="65" y="62" fill="#f3cf8a" fontSize="9" fontWeight="600" letterSpacing="0.06em" textAnchor="middle">SANTA MONICA BLVD</text>
                        </g>
                      </svg>
                    )}

                    {/* ZOOM LEVEL 3: DISTRICT LEVEL (SAWTELLE & CORINTH) */}
                    {zoomLevel === 3 && (
                      <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                        <defs>
                          <linearGradient id="mapGoldRouteGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b37a2b" />
                            <stop offset="35%" stopColor="#f7d688" />
                            <stop offset="70%" stopColor="#d4a359" />
                            <stop offset="100%" stopColor="#f3cf8a" />
                          </linearGradient>
                          <filter id="goldRouteGlow3" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#d4a359" floodOpacity="0.9" />
                          </filter>
                        </defs>
                        <rect width="500" height="350" fill="#1b030b" />

                        {/* Streets Grid */}
                        {/* Sawtelle Blvd (LEFT / WEST) */}
                        <path d="M 115 0 L 115 350" stroke="#7a1c35" strokeWidth="38" />
                        <path d="M 115 0 L 115 350" stroke="#22040d" strokeWidth="30" />
                        <text x="115" y="260" fill="#f3cf8a" fontSize="10.5" fontWeight="700" letterSpacing="0.1em" transform="rotate(-90 115 260)" textAnchor="middle">SAWTELLE BLVD (WEST)</text>

                        {/* Corinth Ave (RIGHT / EAST) */}
                        <path d="M 370 0 L 370 350" stroke="#7a1c35" strokeWidth="38" />
                        <path d="M 370 0 L 370 350" stroke="#22040d" strokeWidth="30" />
                        <text x="370" y="260" fill="#f3cf8a" fontSize="10.5" fontWeight="700" letterSpacing="0.1em" transform="rotate(90 370 260)" textAnchor="middle">CORINTH AVE (EAST)</text>

                        {/* Santa Monica Blvd Wide Roadway */}
                        <path d="M 0 160 L 500 160" stroke="#9e2343" strokeWidth="46" />
                        <path d="M 0 160 L 500 160" stroke="#121619" strokeWidth="38" />
                        <text x="240" y="165" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.14em" textAnchor="middle">SANTA MONICA BOULEVARD (CA-2)</text>

                        {/* Route Line Overlay (Golden Yellow Glowing Route matching Reserve Table Button) */}
                        <g>
                          <path
                            d={getRoutePathForZoom(3, selectedOriginId)}
                            fill="none"
                            stroke="#b37a2b"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeOpacity="0.4"
                          />
                          <path
                            d={getRoutePathForZoom(3, selectedOriginId)}
                            fill="none"
                            stroke="url(#mapGoldRouteGrad3)"
                            strokeWidth="8.5"
                            strokeLinecap="round"
                            strokeOpacity="0.95"
                            filter="url(#goldRouteGlow3)"
                          />
                          <path
                            d={getRoutePathForZoom(3, selectedOriginId)}
                            fill="none"
                            stroke="#fff9e6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeOpacity="0.9"
                          />
                        </g>

                        {/* 11330 Flame International Lot (Taller, Split Address) */}
                        <g transform="translate(190, 70)">
                          <rect x="0" y="0" width="120" height="78" rx="7" fill="#4d0c1e" stroke="#d4a359" strokeWidth="2.5" />
                          <rect x="5" y="5" width="110" height="68" rx="5" fill="#5c1125" stroke="#a32b4b" strokeWidth="1" />
                          <text x="60" y="24" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.06em" textAnchor="middle">FLAME</text>
                          <text x="60" y="38" fill="#ffffff" fontSize="11" fontWeight="700" letterSpacing="0.06em" textAnchor="middle">INTERNATIONAL</text>
                          <text x="60" y="56" fill="#f3cf8a" fontSize="12" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">11330</text>
                          <text x="60" y="70" fill="#f3cf8a" fontSize="9.5" fontWeight="600" letterSpacing="0.04em" textAnchor="middle">SANTA MONICA BLVD</text>
                        </g>
                      </svg>
                    )}

                    {/* ZOOM LEVEL 4: CORRIDOR FOCUS */}
                    {zoomLevel === 4 && (
                      <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                        <defs>
                          <linearGradient id="mapGoldRouteGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b37a2b" />
                            <stop offset="35%" stopColor="#f7d688" />
                            <stop offset="70%" stopColor="#d4a359" />
                            <stop offset="100%" stopColor="#f3cf8a" />
                          </linearGradient>
                          <filter id="goldRouteGlow4" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="5.5" floodColor="#d4a359" floodOpacity="0.9" />
                          </filter>
                        </defs>
                        <rect width="500" height="350" fill="#1b030b" />

                        {/* Western Boundary: SAWTELLE BLVD (ON LEFT) */}
                        <path d="M 85 0 L 85 350" stroke="#7a1c35" strokeWidth="44" />
                        <path d="M 85 0 L 85 350" stroke="#22040d" strokeWidth="34" />
                        <text x="85" y="260" fill="#f3cf8a" fontSize="11" fontWeight="700" letterSpacing="0.12em" transform="rotate(-90 85 260)" textAnchor="middle">
                          SAWTELLE BLVD (WEST)
                        </text>

                        {/* Eastern Boundary: CORINTH AVE (ON RIGHT) */}
                        <path d="M 415 0 L 415 350" stroke="#7a1c35" strokeWidth="44" />
                        <path d="M 415 0 L 415 350" stroke="#22040d" strokeWidth="34" />
                        <text x="415" y="260" fill="#f3cf8a" fontSize="11" fontWeight="700" letterSpacing="0.12em" transform="rotate(90 415 260)" textAnchor="middle">
                          CORINTH AVE (EAST)
                        </text>

                        {/* Primary Street: SANTA MONICA BLVD (CA-2) */}
                        <path d="M 0 180 L 500 180" stroke="#8b1c37" strokeWidth="54" />
                        <path d="M 0 180 L 500 180" stroke="#180208" strokeWidth="44" />

                        {/* Santa Monica Blvd Street Label inside Road */}
                        <text x="250" y="186" fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="0.14em" textAnchor="middle">
                          SANTA MONICA BOULEVARD (CA-2)
                        </text>

                        {/* NORTH SIDE BUILDING: FLAME INTERNATIONAL (Taller, Split Address) */}
                        <g transform="translate(175, 60)">
                          <rect x="0" y="0" width="150" height="102" rx="8" fill="#3d0a1c" stroke="#d4a359" strokeWidth="2.5" />
                          <rect x="6" y="6" width="138" height="90" rx="6" fill="#5c1125" stroke="#a32b4b" strokeWidth="1.5" />
                          
                          <text x="75" y="30" fill="#ffffff" fontSize="13.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">FLAME</text>
                          <text x="75" y="47" fill="#ffffff" fontSize="12.5" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">INTERNATIONAL</text>
                          <text x="75" y="71" fill="#f3cf8a" fontSize="14" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">11330</text>
                          <text x="75" y="89" fill="#f3cf8a" fontSize="11" fontWeight="600" letterSpacing="0.06em" textAnchor="middle">SANTA MONICA BLVD</text>
                        </g>

                        {/* Route Line Overlay (Golden Yellow Glowing Route matching Reserve Table Button) */}
                        <g>
                          <path
                            d={getRoutePathForZoom(4, selectedOriginId)}
                            fill="none"
                            stroke="#b37a2b"
                            strokeWidth="15"
                            strokeLinecap="round"
                            strokeOpacity="0.4"
                          />
                          <path
                            d={getRoutePathForZoom(4, selectedOriginId)}
                            fill="none"
                            stroke="url(#mapGoldRouteGrad4)"
                            strokeWidth="9.5"
                            strokeLinecap="round"
                            strokeOpacity="0.95"
                            filter="url(#goldRouteGlow4)"
                          />
                          <path
                            d={getRoutePathForZoom(4, selectedOriginId)}
                            fill="none"
                            stroke="#fff9e6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeOpacity="0.9"
                          />
                        </g>
                      </svg>
                    )}

                    {/* ZOOM LEVEL 5: ULTRA CLOSE-UP STREET & BUILDING DETAIL */}
                    {zoomLevel === 5 && (
                      <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                        <defs>
                          <linearGradient id="mapGoldRouteGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#b37a2b" />
                            <stop offset="35%" stopColor="#f7d688" />
                            <stop offset="70%" stopColor="#d4a359" />
                            <stop offset="100%" stopColor="#f3cf8a" />
                          </linearGradient>
                          <filter id="goldRouteGlow5" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#d4a359" floodOpacity="0.9" />
                          </filter>
                        </defs>
                        <rect width="500" height="350" fill="#1b030b" />

                        {/* Left Street Boundary: Sawtelle Blvd */}
                        <path d="M 50 0 L 50 350" stroke="#7a1c35" strokeWidth="48" />
                        <path d="M 50 0 L 50 350" stroke="#22040d" strokeWidth="40" />
                        <text x="50" y="250" fill="#f3cf8a" fontSize="11.5" fontWeight="700" letterSpacing="0.12em" transform="rotate(-90 50 250)" textAnchor="middle">SAWTELLE BLVD (WEST)</text>

                        {/* Right Street Boundary: Corinth Ave */}
                        <path d="M 450 0 L 450 350" stroke="#7a1c35" strokeWidth="48" />
                        <path d="M 450 0 L 450 350" stroke="#22040d" strokeWidth="40" />
                        <text x="450" y="250" fill="#f3cf8a" fontSize="11.5" fontWeight="700" letterSpacing="0.12em" transform="rotate(90 450 250)" textAnchor="middle">CORINTH AVE (EAST)</text>

                        {/* Santa Monica Blvd Wide Roadway */}
                        <path d="M 0 190 L 500 190" stroke="#8b1c37" strokeWidth="60" />
                        <path d="M 0 190 L 500 190" stroke="#180208" strokeWidth="52" />

                        {/* Roadway Street Name Stamp inside Road */}
                        <text x="250" y="196" fill="#f3cf8a" fontSize="13.5" fontWeight="700" letterSpacing="0.14em" textAnchor="middle">
                          SANTA MONICA BOULEVARD (CA-2)
                        </text>

                        {/* Route Line Overlay (Golden Yellow Glowing Route matching Reserve Table Button) */}
                        <g>
                          <path
                            d={getRoutePathForZoom(5, selectedOriginId)}
                            fill="none"
                            stroke="#b37a2b"
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeOpacity="0.4"
                          />
                          <path
                            d={getRoutePathForZoom(5, selectedOriginId)}
                            fill="none"
                            stroke="url(#mapGoldRouteGrad5)"
                            strokeWidth="10.5"
                            strokeLinecap="round"
                            strokeOpacity="0.95"
                            filter="url(#goldRouteGlow5)"
                          />
                          <path
                            d={getRoutePathForZoom(5, selectedOriginId)}
                            fill="none"
                            stroke="#fff9e6"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeOpacity="0.9"
                          />
                        </g>

                        {/* 11330 FLAME INTERNATIONAL MAIN COMPLEX (Taller, Split Address) */}
                        <g transform="translate(155, 40)">
                          <rect x="0" y="0" width="190" height="125" rx="9" fill="#3d0a1c" stroke="#d4a359" strokeWidth="3" />
                          <rect x="7" y="7" width="176" height="111" rx="7" fill="#5c1125" stroke="#a32b4b" strokeWidth="1.5" />
                          
                          <text x="95" y="38" fill="#ffffff" fontSize="15" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">FLAME</text>
                          <text x="95" y="58" fill="#ffffff" fontSize="14" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">INTERNATIONAL</text>
                          <text x="95" y="88" fill="#f3cf8a" fontSize="16" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">11330</text>
                          <text x="95" y="108" fill="#f3cf8a" fontSize="12.5" fontWeight="600" letterSpacing="0.06em" textAnchor="middle">SANTA MONICA BLVD</text>
                        </g>
                      </svg>
                    )}

                    {/* ELEVATED FLOATING PIN MARKER */}
                    <div 
                      className={`absolute z-10 pointer-events-none transition-all duration-300 ${
                        zoomLevel === 1 ? 'top-[16%] left-[49%]' : 
                        zoomLevel === 2 ? 'top-[14%] left-[49%]' : 
                        zoomLevel === 3 ? 'top-[10%] left-[49%]' : 
                        zoomLevel === 4 ? 'top-[7%] left-[49%]' : 
                        'top-[4%] left-[49%]'
                      }`}
                    >
                      {/* Glowing Pulse Ring at ground contact */}
                      <div className="absolute top-[32px] left-[14px] transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 rounded-full bg-[#d4a359]/40 animate-ping" />
                        <div className="w-3 h-3 rounded-full bg-[#d4a359] absolute top-1.5 left-1.5 shadow-[0_0_12px_#d4a359]" />
                      </div>

                      {/* Elevated Floating Pin Head */}
                      <div className="relative -top-2 flex flex-col items-center animate-bounce">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#b8863b] to-[#f3cf8a] text-black font-medium flex items-center justify-center shadow-[0_4px_18px_rgba(212,163,89,0.9)] border-2 border-white">
                          <MapPin size={16} className="fill-black text-black" />
                        </div>
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-[#b8863b] -mt-[1px]" />
                      </div>
                    </div>

                  </div>

                </div>

                {/* Centralized Live Google Navigation Button */}
                <div className="pt-2 flex justify-center">
                  <a
                    href={
                      gpsData && gpsData.coords
                        ? `https://www.google.com/maps/dir/?api=1&destination=11330+Santa+Monica+Blvd,+Los+Angeles,+CA+90025&origin=${encodeURIComponent(gpsData.coords)}`
                        : customOrigin
                        ? `https://www.google.com/maps/dir/?api=1&destination=11330+Santa+Monica+Blvd,+Los+Angeles,+CA+90025&origin=${encodeURIComponent(customOrigin)}`
                        : `https://www.google.com/maps/dir/?api=1&destination=11330+Santa+Monica+Blvd,+Los+Angeles,+CA+90025&origin=${encodeURIComponent(activeOrigin.name)}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto py-3 px-8 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center text-center shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>OPEN LIVE GOOGLE NAVIGATION</span>
                  </a>
                </div>

              </div>

            </div>

            {/* ========================================================================= */}
            {/* 📍 RIGHT COLUMN (lg:col-span-5): HOURS & DIRECT CONTACT CONCIERGE */}
            {/* ========================================================================= */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 1. HOURS OF OPERATION CARD */}
              <div className="bg-[#1c030b]/90 border border-[#6b152d]/60 rounded-3xl p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4">
                <div className="flex items-center space-x-2 text-[#d4a359] border-b border-[#521324] pb-3">
                  <Clock size={20} />
                  <h4 className="text-sm sm:text-base uppercase tracking-[0.2em] font-['Raleway'] font-medium">Hours of Operation</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#280510]/90 border border-[#521324]">
                    <span className="text-white font-normal text-sm sm:text-base">Monday – Sunday:</span>
                    <span className="text-[#f5d79e] font-medium text-sm sm:text-base font-['Raleway']">11:30 AM – 11:00 PM</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#f5a7b8] leading-relaxed">
                    Open 7 days a week for Lunch, Dinner, Craft Cocktails, Persian Banquets, and Nightly Live Entertainment.
                  </p>
                </div>
              </div>

              {/* 2. DIRECT CONTACT & SOCIAL CONCIERGE CARD */}
              <div className="bg-[#1c030b]/90 border border-[#6b152d]/60 rounded-3xl p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4">
                <div className="flex items-center space-x-2 text-[#d4a359] border-b border-[#521324] pb-3">
                  <Phone size={20} />
                  <h4 className="text-sm sm:text-base uppercase tracking-[0.2em] font-['Raleway'] font-medium">Contact &amp; Social</h4>
                </div>

                {/* Direct Phone Bar */}
                <a
                  href="tel:+13104440045"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#280510] hover:bg-[#3d0818] border border-[#831f3b] transition-all group cursor-pointer"
                  title="Direct Phone Concierge: (310) 444-0045"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#521324] flex items-center justify-center text-[#d4a359] group-hover:scale-110 transition-transform">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#f5a7b8] uppercase font-normal tracking-wider block">Direct Concierge</span>
                      <span className="text-sm sm:text-base font-medium text-white group-hover:text-[#f3cf8a] transition-colors">(310) 444-0045</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#f5d79e] bg-[#521324] px-3.5 py-1.5 rounded-xl flex flex-col items-center justify-center text-center leading-tight">
                    <span>CALL</span>
                    <span>NOW</span>
                  </span>
                </a>

                {/* Unified Social & Communication Icon Row with Interactive Hover Tooltips */}
                <div className="pt-1">
                  <div className="grid grid-cols-6 gap-2">
                    {/* 1. Phone */}
                    <div className="relative group flex justify-center">
                      <a
                        href="tel:+13104440045"
                        className="w-full h-11 rounded-xl bg-[#280510] hover:bg-[#d4a359] text-[#f5d79e] hover:text-black border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Call: (310) 444-0045"
                      >
                        <Phone size={18} />
                      </a>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-[#d4a359]/60 text-[10px] text-[#f5d79e] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                        Call (310) 444-0045
                      </span>
                    </div>

                    {/* 2. WhatsApp */}
                    <div className="relative group flex justify-center">
                      <a
                        href="https://wa.me/13104440045"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full h-11 rounded-xl bg-[#280510] hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="WhatsApp Concierge"
                      >
                        <MessageCircle size={18} />
                      </a>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-green-500/60 text-[10px] text-green-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                        WhatsApp Chat
                      </span>
                    </div>

                    {/* 3. Email */}
                    <div className="relative group flex justify-center">
                      <a
                        href="mailto:contact@flameinternational.com"
                        className="w-full h-11 rounded-xl bg-[#280510] hover:bg-[#ea4335] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Email Concierge"
                      >
                        <Mail size={18} />
                      </a>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-red-500/60 text-[10px] text-red-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                        Email Concierge
                      </span>
                    </div>

                    {/* 4. Instagram */}
                    <div className="relative group flex justify-center">
                      <a
                        href="https://instagram.com/flameinternational"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full h-11 rounded-xl bg-[#280510] hover:bg-gradient-to-tr hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Instagram Profile"
                      >
                        <Instagram size={18} />
                      </a>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-pink-500/60 text-[10px] text-pink-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                        Instagram @flame
                      </span>
                    </div>

                    {/* 5. Facebook */}
                    <div className="relative group flex justify-center">
                      <a
                        href="https://facebook.com/flameinternational"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full h-11 rounded-xl bg-[#280510] hover:bg-[#1877F2] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Facebook Page"
                      >
                        <Facebook size={18} />
                      </a>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-blue-500/60 text-[10px] text-blue-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                        Facebook Page
                      </span>
                    </div>

                    {/* 6. LinkedIn */}
                    <div className="relative group flex justify-center">
                      <a
                        href="https://linkedin.com/company/flame-international"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full h-11 rounded-xl bg-[#280510] hover:bg-[#0A66C2] text-[#f5d79e] hover:text-white border border-[#831f3b]/70 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin size={18} />
                      </a>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-sky-500/60 text-[10px] text-sky-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-30 font-medium">
                        LinkedIn Profile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Actions */}
                <div className="pt-2 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={onOpenReserve}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md flex flex-col items-center justify-center text-center leading-tight"
                  >
                    <span>RESERVE</span>
                    <span>TABLE</span>
                  </button>
                  {onOpenMenu && (
                    <button
                      onClick={onOpenMenu}
                      className="w-full py-3 px-4 rounded-xl bg-[#280510] hover:bg-[#3d0818] text-[#f5d79e] border border-[#831f3b] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex flex-col items-center justify-center text-center leading-tight"
                    >
                      <span>EXPLORE</span>
                      <span>MENU</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </RevealOnScroll>

        {/* Bottom Credits - Reduced Text Size & Direct CMS Admin Link */}
        <div className="mt-10 text-center font-['Raleway'] space-y-1">
          <p className="font-normal text-[11px] sm:text-xs text-white/50 tracking-wider">
            © 2026 FLAME INTERNATIONAL. All rights reserved.
          </p>
          <p>
            <a
              href="#admin"
              className="text-[10px] text-white/20 hover:text-[#f3cf8a] transition-colors underline decoration-dotted"
              title="Direct CMS Login Link"
            >
              CMS Admin Login
            </a>
          </p>
        </div>

      </div>

    </footer>
  );
};
