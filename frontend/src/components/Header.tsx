import React, { useState } from 'react';
import { AuthUser, LayoutDirection, ViewMode } from '../types';
import {
  Search,
  Heart,
  PlusCircle,
  Sparkles,
  Grid,
  Columns3,
  LayoutTemplate,
  Menu,
  X,
  MapPin,
  CheckCircle2,
  Store,
  Compass,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  layoutDirection: LayoutDirection;
  onSelectLayoutDirection: (direction: LayoutDirection) => void;
  savedCount: number;
  onOpenRegisterModal: () => void;
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  layoutDirection,
  onSelectLayoutDirection,
  savedCount,
  onOpenRegisterModal,
  currentUser,
  onOpenLogin,
  onOpenSignup,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);

  const directions: { id: LayoutDirection; label: string; icon: React.ReactNode; badge: string; desc: string }[] = [
    {
      id: 'flyer-feed',
      label: 'Flyer Feed',
      icon: <Columns3 className="w-4 h-4" />,
      badge: 'WhatsApp Vibe',
      desc: 'Rotated stamp flyers, status stories & visual highlight cards'
    },
    {
      id: 'marketplace-grid',
      label: 'Marketplace Grid',
      icon: <Grid className="w-4 h-4" />,
      badge: 'Fiverr / Airbnb',
      desc: 'Clean structured cards, quick price tags & filter drawer'
    },
    {
      id: 'bento-spotlight',
      label: 'Bento Spotlight',
      icon: <LayoutTemplate className="w-4 h-4" />,
      badge: 'Modern Bento',
      desc: 'Asymmetric spotlight grid featuring top student vendors'
    }
  ];

  const currentLayoutInfo = directions.find(d => d.id === layoutDirection) || directions[0];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] transition-all">
      {/* Top UNILAG Notice Banner */}
      <div className="bg-[#18181B] text-zinc-200 text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1 bg-[#E11D48] text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide font-display">
              UNILAG DIRECTORY
            </span>
            <span className="truncate text-zinc-300">
              Connecting 150+ student businesses across Moremi, Jaja, Amina, Mariere & Akoka campus!
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] opacity-90 font-medium text-zinc-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> 100% Student Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" /> Direct WhatsApp Chat
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectView('home')} 
            className="flex items-center gap-2.5 text-left group transition"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#E11D48] text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              U
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg sm:text-2xl tracking-tight text-[#18181B]">
                  Uni<span className="text-[#E11D48]">Vendor</span>
                </span>
                <span className="hidden sm:inline-block bg-[#FFE4E6] text-[#E11D48] border border-[#E11D48]/20 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full font-display">
                  UNILAG
                </span>
              </div>
              <p className="text-[11px] text-[#52525B] font-medium hidden sm:block">
                Campus Student Business Directory
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F4F4F5] p-1 rounded-2xl border border-[#E5E5E5]">
          <button
            onClick={() => onSelectView('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all font-display ${
              currentView === 'home'
                ? 'bg-white text-[#18181B] shadow-xs'
                : 'text-[#52525B] hover:text-[#18181B]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#E11D48]" />
            Discover
          </button>
          
          <button
            onClick={() => onSelectView('directory')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all font-display ${
              currentView === 'directory'
                ? 'bg-white text-[#18181B] shadow-xs'
                : 'text-[#52525B] hover:text-[#18181B]'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-[#10B981]" />
            All Vendors
          </button>

          <button
            onClick={() => onSelectView('saved')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all font-display relative ${
              currentView === 'saved'
                ? 'bg-white text-[#18181B] shadow-xs'
                : 'text-[#52525B] hover:text-[#18181B]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#E11D48]" />
            Bookmarks
            {savedCount > 0 && (
              <span className="ml-1 bg-[#E11D48] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Layout Variation Picker */}
          <div className="relative">
            <button
              onClick={() => setShowLayoutMenu(!showLayoutMenu)}
              className="flex items-center gap-2 bg-[#FFE4E6]/70 border border-[#FECDD3] hover:border-[#E11D48] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-[#18181B] transition shadow-xs font-display"
              title="Compare layout variations"
            >
              <span className="text-[#E11D48]">{currentLayoutInfo.icon}</span>
              <span className="hidden xl:inline">{currentLayoutInfo.label}</span>
              <span className="hidden sm:inline bg-[#E11D48]/10 text-[#E11D48] text-[10px] px-1.5 py-0.5 rounded-md font-extrabold">
                {currentLayoutInfo.badge}
              </span>
            </button>

            {showLayoutMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E5E5E5] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[#F4F4F5] mb-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-xs text-[#18181B] uppercase tracking-wider">
                      Layout Variations
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                  </div>
                  <p className="text-[11px] text-[#52525B] mt-0.5">
                    Compare UI directions for Home & Listings
                  </p>
                </div>

                <div className="space-y-1">
                  {directions.map((dir) => (
                    <button
                      key={dir.id}
                      onClick={() => {
                        onSelectLayoutDirection(dir.id);
                        setShowLayoutMenu(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 ${
                        layoutDirection === dir.id
                          ? 'bg-[#FFE4E6]/50 border border-[#E11D48]/30'
                          : 'hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg mt-0.5 ${layoutDirection === dir.id ? 'bg-[#E11D48] text-white' : 'bg-[#F4F4F5] text-[#18181B]'}`}>
                        {dir.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-xs text-[#18181B]">{dir.label}</span>
                          <span className="text-[9px] font-extrabold bg-[#10B981]/10 text-[#10B981] px-1.5 py-0.2 rounded">
                            {dir.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#52525B] leading-tight mt-0.5">{dir.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth: Sign In / Sign Up, or the signed-in user's chip */}
          {currentUser ? (
            <div className="hidden lg:flex items-center gap-1.5 bg-[#F4F4F5] pl-3 pr-1.5 py-1 rounded-xl border border-[#E5E5E5]">
              <span className="text-xs font-bold text-[#18181B] font-display truncate max-w-[140px]" title={currentUser.email}>
                {currentUser.email}
              </span>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-[#52525B] hover:text-[#E11D48] hover:bg-white transition"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-1.5">
              <button
                onClick={onOpenLogin}
                className="text-xs font-bold font-display text-[#18181B] hover:text-[#E11D48] px-2.5 py-2 transition"
              >
                Sign In
              </button>
              <button
                onClick={onOpenSignup}
                className="flex items-center gap-1.5 bg-[#18181B] hover:bg-black active:scale-95 text-white text-xs font-bold font-display px-3.5 py-2 rounded-xl shadow-xs transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* List Your Student Business Button */}
          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-1.5 bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white text-xs font-bold font-display px-3.5 py-2 rounded-xl shadow-xs transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xl:inline">Add Student Business</span>
            <span className="hidden sm:inline xl:hidden">Add Vendor</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#18181B] hover:bg-[#F4F4F5] rounded-xl transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5E5] bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onSelectView('home');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-center text-xs font-bold font-display flex flex-col items-center gap-1 ${
                currentView === 'home' ? 'bg-[#E11D48] text-white' : 'bg-[#F4F4F5] text-[#18181B]'
              }`}
            >
              <Compass className="w-4 h-4" />
              Discover
            </button>
            <button
              onClick={() => {
                onSelectView('directory');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-center text-xs font-bold font-display flex flex-col items-center gap-1 ${
                currentView === 'directory' ? 'bg-[#10B981] text-white' : 'bg-[#F4F4F5] text-[#18181B]'
              }`}
            >
              <Store className="w-4 h-4" />
              All Vendors
            </button>
            <button
              onClick={() => {
                onSelectView('saved');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-center text-xs font-bold font-display flex flex-col items-center gap-1 relative ${
                currentView === 'saved' ? 'bg-[#E11D48] text-white' : 'bg-[#F4F4F5] text-[#18181B]'
              }`}
            >
              <Heart className="w-4 h-4" />
              Saved
              {savedCount > 0 && (
                <span className="absolute top-1 right-2 bg-[#E11D48] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

          {/* Auth: Sign In / Sign Up, or the signed-in user's row */}
          {currentUser ? (
            <div className="p-2.5 bg-[#F4F4F5] rounded-xl border border-[#E5E5E5] flex items-center justify-between">
              <span className="text-xs font-bold text-[#18181B] font-display truncate" title={currentUser.email}>
                {currentUser.email}
              </span>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 text-xs font-display font-bold text-[#E11D48]"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-center text-xs font-bold font-display flex items-center justify-center gap-1.5 bg-[#F4F4F5] text-[#18181B]"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              <button
                onClick={() => {
                  onOpenSignup();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-center text-xs font-bold font-display flex items-center justify-center gap-1.5 bg-[#18181B] text-white"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          )}

          <div className="p-2.5 bg-[#FFE4E6]/50 rounded-xl border border-[#FECDD3] flex items-center justify-between">
            <div className="text-xs font-body">
              <span className="font-bold text-[#18181B] block">Active Layout: {currentLayoutInfo.label}</span>
              <span className="text-[11px] text-[#52525B]">{currentLayoutInfo.desc}</span>
            </div>
            <button
              onClick={() => setShowLayoutMenu(true)}
              className="text-xs font-display font-bold text-[#E11D48] underline"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
