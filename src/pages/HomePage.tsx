
import { ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';

import { SITE_CONTENT } from '../data/content';
import { ARCHIVE_PREVIEW_RUGS, FLAGSHIP_RUGS } from '../data/rugs';
import type { Lang, RouteView } from '../types';

interface HomePageProps {
  lang: Lang;
  onNavigate: (target: RouteView, sectionId?: string) => void;
  onOpenInquiry: (pieceCode?: string) => void;
}

export function HomePage({
  lang,
  onNavigate,
  onOpenInquiry,
}: HomePageProps) {
  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;
  const isFa = lang === 'fa';

  return (
    <main
      dir={isFa ? 'rtl' : 'ltr'}
      className="animate-fade-up overflow-hidden bg-[#190B0B] text-[#F1E5D1]"
    >

      {/* 1. EDITORIAL HERO */}
      <section
        id="hero"
        className="atelier-grain relative overflow-hidden border-b border-[#C49A5A]/25"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(101,31,32,0.25),transparent_60%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">

          {/* Editorial Copy */}
          <div className="space-y-7 lg:col-span-6">

            <div className="inline-flex items-center gap-2 border border-[#C49A5A]/35 bg-[#351715]/70 px-4 py-2 text-[11px] tracking-wider text-[#D6B77B]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{SITE_CONTENT.hero.eyebrow[lang]}</span>
            </div>

            <h1
              className={`leading-[1.7] text-[#F1E5D1] ${
                isFa
                  ? 'font-nastaliq text-4xl sm:text-5xl lg:text-[3.7rem]'
                  : 'font-serif-display text-4xl font-semibold sm:text-5xl lg:text-[3.4rem]'
              }`}
            >
              {SITE_CONTENT.hero.headline[lang]}
            </h1>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C49A5A] to-transparent" />

            <p className="max-w-xl font-modern-sans text-sm leading-[2.2] text-[#B9A28A] sm:text-base">
              {SITE_CONTENT.hero.lead[lang]}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-3">

              <button
                type="button"
                onClick={() => {
                  document.getElementById('masterpieces')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-atelier-gold inline-flex items-center gap-2.5 bg-gradient-to-br from-[#E5C78C] via-[#C49A5A] to-[#936B36] px-6 py-3.5 text-sm font-medium text-[#24130D] cursor-pointer"
              >
                <span>{SITE_CONTENT.hero.ctaPrimary[lang]}</span>
                <ArrowIcon className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  document.getElementById('heritage')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-atelier-glass inline-flex items-center gap-2 border border-[#C49A5A]/50 bg-[#281211]/70 px-6 py-3.5 text-sm text-[#E8D3AE] transition-all hover:border-[#D6B77B] hover:bg-[#651F20]/50 cursor-pointer"
              >
                <span>{SITE_CONTENT.hero.ctaSecondary[lang]}</span>
              </button>

            </div>
          </div>

          {/* Hero Image Composition */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl">

              <div className="absolute -inset-5 rounded-full bg-[#651F20]/15 blur-3xl" />

              <div className="relative grid grid-cols-12 items-end gap-4">

                <div className="col-span-7 overflow-hidden border border-[#C49A5A]/50 bg-[#281211] p-2 shadow-[0_25px_65px_rgba(0,0,0,0.65)]">
                  <img
                    src="./images/editorial/gallery-drape.webp"
                    alt="Kolahdoozan Silk Carpet Drape"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>

                <div className="col-span-5 space-y-4">

                  <div className="border border-[#C49A5A]/35 bg-[#281211]/90 p-4 shadow-xl">
                    <p className="font-serif-display text-[11px] uppercase tracking-[0.2em] text-[#D6B77B]">
                      {SITE_CONTENT.hero.captionLabel[lang]}
                    </p>

                    <p className="mt-2 text-xs leading-[2] text-[#B9A28A]">
                      {isFa
                        ? 'اصفهان، خیابان حکیم، بازارچه نو — گالری دائمی آثار دستباف ابریشم و کرک'
                        : 'Bazarche-No, Isfahan — Permanent salon for silk & kork masterworks.'}
                    </p>
                  </div>

                  <div className="overflow-hidden border border-[#C49A5A]/35 bg-[#281211] p-2 shadow-xl">
                    <img
                      src="./images/editorial/atelier-stack.webp"
                      alt="Stacked Isfahan Handmade Carpets"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 2. TRUST STRIP */}
        <div className="relative border-t border-[#C49A5A]/25 bg-[#281211]/90">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-[#C49A5A]/20 px-5 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:divide-x-reverse sm:px-8">

            {SITE_CONTENT.trustMetrics.map((m, idx) => (
              <div key={idx} className="px-4 py-6 text-center">

                <p className="font-serif-display text-2xl font-semibold text-[#D6B77B] sm:text-3xl">
                  {m.value[lang]}
                </p>

                <p className="mt-2 text-xs text-[#B9A28A]">
                  {m.label[lang]}
                </p>

              </div>
            ))}

          </div>
        </div>

      </section>

      {/* 3. SIGNATURE MASTERPIECES */}
      <section
        id="masterpieces"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8"
      >

        <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-[#651F20]/10 blur-[100px]" />

        <div className="relative flex flex-col justify-between gap-4 border-b border-[#C49A5A]/30 pb-8 md:flex-row md:items-end">

          <div className="max-w-2xl space-y-3">

            <p className="font-serif-display text-xs uppercase tracking-[0.22em] text-[#C49A5A]">
              {SITE_CONTENT.showcase.eyebrow[lang]}
            </p>

            <h2 className={`text-2xl text-[#F1E5D1] sm:text-3xl ${
              isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'
            }`}>
              {SITE_CONTENT.showcase.heading[lang]}
            </h2>

            <p className="text-sm leading-[2] text-[#B9A28A]">
              {SITE_CONTENT.showcase.description[lang]}
            </p>

          </div>

          <div className="hidden items-center gap-2 text-[#C49A5A] md:flex">
            <span className="h-px w-12 bg-[#C49A5A]/50" />
            <Sparkles size={15} />
          </div>

        </div>

        {/* Flagship Cards */}
        <div className="relative mt-10 grid gap-8 lg:grid-cols-2">

          {FLAGSHIP_RUGS.map((rug) => (

            <article
              key={rug.slug}
              className="group flex flex-col justify-between overflow-hidden border border-[#C49A5A]/30 bg-gradient-to-b from-[#351715] to-[#21100F] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#C49A5A]/70 hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)] sm:p-7"
            >

              <div>

                {/* Archive Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">

                  <span className="border border-[#C49A5A]/35 bg-[#190B0B] px-3 py-1.5 text-[11px] text-[#D6B77B]">
                    {rug.editionLabel[lang]}
                  </span>

                  <span className="font-serif-display text-sm font-semibold tracking-[0.16em] text-[#D6B77B]">
                    {rug.archiveCode}
                  </span>

                </div>

                {/* Rug Image */}
                <button
                  type="button"
                  onClick={() => onNavigate({
                    type: 'rug',
                    slug: rug.slug as 'kld-isf-25q' | 'kld-isf-07p',
                  })}
                  className="mt-5 block w-full cursor-pointer overflow-hidden border border-[#C49A5A]/30 bg-[#190B0B] p-2"
                >
                  <img
                    src={
                      rug.slug === 'kld-isf-25q'
                        ? './images/rugs/kld-isf-25q-mansion.jpg'
                        : './images/rugs/kld-isf-07p-mansion.jpg'
                    }
                    alt={rug.title[lang]}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </button>

                {/* Title */}
                <div className="mt-6 space-y-3">

                  <h3
                    className={`text-2xl text-[#F1E5D1] ${
                      isFa
                        ? 'font-nastaliq'
                        : 'font-serif-display font-semibold'
                    }`}
                  >
                    {rug.title[lang]}
                  </h3>

                  <p className="font-modern-sans text-sm leading-[2] text-[#B9A28A]">
                    {rug.subtitle[lang]}
                  </p>

                </div>

                {/* Specs */}
                <div className="mt-5 flex flex-wrap gap-2 text-xs">

                  {[rug.dimensions[lang], rug.knotDensity[lang], rug.category[lang]].map((spec, idx) => (
                    <span
                      key={idx}
                      className="border border-[#C49A5A]/25 bg-[#190B0B]/70 px-3 py-2 text-[#D6C2A3]"
                    >
                      {spec}
                    </span>
                  ))}

                </div>

              </div>

              {/* Valuation & CTA */}
              <div className="mt-7 border-t border-[#C49A5A]/25 pt-5">

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div>
                    <p className="text-[11px] text-[#B9A28A]">
                      {SITE_CONTENT.rugPage.valuationLabel[lang]}
                    </p>

                    <p className="mt-1 text-base font-semibold text-[#E8D3AE]">
                      {isFa ? rug.valuationToman : rug.valuationUsd}
                    </p>

                    {isFa && (
                      <p
                        dir="ltr"
                        className="mt-1 font-serif-display text-xs text-[#A58B65]"
                      >
                        {rug.valuationUsd}
                      </p>
                    )}
                  </div>

                  {/* Color Palette */}
                  <div
                    className="flex items-center gap-1.5"
                    title={SITE_CONTENT.rugPage.paletteTitle[lang]}
                  >
                    {rug.swatches.map((s) => (
                      <span
                        key={s.hex}
                        style={{ backgroundColor: s.hex }}
                        title={s.name[lang]}
                        className="h-4 w-4 rounded-full border border-[#D6B77B]/40 shadow-sm"
                      />
                    ))}
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => onNavigate({
                    type: 'rug',
                    slug: rug.slug as 'kld-isf-25q' | 'kld-isf-07p',
                  })}
                  style={{
                    backgroundColor: rug.theme.primary,
                  }}
                  className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 border border-[#D6B77B]/40 py-3.5 text-sm font-medium text-[#FFF5E4] transition-all duration-300 hover:brightness-125 hover:shadow-[0_5px_25px_rgba(196,154,90,0.2)]"
                >
                  <Eye className="h-4 w-4" />
                  <span>{SITE_CONTENT.showcase.openPiece[lang]}</span>
                  <ArrowIcon className="h-4 w-4" />
                </button>

              </div>

            </article>

          ))}

        </div>

        {/* Archive Preview */}
        <div className="relative mt-20">

          <div className="flex flex-col justify-between gap-3 border-b border-[#C49A5A]/25 pb-5 sm:flex-row sm:items-end">

            <h3 className={`text-lg text-[#F1E5D1] ${
              isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'
            }`}>
              {SITE_CONTENT.showcase.archiveSubheading[lang]}
            </h3>

            <p className="text-xs text-[#A58B65]">
              {SITE_CONTENT.showcase.archiveNote[lang]}
            </p>

          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {ARCHIVE_PREVIEW_RUGS.map((item) => (

              <article
                key={item.slug}
                className="group flex flex-col justify-between border border-[#C49A5A]/25 bg-[#281211] p-4 transition-all duration-300 hover:border-[#C49A5A]/70 hover:bg-[#351715] hover:shadow-xl"
              >

                <div>

                  <div className="flex items-center justify-between text-[11px]">

                    <span className="font-serif-display font-semibold tracking-wider text-[#D6B77B]">
                      {item.archiveCode}
                    </span>

                    <span className="text-[#A58B65]">
                      {item.areaLabel[lang]}
                    </span>

                  </div>

                  <div className="mt-3 overflow-hidden border border-[#C49A5A]/20 bg-[#190B0B] p-3">

                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      className="h-48 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                  </div>

                  <h4 className="mt-4 text-sm font-semibold leading-relaxed text-[#F1E5D1]">
                    {item.title[lang]}
                  </h4>

                  <p className="mt-2 text-xs text-[#B9A28A]">
                    {item.dimensions[lang]} · {item.knotDensity[lang]}
                  </p>

                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#C49A5A]/20 pt-3">

                  <span className="text-xs font-medium text-[#D6B77B]">
                    {isFa ? item.valuationToman : item.valuationUsd}
                  </span>

                  <button
                    type="button"
                    onClick={() => onOpenInquiry(item.archiveCode)}
                    className="cursor-pointer text-xs font-medium text-[#C49A5A] transition-colors hover:text-[#F1E5D1]"
                  >
                    {isFa ? 'استعلام' : 'Inquire'}
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* 4. HERITAGE & LOOMS */}
      <section
        id="heritage"
        className="relative overflow-hidden border-y border-[#C49A5A]/25 bg-[#281211]"
      >

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(101,31,32,0.2),transparent_65%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">

          {/* Images */}
          <div className="space-y-4 lg:col-span-5">

            <div className="overflow-hidden border border-[#C49A5A]/40 bg-[#190B0B] p-2 shadow-2xl">
              <img
                src="./images/editorial/loom-craft.webp"
                alt="Isfahan Master Loom Weaving"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="overflow-hidden border border-[#C49A5A]/30 bg-[#190B0B] p-1.5">
                <img
                  src="./images/editorial/atelier-roses.webp"
                  alt="Kolahdoozan Carpet Gallery"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="overflow-hidden border border-[#C49A5A]/30 bg-[#190B0B] p-1.5">
                <img
                  src="./images/editorial/residence-rug.webp"
                  alt="Kolahdoozan Rug in Residence"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

            </div>

          </div>

          {/* Heritage Content */}
          <div className="space-y-7 lg:col-span-7">

            <div>

              <p className="font-serif-display text-xs uppercase tracking-[0.2em] text-[#C49A5A]">
                {SITE_CONTENT.heritage.eyebrow[lang]}
              </p>

              <h2 className={`mt-4 text-2xl text-[#F1E5D1] sm:text-3xl ${
                isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'
              }`}>
                {SITE_CONTENT.heritage.heading[lang]}
              </h2>

              <div className="mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#C49A5A] to-transparent" />

            </div>

            <div className="space-y-7 border-s border-[#C49A5A]/50 ps-6">

              {SITE_CONTENT.heritage.pillars.map((pillar, idx) => (

                <div key={idx} className="relative space-y-2">

                  <span className="absolute -start-[30px] top-1.5 h-2.5 w-2.5 rounded-full border border-[#D6B77B] bg-[#651F20] ring-4 ring-[#281211]" />

                  <p className="font-serif-display text-xs font-semibold tracking-wider text-[#D6B77B]">
                    {pillar.year[lang]}
                  </p>

                  <h3 className="text-base font-semibold text-[#F1E5D1]">
                    {pillar.title[lang]}
                  </h3>

                  <p className="text-sm leading-[2.1] text-[#B9A28A]">
                    {pillar.body[lang]}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* 5. COLLECTOR JOURNAL */}
      <section
        id="journal"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8"
      >

        <div className="max-w-xl space-y-4">

          <p className="font-serif-display text-xs uppercase tracking-[0.2em] text-[#C49A5A]">
            {SITE_CONTENT.journal.eyebrow[lang]}
          </p>

          <h2 className={`text-2xl text-[#F1E5D1] sm:text-3xl ${
            isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'
          }`}>
            {SITE_CONTENT.journal.heading[lang]}
          </h2>

          <div className="h-px w-20 bg-[#C49A5A]/60" />

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {SITE_CONTENT.journal.items.map((note, idx) => (

            <article
              key={idx}
              className="group flex flex-col justify-between border border-[#C49A5A]/25 bg-gradient-to-b from-[#351715] to-[#281211] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C49A5A]/65 hover:shadow-xl"
            >

              <div className="space-y-4">

                <span className="inline-block font-serif-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D6B77B]">
                  {note.tag[lang]}
                </span>

                <h3 className="text-base font-semibold leading-relaxed text-[#F1E5D1]">
                  {note.title[lang]}
                </h3>

                <p className="text-sm leading-[2] text-[#B9A28A]">
                  {note.summary[lang]}
                </p>

              </div>

              <div className="mt-7 border-t border-[#C49A5A]/25 pt-5">

                <button
                  type="button"
                  onClick={() => onOpenInquiry()}
                  className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-[#D6B77B] transition-colors hover:text-[#FFF0CC]"
                >
                  <span>
                    {isFa
                      ? 'مشاوره با کارشناس بافت'
                      : 'Consult a Weaving Specialist'}
                  </span>

                  <ArrowIcon className="h-3.5 w-3.5" />
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}
