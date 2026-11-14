import { useEffect, useState } from 'react';
import { ConciergeModal } from './components/ConciergeModal';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { FLAGSHIP_RUGS } from './data/rugs';
import { HomePage } from './pages/HomePage';
import { RugDetailPage } from './pages/RugDetailPage';
import { TypographyShowcasePage } from './pages/TypographyShowcasePage';
import type { Lang, RouteView } from './types';

function parseHashRoute(): RouteView {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash === '/rug/kld-isf-25q') return { type: 'rug', slug: 'kld-isf-25q' };
  if (hash === '/rug/kld-isf-07p') return { type: 'rug', slug: 'kld-isf-07p' };
  if (hash.startsWith('/typography')) {
    const parts = hash.split('/');
    const idx = parts[2] ? parseInt(parts[2], 10) - 1 : 0;
    return { type: 'typography', index: isNaN(idx) ? 0 : idx };
  }
  return { type: 'home' };
}

export function App() {
  const [lang, setLang] = useState<Lang>('fa');
  const [route, setRoute] = useState<RouteView>(() => parseHashRoute());
  const [inquiryState, setInquiryState] = useState<{ open: boolean; pieceCode?: string }>({
    open: false,
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (target: RouteView, sectionId?: string) => {
    if (target.type === 'home') {
      if (window.location.hash !== '' && window.location.hash !== '#/') {
        window.location.hash = '#/';
      }
      setRoute({ type: 'home' });
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (target.type === 'rug') {
      window.location.hash = `#/rug/${target.slug}`;
      setRoute(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.type === 'typography') {
      const idx = target.index !== undefined ? target.index + 1 : 1;
      window.location.hash = `#/typography/${idx}`;
      setRoute(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeRug =
    route.type === 'rug'
      ? FLAGSHIP_RUGS.find((r) => r.slug === route.slug) ?? FLAGSHIP_RUGS[0]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--atelier-bg)] text-[var(--atelier-ink)]">
      {route.type === 'typography' ? (
        <TypographyShowcasePage
          lang={lang}
          initialIndex={route.index ?? 0}
          onNavigate={handleNavigate}
          onOpenInquiry={(pieceCode) => setInquiryState({ open: true, pieceCode })}
        />
      ) : route.type === 'home' || !activeRug ? (
        <>
          <Navbar
            lang={lang}
            onToggleLang={setLang}
            route={route}
            onNavigate={handleNavigate}
            onOpenInquiry={(pieceCode) => setInquiryState({ open: true, pieceCode })}
          />
          <div className="flex-1">
            <HomePage
              lang={lang}
              onNavigate={handleNavigate}
              onOpenInquiry={(pieceCode) => setInquiryState({ open: true, pieceCode })}
            />
          </div>
          <Footer
            lang={lang}
            onNavigate={handleNavigate}
            onOpenInquiry={(pieceCode) => setInquiryState({ open: true, pieceCode })}
          />
        </>
      ) : (
        <RugDetailPage
          rug={activeRug}
          lang={lang}
          onToggleLang={setLang}
          onNavigate={handleNavigate}
          onOpenInquiry={(pieceCode) => setInquiryState({ open: true, pieceCode })}
        />
      )}

      <ConciergeModal
        open={inquiryState.open}
        pieceCode={inquiryState.pieceCode}
        lang={lang}
        onClose={() => setInquiryState({ open: false })}
      />
    </div>
  );
}

export default App;
