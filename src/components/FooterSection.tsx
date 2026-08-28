import React, { useState } from 'react';
import { 
  MapPin, Clock, Phone, Mail, Instagram, Facebook, Navigation, ExternalLink, 
  Heart, Globe, Star, Plus, Minus, RotateCcw, Home, UtensilsCrossed, Sparkles, 
  CalendarCheck, Users, Info, Compass
} from 'lucide-react';
import { AppMode } from '../types';
import { FlameLogo } from './FlameLogo';

interface FooterSectionProps {
  onOpenReserve: () => void;
  onOpenFunctions: () => void;
  onScrollToTop?: () => void;
  onOpenMenu?: () => void;
  onOpenStories?: () => void;
  onOpenAbout?: () => void;
  mode?: AppMode;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenReserve,
  onOpenFunctions,
  onScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  onOpenMenu,
  onOpenStories,
  onOpenAbout,
  mode = 'lunch',
}) => {
  // Map zoom level: 1 = Regional (HWY 405), 2 = District (Sawtelle + West LA), 3 = Corridor (Corinth to Sawtelle), 4 = Ultra Close-Up (11330 Building & Patio)
  const [zoomLevel, setZoomLevel] = useState<number>(3);
  const isNight = mode === 'night';

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(3);
  };

  return (
    <footer id="find-us-footer" className="relative bg-[#180309] text-[#f7e8ea] pt-16 pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-[#4d0c1e]/60 font-['Raleway']">
      
      {/* Subtle Warm Amber Ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,163,89,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Prominent Official Flame International Color Logo Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-5 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <FlameLogo variant="color-full" size="xl" />
          </div>

          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-[#f5a7b8] uppercase font-['Raleway'] font-bold block mb-0.5">
            FIND US / VISIT US
          </span>
          <h2 className="font-['Raleway'] text-base sm:text-lg text-white/90 font-bold tracking-wider uppercase">
            ON <span className="text-[#f3cf8a] font-extrabold ml-1">SANTA MONICA BOULEVARD</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-[#f3cfd6]/80 mt-1 max-w-md mx-auto font-normal">
            11330 Santa Monica Blvd, West Los Angeles • Between Corinth Ave &amp; Sawtelle Blvd
          </p>
        </div>

        {/* Map & Location Card with Interactive Zoom Levels & Precise Geography */}
        <div className="w-full max-w-4xl bg-[#1c030b]/90 border border-[#6b152d]/60 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.6)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-['Raleway']">
          
          {/* Left: Interactive Santa Monica Blvd Map */}
          <div className="md:col-span-7 relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#24050f] border border-[#5c1125] p-2 select-none">
            
            {/* Floating Map Zoom Navigation Bar (+ / - / Reset) */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end space-y-1.5">
              <div className="bg-[#121619]/95 backdrop-blur-md border border-[#5c1125] rounded-xl p-1 shadow-lg flex flex-col space-y-1">
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel === 4}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    zoomLevel === 4 ? 'text-white/30 cursor-not-allowed' : 'text-[#f5d79e] hover:bg-[#3d0818] cursor-pointer'
                  }`}
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <Plus size={15} />
                </button>
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel === 1}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    zoomLevel === 1 ? 'text-white/30 cursor-not-allowed' : 'text-[#f5d79e] hover:bg-[#3d0818] cursor-pointer'
                  }`}
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <Minus size={15} />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#f5a7b8] hover:bg-[#3d0818] transition-all cursor-pointer"
                  title="Reset Map View"
                  aria-label="Reset Map"
                >
                  <RotateCcw size={12} />
                </button>
              </div>

              {/* Zoom Level Indicator Pill */}
              <div className="bg-[#121619]/90 backdrop-blur-md border border-[#5c1125] px-2.5 py-0.5 rounded-full text-[10px] font-['Raleway'] font-bold text-[#d4a359] tracking-widest uppercase">
                {zoomLevel === 1 && '📍 REGIONAL (I-405 FWY)'}
                {zoomLevel === 2 && '📍 WEST LA DISTRICT'}
                {zoomLevel === 3 && '📍 CORINTH & SAWTELLE'}
                {zoomLevel === 4 && '📍 11330 FLAME BUILDING'}
              </div>
            </div>

            {/* Map Vector Graphic Rendering with ALL CAPS SANS-SERIF Typography */}
            <div className="w-full h-full relative rounded-xl overflow-hidden bg-[#24050f]">
              
              {/* ZOOM LEVEL 1: REGIONAL FREEWAY OVERVIEW (I-405 & WEST LA) */}
              {zoomLevel === 1 && (
                <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                  <rect width="500" height="350" fill="#1b030b" />
                  
                  {/* Highway 405 (San Diego Freeway) */}
                  <path d="M 330 0 L 355 350" stroke="#7a1c35" strokeWidth="26" />
                  <path d="M 330 0 L 355 350" stroke="#330815" strokeWidth="20" />
                  <path d="M 330 0 L 355 350" stroke="#d4a359" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Interstate 405 Blue/Red Shield Badge */}
                  <g transform="translate(340, 45)">
                    <rect x="-16" y="-12" width="32" height="24" rx="4" fill="#003366" stroke="#ffffff" strokeWidth="1.5" />
                    <rect x="-16" y="-12" width="32" height="8" rx="2" fill="#cc0000" />
                    <text x="0" y="6" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">405</text>
                  </g>
                  <text x="365" y="100" fill="#f5a7b8" fontSize="9" fontWeight="800" letterSpacing="0.12em">SAN DIEGO FWY (I-405)</text>

                  {/* Major East-West Arteries */}
                  {/* Wilshire Blvd */}
                  <path d="M 0 70 L 500 50" stroke="#68152c" strokeWidth="10" />
                  <text x="25" y="62" fill="#f3cf8a" fontSize="9.5" fontWeight="800" letterSpacing="0.1em">WILSHIRE BLVD ➔</text>

                  {/* Santa Monica Blvd (CA-2) - Primary Corridor */}
                  <path d="M 0 170 L 500 150" stroke="#9e2343" strokeWidth="18" />
                  <path d="M 0 170 L 500 150" stroke="#24050f" strokeWidth="12" />
                  <text x="20" y="158" fill="#ffffff" fontSize="10.5" fontWeight="900" letterSpacing="0.12em">★ SANTA MONICA BLVD (ROUTE 66 / CA-2)</text>

                  {/* Olympic Blvd (South) */}
                  <path d="M 0 270 L 500 250" stroke="#68152c" strokeWidth="10" />
                  <text x="25" y="262" fill="#f3cf8a" fontSize="9.5" fontWeight="800" letterSpacing="0.1em">OLYMPIC BLVD ➔</text>

                  {/* North-South Major Roads */}
                  {/* Sepulveda Blvd */}
                  <path d="M 385 0 L 410 350" stroke="#521324" strokeWidth="8" />
                  <text x="395" y="325" fill="#f5d79e" fontSize="8.5" fontWeight="700" letterSpacing="0.1em">SEPULVEDA BLVD</text>

                  {/* Westwood / UCLA Direction */}
                  <text x="300" y="25" fill="#f3cf8a" fontSize="8.5" fontWeight="800" letterSpacing="0.1em">↑ TO UCLA &amp; WESTWOOD</text>

                  {/* Pacific Ocean / Santa Monica Pier Direction */}
                  <text x="15" y="25" fill="#f3cf8a" fontSize="8.5" fontWeight="800" letterSpacing="0.1em">← TO SANTA MONICA BEACH &amp; PIER</text>

                  {/* Destination Label Box */}
                  <g transform="translate(195, 110)">
                    <rect x="-10" y="-16" width="145" height="42" rx="6" fill="#121619" stroke="#d4a359" strokeWidth="1.5" />
                    <text x="62" y="2" fill="#ffffff" fontSize="10.5" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">FLAME INTERNATIONAL ★</text>
                    <text x="62" y="16" fill="#f3cf8a" fontSize="8.5" fontWeight="700" letterSpacing="0.06em" textAnchor="middle">11330 SANTA MONICA BLVD</text>
                  </g>
                </svg>
              )}

              {/* ZOOM LEVEL 2: DISTRICT LEVEL (SAWTELLE JAPANTOWN & WEST LA CIVIC) */}
              {zoomLevel === 2 && (
                <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                  <rect width="500" height="350" fill="#1b030b" />

                  {/* Sawtelle Corridor & Japantown District */}
                  <rect x="310" y="40" width="85" height="260" rx="4" fill="#300613" stroke="#68152c" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="352" y="65" fill="#f5a7b8" fontSize="9" fontWeight="900" letterSpacing="0.1em" textAnchor="middle">SAWTELLE</text>
                  <text x="352" y="78" fill="#f3cf8a" fontSize="8" fontWeight="700" letterSpacing="0.08em" textAnchor="middle">JAPANTOWN ARTS</text>

                  {/* West LA Civic Center Plaza */}
                  <rect x="130" y="195" width="125" height="85" rx="4" fill="#2d0612" stroke="#521324" strokeWidth="1.5" />
                  <text x="192" y="235" fill="#f5a7b8" fontSize="9" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">WEST LA CIVIC CENTER</text>
                  <text x="192" y="248" fill="#d1d5db" fontSize="7.5" fontWeight="700" letterSpacing="0.05em" textAnchor="middle">&amp; REGIONAL LIBRARY</text>

                  {/* Streets Grid */}
                  {/* Purdue Ave */}
                  <path d="M 90 0 L 90 350" stroke="#521324" strokeWidth="8" />
                  <text x="75" y="325" fill="#f5d79e" fontSize="8" fontWeight="800" letterSpacing="0.1em" transform="rotate(-90 75 325)">PURDUE AVENUE ➔</text>

                  {/* Corinth Ave (Direct West Boundary) */}
                  <path d="M 180 0 L 180 350" stroke="#7a1c35" strokeWidth="12" />
                  <path d="M 180 0 L 180 350" stroke="#24050f" strokeWidth="8" />
                  <text x="165" y="325" fill="#f3cf8a" fontSize="9" fontWeight="900" letterSpacing="0.1em" transform="rotate(-90 165 325)">← CORINTH AVE (WEST)</text>

                  {/* Sawtelle Blvd (Direct East Boundary) */}
                  <path d="M 330 0 L 330 350" stroke="#7a1c35" strokeWidth="12" />
                  <path d="M 330 0 L 330 350" stroke="#24050f" strokeWidth="8" />
                  <text x="345" y="325" fill="#f3cf8a" fontSize="9" fontWeight="900" letterSpacing="0.1em" transform="rotate(90 345 325)">SAWTELLE BLVD (EAST) →</text>

                  {/* Beloit Ave */}
                  <path d="M 425 0 L 425 350" stroke="#521324" strokeWidth="8" />
                  <text x="440" y="325" fill="#f5d79e" fontSize="8" fontWeight="800" letterSpacing="0.1em" transform="rotate(90 440 325)">BELOIT AVENUE</text>

                  {/* Santa Monica Blvd Wide Roadway */}
                  <path d="M 0 160 L 500 150" stroke="#9e2343" strokeWidth="22" />
                  <path d="M 0 160 L 500 150" stroke="#121619" strokeWidth="16" />
                  <path d="M 0 160 L 500 150" stroke="#d4a359" strokeWidth="1.5" strokeDasharray="8 8" />
                  <text x="15" y="152" fill="#ffffff" fontSize="9.5" fontWeight="900" letterSpacing="0.12em">SANTA MONICA BOULEVARD (CA-2)</text>

                  {/* 11330 Flame International Lot */}
                  <rect x="215" y="100" width="80" height="48" rx="4" fill="#4d0c1e" stroke="#d4a359" strokeWidth="2" />
                  <text x="255" y="120" fill="#ffffff" fontSize="9.5" fontWeight="900" letterSpacing="0.06em" textAnchor="middle">FLAME INT'L ★</text>
                  <text x="255" y="134" fill="#f3cf8a" fontSize="7.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">11330 SANTA MONICA</text>
                </svg>
              )}

              {/* ZOOM LEVEL 3: CORRIDOR FOCUS (CORINTH AVE TO SAWTELLE BLVD) */}
              {zoomLevel === 3 && (
                <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                  <rect width="500" height="350" fill="#1b030b" />

                  {/* Western Boundary: CORINTH AVE */}
                  <path d="M 100 0 L 100 350" stroke="#7a1c35" strokeWidth="20" />
                  <path d="M 100 0 L 100 350" stroke="#2a0612" strokeWidth="14" />
                  <text x="82" y="60" fill="#f3cf8a" fontSize="9.5" fontWeight="900" letterSpacing="0.12em" transform="rotate(-90 82 60)">
                    ← CORINTH AVE (WEST)
                  </text>

                  {/* Eastern Boundary: SAWTELLE BLVD */}
                  <path d="M 400 0 L 400 350" stroke="#7a1c35" strokeWidth="20" />
                  <path d="M 400 0 L 400 350" stroke="#2a0612" strokeWidth="14" />
                  <text x="420" y="60" fill="#f3cf8a" fontSize="9.5" fontWeight="900" letterSpacing="0.12em" transform="rotate(90 420 60)">
                    SAWTELLE BLVD (EAST) →
                  </text>

                  {/* Primary Street: SANTA MONICA BLVD (CA-2) */}
                  <path d="M 0 180 L 500 170" stroke="#8b1c37" strokeWidth="32" />
                  <path d="M 0 180 L 500 170" stroke="#20030a" strokeWidth="26" />
                  <path d="M 0 180 L 500 170" stroke="#d4a359" strokeWidth="2" strokeDasharray="8 8" />

                  {/* Santa Monica Blvd Street Label */}
                  <text x="125" y="176" fill="#ffffff" fontSize="10" fontWeight="900" letterSpacing="0.14em">
                    SANTA MONICA BOULEVARD (CA-2)
                  </text>

                  {/* NORTH SIDE BUILDINGS: FLAME INTERNATIONAL IN CENTER */}
                  {/* 11330 Flame International Lot */}
                  <g>
                    <rect x="180" y="65" width="150" height="98" rx="6" fill="#3d0a1c" stroke="#d4a359" strokeWidth="2" />
                    <rect x="190" y="74" width="130" height="66" rx="4" fill="#5c1125" stroke="#a32b4b" strokeWidth="1" />
                    
                    <text x="255" y="94" fill="#ffffff" fontSize="11" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">11330 SANTA MONICA BLVD</text>
                    <text x="255" y="110" fill="#f3cf8a" fontSize="10" fontWeight="800" letterSpacing="0.06em" textAnchor="middle">FLAME INTERNATIONAL ★</text>
                    <text x="255" y="124" fill="#f5a7b8" fontSize="7.5" fontWeight="700" letterSpacing="0.05em" textAnchor="middle">PERSIAN BANQUET, GRILL &amp; STAGE</text>
                    
                    {/* Patio Banner */}
                    <rect x="205" y="144" width="100" height="15" rx="3" fill="#d4a359" />
                    <text x="255" y="155" fill="#000000" fontSize="8" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">OUTDOOR SAFFRON PATIO</text>
                  </g>

                  {/* South-West Block: West LA Civic Center */}
                  <g>
                    <rect x="135" y="215" width="115" height="55" rx="4" fill="#20040c" stroke="#68152c" strokeWidth="1.5" />
                    <text x="192" y="238" fill="#f5a7b8" fontSize="8.5" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">WEST LA CIVIC CENTER</text>
                    <text x="192" y="252" fill="#d1d5db" fontSize="7.5" fontWeight="700" letterSpacing="0.05em" textAnchor="middle">&amp; PUBLIC LIBRARY</text>
                  </g>

                  {/* South-East Block: Nuart / Cultural Hub */}
                  <g>
                    <rect x="260" y="215" width="115" height="55" rx="4" fill="#20040c" stroke="#68152c" strokeWidth="1.5" />
                    <text x="317" y="238" fill="#f5a7b8" fontSize="8.5" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">NUART CINEMA &amp; SHOPS</text>
                    <text x="317" y="252" fill="#d1d5db" fontSize="7.5" fontWeight="700" letterSpacing="0.05em" textAnchor="middle">WEST LA HISTORIC DISTRICT</text>
                  </g>
                </svg>
              )}

              {/* ZOOM LEVEL 4: ULTRA CLOSE-UP STREET DETAIL (11330 SANTA MONICA BLVD) */}
              {zoomLevel === 4 && (
                <svg viewBox="0 0 500 350" className="w-full h-full font-['Raleway',sans-serif]">
                  <rect width="500" height="350" fill="#1b030b" />

                  {/* Left Street Boundary: Corinth Ave */}
                  <path d="M 60 0 L 60 350" stroke="#7a1c35" strokeWidth="28" />
                  <path d="M 60 0 L 60 350" stroke="#330815" strokeWidth="22" />
                  <text x="42" y="45" fill="#f3cf8a" fontSize="9.5" fontWeight="900" letterSpacing="0.12em" transform="rotate(-90 42 45)">← CORINTH AVE (WEST)</text>

                  {/* Right Street Boundary: Sawtelle Blvd */}
                  <path d="M 440 0 L 440 350" stroke="#7a1c35" strokeWidth="28" />
                  <path d="M 440 0 L 440 350" stroke="#330815" strokeWidth="22" />
                  <text x="460" y="45" fill="#f3cf8a" fontSize="9.5" fontWeight="900" letterSpacing="0.12em" transform="rotate(90 460 45)">SAWTELLE BLVD (EAST) →</text>

                  {/* Santa Monica Blvd Wide Roadway */}
                  <path d="M 0 190 L 500 170" stroke="#8b1c37" strokeWidth="44" />
                  <path d="M 0 190 L 500 170" stroke="#2a0612" strokeWidth="38" />
                  <path d="M 0 190 L 500 170" stroke="#d4a359" strokeWidth="2" strokeDasharray="10 10" />

                  {/* Roadway Street Name Stamp */}
                  <text x="135" y="160" fill="#f3cf8a" fontSize="10.5" fontWeight="900" letterSpacing="0.14em">
                    SANTA MONICA BOULEVARD (CA-2)
                  </text>

                  {/* 11330 FLAME INTERNATIONAL MAIN COMPLEX */}
                  <g>
                    {/* Property Boundary */}
                    <rect x="105" y="35" width="290" height="110" rx="6" fill="#3d0a1c" stroke="#d4a359" strokeWidth="2.5" />
                    
                    {/* Main Dining Room & Cabaret Stage */}
                    <rect x="115" y="44" width="180" height="92" rx="4" fill="#5c1125" stroke="#a32b4b" strokeWidth="1" />
                    <text x="205" y="68" fill="#ffffff" fontSize="12" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">FLAME INTERNATIONAL ★</text>
                    <text x="205" y="84" fill="#f3cf8a" fontSize="9" fontWeight="800" letterSpacing="0.06em" textAnchor="middle">11330 SANTA MONICA BLVD</text>
                    <text x="205" y="100" fill="#f5a7b8" fontSize="7.5" fontWeight="700" letterSpacing="0.05em" textAnchor="middle">FLAME CHARCOAL GRILL • LIVE PERSIAN STAGE</text>
                    <text x="205" y="118" fill="#4ade80" fontSize="8" fontWeight="800" letterSpacing="0.06em" textAnchor="middle">OPEN DAILY: 11:30 AM – 11:00 PM</text>

                    {/* Saffron Garden Patio */}
                    <rect x="305" y="44" width="80" height="92" rx="4" fill="#400b1a" stroke="#d4a359" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="345" y="74" fill="#f3cf8a" fontSize="9.5" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">SAFFRON</text>
                    <text x="345" y="88" fill="#f3cf8a" fontSize="9.5" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">PATIO</text>
                    <text x="345" y="106" fill="#f5a7b8" fontSize="7.5" fontWeight="700" letterSpacing="0.05em" textAnchor="middle">OUTDOOR DINING</text>

                    {/* Valet & Main Entrance */}
                    <rect x="175" y="138" width="80" height="15" rx="3" fill="#d4a359" />
                    <text x="215" y="149" fill="#000000" fontSize="7.5" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">VALET &amp; ENTRANCE</text>
                  </g>

                  {/* South Side of Santa Monica Blvd: West LA Municipal Plaza */}
                  <rect x="105" y="235" width="290" height="78" rx="6" fill="#24050f" stroke="#5c1125" strokeWidth="1.5" />
                  <text x="250" y="265" fill="#f5a7b8" fontSize="9.5" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">WEST LA CIVIC PLAZA &amp; REGIONAL LIBRARY</text>
                  <text x="250" y="282" fill="#d1d5db" fontSize="8" fontWeight="700" letterSpacing="0.06em" textAnchor="middle">1645 CORINTH AVE • DIRECTLY ACROSS FROM FLAME</text>
                </svg>
              )}

              {/* ELEVATED PIN MARKER */}
              <div 
                className={`absolute z-10 pointer-events-none transition-all duration-300 ${
                  zoomLevel === 1 ? 'top-[34%] left-[45%]' : 
                  zoomLevel === 2 ? 'top-[38%] left-[50%]' : 
                  zoomLevel === 3 ? 'top-[20%] left-[47%]' : 
                  'top-[10%] left-[46%]'
                }`}
              >
                {/* Glowing Pulse Ring at ground contact */}
                <div className="absolute top-[32px] left-[14px] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-[#d4a359]/40 animate-ping" />
                  <div className="w-3 h-3 rounded-full bg-[#d4a359] absolute top-1.5 left-1.5 shadow-[0_0_12px_#d4a359]" />
                </div>

                {/* Elevated Floating Pin Head */}
                <div className="relative -top-2 flex flex-col items-center animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#b8863b] to-[#f3cf8a] text-black font-bold flex items-center justify-center shadow-[0_4px_18px_rgba(212,163,89,0.9)] border-2 border-white">
                    <MapPin size={16} className="fill-black text-black" />
                  </div>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-[#b8863b] -mt-[1px]" />
                </div>
              </div>

            </div>

            {/* Bottom Google Maps Link & Coordinates Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
              <a
                href="https://maps.google.com/?q=11330+Santa+Monica+Blvd,+Los+Angeles,+CA+90025"
                target="_blank"
                rel="noreferrer"
                className="bg-[#121619]/95 hover:bg-[#202730] px-3 py-1.5 rounded-xl border border-[#d4a359]/60 text-[11px] text-white flex items-center space-x-2 transition-all shadow-xl group cursor-pointer"
              >
                <Navigation size={13} className="text-[#d4a359] group-hover:scale-110 transition-transform" />
                <span className="font-semibold font-['Raleway']">11330 Santa Monica Blvd, LA</span>
                <ExternalLink size={11} className="text-[#d4a359]/70" />
              </a>

              <div className="hidden sm:flex items-center space-x-1.5 bg-[#121619]/90 px-2.5 py-1 rounded-xl border border-[#5c1125] text-[9px] font-['Raleway'] text-[#f5a7b8]">
                <Compass size={11} className="text-[#d4a359]" />
                <span>Between Corinth &amp; Sawtelle</span>
              </div>
            </div>

          </div>

          {/* Right: Opening Hours & Contact Information Panel */}
          <div className="md:col-span-5 space-y-5 text-left font-['Raleway']">
            <div>
              <div className="flex items-center space-x-2 text-[#d4a359] mb-2.5">
                <Clock size={16} />
                <h4 className="text-xs uppercase tracking-[0.25em] font-['Raleway'] font-bold">Hours of Operation</h4>
              </div>
              
              <ul className="space-y-2 text-sm text-[#f7e0e5] font-normal">
                <li className="flex items-center justify-between border-b border-[#521324] pb-1.5">
                  <span className="text-white font-semibold text-xs sm:text-sm">Monday – Sunday:</span>
                  <span className="text-[#f5d79e] font-bold text-xs sm:text-sm font-['Raleway']">11:30 AM – 11:00 PM</span>
                </li>
                <li className="flex items-center justify-between text-xs text-[#f3cfd6] pt-0.5 font-medium">
                  <span>Seven Days a Week</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#d4a359]/20 text-[#f5d79e] text-[10px] font-bold">
                    Open Daily
                  </span>
                </li>
              </ul>
            </div>

            {/* Address & Contact Details */}
            <div className="space-y-2.5 text-xs text-[#f3cfd6] font-medium">
              <a
                href="https://maps.google.com/?q=11330+Santa+Monica+Blvd,+Los+Angeles,+CA+90025"
                target="_blank"
                rel="noreferrer"
                className="flex items-start space-x-2 hover:text-[#f3cf8a] transition-colors group"
              >
                <MapPin size={15} className="text-[#d4a359] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed font-semibold">11330 Santa Monica Blvd, Los Angeles, CA 90025</span>
              </a>
              <div className="flex items-center space-x-2">
                <Phone size={15} className="text-[#d4a359] shrink-0" />
                <a href="tel:+13104440045" className="hover:text-[#f3cf8a] transition-colors font-bold tracking-wide">
                  (310) 444-0045
                </a>
              </div>
            </div>

            {/* Social Media Connect Links */}
            <div className="pt-3 border-t border-[#521324]/80">
              <span className="text-[10px] uppercase font-['Raleway'] font-bold tracking-widest text-[#f5a7b8] block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center space-x-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110 cursor-pointer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram size={15} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110 cursor-pointer"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook size={15} />
                </a>

                <a
                  href="https://yelp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110 cursor-pointer"
                  aria-label="Yelp"
                  title="Yelp Reviews"
                >
                  <Star size={15} />
                </a>

                <a
                  href="https://maps.google.com/?q=11330+Santa+Monica+Blvd,+Los+Angeles,+CA+90025"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110 cursor-pointer"
                  aria-label="Google Maps"
                  title="Google Maps"
                >
                  <Globe size={15} />
                </a>

                <a
                  href="mailto:contact@flameinternational.com"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all shadow-sm hover:scale-110 cursor-pointer"
                  aria-label="Email"
                  title="Email Us"
                >
                  <Mail size={15} />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-12 text-center text-xs text-[#f5a7b8]/70 space-y-1.5 font-['Raleway']">
          <p className="font-semibold">© 2026 Flame International. All rights reserved.</p>
          <p className="flex items-center justify-center space-x-1 text-[11px] font-medium">
            <span>Crafted with</span>
            <Heart size={10} className="text-red-400 fill-red-400 mx-0.5" />
            <span>in Los Angeles, California</span>
          </p>
        </div>

      </div>

    </footer>
  );
};
