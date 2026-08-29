import React, { useState } from 'react';
import { X, Search, Filter, Plus, Check, Sparkles, Utensils, Wine, Moon, Sun } from 'lucide-react';
import { MenuItem, AppMode } from '../types';
import { MENU_ITEMS } from '../data/mockData';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  highlightDishId?: string | null;
  initialCategory?: string;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  mode,
  onToggleMode,
  highlightDishId,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (initialCategory && isOpen) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'lunch', label: '☀️ Lunch Hub' },
    { id: 'small-plates', label: 'Small Plates' },
    { id: 'pasta-mains', label: 'Handmade Pasta & Mains' },
    { id: 'night', label: '🌙 Cabaret & Night Bites' },
    { id: 'desserts', label: 'Artisan Desserts' },
    { id: 'cocktails', label: 'Cocktails & Spritz' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = selectedDiet === 'all' || (item.tags && item.tags.some(t => t.toLowerCase() === selectedDiet.toLowerCase()));
    
    return matchesCategory && matchesSearch && matchesDiet;
  });

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#14181c] border border-[#2e3640] text-[#f5f1ea] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#242b33] flex items-center justify-between bg-[#191e24]/90 backdrop-blur-md">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-script text-[#d4a359] text-3xl">Flame</span>
              <span className="text-xs uppercase tracking-widest text-[#a8b3bf] font-mono">• Menu</span>
            </div>
            <p className="text-xs text-[#8c9ba8]">Seasonally inspired artisan small plates &amp; kitchen craft</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Mode Switcher - Compact */}
            <div className="hidden sm:flex items-center bg-[#21272f] p-0.5 rounded-full border border-[#37414e]">
              <button
                onClick={() => onToggleMode('lunch')}
                className={`px-2.5 py-0.5 text-[10px] rounded-full transition-all flex items-center space-x-1 font-bold ${
                  mode === 'lunch' ? 'bg-[#d4731f] text-white shadow-sm' : 'text-[#8b98a5] hover:text-white'
                }`}
              >
                <Sun size={10} />
                <span>Lunch</span>
              </button>
              <button
                onClick={() => onToggleMode('night')}
                className={`px-2.5 py-0.5 text-[10px] rounded-full transition-all flex items-center space-x-1 font-bold ${
                  mode === 'night' ? 'bg-[#6b152d] text-white shadow-sm' : 'text-[#8b98a5] hover:text-white'
                }`}
              >
                <Moon size={10} />
                <span>Night</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#20262e] hover:bg-[#2c3540] text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="px-6 py-4 bg-[#171c22] border-b border-[#242b33] space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#7e8d9c]" />
              <input
                type="text"
                placeholder="Search dishes, pasta, wine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e242c] border border-[#2e3742] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#687685] focus:outline-none focus:border-[#d4a359]"
              />
            </div>

            {/* Dietary Tags Quick Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-[11px] text-[#7e8d9c] uppercase font-mono tracking-wider">Filter:</span>
              {['all', 'Vegetarian', 'Gluten-Free', 'Chef Special', 'Signature'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedDiet(tag)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
                    selectedDiet === tag
                      ? 'bg-[#d4a359] text-black font-semibold'
                      : 'bg-[#202730] text-[#a5b4c4] hover:bg-[#2a3440]'
                  }`}
                >
                  {tag === 'all' ? 'All Diets' : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#d4a359] text-black shadow-md font-bold'
                    : 'bg-[#1e252d] text-[#b0bec5] hover:bg-[#28323d] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid Items */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 text-center py-16 text-[#758494]">
              <Utensils size={36} className="mx-auto mb-3 opacity-40" />
              <p className="text-base font-serif">No dishes found matching your criteria</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedDiet('all'); }}
                className="mt-3 text-xs text-[#d4a359] underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredItems.map((dish) => {
              const isAdded = addedItemIds[dish.id];
              const isHighlighted = highlightDishId === dish.id;

              return (
                <div
                  key={dish.id}
                  className={`group relative bg-[#1a2027] border rounded-2xl p-4 sm:p-5 flex gap-4 items-start transition-all hover:border-[#d4a359]/60 hover:shadow-lg ${
                    isHighlighted ? 'border-[#d4a359] ring-2 ring-[#d4a359]/30 bg-[#202730]' : 'border-[#29323c]'
                  }`}
                >
                  {/* Dish Thumbnail */}
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-[#121619]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {dish.availableInMode === 'lunch' && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#d4731f] text-white text-[8px] font-bold rounded uppercase">
                        Lunch
                      </span>
                    )}
                    {dish.availableInMode === 'night' && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#6b152d] text-white text-[8px] font-bold rounded uppercase">
                        Night
                      </span>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 flex flex-col justify-between min-h-24">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base sm:text-lg text-white font-medium leading-snug group-hover:text-[#d4a359] transition-colors">
                          {dish.name}
                        </h4>
                        <span className="font-mono text-sm font-semibold text-[#f5d79e] shrink-0">
                          ${dish.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-[#98a6b5] leading-relaxed mt-1 line-clamp-2">
                        {dish.description}
                      </p>

                      {dish.pairing && (
                        <p className="text-[10px] text-[#d4a359]/90 mt-1.5 flex items-center space-x-1 font-mono">
                          <Wine size={11} />
                          <span>Pairing: {dish.pairing}</span>
                        </p>
                      )}
                    </div>

                    {/* Tags & Add to Bag button */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#252e37]">
                      <div className="flex flex-wrap gap-1">
                        {dish.tags?.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-[#252e38] text-[#bcc8d4] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleAdd(dish)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-[#2e7d32] text-white scale-105'
                            : 'bg-[#d4a359] hover:bg-[#e2b775] text-black'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={13} />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus size={13} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        <div className="px-6 py-4 bg-[#171c22] border-t border-[#242b33] flex items-center justify-between text-xs text-[#8c9ba8]">
          <span>* All dishes prepared fresh with ingredients from Chamberí local markets.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#242c36] hover:bg-[#323d4a] text-white font-medium text-xs uppercase tracking-wider"
          >
            Close Menu
          </button>
        </div>

      </div>
    </div>
  );
};
