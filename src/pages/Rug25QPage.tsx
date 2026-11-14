import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WeaveZoomModal } from '../components/WeaveZoomModal';
import type { Lang, RouteView, RugPiece } from '../types';

interface Rug25QPageProps {
  rug: RugPiece;
  lang: Lang;
  onToggleLang: (next: Lang) => void;
  onNavigate: (target: RouteView, sectionId?: string) => void;
  onOpenInquiry: (pieceCode?: string) => void;
}

export function Rug25QPage({
  rug,
  lang,
  onToggleLang,
  onNavigate,
  onOpenInquiry,
}: Rug25QPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSwatch, setActiveSwatch] = useState(2);
  const [loupePos, setLoupePos] = useState({ x: 54, y: 46 });
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
      src: './images/rugs/kld-isf-25q-mansion.jpg',
      label: lang === 'fa' ? 'چیدمان تالار عمارت' : 'Sunlit Residence Scale',
    },
    {
      id: 'full',
      src: rug.image,
      label: lang === 'fa' ? 'قواره مربع ۲.۶۰ × ۲.۶۰ متر' : 'Full 2.60 × 2.60 m Square',
    },
    {
      id: 'angle',
      src: './images/rugs/kld-isf-25q-macro-angle.jpg',
      label: lang === 'fa' ? 'تلالو زاویه‌دار ابریشم ۶۰ رج' : 'Raking Silk Relief',
    },
    {
      id: 'medallion',
      src: './images/rugs/kld-isf-25q-detail-medallion.webp',
      label: lang === 'fa' ? 'ترنج ستاره‌ای ۶۰ رج' : 'Central Rose Medallion',
    },
    {
      id: 'loom',
      src: './images/rugs/kld-isf-25q-loom.jpg',
      label: lang === 'fa' ? 'کلاف ابریشم و گوشه‌ی بافت' : 'Botanical Silk Skeins',
    },
    {
      id: 'corner',
      src: './images/rugs/kld-isf-25q-detail-corner.webp',
      label: lang === 'fa' ? 'لچک و قرینه چهارگوش' : 'Corner Spandrel Symmetry',
    },
    {
      id: 'fringe',
      src: './images/rugs/kld-isf-25q-macro-fringe.jpg',
      label: lang === 'fa' ? 'ریشه‌ی دست‌باف چله ابریشم' : 'Hand-Tied Silk Fringe',
    },
  ];

  const pigmentDetails = [
    {
      hex: '#141E30',
      name: lang === 'fa' ? 'لاجورد شب' : 'Midnight Indigo',
      note:
        lang === 'fa'
          ? 'نیل طبیعی و پوست گردو · زمینه‌ی مخملی برای درخشش گل‌های ابریشم'
          : 'Natural indigo & walnut husk · luminous depth framing silk blooms',
    },
    {
      hex: '#EFE8DC',
      name: lang === 'fa' ? 'عاج خام' : 'Natural Ivory',
      note:
        lang === 'fa'
          ? 'ابریشم بی‌رنگ و کرک سفید · حاشیه‌ی آرام و هم‌نشین با سنگ و چوب'
          : 'Raw silk & pure wool · sunlit border bridging stone and indigo',
    },
    {
      hex: '#D8A28E',
      name: lang === 'fa' ? 'گلبهی کهنه' : 'Antique Blush',
      note:
        lang === 'fa'
          ? 'روناسِ کهنه و پوست انار · گرمای ابریشمیِ ترنج و گل‌های شاه‌عباسی'
          : 'Aged madder & pomegranate · warm silk signature of the rose medallion',
    },
    {
      hex: '#748980',
      name: lang === 'fa' ? 'سبز سدری' : 'Muted Sage',
      note:
        lang === 'fa'
          ? 'اسپرک و نیل رقیق · ظرافت برگ‌ها و بندهای اسلیمی'
          : 'Botanical weld & soft indigo · fine arabesque tracery',
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
      82,
      Math.max(18, ((clientX - rect.left) / rect.width) * 100),
    );

    const y = Math.min(
      82,
      Math.max(18, ((clientY - rect.top) / rect.height) * 100),
    );

    setLoupePos({ x, y });
  };

  const heroScale = 1 + Math.min(scrollY, 700) * 0.00018;
  const heroParallaxY = Math.min(scrollY, 700) * 0.14;
  const shamsehRotation = scrollY * 0.025;
  const lightDrift = 28 + Math.sin(scrollY * 0.004) * 26;

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#190B0B] text-[#F1E5D1] overflow-x-clip selection:bg-[#C49A5A] selection:text-[#190B0B]"
    >
      {/* HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-[#190B0B]/95 backdrop-blur-md border-b border-[#C49A5A]/25 shadow-[0_8px_30px_rgba(0,0,0,0.2)]'
            : 'bg-transparent'
        }`}
      >
        <div
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: lang === 'fa' ? 'right' : 'left',
          }}
          className="h-[2px] w-full bg-gradient-to-r from-[#8E3B36] via-[#C49A5A] to-[#D6B77B] transition-transform duration-75"
        />

        <div className="mx-auto flex max-w-md md:max-w-2xl items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={() => onNavigate({ type: 'home' })}
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-2.5 py-1 transition-colors cursor-pointer ${
              scrolled
                ? 'text-[#F1E5D1]'
                : 'bg-[#190B0B]/75 text-[#F1E5D1] backdrop-blur-md'
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
                : 'bg-[#190B0B]/75 text-[#D6B77B] backdrop-blur-md'
            }`}
          >
            KLD · ISF-25Q
          </span>

          <button
            type="button"
            onClick={() => onNavigate({ type: 'typography' })}
            className="text-[10px] tracking-wider px-2 py-1 rounded transition-colors cursor-pointer border border-[#C49A5A]/50 text-[#D6B77B] bg-[#281211]/80 flex items-center gap-1"
          >
            <span className="text-[#D6B77B]">✦</span>
            <span>{lang === 'fa' ? '۱۰ تایپوگرافی' : 'Typography'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLang(lang === 'fa' ? 'en' : 'fa')}
            className={`text-[10px] tracking-[0.2em] px-2.5 py-1 transition-colors cursor-pointer ${
              scrolled
                ? 'text-[#F1E5D1]'
                : 'bg-[#190B0B]/75 text-[#F1E5D1] backdrop-blur-md'
            }`}
          >
            {lang === 'fa' ? 'EN' : 'FA'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-md md:max-w-2xl">
        {/* 1. HERO */}
        <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
          <img
            src="./images/rugs/kld-isf-25q-mansion.jpg"
            alt={rug.title[lang]}
            style={{
              transform: `translate3d(0, ${heroParallaxY}px, 0) scale(${heroScale})`,
            }}
            className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          />

          <div
            style={{
              background:
                'linear-gradient(180deg, rgba(25,11,11,0.02) 25%, rgba(25,11,11,0.25) 43%, rgba(25,11,11,0.78) 65%, rgba(25,11,11,0.97) 84%, #190B0B 100%)',
            }}
            className="pointer-events-none absolute inset-0"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(196,154,90,0.13),transparent_65%)]" />

          <div className="relative z-10 px-7 pb-10 pt-8 text-center space-y-3.5">
            <p className="font-modern-sans text-[10.5px] font-medium tracking-[0.28em] text-[#D6B77B] uppercase">
              {lang === 'fa' ? 'اصفهان · قواره مربع نادر' : 'ISFAHAN · RARE SQUARE'}
            </p>

            <h1
              className={`text-[2.25rem] leading-[1.3] font-normal text-[#F1E5D1] drop-shadow-[0_3px_15px_rgba(0,0,0,0.35)] ${
                lang === 'fa'
                  ? 'font-traditional-display'
                  : 'font-serif-display text-[2.5rem]'
              }`}
            >
              {lang === 'fa' ? 'قالیِ مربعِ کرک و ابریشم' : 'Midnight Indigo & Rose Square'}
            </h1>

            <p className="font-modern-sans text-[12px] font-medium text-[#E3CDA8] tracking-wider">
              {lang === 'fa'
                ? '۲.۶۰ × ۲.۶۰ متر   ·   ۲,۲۲۰ گره   ·   ۶۰ رج اصفهان'
                : '2.60 × 2.60 m   ·   2,220 Knots   ·   60-Raj Silk'}
            </p>

            <p className="text-xs text-[#D6B77B] font-medium">
              {lang === 'fa' ? rug.valuationToman : `${rug.valuationUsd} Gallery Guide`}
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onOpenInquiry(rug.archiveCode)}
                className="group relative inline-flex items-center gap-3 bg-[#C49A5A] px-8 py-3.5 text-xs font-semibold tracking-wider text-[#190B0B] shadow-[0_14px_34px_-12px_rgba(196,154,90,0.4)] cursor-pointer transition-all hover:bg-[#D6B77B] active:scale-[0.99]"
              >
                <span className="pointer-events-none absolute inset-0 border border-[#F1E5D1]/40" />
                <span className="pointer-events-none absolute top-0 start-0 h-2 w-2 border-t-2 border-s-2 border-[#190B0B]" />
                <span className="pointer-events-none absolute bottom-0 end-0 h-2 w-2 border-b-2 border-e-2 border-[#190B0B]" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#190B0B]" />
                <span>{lang === 'fa' ? 'رزرو بازدید اختصاصی' : 'Request Private Viewing'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate({ type: 'typography' })}
                className="inline-flex items-center gap-2 border border-[#C49A5A]/65 bg-[#281211]/85 px-5 py-3 text-xs font-semibold text-[#D6B77B] hover:bg-[#351715] transition-all shadow-sm cursor-pointer backdrop-blur-md"
              >
                <span className="text-[#D6B77B]">✦</span>
                <span>
                  {lang === 'fa'
                    ? '۱۰ تایپوگرافی اصیل و نورپردازی'
                    : '10 Persian Typography Studies'}
                </span>
                <span>←</span>
              </button>
            </div>

            <div className="pt-3 flex flex-col items-center gap-1 opacity-80">
              <span className="h-6 w-px bg-gradient-to-b from-[#D6B77B]/80 to-transparent" />
            </div>
          </div>
        </section>

        {/* 2. ARCHITECTURAL PROPORTION */}
        <section
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(196,154,90,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,154,90,0.065) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          className="relative px-6 py-16 bg-[#190B0B] border-t border-[#C49A5A]/20 space-y-8"
        >
          <div data-reveal className="reveal-fade space-y-1.5">
            <p className="text-[10.5px] font-medium tracking-[0.26em] text-[#C49A5A]">
              {lang === 'fa' ? 'مهندسی قواره و تقارن' : 'ARCHITECTURAL PROPORTION'}
            </p>

            <h2
              className={`text-[1.6rem] leading-snug font-medium text-[#F1E5D1] ${
                lang === 'fa'
                  ? 'font-persian-editorial'
                  : 'font-serif-display text-3xl'
              }`}
            >
              {lang === 'fa'
                ? 'قواره‌ی مربع ۶.۷۶ متری با تقارن کامل'
                : 'Rare 6.76 m² Square Equilibrium'}
            </h2>
          </div>

          <div
            data-reveal
            className="reveal-curtain relative mx-auto max-w-[330px] pt-6 pb-2 ps-6"
          >
            <div className="absolute top-0 inset-x-0 ps-6 flex items-center justify-between text-[10.5px] font-medium text-[#D6B77B]">
              <span className="h-2 w-px bg-[#C49A5A]" />
              <span className="h-px flex-1 bg-[#C49A5A]/55 mx-2" />
              <span className="px-2.5 bg-[#190B0B] border border-[#C49A5A]/45">
                {lang === 'fa' ? '۲.۶۰ متر' : '2.60 m'}
              </span>
              <span className="h-px flex-1 bg-[#C49A5A]/55 mx-2" />
              <span className="h-2 w-px bg-[#C49A5A]" />
            </div>

            <div className="absolute start-0 top-6 bottom-2 flex flex-col items-center justify-between text-[10.5px] font-medium text-[#D6B77B]">
              <span className="w-2 h-px bg-[#C49A5A]" />
              <span className="w-px flex-1 bg-[#C49A5A]/55 my-1" />
              <span className="[writing-mode:vertical-rl] py-2 bg-[#190B0B]">
                {lang === 'fa' ? '۲.۶۰ متر' : '2.60 m'}
              </span>
              <span className="w-px flex-1 bg-[#C49A5A]/55 my-1" />
              <span className="w-2 h-px bg-[#C49A5A]" />
            </div>

            <div
              onClick={() => openZoom(1)}
              className="relative aspect-square w-full overflow-hidden shadow-[0_26px_55px_-22px_rgba(0,0,0,0.65)] cursor-zoom-in group border border-[#C49A5A]/40"
            >
              <img
                src={rug.image}
                alt={rug.title[lang]}
                className="h-full w-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-[1.06]"
              />

              <svg
                viewBox="0 0 300 300"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <line
                  x1="150"
                  y1="10"
                  x2="150"
                  y2="290"
                  stroke="#D6B77B"
                  strokeWidth="0.85"
                  strokeDasharray="4 4"
                  opacity="0.9"
                />
                <line
                  x1="10"
                  y1="150"
                  x2="290"
                  y2="150"
                  stroke="#D6B77B"
                  strokeWidth="0.85"
                  strokeDasharray="4 4"
                  opacity="0.9"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="58"
                  fill="none"
                  stroke="#C49A5A"
                  strokeWidth="1.15"
                />
                <circle cx="150" cy="150" r="3" fill="#D6B77B" />
                <rect
                  x="19"
                  y="19"
                  width="262"
                  height="262"
                  fill="none"
                  stroke="#D6B77B"
                  strokeWidth="0.75"
                  opacity="0.7"
                />
              </svg>

              <span className="absolute bottom-2.5 end-2.5 inline-flex items-center gap-1 bg-[#190B0B]/90 border border-[#C49A5A]/50 px-2.5 py-1 text-[10px] font-medium text-[#F1E5D1]">
                <ZoomIn className="h-3 w-3 text-[#D6B77B]" />
                {lang === 'fa' ? '۳× نقشه کامل' : '3× Full Plan'}
              </span>
            </div>
          </div>

          <div data-reveal className="reveal-fade space-y-4 pt-2">
            {rug.threeHighlights.map((item) => (
              <div
                key={item.title.en}
                className="border-s border-[#C49A5A]/70 ps-4 space-y-0.5"
              >
                <p className="text-[13px] font-semibold text-[#F1E5D1]">
                  {item.title[lang]}
                </p>
                <p className="text-xs leading-relaxed text-[#B9A28A]">
                  {item.note[lang]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SILK & INDIGO */}
        <section className="relative bg-[#281211] text-[#F1E5D1] px-6 py-20 overflow-hidden">
          <img
            src="./images/rugs/kld-isf-25q-macro-angle.jpg"
            alt=""
            aria-hidden="true"
            style={{
              WebkitMaskImage:
                'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.88) 24%, rgba(0,0,0,0.86) 74%, transparent 100%)',
              maskImage:
                'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.88) 24%, rgba(0,0,0,0.86) 74%, transparent 100%)',
            }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-65"
          />

          <div
            style={{
              background: `radial-gradient(circle at ${lightDrift}% 32%, rgba(214,183,123,0.24) 0%, rgba(196,154,90,0.10) 30%, rgba(25,11,11,0.94) 74%)`,
            }}
            className="pointer-events-none absolute inset-0"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#190B0B]/25 via-transparent to-[#190B0B]/45" />

          <div className="relative z-10 space-y-10">
            <div data-reveal className="reveal-fade space-y-2">
              <p className="text-[10.5px] font-medium tracking-[0.26em] text-[#D6B77B]">
                {lang === 'fa' ? 'الیاف، رنگرزی و عمق ۶۰ رج' : 'KORK WOOL, SILK & DYES'}
              </p>

              <h2
                className={`text-[1.65rem] leading-snug font-medium text-[#F1E5D1] ${
                  lang === 'fa'
                    ? 'font-persian-editorial'
                    : 'font-serif-display text-3xl'
                }`}
              >
                {lang === 'fa'
                  ? 'هم‌نشینی کرک مرینوس و ابریشم برجسته در لاجورد شب'
                  : 'Supple Kork & Raised Silk on Midnight Indigo'}
              </h2>
            </div>

            <div
              data-reveal
              className="reveal-fade bg-[#190B0B]/85 border border-[#C49A5A]/30 backdrop-blur-md p-6 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            >
              <ul className="space-y-3 text-xs leading-relaxed text-[#D9C7AE]">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D6B77B]" />
                  <span>
                    <strong className="text-[#F1E5D1] font-semibold">
                      {lang === 'fa' ? 'چله تمام‌ابریشم تابیده: ' : 'Pure Silk Warp: '}
                    </strong>
                    {lang === 'fa'
                      ? 'استحکام بی‌مانند برای حفظ دقیق هندسه‌ی مربع در طول نسل‌ها.'
                      : 'Spun mulberry silk foundation locking 1:1 square tension.'}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D6B77B]" />
                  <span>
                    <strong className="text-[#F1E5D1] font-semibold">
                      {lang === 'fa' ? 'پرز کرک دست‌ریس: ' : 'Merino Kork Pile: '}
                    </strong>
                    {lang === 'fa'
                      ? 'تراکم ۲,۲۲۰ گره در رده ۶۰ رج؛ لطافت مخملی همراه با دوام و ماندگاری بالا.'
                      : '2,220-knot Isfahan gauge combining velvety softness with longevity.'}
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D6B77B]" />
                  <span>
                    <strong className="text-[#F1E5D1] font-semibold">
                      {lang === 'fa' ? 'تلالو دوگانه ابریشم: ' : 'Optical Silk Relief: '}
                    </strong>
                    {lang === 'fa'
                      ? 'گل‌های ابریشمی با اختلاف ارتفاع ملایم، با هر زاویه نور روز می‌درخشند.'
                      : 'Subtly raised silk blossoms ignite against matte indigo in daylight.'}
                  </span>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#C49A5A]/25 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  {pigmentDetails.map((p, idx) => {
                    const selected = idx === activeSwatch;

                    return (
                      <button
                        key={p.hex}
                        type="button"
                        onClick={() => setActiveSwatch(idx)}
                        className={`flex flex-1 flex-col items-center gap-1.5 transition-opacity cursor-pointer ${
                          selected
                            ? 'opacity-100'
                            : 'opacity-55 hover:opacity-85'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: p.hex }}
                          className={`h-4 w-4 rounded-full transition-transform ${
                            selected
                              ? 'scale-120 ring-2 ring-[#D6B77B] ring-offset-2 ring-offset-[#190B0B]'
                              : 'ring-1 ring-[#C49A5A]/50'
                          }`}
                        />

                        <span className="text-[10px] font-medium text-[#F1E5D1]">
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-center text-[11px] leading-relaxed text-[#B9A28A]">
                  {activePigment.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. MAGNIFIER */}
        <section className="relative px-6 py-16 overflow-hidden space-y-7 bg-[#190B0B]">
          <svg
            aria-hidden="true"
            viewBox="0 0 240 240"
            style={{ transform: `rotate(${shamsehRotation}deg)` }}
            className="pointer-events-none absolute -end-20 top-6 h-60 w-60 text-[#C49A5A]/[0.07]"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="48" y="48" width="144" height="144" />
              <rect
                x="48"
                y="48"
                width="144"
                height="144"
                transform="rotate(45 120 120)"
              />
              <circle cx="120" cy="120" r="88" strokeDasharray="3 5" />
            </g>
          </svg>

          <div data-reveal className="reveal-fade relative z-10 space-y-1.5">
            <p className="text-[10.5px] font-medium tracking-[0.26em] text-[#C49A5A]">
              {lang === 'fa' ? 'ذره‌بین بافت ۶۰ رج' : 'HIGH-JEWELRY WEAVE LOUPE'}
            </p>

            <h2
              className={`text-[1.55rem] font-medium text-[#F1E5D1] ${
                lang === 'fa'
                  ? 'font-persian-editorial'
                  : 'font-serif-display text-3xl'
              }`}
            >
              {lang === 'fa'
                ? 'ظرافت گره‌ها در قلب ترنج گلبهی'
                : 'Inspect Every Hand-Tied Knot'}
            </h2>

            <p className="text-xs text-[#B9A28A]">
              {lang === 'fa'
                ? 'انگشت خود را روی ترنج بکشید تا گره‌های ۶۰ رج ۲.۴ برابر بزرگ شوند.'
                : 'Touch or glide across the medallion to magnify the 60-Raj silk knots.'}
            </p>
          </div>

          <div
            ref={loupeBoxRef}
            data-reveal
            onPointerDown={(e) => handleLoupeMove(e.clientX, e.clientY)}
            onPointerMove={(e) => {
              if (e.buttons > 0 || e.pointerType === 'mouse') {
                handleLoupeMove(e.clientX, e.clientY);
              }
            }}
            className="reveal-curtain relative z-10 mx-auto max-w-[340px] aspect-square overflow-hidden shadow-[0_28px_60px_-22px_rgba(0,0,0,0.7)] touch-none select-none cursor-crosshair border border-[#C49A5A]/40"
          >
            <img
              src="./images/rugs/kld-isf-25q-detail-medallion.webp"
              alt={lang === 'fa' ? 'ترنج مرکزی قالی ۶۰ رج' : 'Rose Medallion Weave'}
              className="h-full w-full object-cover"
              draggable={false}
            />

            <div
              style={{
                left: `${loupePos.x}%`,
                top: `${loupePos.y}%`,
                backgroundImage:
                  'url(./images/rugs/kld-isf-25q-detail-medallion.webp)',
                backgroundSize: '240% 240%',
                backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
              }}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full border-2 border-[#D6B77B] shadow-[0_14px_34px_rgba(0,0,0,0.55),inset_0_0_16px_rgba(255,255,255,0.18)] ring-4 ring-[#C49A5A]/25"
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
              className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 bg-[#C49A5A]/95 px-3 py-1.5 text-[10px] font-semibold text-[#190B0B] shadow-sm cursor-pointer hover:bg-[#D6B77B] transition-colors"
            >
              <ZoomIn className="h-3 w-3 text-[#190B0B]" />
              {lang === 'fa' ? 'نمای تمام‌صفحه' : 'Fullscreen'}
            </button>
          </div>

          <div
            data-reveal
            onClick={() => openZoom(4)}
            className="reveal-fade relative z-10 flex items-center gap-4 border-y border-[#C49A5A]/25 py-4 cursor-zoom-in group"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden shadow-sm border border-[#C49A5A]/35">
              <img
                src="./images/rugs/kld-isf-25q-loom.jpg"
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-semibold text-[#F1E5D1]">
                {lang === 'fa'
                  ? 'کلاف‌های ابریشم طبیعی و پرداخت گوشه‌ی لچک'
                  : 'Natural Dyed Silk Skeins & Corner Fold'}
              </p>

              <p className="text-[11px] leading-relaxed text-[#B9A28A]">
                {lang === 'fa'
                  ? '۱۸ ماه بافت پیوسته توسط دو استادباف هم‌تراز برای یکدستی کامل ترنج و حاشیه.'
                  : '18 months of dual-master weaving ensuring crisp corner geometry.'}
              </p>
            </div>

            <ZoomIn className="ms-auto h-4 w-4 shrink-0 text-[#C49A5A] opacity-70 group-hover:opacity-100" />
          </div>
        </section>

        {/* 5. PROVENANCE */}
        <section className="relative pt-10 pb-14 px-6 bg-[#281211] overflow-hidden">
          <div className="absolute top-0 inset-x-0 space-y-[3px]">
            <div className="h-[2px] w-full bg-[#C49A5A]" />
            <div className="h-[1px] w-full bg-[#D6B77B]/45" />
          </div>

          <div className="absolute -top-20 -end-20 h-64 w-64 rounded-full bg-[#8E3B36]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <div data-reveal className="reveal-fade space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-medium tracking-[0.24em] text-[#C49A5A]">
                    {lang === 'fa' ? 'شناسنامه رسمی گالری' : 'OFFICIAL PROVENANCE'}
                  </p>

                  <h2
                    className={`text-lg font-medium text-[#F1E5D1] leading-snug ${
                      lang === 'fa'
                        ? 'font-persian-editorial'
                        : 'font-serif-display text-xl'
                    }`}
                  >
                    {lang === 'fa'
                      ? 'امکان پرو و نمایش اختصاصی در محل شما'
                      : 'Private In-Residence Trial'}
                  </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C49A5A]/70 bg-[#190B0B] rotate-45 shadow-[0_5px_20px_rgba(0,0,0,0.2)] me-1">
                  <span
                    dir="ltr"
                    className="-rotate-45 font-serif-display text-[9px] font-semibold tracking-wider text-[#D6B77B]"
                  >
                    25Q
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs border-y border-[#C49A5A]/25 py-4">
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
                    {lang === 'fa' ? 'حدود ارزش' : 'Guide Valuation'}
                  </span>

                  <span className="font-semibold text-[#D6B77B]">
                    {lang === 'fa' ? rug.valuationToman : rug.valuationUsd}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[#B9A28A]">
                    {lang === 'fa' ? 'مدت و کارگاه' : 'Loom & Time'}
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

            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry(rug.archiveCode)}
                className="group relative inline-flex w-full max-w-xs items-center justify-center gap-3 bg-[#C49A5A] px-8 py-4 text-xs font-semibold tracking-wider text-[#190B0B] shadow-[0_18px_36px_-12px_rgba(196,154,90,0.3)] cursor-pointer transition-all hover:bg-[#D6B77B] active:scale-[0.99]"
              >
                <span className="pointer-events-none absolute inset-0 border border-[#F1E5D1]/40" />
                <span className="pointer-events-none absolute top-0 start-0 h-2 w-2 border-t-2 border-s-2 border-[#190B0B]" />
                <span className="pointer-events-none absolute bottom-0 end-0 h-2 w-2 border-b-2 border-e-2 border-[#190B0B]" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#190B0B]" />

                <span>
                  {lang === 'fa'
                    ? 'هماهنگی بازدید و استعلام قیمت قطعی'
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

          <div
            onClick={() => openZoom(6)}
            className="mt-10 -mx-6 -mb-14 relative h-32 w-[calc(100%+3rem)] overflow-hidden cursor-zoom-in"
          >
            <img
              src="./images/rugs/kld-isf-25q-macro-fringe.jpg"
              alt={lang === 'fa' ? 'ریشه‌ی دست‌باف پایانی قالی' : 'Hand-Tied Warp Fringe'}
              style={{
                WebkitMaskImage:
                  'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 38%, #000 100%)',
                maskImage:
                  'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 38%, #000 100%)',
              }}
              className="h-full w-full object-cover object-bottom"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#190B0B]/35 to-transparent pointer-events-none" />

            <span className="absolute bottom-3 end-4 inline-flex items-center gap-1 bg-[#C49A5A]/95 px-2.5 py-1 text-[9.5px] font-semibold text-[#190B0B] shadow-xs">
              <ZoomIn className="h-2.5 w-2.5 text-[#190B0B]" />
              {lang === 'fa' ? 'ریشه‌ی تمام‌ابریشم چله · ۳×' : 'Warp Fringe 3×'}
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