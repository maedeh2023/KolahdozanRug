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
      {/* 1. RESPONSIVE IMMERSIVE HERO */}

      <section
        id="hero"
        className="
          relative isolate mx-3 mt-3
          min-h-[100svh] overflow-hidden
          rounded-[28px] border border-[#C49A5A]/30
          bg-[#190B0B] text-[#F1E5D1]
          shadow-[0_15px_50px_rgba(0,0,0,0.45)]
          lg:mx-5 lg:mt-5
          lg:h-[90vh] lg:min-h-[780px]
          lg:rounded-[36px]
        "
      >
        {/* Background Images */}

        <picture className="absolute inset-0 z-0">
          <source
            media="(min-width: 1024px)"
            srcSet="/images/editorial/hero-desktop.png"
          />
          <img
           src={`${import.meta.env.BASE_URL}images/editorial/hero-mobile.png`}            alt="Kolahdoozan Persian Handmade Carpet"
            className="h-full w-full object-cover object-center"
          />
        </picture>

        {/* Mobile Shadow */}

        <div
          className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
          style={{
            background: `
              radial-gradient(
                ellipse 100% 55% at 50% 29%,
                rgba(12,4,2,0.88) 0%,
                rgba(12,4,2,0.68) 42%,
                rgba(12,4,2,0.25) 75%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                rgba(10,3,2,0.48) 0%,
                transparent 45%,
                transparent 75%,
                rgba(10,3,2,0.45) 100%
              )
            `,
          }}
        />

        {/* Desktop Shadow */}

        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
          style={{
            background: `
              linear-gradient(
                270deg,
                rgba(10,3,2,0.94) 0%,
                rgba(10,3,2,0.85) 25%,
                rgba(10,3,2,0.65) 45%,
                rgba(10,3,2,0.2) 70%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                rgba(10,3,2,0.35),
                transparent 45%,
                rgba(10,3,2,0.2)
              )
            `,
          }}
        />

        {/* Hero Content */}

        <div
          className="
            relative z-10 mx-auto flex min-h-[100svh]
            max-w-7xl flex-col
            items-center justify-start
            px-5 pb-24 pt-[13vh]
            text-center sm:px-8
            lg:h-full lg:min-h-0
            lg:items-start lg:justify-center
            lg:px-16 lg:py-16
          "
        >
          <div
            dir={isFa ? 'rtl' : 'ltr'}
            className="
              w-full max-w-[550px]
              text-center
              lg:text-right
            "
          >
            {/* Heading */}

            <h1
              className={`
                max-w-[650px] text-[#FFF0D9]
                [text-shadow:0_3px_5px_rgba(0,0,0,1),0_6px_15px_rgba(0,0,0,0.95),0_12px_30px_rgba(0,0,0,0.85)]
                ${
                  isFa
                    ? 'font-nastaliq text-[2rem] leading-[2] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.9]'
                    : 'font-serif-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl'
                }
              `}
            >
              {SITE_CONTENT.hero.headline[lang]}
            </h1>

            {/* Decorative Divider */}

            <div
              className="
                mt-6 flex items-center justify-center gap-3
                drop-shadow-[0_3px_8px_rgba(0,0,0,1)]
                lg:justify-start
              "
            >
              <span className="h-px w-16 bg-[#E7C58D]" />
              <span className="h-2 w-2 rotate-45 border border-[#F0CC91]" />
              <span className="h-px w-16 bg-[#E7C58D]" />
            </div>

            {/* Description */}

            <p
              className="
                mx-auto mt-5 max-w-[500px]
                font-modern-sans text-sm leading-[2.2]
                text-[#FFF5E6]
                [text-shadow:0_2px_5px_rgba(0,0,0,1),0_5px_12px_rgba(0,0,0,0.95),0_8px_20px_rgba(0,0,0,0.8)]
                sm:text-base
                lg:mx-0
              "
            >
              {SITE_CONTENT.hero.lead[lang]}
            </p>

            {/* Features */}

            <div
              className="
                mt-8 grid w-full max-w-[530px]
                grid-cols-4
                border-y border-[#E7C58D]/55
                bg-black/30 py-4
                shadow-[0_8px_30px_rgba(0,0,0,0.9)]
                backdrop-blur-[2px]
                lg:mt-9
              "
            >
              {[
                { icon: '◇', fa: 'اصالت و کیفیت', en: 'Authentic Quality' },
                { icon: '⬡', fa: 'ماندگاری بی‌نظیر', en: 'Timeless Craft' },
                { icon: '▦', fa: 'بافت دستباف سنتی', en: 'Handwoven' },
                { icon: '♧', fa: 'ضمانت اصالت', en: 'Authenticity' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    flex flex-col items-center justify-center
                    gap-2 border-s border-[#D6B77B]/50
                    px-1 first:border-0
                  "
                >
                  <span
                    className="
                      text-[28px] text-[#F4D39B]
                      drop-shadow-[0_2px_3px_rgba(0,0,0,1)]
                      [filter:drop-shadow(0_4px_8px_rgba(0,0,0,1))]
                    "
                  >
                    {item.icon}
                  </span>

                  <span
                    className="
                      text-[11px] font-semibold
                      leading-[1.9] text-[#FFF7EB]
                      [text-shadow:0_2px_3px_#000,0_4px_8px_rgba(0,0,0,1),0_7px_16px_rgba(0,0,0,0.95)]
                      sm:text-xs
                    "
                  >
                    {isFa ? item.fa : item.en}
                  </span>
                </div>
              ))}
            </div>

            {/* Two Equal Rounded Buttons */}

            <div
              className="
                mt-7 flex w-full flex-row
                items-center justify-center gap-3
                lg:justify-start
              "
            >
              <button
                type="button"
                onClick={() => {
                  document.getElementById('masterpieces')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="
                  !rounded-full box-border flex h-[50px]
                  w-[calc(50%-6px)] max-w-[190px]
                  min-w-0 flex-none
                  cursor-pointer items-center justify-center
                  gap-2 overflow-hidden
                  border border-[#F3D5A5]/50
                  bg-gradient-to-b from-[#F5D8A8]
                  via-[#D6AF75] to-[#C49A5A]
                  px-2 text-[11px] font-semibold
                  text-[#29150D]
                  shadow-[0_5px_15px_rgba(0,0,0,0.9)]
                  transition-all duration-300
                  hover:-translate-y-1 hover:brightness-110
                  sm:text-sm
                "
              >
                <span className="whitespace-nowrap">
                  {SITE_CONTENT.hero.ctaPrimary[lang]}
                </span>
                <ArrowIcon className="h-3.5 w-3.5 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  document.getElementById('heritage')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="
                  !rounded-full box-border flex h-[50px]
                  w-[calc(50%-6px)] max-w-[190px]
                  min-w-0 flex-none
                  cursor-pointer items-center justify-center
                  gap-2 overflow-hidden
                  border border-[#E7C58D]/75
                  bg-[#160906]/90
                  px-2 text-[11px]
                  text-[#FFF3E1]
                  shadow-[0_5px_15px_rgba(0,0,0,0.9)]
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#F1D19C]
                  hover:bg-[#351715]/95
                  sm:text-sm
                "
              >
                <span className="whitespace-nowrap">
                  {SITE_CONTENT.hero.ctaSecondary[lang]}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}

        <div
          className="
            absolute bottom-6 left-1/2 z-10
            flex -translate-x-1/2 flex-col
            items-center gap-2 text-[#F0D19C]
            [filter:drop-shadow(0_2px_5px_rgba(0,0,0,1))]
          "
        >
          <span className="text-[9px] tracking-[0.25em]">
            SCROLL TO DISCOVER
          </span>

          <div
            className="
              flex h-10 w-7 items-start
              justify-center rounded-full
              border border-[#F0D19C]
              bg-black/25 p-1
              shadow-[0_3px_12px_rgba(0,0,0,0.9)]
            "
          >
            <span
              className="
                h-2 w-1 animate-bounce rounded-full
                bg-[#F0D19C]
              "
            />
          </div>
        </div>
      </section>
            {/* 2. LUXURY HERITAGE STATISTICS */}

      <section
        className="
          relative overflow-hidden
          border-y border-[#C49A5A]/20
          bg-[#160A09]
          px-4 py-10
          sm:px-8 sm:py-14
          lg:py-16
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(ellipse_at_50%_50%,rgba(130,72,37,0.13),transparent_65%)]
          "
        />

        <div
          className="
            pointer-events-none absolute left-0 top-0
            h-full w-1/3
            bg-[radial-gradient(ellipse_at_0%_50%,rgba(196,154,90,0.06),transparent_70%)]
          "
        />

        <div className="relative mx-auto max-w-7xl">

          <div className="mb-9 text-center sm:mb-12">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C49A5A]/70" />

              <span className="text-[10px] tracking-[0.3em] text-[#C49A5A] sm:text-xs">
                {isFa ? 'میراثی از هنر و اصالت' : 'A LEGACY OF ART & HERITAGE'}
              </span>

              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C49A5A]/70" />
            </div>

            <h2
              className={`
                text-xl text-[#F1E5D1]
                drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]
                sm:text-2xl
                ${isFa ? 'font-nastaliq' : 'font-serif-display'}
              `}
            >
              {isFa ? 'اعتبار در گذر زمان' : 'Excellence Through Time'}
            </h2>
          </div>

          <div
            className="
              relative overflow-hidden
              rounded-[22px]
              border border-[#C49A5A]/35
              bg-gradient-to-br
              from-[#351A15] via-[#24110F] to-[#190B0B]
              shadow-[0_20px_60px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,220,160,0.12)]
            "
          >
            <div
              className="
                pointer-events-none absolute inset-[5px]
                rounded-[17px]
                border border-[#D6B77B]/10
              "
            />

            <div
              className="
                absolute left-1/2 top-0
                h-px w-1/2 -translate-x-1/2
                bg-gradient-to-r from-transparent via-[#F0CC91] to-transparent
              "
            />

            <div className="relative grid grid-cols-2 lg:grid-cols-4">
              {SITE_CONTENT.trustMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`
                    group relative flex flex-col
                    items-center justify-center
                    px-3 py-8
                    transition-all duration-500
                    hover:bg-[#C49A5A]/[0.06]
                    sm:py-11 lg:py-12
                    ${idx % 2 === 0 ? 'border-e border-[#C49A5A]/20' : ''}
                    ${idx < 2 ? 'border-b border-[#C49A5A]/20 lg:border-b-0' : ''}
                    ${idx !== 3 ? 'lg:border-e lg:border-[#C49A5A]/20' : 'lg:border-e-0'}
                  `}
                >
                  <span
                    className="
                      absolute top-4
                      font-serif-display
                      text-[9px] tracking-[0.2em]
                      text-[#A98454]/70
                    "
                  >
                    0{idx + 1}
                  </span>

                  <div
                    className="
                      pointer-events-none absolute
                      left-1/2 top-1/2
                      h-24 w-32 -translate-x-1/2 -translate-y-1/2
                      rounded-full bg-[#C49A5A]/[0.07]
                      blur-3xl
                      transition-all duration-500
                      group-hover:bg-[#D6B77B]/[0.16]
                    "
                  />

                  <p
                    className="
                      relative z-10
                      font-serif-display
                      text-3xl font-semibold
                      tracking-wide text-[#E8C68F]
                      drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)]
                      [text-shadow:0_4px_12px_rgba(0,0,0,0.8)]
                      transition-all duration-500
                      group-hover:scale-105
                      group-hover:text-[#FFE0AA]
                      sm:text-4xl lg:text-[2.8rem]
                    "
                  >
                    {m.value[lang]}
                  </p>

                  <div className="relative z-10 my-4 flex items-center gap-2">
                    <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C49A5A]/70" />
                    <span className="h-2 w-2 rotate-45 border border-[#E1BC7D] shadow-[0_0_9px_rgba(214,183,123,0.3)]" />
                    <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C49A5A]/70" />
                  </div>

                  <p
                    className="
                      relative z-10 max-w-[180px]
                      text-center text-[11px]
                      font-medium leading-7
                      text-[#DCC6A5]
                      drop-shadow-[0_2px_5px_rgba(0,0,0,1)]
                      sm:text-xs lg:text-sm
                    "
                  >
                    {m.label[lang]}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="
                absolute bottom-0 left-1/2
                h-px w-1/3 -translate-x-1/2
                bg-gradient-to-r from-transparent via-[#D6B77B]/70 to-transparent
              "
            />
          </div>

          <div className="mt-7 flex items-center justify-center gap-3 opacity-60">
            <span className="h-px w-12 bg-[#C49A5A]/40" />
            <span className="text-sm text-[#C49A5A]">✧</span>
            <span className="h-px w-12 bg-[#C49A5A]/40" />
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

            <h2
              className={`
                text-2xl text-[#F1E5D1] sm:text-3xl
                ${isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'}
              `}
            >
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

      
{/* PRIVATE COLLECTION — LUXURY EDITORIAL */}

<div className="relative mt-12">
  <div className="grid gap-8 lg:grid-cols-2">

    {FLAGSHIP_RUGS.map((rug, index) => {
      const image =
        rug.slug === 'kld-isf-25q'
          ? './images/rugs/kld-isf-25q-mansion.jpg'
          : './images/rugs/kld-isf-07p-mansion.jpg';

      const openRug = () =>
        onNavigate({
          type: 'rug',
          slug: rug.slug as 'kld-isf-25q' | 'kld-isf-07p',
        });

      return (
        <article
          key={rug.slug}
          dir={isFa ? 'rtl' : 'ltr'}
          className="
            group relative overflow-hidden
            border border-[#B99562]/35
            bg-[#24110F]
            shadow-[0_18px_55px_rgba(0,0,0,0.38)]
            transition-all duration-700
            hover:-translate-y-1
            hover:border-[#D6B77B]/75
            hover:shadow-[0_28px_75px_rgba(0,0,0,0.65)]
          "
        >
          {/* Decorative top line */}
          <div className="
            absolute left-0 top-0 z-10
            h-[2px] w-full
            bg-gradient-to-r
            from-transparent via-[#D6B77B] to-transparent
            opacity-70
          " />

          {/* IMAGE */}
          <div className="relative overflow-hidden p-3 sm:p-4">
            <button
              type="button"
              onClick={openRug}
              className="relative block w-full cursor-pointer overflow-hidden"
            >
              <img
                src={image}
                alt={rug.title[lang]}
                className="
                  aspect-[4/3] w-full object-cover
                  transition-transform duration-[1600ms]
                  group-hover:scale-[1.045]
                "
              />

              {/* Image shading */}
              <div className="
                absolute inset-0
                bg-gradient-to-t
                from-[#160906]/55 via-transparent to-[#160906]/20
              " />

              {/* Image top details */}
              <div className="
                absolute inset-x-0 top-0
                flex items-center justify-between p-4 sm:p-5
              ">
                <span className="
                  font-serif-display text-[10px]
                  tracking-[0.25em] text-[#FFE0AC]
                  drop-shadow-[0_2px_8px_black]
                ">
                  KOLAHDOOZAN / 0{index + 1}
                </span>

                <span className="
                  border border-[#E8C68F]/60
                  bg-[#190B0B]/75 px-3 py-2
                  text-[10px] text-[#F5D9A8]
                  backdrop-blur-md
                ">
                  {rug.editionLabel[lang]}
                </span>
              </div>

              {/* Bottom image label */}
              <div className="
                absolute bottom-5 inset-x-5
                flex items-center justify-between
              ">
                <span className="
                  text-[10px] tracking-[0.2em]
                  text-white drop-shadow-lg
                ">
                  {rug.archiveCode}
                </span>

                <span className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full border border-white/50
                  bg-black/25 text-white
                  backdrop-blur-sm
                  transition-all duration-500
                  group-hover:bg-[#D6B77B]
                  group-hover:text-[#190B0B]
                ">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </div>
            </button>
          </div>

          {/* INFORMATION */}
          <div className="px-5 pb-5 sm:px-7 sm:pb-7">

            {/* Editorial heading */}
            <div className="
              flex items-center justify-between
              border-b border-[#C49A5A]/25 pb-4
            ">
              <div>
                <p className="
                  font-serif-display text-[9px]
                  tracking-[0.25em] text-[#C49A5A]
                ">
                  {isFa ? 'شاهکار دستباف اصفهان' : 'ISFAHAN HANDWOVEN MASTERPIECE'}
                </p>

                <h3 className={`
                  mt-3 text-xl leading-[1.8]
                  text-[#F6E8D0] sm:text-2xl
                  ${isFa
                    ? 'font-nastaliq'
                    : 'font-serif-display font-semibold'}
                `}>
                  {rug.title[lang]}
                </h3>
              </div>

              <span className="
                hidden font-serif-display text-5xl
                text-[#D6B77B]/15 sm:block
              ">
                0{index + 1}
              </span>
            </div>

            {/* Description */}
            <p className="
              mt-4 text-xs leading-[2.1]
              text-[#C5AD91] sm:text-sm
            ">
              {rug.subtitle[lang]}
            </p>

            {/* Specifications */}
            <div className="
              mt-5 grid grid-cols-3
              divide-x divide-x-reverse divide-[#C49A5A]/25
              border-y border-[#C49A5A]/25 py-4
            ">
              {[
                rug.dimensions[lang],
                rug.knotDensity[lang],
                rug.category[lang],
              ].map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center px-2 text-center"
                >
                  <span className="
                    text-[10px] leading-6
                    text-[#E1CBAA] sm:text-xs
                  ">
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="
              mt-5 flex flex-wrap
              items-center justify-between gap-4
            ">
              <div>
                <p className="text-[10px] text-[#A98B65]">
                  {SITE_CONTENT.rugPage.valuationLabel[lang]}
                </p>

                <p className="
                  mt-1 text-lg font-semibold
                  text-[#E8C68F]
                  drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]
                ">
                  {isFa ? rug.valuationToman : rug.valuationUsd}
                </p>

                {isFa && (
                  <p dir="ltr" className="mt-1 text-[10px] text-[#A58B65]">
                    {rug.valuationUsd}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={openRug}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-full
                  border border-[#E8C68F]/65
                  bg-gradient-to-br
                  from-[#E8C990] via-[#D0A76A] to-[#A97B43]
                  px-5 py-3
                  text-[11px] font-semibold
                  text-[#24110F]
                  shadow-[0_6px_20px_rgba(0,0,0,0.35)]
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:brightness-110
                  hover:shadow-[0_10px_28px_rgba(196,154,90,0.25)]
                "
              >
                <Eye className="h-4 w-4" />
                {SITE_CONTENT.showcase.openPiece[lang]}
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Elegant bottom accent */}
          <div className="
            absolute bottom-0 left-1/2
            h-[2px] w-0 -translate-x-1/2
            bg-[#D6B77B]
            transition-all duration-700
            group-hover:w-full
          " />
        </article>
      );
    })}
  </div>
</div>

      
{/* LUXURY PRIVATE ARCHIVE */}

<div className="relative mt-24">

  {/* BACKGROUND DECORATION */}
  <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#8A4A2B]/10 blur-[110px]" />

  {/* EDITORIAL HEADER */}
  <div className="relative mb-10 flex flex-col justify-between gap-6 border-b border-[#C49A5A]/30 pb-8 md:flex-row md:items-end">

    <div className="space-y-4">

      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#D6B77B]" />
        <span className="font-serif-display text-[10px] tracking-[0.35em] text-[#D6B77B]">
          THE PRIVATE ARCHIVE
        </span>
      </div>

      <h3 className={`
        text-2xl leading-[1.8] text-[#F1E5D1]
        sm:text-3xl
        ${isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'}
      `}>
        {SITE_CONTENT.showcase.archiveSubheading[lang]}
      </h3>

    </div>

    <p className="max-w-md text-xs leading-[2.2] text-[#B9A28A] sm:text-sm">
      {SITE_CONTENT.showcase.archiveNote[lang]}
    </p>

  </div>

  {/* COLLECTION */}
  <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

    {ARCHIVE_PREVIEW_RUGS.map((item, index) => (

      <article
        key={item.slug}
        dir={isFa ? 'rtl' : 'ltr'}
        className="
          group relative isolate flex flex-col
          overflow-hidden
          border border-[#C49A5A]/30
          bg-[#291410]
          shadow-[0_15px_45px_rgba(0,0,0,0.35)]
          transition-all duration-700
          hover:-translate-y-2
          hover:border-[#D6B77B]/70
          hover:shadow-[0_28px_65px_rgba(0,0,0,0.65)]
        "
      >

        {/* TOP GOLD LINE */}
        <div className="
          absolute inset-x-0 top-0 z-20 h-[2px]
          bg-gradient-to-r from-transparent via-[#D6B77B] to-transparent
          opacity-60 transition-opacity duration-500
          group-hover:opacity-100
        "/>

        {/* HEADER */}
        <div className="relative flex items-center justify-between px-5 pb-4 pt-5">

          <span className="
            font-serif-display text-[10px]
            tracking-[0.2em] text-[#D6B77B]
          ">
            {item.archiveCode}
          </span>

          <span className="
            border border-[#C49A5A]/35
            px-3 py-1.5
            text-[10px] text-[#D9C19D]
          ">
            {item.areaLabel[lang]}
          </span>

        </div>

        {/* IMAGE FRAME */}
        <div className="relative mx-4 overflow-hidden border border-[#C49A5A]/35 bg-[#E7DDCC] p-2 sm:mx-5">

          <div className="
            relative flex aspect-[4/3]
            items-center justify-center overflow-hidden
            bg-[#E7DDCC]
          ">

            <img
              src={item.image}
              alt={item.title[lang]}
              className="
                h-full w-full object-contain
                transition-transform duration-[1400ms]
                ease-out
                group-hover:scale-[1.06]
              "
            />

          </div>

          {/* IMAGE FRAME DETAIL */}
          <div className="
            pointer-events-none absolute inset-[5px]
            border border-[#98764D]/25
          "/>

        </div>

        {/* CONTENT */}
        <div className="relative flex flex-1 flex-col px-5 pb-5 pt-6">

          {/* WATERMARK NUMBER */}
          <span className="
            pointer-events-none absolute end-4 top-1
            font-serif-display text-[72px] leading-none
            text-[#D6B77B]/[0.055]
            select-none
          ">
            0{index + 1}
          </span>

          {/* TITLE */}
          <div className="relative min-h-[76px]">

            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-5 bg-[#C49A5A]" />
              <span className="
                font-serif-display text-[9px]
                tracking-[0.22em] text-[#C49A5A]
              ">
                MASTERPIECE {index + 1}
              </span>
            </div>

            <h4 className="
              relative z-10 text-sm font-semibold
              leading-[2] text-[#F2E4CD]
              transition-colors duration-500
              group-hover:text-[#E8C68F]
              sm:text-[15px]
            ">
              {item.title[lang]}
            </h4>

          </div>

          {/* SPECS */}
          <div className="
            mt-3 flex flex-wrap items-center
            gap-x-3 gap-y-2
            text-[10px] text-[#B9A28A]
          ">

            <span>{item.dimensions[lang]}</span>

            <span className="text-[#C49A5A]">✧</span>

            <span>{item.knotDensity[lang]}</span>

          </div>

          {/* DIVIDER */}
          <div className="
            my-5 h-px w-full
            bg-gradient-to-r
            from-transparent via-[#C49A5A]/40 to-transparent
          "/>

          {/* PRICE */}
          <div className="
            mt-auto flex items-center
            justify-between gap-3
          ">

            <div className="min-w-0">

              <p className="text-[9px] tracking-wide text-[#A58B65]">
                {isFa ? 'ارزش تقریبی اثر' : 'ESTIMATED VALUATION'}
              </p>

              <p className="
                mt-2 text-xs font-semibold
                leading-relaxed text-[#E8C68F]
                sm:text-sm
              ">
                {isFa ? item.valuationToman : item.valuationUsd}
              </p>

            </div>

            <button
              type="button"
              onClick={() => onOpenInquiry(item.archiveCode)}
              className="
                inline-flex shrink-0 items-center gap-2
                rounded-full
                border border-[#C49A5A]/55
                bg-[#C49A5A]/10
                px-3 py-2.5
                text-[10px] text-[#E8C68F]
                transition-all duration-500
                hover:border-[#E8C68F]
                hover:bg-[#D6B77B]
                hover:text-[#24130D]
                hover:shadow-[0_5px_20px_rgba(196,154,90,0.2)]
              "
            >
              {isFa ? 'استعلام' : 'Inquire'}
              <ArrowIcon className="h-3 w-3" />
            </button>

          </div>

        </div>

        {/* BOTTOM ACCENT */}
        <div className="
          h-[2px] w-0 self-center
          bg-gradient-to-r from-transparent via-[#D6B77B] to-transparent
          transition-all duration-700
          group-hover:w-full
        "/>

      </article>

    ))}

  </div>

  {/* FOOTER SIGNATURE */}
  <div className="mt-12 flex items-center justify-center gap-4">

    <span className="h-px w-12 bg-[#C49A5A]/40" />

    <span className="text-xl text-[#D6B77B]">✧</span>

    <span className="
      font-serif-display text-[9px]
      tracking-[0.3em] text-[#C49A5A]
    ">
      KOLAHDOOZAN — EST. 1965
    </span>

    <span className="text-xl text-[#D6B77B]">✧</span>

    <span className="h-px w-12 bg-[#C49A5A]/40" />

  </div>

</div>

      </section>

   
{/* ROYAL HERITAGE — SIGNATURE EDITION */}

<section
  id="heritage"
  dir={isFa ? 'rtl' : 'ltr'}
  className="
    relative isolate overflow-hidden
    border-y border-[#C49A5A]/25
    bg-[#1D0B0A]
  "
>
  {/* ATMOSPHERIC BACKGROUND */}
  <div className="
    pointer-events-none absolute inset-0
    bg-[radial-gradient(ellipse_at_15%_50%,rgba(126,55,34,0.16),transparent_55%)]
  "/>

  <div className="
    pointer-events-none absolute -end-20 top-0
    h-[500px] w-[500px] rounded-full
    bg-[#A66A35]/[0.07] blur-[150px]
  "/>

  <div className="
    pointer-events-none absolute inset-0 opacity-[0.035]
    bg-[url('/images/editorial/pattern.png')]
  "/>

  <div className="
    relative mx-auto max-w-[1380px]
    px-5 py-20 sm:px-8 sm:py-28
  ">

    {/* TOP EDITORIAL HEADER */}
    <div className="
      mb-14 flex flex-col justify-between gap-6
      border-b border-[#C49A5A]/25 pb-8
      lg:flex-row lg:items-end
    ">

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-[#D6B77B]"/>

          <span className="
            font-serif-display text-[10px]
            tracking-[0.35em] text-[#D6B77B]
          ">
            THE ART OF HERITAGE
          </span>
        </div>

        <h2 className={`
          text-3xl leading-[1.9]
          text-[#F4E6D1] sm:text-4xl
          ${isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'}
        `}>
          {SITE_CONTENT.heritage.heading[lang]}
        </h2>

      </div>

      <div className="max-w-md">

        <p className="
          text-xs leading-[2.4]
          text-[#B9A28A] sm:text-sm
        ">
          {isFa
            ? 'روایت شصت سال هنر، اصالت و ظرافت؛ میراثی که در هر گره از تار و پود فرش‌های ما زنده است.'
            : 'Six decades of artistry, authenticity and refinement, woven into every thread of our heritage.'}
        </p>

      </div>

    </div>

    {/* MAIN EDITORIAL COMPOSITION */}
    <div className="
      grid items-center gap-14
      lg:grid-cols-12 lg:gap-16
    ">

      {/* IMAGE SIDE */}
      <div className="relative lg:col-span-6">

        {/* LARGE WATERMARK */}
        <div className="
          pointer-events-none absolute
          -top-16 end-0 z-0
          font-serif-display text-[180px]
          leading-none text-[#D6B77B]/[0.055]
          select-none sm:text-[240px]
        ">
          60
        </div>

        {/* MAIN ARTWORK */}
        <div className="
          relative z-10
          border border-[#C49A5A]/55
          bg-[#291410] p-2
          shadow-[0_30px_90px_rgba(0,0,0,0.65)]
        ">

          <div className="
            group relative overflow-hidden
          ">

            <img
              src="./images/editorial/loom-craft.webp"
              alt="Traditional Isfahan carpet weaving"
              className="
                aspect-[5/4.5] w-full object-cover
                transition-transform duration-[1800ms]
                group-hover:scale-105
              "
            />

            {/* CINEMATIC OVERLAY */}
            <div className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t
              from-[#170806]/90
              via-[#170806]/10
              to-[#170806]/25
            "/>

            <div className="
              absolute inset-x-0 bottom-0
              flex items-end justify-between gap-4
              p-5 sm:p-8
            ">

              <div>
                <span className="
                  font-serif-display text-[9px]
                  tracking-[0.3em] text-[#E8C68F]
                ">
                  THE MASTER WEAVERS
                </span>

                <p className="
                  mt-3 text-sm font-medium
                  text-[#FFF1DC] sm:text-base
                ">
                  {isFa
                    ? 'هنر ماندگار دستان هنرمند'
                    : 'The Art of Master Hands'}
                </p>
              </div>

              <span className="
                text-3xl text-[#E8C68F]/80
              ">
                ✧
              </span>

            </div>

          </div>

          {/* DOUBLE FRAME */}
          <div className="
            pointer-events-none absolute inset-[5px]
            border border-[#D6B77B]/30
          "/>

        </div>

        {/* FLOATING HERITAGE LABEL */}
        <div className="
          absolute -bottom-7 start-5 z-20
          flex items-center gap-4
          border border-[#C49A5A]/45
          bg-[#28120F]
          px-5 py-4
          shadow-[0_15px_35px_rgba(0,0,0,0.6)]
          sm:start-10
        ">

          <div className="
            flex h-11 w-11 items-center
            justify-center border border-[#C49A5A]/40
            font-serif-display text-xl text-[#E5C58F]
          ">
            60
          </div>

          <div>
            <p className="
              text-xs font-semibold text-[#F0DFC4]
            ">
              {isFa ? 'سال اصالت و هنر' : 'Years of Heritage'}
            </p>

            <p className="
              mt-1 font-serif-display text-[9px]
              tracking-[0.15em] text-[#B99A6C]
            ">
              ESTABLISHED 1965
            </p>
          </div>

        </div>

        {/* SECONDARY IMAGES */}
        <div className="
          mt-14 grid grid-cols-2 gap-4
        ">

          <div className="
            group relative overflow-hidden
            border border-[#C49A5A]/40
            bg-[#291410] p-1.5
          ">
            <img
              src="./images/editorial/atelier-roses.webp"
              alt="Kolahdoozan carpet gallery"
              className="
                aspect-[5/3] w-full object-cover
                transition-transform duration-1000
                group-hover:scale-110
              "/>
          </div>

          <div className="
            group relative overflow-hidden
            border border-[#C49A5A]/40
            bg-[#291410] p-1.5
          ">
            <img
              src="./images/editorial/residence-rug.webp"
              alt="Persian carpet collection"
              className="
                aspect-[5/3] w-full object-cover
                transition-transform duration-1000
                group-hover:scale-110
              "/>
          </div>

        </div>

        {/* IMAGE SIGNATURE */}
        <div className="
          mt-5 flex items-center justify-between
          text-[9px] tracking-[0.2em]
          text-[#A58B65]
        ">
          <span>KOLAHDOOZAN</span>
          <span>ISFAHAN · PERSIA</span>
        </div>

      </div>

      {/* HISTORY SIDE */}
      <div className="relative lg:col-span-6">

        {/* SECTION LABEL */}
        <div className="mb-10">

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D6B77B]"/>

            <span className="
              font-serif-display text-[10px]
              tracking-[0.3em] text-[#D6B77B]
            ">
              {SITE_CONTENT.heritage.eyebrow[lang]}
            </span>
          </div>

          <h3 className={`
            mt-6 text-2xl leading-[1.9]
            text-[#F1E5D1] sm:text-3xl
            ${isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'}
          `}>
            {isFa
              ? 'داستانی که با هنر آغاز شد و با اصالت ادامه یافت'
              : 'A Story Woven Through Generations'}
          </h3>

          <p className="
            mt-5 max-w-lg text-xs
            leading-[2.3] text-[#B9A28A] sm:text-sm
          ">
            {isFa
              ? 'از نخستین گره‌ها تا خلق آثاری ماندگار؛ هر دوره بخشی از هویت و تاریخ این مجموعه را شکل داده است.'
              : 'From the first knots to timeless creations, every generation has shaped the identity of this house.'}
          </p>

        </div>

        {/* TIMELINE */}
        <div className="
          relative border-s border-[#C49A5A]/35
          ps-7 sm:ps-10
        ">

          {SITE_CONTENT.heritage.pillars.map((pillar, idx) => (

            <article
              key={idx}
              className="
                group relative pb-10 last:pb-0
              "
            >

              {/* NODE */}
              <div className="
                absolute -start-[33px] top-1
                flex h-3 w-3 items-center
                justify-center rounded-full
                border border-[#D6B77B]
                bg-[#1D0B0A]
                ring-[5px] ring-[#1D0B0A]
                transition-all duration-500
                group-hover:bg-[#D6B77B]
                sm:-start-[41px]
              "/>

              {/* YEAR */}
              <div className="
                flex items-center gap-3
              ">

                <span className="
                  font-serif-display text-sm
                  font-semibold tracking-[0.14em]
                  text-[#D6B77B]
                ">
                  {pillar.year[lang]}
                </span>

                <span className="
                  h-px w-8 bg-[#C49A5A]/40
                "/>

                <span className="
                  font-serif-display text-[9px]
                  tracking-widest text-[#8D7054]
                ">
                  0{idx + 1}
                </span>

              </div>

              {/* EVENT TITLE */}
              <h4 className="
                mt-4 text-base font-semibold
                leading-[2] text-[#F4E6D1]
                transition-colors duration-300
                group-hover:text-[#E8C68F]
                sm:text-lg
              ">
                {pillar.title[lang]}
              </h4>

              {/* EVENT DESCRIPTION */}
              <p className="
                mt-3 max-w-xl text-xs
                leading-[2.5] text-[#B9A28A]
                sm:text-sm
              ">
                {pillar.body[lang]}
              </p>

              {/* DECORATIVE LINE */}
              {idx !== SITE_CONTENT.heritage.pillars.length - 1 && (
                <div className="
                  mt-7 h-px w-16
                  bg-gradient-to-r
                  from-[#C49A5A]/40 to-transparent
                "/>
              )}

            </article>

          ))}

        </div>

        {/* CLOSING SIGNATURE */}
        <div className="
          mt-12 border-t border-[#C49A5A]/30
          pt-7
        ">

          <div className="
            flex items-center justify-between gap-4
          ">

            <div>
              <p className="
                text-sm font-semibold text-[#E8C68F]
              ">
                {isFa
                  ? 'میراثی برای نسل‌های آینده'
                  : 'A Legacy for Generations'}
              </p>

              <p className="
                mt-2 font-serif-display text-[9px]
                tracking-[0.25em] text-[#A58B65]
              ">
                KOLAHDOOZAN · EST. 1965
              </p>
            </div>

            <span className="
              text-3xl text-[#D6B77B]/70
            ">
              ❋
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* 5. COLLECTOR JOURNAL */}

      <section
        id="journal"
        className="
          relative mx-auto max-w-7xl
          px-5 py-20 sm:px-8
        "
      >
        <div className="max-w-xl space-y-4">
          <p className="
            font-serif-display text-xs uppercase
            tracking-[0.2em] text-[#C49A5A]
          ">
            {SITE_CONTENT.journal.eyebrow[lang]}
          </p>

          <h2
            className={`
              text-2xl text-[#F1E5D1] sm:text-3xl
              ${isFa ? 'font-nastaliq' : 'font-serif-display font-semibold'}
            `}
          >
            {SITE_CONTENT.journal.heading[lang]}
          </h2>

          <div className="h-px w-20 bg-[#C49A5A]/60" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SITE_CONTENT.journal.items.map((note, idx) => (
            <article
              key={idx}
              className="
                group flex flex-col justify-between
                border border-[#C49A5A]/25
                bg-gradient-to-b from-[#351715] to-[#281211]
                p-6 transition-all duration-300
                hover:-translate-y-1
                hover:border-[#C49A5A]/65
                hover:shadow-xl
              "
            >
              <div className="space-y-4">
                <span className="
                  inline-block font-serif-display
                  text-[11px] font-semibold uppercase
                  tracking-[0.18em] text-[#D6B77B]
                ">
                  {note.tag[lang]}
                </span>

                <h3 className="
                  text-base font-semibold
                  leading-relaxed text-[#F1E5D1]
                ">
                  {note.title[lang]}
                </h3>

                <p className="text-sm leading-[2] text-[#B9A28A]">
                  {note.summary[lang]}
                </p>
              </div>

              <div className="
                mt-7 border-t border-[#C49A5A]/25 pt-5
              ">
                <button
                  type="button"
                  onClick={() => onOpenInquiry()}
                  className="
                    inline-flex cursor-pointer
                    items-center gap-2 text-xs
                    font-medium text-[#D6B77B]
                    transition-colors hover:text-[#FFF0CC]
                  "
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