import React from 'react';
import { ArrowRight, Sparkles, Users, Building2, Home } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface CulinarySectionProps {
  onMakeReservation: () => void;
  onOpenDish: (dishId: string) => void;
  mode?: AppMode;
}

const CATERING_CARDS = [
  {
    id: 'corporate',
    icon: Building2,
    badge: 'Corporate Catering',
    title: 'Office & Corporate Events',
    description: 'Impress your team and clients with lavish Persian kabab spreads, saffron rice, and mazzeh platters delivered fresh to your boardroom or event hall.',
    cta: 'Plan Corporate Catering',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Large corporate office group lunch with Persian food spread',
    overlayLabel: 'Corporate Lunch Packages',
  },
  {
    id: 'wedding',
    icon: Sparkles,
    badge: 'Wedding Catering',
    title: 'Weddings & Celebrations',
    description: 'Make your wedding unforgettable with a grand Persian feast — royal Soltani platters, fesenjan, jewelled rice and a full dessert station with bastani and baklava.',
    cta: 'Get Wedding Quote',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Wedding reception banquet with Persian food on elegantly set tables',
    overlayLabel: 'Wedding Banquet Packages',
  },
  {
    id: 'private',
    icon: Home,
    badge: 'Private Party',
    title: 'Home & Private Gatherings',
    description: 'From intimate family dinners to backyard parties, our catering team brings Flame\'s legendary charcoal kababs and aromatic stews straight to your home.',
    cta: 'Request Private Party Menu',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Private home party gathering with Persian food spread on dining table',
    overlayLabel: 'Private Party Packages',
  },
];

export const CulinarySection: React.FC<CulinarySectionProps> = ({
  onMakeReservation,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  return (
    <section
      id="culinary-delightful-section"
      className={`py-20 lg:py-28 px-4 sm:px-6 lg:px-12 transition-colors duration-700 ${
        isNight
          ? 'bg-[#0d0205] text-[#f5f1ea] border-t border-[#1f0a10]/80'
          : 'bg-[#faf8f5] text-[#1c1f24] border-t border-[#f0ece5]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0} duration={800}>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <span className="w-10 h-[1px] bg-[#c6924b]/50" />
              <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isNight ? 'text-[#d4a359]' : 'text-[#9e6d2b]'}`}>
                ✦ Catering Services ✦
              </span>
              <span className="w-10 h-[1px] bg-[#c6924b]/50" />
            </div>

            <div className="space-y-1">
              <h3 className={`font-script text-4xl sm:text-5xl md:text-6xl font-normal leading-tight ${
                isNight ? 'text-[#f3cf8a]' : 'text-[#c6924b]'
              }`}>
                Catering
              </h3>
              <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
                isNight ? 'text-white' : 'text-[#1a1c20]'
              }`}>
                Persian Feasts, Any Occasion
              </h2>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed font-light ${
              isNight ? 'text-[#d1d5db]' : 'text-[#555e6b]'
            }`}>
              From intimate private gatherings to grand weddings and corporate lunches — <strong className={isNight ? 'text-white' : 'text-[#1a1c20]'}>Flame International</strong> brings the full grandeur of authentic Persian cuisine to your event.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center justify-center">
              <button
                onClick={onMakeReservation}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#9e1c38] to-[#d4a359] hover:from-[#c22345] hover:to-[#f3cf8a] text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center space-x-2"
              >
                <Sparkles size={14} className="text-[#fbe8a6]" />
                <span>Request Catering Quote</span>
              </button>
              <a
                href="tel:3104440045"
                className={`group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-semibold border-b pb-1 transition-all duration-300 cursor-pointer ${
                  isNight
                    ? 'text-[#f3cf8a] hover:text-white border-[#f3cf8a]/70'
                    : 'text-[#8c6227] hover:text-[#212429] border-[#c6924b]'
                }`}
              >
                <span>Call 310-444-0045</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Catering Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CATERING_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <RevealOnScroll key={card.id} direction="up" delay={idx * 150} duration={850}>
                <div
                  onClick={onMakeReservation}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl border ${
                    isNight
                      ? 'bg-[#110308] border-[#2d0715] hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(212,163,89,0.2)]'
                      : 'bg-white border-stone-200 hover:border-[#d4a359]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  {/* Photo */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Badge pill */}
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#180309]/85 border border-[#d4a359]/70 backdrop-blur-sm">
                      <Icon size={11} className="text-[#d4a359]" />
                      <span className="text-[#f3cf8a] text-[10px] font-bold uppercase tracking-widest">{card.badge}</span>
                    </div>

                    {/* Bottom image label */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#f3cf8a]">{card.overlayLabel}</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                      isNight ? 'text-white' : 'text-[#1a1c20]'
                    }`}>
                      {card.title}
                    </h3>

                    <p className={`text-sm leading-relaxed font-light ${
                      isNight ? 'text-gray-300' : 'text-stone-600'
                    }`}>
                      {card.description}
                    </p>

                    <div className={`inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest pt-1 transition-colors group-hover:translate-x-1 ${
                      isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'
                    }`}>
                      <span>{card.cta}</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom highlights strip */}
        <RevealOnScroll direction="up" delay={400} duration={700}>
          <div className={`rounded-2xl border p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center ${
            isNight
              ? 'bg-[#110308] border-[#2d0715]'
              : 'bg-white border-stone-200'
          }`}>
            {[
              { stat: '50+', label: 'Events Per Month' },
              { stat: '500+', label: 'Guests Served Daily' },
              { stat: '100%', label: 'Halal & Fresh' },
              { stat: '24h', label: 'Quote Turnaround' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className={`font-serif text-2xl sm:text-3xl font-black ${isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'}`}>
                  {item.stat}
                </div>
                <div className={`text-xs uppercase tracking-wider font-semibold ${isNight ? 'text-gray-400' : 'text-stone-500'}`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};
