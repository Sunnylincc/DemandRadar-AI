export type AnalysisMode =
  | 'pain_point_mining'
  | 'competitor_complaint_analysis'
  | 'startup_idea_discovery'
  | 'prd_generator'
  | 'landing_page_generator'
  | 'build_prompt_generator';

export type Provider = 'openai' | 'anthropic' | 'openai_compatible';
export type ApiMode = 'browser_key' | 'proxy';

export interface UserSettings {
  provider: Provider;
  apiMode: ApiMode;
  apiKey: string;
  model: string;
  baseUrl: string;
}

export interface OpportunityScore {
  painIntensity: number;
  frequency: number;
  willingnessToPay: number;
  competitionLevel: number;
  aiBuildability: number;
  founderMarketFitNotes: string;
  overall: number;
}

export interface OpportunityReport {
  executiveSummary: string;
  topPainPoints: string[];
  repeatedComplaints: string[];
  buyingIntentSignals: string[];
  dislikedAlternatives: string[];
  opportunityScore: OpportunityScore;
  mvpFeatureList: string[];
  suggestedPricingModel: string;
  landingPageCopy: string;
  seoSuggestions: string[];
  buildPrompt: string;
}
