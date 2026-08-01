import React from 'react';
import { Category, CategoryId } from '../types';
import {
  Utensils, 
  Shirt, 
  Scissors, 
  Smartphone, 
  Camera, 
  Palette, 
  BookOpen, 
  Sparkles, 
  Sparkle, 
  Gift,
  LayoutGrid
} from 'lucide-react';

interface CategoryChipsProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-3.5 h-3.5" />;
      case 'Shirt': return <Shirt className="w-3.5 h-3.5" />;
      case 'Scissors': return <Scissors className="w-3.5 h-3.5" />;
      case 'Smartphone': return <Smartphone className="w-3.5 h-3.5" />;
      case 'Camera': return <Camera className="w-3.5 h-3.5" />;
      case 'Palette': return <Palette className="w-3.5 h-3.5" />;
      case 'BookOpen': return <BookOpen className="w-3.5 h-3.5" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5" />;
      case 'Sparkle': return <Sparkle className="w-3.5 h-3.5" />;
      case 'Gift': return <Gift className="w-3.5 h-3.5" />;
      default: return <LayoutGrid className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max px-1">
        {/* All Categories Chip */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold font-display transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#E11D48] text-white shadow-xs scale-105'
              : 'bg-white text-[#18181B] border border-[#E5E5E5] hover:border-[#E11D48]/50 hover:bg-[#FFE4E6]/20'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>All Services</span>
        </button>

        {/* Individual Category Chips */}
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold font-display transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#E11D48] text-white shadow-xs scale-105'
                  : 'bg-white text-[#18181B] border border-[#E5E5E5] hover:border-[#E11D48]/40 hover:bg-[#FFE4E6]/20'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-[#E11D48]'}>
                {getIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
