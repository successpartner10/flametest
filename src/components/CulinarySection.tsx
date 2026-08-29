import React from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { AppMode } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface CulinarySectionProps {
  onMakeReservation: () => void;
  onOpenDish: (dishId: string) => void;
  mode?: AppMode;
}

export const CulinarySection: React.FC<CulinarySectionProps> = ({
  onMakeReservation,
  onOpenDish,
  mode = 'lunch',
}) => {
  const isNight = mode === 'night';

  return (
    <section 
      id="culinary-delightful-section" 
      className={`py-20 lg:py-28 px-4 sm:px-6 lg:px-12 transition-colors duration-700 ${
        isNight 
          ? 'bg-[#000000] text-[#f5f1ea] border-t border-[#1f2937]/50' 
          : 'bg-[#ffffff] text-[#1c1f24] border-t border-[#f0ece5]'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Narrative Column */}
        <RevealOnScroll 
          direction="up" 
          delay={0}
          duration={800}
          className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          
          <div className="space-y-1">
            {/* Script cursive: "Culinary" */}
            <h3 className={`font-script text-4xl sm:text-5xl md:text-6xl font-normal leading-tight ${
              isNight ? 'text-[#f3cf8a]' : 'text-[#c6924b]'
            }`}>
              Culinary
            </h3>
            {/* Serif bold title: "Delightful" */}
            <h2 className={`font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight ${
              isNight ? 'text-[#ffffff]' : 'text-[#1a1c20]'
            }`}>
              Delightful
            </h2>
          </div>

          {/* Minimalist ornament divider */}
          <div className="flex items-center justify-center lg:justify-start space-x-2 py-1 text-[#c6924b]">
            <span className="w-6 h-[1px] bg-[#c6924b]/40"></span>
            <span className="text-xs">✦</span>
            <span className="w-6 h-[1px] bg-[#c6924b]/40"></span>
          </div>

          {/* Body Paragraph */}
          <p className={`text-base sm:text-lg leading-relaxed font-light max-w-md ${
            isNight ? 'text-[#d1d5db]' : 'text-[#555e6b]'
          }`}>
            Housed in our historic West LA destination, we present an authentic Persian dining experience rooted in royal Persian charcoal grilling, saffron-infused stews, and delicate rosewater confections prepared daily.
          </p>

          {/* Link: Make a Reservation */}
          <div className="pt-2">
            <button
              id="culinary-make-reservation-btn"
              onClick={onMakeReservation}
              className={`group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-semibold border-b pb-1 transition-all duration-300 cursor-pointer ${
                isNight 
                  ? 'text-[#f3cf8a] hover:text-white border-[#f3cf8a]/70' 
                  : 'text-[#8c6227] hover:text-[#212429] border-[#c6924b]'
              }`}
            >
              <span>Reserve a Table</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </RevealOnScroll>

        {/* Right 2 Tall Vertical Dish Photos (Persian Chelo Kababs & Bastani Sonnati) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Dish 1: Persian Flame Chelo Kabab Koobideh */}
          <RevealOnScroll direction="up" delay={150} duration={850}>
            <div 
              onClick={() => onOpenDish('item-4')}
              className={`group relative aspect-[3/4] sm:aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${
                isNight 
                  ? 'bg-[#0a0a0a] border border-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.95)] ring-1 ring-white/10 hover:border-[#d4a359]/70 hover:shadow-[0_25px_60px_rgba(212,163,89,0.15)]' 
                  : 'bg-[#ece7df] shadow-[0_15px_35px_rgba(0,0,0,0.12)]'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"
                alt="Persian Flame Chelo Kabab Koobideh with saffron basmati rice"
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                  isNight ? 'filter brightness-100 contrast-[1.08] saturate-[1.05]' : 'filter brightness-95 contrast-105'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <div className="text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#f5d79e] font-semibold block mb-0.5 font-['Raleway']">Flame Charcoal Grill</span>
                  <h4 className="font-serif text-lg text-white font-medium">Chelo Kabab Koobideh &amp; Joojeh</h4>
                  <p className="text-xs text-white/80 mt-0.5">Prime minced lamb &amp; saffron chicken skewers over open embers</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Dish 2: Bastani Sonnati & Persian Saffron Ice Cream */}
          <RevealOnScroll direction="up" delay={300} duration={850}>
            <div 
              onClick={() => onOpenDish('item-11')}
              className={`group relative aspect-[3/4] sm:aspect-[9/16] rounded-2xl overflow-hidden sm:translate-y-6 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${
                isNight 
                  ? 'bg-[#0a0a0a] border border-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.95)] ring-1 ring-white/10 hover:border-[#d4a359]/70 hover:shadow-[0_25px_60px_rgba(212,163,89,0.15)]' 
                  : 'bg-[#ece7df] shadow-[0_15px_35px_rgba(0,0,0,0.12)]'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80"
                alt="Bastani Sonnati Persian saffron rosewater pistachio dessert"
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                  isNight ? 'filter brightness-100 contrast-[1.08] saturate-[1.05]' : 'filter brightness-95'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <div className="text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#f5d79e] font-semibold block mb-0.5 font-['Raleway']">Traditional Dessert</span>
                  <h4 className="font-serif text-lg text-white font-medium">Bastani Sonnati &amp; Faloodeh</h4>
                  <p className="text-xs text-white/80 mt-0.5">Persian saffron rosewater ice cream with roasted pistachio clotted cream</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>

      </div>
    </section>
  );
};
