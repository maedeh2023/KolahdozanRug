
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';
import type { Lang, RouteView } from '../types';

interface FooterProps {
  lang: Lang;
  onNavigate: (target: RouteView, sectionId?: string) => void;
  onOpenInquiry: (pieceCode?: string) => void;
}

export function Footer({
  lang,
  onNavigate,
  onOpenInquiry,
}: FooterProps) {
  const isFa = lang === 'fa';

  const featuredRugs = [
    {
      code: 'KLD · ISF-25Q',
      description: isFa ? 'فرش هفت‌متری' : '7m masterpiece',
      slug: 'kld-isf-25q',
      color: '#536477',
    },
    {
      code: 'KLD · ISF-07P',
      description: isFa ? 'جفت فرش تمام‌ابریشم' : 'Silk carpet pair',
      slug: 'kld-isf-07p',
      color: '#A45C45',
    },
  ] as const;

  return (
    <footer
      id="showroom"
      dir={isFa ? 'rtl' : 'ltr'}
      className="relative overflow-hidden bg-[#190B0B] text-[#F1E5D1]"
    >
      {/* Top decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A98255]/70 to-transparent" />

      {/* Background lights */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-[#651F20]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#8B5638]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 pb-8 pt-20 sm:px-10 lg:px-16">

        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-14 border-b border-[#A98255]/20 pb-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1fr] lg:gap-16">

          {/* Brand */}
          <div className="max-w-md">
            <div className="mb-8 flex items-center gap-4">
              <img
                src="./images/brand/logo-white.png"
                alt={SITE_CONTENT.brand.name[lang]}
                className="h-14 w-auto object-contain"
              />

              <div>
                <p className="font-serif text-xl tracking-[0.12em] text-[#F1E5D1]">
                  {SITE_CONTENT.brand.name[lang]}
                </p>
                <p className="mt-1 text-[9px] tracking-[0.32em] text-[#A98255]">
                  ISFAHAN · EST. 1966
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-8 text-[#B9A28A]">
              {isFa
                ? 'تولید و عرضه نفیس‌ترین فرش‌های دستباف تمام‌ابریشم و کرک‌وابریشم اصفهان با پیشینه‌ای از سال ۱۳۴۵ و صادرات به بیش از ۴۰ کشور جهان.'
                : 'Producing and curating Isfahan’s finest silk and kork-wool hand-knotted carpets since 1966, exported to collectors across 40+ countries.'}
            </p>

            <button
              onClick={() => onOpenInquiry()}
              className="group mt-8 inline-flex items-center gap-3 border-b border-[#A98255]/60 pb-2 text-xs tracking-wider text-[#D6B77B] transition-colors duration-300 hover:border-[#F1E5D1] hover:text-[#F1E5D1]"
            >
              {SITE_CONTENT.nav.inquireBtn[lang]}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Selected works */}
          <div>
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.28em] text-[#A98255]">
                THE COLLECTION
              </span>
              <h3 className="mt-3 font-serif text-xl text-[#F1E5D1]">
                {isFa ? 'آثار منتخب' : 'Selected Works'}
              </h3>
            </div>

            <div className="space-y-6">
              {featuredRugs.map((rug) => (
                <button
                  key={rug.slug}
                  onClick={() =>
                    onNavigate({
                      type: 'rug',
                      slug: rug.slug,
                    })
                  }
                  className="group flex w-full items-center gap-4 text-start"
                >
                  <span
                    className="h-11 w-[3px] shrink-0 transition-all duration-300 group-hover:h-14"
                    style={{ backgroundColor: rug.color }}
                  />

                  <span className="flex-1">
                    <span className="block text-xs tracking-[0.12em] text-[#E5D6C1] transition-colors group-hover:text-[#D6B77B]">
                      {rug.code}
                    </span>

                    <span className="mt-2 block text-[11px] text-[#897765]">
                      {rug.description}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="text-[#8B7159] opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate({ type: 'home' }, 'heritage')}
              className="mt-8 text-xs text-[#B9A28A] transition-colors hover:text-[#D6B77B]"
            >
              {SITE_CONTENT.nav.heritage[lang]}
              <span className="mx-2 text-[#A98255]">↗</span>
            </button>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.28em] text-[#A98255]">
                GET IN TOUCH
              </span>
              <h3 className="mt-3 font-serif text-xl text-[#F1E5D1]">
                {isFa ? 'با ما در ارتباط باشید' : 'Contact Us'}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.4}
                  className="mt-1 shrink-0 text-[#B78B58]"
                />

                <div>
                  <p className="mb-2 text-[10px] tracking-wider text-[#A98255]">
                    {isFa ? 'گالری اصفهان' : 'ISFAHAN SHOWROOM'}
                  </p>

                  <p className="text-xs leading-7 text-[#B9A28A]">
                    {SITE_CONTENT.brand.address[lang]}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:03132220519"
                  dir="ltr"
                  className="flex w-fit items-center gap-3 text-sm tracking-wider text-[#D9C7AC] transition-colors hover:text-[#D6B77B]"
                >
                  <Phone size={15} className="text-[#A98255]" />
                  031-32220519
                </a>

                <a
                  href="tel:09133199118"
                  dir="ltr"
                  className="flex w-fit items-center gap-3 text-sm tracking-wider text-[#D9C7AC] transition-colors hover:text-[#D6B77B]"
                >
                  <Phone size={15} className="text-[#A98255]" />
                  0913-319-9118
                </a>
              </div>

              <div className="flex items-center gap-5 pt-2 text-xs text-[#B9A28A]">
                <a
                  href={SITE_CONTENT.brand.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#D6B77B]"
                >
                  Instagram
                </a>

                <span className="h-1 w-1 rounded-full bg-[#A98255]/60" />

                <a
                  href={SITE_CONTENT.brand.pinterest}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#D6B77B]"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-[10px] text-[#8E7967] sm:flex-row">
          <p>
            {isFa
              ? `© ${new Date().getFullYear()} تمامی حقوق برای کلاهدوزان محفوظ است.`
              : `© ${new Date().getFullYear()} Kollahdoozan. All rights reserved.`}
          </p>

          <p className="tracking-[0.22em] text-[#A98255]/80">
            ISFAHAN · BESPOKE ARCHIVE
          </p>
        </div>
      </div>
    </footer>
  );
}
