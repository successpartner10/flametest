import React from 'react';
import { ArrowRight, Sparkles, Users, Calendar, Phone, Wine, Music, Award, CheckCircle2, ShieldCheck, Clock, MapPin, Presentation, Heart, Cake } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface ReserveSpaceSectionProps {
  onReserveSpace: (spaceName?: string) => void;
  mode?: AppMode;
}

export const ReserveSpaceSection: React.FC<ReserveSpaceSectionProps> = ({
  onReserveSpace,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  const SPACES = [
    {
      id: 'flame-patio',
      title: 'Flame Patio',
      capacity: '20 – 80 Guests',
      tagline: 'Sunlit & Starry Covered Alfresco Oasis',
      description: 'An enchanting covered outdoor oasis adorned with red carpets, hanging Moroccan lanterns, sun shade sails, and lush greenery. Perfect for sunlit afternoon baby showers, cocktail mixers, bridal luncheons, and alfresco dining celebrations on Santa Monica Boulevard.',
      imageUrl: '/images/patioday.jpg',
      features: ['Covered Shade Canopy & Heating', 'Hanging Moroccan Lantern Glow', 'Cocktail & Hookah Lounge', 'Sunlit Daylight & Starry Nights'],
      perfectFor: 'Baby Showers, Bridal Luncheons, Receptions & Social Mixers',
    },
    {
      id: 'flame-restaurant',
      title: 'Flame Restaurant',
      capacity: '40 – 120 Guests',
      tagline: 'Warm, Saffron-Aromatic Main Dining Hall',
      description: 'Our warm, stylish main dining hall featuring high ceilings, ambient glow, and crisp linen-wrapped tables. Enjoy full-service Persian saffron kababs, signature hot appetizers, and spacious seating arrangements in a sophisticated setting.',
      imageUrl: '/images/restwide.jpg',
      features: ['Linen Banquet Tables & Booths', 'Full Persian Saffron Menu', 'Dedicated Table Concierge', 'Central Bar Access'],
      perfectFor: 'Corporate Dinners, Rehearsal Dinners & Family Anniversaries',
    },
    {
      id: 'flame-events-lounge',
      title: 'Flame Events Lounge',
      capacity: '50 – 170+ Guests (Buyout to 250)',
      tagline: 'Royal Ballroom, Concert Stage & Dance Floor',
      description: 'An opulent, royal banquet hall with dramatic candlelit chandelier lighting, lavish velvet seating, a raised performance concert stage, and a private dance floor. Designed for grand celebrations, weddings, bar/bat mitzvahs, and large-scale corporate conferences.',
      imageUrl: '/images/flame-events-lounge.jpg',
      features: ['Concert AV & Wireless Microphones', 'Digital Projector & Screens', 'Private Bar & Raised Stage', 'Spacious Dance Floor'],
      perfectFor: 'Conferences, Weddings, Bar/Bat Mitzvahs & Birthday Galas',
    },
  ];

  const EVENT_TYPES = [
    { name: 'Conferences & Seminars', desc: 'Presentations, sound system & luncheons' },
    { name: 'Weddings & Receptions', desc: 'Romantic ceremonies & royal saffron feasts' },
    { name: 'Baby & Bridal Showers', desc: 'Sunlit patio setups & dessert stations' },
    { name: 'Birthday Galas', desc: 'Milestone celebrations with live music & DJ' },
    { name: 'Bar & Bat Mitzvahs', desc: 'Kosher-style Persian banquets & staging' },
    { name: 'Rehearsal Dinners', desc: 'Intimate pre-wedding gatherings with family' },
    { name: 'Anniversary Dinners', desc: 'Silver, golden & milestone celebrations' },
    { name: 'Holiday & Corporate Parties', desc: 'End-of-year company banquets & toasts' },
    { name: 'Celebrations of Life', desc: 'Comforting hospitality & private spaces' },
  ];

  const WHY_FLAME = [
    {
      icon: Award,
      title: 'Saffron Persian Catering',
      desc: 'Master charcoal grillers prepare melt-in-your-mouth Koobideh, Barg, Joojeh, fragrant saffron basmati rice, and hot appetizers.',
    },
    {
      icon: Music,
      title: 'Concert-Grade Sound & Stage',
      desc: 'Professional sound system, wireless microphones, customizable stage lighting, and digital screens for seamless presentations.',
    },
    {
      icon: Wine,
      title: 'Full Bar & Custom Mixology',
      desc: 'Handcrafted signature cocktails, premium wines, Persian tea samovars, and celebratory champagne toasts for every occasion.',
    },
    {
      icon: Users,
      title: 'Dedicated Event Coordinator',
      desc: 'Turnkey assistance with custom table layouts, timeline management, vendor coordination, and specialized floral decor.',
    },
  ];

  return (
    <section 
      id="reserve-a-space-section" 
      className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 transition-colors duration-700 font-['Raleway'] overflow-hidden ${
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
        <RevealOnScroll direction="up" delay={0} duration={800} className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/60 text-[#d4a359] text-xs uppercase tracking-[0.25em] font-bold shadow-sm">
            <Sparkles size={14} className="text-[#d4a359]" />
            <span>Private Event Spaces • 20 to 170+ Guests</span>
          </div>

          <div className="space-y-1">
            <h3 className={`font-serif text-2xl sm:text-3xl font-medium uppercase tracking-[0.2em] ${
              isNight ? 'text-[#f3cf8a]' : 'text-[#b37a2b]'
            }`}>
              Reserve a Space
            </h3>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isNight ? 'text-white' : 'text-[#14171a]'
            }`}>
              Conferences, Weddings &amp; Private Celebrations
            </h2>
          </div>

          <p className={`text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto ${
            isNight ? 'text-gray-100' : 'text-stone-900'
          }`}>
            Host your next banquet at Flame International. Choose between the outdoor <strong>Flame Patio</strong>, the main <strong>Flame Restaurant</strong>, or the opulent <strong>Flame Events Lounge</strong> on Santa Monica Boulevard.
          </p>
        </RevealOnScroll>

        {/* 3 Photos Grid of Event Spaces (Using .jpg images) */}
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
                    ? 'bg-[#1b030b] border border-[#6b152d] shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:border-[#d4a359] hover:shadow-[0_20px_50px_rgba(212,163,89,0.2)]' 
                    : 'bg-[#faf8f5] border border-stone-300 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#d4a359] hover:shadow-2xl'
                }`}
              >
                {/* Clean Photo Container WITHOUT overlays */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#24060f]">
                  <img 
                    src={space.imageUrl} 
                    alt={space.title}
                    onError={(e) => { e.currentTarget.src = '/images/restwide.jpg'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#d4a359] text-[#f3cf8a] text-xs font-extrabold uppercase tracking-wider shadow-lg">
                    {space.capacity}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                      isNight ? 'text-white' : 'text-stone-950'
                    }`}>
                      {space.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4a359]">
                      {space.tagline}
                    </p>
                    <p className={`text-sm sm:text-base leading-relaxed font-normal ${
                      isNight ? 'text-gray-200' : 'text-stone-900'
                    }`}>
                      {space.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-3 border-t border-[#d4a359]/30 text-xs sm:text-sm">
                    {space.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2">
                        <CheckCircle2 size={15} className="text-[#d4a359] shrink-0" />
                        <span className={`font-semibold ${isNight ? 'text-[#f5d79e]' : 'text-stone-900'}`}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Perfect for Tag */}
                  <div className="pt-2 text-xs sm:text-sm text-stone-700 dark:text-gray-300">
                    <span className="font-bold text-[#d4a359]">Ideal for: </span>
                    <span className="font-medium">{space.perfectFor}</span>
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onReserveSpace(space.title)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f3cf8a] text-black font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md flex items-center justify-center space-x-2 mt-2"
                  >
                    <span>Inquire About This Space</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Celebrations & Occasions Showcase Matrix */}
        <RevealOnScroll direction="up" delay={200} duration={800}>
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isNight ? 'bg-[#1f040d] border-[#521324]' : 'bg-[#f7f3eb] border-[#ded3c1]'
          }`}>
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-extrabold text-[#d4a359]">Tailored For Every Milestone</span>
              <h3 className={`font-serif text-2xl sm:text-3xl font-bold mt-1 ${
                isNight ? 'text-white' : 'text-stone-950'
              }`}>
                Events &amp; Banquets We Host
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {EVENT_TYPES.map((ev, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border transition-all ${
                    isNight 
                      ? 'bg-[#150309] border-[#68152c]/60 hover:border-[#d4a359]' 
                      : 'bg-white border-stone-200 hover:border-[#d4a359] shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d4a359]" />
                    <h4 className={`text-sm sm:text-base font-bold ${isNight ? 'text-white' : 'text-stone-950'}`}>{ev.name}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-gray-300 pl-4 font-normal">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Why Flame is the Perfect Place */}
        <RevealOnScroll direction="up" delay={300} duration={800}>
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-extrabold text-[#d4a359]">The Flame Experience</span>
              <h3 className={`font-serif text-2xl sm:text-3xl font-bold mt-1 ${
                isNight ? 'text-white' : 'text-stone-950'
              }`}>
                Why Flame is the Perfect Event Venue
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY_FLAME.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={i} 
                    className={`p-5 rounded-2xl border flex flex-col space-y-2.5 ${
                      isNight ? 'bg-[#1b030b] border-[#521324]' : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#d4a359]/20 border border-[#d4a359]/50 flex items-center justify-center text-[#d4a359]">
                      <Icon size={20} />
                    </div>
                    <h4 className={`text-sm sm:text-base font-bold ${isNight ? 'text-white' : 'text-stone-950'}`}>{item.title}</h4>
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isNight ? 'text-gray-200' : 'text-stone-800'}`}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        {/* Direct Inquiries & Concierge Banner */}
        <RevealOnScroll direction="up" delay={400} duration={800}>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1c030b] via-[#350615] to-[#1c030b] border border-[#6b152d] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#f5a7b8] font-bold">
                Custom Menus • Full Bar • AV Presentations • Complimentary Valet
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                Planning a Banquet or Special Event?
              </h3>
              <p className="text-sm sm:text-base text-gray-200 max-w-xl font-normal leading-relaxed">
                Our private dining coordinator will tailor every detail from custom saffron menus to stage setup, microphones, and floral arrangements for parties of 20 to 170+ guests.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="tel:+13104440045"
                className="px-6 py-3.5 rounded-2xl bg-[#2d0713]/85 hover:bg-[#430b1c] border border-[#831f3b]/70 hover:border-[#d4a359] text-white hover:text-[#f3cf8a] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <Phone size={16} className="text-[#f3cf8a]" />
                <span>(310) 444-0045</span>
              </a>

              <button
                onClick={() => onReserveSpace('Special Event Banquet')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#d9381e] to-[#ea580c] hover:brightness-110 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer flex items-center space-x-2"
              >
                <Calendar size={18} />
                <span>Inquire About Spaces</span>
              </button>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};
