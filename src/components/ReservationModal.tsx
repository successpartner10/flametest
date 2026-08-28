import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, MapPin, Sparkles, CheckCircle2, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>('2026-08-29');
  const [time, setTime] = useState<string>('20:30');
  const [seatingArea, setSeatingArea] = useState<string>('sunlit-corner');
  const [occasion, setOccasion] = useState<string>('dinner');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const lunchTimes = ['11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
  const dinnerTimes = ['4:00 PM', '5:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

  const seatingOptions = [
    {
      id: 'sunlit-corner',
      name: 'Sunlit Corner Window',
      desc: 'Looking over the square and old market quarter bustle',
      tag: 'Most Requested',
      icon: '🪟'
    },
    {
      id: 'main-dining',
      name: 'Main Dining Hall',
      desc: 'Spacious high ceilings and intimate ambient lighting',
      tag: 'Classic',
      icon: '🕯️'
    },
    {
      id: 'chefs-counter',
      name: 'Chef’s Counter',
      desc: 'Direct culinary view of fresh pasta rolling & flame kitchen',
      tag: 'Experience',
      icon: '🍳'
    },
    {
      id: 'cabaret-lounge',
      name: 'Cabaret & Jazz Stage',
      desc: 'Near the live evening acoustic and velvet lounge',
      tag: 'Night Vibe',
      icon: '🎷'
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14181d] border border-[#2d3642] text-[#f5f1ea] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#252d36] flex items-center justify-between bg-[#191f26]">
          <div>
            <span className="font-script text-[#d4a359] text-3xl">Flame</span>
            <h3 className="font-serif text-lg text-white font-medium">Table Reservation</h3>
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
          {isSuccess ? (
            <div className="text-center py-8 px-4 space-y-6">
              <div className="w-16 h-16 bg-[#d4a359]/20 text-[#d4a359] border border-[#d4a359] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-white">Table Reserved with Pleasure</h3>
                <p className="text-sm text-[#9eaebb] max-w-md mx-auto">
                  We look forward to welcoming you, <span className="text-[#f5d79e] font-semibold">{name}</span>. A confirmation SMS &amp; email has been sent.
                </p>
              </div>

              {/* Reservation summary card */}
              <div className="max-w-md mx-auto bg-[#1b2129] border border-[#2d3846] rounded-2xl p-5 text-left text-xs space-y-2.5 text-[#d0dbe6]">
                <div className="flex justify-between border-b border-[#29333f] pb-2">
                  <span className="text-[#8394a5]">Date &amp; Time:</span>
                  <span className="font-mono text-white font-bold">{date} at {time}</span>
                </div>
                <div className="flex justify-between border-b border-[#29333f] pb-2">
                  <span className="text-[#8394a5]">Party Size:</span>
                  <span className="font-bold text-white">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex justify-between border-b border-[#29333f] pb-2">
                  <span className="text-[#8394a5]">Seating Area:</span>
                  <span className="font-bold text-[#d4a359]">{seatingOptions.find(s => s.id === seatingArea)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8394a5]">Location:</span>
                  <span className="text-white">11330 Santa Monica Blvd, Los Angeles, CA 90025</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-[#d4a359] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#e2b775] transition-transform hover:scale-105"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Party Size Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#98a7b7] font-mono mb-2 flex items-center space-x-1.5">
                  <Users size={14} className="text-[#d4a359]" />
                  <span>Number of Guests</span>
                </label>
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`w-11 h-11 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                        guests === num
                          ? 'bg-[#d4a359] text-black shadow-lg scale-105'
                          : 'bg-[#1d232c] text-[#a6b5c4] hover:bg-[#27303c]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setGuests(9)}
                    className={`px-3 h-11 rounded-xl text-xs font-bold transition-all ${
                      guests >= 9
                        ? 'bg-[#d4a359] text-black shadow-lg scale-105'
                        : 'bg-[#1d232c] text-[#a6b5c4] hover:bg-[#27303c]'
                    }`}
                  >
                    9+ (Event)
                  </button>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#98a7b7] font-mono mb-2 flex items-center space-x-1.5">
                    <CalendarIcon size={14} className="text-[#d4a359]" />
                    <span>Select Date</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#98a7b7] font-mono mb-2 flex items-center space-x-1.5">
                    <Clock size={14} className="text-[#d4a359]" />
                    <span>Select Time</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <optgroup label="Lunch Hub Hours (11:30 AM – 4:00 PM)">
                      {lunchTimes.map(t => <option key={t} value={t}>{t} — Lunch</option>)}
                    </optgroup>
                    <optgroup label="Dinner &amp; Evening Hours (4:00 PM – 11:00 PM)">
                      {dinnerTimes.map(t => <option key={t} value={t}>{t} — Dinner</option>)}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Seating Ambiance Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#98a7b7] font-mono mb-2 flex items-center space-x-1.5">
                  <MapPin size={14} className="text-[#d4a359]" />
                  <span>Choose Seating Atmosphere</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((seat) => (
                    <div
                      key={seat.id}
                      onClick={() => setSeatingArea(seat.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        seatingArea === seat.id
                          ? 'bg-[#222a34] border-[#d4a359] shadow-md ring-1 ring-[#d4a359]/30'
                          : 'bg-[#1a2027] border-[#29333f] hover:border-[#3d4b5c]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">{seat.icon}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#2a3442] text-[#e0dacd] font-mono font-semibold">
                          {seat.tag}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm text-white font-medium">{seat.name}</h4>
                      <p className="text-[11px] text-[#8696a6] leading-tight mt-0.5">{seat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-[#98a7b7] font-mono">Guest Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (SMS confirmation) *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
                  />
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                  >
                    <option value="dinner">Casual Dining</option>
                    <option value="romantic">Romantic Date / Anniversary</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="business">Business Dinner</option>
                    <option value="cabaret">Late Night Cabaret Experience</option>
                  </select>
                </div>
                <textarea
                  placeholder="Special requests or dietary restrictions (optional)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-[#1e252e] border border-[#2e3946] rounded-xl px-4 py-2 text-xs text-white placeholder-[#6c7b8c] focus:outline-none focus:border-[#d4a359]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-reservation-btn"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4a359] to-[#b8863b] text-black font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.01] transition-transform cursor-pointer"
              >
                Confirm Reservation for {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
