import { LLMProvider, LLMRequest, LLMResponse } from './types';

export class DebugLLMService {
  async testDeepseekDirectly(apiKey: string): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      console.log('Testing Deepseek API directly...');
      console.log('API Key length:', apiKey.length);
      console.log('API Key prefix:', apiKey.substring(0, 8));

      const testRequest = {
        model: "deepseek-chat",
        messages: [
          { role: "user", content: "Hello! Please respond with 'Connection test successful.'" }
        ],
        max_tokens: 50,
        temperature: 0.1
      };

      console.log('Request payload:', JSON.stringify(testRequest, null, 2));

      // Try different possible endpoints
      const endpoints = [
        'https://api.deepseek.com/v1/chat/completions',
        'https://api.deepseek.com/chat/completions'
      ];

      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(testRequest),
          });

          console.log('Response status:', response.status);
          console.log('Response headers:', Object.fromEntries(response.headers.entries()));

          if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data);

            return {
              success: true,
              message: `Deepseek API connection successful! Endpoint: ${endpoint}`,
              details: {
                endpoint,
                status: response.status,
                response: data
              }
            };
          } else {
            const errorText = await response.text();
            console.log('Error response:', errorText);

            return {
              success: false,
              message: `Deepseek API failed with status ${response.status}: ${errorText}`,
              details: {
                endpoint,
                status: response.status,
                error: errorText
              }
            };
          }
        } catch (endpointError) {
          console.log(`Endpoint ${endpoint} failed:`, endpointError);
          // Continue to next endpoint
        }
      }

      return {
        success: false,
        message: 'All Deepseek API endpoints failed',
        details: 'No working endpoint found'
      };

    } catch (error) {
      console.error('Deepseek API test failed:', error);
      return {
        success: false,
        message: `Deepseek API test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: error
      };
    }
  }

  async testWithProxy(apiKey: string): Promise<{ success: boolean; message: string }> {
    try {
      // Test using the Supabase edge function as a proxy
      const response = await fetch('/api/llm/test-deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          test: true
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: result.success,
          message: result.message
        };
      } else {
        const error = await response.text();
        return {
          success: false,
          message: `Proxy test failed: ${error}`
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Proxy test error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  generateTestResponse(): LLMResponse {
    return {
      content: "This is a test response from the debug service. The LLM integration is working, but the actual API connection needs to be configured.",
      tokensUsed: {
        input: 25,
        output: 20
      },
      cost: 0.001,
      model: "test-model",
      provider: "debug",
      timestamp: new Date()
    };
  }
}

export const debugLLMService = new DebugLLMService();