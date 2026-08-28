/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppMode, CartItem, MenuItem } from './types';
import { MENU_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { MadieStoriesSection } from './components/MadieStoriesSection';
import { MenuSection } from './components/MenuSection';
import { CulinarySection } from './components/CulinarySection';
import { FooterSection } from './components/FooterSection';
import { BottomStickyNav, BottomNavAction } from './components/BottomStickyNav';
import { MenuModal } from './components/MenuModal';
import { ReservationModal } from './components/ReservationModal';
import { StoriesModal } from './components/StoriesModal';
import { BagDrawer } from './components/BagDrawer';
import { FunctionsModal } from './components/FunctionsModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  // Mode state: 'lunch' (☀️ Lunch Hub) or 'night' (🌙 Cabaret & Night)
  const [mode, setMode] = useState<AppMode>('lunch');

  // Bottom Navigation state (Home, Live Entertainment, Dine-In, Lunch, Dinner, Contact Us)
  const [activeBottomAction, setActiveBottomAction] = useState<BottomNavAction>('home');
  const [menuInitialCategory, setMenuInitialCategory] = useState<string>('all');

  // Modal screen states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isFunctionsOpen, setIsFunctionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Story state
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [highlightDishId, setHighlightDishId] = useState<string | null>(null);

  // Cart / Bag state (Pre-seeded with 1 dish as shown with the red badge '1' in the reference screenshot)
  const [cart, setCart] = useState<CartItem[]>([
    {
      item: MENU_ITEMS[3], // Hand-Rolled Truffle Tagliatelle
      quantity: 1,
    }
  ]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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

  // Bottom Navigation tab selector (Home, Live Entertainment, Dine-In, Lunch, Dinner, Contact Us)
  const handleBottomNavigate = (action: BottomNavAction) => {
    setActiveBottomAction(action);
    if (action === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'entertainment') {
      setSelectedStoryIndex(0);
      setIsStoriesOpen(true);
    } else if (action === 'dine-in') {
      setIsReserveOpen(true);
    } else if (action === 'lunch') {
      setMenuInitialCategory('lunch');
      setIsMenuOpen(true);
    } else if (action === 'dinner') {
      setMenuInitialCategory('night');
      setIsMenuOpen(true);
    } else if (action === 'contact') {
      const el = document.getElementById('find-us-footer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('our-story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#121619] text-[#f5f1ea] transition-colors duration-700 ${
      mode === 'night' ? 'night-atmosphere' : 'lunch-atmosphere'
    }`}>
      
      {/* Fixed Top Header (Home, Live Entertainment, Dine in, Online Orders, Reserve a space, Contact | 45-deg Ticket ribbon) */}
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
        onOpenContact={() => {
          const el = document.getElementById('find-us-footer');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        cartCount={totalCartCount}
      />

      {/* Main Editorial Screens matching the Reference Mockup */}
      <main className="relative">
        
        {/* 1. Hero Section ("The true taste of Flame International • 2026 •") */}
        <HeroSection
          mode={mode}
          onExploreMenu={() => setIsMenuOpen(true)}
          onBookTable={() => setIsReserveOpen(true)}
          onScrollToStory={scrollToStory}
        />

        {/* 2. Discover Our Story (Persian Live Events & Heritage + September 12 Concert Poster) */}
        <StorySection
          mode={mode}
          onLearnMore={() => setIsAboutOpen(true)}
          onReserve={() => setIsReserveOpen(true)}
        />

        {/* 3. Madie Section (Burgundy wave + French Bulldog vector + draggable 3D story card stack) */}
        <MadieStoriesSection
          onOpenStory={handleOpenStory}
          mode={mode}
        />

        {/* 4. Check out Our Menus (2x2 food photo grid + "Check out Our Menus" narrative) */}
        <MenuSection
          mode={mode}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenDish={handleOpenDish}
        />

        {/* 5. Culinary Delightful (Gourmet quenelles + spun caramel sugar dessert + "Culinary Delightful") */}
        <CulinarySection
          mode={mode}
          onMakeReservation={() => setIsReserveOpen(true)}
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

      {/* Sticky Bottom Navigation (Home, Live Entertainment, Dine-In, Lunch, Dinner, Contact Us) */}
      <BottomStickyNav
        mode={mode}
        activeAction={activeBottomAction}
        onNavigate={handleBottomNavigate}
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
          if (activeBottomAction === 'dine-in') setActiveBottomAction('home');
        }}
      />

      {/* Live Stories Fullscreen Viewer */}
      <StoriesModal
        isOpen={isStoriesOpen}
        onClose={() => {
          setIsStoriesOpen(false);
          if (activeBottomAction === 'entertainment') setActiveBottomAction('home');
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
