import React from 'react';
import { ArrowRight, Sparkles, Users, Calendar, Phone, Wine, Music, Award } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface ReserveSpaceSectionProps {
  onReserveSpace: () => void;
  mode?: AppMode;
}

export const ReserveSpaceSection: React.FC<ReserveSpaceSectionProps> = ({
  onReserveSpace,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  const SPACES = [
    {
      id: 'grand-banquet-hall',
      title: 'Grand Ballroom & Concert Stage',
      capacity: 'Up to 250 Guests',
      description: 'Ideal for lavish Persian weddings, concert banquets, galas, and milestone anniversaries with full stage, concert lighting, and dance floor.',
      imageUrl: '/images/hero-reserve-space.png',
      badge: 'Main Hall & Stage',
      features: ['Full Stage & Sound System', 'Custom Buffet or Plated Menus', 'Private Bar Setup'],
    },
    {
      id: 'saffron-vip-dining',
      title: 'The Saffron VIP Dining Alcove',
      capacity: '12 – 35 Guests',
      description: 'An intimate, luxurious dining sanctuary for executive dinners, rehearsal celebrations, family reunions, and birthdays.',
      imageUrl: '/images/hero-dine-in.png',
      badge: 'Private Dining Room',
      features: ['Dedicated Service Team', 'Family-Style Saffron Platters', 'Private Audio Control'],
    },
    {
      id: 'cocktail-reception-lounge',
      title: 'Cocktail Lounge & Reception Mezzanine',
      capacity: '40 – 80 Guests',
      description: 'Vibrant ambient lounge setting for cocktail mixers, corporate happy hours, birthday bashes, and Persian hors d’oeuvres receptions.',
      imageUrl: '/images/poster_cabaret_gala.png',
      badge: 'Lounge & Bar',
      features: ['Craft Persian Mixology Bar', 'Mazzeh & Hors d’Oeuvres', 'Dedicated Bartender'],
    },
  ];

  return (
    <section 
      id="reserve-a-space-section" 
      className={`relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 transition-colors duration-700 font-['Raleway'] overflow-hidden ${
        isNight ? 'bg-[#180309] text-[#f7e8ea]' : 'bg-[#ffffff] text-[#1a1d22]'
      }`}
    >
      {/* Subtle Warm Amber & Crimson Radial Ambiance in Dark Mode */}
      {isNight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,89,0.1),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(158,28,56,0.12),transparent_60%)] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* Editorial Top Headline & Overview */}
        <RevealOnScroll direction="up" delay={0} duration={800} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-[#d4a359]/15 border border-[#d4a359]/40 text-[#d4a359] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold shadow-sm">
            <Sparkles size={13} className="text-[#d4a359]" />
            <span>Private Dining &amp; Special Events</span>
          </div>

          <div className="space-y-1">
            <h3 className={`font-script text-4xl sm:text-5xl md:text-6xl font-normal leading-tight ${
              isNight ? 'text-[#f3cf8a]' : 'text-[#c6924b]'
            }`}>
              Reserve
            </h3>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
              isNight ? 'text-white' : 'text-[#14171a]'
            }`}>
              A Space for Banquets &amp; Celebrations
            </h2>
          </div>

          <p className={`text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto ${
            isNight ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Celebrate your most memorable moments at Flame International. From grand banquet spreads and live musical galas to private family gatherings and corporate events on Santa Monica Boulevard.
          </p>
        </RevealOnScroll>

        {/* 3 Photos Grid of Event Spaces with Stock Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SPACES.map((space, idx) => (
            <RevealOnScroll 
              key={space.id} 
              direction="up" 
              delay={100 + idx * 150} 
              duration={800}
            >
              <div 
                className={`group rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-1.5 ${
                  isNight 
                    ? 'bg-[#15040a] border border-[#521324] shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:border-[#d4a359]/60 hover:shadow-[0_20px_50px_rgba(212,163,89,0.15)]' 
                    : 'bg-[#faf8f5] border border-[#e8dfd3] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-[#d4a359] hover:shadow-xl'
                }`}
              >
                {/* Photo with Overlay Badge & Capacity Pill */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#24060f]">
                  <img 
                    src={space.imageUrl} 
                    alt={space.title}
                    onError={(e) => { e.currentTarget.src = '/images/hero-reserve-space.png'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180309]/90 via-[#180309]/20 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-[#2d0713]/85 border border-[#d4a359]/60 text-[#f5d79e] text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md">
                      {space.badge}
                    </span>
                  </div>

                  {/* Bottom Capacity Pill */}
                  <div className="absolute bottom-3.5 left-3.5 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#3d0917]/90 border border-[#831f3b] text-white text-xs font-medium backdrop-blur-sm shadow-md">
                    <Users size={13} className="text-[#f3cf8a]" />
                    <span>{space.capacity}</span>
                  </div>
                </div>

                {/* Card Content & Features */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className={`font-serif text-xl sm:text-2xl font-medium tracking-tight ${
                      isNight ? 'text-white' : 'text-[#1a1d22]'
                    }`}>
                      {space.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isNight ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {space.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-[#d4a359]/20 text-xs">
                    {space.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359]" />
                        <span className={isNight ? 'text-[#f5d79e]' : 'text-[#6b5028]'}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={onReserveSpace}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f3cf8a] text-black font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md flex items-center justify-center space-x-2 mt-2"
                  >
                    <span>Reserve This Space</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Direct Inquiries & Concierge Banner */}
        <RevealOnScroll direction="up" delay={450} duration={800}>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1c030b] via-[#350615] to-[#1c030b] border border-[#6b152d] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#f5a7b8] font-semibold">
                Custom Menus • AV Presentations • Valet Parking
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                Planning a Large Banquet or Private Event?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                Our private dining coordinator will tailor every detail from custom saffron banquet menus to stage setup and floral decor.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+13104440045"
                className="px-5 py-3 rounded-2xl bg-[#2d0713]/85 hover:bg-[#430b1c] border border-[#831f3b]/70 hover:border-[#d4a359] text-white hover:text-[#f3cf8a] font-medium text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <Phone size={15} className="text-[#f3cf8a]" />
                <span>(310) 444-0045</span>
              </a>

              <button
                onClick={onReserveSpace}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d9381e] to-[#ea580c] hover:brightness-110 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer flex items-center space-x-2"
              >
                <Calendar size={15} />
                <span>Inquire Online</span>
              </button>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};
