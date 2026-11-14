import { Expand, Search, X, ZoomIn } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Lang, RugPiece } from '../types';

interface LoupeViewerProps {
  rug: RugPiece;
  lang: Lang;
  zoomHint: string;
}

export function LoupeViewer({ rug, lang, zoomHint }: LoupeViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loupeEnabled, setLoupeEnabled] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50, px: 0, py: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = Math.max(0, Math.min(100, (px / rect.width) * 100));
    const y = Math.max(0, Math.min(100, (py / rect.height) * 100));
    setPos({ x, y, px, py });
  };

  return (
    <>
      <div className="space-y-3">
        {/* Museum Stage Frame */}
        <div
          ref={containerRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMouseMove}
          style={{
            backgroundColor: rug.theme.softWash,
            borderColor: rug.theme.borderTint,
          }}
          className={`relative overflow-hidden rounded-2xl border p-4 sm:p-7 transition-colors ${
            loupeEnabled ? 'cursor-crosshair' : 'cursor-zoom-in'
          }`}
          onClick={() => {
            if (!loupeEnabled) setLightboxOpen(true);
          }}
        >
          {/* Subtle top archive strip */}
          <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--atelier-muted)]">
            <span className="font-serif-display font-medium" style={{ color: rug.theme.primary }}>
              {rug.archiveCode}
            </span>
            <span>{rug.dimensions[lang]}</span>
          </div>

          <div className="relative mx-auto flex max-h-[640px] items-center justify-center overflow-hidden rounded-xl bg-white/60 shadow-[0_24px_60px_-24px_rgba(23,22,20,0.22)]">
            <img
              src={rug.image}
              alt={rug.title[lang]}
              className="max-h-[600px] w-full object-contain select-none"
              draggable={false}
            />

            {/* Precision 2.8x Magnifier Loupe */}
            {loupeEnabled && hovering && (
              <div
                aria-hidden="true"
                style={{
                  left: `${pos.px - 88}px`,
                  top: `${pos.py - 88}px`,
                  backgroundImage: `url(${rug.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '280%',
                  backgroundPosition: `${pos.x}% ${pos.y}%`,
                  borderColor: rug.theme.primary,
                }}
                className="pointer-events-none absolute hidden h-44 w-44 rounded-full border-2 shadow-[0_18px_40px_rgba(0,0,0,0.35)] ring-4 ring-white/80 md:block"
              />
            )}
          </div>

          {/* Controls Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs text-[var(--atelier-muted)]">
              <Search className="h-3.5 w-3.5 shrink-0" style={{ color: rug.theme.primary }} />
              <span>{zoomHint}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLoupeEnabled((v) => !v);
                }}
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[var(--atelier-line)] bg-[#FDFBF7] px-3 py-1.5 text-xs font-medium text-[var(--atelier-ink)] hover:bg-white cursor-pointer"
              >
                <ZoomIn className="h-3.5 w-3.5" />
                {lang === 'fa'
                  ? loupeEnabled
                    ? 'ذره‌بین فعال (۲.۸×)'
                    : 'فعال‌سازی ذره‌بین'
                  : loupeEnabled
                    ? 'Loupe Active (2.8×)'
                    : 'Enable Loupe'}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--atelier-line)] bg-[#FDFBF7] px-3 py-1.5 text-xs font-medium text-[var(--atelier-ink)] hover:bg-white cursor-pointer"
              >
                <Expand className="h-3.5 w-3.5" />
                {lang === 'fa' ? 'نمایش تمام‌صفحه' : 'Fullscreen'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#100F0D]/92 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 end-5 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-h-[92vh] max-w-5xl overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={rug.image}
              alt={rug.title[lang]}
              className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-xs tracking-wider text-white/75">
              {rug.archiveCode} — {rug.title[lang]} ({rug.dimensions[lang]})
            </p>
          </div>
        </div>
      )}
    </>
  );
}
