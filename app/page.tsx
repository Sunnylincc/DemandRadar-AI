'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ReportPanel } from '@/components/report-panel';
import { runAnalysis } from '@/lib/ai/client';
import { AnalysisMode, OpportunityReport, UserSettings } from '@/lib/types';

const defaultSettings: UserSettings = { provider: 'openai', apiMode: 'browser_key', apiKey: '', model: 'gpt-4o-mini', baseUrl: 'https://api.openai.com/v1' };

export default function Home() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AnalysisMode>('pain_point_mining');
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [report, setReport] = useState<OpportunityReport | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { const raw = localStorage.getItem('demandradar-settings'); if (raw) setSettings(JSON.parse(raw)); }, []);
  useEffect(() => { localStorage.setItem('demandradar-settings', JSON.stringify(settings)); }, [settings]);

  async function analyze() { setLoading(true); const r = await runAnalysis(input, mode, settings); setReport(r); localStorage.setItem('demandradar-last-report', JSON.stringify(r)); setLoading(false); }

  return <main className="mx-auto max-w-5xl px-4 py-10">
    <header className="mb-8"><p className="inline-block rounded-full bg-slate-900 px-3 py-1 text-xs text-white">DemandRadar AI MVP</p><h1 className="mt-3 text-4xl font-bold">Discover demand signals. Build what people will pay for.</h1><p className="mt-2 text-slate-600">Compliant public-web and user-provided signal analysis. No login scraping or CAPTCHA bypassing.</p><Link className="mt-3 inline-block text-sm underline" href="/methodology">View Methodology</Link></header>
    <section className="rounded-xl bg-white p-5 shadow space-y-4">
      <textarea className="w-full rounded border p-3" rows={5} placeholder="Keyword, category, competitor, public URL, or pasted discussion text" value={input} onChange={(e)=>setInput(e.target.value)} />
      <div className="grid gap-3 md:grid-cols-3">
        <select className="rounded border p-2" value={mode} onChange={(e)=>setMode(e.target.value as AnalysisMode)}><option value="pain_point_mining">Pain Point Mining</option><option value="competitor_complaint_analysis">Competitor Complaint Analysis</option><option value="startup_idea_discovery">Startup Idea Discovery</option><option value="prd_generator">MVP / PRD Generator</option><option value="landing_page_generator">Landing Page Generator</option><option value="build_prompt_generator">Build Prompt Generator</option></select>
        <select className="rounded border p-2" value={settings.provider} onChange={(e)=>setSettings({...settings,provider:e.target.value as UserSettings['provider']})}><option value="openai">OpenAI</option><option value="anthropic">Anthropic Claude</option><option value="openai_compatible">OpenAI-compatible endpoint</option></select>
        <select className="rounded border p-2" value={settings.apiMode} onChange={(e)=>setSettings({...settings,apiMode:e.target.value as UserSettings['apiMode']})}><option value="browser_key">Browser key mode</option><option value="proxy">Proxy mode (/api/analyze)</option></select>
      </div>
      <details><summary className="cursor-pointer font-medium">Settings Panel</summary><div className="mt-3 grid gap-2"><input className="rounded border p-2" placeholder="API key" value={settings.apiKey} onChange={(e)=>setSettings({...settings,apiKey:e.target.value})} /><input className="rounded border p-2" placeholder="Model" value={settings.model} onChange={(e)=>setSettings({...settings,model:e.target.value})} /><input className="rounded border p-2" placeholder="Base URL (OpenAI-compatible)" value={settings.baseUrl} onChange={(e)=>setSettings({...settings,baseUrl:e.target.value})} /></div></details>
      {settings.apiMode === 'browser_key' && <p className="rounded border border-amber-300 bg-amber-50 p-2 text-sm text-amber-800">Warning: Browser API key mode is for personal/demo use only. Use proxy mode in production.</p>}
      <button onClick={analyze} disabled={loading || !input} className="rounded bg-slate-900 px-4 py-2 text-white">{loading ? 'Analyzing...' : 'Run Analysis'}</button>
      <p className="text-sm text-slate-500">Examples: “B2B invoicing software complaints”, “https://example.com/forum-thread”, “Notion alternatives for agencies”</p>
    </section>
    <ReportPanel report={report} />
  </main>;
}
