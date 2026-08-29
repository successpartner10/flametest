import React from 'react';
import { ArrowUpRight, Utensils, Moon, ShoppingBag, ChefHat, Sparkles } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface MenuMatrixSectionProps {
  onOpenLunch: () => void;
  onOpenDinner: () => void;
  onOpenOrderOnline: () => void;
  onOpenCatering: () => void;
  mode?: AppMode;
}

export const MenuMatrixSection: React.FC<MenuMatrixSectionProps> = ({
  onOpenLunch,
  onOpenDinner,
  onOpenOrderOnline,
  onOpenCatering,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  const matrixItems = [
    {
      id: 'lunch',
      title: 'Lunch',
      subtitle: 'Express Platters & Midday Saffron Specials',
      tag: '11:30 AM – 3:30 PM',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      action: onOpenLunch,
      buttonText: 'View Lunch Menu',
      accentColor: 'from-[#d4a359] to-[#b3833b]',
    },
    {
      id: 'dinner',
      title: 'Dinner',
      subtitle: 'Royal Soltani, Open Flames & Evening Entrees',
      tag: '5:00 PM – Late',
      icon: Moon,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      action: onOpenDinner,
      buttonText: 'View Dinner Menu',
      accentColor: 'from-[#9e1c38] to-[#d4a359]',
    },
    {
      id: 'online-order',
      title: 'Online Order',
      subtitle: 'Fast Takeaway, Express Pickup & Direct Delivery',
      tag: 'Order in Seconds',
      icon: ShoppingBag,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      action: onOpenOrderOnline,
      buttonText: 'Order Online Now',
      accentColor: 'from-[#d9381e] to-[#ea580c]',
    },
    {
      id: 'catering',
      title: 'Catering',
      subtitle: 'Corporate Lunches, Weddings & Private Banquets',
      tag: '15 – 500+ Guests',
      icon: ChefHat,
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
      action: onOpenCatering,
      buttonText: 'Explore Catering',
      accentColor: 'from-[#d4a359] to-[#c29845]',
    },
  ];

  return (
    <section 
      id="menu-matrix-section" 
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-12 transition-colors duration-700 font-['Raleway'] ${
        isNight ? 'bg-[#050103] text-[#f5f1ea]' : 'bg-[#fcfaf7] text-[#1a1d22]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0} duration={750} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#d4a359]/15 border border-[#d4a359]/40 text-[#d4a359] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <Sparkles size={12} />
            <span>Persian Culinary Services</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
            isNight ? 'text-white' : 'text-[#14171a]'
          }`}>
            Four Ways to Experience Flame
          </h2>
          <p className={`text-sm sm:text-base mt-3 max-w-xl mx-auto font-light leading-relaxed ${
            isNight ? 'text-gray-300' : 'text-gray-600'
          }`}>
            From quick saffron midday lunches to romantic candlelight dinners, doorstep ordering, and grand celebrations.
          </p>
        </RevealOnScroll>

        {/* 4 Images Matrix Grid (2x2 on tablet/desktop, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {matrixItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.id} direction="up" delay={idx * 100} duration={800}>
                <div
                  id={`matrix-card-${item.id}`}
                  onClick={item.action}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer h-[380px] sm:h-[420px] flex flex-col justify-between p-6 transition-all duration-500 hover:-translate-y-2 border ${
                    isNight
                      ? 'bg-[#0f0408] border-[#38081a] hover:border-[#d4a359] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(212,163,89,0.25)]'
                      : 'bg-white border-stone-200 hover:border-[#d4a359] shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(212,163,89,0.2)]'
                  }`}
                >
                  {/* Background Image with Zoom & Dark Gradient */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.75] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 group-hover:via-black/35 transition-colors" />
                  </div>

                  {/* Top Card Badge & Action Arrow */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#f5d79e] text-[10px] uppercase font-bold tracking-widest">
                      {item.tag}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-[#d4a359] group-hover:text-black group-hover:border-[#d4a359] transition-all duration-300 flex items-center justify-center shadow-lg group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Bottom Content & Direct Action Link */}
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center space-x-2 text-[#d4a359]">
                      <Icon size={18} />
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gray-300">
                        Flame Cuisine
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide group-hover:text-[#f3cf8a] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-200 font-light leading-snug line-clamp-2">
                      {item.subtitle}
                    </p>

                    {/* Prominent Action Button */}
                    <div className="pt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action();
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r ${item.accentColor} text-white font-bold text-xs uppercase tracking-widest shadow-md group-hover:brightness-110 group-hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer font-['Raleway']`}
                      >
                        <span>{item.buttonText}</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
};
