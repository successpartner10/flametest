import React from 'react';
import { Home, Sparkles, UtensilsCrossed, Sun, Moon, PhoneCall } from 'lucide-react';
import { AppMode } from '../types';

export type BottomNavAction = 'home' | 'entertainment' | 'dine-in' | 'lunch' | 'dinner' | 'contact';

interface BottomStickyNavProps {
  mode: AppMode;
  activeAction?: BottomNavAction;
  onNavigate: (action: BottomNavAction) => void;
}

export const BottomStickyNav: React.FC<BottomStickyNavProps> = ({
  mode,
  activeAction = 'home',
  onNavigate,
}) => {
  const isNight = mode === 'night';

  const navItems = [
    {
      id: 'home' as BottomNavAction,
      label: 'Home',
      icon: Home,
      badge: null,
      ariaLabel: 'Navigate to Home',
    },
    {
      id: 'entertainment' as BottomNavAction,
      label: 'Live Entertainment',
      icon: Sparkles,
      badge: 'LIVE',
      ariaLabel: 'View Live Entertainment & Stories',
    },
    {
      id: 'dine-in' as BottomNavAction,
      label: 'Dine-In',
      icon: UtensilsCrossed,
      badge: null,
      ariaLabel: 'Reserve Table for Dine-In',
    },
    {
      id: 'lunch' as BottomNavAction,
      label: 'Lunch',
      icon: Sun,
      badge: null,
      ariaLabel: 'Explore Lunch Menu',
    },
    {
      id: 'dinner' as BottomNavAction,
      label: 'Dinner',
      icon: Moon,
      badge: null,
      ariaLabel: 'Explore Dinner & Cabaret Menu',
    },
    {
      id: 'contact' as BottomNavAction,
      label: 'Contact Us',
      icon: PhoneCall,
      badge: null,
      ariaLabel: 'Contact Us and Location',
    },
  ];

  return (
    <aside
      id="bottom-sticky-navigation"
      aria-label="Bottom Navigation Bar"
      className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-500 shadow-[0_-8px_32px_rgba(0,0,0,0.6)] ${
        isNight
          ? 'bg-[#000000]/95 border-t border-[#2a2a2a]'
          : 'bg-[#18030b]/95 border-t border-[#4f1022]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
        <nav className="grid grid-cols-6 gap-1 sm:gap-2 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAction === item.id;

            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                aria-label={item.ariaLabel}
                className={`relative flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#d4a359]/50 ${
                  isActive
                    ? isNight
                      ? 'text-[#f3cf8a] bg-white/10 shadow-inner'
                      : 'text-[#f5d79e] bg-white/10 shadow-inner'
                    : 'text-[#d1d5db] hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Live Badge for Entertainment */}
                {item.badge && (
                  <span className="absolute -top-1 sm:-top-1.5 px-1.5 py-0.2 bg-[#e53935] text-white text-[7px] sm:text-[8px] font-mono font-bold rounded-full uppercase tracking-wider shadow-md animate-pulse">
                    {item.badge}
                  </span>
                )}

                {/* Icon */}
                <div className="relative flex items-center justify-center mb-0.5 sm:mb-1">
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive
                        ? 'stroke-[2.2] text-[#f3cf8a]'
                        : 'stroke-[1.7] group-hover:text-[#f3cf8a]'
                    }`}
                  />
                </div>

                {/* Single-line Label (responsive size, no wrapping) */}
                <span
                  className={`text-[9px] sm:text-[11px] md:text-xs font-medium tracking-tight truncate max-w-full text-center whitespace-nowrap leading-tight transition-colors ${
                    isActive
                      ? 'font-bold text-[#f3cf8a]'
                      : 'text-[#d1d5db] group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>

                {/* Bottom Active Glow Accent Bar */}
                {isActive && (
                  <span className="absolute bottom-0 w-6 sm:w-10 h-0.5 rounded-full bg-[#f3cf8a] shadow-[0_0_8px_rgba(243,207,138,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
