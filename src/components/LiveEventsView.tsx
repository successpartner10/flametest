import React, { useState } from 'react';
import { Calendar, Ticket, Sparkles, Phone, MapPin, CheckCircle, Image as ImageIcon, Filter } from 'lucide-react';
import { AppMode } from '../types';

interface LiveEventsViewProps {
  mode: AppMode;
  onOpenTickets?: () => void;
  onOpenReservation?: () => void;
}

const PAST_POSTER_ARCHIVES = [
  { id: 1, title: 'Shahyar Ghanbari & Arand Live Gala', date: 'Sept 12, 2026', image: '/images/poster_shahyar_arand.png', tag: 'Featured' },
  { id: 2, title: 'Royal Persian Cabaret & Dance Gala', date: 'Every Friday', image: '/images/poster_cabaret_gala.png', tag: 'Weekly' },
  { id: 3, title: 'Legendary Persian NYE Extravaganza', date: 'Dec 31, 2025', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', tag: 'Archive' },
  { id: 4, title: 'Sema Whirling Dervish & Sufi Music', date: 'Nov 14, 2025', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80', tag: 'Archive' },
  { id: 5, title: 'Soltan-e Ghalbha Tribute Night', date: 'Oct 28, 2025', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80', tag: 'Archive' },
  { id: 6, title: 'Mehregan Harvest Celebration Gala', date: 'Oct 04, 2025', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', tag: 'Archive' },
  // 24 additional poster placeholder slots for future uploads
  ...Array.from({ length: 24 }).map((_, i) => ({
    id: i + 7,
    title: `Flame International Concert Archive #${i + 7}`,
    date: `Season ${2024 + (i % 3)}`,
    image: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc436?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508997449629-303059a039c0?auto=format&fit=crop&w=800&q=80'
    ][i % 4],
    tag: 'Archive Slot'
  }))
];

export const LiveEventsView: React.FC<LiveEventsViewProps> = ({
  mode,
  onOpenTickets,
  onOpenReservation,
}) => {
  const isNight = mode === 'night';
  const [activeTab, setActiveTab] = useState<'tickets' | 'gallery'>('tickets');
  const [selectedPosterModal, setSelectedPosterModal] = useState<string | null>(null);

  return (
    <div className="space-y-12 font-['Raleway']">
      
      {/* 1. TOP MAIN EVENT FLYER: Full-width aspect-fitted poster frame (no distortion of faces, body, or text/dates) */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0d0205] border-2 border-[#d4a359]/70 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-4 sm:p-8">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#38081a]/50 via-black/80 to-[#180309] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#d4a359]/20 border border-[#d4a359] text-[#f3cf8a] text-xs uppercase tracking-[0.25em] font-bold shadow-lg">
            <Sparkles size={14} className="text-[#d4a359]" />
            <span>FEATURED LIVE CONCERT EVENT</span>
          </div>

          {/* Poster Image Frame (Full Height / Width Container without Distortion) */}
          <div className="w-full flex justify-center py-2">
            <div 
              onClick={() => setSelectedPosterModal('/images/poster_shahyar_arand.png')}
              className="relative max-w-xl w-full rounded-2xl overflow-hidden shadow-[0_15px_45px_rgba(212,163,89,0.25)] border border-[#d4a359]/80 cursor-pointer group transition-transform duration-500 hover:scale-[1.01]"
            >
              <img
                src="/images/poster_shahyar_arand.png"
                alt="Flame International Presents Arand & Shahyar Ghanbari Saturday September 12th"
                className="w-full h-auto object-contain max-h-[680px] mx-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <span className="px-5 py-2 rounded-full bg-[#d4a359] text-black font-bold text-xs uppercase tracking-widest shadow-xl">
                  Click to View High-Res Flyer
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Bar under Flyer */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {onOpenTickets && (
              <button
                onClick={onOpenTickets}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] hover:brightness-110 text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_10px_25px_rgba(212,163,89,0.4)] active:scale-95 flex items-center space-x-2"
              >
                <Ticket size={18} />
                <span>BOOK TICKETS NOW</span>
              </button>
            )}
            <a
              href="tel:3104440045"
              className="px-6 py-3.5 rounded-full bg-[#280510] hover:bg-[#3d0818] text-[#f5d79e] border border-[#831f3b] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center space-x-2"
            >
              <Phone size={16} className="text-[#d4a359]" />
              <span>VIP Hotline (310) 444-0045</span>
            </a>
          </div>

        </div>
      </section>

      {/* 2. DYNAMIC NAVIGATION / FILTER TABS */}
      <section className="space-y-8">
        <div className="flex justify-center border-b border-[#521324] pb-4">
          <div className="inline-flex p-1.5 rounded-full bg-[#1c030b] border border-[#6b152d] shadow-xl">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'tickets'
                  ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black shadow-lg scale-105'
                  : 'text-[#f5a7b8] hover:text-white'
              }`}
            >
              <Ticket size={16} />
              <span>Upcoming Tickets &amp; Galas</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black shadow-lg scale-105'
                  : 'text-[#f5a7b8] hover:text-white'
              }`}
            >
              <ImageIcon size={16} />
              <span>Past Concert Poster Gallery</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT 1: UPCOMING TICKETS & GALAS */}
        {activeTab === 'tickets' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Upcoming Concerts &amp; Special Events</h3>
              <p className="text-sm text-[#f5a7b8]">Select an event below to reserve VIP tables or general concert admission tickets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* EVENT 1 CARD */}
              <div className="bg-[#1c030b] border border-[#6b152d] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#d4a359] transition-all duration-300">
                <div className="relative h-72 overflow-hidden bg-black">
                  <img
                    src="/images/poster_shahyar_arand.png"
                    alt="Shahyar Ghanbari & Arand Live Concert"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-900/90 text-white border border-red-500 text-[11px] font-bold uppercase tracking-widest shadow-md">
                    FEATURED CONCERT
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/80 text-[#f3cf8a] border border-[#d4a359] text-xs font-bold shadow-md">
                    Sat, Sept 12th
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-serif text-2xl font-bold text-white">Shahyar Ghanbari &amp; Arand Live</h4>
                    <p className="text-xs text-[#f5a7b8] leading-relaxed">
                      An extraordinary evening of iconic Persian songwriting and contemporary live vocals in our luxury ballroom setting.
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-medium">VIP Front Stage Table + Dinner:</span>
                        <span className="text-[#f3cf8a] font-bold">$150 / guest</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-medium">General Gala Admission:</span>
                        <span className="text-[#f5d79e] font-bold">$75 / guest</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#521324]">
                    <div className="text-xs text-gray-400">
                      <span>Doors Open: 8:00 PM</span>
                    </div>
                    {onOpenTickets && (
                      <button
                        onClick={onOpenTickets}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                      >
                        Book Event 1
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* EVENT 2 CARD */}
              <div className="bg-[#1c030b] border border-[#6b152d] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#d4a359] transition-all duration-300">
                <div className="relative h-72 overflow-hidden bg-black">
                  <img
                    src="/images/poster_cabaret_gala.png"
                    alt="Royal Persian Cabaret Gala"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#521324] text-[#f3cf8a] border border-[#d4a359] text-[11px] font-bold uppercase tracking-widest shadow-md">
                    EVERY FRIDAY NIGHT
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/80 text-[#f3cf8a] border border-[#d4a359] text-xs font-bold shadow-md">
                    Weekly Gala
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-serif text-2xl font-bold text-white">Royal Persian Cabaret &amp; Dance Night</h4>
                    <p className="text-xs text-[#f5a7b8] leading-relaxed">
                      Live Persian orchestra, traditional dancers, artisan craft cocktails, and skewer platters until 1:00 AM.
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-medium">VIP Cabaret Table Service:</span>
                        <span className="text-[#f3cf8a] font-bold">$120 / guest</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#280510] border border-[#521324]">
                        <span className="text-white font-medium">General Cabaret Entry:</span>
                        <span className="text-[#f5d79e] font-bold">$60 / guest</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#521324]">
                    <div className="text-xs text-gray-400">
                      <span>Service: 9:00 PM – Late</span>
                    </div>
                    {onOpenTickets && (
                      <button
                        onClick={onOpenTickets}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                      >
                        Book Event 2
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB CONTENT 2: PAST CONCERT POSTER GALLERY (30 PLACES READY FOR UPLOAD) */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Past Concert &amp; Event Poster Archives</h3>
              <p className="text-xs sm:text-sm text-[#f5a7b8]">
                Explore our legacy of legendary concerts at Flame International. Over 30 poster archive slots ready for media management.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {PAST_POSTER_ARCHIVES.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPosterModal(item.image)}
                  className="group relative bg-[#1c030b] border border-[#521324] hover:border-[#d4a359] rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3 flex flex-col justify-end">
                    <span className="text-[10px] text-[#d4a359] uppercase font-bold tracking-wider">{item.date}</span>
                    <h5 className="text-xs font-bold text-white truncate">{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Poster Modal Viewer */}
      {selectedPosterModal && (
        <div 
          onClick={() => setSelectedPosterModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-[#d4a359] shadow-2xl">
            <img src={selectedPosterModal} alt="Enlarged Poster" className="w-full h-auto max-h-[85vh] object-contain" />
            <button
              onClick={() => setSelectedPosterModal(null)}
              className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-black/80 text-white text-xs font-bold uppercase tracking-widest border border-white/30"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
