import React, { useState, useEffect } from 'react';
import { AppMode } from '../types';
import { Menu as MenuIcon, X, ChevronRight } from 'lucide-react';
import { FlameLogo } from './FlameLogo';
import { getRotatingHeroMessages, getDayTimeContext } from '../data/greetingsData';

interface HeaderProps {
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  onOpenMenu: () => void;
  onOpenReserve: () => void;
  onOpenLiveEntertainment: () => void;
  onOpenOnlineOrders: () => void;
  onOpenContact: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onToggleMode,
  onOpenMenu,
  onOpenReserve,
  onOpenLiveEntertainment,
  onOpenOnlineOrders,
  onOpenContact,
  cartCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState<number>(0);
  const [dayTimeContext] = useState(() => getDayTimeContext());
  const [rotatingMessages, setRotatingMessages] = useState<string[]>(() => getRotatingHeroMessages());

  useEffect(() => {
    const msgs = getRotatingHeroMessages();
    setRotatingMessages(msgs);

    // Subtle automatic rotation among contextual greetings every 11 seconds
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % msgs.length);
    }, 11000);

    return () => clearInterval(interval);
  }, []);

  const handleNextGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGreetingIndex((prev) => (prev + 1) % rotatingMessages.length);
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 45-Degree Diagonal Ticket Ribbon across Top Right Corner */}
      <div className="fixed top-0 right-0 z-50 pointer-events-none w-28 h-28 sm:w-36 sm:h-36 overflow-hidden select-none">
        <button
          id="diagonal-ticket-ribbon-btn"
          onClick={onOpenReserve}
          className="absolute top-4 -right-10 sm:top-6 sm:-right-10 w-36 sm:w-44 py-1 sm:py-1.5 bg-gradient-to-r from-[#b37a2b] via-[#f7d688] to-[#b37a2b] text-[#121619] font-medium font-['Raleway'] tracking-[0.18em] text-[9px] sm:text-[11px] uppercase text-center shadow-[0_4px_20px_rgba(0,0,0,0.8)] rotate-45 pointer-events-auto cursor-pointer hover:brightness-110 active:scale-95 transition-all border-y border-[#fff3cf]/60 flex items-center justify-center space-x-1 group"
          title="Buy Concert & Live Show Tickets"
        >
          <span className="text-xs sm:text-sm">🎟️</span>
          <span className="font-semibold group-hover:tracking-[0.22em] transition-all">TICKETS</span>
        </button>
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#0d1013]/95 via-[#121619]/90 to-transparent backdrop-blur-md transition-all duration-300">
        {/* Dynamic Context-Aware Header AI Welcome Bar */}
        <div 
          onClick={handleNextGreeting}
          title="Click to cycle smart greeting messages"
          className="bg-gradient-to-r from-[#1c040d] via-[#38081a] to-[#1c040d] border-b border-[#6b152d]/60 px-3 sm:px-6 py-1.5 text-center flex items-center justify-center space-x-2 text-[11px] sm:text-xs font-['Raleway'] text-[#f5d79e] cursor-pointer hover:bg-[#4a0a22] transition-colors select-none group"
        >
          <span className="px-2 py-0.5 rounded-full bg-[#5c1125] text-[#f7d688] font-medium text-[9px] sm:text-[10px] tracking-wider uppercase border border-[#a32b4b]/50 shrink-0">
            {dayTimeContext.dayName.toUpperCase()} • {dayTimeContext.timePeriod.toUpperCase()}
          </span>
          <span className="text-white/95 font-normal tracking-wide truncate max-w-[280px] sm:max-w-xl md:max-w-2xl">
            {rotatingMessages[greetingIndex]}
          </span>
          <span className="text-[#d4a359] group-hover:translate-x-0.5 transition-transform shrink-0 hidden sm:inline-flex items-center text-[10px]">
            <ChevronRight size={12} />
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Mobile Hamburger on the LEFT so it is never obstructed by the top-right tickets ribbon */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f5f1ea] hover:text-[#d4a359] focus:outline-none cursor-pointer rounded-lg bg-black/40 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>

          {/* Brand Logo / Title Lockup */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3.5 cursor-pointer select-none py-1 group"
            onClick={scrollToHome}
          >
            <div className="group-hover:scale-105 transition-transform duration-300">
              <FlameLogo variant="color-emblem" size="sm" />
            </div>
            <div className="text-left">
              <div className="font-['Raleway'] text-lg sm:text-2xl tracking-wider text-[#f5f1ea] font-medium flex items-center space-x-1">
                <span>FLAME</span>
                <span className="font-script text-[#d4a359] text-2xl sm:text-3xl font-normal lowercase">international</span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#d4a359]/75 hidden sm:block font-['Raleway'] font-medium">West Los Angeles • Persian Cuisine</p>
            </div>
          </div>

          {/* Desktop Navigation Links (All Caps, Raleway Font, Clean Font Weight, Larger Size) */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-sm font-['Raleway'] tracking-[0.14em] text-[#f5f1ea]/90 font-medium uppercase">
            <button
              id="nav-link-home"
              onClick={scrollToHome}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359]"
            >
              HOME
            </button>
            <button
              id="nav-link-live-entertainment"
              onClick={onOpenLiveEntertainment}
              className="hover:text-[#d4a359] text-[#f5d79e] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359] flex items-center space-x-1"
            >
              <span>LIVE ENTERTAINMENT</span>
            </button>
            <button
              id="nav-link-dine-in"
              onClick={onOpenMenu}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359]"
            >
              DINE IN
            </button>
            <button
              id="nav-link-online-orders"
              onClick={onOpenOnlineOrders}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359] flex items-center space-x-1"
            >
              <span>ONLINE ORDERS</span>
            </button>
            <button
              id="nav-link-reserve"
              onClick={onOpenReserve}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359]"
            >
              RESERVE A SPACE
            </button>
          </nav>

          {/* Right Action: Single Light / Dark Mode Button - Smaller & Sleek */}
          <div className="flex items-center space-x-2 mr-8 sm:mr-12 lg:mr-0">
            <button
              id="single-mode-toggle-btn"
              onClick={() => onToggleMode(mode === 'lunch' ? 'night' : 'lunch')}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#15191d]/90 border border-[#3b434e]/50 text-[#f5d79e] hover:text-white hover:border-[#d4a359] text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer active:scale-95"
              title={mode === 'lunch' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {mode === 'lunch' ? (
                <>
                  <span className="text-xs sm:text-sm leading-none">🌙</span>
                  <span className="text-[10.5px] sm:text-xs font-medium font-['Raleway']">DARK</span>
                </>
              ) : (
                <>
                  <span className="text-xs sm:text-sm leading-none">☀️</span>
                  <span className="text-[10.5px] sm:text-xs font-medium font-['Raleway']">LIGHT</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation (All Caps, Raleway Font) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121619] border-b border-[#2a313a] px-6 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200 font-['Raleway']">
            <button
              onClick={() => { scrollToHome(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#21262d]"
            >
              HOME
            </button>
            <button
              onClick={() => { onOpenLiveEntertainment(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5d79e] hover:text-white border-b border-[#21262d] flex items-center justify-between"
            >
              <span>LIVE ENTERTAINMENT</span>
              <span className="text-xs bg-[#5c1125] text-[#f5a7b8] px-2 py-0.5 rounded font-['Raleway'] font-medium">CONCERTS</span>
            </button>
            <button
              onClick={() => { onOpenMenu(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#21262d]"
            >
              DINE IN
            </button>
            <button
              onClick={() => { onOpenOnlineOrders(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#21262d]"
            >
              ONLINE ORDERS
            </button>
            <button
              onClick={() => { onOpenReserve(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359]"
            >
              RESERVE A SPACE
            </button>

            <div className="pt-2 flex items-center space-x-2">
              <button
                onClick={() => { onOpenReserve(); setMobileMenuOpen(false); }}
                className="flex-1 py-3 bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-semibold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                <span>🎟️</span>
                <span>BUY TICKETS / RESERVE</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};


