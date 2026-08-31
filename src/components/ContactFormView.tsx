import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar, Users, MessageSquare, Clock } from 'lucide-react';
import { AppMode } from '../types';

interface ContactFormViewProps {
  mode: AppMode;
  onOpenReservation?: () => void;
}

export const ContactFormView: React.FC<ContactFormViewProps> = ({ mode, onOpenReservation }) => {
  const isNight = mode === 'night';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'General Dining & Table Booking',
    preferredDate: '',
    preferredTime: '7:30 PM',
    guestCount: '2 Guests',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="space-y-12 font-['Raleway']">
      
      {/* HEADER INTRO */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#d4a359]/20 border border-[#d4a359] text-[#f3cf8a] text-xs font-bold uppercase tracking-widest">
          <Mail size={14} />
          <span>FLAME CONCIERGE &amp; INQUIRIES</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">We'd Love to Hear From You</h2>
        <p className="text-sm text-[#f5a7b8]">
          Have a question about table bookings, private banquets, live concert ticketing, or catering? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: DIRECT CONTACT DETAILS */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#1c030b] border border-[#6b152d] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-[#d4a359] border-b border-[#521324] pb-3">Direct Contact Info</h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#3d0a1c] border border-[#831f3b] flex items-center justify-center text-[#d4a359] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Address &amp; Location</h5>
                  <p className="text-gray-300">11330 Santa Monica Blvd, West Los Angeles, CA 90025</p>
                  <span className="text-[11px] text-[#f3cf8a] font-medium block mt-1">Complimentary Valet Parking Available</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#3d0a1c] border border-[#831f3b] flex items-center justify-center text-[#d4a359] shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Direct Phone Lines</h5>
                  <p className="text-gray-300">Main Line: <a href="tel:3104440045" className="text-[#f3cf8a] font-bold hover:underline">(310) 444-0045</a></p>
                  <p className="text-gray-300">Concerts &amp; Tickets: <a href="tel:3104440046" className="text-[#f3cf8a] font-bold hover:underline">(310) 444-0046</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#3d0a1c] border border-[#831f3b] flex items-center justify-center text-[#d4a359] shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Email Communication</h5>
                  <p className="text-gray-300">General: contact@flameinternational.com</p>
                  <p className="text-gray-300">Private Events: banquets@flameinternational.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#3d0a1c] border border-[#831f3b] flex items-center justify-center text-[#d4a359] shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs">Dining &amp; Show Hours</h5>
                  <p className="text-gray-300">Mon – Sun: 11:30 AM – 11:00 PM</p>
                  <p className="text-gray-300">Fri &amp; Sat Cabaret: 9:00 PM – 1:00 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RESTAURANT INQUIRY FORM */}
        <div className="lg:col-span-7">
          <div className="bg-[#1c030b] border border-[#6b152d] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle size={36} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">Thank You, {formData.fullName}!</h4>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong className="text-[#f3cf8a]">{formData.inquiryType}</strong> has been received by our host concierge. We will respond within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#3d0a1c] hover:bg-[#5e1026] text-[#f5d79e] border border-[#831f3b] text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-white border-b border-[#521324] pb-3">Send an Inquiry</h3>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dariush Rahbar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#280510] border border-[#521324] focus:border-[#d4a359] text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. guest@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#280510] border border-[#521324] focus:border-[#d4a359] text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(310) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#280510] border border-[#521324] focus:border-[#d4a359] text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Inquiry Type *</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#280510] border border-[#521324] focus:border-[#d4a359] text-white text-sm outline-none transition-colors"
                    >
                      <option value="General Dining & Table Booking">General Dining &amp; Table Booking</option>
                      <option value="Private Event & Banquet Room Rental">Private Event &amp; Banquet Room Rental</option>
                      <option value="Catering & Skewer Platter Orders">Catering &amp; Skewer Platter Orders</option>
                      <option value="Live Concert & Ticketing Inquiry">Live Concert &amp; Ticketing Inquiry</option>
                      <option value="Media & Press">Media &amp; Press</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Preferred Date (Optional)</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#280510] border border-[#521324] focus:border-[#d4a359] text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Party Size */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Party Size</label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#280510] border border-[#521324] focus:border-[#d4a359] text-white text-sm outline-none transition-colors"
                    >
                      <option value="1–2 Guests">1–2 Guests</option>
                      <option value="3–6 Guests">3–6 Guests</option>
                      <option value="7–12 Guests">7–12 Guests</option>
                      <option value="15–30 Guests (Small Banquet)">15–30 Guests (Small Banquet)</option>
                      <option value="30+ Guests (Full Hall Rental)">30+ Guests (Full Hall Rental)</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Your Message or Special Request *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your dining occasion, dietary requests, or event details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#280510] border border-[#521324] focus:border-[#d4a359] text-white text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#f3cf8a] text-black font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:brightness-110 active:scale-98 flex items-center justify-center space-x-2"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SUBMIT INQUIRY TO CONCIERGE'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
