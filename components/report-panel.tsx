'use client';

import { OpportunityReport } from '@/lib/types';

export function ReportPanel({ report }: { report: OpportunityReport | null }) {
  if (!report) return null;

  const exportMarkdown = () => {
    const md = `# DemandRadar AI Report\n\n## Executive Summary\n${report.executiveSummary}\n\n## Top Pain Points\n${report.topPainPoints.map((x) => `- ${x}`).join('\n')}`;
    navigator.clipboard.writeText(md);
    alert('Markdown copied to clipboard');
  };

  const exportJson = () => {
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    alert('JSON copied to clipboard');
  };

  return (
    <section className="mt-8 space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <Card title="Opportunity Score" value={`${report.opportunityScore.overall}/100`} />
        <Card title="Pain Intensity" value={`${report.opportunityScore.painIntensity}/10`} />
        <Card title="Willingness To Pay" value={`${report.opportunityScore.willingnessToPay}/10`} />
      </div>
      <article className="rounded-xl bg-white p-5 shadow">
        <h2 className="text-xl font-semibold">Executive Summary</h2><p className="mt-2 text-slate-700">{report.executiveSummary}</p>
      </article>
      <ListCard title="Top Pain Points" items={report.topPainPoints} />
      <ListCard title="Repeated Complaints" items={report.repeatedComplaints} />
      <ListCard title="Buying Intent Signals" items={report.buyingIntentSignals} />
      <ListCard title="Existing Alternatives People Dislike" items={report.dislikedAlternatives} />
      <ListCard title="MVP Feature List" items={report.mvpFeatureList} />
      <article className="rounded-xl bg-white p-5 shadow"><h3 className="font-semibold">Suggested Pricing Model</h3><p>{report.suggestedPricingModel}</p></article>
      <article className="rounded-xl bg-white p-5 shadow"><h3 className="font-semibold">Landing Page Copy</h3><p>{report.landingPageCopy}</p></article>
      <ListCard title="GEO / SEO Content Suggestions" items={report.seoSuggestions} />
      <article className="rounded-xl bg-white p-5 shadow"><h3 className="font-semibold">Build Prompt for Codex or Claude Code</h3><pre className="mt-2 whitespace-pre-wrap text-sm">{report.buildPrompt}</pre></article>
      <div className="flex gap-2"><button className="rounded bg-slate-900 px-4 py-2 text-white" onClick={exportMarkdown}>Export Markdown</button><button className="rounded border border-slate-300 px-4 py-2" onClick={exportJson}>Export JSON</button></div>
    </section>
  );
}

function Card({ title, value }: { title: string; value: string }) { return <div className="rounded-xl bg-white p-4 shadow"><p className="text-sm text-slate-500">{title}</p><p className="text-2xl font-semibold">{value}</p></div>; }
function ListCard({ title, items }: { title: string; items: string[] }) { return <article className="rounded-xl bg-white p-5 shadow"><h3 className="font-semibold">{title}</h3><ul className="mt-2 list-disc pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul></article>; }
