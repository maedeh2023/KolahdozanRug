
import { Menu, X, ArrowUpLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import type { Lang, RouteView } from '../types';

interface NavbarProps {
  lang: Lang;
  onToggleLang: (next: Lang) => void;
  route: RouteView;
  onNavigate: (target: RouteView, sectionId?: string) => void;
  onOpenInquiry: (pieceCode?: string) => void;
}

export function Navbar({
  lang,
  onToggleLang,
  route,
  onNavigate,
  onOpenInquiry,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isFa = lang === 'fa';

  const navItems = [
    { id: 'hero', label: SITE_CONTENT.nav.home[lang] },
    { id: 'masterpieces', label: SITE_CONTENT.nav.masterpieces[lang] },
    { id: 'heritage', label: SITE_CONTENT.nav.heritage[lang] },
    { id: 'journal', label: SITE_CONTENT.nav.journal[lang] },
    { id: 'showroom', label: SITE_CONTENT.nav.showroom[lang] },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigate({ type: 'home' }, sectionId);
  };

  const handleRugClick = (slug: string) => {
    setMobileOpen(false);
    onNavigate({ type: 'rug', slug });
  };

  const handleInquiry = () => {
    setMobileOpen(false);
    onOpenInquiry(
      route.type === 'rug'
        ? route.slug === 'kld-isf-25q'
          ? 'KLD · ISF-25Q'
          : 'KLD · ISF-07P'
        : undefined
    );
  };

  const activeLink = (id: string) =>
    route.type === 'home' && route.section === id;

  const gold = '#D0AC6C';
  const burgundy = '#210B09';

  const rugButtonClass = (slug: string) => {
    const first = slug === 'kld-isf-25q';
    const active = route.type === 'rug' && route.slug === slug;
    const accent = first ? '#D0AC6C' : '#B77A62';

    return `border rounded-full px-3.5 py-2 text-[10px]
      font-serif-display tracking-wider transition-all duration-300
      ${active
        ? 'text-[#210B09] shadow-[0_0_12px_rgba(208,172,108,0.2)]'
        : 'bg-transparent hover:bg-[#D0AC6C]/10'
      }`;
  };

  return (
    <header
      dir={isFa ? 'rtl' : 'ltr'}
      className="sticky top-0 z-50 border-b border-[#A47C46]/40
      bg-[#210B09]/95 text-[#E8D5AF] backdrop-blur-xl
      shadow-[0_5px_25px_rgba(0,0,0,0.3)]"
    >
      {/* Main Navbar */}
      <div className="relative mx-auto flex h-[68px] max-w-[1440px]
      items-center justify-between px-4 sm:h-[78px] sm:px-8 lg:px-12">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center
          border border-[#D0AC6C]/30 rounded-sm text-[#D0AC6C]
          transition-all duration-300 hover:border-[#D0AC6C]
          hover:bg-[#D0AC6C]/10 lg:hidden"
        >
          {mobileOpen
            ? <X size={21} strokeWidth={1.2} />
            : <Menu size={21} strokeWidth={1.2} />
          }
        </button>

        {/* Brand - Centered on Mobile */}
        <button
          type="button"
          onClick={() => onNavigate({ type: 'home' }, 'hero')}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2
          -translate-y-1/2 flex-col items-center justify-center
          lg:static lg:translate-x-0 lg:translate-y-0"
        >
          <img
            src="./images/brand/logo-white.png"
            alt={SITE_CONTENT.brand.name[lang]}
            className="h-8 w-auto object-contain sm:h-10
            [filter:brightness(0)_saturate(100%)_invert(76%)_sepia(30%)_saturate(550%)_hue-rotate(1deg)_brightness(95%)]"
          />

          <span className="mt-0.5 whitespace-nowrap font-serif-display
          text-[9px] uppercase tracking-[0.2em] text-[#D0AC6C]
          sm:text-[10px]">
            {SITE_CONTENT.brand.name[lang]}
          </span>

         
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`group relative py-3 text-[13px]
              transition-colors duration-300 ${
                activeLink(item.id)
                  ? 'text-[#D0AC6C]'
                  : 'text-[#D8C6A7]/75 hover:text-[#E9D2A3]'
              }`}
            >
              {item.label}

              <span className={`absolute bottom-1 inset-x-0 h-px
              bg-[#D0AC6C] transition-transform duration-300
              ${activeLink(item.id)
                ? 'scale-x-100'
                : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Desktop Rug Selection */}
          <div className="hidden items-center gap-2 xl:flex">
            <button
              type="button"
              onClick={() => handleRugClick('kld-isf-25q')}
              style={{
                borderColor: route.type === 'rug' &&
                  route.slug === 'kld-isf-25q' ? gold : `${gold}55`,
                color: route.type === 'rug' &&
                  route.slug === 'kld-isf-25q' ? burgundy : gold,
                backgroundColor: route.type === 'rug' &&
                  route.slug === 'kld-isf-25q' ? gold : 'transparent',
              }}
              className={rugButtonClass('kld-isf-25q')}
            >
              KLD · ISF-25Q
            </button>

            <button
              type="button"
              onClick={() => handleRugClick('kld-isf-07p')}
              style={{
                borderColor: route.type === 'rug' &&
                  route.slug === 'kld-isf-07p' ? '#B77A62' : '#B77A6266',
                color: route.type === 'rug' &&
                  route.slug === 'kld-isf-07p' ? burgundy : '#D2A18A',
                backgroundColor: route.type === 'rug' &&
                  route.slug === 'kld-isf-07p' ? '#B77A62' : 'transparent',
              }}
              className={rugButtonClass('kld-isf-07p')}
            >
              KLD · ISF-07P
            </button>
          </div>

          {/* Language Switch */}
          <div className="flex items-center gap-1 border border-[#D0AC6C]/30
          rounded-full p-1 text-[9px]">
            {(['fa', 'en'] as Lang[]).map(language => (
              <button
                key={language}
                type="button"
                onClick={() => onToggleLang(language)}
                className={`rounded-full px-2 py-1 transition-all ${
                  lang === language
                    ? 'bg-[#D0AC6C] text-[#210B09]'
                    : 'text-[#D0AC6C]/70 hover:text-[#EAD7B5]'
                }`}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Inquiry */}
          <button
            type="button"
            onClick={handleInquiry}
            className="hidden items-center gap-2 border border-[#D0AC6C]/70
            px-4 py-2 text-[11px] text-[#E6C88F]
            transition-all duration-300 hover:bg-[#D0AC6C]
            hover:text-[#210B09] sm:flex"
          >
            {SITE_CONTENT.nav.inquireBtn[lang]}
            <ArrowUpLeft size={13} />
          </button>
        </div>
      </div>

      {/* Decorative Gold Line */}
      <div className="h-px w-full bg-gradient-to-r
      from-transparent via-[#B58B50]/60 to-transparent" />

      {/* Mobile Dropdown */}
      <div
        className={`overflow-hidden bg-[#210B09]
        transition-all duration-500 ease-in-out lg:hidden
        ${mobileOpen
          ? 'max-h-[650px] opacity-100'
          : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-xl px-6 pb-7 pt-5">

          {/* Menu Heading */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#A47C46]/60" />
            <Sparkles size={13} className="text-[#D0AC6C]" />
            <span className="font-serif-display text-[9px]
            tracking-[0.2em] text-[#D0AC6C]">
              {isFa ? 'هنر جاودانه ایرانی' : 'TIMELESS PERSIAN ART'}
            </span>
            <span className="h-px w-9 bg-[#A47C46]/60" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between
                border-b border-[#A47C46]/20 py-4 text-sm
                transition-colors duration-300 ${
                  activeLink(item.id)
                    ? 'text-[#D0AC6C]'
                    : 'text-[#E4D4B7]/80 hover:text-[#D0AC6C]'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-serif-display text-[10px]
                tracking-widest text-[#A47C46]">
                  0{index + 1}
                </span>
              </button>
            ))}
          </nav>

          {/* Selected Collections */}
          <div className="mt-6">
            <p className="mb-4 text-center text-[10px]
            tracking-widest text-[#D0AC6C]">
              {isFa ? 'گزیده آثار نفیس' : 'SELECTED MASTERPIECES'}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRugClick('kld-isf-25q')}
                className="border border-[#D0AC6C]/50 bg-[#D0AC6C]/5
                px-2 py-3 text-center transition-all duration-300
                hover:bg-[#D0AC6C] hover:text-[#210B09]"
              >
                <span className="block font-serif-display text-[10px]
                tracking-wider">
                  KLD · ISF-25Q
                </span>
                <span className="mt-2 block text-[9px] opacity-70">
                  {isFa ? 'مشاهده اثر' : 'Explore'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleRugClick('kld-isf-07p')}
                className="border border-[#B77A62]/50 bg-[#B77A62]/5
                px-2 py-3 text-center text-[#D2A18A]
                transition-all duration-300 hover:bg-[#B77A62]
                hover:text-[#210B09]"
              >
                <span className="block font-serif-display text-[10px]
                tracking-wider">
                  KLD · ISF-07P
                </span>
                <span className="mt-2 block text-[9px] opacity-70">
                  {isFa ? 'مشاهده اثر' : 'Explore'}
                </span>
              </button>
            </div>
          </div>

          {/* Inquiry */}
          <button
            type="button"
            onClick={handleInquiry}
            className="mt-6 flex w-full items-center justify-center
            gap-2 border border-[#D0AC6C] bg-[#D0AC6C]
            py-3.5 text-xs font-medium text-[#210B09]
            transition-all duration-300 hover:bg-transparent
            hover:text-[#D0AC6C]"
          >
            {SITE_CONTENT.nav.inquireBtn[lang]}
            <ArrowUpLeft size={14} />
          </button>

          {/* Footer Ornament */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#A47C46]/40" />
            <span className="text-[#A47C46]">✧</span>
            <span className="h-px w-12 bg-[#A47C46]/40" />
          </div>
        </div>
      </div>
    </header>
  );
}
