import React from 'react';
import { X, Award, Sparkles, MapPin, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReserve: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenReserve }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#14181d] border border-[#2d3642] text-[#f5f1ea] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#252d36] flex items-center justify-between bg-[#191f26]">
          <div>
            <span className="font-script text-[#d4a359] text-3xl">Flame</span>
            <h3 className="font-serif text-lg text-white font-medium">Our Story &amp; Heritage</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#202730] hover:bg-[#2b3542] text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Flame International dining room in Los Angeles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4a359]">Santa Monica Blvd, Los Angeles • Est. 1985</span>
                <h4 className="font-serif text-xl sm:text-2xl text-white font-medium">A Sunlit Corner on Santa Monica Boulevard</h4>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#a3b3c3] leading-relaxed font-light">
            <p>
              Flame International is located at 11330 Santa Monica Blvd in West Los Angeles, CA. Designed as an extraordinary culinary sanctuary, our kitchen breathes new life into authentic Persian culinary traditions, live hardwood flame grilling, and vibrant evening cabaret entertainment.
            </p>
            <p>
              Open seven days a week from 11:30 AM to 11:00 PM, we welcome guests for artisanal Persian lunch, saffron barberry rice, slow-simmered khoresht stews, charbroiled koobideh &amp; barg kababs, and weekend live entertainment.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#1b222a] border border-[#2b3644] text-center space-y-1.5">
              <span className="text-xl">🔥</span>
              <h5 className="font-serif text-sm font-bold text-white">Live Flame Grill</h5>
              <p className="text-[11px] text-[#8696a6]">Prime meats &amp; poultry seasoned with Persian saffron and charbroiled over open embers.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#1b222a] border border-[#2b3644] text-center space-y-1.5">
              <span className="text-xl">🍚</span>
              <h5 className="font-serif text-sm font-bold text-white">Crisp Saffron Tahdig</h5>
              <p className="text-[11px] text-[#8696a6]">Aromatic long-grain basmati rice with golden crunchy tahdig, barberries &amp; pistachios.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#1b222a] border border-[#2b3644] text-center space-y-1.5">
              <span className="text-xl">🎷</span>
              <h5 className="font-serif text-sm font-bold text-white">Live Entertainment</h5>
              <p className="text-[11px] text-[#8696a6]">Live acoustic instruments, Persian classics, jazz, craft cocktails, and late-night dining.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => { onClose(); onOpenReserve(); }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4a359] to-[#b8863b] text-black font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              Reserve a Table with Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
