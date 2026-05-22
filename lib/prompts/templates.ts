import { AnalysisMode } from '@/lib/types';

const baseSections = `Return JSON with exactly these keys:
executiveSummary, topPainPoints, repeatedComplaints, buyingIntentSignals,
dislikedAlternatives, mvpFeatureList, suggestedPricingModel,
landingPageCopy, seoSuggestions, buildPrompt, founderMarketFitNotes.

Keep each array concise and tactical.`;

export const painPointMiningPrompt = (input: string) =>
  `You are DemandRadar AI. Mine pain points from this input:\n${input}\n${baseSections}`;
export const competitorComplaintPrompt = (input: string) =>
  `Analyze competitor complaints and unmet needs from:\n${input}\n${baseSections}`;
export const startupIdeaPrompt = (input: string) =>
  `Generate startup opportunities grounded in demand signals from:\n${input}\n${baseSections}`;
export const prdPrompt = (input: string) =>
  `Create MVP/PRD-oriented opportunity analysis from:\n${input}\n${baseSections}`;
export const landingPagePrompt = (input: string) =>
  `Create landing-page-driven demand analysis from:\n${input}\n${baseSections}`;
export const buildPromptPrompt = (input: string) =>
  `Create build-ready prompts for Codex/Claude Code from:\n${input}\n${baseSections}`;

export function promptForMode(mode: AnalysisMode, input: string): string {
  switch (mode) {
    case 'pain_point_mining': return painPointMiningPrompt(input);
    case 'competitor_complaint_analysis': return competitorComplaintPrompt(input);
    case 'startup_idea_discovery': return startupIdeaPrompt(input);
    case 'prd_generator': return prdPrompt(input);
    case 'landing_page_generator': return landingPagePrompt(input);
    case 'build_prompt_generator': return buildPromptPrompt(input);
  }
}
