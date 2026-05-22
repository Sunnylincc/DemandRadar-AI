# DemandRadar AI

DemandRadar AI is a production-ready MVP for compliant demand discovery. It helps founders, indie hackers, PMs, and investors transform public discussion signals into startup opportunities, PRDs, landing page copy, and build prompts.

## What it does
- Accepts keyword, category, competitor, public URL, or pasted text input.
- Runs analysis modes: pain mining, complaint analysis, startup ideas, PRD generation, landing page generation, and build prompt generation.
- Produces structured opportunity reports with scorecards, pricing guidance, SEO ideas, and build prompts.
- Supports both browser key mode and proxy mode.
- Stores settings/history in localStorage (no DB required).

## What it does NOT do
- No aggressive crawling.
- No login-based scraping.
- No CAPTCHA bypassing.
- No browser automation scraping.
- No resale of raw platform data.

## Tech stack
- Next.js + TypeScript + Tailwind CSS
- Static-first frontend architecture
- Optional Cloudflare Worker proxy

## Project structure
- `app/`
- `components/`
- `lib/ai/`
- `lib/scoring/`
- `lib/prompts/`
- `worker/`
- `public/`
- `.env.example`
- `wrangler.toml.example`

## Local setup
```bash
npm install
npm run dev
```

Build static assets:
```bash
npm run build
```

## API provider modes
### Mode A: User-provided API key (demo/personal)
In Settings Panel:
- Select provider (`OpenAI`, `Anthropic Claude`, `OpenAI-compatible endpoint`)
- Paste API key
- Set model
- Set base URL for OpenAI-compatible providers

Security warning: browser-side keys are for personal/demo use only.

### Mode B: Proxy mode (recommended production)
Frontend calls `/api/analyze`, backed by Cloudflare Worker.

Set Worker secrets:
```bash
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
```

## Deploy static frontend
- Deploy `out/` to Cloudflare Pages, Vercel static, or Netlify.
- For Cloudflare Pages, run build command `npm run build` and publish directory `out`.

## Deploy Cloudflare Worker proxy
```bash
cd worker
wrangler deploy
```

Use `wrangler.toml.example` as template.

## Environment variables
Use `.env.example` as the canonical template. Never commit real keys.

## Example use cases
- Find underserved pain points in creator accounting tools.
- Generate MVP feature list from competitor complaints.
- Turn forum conversation into landing page copy and build prompt.

## Example inputs
- `"customer onboarding automation complaints"`
- `"notion alternatives for agencies"`
- `"https://example.com/public-discussion-thread"`
- Pasted user interview transcripts

## Future roadmap
- Compliant search API integration for live signal gathering.
- Saved projects/workspaces.
- Side-by-side competitor opportunity maps.
- Team collaboration and report sharing.
