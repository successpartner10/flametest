import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Sparkles } from 'lucide-react';
import { AppMode } from '../../types';

interface MenuItem {
  Category: string;
  CategoryOrder: string;
  CategoryImage: string;
  Item: string;
  Description: string;
  Price: string;
}

interface MenuCategory {
  name: string;
  order: number;
  image: string;
  items: MenuItem[];
}

interface MenuSectionProps {
  mode: AppMode;
  csvPath?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  mode,
  csvPath = '/menu.csv',
}) => {
  const isNight = mode === 'night';
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(csvPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load menu (${res.status})`);
        return res.text();
      })
      .then((csvText) => {
        const result = Papa.parse<MenuItem>(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          transform: (v) => v.trim(),
        });

        // Group rows by Category
        const map = new Map<string, MenuCategory>();
        for (const row of result.data) {
          if (!row.Category || !row.Item) continue;
          if (!map.has(row.Category)) {
            map.set(row.Category, {
              name: row.Category,
              order: parseInt(row.CategoryOrder, 10) || 99,
              image: row.CategoryImage || '',
              items: [],
            });
          }
          map.get(row.Category)!.items.push(row);
        }

        const sorted = Array.from(map.values()).sort((a, b) => a.order - b.order);
        setCategories(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [csvPath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 space-x-3">
        <Sparkles className="w-5 h-5 text-[#d4a359] animate-pulse" />
        <span className={`text-sm font-medium ${isNight ? 'text-[#f5d79e]' : 'text-stone-500'}`}>
          Loading menu…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-2xl text-sm ${isNight ? 'bg-[#1b050f] text-red-300' : 'bg-red-50 text-red-700'}`}>
        ⚠️ Menu could not be loaded: {error}
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {categories.map((cat) => (
        <section key={cat.name}>
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-5">
            <Sparkles size={16} className="text-[#d4a359] shrink-0" />
            <h2
              className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'
              }`}
            >
              {cat.name}
            </h2>
            <div className={`flex-1 h-px ${isNight ? 'bg-[#38081a]' : 'bg-stone-200'}`} />
          </div>

          {/* Category Photo */}
          {cat.image && (
            <figure className="mb-6 rounded-3xl overflow-hidden shadow-2xl border border-stone-300/20">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full object-cover max-h-[320px] hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </figure>
          )}

          {/* Menu Items Table */}
          <div
            className={`overflow-x-auto rounded-2xl border shadow-sm ${
              isNight ? 'border-[#38081a] bg-[#14040b]' : 'border-stone-200 bg-stone-50'
            }`}
          >
            <table className="w-full text-left text-sm sm:text-base border-collapse">
              <thead>
                <tr>
                  <th
                    className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-xs sm:text-sm w-1/4 ${
                      isNight
                        ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                        : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                    }`}
                  >
                    Dish
                  </th>
                  <th
                    className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-xs sm:text-sm ${
                      isNight
                        ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                        : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                    }`}
                  >
                    Description
                  </th>
                  <th
                    className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-xs sm:text-sm text-right w-24 ${
                      isNight
                        ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                        : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                    }`}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isNight
                        ? 'hover:bg-[#1c050e]'
                        : 'hover:bg-amber-50/60'
                    }`}
                  >
                    <td
                      className={`px-4 sm:px-6 py-4 border-b font-semibold align-top ${
                        isNight ? 'border-[#260511] text-white' : 'border-stone-200 text-stone-950'
                      }`}
                    >
                      {item.Item}
                    </td>
                    <td
                      className={`px-4 sm:px-6 py-4 border-b leading-relaxed align-top ${
                        isNight ? 'border-[#260511] text-gray-100' : 'border-stone-200 text-stone-900'
                      }`}
                    >
                      {item.Description}
                    </td>
                    <td
                      className={`px-4 sm:px-6 py-4 border-b text-right font-bold align-top whitespace-nowrap ${
                        isNight ? 'border-[#260511] text-[#f3cf8a]' : 'border-stone-200 text-[#9e1c38]'
                      }`}
                    >
                      {item.Price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Footer note */}
      <blockquote
        className={`border-l-4 border-[#d4a359] p-5 rounded-r-2xl italic shadow-sm text-sm ${
          isNight ? 'bg-[#1b050f] text-[#f5d79e]' : 'bg-amber-50/80 text-stone-700'
        }`}
      >
        All kababs are served with saffron basmati rice, grilled tomatoes, fresh herbs & warm Sangak bread.
        Gluten-free and vegetarian options available — please inform your server of any dietary requirements.
      </blockquote>
    </div>
  );
};
