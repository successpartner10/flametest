import React, { useState } from 'react';
import { X, Sparkles, Users, Wine, Calendar, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FunctionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FunctionsModal: React.FC<FunctionsModalProps> = ({ isOpen, onClose }) => {
  const [eventType, setEventType] = useState('private-dining');
  const [guests, setGuests] = useState('20-40');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14181d] border border-[#2d3642] text-[#f5f1ea] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#252d36] flex items-center justify-between bg-[#191f26]">
          <div>
            <span className="font-script text-[#d4a359] text-3xl">Flame</span>
            <h3 className="font-serif text-lg text-white font-medium">Functions &amp; Private Events</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#202730] hover:bg-[#2b3542] text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#d4a359]/20 text-[#d4a359] flex items-center justify-center mx-auto border border-[#d4a359]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl text-white">Event Inquiry Received</h3>
              <p className="text-xs text-[#9eb0c2] max-w-sm mx-auto">
                Our events director Elena will connect with you within 24 hours with custom tasting menus and floor plans.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="px-6 py-2.5 rounded-full bg-[#d4a359] text-black font-bold text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <p className="text-xs text-[#96a7b7] leading-relaxed">
                  From intimate wedding rehearsals and anniversary dinners to corporate cocktail functions and whole venue buyouts, Flame International offers custom tailored culinary experiences in Los Angeles.
                </p>
              </div>

              {/* Spaces Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  onClick={() => setEventType('private-dining')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    eventType === 'private-dining' ? 'bg-[#222a34] border-[#d4a359]' : 'bg-[#191f26] border-[#29333f]'
                  }`}
                >
                  <span className="text-xs font-serif font-bold text-white block">The Mezzanine Private Room</span>
                  <span className="text-[11px] text-[#8aa0b3] block mt-0.5">Seated dining up to 24 guests</span>
                </div>
                <div 
                  onClick={() => setEventType('full-buyout')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    eventType === 'full-buyout' ? 'bg-[#222a34] border-[#d4a359]' : 'bg-[#191f26] border-[#29333f]'
                  }`}
                >
                  <span className="text-xs font-serif font-bold text-white block">Whole Venue Buyout</span>
                  <span className="text-[11px] text-[#8aa0b3] block mt-0.5">Cocktails &amp; dining up to 90 guests</span>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Organizer Name *"
                  required
                  className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
                />
                <input
                  type="date"
                  required
                  defaultValue="2026-09-15"
                  className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                />
              </div>

              <textarea
                placeholder="Tell us about your event concept, budget, or preferred dishes..."
                rows={3}
                className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4a359] to-[#b8863b] text-black font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.01] transition-transform"
              >
                Submit Event Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
