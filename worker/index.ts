export interface Env {
  OPENAI_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  DEFAULT_OPENAI_MODEL?: string;
  DEFAULT_ANTHROPIC_MODEL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const { provider, model, baseUrl, prompt } = await request.json() as any;

    try {
      if (provider === 'anthropic') {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: model || env.DEFAULT_ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest', max_tokens: 1400, messages: [{ role: 'user', content: prompt }] })
        });
        const data = await r.json() as any;
        return Response.json(JSON.parse(data.content?.[0]?.text ?? '{}'));
      }

      const endpoint = provider === 'openai_compatible' ? `${(baseUrl || 'https://api.openai.com/v1').replace(/\/$/, '')}/chat/completions` : 'https://api.openai.com/v1/chat/completions';
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model: model || env.DEFAULT_OPENAI_MODEL || 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], response_format: { type: 'json_object' } })
      });
      const data = await r.json() as any;
      return Response.json(JSON.parse(data.choices?.[0]?.message?.content ?? '{}'));
    } catch (error) {
      return Response.json({ error: 'Proxy request failed', details: String(error) }, { status: 500 });
    }
  }
};
