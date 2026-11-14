import type { Lang, RouteView, RugPiece } from '../types';
import { Rug07PPage } from './Rug07PPage';
import { Rug25QPage } from './Rug25QPage';

interface RugDetailPageProps {
  rug: RugPiece;
  lang: Lang;
  onToggleLang: (next: Lang) => void;
  onNavigate: (target: RouteView, sectionId?: string) => void;
  onOpenInquiry: (pieceCode?: string) => void;
}

export function RugDetailPage(props: RugDetailPageProps) {
  if (props.rug.slug === 'kld-isf-07p') {
    return <Rug07PPage {...props} />;
  }
  return <Rug25QPage {...props} />;
}
