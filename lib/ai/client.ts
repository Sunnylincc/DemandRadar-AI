import { promptForMode } from '@/lib/prompts/templates';
import { computeOpportunityScore } from '@/lib/scoring/opportunity';
import { AnalysisMode, OpportunityReport, UserSettings } from '@/lib/types';

const demoFallback = {
  executiveSummary: 'Strong recurring pain around slow customer research and unclear demand validation workflows.',
  topPainPoints: ['Too much noisy feedback spread across forums', 'No clear prioritization framework', 'PRD drafting takes too long'],
  repeatedComplaints: ['Insights are anecdotal', 'Existing tools are expensive for solo founders'],
  buyingIntentSignals: ['Users asking for paid alternatives', 'Requests for done-for-you reports'],
  dislikedAlternatives: ['Manual spreadsheet workflows', 'Generic social listening tools'],
  mvpFeatureList: ['Input parser for URL/text/keywords', 'Opportunity scoring dashboard', 'Export to markdown/json'],
  suggestedPricingModel: 'Freemium with paid Pro tier ($29-$79/mo) for larger report limits and premium prompts.',
  landingPageCopy: 'Find market pain before you build. Turn noisy discussions into clear startup opportunities in minutes.',
  seoSuggestions: ['how to validate startup ideas guide', 'customer pain point analysis comparison page'],
  buildPrompt: 'Build a Next.js TypeScript app with local history, report cards, exports, and provider-agnostic AI clients.',
  founderMarketFitNotes: 'Best fit if founder has direct domain exposure and can ship quickly.'
};

async function providerCall(prompt: string, settings: UserSettings) {
  if (settings.apiMode === 'proxy') {
    const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ provider: settings.provider, model: settings.model, baseUrl: settings.baseUrl, prompt }) });
    if (!res.ok) throw new Error('Proxy failed');
    return res.json();
  }

  if (!settings.apiKey) throw new Error('API key required');
  if (settings.provider === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': settings.apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: settings.model, max_tokens: 1400, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await res.json();
    return JSON.parse(data.content?.[0]?.text ?? '{}');
  }

  const base = settings.provider === 'openai_compatible' ? settings.baseUrl : 'https://api.openai.com/v1';
  const res = await fetch(`${base.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${settings.apiKey}` },
    body: JSON.stringify({ model: settings.model, messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' } })
  });
  const data = await res.json();
  return JSON.parse(data.choices?.[0]?.message?.content ?? '{}');
}

export async function runAnalysis(input: string, mode: AnalysisMode, settings: UserSettings): Promise<OpportunityReport> {
  const prompt = promptForMode(mode, input.length < 80 ? `${input}\nSimulated research mode enabled. Placeholder for compliant search API integration.` : input);
  try {
    const raw = await providerCall(prompt, settings);
    const opportunityScore = computeOpportunityScore(raw);
    return { ...raw, opportunityScore };
  } catch {
    const opportunityScore = computeOpportunityScore(demoFallback);
    return { ...demoFallback, opportunityScore };
  }
}
