import { Category } from '../types';

type CategoryPresentation = Pick<Category, 'iconName' | 'stampLabel' | 'stampBg' | 'stampText' | 'cardBg' | 'description' | 'popularServices'>;

export const CATEGORY_PRESENTATION: Record<string, CategoryPresentation> = {
  catering: {
    iconName: 'Cosmetics',
    stampLabel: 'SCENTED DESIRE ✨',
    stampBg: '#FFE4E6',
    stampText: '#FF385C',
    cardBg: '#FFFFFF',
    description: 'Fragrances that linger and leave a mark. Get a FREE small gift with every order this week!',
    popularServices: ['Fragrances', 'Candles', 'Gift Sets', 'Diffusers','Perfume Oils']
  },
  fashion: {
    iconName: 'Shirt',
    stampLabel: 'Y2K & NATIVE 👗',
    stampBg: '#CCFBF1',
    stampText: '#0D9488',
    cardBg: '#FFFFFF',
    description: 'Bespoke senator suits, custom gowns, thrift Y2K clothes, and instant alterations.',
    popularServices: ['Senator Suit Sewing', 'Dinner Gown Tailoring', 'Thrift Y2K Drop', 'Denim Revamp', 'AsoEbi Fitting']
  },
  hairdressing: {
    iconName: 'Scissors',
    stampLabel: 'HALL CUTS & BRAIDS 💇‍♀️',
    stampBg: '#FEF3C7',
    stampText: '#D97706',
    cardBg: '#FFFFFF',
    description: 'Knotless braids, skin fades, wig revamping, locs maintenance right in hall rooms.',
    popularServices: ['Knotless Braids', 'Gentleman Skin Fade', 'Wig Revamping & Dye', 'Dreadlock Relocking', 'Cornrows']
  },
  'tech-repair': {
    iconName: 'Smartphone',
    stampLabel: 'EXPRESS FIX 💻',
    stampBg: '#FFF1F2',
    stampText: '#E11D48',
    cardBg: '#FFFFFF',
    description: 'iPhone screen & battery replacement, MacBook SSD upgrades, OS flashing, liquid damage fix.',
    popularServices: ['iPhone Screen Fix', 'MacBook SSD Upgrade', 'Laptop Battery Replacement', 'OS Reinstall', 'Charger Repair']
  },
  photography: {
    iconName: 'Camera',
    stampLabel: 'CAMPUS SNAPS 📸',
    stampBg: '#FEF3C7',
    stampText: '#D97706',
    cardBg: '#FFFFFF',
    description: 'Matriculation shoots, convocation portraits, birthday reels, and brand product shoots.',
    popularServices: ['Matriculation Outdoor Shoot', 'Studio Birthday Portraits', 'Instagram Reel Edit', 'Faculty Group Snap']
  },
  'graphic-design': {
    iconName: 'Palette',
    stampLabel: 'FLYERS & BRANDING 🎨',
    stampBg: '#FFE4E6',
    stampText: '#E11D48',
    cardBg: '#FFFFFF',
    description: 'WhatsApp flyer designs, logo branding, Canva templates, project UI mockups, vinyl printing.',
    popularServices: ['WhatsApp Status Flyer', 'Brand Logo & Kit', 'Canva Presentation', 'Banner & Vinyl Print', 'UI Mockup']
  },
  tutoring: {
    iconName: 'BookOpen',
    stampLabel: 'EXAM READY 📚',
    stampBg: '#ECFDF5',
    stampText: '#059669',
    cardBg: '#FFFFFF',
    description: 'GST/MAT/PHY crash courses, 1-on-1 calculus tutoring, lab report guidance, coding crash course.',
    popularServices: ['MAT101 Crash Course', 'PHY107 Lab Prep', 'Calculus 1-on-1', 'Python/JS Tutoring', 'Project Proofreading']
  },
  cosmetics: {
    iconName: 'Sparkles',
    stampLabel: 'GLOW & GLAM 💄',
    stampBg: '#FFE4E6',
    stampText: '#E11D48',
    cardBg: '#FFFFFF',
    description: 'Organic skincare body butter, lip gloss, lash extensions, hall glam makeup for dinner nights.',
    popularServices: ['Dinner Glam Makeup', 'Lash Extension Set', 'Hydrating Lip Gloss', 'Whipped Shea Butter', 'Nail Tech Art']
  },
  laundry: {
    iconName: 'Sparkle',
    stampLabel: 'FRESH & CLEAN 🧺',
    stampBg: '#DCFCE7',
    stampText: '#16A34A',
    cardBg: '#FFFFFF',
    description: 'Doorstep pickup in all halls, steam ironing, sneaker deep wash, duvet dry cleaning.',
    popularServices: ['Hall Doorstep Pickup', 'Sneaker Deep Wash', 'Suit Steam Ironing', 'Duvet & Sheet Wash', 'Weekly Bag Laundry']
  },
  events: {
    iconName: 'Gift',
    stampLabel: 'HALL SURPRISE 🎁',
    stampBg: '#FEF3C7',
    stampText: '#B45309',
    cardBg: '#FFFFFF',
    description: 'Birthday surprise boxes, hall room romantic setup, balloon arch, sound system rentals.',
    popularServices: ['Birthday Surprise Box', 'Hall Room Decor', 'Saxophone Serenade', 'Sound System Rental', 'Custom Hampers']
  }
};

const DEFAULT_PRESENTATION: CategoryPresentation = {
  iconName: 'LayoutGrid',
  stampLabel: 'STUDENT VENDOR ✨',
  stampBg: '#F4F4F5',
  stampText: '#52525B',
  cardBg: '#FFFFFF',
  description: 'Student-run service available across UNILAG campus halls.',
  popularServices: []
};

export function getCategoryPresentation(slug: string): CategoryPresentation {
  return CATEGORY_PRESENTATION[slug] || DEFAULT_PRESENTATION;
}

export const UNILAG_HALLS = [
  'Moremi Hall',
  'Jaja Hall',
  'Eni Njoku Hall',
  'Kofo Ademola Hall',
  'Makama Hall',
  'Amina Hall',
  'Fagunwa Hall',
  'Biobaku Hall',
  'El Kanemi Hall',
  'Mariere Hall',
  'Sodeinde Hall',
  'Off-Campus (Akoka / Bariga / Yaba)'
] as const;

export const UNILAG_FACULTIES = [
  'Faculty of Arts',
  'Faculty of Engineering',
  'Faculty of Science',
  'Faculty of Law',
  'Faculty of Social Sciences',
  'Faculty of Management Sciences',
  'College of Medicine / Clinical Sciences',
  'Faculty of Environmental Sciences',
  'Faculty of Education'
] as const;
