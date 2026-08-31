import React, { useState, useEffect } from 'react';
import { AppMode } from '../types';
import { Lock, ShieldCheck, Phone, Calendar, Sparkles } from 'lucide-react';
import { FlameLogo } from './FlameLogo';
import { CMSPage, AdminUser } from '../types/cms';

interface HeaderProps {
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  onOpenMenu: () => void;
  onOpenReserve: () => void;
  onOpenLiveEntertainment: () => void;
  onOpenOnlineOrders: () => void;
  onOpenCatering?: () => void;
  onOpenContact: () => void;
  cartCount?: number;
  // CMS Dynamic navigation props
  pages?: CMSPage[];
  activePageSlug?: string;
  onSelectPage?: (slug: string) => void;
  adminUser?: AdminUser | null;
  onOpenAdmin?: () => void;
  onOpenAuth?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onToggleMode,
  onOpenMenu,
  onOpenReserve,
  onOpenLiveEntertainment,
  onOpenOnlineOrders,
  onOpenCatering,
  onOpenContact,
  cartCount = 0,
  pages = [],
  activePageSlug = 'home',
  onSelectPage,
  adminUser = null,
  onOpenAdmin,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (slug: string) => {
    if (onSelectPage) {
      onSelectPage(slug);
    }
    setMobileMenuOpen(false);
    if (slug === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

      {/* Header Container: sheer gradient at top, solid dark burgundy-charcoal backdrop when scrolled */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#180309]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.9)] border-b border-[#521324]/60'
            : 'bg-gradient-to-b from-[#180309]/80 via-[#180309]/50 to-transparent backdrop-blur-[3px]'
        }`}
      >
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger on TOP-LEFT with stunning custom 3-line morphing animation */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center rounded-xl bg-[#2d0713]/80 hover:bg-[#430b1c] border border-[#831f3b]/70 hover:border-[#d4a359] text-[#f5d79e] focus:outline-none cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {/* Top Bar */}
              <span
                className={`w-5 h-0.5 bg-[#f3cf8a] rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? 'rotate-45 translate-y-2 bg-[#f7d688] shadow-[0_0_8px_#d4a359]'
                    : '-translate-y-1 group-hover:w-5.5'
                }`}
              />
              {/* Middle Bar */}
              <span
                className={`w-5 h-0.5 bg-[#f3cf8a] rounded-full transition-all duration-200 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 my-0.5 group-hover:w-4'
                }`}
              />
              {/* Bottom Bar */}
              <span
                className={`w-5 h-0.5 bg-[#f3cf8a] rounded-full transition-all duration-300 ease-in-out ${
                  mobileMenuOpen
                    ? '-rotate-45 -translate-y-1 bg-[#f7d688] shadow-[0_0_8px_#d4a359]'
                    : 'translate-y-1 group-hover:w-5.5'
                }`}
              />
            </button>
          </div>

          {/* Brand Logo / Title Lockup - Matches official white bold lockup */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3.5 cursor-pointer select-none py-1 group"
            onClick={() => handleNavClick('home')}
          >
            <div className="group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <FlameLogo variant="color-emblem" size="sm" />
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="font-['Raleway'] text-lg sm:text-2xl font-black font-[900] tracking-wider text-white leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                FLAME
              </span>
              <span className="font-['Raleway'] text-[9px] sm:text-[11px] font-black font-[900] tracking-[0.32em] text-white uppercase leading-none mt-1 sm:mt-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                INTERNATIONAL
              </span>
            </div>
          </div>

          {/* Top Navigation Links - All Caps */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7 text-xs xl:text-sm font-['Raleway'] tracking-[0.14em] text-[#ffffff] font-medium uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`transition-all cursor-pointer py-1 font-medium ${
                activePageSlug === 'home'
                  ? 'text-[#f3cf8a] font-bold drop-shadow-[0_0_8px_rgba(212,163,89,0.5)]'
                  : 'text-white/90 hover:text-[#d4a359]'
              }`}
            >
              HOME
            </button>
            <button
              id="nav-link-live-events"
              onClick={onOpenLiveEntertainment}
              className="hover:text-[#d4a359] text-white/90 transition-colors cursor-pointer py-1 font-medium"
            >
              LIVE EVENTS
            </button>
            <button
              id="nav-link-dine-in"
              onClick={onOpenMenu}
              className="hover:text-[#d4a359] text-white/90 transition-colors cursor-pointer py-1 font-medium"
            >
              DINE IN
            </button>
            <button
              id="nav-link-online-order"
              onClick={onOpenOnlineOrders}
              className="hover:text-[#d4a359] text-white/90 transition-colors cursor-pointer py-1 font-medium"
            >
              ONLINE ORDER
            </button>
            <button
              id="nav-link-catering"
              onClick={onOpenCatering}
              className="hover:text-[#d4a359] text-white/90 transition-colors cursor-pointer py-1 font-medium"
            >
              CATERING
            </button>
            <button
              id="nav-link-reserve-space"
              onClick={onOpenReserve}
              className="hover:text-[#d4a359] text-white/90 transition-colors cursor-pointer py-1 font-medium"
            >
              RESERVE SPACE
            </button>
          </nav>

          {/* Right Action: Single Light / Dark Mode Button */}
          <div className="flex items-center space-x-2 mr-8 sm:mr-12 lg:mr-0">
            {/* Light / Dark Mode Toggle */}
            <button
              id="single-mode-toggle-btn"
              onClick={() => onToggleMode(mode === 'lunch' ? 'night' : 'lunch')}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#2d0713]/80 border border-[#831f3b]/70 text-[#f5d79e] hover:text-white hover:border-[#d4a359] text-[10.5px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer active:scale-95 backdrop-blur-md"
              title={mode === 'lunch' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {mode === 'lunch' ? (
                <>
                  <span className="text-xs sm:text-sm leading-none">🌙</span>
                  <span className="text-[10px] sm:text-xs font-medium font-['Raleway']">DARK</span>
                </>
              ) : (
                <>
                  <span className="text-xs sm:text-sm leading-none">☀️</span>
                  <span className="text-[10px] sm:text-xs font-medium font-['Raleway']">LIGHT</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#180309]/95 backdrop-blur-xl border-b border-[#6b152d]/80 px-6 py-6 space-y-3 animate-in slide-in-from-top-3 duration-300 font-['Raleway'] max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#3d0917]"
            >
              HOME
            </button>
            <button
              onClick={() => { onOpenLiveEntertainment(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#3d0917]"
            >
              LIVE EVENTS
            </button>
            <button
              onClick={() => { onOpenMenu(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#3d0917]"
            >
              DINE IN
            </button>
            <button
              onClick={() => { onOpenOnlineOrders(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#3d0917]"
            >
              ONLINE ORDER
            </button>
            <button
              onClick={() => { onOpenCatering?.(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#3d0917]"
            >
              CATERING
            </button>
            <button
              onClick={() => { onOpenReserve(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2.5 text-base font-medium tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359]"
            >
              RESERVE SPACE
            </button>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => { onOpenReserve(); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-gradient-to-r from-[#b37a2b] via-[#f7d688] to-[#d4a359] text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center space-x-1.5 shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                <span>🎟️</span>
                <span>BUY TICKETS / RESERVE</span>
              </button>
              
              <a
                href="tel:+13104440045"
                className="w-full py-2.5 bg-[#280510] hover:bg-[#3d0818] border border-[#831f3b] text-[#f5d79e] font-medium text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2"
              >
                <Phone size={14} />
                <span>Call (310) 444-0045</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

