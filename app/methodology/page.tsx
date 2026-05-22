export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-5">
      <h1 className="text-3xl font-bold">Methodology & Compliance</h1>
      <p>DemandRadar AI analyzes public/community signals and user-provided text or URLs to surface actionable demand opportunities.</p>
      <h2 className="text-xl font-semibold">Scoring logic</h2>
      <p>Opportunity score combines pain intensity, frequency, willingness to pay, competition level, and AI-buildability into a normalized 0–100 score.</p>
      <h2 className="text-xl font-semibold">Limitations</h2>
      <ul className="list-disc pl-5">
        <li>No login-based scraping, CAPTCHA bypassing, or browser automation.</li>
        <li>No resale of raw platform data.</li>
        <li>Keyword mode may use simulated research heuristics unless compliant search APIs are connected.</li>
      </ul>
    </main>
  );
}
