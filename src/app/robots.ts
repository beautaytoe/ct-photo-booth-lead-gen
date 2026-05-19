import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-data';

/**
 * AI / LLM crawlers we explicitly want to allow.
 *
 * Each of these is documented as a current user-agent string used by an
 * AI assistant, AI training pipeline, or AI-powered search product. We
 * want our content to be discoverable in AI answers, so we explicitly
 * allow them rather than relying on the default "*" rule (some bots
 * check for their UA name in robots.txt and treat absence as ambiguous).
 *
 * Sources for current bot names:
 *   - OpenAI:      https://platform.openai.com/docs/bots
 *   - Anthropic:   https://support.anthropic.com/en/articles/8896518
 *   - Google AI:   https://developers.google.com/search/docs/crawling-indexing/google-extended
 *   - Perplexity:  https://docs.perplexity.ai/guides/bots
 *   - Apple:       https://support.apple.com/en-us/119829
 *   - Meta:        https://developers.facebook.com/docs/sharing/bot
 *   - Common Crawl: https://commoncrawl.org/ccbot
 *   - DuckDuckGo:  https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot
 */
const AI_BOTS = [
  // OpenAI — training, search, and user-initiated fetches
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  // Anthropic
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  // Google AI (Bard / Gemini training)
  'Google-Extended',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Apple Intelligence
  'Applebot-Extended',
  // Meta AI
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  // ByteDance / TikTok AI
  'Bytespider',
  // Common Crawl — foundational for many open-source models
  'CCBot',
  // DuckDuckGo AI Assist
  'DuckAssistBot',
  // Cohere
  'cohere-ai',
  // You.com
  'YouBot',
  // Diffbot
  'Diffbot',
];

export default function robots(): MetadataRoute.Robots {
  // Standard rule for everything else (default search engines + unknown bots)
  const baseRule = {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/', '/privacy/', '/terms/'],
  };

  // Explicit per-bot rules so AI bots see their name in robots.txt.
  // Some crawlers (notably GPTBot historically) treat the absence of
  // their UA in robots.txt differently than a wildcard rule. Listing
  // them by name is the safest opt-in.
  const aiRules = AI_BOTS.map((userAgent) => ({
    userAgent,
    allow: '/',
    disallow: ['/api/', '/privacy/', '/terms/'],
  }));

  return {
    rules: [baseRule, ...aiRules],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  };
}
