import { LLMProvider, LLMRequest, LLMResponse } from './types';

export class DirectAPIService {
  async callDeepseekDirectly(provider: LLMProvider, request: LLMRequest): Promise<LLMResponse> {
    try {
      console.log('Direct Deepseek API call...');
      console.log('Provider:', provider.name);
      console.log('Model:', request.model || provider.model);

      const requestBody = {
        model: request.model || provider.model,
        messages: [
          ...(request.systemPrompt ? [{ role: 'system', content: request.systemPrompt }] : []),
          { role: 'user', content: request.prompt }
        ],
        max_tokens: request.maxTokens || provider.maxTokens || 1000,
        temperature: request.temperature ?? provider.temperature ?? 0.7,
        stream: false
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      // Deepseek API直接呼び出し
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${provider.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Deepseek API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const content = data.choices[0]?.message?.content || '';
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 };

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
    } catch (error) {
      console.error('Direct API call failed:', error);
      throw error;
    }
  }

  async testConnection(provider: LLMProvider): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      console.log('Testing direct connection to:', provider.name);

      const testRequest: LLMRequest = {
        provider: provider.id,
        prompt: 'Hello! Please respond with "Connection test successful."',
        maxTokens: 50,
        temperature: 0.1,
      };

      const response = await this.callDeepseekDirectly(provider, testRequest);

      return {
        success: true,
        message: `Direct connection successful! Response: "${response.content.substring(0, 100)}..." (${response.tokensUsed.input + response.tokensUsed.output} tokens used)`,
        details: {
          response: response.content,
          tokensUsed: response.tokensUsed,
          model: response.model,
        }
      };
    } catch (error) {
      console.error('Connection test failed:', error);
      return {
        success: false,
        message: `Direct connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: error
      };
    }
  }

  private calculateCost(provider: LLMProvider, inputTokens: number, outputTokens: number): number {
    if (!provider.costPer1kTokens) return 0;

    const inputCost = (inputTokens / 1000) * provider.costPer1kTokens.input;
    const outputCost = (outputTokens / 1000) * provider.costPer1kTokens.output;

    return inputCost + outputCost;
  }

  // CORSを回避するためのサーバーレス関数呼び出し
  async callViaSupabase(provider: LLMProvider, request: LLMRequest): Promise<LLMResponse> {
    try {
      // Supabase Edge Functionsを呼び出し
      const response = await fetch('https://your-project.supabase.co/functions/v1/llm-proxy', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${provider.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          request
        }),
      });

      if (!response.ok) {
        throw new Error(`Supabase function error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Supabase proxy failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const directAPIService = new DirectAPIService();