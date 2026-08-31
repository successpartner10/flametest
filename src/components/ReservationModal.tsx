import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, MapPin, Sparkles, CheckCircle2, Heart, Award, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppMode } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: AppMode;
  initialSpace?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ 
  isOpen, 
  onClose,
  mode = 'lunch',
  initialSpace
}) => {
  const isNight = mode === 'night';

  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>('2026-09-12');
  const [time, setTime] = useState<string>('7:30 PM');
  const [seatingArea, setSeatingArea] = useState<string>('flame-restaurant');
  const [occasion, setOccasion] = useState<string>('dinner');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Sync initialSpace when provided
  useEffect(() => {
    if (initialSpace) {
      const lower = initialSpace.toLowerCase();
      if (lower.includes('patio')) setSeatingArea('flame-patio');
      else if (lower.includes('lounge') || lower.includes('banquet')) setSeatingArea('flame-events-lounge');
      else if (lower.includes('restaurant')) setSeatingArea('flame-restaurant');
      else if (lower.includes('window') || lower.includes('corner')) setSeatingArea('sunlit-corner');
    }
  }, [initialSpace, isOpen]);

  if (!isOpen) return null;

  const lunchTimes = ['11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
  const dinnerTimes = ['4:00 PM', '5:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

  const seatingOptions = [
    {
      id: 'flame-patio',
      name: 'Flame Patio',
      desc: 'Covered outdoor garden oasis, Moroccan lanterns, sun shades & alfresco dining (30–80 Guests)',
      tag: 'Outdoor Oasis',
      icon: '🌿'
    },
    {
      id: 'flame-restaurant',
      name: 'Flame Restaurant',
      desc: 'Spacious main Persian dining hall, high ceilings & linen tables (Up to 120 Guests)',
      tag: 'Main Hall',
      icon: '🕯️'
    },
    {
      id: 'flame-events-lounge',
      name: 'Flame Events Lounge',
      desc: 'Grand royal banquet hall, concert stage, chandeliers & private bar (Up to 250 Guests)',
      tag: 'Grand Banquets',
      icon: '✨'
    },
    {
      id: 'sunlit-corner',
      name: 'Sunlit Corner Window',
      desc: 'Intimate corner overlooking Santa Monica Boulevard with soft natural light',
      tag: 'Intimate',
      icon: '🪟'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4a359', '#ffcc80', '#e91e63', '#ffffff']
    });

    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-['Raleway']">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors duration-300 ${
          isNight 
            ? 'bg-[#1c040d] border border-[#6b152d] text-[#f5f1ea]' 
            : 'bg-[#ffffff] border border-stone-300 text-stone-950'
        }`}
      >
        
        {/* Header */}
        <div 
          className={`px-6 sm:px-8 py-5 sm:py-6 border-b flex items-center justify-between transition-colors ${
            isNight 
              ? 'bg-[#24060f] border-[#521324]' 
              : 'bg-[#f7f4ee] border-stone-200'
          }`}
        >
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isNight ? 'text-white' : 'text-stone-950'}`}>
                FLAME
              </span>
              <span className={`text-base sm:text-lg font-black tracking-[0.2em] uppercase ${isNight ? 'text-[#f5d79e]' : 'text-[#8c6227]'}`}>
                INTERNATIONAL
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold mt-1 ${isNight ? 'text-[#f3d2d8]' : 'text-stone-700'}`}>
              Inquire &amp; Reserve Space
            </h3>
          </div>
          
          <button
            onClick={onClose}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isNight 
                ? 'bg-[#2d0713] hover:bg-[#430b1c] text-white' 
                : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-10 px-4 space-y-6">
              <div className="w-20 h-20 bg-[#d4a359]/20 text-[#d4a359] border-2 border-[#d4a359] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={44} />
              </div>

              <div className="space-y-2">
                <h3 className={`font-serif text-3xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-stone-950'}`}>
                  Inquiry Received with Pleasure
                </h3>
                <p className={`text-base sm:text-lg max-w-md mx-auto font-medium ${isNight ? 'text-[#f3d2d8]' : 'text-stone-700'}`}>
                  We look forward to welcoming you, <strong className="text-[#b37a2b] font-bold">{name}</strong>. Our private dining and events manager will reach out within 2 hours.
                </p>
              </div>

              {/* Reservation summary card */}
              <div className={`max-w-md mx-auto rounded-2xl p-6 text-left text-sm sm:text-base space-y-3.5 border ${
                isNight 
                  ? 'bg-[#24060f] border-[#6b152d] text-[#f5f1ea]' 
                  : 'bg-stone-50 border-stone-200 text-stone-950'
              }`}>
                <div className={`flex justify-between border-b pb-2.5 ${isNight ? 'border-[#521324]' : 'border-stone-200'}`}>
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Date &amp; Time:</span>
                  <span className="font-bold text-stone-900 dark:text-white">{date} at {time}</span>
                </div>
                <div className={`flex justify-between border-b pb-2.5 ${isNight ? 'border-[#521324]' : 'border-stone-200'}`}>
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Party Size:</span>
                  <span className="font-bold text-stone-900 dark:text-white">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className={`flex justify-between border-b pb-2.5 ${isNight ? 'border-[#521324]' : 'border-stone-200'}`}>
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Selected Space:</span>
                  <span className="font-extrabold text-[#b37a2b]">{seatingOptions.find(s => s.id === seatingArea)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isNight ? 'text-[#f5d79e]/80' : 'text-stone-600'}>Location:</span>
                  <span className="font-medium text-stone-800 dark:text-gray-200">11330 Santa Monica Blvd, West LA</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f3cf8a] text-stone-950 font-black text-sm uppercase tracking-widest hover:brightness-110 shadow-xl transition-all"
              >
                Close &amp; Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Party Size Selector */}
              <div>
                <label className={`block text-sm sm:text-base font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-2 ${
                  isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                }`}>
                  <Users size={18} className="text-[#b37a2b]" />
                  <span>Number of Guests</span>
                </label>
                <div className="flex items-center space-x-2.5 overflow-x-auto pb-1.5">
                  {[2, 6, 12, 20, 40, 75, 120, 170].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`h-12 min-w-[3.2rem] px-3 rounded-2xl text-base font-black flex items-center justify-center transition-all cursor-pointer border ${
                        guests === num
                          ? 'bg-[#d4a359] text-stone-950 border-[#b37a2b] shadow-lg scale-105'
                          : isNight
                            ? 'bg-[#24060f] text-[#f3d2d8] border-[#521324] hover:bg-[#3d0917]'
                            : 'bg-stone-100 text-stone-900 border-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setGuests(250)}
                    className={`h-12 px-4 rounded-2xl text-sm font-black whitespace-nowrap transition-all cursor-pointer border ${
                      guests >= 200
                        ? 'bg-[#d4a359] text-stone-950 border-[#b37a2b] shadow-lg scale-105'
                        : isNight
                          ? 'bg-[#24060f] text-[#f3d2d8] border-[#521324] hover:bg-[#3d0917]'
                          : 'bg-stone-100 text-stone-900 border-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    200+ (Full Venue Buyout)
                  </button>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm sm:text-base font-bold uppercase tracking-wider mb-2 flex items-center space-x-2 ${
                    isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                  }`}>
                    <CalendarIcon size={18} className="text-[#b37a2b]" />
                    <span>Select Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full rounded-2xl px-4 py-3.5 text-base sm:text-lg font-bold border-2 focus:outline-none focus:border-[#b37a2b] transition-colors ${
                      isNight 
                        ? 'bg-[#24060f] border-[#6b152d] text-white' 
                        : 'bg-stone-50 border-stone-300 text-stone-950 focus:bg-white'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm sm:text-base font-bold uppercase tracking-wider mb-2 flex items-center space-x-2 ${
                    isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                  }`}>
                    <Clock size={18} className="text-[#b37a2b]" />
                    <span>Select Time</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={`w-full rounded-2xl px-4 py-3.5 text-base sm:text-lg font-bold border-2 focus:outline-none focus:border-[#b37a2b] transition-colors ${
                      isNight 
                        ? 'bg-[#24060f] border-[#6b152d] text-white' 
                        : 'bg-stone-50 border-stone-300 text-stone-950 focus:bg-white'
                    }`}
                  >
                    <optgroup label="Lunch Hub Hours (11:30 AM – 3:30 PM)">
                      {lunchTimes.map(t => <option key={t} value={t}>{t} — Midday / Lunch</option>)}
                    </optgroup>
                    <optgroup label="Dinner &amp; Banquet Hours (4:00 PM – 11:00 PM)">
                      {dinnerTimes.map(t => <option key={t} value={t}>{t} — Evening / Dinner</option>)}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Seating Space Selection */}
              <div>
                <label className={`block text-sm sm:text-base font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-2 ${
                  isNight ? 'text-[#f5d79e]' : 'text-stone-950'
                }`}>
                  <MapPin size={18} className="text-[#b37a2b]" />
                  <span>Choose Space or Seating Area</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {seatingOptions.map((seat) => (
                    <div
                      key={seat.id}
                      onClick={() => setSeatingArea(seat.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        seatingArea === seat.id
                          ? isNight
                            ? 'bg-[#2d0713] border-[#d4a359] shadow-md ring-2 ring-[#d4a359]/30'
                            : 'bg-[#fef9f0] border-[#b37a2b] shadow-md ring-2 ring-[#b37a2b]/30'
                          : isNight
                            ? 'bg-[#24060f] border-[#521324] hover:border-[#831f3b]'
                            : 'bg-stone-50 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">{seat.icon}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          isNight 
                            ? 'bg-[#3d0917] text-[#f5d79e]' 
                            : 'bg-stone-200 text-stone-900'
                        }`}>
                          {seat.tag}
                        </span>
                      </div>
                      <h4 className={`text-base sm:text-lg font-extrabold ${isNight ? 'text-white' : 'text-stone-950'}`}>
                        {seat.name}
                      </h4>
                      <p className={`text-xs sm:text-sm font-medium leading-snug mt-1 ${isNight ? 'text-[#f3d2d8]' : 'text-stone-700'}`}>
                        {seat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-2">
                <h4 className={`text-sm sm:text-base font-extrabold uppercase tracking-wider border-b pb-2 ${
                  isNight ? 'text-[#f5d79e] border-[#521324]' : 'text-stone-950 border-stone-200'
                }`}>
                  Your Contact Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isNight ? 'text-gray-300' : 'text-stone-800'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dariush Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={`w-full rounded-2xl px-4 py-3.5 text-base sm:text-lg font-semibold border-2 focus:outline-none focus:border-[#b37a2b] transition-colors ${
                        isNight 
                          ? 'bg-[#24060f] border-[#6b152d] text-white placeholder-gray-500' 
                          : 'bg-stone-50 border-stone-300 text-stone-950 focus:bg-white placeholder-stone-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isNight ? 'text-gray-300' : 'text-stone-800'}`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (310) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className={`w-full rounded-2xl px-4 py-3.5 text-base sm:text-lg font-semibold border-2 focus:outline-none focus:border-[#b37a2b] transition-colors ${
                        isNight 
                          ? 'bg-[#24060f] border-[#6b152d] text-white placeholder-gray-500' 
                          : 'bg-stone-50 border-stone-300 text-stone-950 focus:bg-white placeholder-stone-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isNight ? 'text-gray-300' : 'text-stone-800'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. contact@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full rounded-2xl px-4 py-3.5 text-base sm:text-lg font-semibold border-2 focus:outline-none focus:border-[#b37a2b] transition-colors ${
                        isNight 
                          ? 'bg-[#24060f] border-[#6b152d] text-white placeholder-gray-500' 
                          : 'bg-stone-50 border-stone-300 text-stone-950 focus:bg-white placeholder-stone-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isNight ? 'text-gray-300' : 'text-stone-800'}`}>
                      Occasion / Type of Gathering
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className={`w-full rounded-2xl px-4 py-3.5 text-base sm:text-lg font-semibold border-2 focus:outline-none focus:border-[#b37a2b] transition-colors ${
                        isNight 
                          ? 'bg-[#24060f] border-[#6b152d] text-white' 
                          : 'bg-stone-50 border-stone-300 text-stone-950 focus:bg-white'
                      }`}
                    >
                      <option value="dinner">Casual Dining &amp; Family Dinner</option>
                      <option value="banquet">Private Banquet &amp; Event</option>
                      <option value="romantic">Romantic Date / Anniversary</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="business">Corporate / Business Dinner</option>
                      <option value="cabaret">Friday / Saturday Cabaret Concert</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs uppercase font-bold tracking-wider mb-1.5 ${isNight ? 'text-gray-300' : 'text-stone-800'}`}>
                    Special Requests or Notes (Optional)
                  </label>
                  <textarea
                    placeholder="Tell us about special dietary requests, seating preferences, cake cutting, or audio setup..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className={`w-full rounded-2xl px-4 py-3 text-base font-medium border-2 focus:outline-none focus:border-[#b37a2b] transition-colors ${
                      isNight 
                        ? 'bg-[#24060f] border-[#6b152d] text-white placeholder-gray-500' 
                        : 'bg-stone-50 border-stone-300 text-stone-950 focus:bg-white placeholder-stone-400'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-space-inquiry-btn"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#b37a2b] via-[#d4a359] to-[#f3cf8a] text-stone-950 font-black text-base sm:text-lg uppercase tracking-wider shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Submit Inquiry for {guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
