import React, { useState } from 'react';
import { AppMode } from '../types';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Sparkles, Ticket } from 'lucide-react';
import { FlameLogo } from './FlameLogo';

interface HeaderProps {
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  onOpenMenu: () => void;
  onOpenReserve: () => void;
  onOpenLiveEntertainment: () => void;
  onOpenOnlineOrders: () => void;
  onOpenContact: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onToggleMode,
  onOpenMenu,
  onOpenReserve,
  onOpenLiveEntertainment,
  onOpenOnlineOrders,
  onOpenContact,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 45-Degree Diagonal Ticket Ribbon across Top Right Corner */}
      <div className="fixed top-0 right-0 z-50 pointer-events-none w-32 h-32 sm:w-40 sm:h-40 overflow-hidden select-none">
        <button
          id="diagonal-ticket-ribbon-btn"
          onClick={onOpenReserve}
          className="absolute top-5 -right-11 sm:top-7 sm:-right-12 w-40 sm:w-48 py-1 sm:py-1.5 bg-gradient-to-r from-[#b37a2b] via-[#f7d688] to-[#b37a2b] text-[#121619] font-black font-['Raleway'] tracking-[0.18em] text-[9px] sm:text-[11px] uppercase text-center shadow-[0_4px_20px_rgba(0,0,0,0.8)] rotate-45 pointer-events-auto cursor-pointer hover:brightness-110 active:scale-95 transition-all border-y border-[#fff3cf]/60 flex items-center justify-center space-x-1 group"
          title="Buy Concert & Live Show Tickets"
        >
          <span className="text-[11px] sm:text-xs">🎟️</span>
          <span className="font-extrabold group-hover:tracking-[0.22em] transition-all">TICKETS</span>
        </button>
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#0d1013]/95 via-[#121619]/90 to-transparent backdrop-blur-md transition-all duration-300 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo / Title Lockup */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3.5 cursor-pointer select-none py-1 group"
            onClick={scrollToHome}
          >
            <div className="group-hover:scale-105 transition-transform duration-300">
              <FlameLogo variant="color-emblem" size="sm" />
            </div>
            <div className="text-left">
              <div className="font-['Raleway'] text-lg sm:text-2xl tracking-wider text-[#f5f1ea] font-extrabold flex items-center space-x-1">
                <span>FLAME</span>
                <span className="font-script text-[#d4a359] text-2xl sm:text-3xl font-normal lowercase">international</span>
              </div>
              <p className="text-[8px] uppercase tracking-[0.25em] text-[#d4a359]/75 hidden sm:block">West Los Angeles • Persian Cuisine</p>
            </div>
          </div>

          {/* Desktop Navigation Links (Exact User Request: Home, Live Entertainment, Dine in, Online Orders, Reserve a space, Contact) */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-xs font-['Raleway'] tracking-[0.14em] text-[#f5f1ea]/90 font-bold uppercase">
            <button
              id="nav-link-home"
              onClick={scrollToHome}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359]"
            >
              Home
            </button>
            <button
              id="nav-link-live-entertainment"
              onClick={onOpenLiveEntertainment}
              className="hover:text-[#d4a359] text-[#f5d79e] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359] flex items-center space-x-1"
            >
              <span>Live Entertainment</span>
            </button>
            <button
              id="nav-link-dine-in"
              onClick={onOpenMenu}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359]"
            >
              Dine in
            </button>
            <button
              id="nav-link-online-orders"
              onClick={onOpenOnlineOrders}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359] flex items-center space-x-1"
            >
              <span>Online Orders</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 bg-[#c84033] text-white text-[9px] font-bold rounded-full inline-flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              id="nav-link-reserve"
              onClick={onOpenReserve}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359]"
            >
              Reserve a space
            </button>
            <button
              id="nav-link-contact"
              onClick={onOpenContact}
              className="hover:text-[#d4a359] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#d4a359]"
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Lunch / Cabaret Switch + Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3 mr-10 sm:mr-14 lg:mr-0">
            
            {/* Day / Night Mode Switch */}
            <div 
              id="mode-pill-toggle"
              className="flex items-center bg-[#1c2228]/90 p-0.5 sm:p-1 rounded-full border border-[#3b434e]/50 shadow-inner backdrop-blur-sm"
            >
              <button
                id="mode-lunch-btn"
                onClick={() => onToggleMode('lunch')}
                className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 ${
                  mode === 'lunch'
                    ? 'bg-gradient-to-r from-[#d4731f] to-[#e49525] text-white shadow-md'
                    : 'text-[#d8d2c4]/70 hover:text-white'
                }`}
                title="Lunch Experience"
              >
                <span>☀️</span>
                <span className="tracking-wide hidden sm:inline">Lunch</span>
              </button>
              <button
                id="mode-night-btn"
                onClick={() => onToggleMode('night')}
                className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 ${
                  mode === 'night'
                    ? 'bg-gradient-to-r from-[#3b1220] via-[#5c1328] to-[#731c34] text-[#fbebeb] border border-[#a23b56]/40 shadow-md'
                    : 'text-[#d8d2c4]/70 hover:text-white'
                }`}
                title="Cabaret & Night Experience"
              >
                <span>🌙</span>
                <span className="tracking-wide hidden sm:inline">Night</span>
              </button>
            </div>

            {/* Online Order Bag Button */}
            <button
              id="header-bag-btn"
              onClick={onOpenOnlineOrders}
              className="relative p-2 sm:p-2.5 rounded-full bg-[#1e2329] border border-[#303842] text-[#f5f1ea] hover:border-[#d4a359] hover:text-[#d4a359] transition-colors cursor-pointer"
              title="View Online Order Bag"
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c84033] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#121619] animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#f5f1ea] hover:text-[#d4a359] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation (Home, Live Entertainment, Dine in, Online Orders, Reserve a space, Contact) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121619] border-b border-[#2a313a] px-6 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => { scrollToHome(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#21262d]"
            >
              Home
            </button>
            <button
              onClick={() => { onOpenLiveEntertainment(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase text-[#f5d79e] hover:text-white border-b border-[#21262d] flex items-center justify-between"
            >
              <span>Live Entertainment</span>
              <span className="text-[10px] bg-[#5c1125] text-[#f5a7b8] px-2 py-0.5 rounded font-['Raleway']">Concerts</span>
            </button>
            <button
              onClick={() => { onOpenMenu(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#21262d]"
            >
              Dine in
            </button>
            <button
              onClick={() => { onOpenOnlineOrders(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#21262d] flex items-center justify-between"
            >
              <span>Online Orders</span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 bg-[#c84033] text-white text-[10px] rounded-full">
                  {cartCount} items
                </span>
              )}
            </button>
            <button
              onClick={() => { onOpenReserve(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359] border-b border-[#21262d]"
            >
              Reserve a space
            </button>
            <button
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase text-[#f5f1ea] hover:text-[#d4a359]"
            >
              Contact
            </button>

            <div className="pt-2 flex items-center space-x-2">
              <button
                onClick={() => { onOpenReserve(); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-extrabold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center space-x-1.5 shadow-md"
              >
                <span>🎟️</span>
                <span>Buy Tickets / Book</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

