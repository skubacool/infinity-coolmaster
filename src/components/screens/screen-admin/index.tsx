import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import { isSupabaseConfigured } from '../../../lib/supabaseClient';
import { getSession, onAuthChange, signOut } from '../../../apis/admin';
import { listCollections } from '../../../config/cms-schema';
import BrandLogo from '../../_commons/brand-logo';
import Loading from '../../_commons/loading';
import SectionLogin from './sections/section-login';
import SectionText from './sections/section-text';
import SectionMedia from './sections/section-media';
import SectionCollection from './sections/section-collection';
import SectionLeads from './sections/section-leads';

interface Tab {
  id: string;
  label: string;
}

const TABS: Tab[] = [
  { id: 'leads', label: '📥 Leads' },
  { id: 'text', label: 'Site Text' },
  { id: 'images', label: 'Banners & Images' },
  ...listCollections.map((c) => ({ id: c.collection, label: c.label })),
];

/** Hidden content manager at /#/admin — Supabase Auth protected. */
const ScreenAdmin = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>('leads');

  useEffect(() => {
    document.title = 'Content Manager — Infinity CoolMaster';
    if (!isSupabaseConfigured) {
      setSession(null);
      return;
    }
    let unsubscribe = () => {};
    (async () => {
      setSession(await getSession());
      unsubscribe = onAuthChange(setSession);
    })();
    return () => unsubscribe();
  }, []);

  const content = useMemo(() => {
    if (activeTab === 'text') return <SectionText />;
    if (activeTab === 'images') return <SectionMedia />;
    if (activeTab === 'leads') return <SectionLeads />;
    const schema = listCollections.find((c) => c.collection === activeTab);
    if (!schema) return null;
    // key forces a clean reload when switching collections
    return <SectionCollection key={schema.collection} schema={schema} />;
  }, [activeTab]);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col justify-center items-center px-6 text-center gap-y-3">
        <BrandLogo height={64} />
        <h1 className="text-xl font-semibold text-text-main">
          Content Manager is not available
        </h1>
        <p className="max-w-[480px] text-sm text-text-muted">
          This build was made without Supabase credentials (.env.local). Add
          VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, rebuild, and redeploy.
        </p>
      </div>
    );
  }

  if (session === undefined) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!session) return <SectionLogin />;

  return (
    <div className="min-h-screen bg-bg-soft flex flex-col justify-start items-stretch">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sep-pale">
        <div className="mx-auto w-full max-w-[1280px] px-6 h-16 gap-x-4 flex flex-row items-center">
          <BrandLogo markOnly height={32} />
          <span className="text-base font-semibold text-text-main">
            Content Manager
          </span>
          <span className="flex-1" />
          <a
            className="text-sm text-brand-blue underline underline-offset-4"
            href="#/en"
            target="_blank"
            rel="noreferrer"
          >
            View site
          </a>
          <span className="hidden sm:block text-xs text-title-pale">
            {session.user.email}
          </span>
          <button
            type="button"
            className="rounded-lg border border-sep-light text-xs font-semibold text-text-muted px-3 py-1.5 hover:border-brand-blue hover:text-brand-blue"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-6 gap-6 flex-1 flex flex-col lg:flex-row items-stretch lg:items-start">
        <nav className="lg:w-56 flex-shrink-0">
          <ul className="gap-1 flex flex-row lg:flex-col flex-wrap">
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  className={`w-full text-left rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-navy text-white'
                      : 'text-text-muted hover:bg-white hover:text-text-main'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="hidden lg:block mt-6 px-2 text-2xs text-title-pale leading-relaxed">
            Changes go live on the website on the next page load — no redeploy
            needed.
          </p>
        </nav>
        <main className="flex-1 min-w-0 pb-16">{content}</main>
      </div>
    </div>
  );
};

export default ScreenAdmin;
