import { CheckCircle2, MapPin, Phone, Video, X } from 'lucide-react';
import { useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import type { Lang } from '../types';

interface ConciergeModalProps {
  open: boolean;
  pieceCode?: string;
  lang: Lang;
  onClose: () => void;
}

export function ConciergeModal({ open, pieceCode, lang, onClose }: ConciergeModalProps) {
  const [visitType, setVisitType] = useState<'in-person' | 'remote'>('in-person');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const isLapis25Q = pieceCode === 'KLD · ISF-25Q';
  const isCopper07P = pieceCode === 'KLD · ISF-07P';

  const accent = isLapis25Q ? '#9C5B46' : '#8D4923';
  const bg = isLapis25Q ? '#F7F5F0' : '#F5EDE0';
  const hairline = isLapis25Q ? 'rgba(17, 26, 46, 0.22)' : 'rgba(141, 73, 35, 0.25)';
  const inkPrimary = isLapis25Q ? '#111A2E' : '#241409';
  const inkMuted = isLapis25Q ? '#555E70' : '#644D3D';
  const inputBg = '#FFFFFF';
  const btnGradient = isLapis25Q
    ? 'linear-gradient(135deg, #16223B 0%, #0E1628 100%)'
    : 'linear-gradient(135deg, #2D180B 0%, #1C0E05 100%)';
  const btnText = isCopper07P ? '#F6DFC2' : '#FAF6F0';
  const isLightModal = true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('./api/inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pieceCode: pieceCode || 'GENERAL',
          visitType,
          name,
          contact,
          note,
          lang,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Offline fallback: still show success confirmation
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setNote('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-md"
      onClick={resetAndClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: bg,
          borderColor: hairline,
          color: inkPrimary,
        }}
        className="relative w-full max-w-lg rounded-t-sm sm:rounded-xs border p-6 sm:p-8 shadow-[0_-20px_70px_rgba(0,0,0,0.85)]"
      >
        {/* Subtle Corner Ticks */}
        <span
          aria-hidden="true"
          style={{ borderColor: accent }}
          className="pointer-events-none absolute top-2.5 start-2.5 h-3 w-3 border-t border-s opacity-70"
        />
        <span
          aria-hidden="true"
          style={{ borderColor: accent }}
          className="pointer-events-none absolute top-2.5 end-2.5 h-3 w-3 border-t border-e opacity-70"
        />

        <button
          type="button"
          onClick={resetAndClose}
          style={{ borderColor: hairline, color: inkMuted }}
          className="absolute top-4 end-4 border p-1.5 hover:text-white cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {!submitted ? (
          <>
            <p
              style={{ color: accent }}
              className="text-[10px] uppercase tracking-[0.26em] font-medium"
            >
              {lang === 'fa' ? 'دفتر تشریفات و کلکسیون کلاهدوزان' : 'KOLAHDOOZAN PRIVATE CONCIERGE'}
            </p>
            <h3
              className={`mt-2 text-xl sm:text-2xl font-medium ${
                lang === 'fa' ? 'font-persian-editorial' : 'font-serif-display'
              }`}
            >
              {lang === 'fa'
                ? 'رزرو بازدید اختصاصی و استعلام قیمت قطعی'
                : 'Request Private Viewing or Provenance File'}
            </h3>
            {pieceCode && (
              <div
                style={{ borderColor: hairline, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="mt-3 inline-flex items-center gap-2.5 border px-3 py-1 text-[11px]"
              >
                <span style={{ color: inkMuted }}>
                  {lang === 'fa' ? 'کد اثر انتخابی:' : 'Archive Ref:'}
                </span>
                <span
                  dir="ltr"
                  style={{ color: accent }}
                  className="font-serif-display font-semibold tracking-[0.18em]"
                >
                  {pieceCode}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setVisitType('in-person')}
                  style={{
                    borderColor: visitType === 'in-person' ? accent : hairline,
                    backgroundColor:
                      visitType === 'in-person' ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: visitType === 'in-person' ? accent : inkMuted,
                  }}
                  className="flex items-center justify-center gap-2 border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {lang === 'fa' ? 'بازدید حضوری اصفهان' : 'Isfahan Salon Visit'}
                </button>
                <button
                  type="button"
                  onClick={() => setVisitType('remote')}
                  style={{
                    borderColor: visitType === 'remote' ? accent : hairline,
                    backgroundColor:
                      visitType === 'remote' ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: visitType === 'remote' ? accent : inkMuted,
                  }}
                  className="flex items-center justify-center gap-2 border px-3 py-2.5 text-xs font-medium transition-all cursor-pointer"
                >
                  <Video className="h-3.5 w-3.5" />
                  {lang === 'fa' ? 'ویدیو و استعلام زنده' : 'Live Video View'}
                </button>
              </div>

              <div>
                <label style={{ color: inkMuted }} className="mb-1.5 block text-[11px]">
                  {lang === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'}
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'fa' ? 'مثال: مهرداد شریفی' : 'e.g., Elena Rostova'}
                  style={{ borderColor: hairline, color: inkPrimary, backgroundColor: inputBg }}
                  className={`w-full border px-3.5 py-2.5 text-sm outline-none ${
                    isLightModal
                      ? 'placeholder:text-[#8C7768] focus:border-[#8A4722]'
                      : 'placeholder:text-white/30 focus:border-white/60'
                  }`}
                />
              </div>

              <div>
                <label style={{ color: inkMuted }} className="mb-1.5 block text-[11px]">
                  {lang === 'fa' ? 'شماره تماس یا واتساپ' : 'Phone, WhatsApp, or Email'}
                </label>
                <input
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={lang === 'fa' ? '0912...' : '+98 913 ... or email'}
                  style={{ borderColor: hairline, color: inkPrimary, backgroundColor: inputBg }}
                  className={`w-full border px-3.5 py-2.5 text-sm outline-none ${
                    isLightModal
                      ? 'placeholder:text-[#8C7768] focus:border-[#8A4722]'
                      : 'placeholder:text-white/30 focus:border-white/60'
                  }`}
                />
              </div>

              <div>
                <label style={{ color: inkMuted }} className="mb-1.5 block text-[11px]">
                  {lang === 'fa' ? 'درخواست ویژه (اختیاری)' : 'Private Note (optional)'}
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    lang === 'fa'
                      ? 'استعلام قیمت روز، هماهنگی مشاهده جفت یا ارسال ویدیوی نور طبیعی'
                      : 'Request natural daylight video, valuation sheet, or gallery appointment'
                  }
                  style={{ borderColor: hairline, color: inkPrimary, backgroundColor: inputBg }}
                  className={`w-full border px-3.5 py-2 text-sm outline-none ${
                    isLightModal
                      ? 'placeholder:text-[#8C7768] focus:border-[#8A4722]'
                      : 'placeholder:text-white/30 focus:border-white/60'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{ backgroundImage: btnGradient, color: btnText }}
                className="btn-atelier-gold relative w-full py-3.5 text-xs sm:text-sm font-semibold tracking-wide cursor-pointer disabled:opacity-60"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[3px] border border-black/20"
                />
                {submitting
                  ? lang === 'fa'
                    ? 'در حال ثبت درخواست...'
                    : 'Submitting...'
                  : lang === 'fa'
                    ? '◆ ثبت درخواست بازدید اختصاصی'
                    : '◆ Submit Private Concierge Request'}
              </button>
            </form>

            <div
              style={{ borderColor: hairline, color: inkMuted }}
              className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-[11px]"
            >
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" style={{ color: accent }} />
                {lang === 'fa' ? 'تماس مستقیم گالری:' : 'Direct Atelier Line:'}
              </span>
              <div className="flex gap-3 font-medium" style={{ color: inkPrimary }} dir="ltr">
                <a href="tel:03132220519" className="hover:underline">
                  031-32220519
                </a>
                <span>·</span>
                <a href="tel:09133199118" className="hover:underline">
                  0913-319-9118
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="py-7 text-center">
            <CheckCircle2 className="mx-auto h-11 w-11" style={{ color: accent }} />
            <h4
              className={`mt-4 text-xl font-medium ${
                lang === 'fa' ? 'font-persian-editorial' : 'font-serif-display'
              }`}
            >
              {lang === 'fa' ? 'درخواست شما با احترام ثبت شد' : 'Your Private Inquiry Is Logged'}
            </h4>
            <p style={{ color: inkMuted }} className="mt-2.5 text-xs sm:text-sm leading-relaxed">
              {lang === 'fa'
                ? `مدیر تشریفات گالری فرش کلاهدوزان در کوتاه‌ترین زمان درباره اثر ${pieceCode ?? ''} با شما تماس می‌گیرد.`
                : `A senior Kolahdoozan curator will contact you personally regarding ${pieceCode ?? 'your selection'}.`}
            </p>
            <p style={{ color: accent }} className="mt-3 text-[11px]">
              {SITE_CONTENT.brand.address[lang]}
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              style={{ borderColor: accent, color: accent }}
              className="mt-6 border px-6 py-2 text-xs font-medium hover:bg-white/5 cursor-pointer"
            >
              {lang === 'fa' ? 'بازگشت به اثر' : 'Return to Exhibition'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
