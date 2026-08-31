import React from 'react';
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

  return (
    <article
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-12 transition-colors duration-500 font-['Raleway'] ${
        isNight ? 'bg-[#180309] text-[#f7e8ea]' : 'bg-[#faf8f5] text-[#1a1e24]'
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        
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

        {/* Cinematic Luxury Hero Image Header */}
        <header
          className={`relative rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 ${
            isNight ? 'border-[#521324] bg-[#280510]' : 'border-stone-300 bg-white'
          }`}
        >
          {/* Hero Cover Image Container */}
          <div className="relative h-72 sm:h-96 md:h-[420px] w-full overflow-hidden">
            <img
              src={
                frontmatter.coverImage ||
                'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80'
              }
              alt={frontmatter.title}
              className="w-full h-full object-cover brightness-[0.70] contrast-[1.08] scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
            />

            {/* Dark Burgundy & Gold Shimmer Gradient Overlay */}
            <div
              className={`absolute inset-0 ${
                isNight
                  ? 'bg-gradient-to-t from-[#180309] via-[#180309]/70 to-black/40'
                  : 'bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/70 to-black/40'
              }`}
            />

            {/* Floating Gold Sparkle Accent in top right */}
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[#180309]/80 border border-[#d4a359]/60 text-[#f3cf8a] text-xs font-bold uppercase tracking-widest backdrop-blur-md hidden sm:flex items-center space-x-1.5 shadow-lg">
              <Sparkles size={14} className="text-[#d4a359]" />
              <span>FLAME EXPERIENCE</span>
            </div>

            {/* Title & Subtitle Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-12 z-10 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#d4a359]/25 border border-[#d4a359]/60 text-[#f3cf8a] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold backdrop-blur-md shadow-md">
                <Sparkles size={12} />
                <span>{frontmatter.navTitle || 'Flame International'}</span>
              </div>

              <h1
                className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight drop-shadow-lg ${
                  isNight ? 'text-white' : 'text-[#14181f]'
                }`}
              >
                {frontmatter.title}
              </h1>

              {frontmatter.subtitle && (
                <p
                  className={`text-sm sm:text-lg max-w-3xl font-light leading-relaxed drop-shadow-md ${
                    isNight ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
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
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-1.5 border backdrop-blur-md shadow-md ${
                    isNight
                      ? 'bg-[#180309]/80 border-[#6b152d] hover:bg-[#280510] text-gray-100'
                      : 'bg-white/80 border-stone-300 hover:bg-stone-100 text-gray-900'
                  }`}
                >
                  <Phone size={13} className="text-[#d4a359]" />
                  <span>Call (310) 444-0045</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Rendered Markdown Body */}
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
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th
                    className={`px-4 sm:px-6 py-3.5 border-b font-bold uppercase tracking-wider text-[11px] sm:text-xs ${
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
                    className={`px-4 sm:px-6 py-3.5 border-b ${
                      isNight ? 'border-[#260511] text-gray-300' : 'border-stone-200 text-stone-700'
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

      </div>
    </article>
  );
};
