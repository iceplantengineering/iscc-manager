import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Key, Globe, TestTube, Save, Trash2, Bug, Play } from 'lucide-react';
import { LLMProvider, DEFAULT_PROVIDERS } from '@/lib/llm/types';
import { debugLLMService } from '@/lib/llm/debug-service';
import { directAPIService } from '@/lib/llm/direct-api';

interface LLMApiSettingsProps {
  onSave?: (config: LLMProvider[]) => void;
}

export default function LLMApiSettings({ onSave }: LLMApiSettingsProps) {
  const [providers, setProviders] = useState<LLMProvider[]>([]);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});
  const [debugMode, setDebugMode] = useState(false);
  const [debugResults, setDebugResults] = useState<any>(null);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = () => {
    const saved = localStorage.getItem('llm-providers');
    if (saved) {
      let parsedProviders = JSON.parse(saved);

      // Check if Deepseek provider exists and is properly configured
      const deepseekProvider = parsedProviders.find(p => p.id === 'deepseek');
      if (!deepseekProvider || !deepseekProvider.enabled) {
        // Reset Deepseek provider with proper configuration
        parsedProviders = parsedProviders.map(p => {
          if (p.id === 'deepseek') {
            return {
              ...p,
              apiKey: 'sk-4e01224ca2884cb5bfc77fd109900062',
              enabled: true
            };
          }
          return p;
        });

        // If Deepseek provider doesn't exist, add it
        if (!parsedProviders.find(p => p.id === 'deepseek')) {
          const deepseekDefault = DEFAULT_PROVIDERS.find(p => p.id === 'deepseek');
          if (deepseekDefault) {
            parsedProviders.push({
              ...deepseekDefault,
              apiKey: 'sk-4e01224ca2884cb5bfc77fd109900062',
              enabled: true
            });
          }
        }

        // Save the updated providers
        localStorage.setItem('llm-providers', JSON.stringify(parsedProviders));
      }

      setProviders(parsedProviders);
    } else {
      // Initialize with all providers, enabling Deepseek by default
      setProviders(DEFAULT_PROVIDERS.map(p => ({
        ...p,
        apiKey: p.id === 'deepseek' ? 'sk-4e01224ca2884cb5bfc77fd109900062' : '',
        enabled: p.id === 'deepseek'
      })));
    }
  };

  const saveProviders = (updatedProviders: LLMProvider[]) => {
    setProviders(updatedProviders);
    localStorage.setItem('llm-providers', JSON.stringify(updatedProviders));
    onSave?.(updatedProviders);
  };

  const updateProvider = (id: string, updates: Partial<LLMProvider>) => {
    const updated = providers.map(p =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveProviders(updated);
  };

  const testConnection = async (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (!provider || !provider.apiKey) return;

    setTestingProvider(providerId);

    try {
      // For Deepseek, use direct API call
      if (providerId === 'deepseek') {
        const testRequest = {
          provider: provider.id,
          prompt: 'Hello! Please respond with "Connection test successful."',
          maxTokens: 50,
          temperature: 0.1,
        };

        if (debugMode) {
          // Use debug service for detailed analysis
          const debugResult = await debugLLMService.testDeepseekDirectly(provider.apiKey);
          setDebugResults(debugResult);
          setTestResults(prev => ({
            ...prev,
            [providerId]: {
              success: debugResult.success,
              message: debugResult.message
            }
          }));
        } else {
          // Use direct API service
          const directResult = await directAPIService.testConnection(provider);
          setTestResults(prev => ({
            ...prev,
            [providerId]: {
              success: directResult.success,
              message: directResult.message
            }
          }));
        }
      } else {
        // For other providers, try the original endpoint first
        try {
          const response = await fetch('/api/llm/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider })
          });

          if (response.ok) {
            const result = await response.json();
            setTestResults(prev => ({
              ...prev,
              [providerId]: {
                success: result.success,
                message: result.message
              }
            }));
          } else {
            throw new Error('Endpoint not available');
          }
        } catch (endpointError) {
          // Fallback to direct API call for other providers too
          const directResult = await directAPIService.testConnection(provider);
          setTestResults(prev => ({
            ...prev,
            [providerId]: {
              success: directResult.success,
              message: directResult.message
            }
          }));
        }
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setTestResults(prev => ({
        ...prev,
        [providerId]: {
          success: false,
          message: `接続テストに失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }));
    } finally {
      setTestingProvider(null);
    }
  };

  const runDeepseekDebug = async () => {
    let deepseekProvider = providers.find(p => p.id === 'deepseek');

    // If provider doesn't exist or is disabled, reset providers
    if (!deepseekProvider || !deepseekProvider.enabled) {
      const resetProviders = DEFAULT_PROVIDERS.map(p => ({
        ...p,
        apiKey: p.id === 'deepseek' ? 'sk-4e01224ca2884cb5bfc77fd109900062' : '',
        enabled: p.id === 'deepseek'
      }));
      saveProviders(resetProviders);
      deepseekProvider = resetProviders.find(p => p.id === 'deepseek');
    }

    if (!deepseekProvider || !deepseekProvider.apiKey) {
      alert('Deepseek APIキーを入力してください');
      return;
    }

    setDebugMode(true);
    const result = await debugLLMService.testDeepseekDirectly(deepseekProvider.apiKey);
    setDebugResults(result);
  };

  const resetAndEnableDeepseek = () => {
    const resetProviders = DEFAULT_PROVIDERS.map(p => ({
      ...p,
      apiKey: p.id === 'deepseek' ? 'sk-4e01224ca2884cb5bfc77fd109900062' : '',
      enabled: p.id === 'deepseek'
    }));
    saveProviders(resetProviders);
    alert('Deepseekプロバイダーをリセットし、有効にしました。');
  };

  const resetToDefaults = () => {
    const resetProviders = DEFAULT_PROVIDERS.map(p => ({
      ...p,
      apiKey: '',
      enabled: false
    }));
    saveProviders(resetProviders);
    setTestResults({});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">LLM API 設定</h2>
          <p className="text-muted-foreground">
            ChatGPT、Claude、Z AI、DeepseekなどのAIモデルを設定
          </p>
        </div>
        <Button variant="outline" onClick={resetToDefaults}>
          <Trash2 className="w-4 h-4 mr-2" />
          デフォルトに戻す
        </Button>
      </div>

      <Tabs defaultValue="providers" className="w-full">
        <TabsList>
          <TabsTrigger value="providers">プロバイダー設定</TabsTrigger>
          <TabsTrigger value="debug">デバッグ</TabsTrigger>
          <TabsTrigger value="global">全体設定</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          {providers.map((provider) => (
            <Card key={provider.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <Badge variant={provider.enabled ? "default" : "secondary"}>
                      {provider.enabled ? "有効" : "無効"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={provider.enabled}
                      onCheckedChange={(checked) => updateProvider(provider.id, { enabled: checked })}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testConnection(provider.id)}
                      disabled={testingProvider === provider.id || !provider.apiKey}
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      {testingProvider === provider.id ? 'テスト中...' : '接続テスト'}
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {provider.baseUrl}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {testResults[provider.id] && (
                  <Alert className={testResults[provider.id].success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    <AlertDescription className={testResults[provider.id].success ? "text-green-700" : "text-red-700"}>
                      {testResults[provider.id].message}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`api-key-${provider.id}`}>API Key</Label>
                    <Input
                      id={`api-key-${provider.id}`}
                      type="password"
                      placeholder="sk-..."
                      value={provider.apiKey}
                      onChange={(e) => updateProvider(provider.id, { apiKey: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`model-${provider.id}`}>モデル</Label>
                    <Select
                      value={provider.model}
                      onValueChange={(value) => updateProvider(provider.id, { model: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {provider.id === 'openai' && (
                          <>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          </>
                        )}
                        {provider.id === 'anthropic' && (
                          <>
                            <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
                            <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
                            <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                          </>
                        )}
                        {provider.id === 'zhipu' && (
                          <>
                            <SelectItem value="glm-4">GLM-4</SelectItem>
                            <SelectItem value="glm-3-turbo">GLM-3 Turbo</SelectItem>
                          </>
                        )}
                        {provider.id === 'deepseek' && (
                          <>
                            <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
                            <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`max-tokens-${provider.id}`}>最大トークン数</Label>
                    <Input
                      id={`max-tokens-${provider.id}`}
                      type="number"
                      value={provider.maxTokens}
                      onChange={(e) => updateProvider(provider.id, { maxTokens: parseInt(e.target.value) || 4000 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`temperature-${provider.id}`}>Temperature ({provider.temperature})</Label>
                    <Input
                      id={`temperature-${provider.id}`}
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={provider.temperature}
                      onChange={(e) => updateProvider(provider.id, { temperature: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>

                {provider.costPer1kTokens && (
                  <div className="text-sm text-muted-foreground">
                    コスト: ${provider.costPer1kTokens.input}/1k input tokens, ${provider.costPer1kTokens.output}/1k output tokens
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="debug" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bug className="w-5 h-5" />
                <span>Deepseek API デバッグ</span>
              </CardTitle>
              <CardDescription>
                Deepseek APIの接続問題をデバッグします
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="debug-mode"
                  checked={debugMode}
                  onCheckedChange={setDebugMode}
                />
                <Label htmlFor="debug-mode">デバッグモードを有効にする</Label>
              </div>

              <div className="space-y-2">
                <Button onClick={runDeepseekDebug} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Deepseek API デバッグテスト
                </Button>
                <Button onClick={resetAndEnableDeepseek} variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Deepseekプロバイダーをリセット
                </Button>
              </div>

              {debugResults && (
                <div className="space-y-2">
                  <Label>デバッグ結果:</Label>
                  <Alert className={debugResults.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    <AlertDescription className={debugResults.success ? "text-green-700" : "text-red-700"}>
                      <div className="font-medium">{debugResults.message}</div>
                      {debugResults.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm">詳細情報</summary>
                          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                            {JSON.stringify(debugResults.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <p>💡 デバッグヒント:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>CORSエラーが発生する場合、サーバーサイドプロキシが必要です</li>
                  <li>APIキーの形式を確認してください（通常は "sk-" で始まります）</li>
                  <li>ネットワーク接続とファイアウォールを確認してください</li>
                  <li>DeepseekのAPIエンドポイントが変更されている可能性があります</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>グローバル設定</CardTitle>
              <CardDescription>
                LLM連携に関する全体的な設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="request-timeout">リクエストタイムアウト (秒)</Label>
                  <Input
                    id="request-timeout"
                    type="number"
                    defaultValue="30"
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retry-attempts">リトライ回数</Label>
                  <Input
                    id="retry-attempts"
                    type="number"
                    defaultValue="3"
                    placeholder="3"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="cost-tracking" defaultChecked />
                <Label htmlFor="cost-tracking">コスト追跡を有効にする</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="usage-analytics" defaultChecked />
                <Label htmlFor="usage-analytics">使用状況分析を有効にする</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={() => onSave?.(providers)}>
          <Save className="w-4 h-4 mr-2" />
          設定を保存
        </Button>
      </div>
    </div>
  );
}