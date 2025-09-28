export interface LLMProvider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  enabled: boolean;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  costPer1kTokens?: {
    input: number;
    output: number;
  };
}

export interface LLMRequest {
  prompt: string;
  provider: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  systemPrompt?: string;
}

export interface LLMResponse {
  content: string;
  tokensUsed: {
    input: number;
    output: number;
  };
  cost?: number;
  model: string;
  provider: string;
  timestamp: Date;
}

export interface LLMConfig {
  providers: LLMProvider[];
  defaultProvider: string;
  requestTimeout: number;
  retryAttempts: number;
  costTracking: boolean;
}

export const DEFAULT_PROVIDERS: Omit<LLMProvider, 'apiKey' | 'enabled'>[] = [
  {
    id: 'openai',
    name: 'ChatGPT',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4',
    maxTokens: 4000,
    temperature: 0.7,
    topP: 0.9,
    costPer1kTokens: {
      input: 0.03,
      output: 0.06
    }
  },
  {
    id: 'anthropic',
    name: 'Claude',
    baseUrl: 'https://api.anthropic.com',
    model: 'claude-3-sonnet-20240229',
    maxTokens: 4000,
    temperature: 0.7,
    topP: 0.9,
    costPer1kTokens: {
      input: 0.015,
      output: 0.075
    }
  },
  {
    id: 'zhipu',
    name: 'Z AI',
    baseUrl: 'https://api.z.ai/api/paas/v4/chat/completions',
    model: 'glm-4',
    maxTokens: 4000,
    temperature: 0.7,
    topP: 0.9,
    costPer1kTokens: {
      input: 0.01,
      output: 0.02
    }
  },
  {
    id: 'deepseek',
    name: 'Deepseek',
    baseUrl: 'https://api.deepseek.com',
    model: 'deepseek-chat',
    maxTokens: 4000,
    temperature: 0.7,
    topP: 0.9,
    costPer1kTokens: {
      input: 0.001,
      output: 0.002
    }
  }
];