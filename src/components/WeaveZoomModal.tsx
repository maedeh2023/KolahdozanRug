
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Lang } from '../types';

export interface ZoomSlideItem {
  id: string;
  src: string;
  label: string;
}

interface WeaveZoomModalProps {
  open: boolean;
  archiveCode: string;
  slides: ZoomSlideItem[];
  initialIndex: number;
  accentColor: string;
  lang: Lang;
  onClose: () => void;
}

export function WeaveZoomModal({
  open,
  archiveCode,
  slides,
  initialIndex,
  accentColor,
  lang,
  onClose,
}: WeaveZoomModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoomScale, setZoomScale] = useState<1 | 2 | 3>(2);
  const [panOrigin, setPanOrigin] = useState({ x: 50, y: 50 });

  const isFa = lang === 'fa';

  useEffect(() => {
    if (open) {
      setActiveIndex(initialIndex);
      setZoomScale(2);
      setPanOrigin({ x: 50, y: 50 });
    }
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          Math.min(prev + (isFa ? -1 : 1), slides.length - 1)
        );
        setPanOrigin({ x: 50, y: 50 });
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          Math.max(prev + (isFa ? 1 : -1), 0)
        );
        setPanOrigin({ x: 50, y: 50 });
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, isFa, slides.length]);

  if (!open || slides.length === 0) return null;

  const safeIndex = Math.min(
    Math.max(activeIndex, 0),
    slides.length - 1
  );

  const current = slides[safeIndex];

  const handleMove = (
    clientX: number,
    clientY: number,
    el: HTMLElement
  ) => {
    if (zoomScale === 1) return;

    const rect = el.getBoundingClientRect();

    const x = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );

    const y = Math.max(
      0,
      Math.min(100, ((clientY - rect.top) / rect.height) * 100)
    );

    setPanOrigin({ x, y });
  };

  const changeSlide = (idx: number) => {
    setActiveIndex(idx);
    setPanOrigin({ x: 50, y: 50 });
  };

  return (
    <div
      dir={isFa ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#120707]/[0.98] backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#8E3B36]/15 blur-[100px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#C49A5A]/[0.07] blur-[100px]" />

      {/* Header */}
      <header
        className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#C49A5A]/20 bg-[#190B0B]/80 px-4 py-3.5 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#C49A5A]/40 bg-[#281211]">
            <Maximize2 className="h-4 w-4 text-[#D6B77B]" />
          </div>

          <div className="min-w-0 space-y-0.5">
            <span
              dir="ltr"
              className="block font-serif-display text-[10px] tracking-[0.24em] text-[#D6B77B]"
            >
              KOLAHDOOZAN · {archiveCode}
            </span>

            <p className="truncate text-xs font-medium text-[#F1E5D1]">
              {current.label}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close zoom"
          className="group flex h-9 w-9 shrink-0 items-center justify-center border border-[#C49A5A]/35 bg-[#281211] text-[#D6B77B] transition-all duration-300 hover:border-[#D6B77B] hover:bg-[#C49A5A] hover:text-[#190B0B]"
        >
          <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </header>

      {/* Main viewer */}
      <main
        onClick={(e) => e.stopPropagation()}
        onMouseMove={(e) =>
          handleMove(e.clientX, e.clientY, e.currentTarget)
        }
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            handleMove(
              e.touches[0].clientX,
              e.touches[0].clientY,
              e.currentTarget
            );
          }
        }}
        className="relative flex min-h-0 flex-1 touch-none items-center justify-center overflow-hidden px-4 py-5 sm:px-8"
        style={{
          cursor: zoomScale > 1 ? 'crosshair' : 'default',
        }}
      >
        {/* Decorative frame */}
        <div className="pointer-events-none absolute inset-x-5 inset-y-5 sm:inset-x-12 sm:inset-y-8">
          <div className="absolute inset-0 border border-[#C49A5A]/15" />

          <span className="absolute -left-px -top-px h-5 w-5 border-l border-t border-[#D6B77B]/65" />

          <span className="absolute -right-px -top-px h-5 w-5 border-r border-t border-[#D6B77B]/65" />

          <span className="absolute -bottom-px -left-px h-5 w-5 border-b border-l border-[#D6B77B]/65" />

          <span className="absolute -bottom-px -right-px h-5 w-5 border-b border-r border-[#D6B77B]/65" />
        </div>

        {/* Image */}
        <div className="relative flex max-h-full max-w-full items-center justify-center">
          <div className="relative max-h-[72vh] max-w-full border border-[#C49A5A]/35 bg-[#190B0B] p-1.5 shadow-[0_25px_90px_rgba(0,0,0,0.55)] sm:p-2">
            <img
              key={current.id}
              src={current.src}
              alt={current.label}
              draggable={false}
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: `${panOrigin.x}% ${panOrigin.y}%`,
              }}
              className="block max-h-[68vh] max-w-full select-none object-contain transition-transform duration-150"
            />
          </div>

          {/* Image counter */}
          <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif-display text-[10px] tracking-[0.22em] text-[#D6B77B]/75">
            {String(safeIndex + 1).padStart(2, '0')}

            <span className="mx-2 text-[#C49A5A]/50">/</span>

            {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </main>

      {/* Bottom controls */}
      <footer
        className="relative z-10 shrink-0 border-t border-[#C49A5A]/20 bg-[#190B0B]/90 px-4 pb-5 pt-4 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-lg space-y-4">

          {/* Zoom controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[10px] tracking-[0.18em] text-[#C49A5A]">
                {isFa ? 'بزرگ‌نمایی بافت' : 'WEAVE MAGNIFICATION'}
              </p>

              <p className="text-[11px] text-[#B9A28A]">
                {isFa
                  ? 'بررسی جزئیات دست‌بافت'
                  : 'Explore the handmade details'}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {([1, 2, 3] as const).map((level) => {
                const selected = zoomScale === level;

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setZoomScale(level);
                      setPanOrigin({ x: 50, y: 50 });
                    }}
                    style={
                      selected
                        ? {
                            backgroundColor: accentColor,
                            borderColor: accentColor,
                            color: '#190B0B',
                          }
                        : undefined
                    }
                    className={`min-w-10 border px-3 py-2 text-[11px] font-semibold transition-all duration-200 ${
                      selected
                        ? 'shadow-[0_4px_16px_rgba(196,154,90,0.2)]'
                        : 'border-[#C49A5A]/25 bg-[#281211] text-[#D6B77B] hover:border-[#C49A5A]/70'
                    }`}
                  >
                    {level}×
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setZoomScale(zoomScale === 1 ? 2 : 1);
                  setPanOrigin({ x: 50, y: 50 });
                }}
                className="ms-1 flex h-9 w-9 items-center justify-center border border-[#C49A5A]/25 bg-[#281211] text-[#D6B77B] transition-colors hover:border-[#C49A5A]/70"
                aria-label="Toggle zoom"
              >
                {zoomScale > 1 ? (
                  <ZoomOut className="h-4 w-4" />
                ) : (
                  <ZoomIn className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Thumbnail gallery */}
          <div className="no-scrollbar flex items-center justify-center gap-2 overflow-x-auto py-1">
            {slides.map((slide, idx) => {
              const selected = idx === safeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => changeSlide(idx)}
                  aria-label={slide.label}
                  aria-current={selected ? 'true' : undefined}
                  className={`group relative h-12 w-12 shrink-0 overflow-hidden border transition-all duration-300 ${
                    selected
                      ? 'border-[#D6B77B] p-[2px] shadow-[0_0_14px_rgba(196,154,90,0.22)]'
                      : 'border-[#C49A5A]/20 opacity-55 hover:border-[#C49A5A]/60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {selected && (
                    <span className="absolute inset-x-1 bottom-1 h-[2px] bg-[#D6B77B]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint */}
          <div className="flex items-center justify-center gap-2 border-t border-[#C49A5A]/10 pt-3 text-[10px] text-[#B9A28A]">
            {zoomScale > 1 ? (
              <ZoomOut className="h-3.5 w-3.5 text-[#D6B77B]" />
            ) : (
              <ZoomIn className="h-3.5 w-3.5 text-[#D6B77B]" />
            )}

            <span>
              {isFa
                ? 'برای مشاهده جزئیات، روی تصویر حرکت کنید'
                : 'Move across the image to inspect its details'}
            </span>

            <span className="mx-1 text-[#C49A5A]/40">✦</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
