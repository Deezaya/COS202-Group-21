import React from 'react';
import { Category, CategoryId } from '../types';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Star,
  MessageCircle,
  LayoutGrid,
  Users,
  MapPin,
  Sparkles,
  Utensils,
  Shirt,
  Scissors,
  Smartphone,
  Camera,
  Palette,
  BookOpen,
  Sparkle,
  Gift
} from 'lucide-react';

interface LandingViewProps {
  categories: Category[];
  onNavigateToDirectory: (categoryId?: CategoryId, searchQuery?: string) => void;
  onOpenSignup: () => void;
  onOpenLogin: () => void;
  onOpenRegisterModal: () => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Utensils': return <Utensils className="w-5 h-5" />;
    case 'Shirt': return <Shirt className="w-5 h-5" />;
    case 'Scissors': return <Scissors className="w-5 h-5" />;
    case 'Smartphone': return <Smartphone className="w-5 h-5" />;
    case 'Camera': return <Camera className="w-5 h-5" />;
    case 'Palette': return <Palette className="w-5 h-5" />;
    case 'BookOpen': return <BookOpen className="w-5 h-5" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5" />;
    case 'Sparkle': return <Sparkle className="w-5 h-5" />;
    case 'Gift': return <Gift className="w-5 h-5" />;
    default: return <LayoutGrid className="w-5 h-5" />;
  }
};

const PAIN_POINTS: { icon: React.ReactNode; text: string }[] = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    text: '"Does anyone have a good braider\'s contact?" — posted in five different hall group chats.'
  },
  {
    icon: <Search className="w-5 h-5" />,
    text: 'Scrolling through IG explore hoping a vendor\'s story hasn\'t already expired.'
  },
  {
    icon: <Users className="w-5 h-5" />,
    text: 'Asking around your faculty because there\'s no way to check reviews first.'
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    text: 'No way to tell if a vendor is an actual matriculated student or a random reseller.'
  }
];

const FEATURES: { icon: React.ReactNode; title: string; text: string }[] = [
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    title: 'Categorized Directory',
    text: 'Every student business organized by service — catering, fashion, tech repair, and more.'
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Verified Badges',
    text: 'Vendors are matriculated UNILAG students, checked and marked verified.'
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'Ratings & Reviews',
    text: 'Real feedback from students who\'ve actually used the service before you do.'
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Direct WhatsApp Connect',
    text: 'Skip the middleman — chat straight with the vendor, no bidding or bookings.'
  }
];

export const LandingView: React.FC<LandingViewProps> = ({
  categories,
  onNavigateToDirectory,
  onOpenSignup,
  onOpenLogin,
  onOpenRegisterModal
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFE4E6]/40 via-white to-[#FAFAFA] border border-[#E5E5E5] p-6 sm:p-12 shadow-warm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1.5 bg-[#FFE4E6] text-[#E11D48] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full font-display tracking-wide">
              <Sparkles className="w-3 h-3" />
              Built for UNILAG Students
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#18181B] tracking-tight leading-[1.1]">
              Stop hunting WhatsApp statuses for a <span className="text-[#E11D48]">braider</span> or a <span className="text-[#E11D48]">phone repair guy</span>.
            </h1>

            <p className="text-sm sm:text-base text-[#52525B] font-body leading-relaxed max-w-lg">
              There's no central place to find student-run businesses at UNILAG — everyone relies on
              scattered WhatsApp groups, IG DMs, and word-of-mouth. UniVendor puts every vendor in one
              categorized directory, with verified badges and real ratings from students who've been there.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateToDirectory()}
                className="flex items-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white font-display font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition"
              >
                <Search className="w-4 h-4" />
                Explore the Directory
              </button>
              <button
                onClick={onOpenSignup}
                className="flex items-center gap-2 bg-white hover:bg-[#FAFAFA] border border-[#E5E5E5] text-[#18181B] font-display font-extrabold text-sm px-6 py-3.5 rounded-2xl transition"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#52525B] font-body">
              Already have an account?{' '}
              <button onClick={onOpenLogin} className="font-bold text-[#E11D48] hover:underline">
                Sign in
              </button>
            </p>
          </div>

          {/* Before / After mockup - built from the app's own visual language, not stock photography */}
          <div className="relative bg-white/70 backdrop-blur-sm border border-[#E5E5E5] rounded-3xl p-5 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-[#94A3B8] font-display tracking-wide">
                  The Old Way
                </span>
                <div className="space-y-1.5">
                  {['"anyone know a braider?" 😩', 'DM for prices...', '20+ unread group chats', 'IG story expired ✗'].map(
                    (text, i) => (
                      <div
                        key={text}
                        style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + i)}deg)` }}
                        className="bg-zinc-100 border border-zinc-200 text-zinc-500 text-[10px] font-medium px-2.5 py-2 rounded-xl"
                      >
                        {text}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-[#059669] font-display tracking-wide">
                  The UniVendor Way
                </span>
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-3 shadow-warm space-y-2.5">
                  <div
                    className="stamp-tag font-display text-[9px] py-0.5 px-2 inline-flex"
                    style={{ backgroundColor: '#FFE4E6', color: '#E11D48', borderColor: '#E11D48' }}
                  >
                    HALL CUTS & BRAIDS 💇‍♀️
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E11D48] text-white flex items-center justify-center font-display font-extrabold text-xs shrink-0">
                      T
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-display font-extrabold text-xs text-[#18181B] truncate">
                          Titi's Braids Room
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                      </div>
                      <span className="text-[10px] text-[#52525B] flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        Moremi Hall
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F4F4F5]">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#18181B]">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      4.9 <span className="text-[#52525B] font-normal">(38)</span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-[#E11D48] px-2 py-1 rounded-lg">
                      <MessageCircle className="w-3 h-3" />
                      Chat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="space-y-5">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#18181B] text-center">
          Sound familiar?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.text}
              className="p-4 bg-white border border-[#E5E5E5] rounded-2xl shadow-warm space-y-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F4F4F5] text-[#52525B] flex items-center justify-center">
                {point.icon}
              </div>
              <p className="text-xs text-[#52525B] font-body leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="space-y-5">
        <div className="text-center space-y-1.5">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#18181B]">
            Everything changes with UniVendor
          </h2>
          <p className="text-xs sm:text-sm text-[#52525B] font-body">
            One directory. Every hall. Every faculty.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-4 bg-white border border-[#E5E5E5] rounded-2xl shadow-warm shadow-warm-hover space-y-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-display font-extrabold text-sm text-[#18181B]">{feature.title}</h3>
              <p className="text-xs text-[#52525B] font-body leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#18181B]">
              Browse by Service Category
            </h2>
            <button
              onClick={() => onNavigateToDirectory()}
              className="text-xs font-bold font-display text-[#E11D48] hover:underline flex items-center gap-1 shrink-0"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigateToDirectory(cat.id)}
                className="text-left p-4 bg-white border border-[#E5E5E5] hover:border-[#E11D48]/50 rounded-2xl shadow-warm shadow-warm-hover transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: cat.stampBg, color: cat.stampText }}
                >
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h3 className="font-display font-extrabold text-sm text-[#18181B] group-hover:text-[#E11D48] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#52525B] font-body mt-1 line-clamp-2">{cat.description}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Trust Stats Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: '150+', label: 'Student Businesses' },
          { value: '9+', label: 'Service Categories' },
          { value: '11', label: 'Campus Halls Covered' },
          { value: '100%', label: 'Student Verified' }
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 sm:p-5 bg-white border border-[#E5E5E5] rounded-2xl shadow-warm text-center"
          >
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#E11D48] block">
              {stat.value}
            </span>
            <span className="text-[11px] text-[#52525B] font-body">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="p-6 sm:p-10 bg-[#18181B] text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#27272A]">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            Find your next vendor in seconds.
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-xl font-body">
            Create a free account to save vendors, leave reviews, and request verification for your own
            business — or just browse the directory as a guest.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onOpenSignup}
            className="bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white font-display font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition whitespace-nowrap"
          >
            Sign Up Free
          </button>
          <button
            onClick={onOpenRegisterModal}
            className="text-xs font-display font-bold text-white/80 hover:text-white underline underline-offset-2 whitespace-nowrap"
          >
            List your business instead
          </button>
        </div>
      </section>
    </div>
  );
};
