/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppMode, CartItem, MenuItem } from './types';
import { MENU_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { MenuMatrixSection } from './components/MenuMatrixSection';
import { MadieStoriesSection } from './components/MadieStoriesSection';
import { MenuSection } from './components/MenuSection';
import { FooterSection } from './components/FooterSection';
import { BottomStickyNav, BottomNavAction } from './components/BottomStickyNav';
import { MenuModal } from './components/MenuModal';
import { ReservationModal } from './components/ReservationModal';
import { StoriesModal } from './components/StoriesModal';
import { BagDrawer } from './components/BagDrawer';
import { FunctionsModal } from './components/FunctionsModal';
import { AboutModal } from './components/AboutModal';
import { TicketModal } from './components/TicketModal';
import { CateringModal } from './components/CateringModal';
import { CMSPage, AdminUser } from './types/cms';
import { fetchAllPages } from './services/cmsService';
import { AuthModal } from './components/cms/AuthModal';
import { AdminPanel } from './components/cms/AdminPanel';
import { PublicPageViewer } from './components/cms/PublicPageViewer';
import { signOutUser } from './lib/firebase';
import { isAuthorizedAdmin } from './config/adminConfig';

export default function App() {
  // Mode state: 'lunch' (☀️ Lunch Hub) or 'night' (🌙 Cabaret & Night)
  const [mode, setMode] = useState<AppMode>('lunch');

  // Bottom Navigation state (Home, Live Entertainment, Dine-In, Lunch, Dinner, Contact Us)
  const [activeBottomAction, setActiveBottomAction] = useState<BottomNavAction>('home');
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');

  // CMS Dynamic State
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [activePageSlug, setActivePageSlug] = useState<string>('home');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Modal screen states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isFunctionsOpen, setIsFunctionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTicketsOpen, setIsTicketsOpen] = useState(false);
  const [isCateringOpen, setIsCateringOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState("Arand & Shahyar Ghanbari Live in Concert");
  const [selectedEventDate, setSelectedEventDate] = useState("Saturday, September 12, 2026");

  // Story state
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [highlightDishId, setHighlightDishId] = useState<string | null>(null);

  // Cart / Bag state
  const [cart, setCart] = useState<CartItem[]>([
    {
      item: MENU_ITEMS[3],
      quantity: 1,
    }
  ]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Load CMS Pages and persistent auth state + URL hash trigger for direct CMS login
  useEffect(() => {
    loadCMSPages();

    // Check stored admin credentials
    try {
      const stored = localStorage.getItem('flame_cms_user');
      if (stored) {
        const parsed: AdminUser = JSON.parse(stored);
        if (parsed.email && isAuthorizedAdmin(parsed.email)) {
          setAdminUser(parsed);
        } else {
          localStorage.removeItem('flame_cms_user');
        }
      }
    } catch (e) {
      console.warn('Could not restore CMS user:', e);
    }

    // Direct CMS link handler (e.g. #admin, #cms, ?admin=true)
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === '#admin' || hash === '#cms' || hash === '#login' || search.includes('admin') || search.includes('cms')) {
        const stored = localStorage.getItem('flame_cms_user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed.email && isAuthorizedAdmin(parsed.email)) {
              setAdminUser(parsed);
              setIsAdminPanelOpen(true);
              return;
            }
          } catch {
            // fallback to auth modal
          }
        }
        setIsAuthModalOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  const loadCMSPages = async () => {
    try {
      const list = await fetchAllPages();
      setPages(list);
    } catch (err) {
      console.error('Failed to load CMS pages:', err);
    }
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.item.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.item.id === itemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Open specific dish in menu
  const handleOpenDish = (dishId: string) => {
    setHighlightDishId(dishId);
    setMenuInitialCategory('all');
    setIsMenuOpen(true);
  };

  // Open story at index
  const handleOpenStory = (index: number) => {
    setSelectedStoryIndex(index);
    setIsStoriesOpen(true);
  };

  // Open ticket checkout
  const handleOpenTickets = (eventTitle?: string, eventDate?: string) => {
    if (eventTitle) setSelectedEventTitle(eventTitle);
    if (eventDate) setSelectedEventDate(eventDate);
    setIsTicketsOpen(true);
  };

  // Navigation handlers
  const handleOpenLunch = () => {
    setMode('lunch');
    setMenuInitialCategory('lunch');
    setIsMenuOpen(true);
  };

  const handleOpenDinner = () => {
    setMode('night');
    setMenuInitialCategory('kababs');
    setIsMenuOpen(true);
  };

  const handleOpenOrderOnline = () => {
    setIsBagOpen(true);
  };

  const handleOpenCatering = () => {
    setIsCateringOpen(true);
  };

  // Handle Dynamic Page Navigation
  const handleSelectPage = (slug: string) => {
    setActivePageSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bottom Navigation tab selector
  const handleBottomNavigate = (action: BottomNavAction) => {
    setActiveBottomAction(action);
    if (action === 'home') {
      setActivePageSlug('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'live-events') {
      setSelectedStoryIndex(0);
      setIsStoriesOpen(true);
    } else if (action === 'dine-in') {
      setMenuInitialCategory('all');
      setIsMenuOpen(true);
    } else if (action === 'order-online') {
      setIsBagOpen(true);
    } else if (action === 'catering') {
      setIsCateringOpen(true);
    } else if (action === 'reserve') {
      setIsReserveOpen(true);
    } else if (action === 'lunch') {
      handleOpenLunch();
    } else if (action === 'dinner') {
      handleOpenDinner();
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('our-story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminSignOut = async () => {
    await signOutUser();
    setAdminUser(null);
    setIsAdminPanelOpen(false);
  };

  // Active custom page object if navigating away from 'home'
  const activeCustomPage = activePageSlug !== 'home' ? pages.find((p) => p.slug === activePageSlug) : null;

  return (
    <div className={`min-h-screen bg-[#180309] text-[#f7e8ea] transition-colors duration-700 ${
      mode === 'night' ? 'night-atmosphere' : 'lunch-atmosphere'
    }`}>
      
      {/* Fixed Top Header with CMS Navigation */}
      <Header
        mode={mode}
        onToggleMode={(newMode) => setMode(newMode)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenLiveEntertainment={() => {
          setSelectedStoryIndex(0);
          setIsStoriesOpen(true);
        }}
        onOpenOnlineOrders={() => setIsBagOpen(true)}
        onOpenCatering={() => setIsCateringOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('find-us-footer');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        cartCount={totalCartCount}
        pages={pages}
        activePageSlug={activePageSlug}
        onSelectPage={handleSelectPage}
        adminUser={adminUser}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Dynamic Public Content System */}
      {activeCustomPage ? (
        <PublicPageViewer
          page={activeCustomPage}
          mode={mode}
          adminUser={adminUser}
          onOpenAdminToPage={(slug) => {
            setActivePageSlug(slug);
            setIsAdminPanelOpen(true);
          }}
          onNavigateHome={() => handleSelectPage('home')}
          onOpenReservation={() => setIsReserveOpen(true)}
          onOpenTickets={() => handleOpenTickets()}
        />
      ) : (
        /* Main Home Editorial Screens */
        <main className="relative">
          
          {/* 1. Hero Section ("The true taste of Flame International") */}
          <HeroSection
            mode={mode}
            onExploreMenu={() => setIsMenuOpen(true)}
            onBookTable={() => setIsReserveOpen(true)}
            onScrollToStory={scrollToStory}
          />

          {/* 2. Persian Live Events & Heritage + September 12 Concert Poster + Ticket Links (1st Section under Hero) */}
          <StorySection
            mode={mode}
            onLearnMore={() => setIsAboutOpen(true)}
            onReserve={() => setIsReserveOpen(true)}
            onOpenTickets={handleOpenTickets}
          />

          {/* 3. Four Ways to Experience: Lunch, Dinner, Online Order, Catering (Below Live Events) */}
          <MenuMatrixSection
            mode={mode}
            onOpenLunch={handleOpenLunch}
            onOpenDinner={handleOpenDinner}
            onOpenOrderOnline={handleOpenOrderOnline}
            onOpenCatering={handleOpenCatering}
          />

          {/* 4. Madie Section (Burgundy wave + French Bulldog vector + draggable 3D story card stack) */}
          <MadieStoriesSection
            onOpenStory={handleOpenStory}
            mode={mode}
          />

          {/* 5. Check out Our Menus (2x2 food photo grid + "Check out Our Menus" narrative) */}
          <MenuSection
            mode={mode}
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenDish={handleOpenDish}
          />

          {/* 6. Footer & Los Angeles Map (Emblem + ENCUÉNTRANOS EN Los Angeles + 6 Easy Buttons + Interactive Zoom Map & hours) */}
          <FooterSection
            mode={mode}
            onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenStories={() => { setSelectedStoryIndex(0); setIsStoriesOpen(true); }}
            onOpenReserve={() => setIsReserveOpen(true)}
            onOpenFunctions={() => setIsFunctionsOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
          />

        </main>
      )}

      {/* Sticky Bottom Navigation (Home, Live Entertainment, Dine-In, Lunch, Dinner, Contact Us) */}
      <BottomStickyNav
        mode={mode}
        activeAction={activeBottomAction}
        onNavigate={handleBottomNavigate}
      />

      {/* Admin CMS Panel */}
      {isAdminPanelOpen && adminUser && (
        <AdminPanel
          user={adminUser}
          onCloseAdmin={() => {
            setIsAdminPanelOpen(false);
            loadCMSPages();
          }}
          onSignOut={handleAdminSignOut}
          onViewPageOnSite={(slug) => {
            setIsAdminPanelOpen(false);
            handleSelectPage(slug);
            loadCMSPages();
          }}
        />
      )}

      {/* Firebase Google Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setAdminUser(user);
          setIsAdminPanelOpen(true);
        }}
      />

      {/* Interactive Modal Screens */}
      
      {/* Full Menu Modal */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
          setHighlightDishId(null);
          if (activeBottomAction === 'lunch' || activeBottomAction === 'dinner') {
            setActiveBottomAction('home');
          }
        }}
        onAddToCart={handleAddToCart}
        mode={mode}
        onToggleMode={(newMode) => setMode(newMode)}
        highlightDishId={highlightDishId}
        initialCategory={menuInitialCategory}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => {
          setIsReserveOpen(false);
          setActiveBottomAction('home');
        }}
      />

      {/* Concert & Live Stage Ticket Modal */}
      <TicketModal
        isOpen={isTicketsOpen}
        onClose={() => setIsTicketsOpen(false)}
        initialEventTitle={selectedEventTitle}
        initialEventDate={selectedEventDate}
      />

      {/* Catering & Private Events Modal */}
      <CateringModal
        isOpen={isCateringOpen}
        onClose={() => setIsCateringOpen(false)}
      />

      {/* Live Stories Fullscreen Viewer */}
      <StoriesModal
        isOpen={isStoriesOpen}
        onClose={() => {
          setIsStoriesOpen(false);
          if (activeBottomAction === 'live-events') setActiveBottomAction('home');
        }}
        initialSlideIndex={selectedStoryIndex}
        onOrderDish={(dish) => {
          handleAddToCart(dish);
          setIsBagOpen(true);
        }}
        onOpenReserve={() => setIsReserveOpen(true)}
      />

      {/* Order Bag / Quick Checkout Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => {
          setIsBagOpen(false);
        }}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onExploreMenu={() => {
          setIsBagOpen(false);
          setMenuInitialCategory('all');
          setIsMenuOpen(true);
        }}
      />

      {/* Functions & Private Dining Modal */}
      <FunctionsModal
        isOpen={isFunctionsOpen}
        onClose={() => setIsFunctionsOpen(false)}
      />

      {/* About Us & Heritage Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenReserve={() => {
          setIsAboutOpen(false);
          setIsReserveOpen(true);
        }}
      />

    </div>
  );
}
