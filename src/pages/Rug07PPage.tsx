import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WeaveZoomModal } from '../components/WeaveZoomModal';
import type { Lang, RouteView, RugPiece } from '../types';

interface Rug07PPageProps {
  rug: RugPiece;
  lang: Lang;
  onToggleLang: (next: Lang) => void;
  onNavigate: (target: RouteView, sectionId?: string) => void;
  onOpenInquiry: (pieceCode?: string) => void;
}

export function Rug07PPage({
  rug,
  lang,
  onToggleLang,
  onNavigate,
  onOpenInquiry,
}: Rug07PPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomIdx, setZoomIdx] = useState(0);

  const pageRef = useRef<HTMLDivElement>(null);
  const loupeBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const syncScroll = () => {
      const y = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0;

      setScrollY(y);
      setScrollProgress(progress);

      const targets = pageRef.current?.querySelectorAll('[data-reveal]');

      targets?.forEach((el) => {
        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          el.classList.add('is-visible');
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncScroll);
    };

    syncScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );

    const targets = pageRef.current?.querySelectorAll('[data-reveal]');
    targets?.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, []);

  const scrolled = scrollY > 36;
  const BackArrow = lang === 'fa' ? ArrowRight : ArrowLeft;

  const storySlides = [
    {
      id: 'mansion',
      src: './images/rugs/kld-isf-07p-mansion.jpg',
      label: lang === 'fa' ? 'چیدمان در تالار عمارت' : 'Mansion Salon Placement',
    },
    {
      id: 'full',
      src: rug.image,
      label: lang === 'fa' ? 'نقشه‌ی کامل قالی ۹ متری' : 'Full 3.50 × 2.50 m Plan',
    },
    {
      id: 'angle',
      src: './images/rugs/kld-isf-07p-macro-angle.jpg',
      label: lang === 'fa' ? 'تلالو زمینه کف‌ابریشم' : 'Silk Foundation Luster',
    },
    {
      id: 'medallion',
      src: './images/rugs/kld-isf-07p-detail-medallion.webp',
      label: lang === 'fa' ? 'ترنج مسی و آسمانی' : 'Burnished Copper Medallion',
    },
    {
      id: 'extreme',
      src: './images/rugs/kld-isf-07p-macro-extreme.jpg',
      label: lang === 'fa' ? 'گره‌های ابریشم آبی و مس' : 'Sky Blue & Copper Knots',
    },
    {
      id: 'corner',
      src: './images/rugs/kld-isf-07p-detail-corner.webp',
      label: lang === 'fa' ? 'لچک و اسلیمی طلایی' : 'Corner Spandrel Tracery',
    },
    {
      id: 'border',
      src: './images/rugs/kld-isf-07p-detail-border.webp',
      label: lang === 'fa' ? 'حاشیه ختایی و عاجی' : 'Floral Border Arabesque',
    },
    {
      id: 'editorial',
      src: './images/rugs/kld-isf-07p-editorial.jpg',
      label: lang === 'fa' ? 'تابش نور مایل بر کف‌ابریشم' : 'Raking Light on Walnut Wood',
    },
  ];

  const pigmentDetails = [
    {
      hex: '#C89D5E',
      name: lang === 'fa' ? 'شامپاینی زرین' : 'Champagne Gold',
      note:
        lang === 'fa'
          ? 'تمام‌کف‌ابریشم طبیعی خام · بازتاب درخشش و روشنایی آینه‌ای در فضا'
          : 'Pure undyed silk foundation · mirror-like luminosity across room',
    },
    {
      hex: '#B85A3A',
      name: lang === 'fa' ? 'مس گداخته' : 'Burnished Copper',
      note:
        lang === 'fa'
          ? 'روناس دشت یزد و انار خفر · گرمای اصیل ترنج و ختایی‌های پیرامونی'
          : 'Yazd madder & pomegranate · radiant warmth in medallion center',
    },
    {
      hex: '#5B8296',
      name: lang === 'fa' ? 'آبی آسمان اصفهان' : 'Powder Sky Blue',
      note:
        lang === 'fa'
          ? 'نیل گیاهی رقیق در خم سنتی · کنتراست خنک و مینیمال در دل گل‌های مسی'
          : 'Diluted indigo · delicate cool contrast within copper blossoms',
    },
    {
      hex: '#3C2314',
      name: lang === 'fa' ? 'گردویی کهنه' : 'Antique Walnut',
      note:
        lang === 'fa'
          ? 'پوست گردوی زاگرس · خطوط مرزی دقیق اسلیمی‌ها بدون جوهر شیمیایی'
          : 'Zagros walnut husk · crisp contour definition without synthetic dye',
    },
  ];

  const activePigment = pigmentDetails[activeSwatch] ?? pigmentDetails[0];

  const openZoom = (idx: number) => {
    setZoomIdx(idx);
    setZoomOpen(true);
  };

  const handleLoupeMove = (clientX: number, clientY: number) => {
    const rect = loupeBoxRef.current?.getBoundingClientRect();

    if (!rect || rect.width === 0 || rect.height === 0) return;

    const x = Math.min(
      84,
      Math.max(16, ((clientX - rect.left) / rect.width) * 100),
    );

    const y = Math.min(
      84,
      Math.max(16, ((clientY - rect.top) / rect.height) * 100),
    );

    setLoupePos({ x, y });
  };

  const heroScale = 1 + Math.min(scrollY, 700) * 0.00018;
  const heroParallaxY = Math.min(scrollY, 700) * 0.14;
  const lightDrift = 25 + Math.sin(scrollY * 0.0035) * 28;

  return (
    <div
      ref={pageRef}
      className="min-h-screen overflow-x-clip bg-[#190B0B] text-[#F1E5D1] selection:bg-[#C49A5A] selection:text-[#190B0B]"
    >
      {/* TOP NAVIGATION */}

      <header
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-[#190B0B]/95 backdrop-blur-xl border-b border-[#C49A5A]/25 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
            : 'bg-transparent'
        }`}
      >
        <div
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: lang === 'fa' ? 'right' : 'left',
          }}
          className="h-[2px] w-full bg-gradient-to-r from-[#8B4B35] via-[#C49A5A] to-[#E5CC96] transition-transform duration-75"
        />

        <div className="mx-auto flex max-w-md md:max-w-2xl items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={() => onNavigate({ type: 'home' })}
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-2.5 py-1 transition-colors cursor-pointer ${
              scrolled
                ? 'text-[#F1E5D1]'
                : 'bg-[#190B0B]/65 text-[#F1E5D1] backdrop-blur-md'
            }`}
          >
            <BackArrow className="h-3.5 w-3.5 text-[#D6B77B]" />
            <span>{lang === 'fa' ? 'گالری' : 'Gallery'}</span>
          </button>

          <span
            dir="ltr"
            className={`font-serif-display text-[11px] tracking-[0.26em] px-3 py-1 transition-colors ${
              scrolled
                ? 'text-[#D6B77B]'
                : 'bg-[#190B0B]/65 text-[#D6B77B] backdrop-blur-md'
            }`}
          >
            KLD · ISF-07P
          </span>

          <button
            type="button"
            onClick={() => onToggleLang(lang === 'fa' ? 'en' : 'fa')}
            className={`text-[10px] tracking-[0.2em] px-2.5 py-1 transition-colors cursor-pointer ${
              scrolled
                ? 'text-[#F1E5D1]'
                : 'bg-[#190B0B]/65 text-[#F1E5D1] backdrop-blur-md'
            }`}
          >
            {lang === 'fa' ? 'EN' : 'FA'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-md md:max-w-2xl">

        {/* =========================================================
            1. HERO
        ========================================================= */}

        <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-[#190B0B]">
          <img
            src="./images/rugs/kld-isf-07p-mansion.jpg"
            alt={rug.title[lang]}
            style={{
              transform: `translate3d(0, ${heroParallaxY}px, 0) scale(${heroScale})`,
            }}
            className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          />

          <div
            style={{
              background:
                'linear-gradient(180deg, rgba(25,11,11,0.05) 25%, rgba(25,11,11,0.38) 48%, rgba(25,11,11,0.91) 75%, #190B0B 100%)',
            }}
            className="pointer-events-none absolute inset-0"
          />

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#190B0B] to-transparent" />

          <div className="relative z-10 px-7 pb-10 pt-8 text-center space-y-3.5">
            <p className="font-modern-sans text-[10.5px] font-medium tracking-[0.28em] text-[#D6B77B] uppercase">
              {lang === 'fa'
                ? 'اصفهان · جفتِ ۹ متری کف‌ابریشم'
                : 'ISFAHAN · MATCHED 9M PAIR'}
            </p>

            <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-[#C49A5A] to-transparent" />

            <h1
              className={`text-[2.25rem] leading-[1.5] font-normal text-[#F8EBD6] drop-shadow-lg ${
                lang === 'fa'
                  ? 'font-traditional-display'
                  : 'font-serif-display text-[2.5rem]'
              }`}
            >
              {lang === 'fa'
                ? 'قالیِ جفتِ کف‌ابریشمِ اصفهان'
                : 'Isfahan 9m Silk-Foundation Pair'}
            </h1>

            <p className="font-modern-sans text-[12px] font-medium text-[#E0CBA9] tracking-wider">
              {lang === 'fa'
                ? '۳.۵۰ × ۲.۵۰ متر (هر تخته)   ·   ۲,۵۵۰ گره   ·   ۶۵ رج اصفهان'
                : '3.50 × 2.50 m (Each)   ·   2,550 Knots   ·   65-Raj Master'}
            </p>

            <p className="text-xs text-[#D6B77B] font-semibold">
              {lang === 'fa'
                ? rug.valuationToman
                : `${rug.valuationUsd} Gallery Guide`}
            </p>

            <div className="pt-3 flex justify-center">
              <button
                type="button"
                onClick={() => onOpenInquiry(rug.archiveCode)}
                className="group relative inline-flex items-center gap-3 bg-[#C49A5A] px-8 py-3.5 text-xs font-semibold tracking-wider text-[#190B0B] shadow-[0_14px_34px_-12px_rgba(0,0,0,0.55)] cursor-pointer transition-all hover:bg-[#D6B77B] hover:shadow-[0_14px_38px_-10px_rgba(196,154,90,0.35)] active:scale-[0.99]"
              >
                <span className="pointer-events-none absolute inset-0 border border-[#E8D2A7]/70" />

                <span className="pointer-events-none absolute top-0 start-0 h-2 w-2 border-t-2 border-s-2 border-[#190B0B]" />

                <span className="pointer-events-none absolute bottom-0 end-0 h-2 w-2 border-b-2 border-e-2 border-[#190B0B]" />

                <span className="h-1.5 w-1.5 rotate-45 bg-[#651F20]" />

                <span>
                  {lang === 'fa'
                    ? 'رزرو بازدید جفت نایاب'
                    : 'Reserve Pair Viewing'}
                </span>
              </button>
            </div>

            <div className="pt-4 flex flex-col items-center gap-1 opacity-80">
              <span className="h-7 w-px bg-gradient-to-b from-[#C49A5A] to-transparent" />
            </div>
          </div>
        </section>

        {/* =========================================================
            2. ARCHITECTURAL PROPORTION
        ========================================================= */}

        <section
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(196,154,90,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,154,90,0.055) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          className="relative px-6 py-16 border-t border-[#C49A5A]/25 space-y-8 bg-[#190B0B]"
        >
          <div data-reveal className="reveal-fade space-y-2">
            <p className="text-[10.5px] font-medium tracking-[0.26em] text-[#D6B77B]">
              {lang === 'fa'
                ? 'مهندسی قواره و بافت موازی'
                : 'PARALLEL LOOM GEOMETRY'}
            </p>

            <h2
              className={`text-[1.6rem] leading-snug font-medium text-[#F1E5D1] ${
                lang === 'fa'
                  ? 'font-persian-editorial'
                  : 'font-serif-display text-3xl'
              }`}
            >
              {lang === 'fa'
                ? 'جفتِ هماهنگ ۹ متری (مجموعاً ۱۷.۵ متر مربع)'
                : '17.5 m² Matched Master Pair'}
            </h2>

            <div className="h-px w-20 bg-gradient-to-r from-[#C49A5A] to-transparent" />
          </div>

          {/* ARCHITECTURAL DRAFTING BOARD */}

          <div
            data-reveal
            className="reveal-curtain relative mx-auto max-w-[310px] pt-6 pb-2 ps-6"
          >
            <div className="absolute top-0 inset-x-0 ps-6 flex items-center justify-between text-[10.5px] font-medium text-[#D6B77B]">
              <span className="h-2 w-px bg-[#C49A5A]" />

              <span className="h-px flex-1 bg-[#C49A5A]/50 mx-2" />

              <span className="px-2.5 bg-[#281211] border border-[#C49A5A]/40">
                {lang === 'fa' ? '۲.۵۰ متر عرض' : '2.50 m Width'}
              </span>

              <span className="h-px flex-1 bg-[#C49A5A]/50 mx-2" />

              <span className="h-2 w-px bg-[#C49A5A]" />
            </div>

            <div className="absolute start-0 top-6 bottom-2 flex flex-col items-center justify-between text-[10.5px] font-medium text-[#D6B77B]">
              <span className="w-2 h-px bg-[#C49A5A]" />

              <span className="w-px flex-1 bg-[#C49A5A]/50 my-1" />

              <span className="[writing-mode:vertical-rl] py-2 bg-[#281211]">
                {lang === 'fa' ? '۳.۵۰ متر طول' : '3.50 m Length'}
              </span>

              <span className="w-px flex-1 bg-[#C49A5A]/50 my-1" />

              <span className="w-2 h-px bg-[#C49A5A]" />
            </div>

            <div
              onClick={() => openZoom(1)}
              className="relative aspect-[5/7] w-full overflow-hidden border border-[#C49A5A]/50 shadow-[0_26px_55px_-22px_rgba(0,0,0,0.65)] cursor-zoom-in group"
            >
              <img
                src={rug.image}
                alt={rug.title[lang]}
                className="h-full w-full object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-[1.05]"
              />

              <svg
                viewBox="0 0 250 350"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <line
                  x1="125"
                  y1="10"
                  x2="125"
                  y2="340"
                  stroke="#F1E5D1"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                  opacity="0.85"
                />

                <line
                  x1="10"
                  y1="175"
                  x2="240"
                  y2="175"
                  stroke="#F1E5D1"
                  strokeWidth="0.8"
                  strokeDasharray="4 4"
                  opacity="0.85"
                />

                <circle
                  cx="125"
                  cy="175"
                  r="48"
                  fill="none"
                  stroke="#D6B77B"
                  strokeWidth="1.1"
                />

                <circle cx="125" cy="175" r="3" fill="#F1E5D1" />

                <rect
                  x="14"
                  y="14"
                  width="222"
                  height="322"
                  fill="none"
                  stroke="#F1E5D1"
                  strokeWidth="0.7"
                  opacity="0.6"
                />
              </svg>

              <span className="absolute bottom-2.5 end-2.5 inline-flex items-center gap-1 bg-[#190B0B]/90 border border-[#C49A5A]/50 px-2.5 py-1 text-[10px] font-medium text-[#F1E5D1]">
                <ZoomIn className="h-3 w-3 text-[#D6B77B]" />

                {lang === 'fa' ? '۳× نقشه کامل' : '3× Full Plan'}
              </span>
            </div>
          </div>

          {/* COLLECTOR FACTS */}

          <div data-reveal className="reveal-fade space-y-5 pt-3">
            <div className="border-s border-[#C49A5A] ps-4 space-y-1">
              <p className="text-[13px] font-semibold text-[#D6B77B]">
                {lang === 'fa'
                  ? 'جفتِ هماهنگ از یک دار و خُم رنگرزی'
                  : 'Matched Pair from Single Dye Batch'}
              </p>

              <p className="text-xs leading-relaxed text-[#B9A28A]">
                {lang === 'fa'
                  ? 'رنگرزی هم‌زمان ابریشم‌ها در یک پاتیل سنتی برای تضمین ثبات صددرصدی رنگ و بازتاب نور میان دو تخته.'
                  : 'Yarns dyed concurrently in identical botanical vats ensuring zero chromatic drift between the two carpets.'}
              </p>
            </div>

            <div className="border-s border-[#C49A5A] ps-4 space-y-1">
              <p className="text-[13px] font-semibold text-[#D6B77B]">
                {lang === 'fa'
                  ? 'بافت موازی ۲۴ ماهه با ۴ استادباف'
                  : '24-Month Parallel Quad-Master Weave'}
              </p>

              <p className="text-xs leading-relaxed text-[#B9A28A]">
                {lang === 'fa'
                  ? 'دو دارِ موازی با کشش یکسان تا ابعاد ۳.۵۰×۲.۵۰ متر با دقت میلی‌متری قرینه‌ی یکدیگر شوند.'
                  : 'Tension synchronized across parallel looms so both 3.50 × 2.50 m carpets mirror each other precisely.'}
              </p>
            </div>

            <div className="border-s border-[#C49A5A] ps-4 space-y-1">
              <p className="text-[13px] font-semibold text-[#D6B77B]">
                {lang === 'fa'
                  ? 'رده‌ی ۶۵ رج با ۲,۵۵۰ گره متراکم'
                  : '65-Raj Gauge with 2,550 Knots'}
              </p>

              <p className="text-xs leading-relaxed text-[#B9A28A]">
                {lang === 'fa'
                  ? 'یکی از بالاترین رده‌های ظرافت اصفهان همراه با شناسنامه اصالت ممهور گالری کلاهدوزان.'
                  : 'Elite Isfahan masterwork knot density certified by Kolahdoozan atelier provenance dossier.'}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. GOLDEN SILK FOUNDATION
        ========================================================= */}

        <section className="relative bg-[#281211] text-[#F1E5D1] px-6 py-20 overflow-hidden">
          <img
            src="./images/rugs/kld-isf-07p-macro-angle.jpg"
            alt=""
            aria-hidden="true"
            style={{
              WebkitMaskImage:
                'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.88) 24%, rgba(0,0,0,0.86) 74%, transparent 100%)',
              maskImage:
                'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.88) 24%, rgba(0,0,0,0.86) 74%, transparent 100%)',
            }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          />

          <div
            style={{
              background: `radial-gradient(circle at ${lightDrift}% 30%, rgba(214,183,123,0.28) 0%, rgba(196,154,90,0.12) 32%, rgba(25,11,11,0.94) 74%)`,
            }}
            className="pointer-events-none absolute inset-0"
          />

          <div className="relative z-10 space-y-10">
            <div data-reveal className="reveal-fade space-y-2">
              <p className="text-[10.5px] font-medium tracking-[0.26em] text-[#D6B77B]">
                {lang === 'fa'
                  ? 'کف‌ابریشم، مس و آسمان اصفهان'
                  : 'PURE SILK GROUND & COPPER'}
              </p>

              <h2
                className={`text-[1.65rem] leading-snug font-medium text-[#F1E5D1] ${
                  lang === 'fa'
                    ? 'font-persian-editorial'
                    : 'font-serif-display text-3xl'
                }`}
              >
                {lang === 'fa'
                  ? 'تابش زرینِ متن قالی در روشنایی روز'
                  : 'Luminous Champagne Silk Ground'}
              </h2>

              <div className="h-px w-20 bg-gradient-to-r from-[#C49A5A] to-transparent" />
            </div>

            {/* ATELIER CARD */}

            <div
              data-reveal
              className="reveal-fade bg-[#190B0B]/85 border border-[#C49A5A]/40 backdrop-blur-md p-6 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-[#D6B77B]" />
                <span className="text-[10px] tracking-[0.2em] text-[#D6B77B]">
                  {lang === 'fa' ? 'جزئیات متریال' : 'MATERIAL DETAILS'}
                </span>
              </div>

              <ul className="space-y-4 text-xs leading-relaxed text-[#D8C6AD]">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D6B77B]" />

                  <span>
                    <strong className="text-[#E8CC98] font-semibold">
                      {lang === 'fa'
                        ? 'زمینه تمام‌کف‌ابریشم: '
                        : 'Pure Silk Foundation: '}
                    </strong>

                    {lang === 'fa'
                      ? 'تمامی زمینه از ابریشم خالص طبیعی بافته شده و نور فضا را مانند آینه‌ای گرم بازتاب می‌دهد.'
                      : 'Woven entirely with natural silk pile, reflecting ambient room light with liquid-gold warmth.'}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#B85A3A]" />

                  <span>
                    <strong className="text-[#E8CC98] font-semibold">
                      {lang === 'fa'
                        ? 'مس گداخته و انار: '
                        : 'Burnished Copper & Madder: '}
                    </strong>

                    {lang === 'fa'
                      ? 'رنگرزی گیاهی سنتی در ترنج و لچک‌ها، تضادی شاهانه و گرم در کنار رنگ شامپاینی ایجاد می‌کند.'
                      : 'Traditional madder and pomegranate dyes creating regal depth in medallion and spandrels.'}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#5B8296]" />

                  <span>
                    <strong className="text-[#E8CC98] font-semibold">
                      {lang === 'fa'
                        ? 'آبی آسمان اصفهان: '
                        : 'Isfahan Powder Sky: '}
                    </strong>

                    {lang === 'fa'
                      ? 'تارهای ابریشم فیروزه‌ای-آسمانی در دل گل‌های مسی برای القای حس خنکای معماری صفوی.'
                      : 'Delicate sky-blue silk accents evoking Safavid palace domes.'}
                  </span>
                </li>
              </ul>

              {/* PIGMENT SWATCHES */}

              <div className="pt-5 border-t border-[#C49A5A]/25 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  {pigmentDetails.map((p, idx) => {
                    const selected = idx === activeSwatch;

                    return (
                      <button
                        key={p.hex}
                        type="button"
                        onClick={() => setActiveSwatch(idx)}
                        className={`flex flex-1 flex-col items-center gap-2 transition-opacity cursor-pointer ${
                          selected
                            ? 'opacity-100'
                            : 'opacity-50 hover:opacity-90'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: p.hex }}
                          className={`h-5 w-5 rounded-full transition-transform ${
                            selected
                              ? 'scale-110 ring-2 ring-[#D6B77B] ring-offset-2 ring-offset-[#190B0B]'
                              : 'ring-1 ring-[#F1E5D1]/30'
                          }`}
                        />

                        <span className="text-[9px] font-medium text-[#E8D5B6] text-center">
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="border border-[#C49A5A]/20 bg-[#281211]/75 px-4 py-3">
                  <p className="text-center text-[11px] leading-relaxed text-[#D8C6AD]">
                    {activePigment.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. WEAVE LOUPE
        ========================================================= */}

        <section className="relative bg-[#190B0B] px-6 py-16 overflow-hidden space-y-7">
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#C49A5A]/40 to-transparent" />

          <div data-reveal className="reveal-fade relative z-10 space-y-2">
            <p className="text-[10.5px] font-medium tracking-[0.26em] text-[#D6B77B]">
              {lang === 'fa'
                ? 'ذره‌بین بافت ۶۵ رج'
                : 'HIGH-JEWELRY WEAVE LOUPE'}
            </p>

            <h2
              className={`text-[1.55rem] font-medium text-[#F1E5D1] ${
                lang === 'fa'
                  ? 'font-persian-editorial'
                  : 'font-serif-display text-3xl'
              }`}
            >
              {lang === 'fa'
                ? 'ظرافت گره‌ها در قلب شمسه‌ی مسی'
                : 'Inspect Every 65-Raj Silk Knot'}
            </h2>

            <p className="text-xs text-[#B9A28A]">
              {lang === 'fa'
                ? 'انگشت خود را روی ترنج بکشید تا گره‌های ابریشم ۲.۴ برابر بزرگ شوند.'
                : 'Touch or glide across the medallion to magnify the silk knots 2.4×.'}
            </p>
          </div>

          {/* INTERACTIVE LOUPE */}

          <div
            ref={loupeBoxRef}
            data-reveal
            onPointerDown={(e) => handleLoupeMove(e.clientX, e.clientY)}
            onPointerMove={(e) => {
              if (e.buttons > 0 || e.pointerType === 'mouse') {
                handleLoupeMove(e.clientX, e.clientY);
              }
            }}
            className="reveal-curtain relative z-10 mx-auto max-w-[340px] aspect-square overflow-hidden border border-[#C49A5A]/60 shadow-[0_28px_60px_-22px_rgba(0,0,0,0.7)] touch-none select-none cursor-crosshair"
          >
            <img
              src="./images/rugs/kld-isf-07p-detail-medallion.webp"
              alt={lang === 'fa' ? 'ترنج مسی و کف‌ابریشم' : 'Copper Silk Medallion'}
              className="h-full w-full object-cover"
              draggable={false}
            />

            <div
              style={{
                left: `${loupePos.x}%`,
                top: `${loupePos.y}%`,
                backgroundImage:
                  'url(./images/rugs/kld-isf-07p-detail-medallion.webp)',
                backgroundSize: '240% 240%',
                backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
              }}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full border-2 border-[#D6B77B] shadow-[0_14px_34px_rgba(0,0,0,0.65),inset_0_0_16px_rgba(255,255,255,0.28)] ring-4 ring-[#C49A5A]/25"
            >
              <span
                dir="ltr"
                className="absolute -bottom-3 inset-x-0 mx-auto w-fit bg-[#190B0B] border border-[#C49A5A]/50 px-2 py-0.5 font-serif-display text-[9px] tracking-widest text-[#D6B77B]"
              >
                2.4×
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openZoom(3);
              }}
              className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 bg-[#C49A5A] border border-[#E8D2A7] px-3 py-1.5 text-[10px] font-semibold text-[#190B0B] shadow-lg cursor-pointer transition-colors hover:bg-[#D6B77B]"
            >
              <ZoomIn className="h-3 w-3" />

              {lang === 'fa' ? 'نمای تمام‌صفحه' : 'Fullscreen'}
            </button>
          </div>

          {/* MACRO DETAIL STRIP */}

          <div
            data-reveal
            onClick={() => openZoom(4)}
            className="reveal-fade relative z-10 flex items-center gap-4 border-y border-[#C49A5A]/25 py-4 cursor-zoom-in group"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden border border-[#C49A5A]/40 shadow-sm">
              <img
                src="./images/rugs/kld-isf-07p-macro-extreme.jpg"
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-semibold text-[#D6B77B]">
                {lang === 'fa'
                  ? 'گره‌بافی ریز ابریشم در رده ۶۵ رج اصفهان'
                  : 'Microscopic 65-Raj Silk Knot Density'}
              </p>

              <p className="text-[11px] leading-relaxed text-[#B9A28A]">
                {lang === 'fa'
                  ? 'برجستگی تارهای ابریشم آبی آسمانی و مس گداخته روی بستر ابریشم شامپاینی.'
                  : 'Powder sky-blue and copper silk knots rising from the golden champagne field.'}
              </p>
            </div>

            <ZoomIn className="ms-auto h-4 w-4 shrink-0 text-[#C49A5A] opacity-70 group-hover:opacity-100" />
          </div>
        </section>

        {/* =========================================================
            5. PROVENANCE DOSSIER
        ========================================================= */}

        <section className="relative pt-12 pb-14 px-6 bg-[#281211] overflow-hidden">
          <div className="absolute top-0 inset-x-0 space-y-[3px]">
            <div className="h-[2px] w-full bg-[#C49A5A]" />
            <div className="h-[1px] w-full bg-[#D6B77B]/50" />
          </div>

          <div className="absolute top-0 end-0 w-64 h-64 rounded-full bg-[#651F20]/25 blur-[90px] pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <div data-reveal className="reveal-fade space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                  <p className="text-[10px] font-medium tracking-[0.24em] text-[#D6B77B]">
                    {lang === 'fa'
                      ? 'شناسنامه رسمی گالری'
                      : 'OFFICIAL PROVENANCE'}
                  </p>

                  <h2
                    className={`text-lg font-medium text-[#F1E5D1] leading-snug ${
                      lang === 'fa'
                        ? 'font-persian-editorial'
                        : 'font-serif-display text-xl'
                    }`}
                  >
                    {lang === 'fa'
                      ? 'امکان پرو و نمایش اختصاصی جفت در محل شما'
                      : 'Private In-Residence Trial'}
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#C49A5A]/70 bg-[#190B0B] rotate-45 shadow-[0_0_25px_rgba(196,154,90,0.12)] me-1">
                  <span
                    dir="ltr"
                    className="-rotate-45 font-serif-display text-[9px] font-semibold tracking-wider text-[#D6B77B]"
                  >
                    07P
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-[#C49A5A]/60 via-[#C49A5A]/20 to-transparent" />

              <div className="space-y-3.5 text-xs border-y border-[#C49A5A]/25 py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[#B9A28A]">
                    {lang === 'fa' ? 'کد بایگانی' : 'Archive Code'}
                  </span>

                  <span
                    dir="ltr"
                    className="font-serif-display tracking-[0.2em] text-[#D6B77B] font-medium"
                  >
                    {rug.archiveCode}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[#B9A28A]">
                    {lang === 'fa' ? 'حدود ارزش گالری' : 'Guide Valuation'}
                  </span>

                  <span className="font-semibold text-[#D6B77B]">
                    {lang === 'fa'
                      ? rug.valuationToman
                      : rug.valuationUsd}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[#B9A28A]">
                    {lang === 'fa' ? 'مدت و کارگاه' : 'Loom & Duration'}
                  </span>

                  <span className="text-[#F1E5D1]">
                    {rug.weavingDuration[lang]}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[#B9A28A]">
                    {lang === 'fa' ? 'مدرک اصالت' : 'Certificate'}
                  </span>

                  <span className="text-[#F1E5D1] text-end">
                    {rug.signatureNote[lang]}
                  </span>
                </div>
              </div>
            </div>

            {/* FINAL CTA */}

            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry(rug.archiveCode)}
                className="group relative inline-flex w-full max-w-xs items-center justify-center gap-3 bg-[#C49A5A] px-8 py-4 text-xs font-semibold tracking-wider text-[#190B0B] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.5)] cursor-pointer transition-all hover:bg-[#D6B77B] hover:shadow-[0_18px_36px_-12px_rgba(196,154,90,0.3)] active:scale-[0.99]"
              >
                <span className="pointer-events-none absolute top-0 start-0 h-2 w-2 border-t-2 border-s-2 border-[#190B0B]" />

                <span className="pointer-events-none absolute bottom-0 end-0 h-2 w-2 border-b-2 border-e-2 border-[#190B0B]" />

                <span className="h-1.5 w-1.5 rotate-45 bg-[#651F20]" />

                <span>
                  {lang === 'fa'
                    ? 'هماهنگی بازدید و استعلام قطعی جفت'
                    : 'Arrange Private Viewing'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate({ type: 'home' })}
                className="text-[11px] font-medium text-[#B9A28A] underline-offset-4 hover:text-[#D6B77B] hover:underline cursor-pointer transition-colors"
              >
                {lang === 'fa'
                  ? 'بازگشت به گالری کلاهدوزان'
                  : 'Return to Gallery Collection'}
              </button>
            </div>
          </div>

          {/* EDITORIAL IMAGE */}

          <div
            onClick={() => openZoom(7)}
            className="mt-12 -mx-6 -mb-14 relative h-36 w-[calc(100%+3rem)] overflow-hidden cursor-zoom-in"
          >
            <img
              src="./images/rugs/kld-isf-07p-editorial.jpg"
              alt={
                lang === 'fa'
                  ? 'تابش مایل روی کف‌ابریشم جفت'
                  : 'Raking Sunlight on Silk Ground'
              }
              style={{
                WebkitMaskImage:
                  'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 38%, #000 100%)',
                maskImage:
                  'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 38%, #000 100%)',
              }}
              className="h-full w-full object-cover object-bottom"
            />

            <span className="absolute bottom-3 end-4 inline-flex items-center gap-1 bg-[#190B0B]/90 border border-[#C49A5A]/40 px-2.5 py-1 text-[9.5px] font-semibold text-[#D6B77B]">
              <ZoomIn className="h-2.5 w-2.5 text-[#D6B77B]" />

              {lang === 'fa'
                ? 'تابش نور مایل بر کف‌ابریشم · ۳×'
                : 'Silk Ground 3×'}
            </span>
          </div>
        </section>
      </main>

      <WeaveZoomModal
        open={zoomOpen}
        archiveCode={rug.archiveCode}
        slides={storySlides}
        initialIndex={zoomIdx}
        accentColor="#C49A5A"
        lang={lang}
        onClose={() => setZoomOpen(false)}
      />
    </div>
  );
}