import { env, assertClaudeKey } from '@/api/config';
import type { ClaudeMessage, ClaudeResponse } from './types';

/**
 * ⚠️ 보안 경고
 * MVP 1차에서는 학습 편의상 클라이언트에서 Claude API를 직접 호출합니다.
 * 프로덕션에서는 반드시 자체 백엔드 프록시를 경유하세요.
 * 빌드된 번들에 API 키가 포함되면 디컴파일/스니핑으로 노출됩니다.
 */
const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

export interface CallClaudeParams {
  system: string;
  messages: ClaudeMessage[];
  maxTokens?: number;
}

export async function callClaude({
  system,
  messages,
  maxTokens,
}: CallClaudeParams): Promise<{ text: string; usage: ClaudeResponse['usage'] }> {
  assertClaudeKey();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': env.claude.apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: env.claude.model,
      max_tokens: maxTokens ?? env.claude.maxTokens,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Claude API ${res.status}: ${errBody}`);
  }

  const json = (await res.json()) as ClaudeResponse;
  const textBlock = json.content.find((b) => b.type === 'text');
  if (!textBlock) {
    throw new Error('Claude response has no text content block');
  }

  return { text: textBlock.text, usage: json.usage };
}
