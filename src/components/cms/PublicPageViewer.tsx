import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Calendar,
  Sparkles,
  Edit3,
  ArrowLeft,
  ChevronRight,
  Share2,
  Clock,
  MapPin,
  Utensils,
  Phone,
} from 'lucide-react';
import { CMSPage, AdminUser } from '../../types/cms';
import { AppMode } from '../../types';
import { LiveEventsView } from '../LiveEventsView';
import { ContactFormView } from '../ContactFormView';
import { MenuSection } from './MenuSection';

/* ── VideoHero: cycles through multiple video srcs automatically ── */
const VideoHero: React.FC<{ srcs: string[]; className: string }> = ({ srcs, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSrc = srcs[currentIndex] ?? srcs[0];

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;
    vid.src = currentSrc;
    vid.load();
    const attempt = () => vid.play().catch(() => {});
    if (vid.readyState >= 2) {
      attempt();
    } else {
      vid.addEventListener('canplay', attempt, { once: true });
    }
    // Advance to next video when current ends (only if multiple videos)
    const onEnded = () => {
      if (srcs.length > 1) {
        setCurrentIndex((i) => (i + 1) % srcs.length);
      }
    };
    if (srcs.length > 1) {
      vid.loop = false;
      vid.addEventListener('ended', onEnded);
    } else {
      vid.loop = true;
    }
    return () => {
      vid.removeEventListener('canplay', attempt);
      vid.removeEventListener('ended', onEnded);
    };
  }, [currentSrc, srcs.length]);

  return (
    <video
      ref={videoRef}
      key={currentSrc}
      muted
      playsInline
      preload="auto"
      className={`${className} transition-opacity duration-700`}
    />
  );
};

interface PublicPageViewerProps {
  page: CMSPage;
  mode: AppMode;
  adminUser: AdminUser | null;
  onOpenAdminToPage: (slug: string) => void;
  onNavigateHome: () => void;
  onOpenReservation?: () => void;
  onOpenTickets?: () => void;
}

export const PublicPageViewer: React.FC<PublicPageViewerProps> = ({
  page,
  mode,
  adminUser,
  onOpenAdminToPage,
  onNavigateHome,
  onOpenReservation,
  onOpenTickets,
}) => {
  const isNight = mode === 'night';
  const { frontmatter, content } = page;

  // Build ordered video playlist: coverImage first (if video), then any coverVideos
  const isVideoUrl = (url: string) =>
    url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov');
  const videoSrcs: string[] = [
    ...(frontmatter.coverImage && isVideoUrl(frontmatter.coverImage)
      ? [frontmatter.coverImage]
      : []),
    ...(Array.isArray(frontmatter.coverVideos) ? frontmatter.coverVideos : []),
  ];

  return (
    <article
      className={`min-h-screen pt-24 pb-20 transition-colors duration-500 font-['Raleway'] ${
        isNight ? 'bg-[#180309] text-[#f7e8ea]' : 'bg-[#faf8f5] text-[#1a1e24]'
      }`}
    >
      {/* Full-width Screen Hero Banner Header (Matches Home Page Hero Screen Width) */}
      <header className="relative w-full overflow-hidden shadow-2xl mb-10">
        <div className="relative h-[440px] sm:h-[540px] md:h-[600px] w-full overflow-hidden">
          {/* Dynamic Video (single or playlist) or Image Hero Media */}
          {videoSrcs.length > 0 ? (
            <VideoHero
              srcs={videoSrcs}
              className="w-full h-full object-cover brightness-[0.95] contrast-[1.05]"
            />
          ) : (
            <img
              src={
                frontmatter.coverImage ||
                'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80'
              }
              alt={frontmatter.title}
              className="w-full h-full object-cover brightness-[0.90] contrast-[1.05] scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
            />
          )}

          {/* Minimal Subtle Overlay to let the video shine clearly while keeping text legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#180309]/90 via-black/30 to-black/35" />

          {/* Floating Gold Sparkle Accent in top right */}
          <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[#180309]/80 border border-[#d4a359]/60 text-[#f3cf8a] text-xs font-bold uppercase tracking-widest backdrop-blur-md hidden sm:flex items-center space-x-1.5 shadow-lg z-20">
            <Sparkles size={14} className="text-[#d4a359]" />
            <span>FLAME EXPERIENCE</span>
          </div>

          {/* Title & Subtitle Content Overlay - Lifted Up with Bottom Padding to avoid Bottom Sticky Menu Clipping */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="max-w-7xl mx-auto p-6 sm:p-10 md:p-12 pb-16 sm:pb-20 md:pb-24 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#180309]/80 border border-[#d4a359]/70 text-[#f3cf8a] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold backdrop-blur-md shadow-md">
                <Sparkles size={12} className="text-[#d4a359]" />
                <span>{frontmatter.navTitle || 'Flame International'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#f3cf8a] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                {frontmatter.title}
              </h1>

              {frontmatter.subtitle && (
                <p className="text-sm sm:text-base md:text-lg max-w-3xl font-normal leading-relaxed text-[#f7e8ea] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {frontmatter.subtitle}
                </p>
              )}

              {/* Action CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {onOpenReservation && (
                  <button
                    onClick={onOpenReservation}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4a359] via-[#e2b46b] to-[#b3833b] hover:brightness-110 text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    Reserve Table
                  </button>
                )}
                {page.slug === 'live-events' && onOpenTickets && (
                  <button
                    onClick={onOpenTickets}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d9381e] via-[#e64a19] to-[#ea580c] hover:brightness-110 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    Buy Concert Tickets
                  </button>
                )}
                <a
                  href="tel:3104440045"
                  className="px-6 py-2.5 rounded-full bg-[#180309]/80 border border-[#831f3b] text-[#f3cf8a] font-bold text-xs uppercase tracking-widest hover:bg-[#2d0713] transition-all cursor-pointer shadow-lg backdrop-blur-md flex items-center space-x-1.5"
                >
                  <Phone size={14} />
                  <span>310-444-0045</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Breadcrumb & Admin Edit Trigger */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className={`inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
              isNight ? 'text-[#d4a359] hover:text-[#f3cf8a]' : 'text-[#9e1c38] hover:text-[#b82544]'
            }`}
          >
            <ArrowLeft size={14} />
            <span>Return to Home</span>
          </button>

          {adminUser?.isAuthorized && (
            <button
              onClick={() => onOpenAdminToPage(page.slug)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#d4a359]/20 hover:bg-[#d4a359]/30 border border-[#d4a359]/60 text-[#f3cf8a] text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <Edit3 size={13} />
              <span>Edit in CMS ({page.slug}.md)</span>
            </button>
          )}
        </div>

        {/* Dynamic Body: Custom Interactive Modules or Standard CMS Markdown */}
        {page.slug === 'live-events' ? (
          <LiveEventsView
            mode={mode}
            onOpenTickets={onOpenTickets}
            onOpenReservation={onOpenReservation}
          />
        ) : page.slug === 'contact' ? (
          <ContactFormView
            mode={mode}
            onOpenReservation={onOpenReservation}
          />
        ) : page.slug === 'dine-in' ? (
          <div className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${
            isNight
              ? 'bg-[#100308] border-[#2d0715] text-gray-200'
              : 'bg-white border-stone-200 text-gray-800'
          }`}>
            <MenuSection mode={mode} csvPath="/menu.csv" />
          </div>
        ) : (
          <section
            className={`p-6 sm:p-12 rounded-3xl border shadow-xl ${
              isNight
                ? 'bg-[#100308] border-[#2d0715] text-gray-200'
                : 'bg-white border-stone-200 text-gray-800'
            }`}
          >
            <div className="max-w-none space-y-6 text-sm sm:text-base leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h2
                      className={`font-serif text-2xl sm:text-3xl font-bold border-b pb-3 mb-4 mt-8 ${
                        isNight ? 'text-white border-[#38081a]' : 'text-stone-900 border-stone-200'
                      }`}
                    >
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h3
                      className={`font-serif text-xl sm:text-2xl font-bold border-b pb-2 mb-3 mt-8 ${
                        isNight ? 'text-[#f3cf8a] border-white/10' : 'text-[#9e1c38] border-stone-200'
                      }`}
                    >
                      {children}
                    </h3>
                  ),
                  h3: ({ children }) => (
                    <h4
                      className={`font-serif text-lg sm:text-xl font-bold mb-2 mt-6 ${
                        isNight ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => <p className="mb-4 leading-relaxed font-light">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-2 my-4 marker:text-[#d4a359]">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-2 my-4 marker:text-[#d4a359] font-medium">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote
                      className={`border-l-4 border-[#d4a359] p-5 rounded-r-2xl italic my-6 shadow-sm ${
                        isNight ? 'bg-[#1b050f] text-[#f5d79e]' : 'bg-amber-50/80 text-stone-800'
                      }`}
                    >
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div
                      className={`overflow-x-auto my-6 rounded-2xl border shadow-sm ${
                        isNight ? 'border-[#38081a] bg-[#14040b]' : 'border-stone-200 bg-stone-50'
                      }`}
                    >
                      <table className="w-full text-left text-sm sm:text-base border-collapse">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th
                      className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-xs sm:text-sm ${
                        isNight
                          ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                          : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                      }`}
                    >
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td
                      className={`px-4 sm:px-6 py-4 border-b text-sm sm:text-base leading-relaxed ${
                        isNight ? 'border-[#260511] text-gray-100' : 'border-stone-200 text-stone-900'
                      }`}
                    >
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => (
                    <figure className="my-8 rounded-3xl overflow-hidden border border-stone-300/30 shadow-2xl">
                      <img
                        src={src}
                        alt={alt || ''}
                        className="w-full object-cover max-h-[500px] hover:scale-102 transition-transform duration-700"
                      />
                      {alt && (
                        <figcaption
                          className={`px-4 py-2 text-center text-xs font-mono tracking-wide ${
                            isNight ? 'bg-[#18040d] text-gray-400' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4a359] underline underline-offset-4 hover:text-[#f3cf8a] font-medium"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className={isNight ? 'text-white font-bold' : 'text-stone-950 font-bold'}>
                      {children}
                    </strong>
                  ),
                  hr: () => (
                    <hr className={`my-8 ${isNight ? 'border-[#38081a]' : 'border-stone-200'}`} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </section>
        )}

      </div>
    </article>
  );
};
