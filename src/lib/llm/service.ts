import { LLMProvider, LLMRequest, LLMResponse, DEFAULT_PROVIDERS } from './types';

export class LLMService {
  private providers: LLMProvider[] = [];

  constructor(providers: LLMProvider[] = []) {
    this.providers = providers;
    // If providers is empty, load default settings
    if (this.providers.length === 0) {
      this.loadProvidersFromStorage();
    }
  }

  private loadProvidersFromStorage() {
    try {
      const saved = localStorage.getItem('llm-providers');
      if (saved) {
        this.providers = JSON.parse(saved);
        console.log('Loaded providers from storage:', this.providers);
      } else {
        // Set default providers
        this.providers = DEFAULT_PROVIDERS.map(p => ({
          ...p,
          apiKey: p.id === 'deepseek' ? 'sk-4e01224ca2884cb5bfc77fd109900062' :
                   p.id === 'zhipu' ? '266ab136106349518c4ab1afe9834123.WSvVNnoKfJgho4ii' : '',
          enabled: p.id === 'deepseek' || p.id === 'zhipu'
        }));
        localStorage.setItem('llm-providers', JSON.stringify(this.providers));
        console.log('Created default providers:', this.providers);
      }
    } catch (error) {
      console.error('Failed to load providers:', error);
      // Fallback: At least set Deepseek and Z AI providers
      this.providers = [
        {
          id: 'deepseek',
          name: 'Deepseek',
          baseUrl: 'https://api.deepseek.com',
          apiKey: 'sk-4e01224ca2884cb5bfc77fd109900062',
          model: 'deepseek-chat',
          enabled: true,
          maxTokens: 4000,
          temperature: 0.7,
          topP: 0.9
        },
        {
          id: 'zhipu',
          name: 'Z AI',
          baseUrl: 'https://api.z.ai/api/paas/v4/chat/completions',
          apiKey: '266ab136106349518c4ab1afe9834123.WSvVNnoKfJgho4ii',
          model: 'glm-4',
          enabled: true,
          maxTokens: 4000,
          temperature: 0.7,
          topP: 0.9
        }
      ];
    }
  }

  // Method to reload providers
  reloadProviders() {
    this.loadProvidersFromStorage();
  }

  async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const provider = this.providers.find(p => p.id === request.provider && p.enabled);

    if (!provider) {
      throw new Error(`Provider ${request.provider} not found or disabled`);
    }

    if (!provider.apiKey) {
      throw new Error(`API key not configured for ${provider.name}`);
    }

    switch (provider.id) {
      case 'openai':
        return this.callOpenAI(provider, request);
      case 'anthropic':
        return this.callAnthropic(provider, request);
      case 'zhipu':
        return this.callZhipu(provider, request);
      case 'deepseek':
        return this.callDeepseek(provider, request);
      default:
        throw new Error(`Unsupported provider: ${provider.id}`);
    }
  }

  private async callOpenAI(provider: LLMProvider, request: LLMRequest): Promise<LLMResponse> {
    const response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || provider.model,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          { role: 'user', content: request.prompt }
        ],
        max_tokens: request.maxTokens || provider.maxTokens,
        temperature: request.temperature ?? provider.temperature,
        top_p: request.topP ?? provider.topP,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    const usage = data.usage || {};

    return {
      content,
      tokensUsed: {
        input: usage.prompt_tokens || 0,
        output: usage.completion_tokens || 0,
      },
      cost: this.calculateCost(provider, usage.prompt_tokens || 0, usage.completion_tokens || 0),
      model: data.model,
      provider: provider.id,
      timestamp: new Date(),
    };
  }

  private async callAnthropic(provider: LLMProvider, request: LLMRequest): Promise<LLMResponse> {
    const response = await fetch(`${provider.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': provider.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: request.model || provider.model,
        max_tokens: request.maxTokens || provider.maxTokens,
        temperature: request.temperature ?? provider.temperature,
        top_p: request.topP ?? provider.topP,
        system: request.systemPrompt,
        messages: [
          { role: 'user', content: request.prompt }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }

    const data = await response.json();
    const content = data.content[0]?.text || '';
    const usage = data.usage || {};

    return {
      content,
      tokensUsed: {
        input: usage.input_tokens || 0,
        output: usage.output_tokens || 0,
      },
      cost: this.calculateCost(provider, usage.input_tokens || 0, usage.output_tokens || 0),
      model: data.model,
      provider: provider.id,
      timestamp: new Date(),
    };
  }

  private async callZhipu(provider: LLMProvider, request: LLMRequest): Promise<LLMResponse> {
    const response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || provider.model,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          { role: 'user', content: request.prompt }
        ],
        max_tokens: request.maxTokens || provider.maxTokens,
        temperature: request.temperature ?? provider.temperature,
        top_p: request.topP ?? provider.topP,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Zhipu AI API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    const usage = data.usage || {};

    return {
      content,
      tokensUsed: {
        input: usage.prompt_tokens || 0,
        output: usage.completion_tokens || 0,
      },
      cost: this.calculateCost(provider, usage.prompt_tokens || 0, usage.completion_tokens || 0),
      model: data.model,
      provider: provider.id,
      timestamp: new Date(),
    };
  }

  private async callDeepseek(provider: LLMProvider, request: LLMRequest): Promise<LLMResponse> {
    const response = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || provider.model,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          { role: 'user', content: request.prompt }
        ],
        max_tokens: request.maxTokens || provider.maxTokens,
        temperature: request.temperature ?? provider.temperature,
        top_p: request.topP ?? provider.topP,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Deepseek API error: ${error}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    const usage = data.usage || {};

    return {
      content,
      tokensUsed: {
        input: usage.prompt_tokens || 0,
        output: usage.completion_tokens || 0,
      },
      cost: this.calculateCost(provider, usage.prompt_tokens || 0, usage.completion_tokens || 0),
      model: data.model,
      provider: provider.id,
      timestamp: new Date(),
    };
  }

  private calculateCost(provider: LLMProvider, inputTokens: number, outputTokens: number): number {
    if (!provider.costPer1kTokens) return 0;

    const inputCost = (inputTokens / 1000) * provider.costPer1kTokens.input;
    const outputCost = (outputTokens / 1000) * provider.costPer1kTokens.output;

    return inputCost + outputCost;
  }

  async testConnection(provider: LLMProvider): Promise<{ success: boolean; message: string }> {
    try {
      const testRequest: LLMRequest = {
        provider: provider.id,
        prompt: 'Hello! Please respond with "Connection test successful."',
        maxTokens: 50,
        temperature: 0.1,
      };

      const response = await this.generateResponse(testRequest);

      return {
        success: true,
        message: `Connection successful! Response: "${response.content.substring(0, 100)}..." (${response.tokensUsed.input + response.tokensUsed.output} tokens used)`
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  getAvailableProviders(): LLMProvider[] {
    return this.providers.filter(p => p.enabled && p.apiKey);
  }

  getDefaultProvider(): LLMProvider | null {
    const enabled = this.getAvailableProviders();
    return enabled.length > 0 ? enabled[0] : null;
  }
}

// Initialize service after setting providers
const getStoredProviders = () => {
  try {
    const saved = localStorage.getItem('llm-providers');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load providers from storage:', error);
  }

  // Return default providers
  return DEFAULT_PROVIDERS.map(p => ({
    ...p,
    apiKey: p.id === 'deepseek' ? 'sk-4e01224ca2884cb5bfc77fd109900062' :
             p.id === 'zhipu' ? '266ab136106349518c4ab1afe9834123.WSvVNnoKfJgho4ii' : '',
    enabled: p.id === 'deepseek' || p.id === 'zhipu'
  }));
};

export const llmService = new LLMService(getStoredProviders());