import type React from 'react';
import {Layout} from '@/components/layout/Layout';
import {routeFor} from '@/lib/qdis/routes';
import Home from './pages/Home';
import {About, Academics, SatAp} from './pages/School';
import {ResultsPage, CounselingPage} from './pages/College';
import {BoardingPage, DailyLifePage, MealsPage} from './pages/Life';
import {TuitionPage, ScholarshipsPage, AdmissionsPage, FaqPage, NewsPage, ConsultationPage, NotFound} from './pages/Admission';

const PAGES: Record<string, () => React.JSX.Element> = {
  home: Home, about: About, academics: Academics, satap: SatAp, results: ResultsPage, counseling: CounselingPage,
  boarding: BoardingPage, daily: DailyLifePage, meals: MealsPage, tuition: TuitionPage, scholarships: ScholarshipsPage,
  admissions: AdmissionsPage, faq: FaqPage, news: NewsPage, consultation: ConsultationPage, '404': NotFound,
};

export function App({path}: {path: string}) {
  const r = routeFor(path);
  const Page = PAGES[r.key] ?? NotFound;
  return <Layout section={r.section}><Page /></Layout>;
}
