import { OpportunityScore } from '@/lib/types';

export function computeOpportunityScore(raw: {
  topPainPoints: string[];
  repeatedComplaints: string[];
  buyingIntentSignals: string[];
  dislikedAlternatives: string[];
  founderMarketFitNotes: string;
}): OpportunityScore {
  const painIntensity = Math.min(10, Math.max(4, raw.topPainPoints.length + 4));
  const frequency = Math.min(10, Math.max(4, raw.repeatedComplaints.length + 3));
  const willingnessToPay = Math.min(10, Math.max(4, raw.buyingIntentSignals.length + 3));
  const competitionLevel = Math.min(10, Math.max(3, 10 - raw.dislikedAlternatives.length));
  const aiBuildability = 8;
  const overall = Math.round((painIntensity + frequency + willingnessToPay + competitionLevel + aiBuildability) * 2);
  return { painIntensity, frequency, willingnessToPay, competitionLevel, aiBuildability, founderMarketFitNotes: raw.founderMarketFitNotes, overall };
}
