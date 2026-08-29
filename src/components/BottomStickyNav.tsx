import React from 'react';
import { Home, Sparkles, ShoppingBag, Sun, Moon } from 'lucide-react';
import { AppMode } from '../types';

export type BottomNavAction = 'home' | 'live-events' | 'order-online' | 'lunch' | 'dinner';

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
      label: 'HOME',
      icon: Home,
      badge: null,
      ariaLabel: 'Navigate to Home',
    },
    {
      id: 'live-events' as BottomNavAction,
      label: 'LIVE EVENTS',
      icon: Sparkles,
      badge: 'LIVE',
      ariaLabel: 'View Live Events & Concerts',
    },
    {
      id: 'order-online' as BottomNavAction,
      label: 'ORDER ONLINE',
      icon: ShoppingBag,
      badge: null,
      ariaLabel: 'Order Food Online',
    },
    {
      id: 'lunch' as BottomNavAction,
      label: 'LUNCH',
      icon: Sun,
      badge: null,
      ariaLabel: 'View Lunch Specials & Menu',
    },
    {
      id: 'dinner' as BottomNavAction,
      label: 'DINNER',
      icon: Moon,
      badge: null,
      ariaLabel: 'View Dinner Entrees & Kababs',
    },
  ];

  return (
    <aside
      id="bottom-sticky-navigation"
      aria-label="Bottom Navigation Bar"
      className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-500 shadow-[0_-8px_32px_rgba(0,0,0,0.7)] font-['Raleway'] ${
        isNight
          ? 'bg-[#000000]/95 border-t border-[#2a2a2a]'
          : 'bg-[#18030b]/95 border-t border-[#4f1022]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-1.5 sm:px-4 pt-1.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:py-2">
        <nav className="grid grid-cols-5 gap-1 sm:gap-2 items-stretch">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAction === item.id;

            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                aria-label={item.ariaLabel}
                className={`relative flex flex-col items-center justify-center min-h-[54px] sm:min-h-[58px] py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl transition-all duration-200 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#d4a359]/50 overflow-hidden touch-manipulation select-none active:scale-95 ${
                  isActive
                    ? isNight
                      ? 'text-[#f3cf8a] bg-white/15 shadow-inner ring-1 ring-[#f3cf8a]/30'
                      : 'text-[#f5d79e] bg-white/15 shadow-inner ring-1 ring-[#f5d79e]/30'
                    : 'text-[#e2e8f0] hover:text-white hover:bg-white/10 active:bg-white/20'
                }`}
              >
                {/* Live Badge for Live Events */}
                {item.badge && (
                  <span className="absolute top-0.5 right-1 px-1.5 py-0.2 bg-[#e53935] text-white text-[7.5px] sm:text-[8.5px] font-['Raleway'] font-semibold rounded-full uppercase tracking-wider shadow-md animate-pulse">
                    {item.badge}
                  </span>
                )}

                {/* Prominent Icon container */}
                <div className="flex items-center justify-center mb-0.5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 stroke-[2] ${
                      isActive ? 'text-[#f3cf8a]' : 'text-[#f5d79e]'
                    }`}
                  />
                </div>

                {/* Label: ALL CAPS, Raleway font, clean font-medium */}
                <span
                  className={`text-[9.5px] sm:text-[11px] md:text-xs font-medium tracking-[0.04em] sm:tracking-[0.08em] uppercase truncate max-w-full text-center whitespace-nowrap leading-tight transition-all font-['Raleway'] ${
                    isActive
                      ? 'text-[#f3cf8a] font-semibold'
                      : 'text-[#f1f5f9] group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>

                {/* Bottom Active Glow Accent Bar */}
                {isActive && (
                  <span className="absolute bottom-0 w-8 sm:w-12 h-0.5 rounded-full bg-[#f3cf8a] shadow-[0_0_8px_rgba(243,207,138,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

