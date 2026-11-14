import { useEffect, useState } from 'react';
import { TYPOGRAPHY_STUDIES, type TypographyStudy } from '../data/typographyStudies';
import type { Lang, RouteView } from '../types';

interface TypographyShowcasePageProps {
  lang: Lang;
  initialIndex?: number;
  onNavigate: (route: RouteView, sectionId?: string) => void;
  onOpenInquiry: (pieceCode?: string) => void;
}

export function TypographyShowcasePage({
  lang,
  initialIndex = 0,
  onNavigate,
  onOpenInquiry,
}: TypographyShowcasePageProps) {
  const isFa = lang === 'fa';
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (initialIndex >= 0 && initialIndex < TYPOGRAPHY_STUDIES.length) {
      return initialIndex;
    }
    return 0;
  });

  const [viewMode, setViewMode] = useState<'single' | 'gallery'>('single');
  const [lightingIntensity, setLightingIntensity] = useState<'normal' | 'dramatic'>('dramatic');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeStudy: TypographyStudy = TYPOGRAPHY_STUDIES[activeIndex];

  // Keyboard navigation for plates
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'single') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev + 1) % TYPOGRAPHY_STUDIES.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev - 1 + TYPOGRAPHY_STUDIES.length) % TYPOGRAPHY_STUDIES.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const copyCssClasses = (study: TypographyStudy) => {
    const snippet = `font: ${study.fontFamilyClass} | fx: ${study.lightingFxClass}`;
    navigator.clipboard?.writeText(snippet);
    setCopiedCode(study.slug);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#F5EFE6] selection:bg-[#D4AF37]/30 selection:text-white pb-24">
      {/* Top Atmospheric Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-colors duration-1000"
          style={{ backgroundColor: activeStudy.colorPalette[0]?.hex || '#D4AF37' }}
        />
        <div
          className="absolute bottom-0 left-10 w-[500px] h-[500px] rounded-full blur-[160px] opacity-15 transition-colors duration-1000"
          style={{ backgroundColor: activeStudy.colorPalette[1]?.hex || '#1D4ED8' }}
        />
        <div className="absolute inset-0 atelier-grain opacity-40" />
      </div>

      {/* Persistent Showcase Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#09090D]/95 border-b border-[#2A2620]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-0 sm:h-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Title */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => onNavigate({ type: 'rug', slug: 'kld-isf-25q' })}
              className="flex items-center gap-1.5 text-xs text-[#A89F91] hover:text-[#D4AF37] transition-colors py-1.5 px-2.5 rounded border border-[#2A2620] hover:border-[#D4AF37]/40 bg-[#121115] shrink-0"
              title="بازگشت به صفحه فرش ۲۵ متری"
            >
              <span>←</span>
              <span className="font-modern-sans text-[11px] sm:text-xs">
                <span className="sm:hidden">فرش ۲۵ متری</span>
                <span className="hidden sm:inline">بازگشت به فرش ۲۵ متری</span>
              </span>
            </button>
            <div className="hidden sm:block h-6 w-px bg-[#2A2620] shrink-0" />
            <div className="min-w-0 truncate">
              <div className="hidden sm:block text-[11px] uppercase tracking-widest text-[#D4AF37] font-medium truncate">
                Kolahdoozan Atelier • Typography & Lighting Studies
              </div>
              <h1 className="text-xs sm:text-base font-semibold text-white tracking-wide truncate">
                {isFa
                  ? '۱۰ مطالعه تایپوگرافی اصیل فرش ۲۵ متری'
                  : '10 Persian Typography Studies — 25Q Rug'}
              </h1>
            </div>
          </div>

          {/* View Mode & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 ms-auto sm:ms-0">
            <button
              onClick={() => setLightingIntensity(lightingIntensity === 'dramatic' ? 'normal' : 'dramatic')}
              className={`text-[11px] sm:text-xs px-2.5 py-1 sm:py-1.5 rounded transition-all flex items-center gap-1 border ${
                lightingIntensity === 'dramatic'
                  ? 'border-[#D4AF37]/60 text-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-[#2A2620] text-[#A89F91] hover:text-white bg-[#121115]'
              }`}
              title="تغییر حالت نورپردازی و کنتراست"
            >
              <span>✦</span>
              <span>
                {lightingIntensity === 'dramatic'
                  ? isFa
                    ? 'کنتراست موزه'
                    : 'Dramatic'
                  : isFa
                    ? 'نور استاندارد'
                    : 'Standard'}
              </span>
            </button>

            {/* Mode Switcher */}
            <div className="flex rounded border border-[#2A2620] p-0.5 bg-[#121115]">
              <button
                onClick={() => setViewMode('single')}
                className={`text-[11px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded transition-all ${
                  viewMode === 'single'
                    ? 'bg-[#D4AF37] text-[#09090D] font-medium shadow'
                    : 'text-[#A89F91] hover:text-white'
                }`}
              >
                {isFa ? 'تک‌اسلاید' : 'Single'}
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`text-[11px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded transition-all ${
                  viewMode === 'gallery'
                    ? 'bg-[#D4AF37] text-[#09090D] font-medium shadow'
                    : 'text-[#A89F91] hover:text-white'
                }`}
              >
                {isFa ? '۱۰ طرح' : 'Compare'}
              </button>
            </div>
          </div>
        </div>

        {/* Slide Numbers Navigation Strip (Visible in single mode) */}
        {viewMode === 'single' && (
          <div className="border-t border-[#1C1A17] bg-[#0C0B0F]/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {TYPOGRAPHY_STUDIES.map((study, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={study.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`px-3 py-1.5 rounded text-xs transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                        isActive
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FFF2C7] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                          : 'border-[#221F1B] bg-[#141318] text-[#8C8476] hover:text-[#F5EFE6] hover:border-[#3A352D]'
                      }`}
                    >
                      <span className="font-mono text-[11px] opacity-75">{study.numberPersian}</span>
                      <span className="hidden md:inline text-[11px]">{study.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Shortcuts */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + TYPOGRAPHY_STUDIES.length) % TYPOGRAPHY_STUDIES.length)}
                  className="p-1.5 rounded border border-[#221F1B] bg-[#141318] text-[#A89F91] hover:text-white hover:border-[#D4AF37]/50 transition-colors text-xs"
                  title="طرح قبلی"
                >
                  ◄ طرح قبل
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % TYPOGRAPHY_STUDIES.length)}
                  className="p-1.5 rounded border border-[#221F1B] bg-[#141318] text-[#A89F91] hover:text-white hover:border-[#D4AF37]/50 transition-colors text-xs"
                  title="طرح بعدی"
                >
                  طرح بعد ►
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {viewMode === 'single' ? (
          /* ================================================================
             SINGLE SLIDE DEEP-DIVE PRESENTATION
             ================================================================ */
          <div className="space-y-12">
            {/* Visual Hero Stage with Large Persian Typography & Rug Backdrop */}
            <div
              className={`relative rounded-2xl overflow-hidden border border-[#2A2620] transition-all duration-700 shadow-[0_25px_70px_rgba(0,0,0,0.95)] ${
                lightingIntensity === 'dramatic' ? 'bg-[#050507]' : 'bg-[#0E0D12]'
              }`}
            >
              {/* Background Rug Visual with Editorial Dimming & Museum Vignette */}
              <div className="relative min-h-[460px] sm:min-h-[580px] lg:min-h-[660px] flex flex-col justify-end p-6 sm:p-12 lg:p-16 overflow-hidden">
                <img
                  src={activeStudy.rugImage}
                  alt={activeStudy.rugImageLabel}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105 ${
                    lightingIntensity === 'dramatic' ? 'opacity-40 filter brightness-75 contrast-125' : 'opacity-55'
                  }`}
                />

                {/* Multi-layered Vignette & Atmospheric Lighting Cone */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-[#050507]/40 pointer-events-none" />
                <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

                {/* Subtle spotlight highlight behind the text */}
                <div
                  className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-30"
                  style={{ backgroundColor: activeStudy.colorPalette[0]?.hex || '#D4AF37' }}
                />

                {/* Floating Meta Badges at Top Right */}
                <div className="absolute top-6 right-6 left-6 flex flex-wrap items-center justify-between gap-3 z-20">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-[#09090D]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
                      طرح شماره {activeStudy.numberPersian} / ۱۰
                    </span>
                    <span className="px-3 py-1 rounded bg-[#09090D]/80 border border-[#2A2620] text-[#A89F91] text-xs font-mono">
                      {activeStudy.fontName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyCssClasses(activeStudy)}
                      className="px-3 py-1 rounded bg-[#09090D]/90 border border-[#2A2620] hover:border-[#D4AF37]/50 text-xs text-[#C5BBAA] hover:text-[#D4AF37] transition-all flex items-center gap-1.5"
                    >
                      <span>{copiedCode === activeStudy.slug ? '✓ کپی شد' : 'کپی مشخصات استایل'}</span>
                    </button>
                    <span className="text-xs px-3 py-1 rounded bg-[#1A181F]/90 border border-[#3A352D] text-[#E5D7BF]">
                      {activeStudy.technicalBadge}
                    </span>
                  </div>
                </div>

                {/* The Master Typography Display */}
                <div className="relative z-20 space-y-6 max-w-4xl pt-24 sm:pt-20">
                  {/* Calligraphy Sub-head / Tradition */}
                  <div className="flex items-center gap-3 pb-2 sm:pb-3">
                    <div className="w-8 h-px bg-[#D4AF37]" />
                    <span className="text-xs sm:text-sm tracking-widest text-[#D4AF37] font-medium">
                      {activeStudy.calligraphyStyle}
                    </span>
                  </div>

                  {/* Main Authentic Persian Typographic Headline */}
                  <div className="pt-2 sm:pt-4">
                    <h2
                      style={
                        activeStudy.lightingFxClass === 'typo-fx-woven-texture'
                          ? { backgroundImage: "url('./images/rugs/kld-isf-25q-macro-angle.jpg')" }
                          : undefined
                      }
                      className={`text-3xl sm:text-5xl lg:text-6xl font-normal transition-all duration-300 ${
                        activeStudy.fontFamilyClass === 'font-nastaliq'
                          ? 'leading-[2.4] sm:leading-[2.4] pt-4 pb-2'
                          : 'leading-[1.4] sm:leading-[1.35]'
                      } ${activeStudy.fontFamilyClass} ${activeStudy.lightingFxClass}`}
                    >
                      {activeStudy.mainQuote}
                    </h2>
                  </div>

                  {/* Secondary Curatorial Subtitle */}
                  <p className="text-base sm:text-xl text-[#DDD5C7] leading-relaxed max-w-2xl font-light pt-2">
                    {activeStudy.secondaryQuote}
                  </p>

                  {/* Poetic Inscription Callout */}
                  <div className="pt-2 flex items-center gap-3 text-sm sm:text-base text-[#C2B59D] italic font-serif">
                    <span className="text-[#D4AF37] text-lg">“</span>
                    <span>{activeStudy.poeticNote}</span>
                    <span className="text-[#D4AF37] text-lg">”</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Depth Analytical Dossier & Technical Rationale Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Font & Calligraphy Heritage */}
              <div className="rounded-xl border border-[#221F1B] bg-[#0E0D12]/90 p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wider uppercase font-semibold">
                  <span>✒</span>
                  <span>هویت و پیشینه خطاطی</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{activeStudy.fontName}</h3>
                  <p className="text-xs text-[#A89F91] leading-relaxed">
                    <strong className="text-[#E2D9C8]">سبک خوشنویسی:</strong> {activeStudy.calligraphyStyle}
                  </p>
                  <p className="text-xs text-[#A89F91] leading-relaxed">
                    <strong className="text-[#E2D9C8]">دوره تاریخی:</strong> {activeStudy.calligraphyPeriod}
                  </p>
                  <div className="pt-3 border-t border-[#1F1C18] text-xs text-[#CCC2B2] leading-relaxed">
                    <strong className="text-[#D4AF37] block mb-1">دلیل انتخاب برای فرش کلاهدوزان:</strong>
                    {activeStudy.aestheticRationale}
                  </div>
                </div>
              </div>

              {/* Center Column: Lighting & Shadow Physics */}
              <div className="rounded-xl border border-[#221F1B] bg-[#0E0D12]/90 p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wider uppercase font-semibold">
                  <span>✦</span>
                  <span>فیزیک نور و جلوه سایه‌پردازی</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{activeStudy.lightingName}</h3>
                  <div className="text-xs text-[#A89F91] leading-relaxed space-y-2">
                    <p>
                      <strong className="text-[#E2D9C8]">مهندسی بازتاب نور:</strong>{' '}
                      {activeStudy.lightingShaderDescription}
                    </p>
                    <p>
                      <strong className="text-[#E2D9C8]">رفتار سایه (Shadow):</strong> {activeStudy.shadowDescription}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#1F1C18]">
                    <div className="text-[11px] text-[#8C8476] mb-2">کلاس‌های استایل CSS فعال:</div>
                    <code className="block bg-[#07070A] p-2.5 rounded text-[11px] text-[#D4AF37] font-mono border border-[#221F1B] overflow-x-auto">
                      .{activeStudy.fontFamilyClass} .{activeStudy.lightingFxClass}
                    </code>
                  </div>
                </div>
              </div>

              {/* Right Column: Palette & Paired Imagery */}
              <div className="rounded-xl border border-[#221F1B] bg-[#0E0D12]/90 p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wider uppercase font-semibold">
                  <span>🎨</span>
                  <span>پالت پیگمنت و عکس همنشین</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-[#8C8476] mb-2">طیف پیگمنت‌های به کار رفته در افکت:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeStudy.colorPalette.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center gap-2 p-2 rounded bg-[#07070A] border border-[#1F1C18]"
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="min-w-0">
                            <div className="text-[11px] text-white truncate font-medium">{color.name}</div>
                            <div className="text-[10px] text-[#7C7467] font-mono">{color.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1F1C18] flex items-center justify-between text-xs">
                    <span className="text-[#8C8476]">عکاسی هماهنگ:</span>
                    <span className="text-[#DDD5C7] font-medium">{activeStudy.rugImageLabel}</span>
                  </div>

                  <button
                    onClick={() => onOpenInquiry('KLD-ISF-25Q')}
                    className="w-full py-2.5 px-4 rounded bg-gradient-to-r from-[#D4AF37] to-[#AA7A1E] text-[#09090D] font-semibold text-xs tracking-wide hover:brightness-110 transition-all shadow-[0_8px_20px_rgba(212,175,55,0.2)]"
                  >
                    استعلام و سفارش اجرای این تایپوگرافی بر فرش
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================
             COMPARISON GALLERY MODE (ALL 10 PLATES SIDE BY SIDE)
             ================================================================ */
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs text-[#D4AF37] font-mono tracking-widest uppercase">
                Portfolio Comparison Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                مقایسه جامع تمام ۱۰ جهت‌گیری تایپوگرافی
              </h2>
              <p className="text-xs sm:text-sm text-[#A89F91]">
                بر روی هر کادر کلیک کنید تا وارد نمای تمام‌صفحه و باکیفیت همان طرح شوید.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {TYPOGRAPHY_STUDIES.map((study, idx) => (
                <div
                  key={study.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setViewMode('single');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative rounded-xl overflow-hidden border border-[#221F1B] hover:border-[#D4AF37]/60 bg-[#0C0B0F] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col justify-between"
                >
                  {/* Image Backdrop Strip */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={study.rugImage}
                      alt={study.rugImageLabel}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-45 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0F] via-[#0C0B0F]/60 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 right-4 left-4 flex justify-between items-center z-10">
                      <span className="px-2.5 py-0.5 rounded bg-[#09090D]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono">
                        {study.numberPersian}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-[#09090D]/80 border border-[#2A2620] text-[#A89F91] text-[11px]">
                        {study.fontName.split(' ')[0]}
                      </span>
                    </div>

                    {/* Typography Plate inside Card */}
                    <div className="absolute bottom-4 right-4 left-4 z-10">
                      <div className="text-[11px] text-[#D4AF37] mb-2 font-medium">{study.calligraphyStyle}</div>
                      <div className="pt-1">
                        <h3
                          style={
                            study.lightingFxClass === 'typo-fx-woven-texture'
                              ? { backgroundImage: "url('./images/rugs/kld-isf-25q-macro-angle.jpg')" }
                              : undefined
                          }
                          className={`text-2xl sm:text-3xl ${
                            study.fontFamilyClass === 'font-nastaliq'
                              ? 'leading-[2.3] pt-2 pb-1'
                              : 'leading-snug'
                          } line-clamp-2 ${study.fontFamilyClass} ${study.lightingFxClass}`}
                        >
                          {study.mainQuote}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Details & Rationale */}
                  <div className="p-5 space-y-3 bg-[#0C0B0F] border-t border-[#1C1A17]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-semibold">{study.title}</span>
                      <span className="text-[#8C8476] text-[11px]">{study.lightingName.split(' ')[0]}</span>
                    </div>

                    <p className="text-xs text-[#A89F91] line-clamp-2 leading-relaxed">
                      {study.aestheticRationale}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#D4AF37] group-hover:translate-x-[-4px] transition-transform">
                      <span>مشاهده در نمای تمام‌صفحه و تحلیل فیزیک نور ←</span>
                      <span className="font-mono">#{study.slug}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Quick-Switcher for Mobile / Tablet */}
      {viewMode === 'single' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#0E0D12]/95 backdrop-blur-xl border border-[#2A2620] px-4 py-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + TYPOGRAPHY_STUDIES.length) % TYPOGRAPHY_STUDIES.length)}
            className="text-xs text-[#A89F91] hover:text-white px-2 py-1 rounded transition-colors"
          >
            ◄ طرح قبل
          </button>
          <span className="text-xs font-mono text-[#D4AF37] px-2 border-x border-[#2A2620]">
            {activeStudy.numberPersian} / ۱۰
          </span>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % TYPOGRAPHY_STUDIES.length)}
            className="text-xs text-[#A89F91] hover:text-white px-2 py-1 rounded transition-colors"
          >
            طرح بعد ►
          </button>
        </div>
      )}
    </div>
  );
}

export default TypographyShowcasePage;
