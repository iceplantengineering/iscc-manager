import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calculator,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb
} from 'lucide-react';
import { aiEnhancedCreditCalculator, CreditInputData, CreditCalculationResult } from '@/lib/credit/ai-enhanced-calculator';

interface AICreditCalculatorProps {
  initialData?: Partial<CreditInputData>;
}

export default function AICreditCalculator({ initialData }: AICreditCalculatorProps) {
  const [useAI, setUseAI] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CreditCalculationResult | null>(null);
  const [predictionData, setPredictionData] = useState<any>(null);
  const [formData, setFormData] = useState<CreditInputData>({
    anInput: 5000,
    panProduction: 4100,
    cfProduction: 2665,
    panShipments: [],
    cfShipments: [],
    supplierData: [
      { name: 'サプライヤーA', bmPercentage: 95, reliability: 92 },
      { name: 'サプライヤーB', bmPercentage: 92, reliability: 88 },
      { name: 'サプライヤーC', bmPercentage: 88, reliability: 85 },
    ],
    plantData: [
      { id: 'plant-1', name: 'プラント1', efficiency: 87, conversionRate: 0.82 },
      { id: 'plant-2', name: 'プラント2', efficiency: 89, conversionRate: 0.84 },
    ],
    timePeriod: {
      start: new Date().toISOString().split('T')[0],
      end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    ...initialData,
  });

  const handleInputChange = (field: keyof CreditInputData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateCredits = async () => {
    setIsCalculating(true);
    try {
      const calculationResult = await aiEnhancedCreditCalculator.calculateCredits(formData, useAI);
      setResult(calculationResult);

      // 習熟度データを生成
      const historicalData = [formData, { ...formData, anInput: formData.anInput * 0.9, panProduction: formData.panProduction * 0.88 }];
      const prediction = await aiEnhancedCreditCalculator.predictFutureCredits(
        historicalData,
        {
          start: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        }
      );
      setPredictionData(prediction);
    } catch (error) {
      console.error('計算に失敗しました:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const exportResults = () => {
    if (!result) return;

    const logData = aiEnhancedCreditCalculator.exportCalculationLog(result);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credit-calculation-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  useEffect(() => {
    calculateCredits();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AIクレジット計算機</h2>
          <p className="text-muted-foreground">
            AI分析による高度なクレジット計算と最適化提案
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="ai-mode"
            checked={useAI}
            onCheckedChange={setUseAI}
          />
          <Label htmlFor="ai-mode" className="flex items-center space-x-1">
            <Brain className="w-4 h-4" />
            <span>AIモード</span>
          </Label>
        </div>
      </div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList>
          <TabsTrigger value="input">入力データ</TabsTrigger>
          <TabsTrigger value="results">計算結果</TabsTrigger>
          <TabsTrigger value="insights">AI分析</TabsTrigger>
          <TabsTrigger value="optimization">最適化</TabsTrigger>
          <TabsTrigger value="prediction">予測</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">生産データ</CardTitle>
                <CardDescription>原材料投入と製品生産の実績データ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="an-input">AN投入量 (kg)</Label>
                  <Input
                    id="an-input"
                    type="number"
                    value={formData.anInput}
                    onChange={(e) => handleInputChange('anInput', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pan-production">PAN生産量 (kg)</Label>
                  <Input
                    id="pan-production"
                    type="number"
                    value={formData.panProduction}
                    onChange={(e) => handleInputChange('panProduction', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cf-production">CF生産量 (kg)</Label>
                  <Input
                    id="cf-production"
                    type="number"
                    value={formData.cfProduction}
                    onChange={(e) => handleInputChange('cfProduction', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <Button onClick={calculateCredits} disabled={isCalculating} className="w-full">
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      計算中...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      クレジット計算
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">サプライヤー・プラントデータ</CardTitle>
                <CardDescription>サプライヤーとプラントのパフォーマンスデータ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>サプライヤーデータ</Label>
                  {formData.supplierData.map((supplier, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="サプライヤー名"
                        value={supplier.name}
                        onChange={(e) => {
                          const newSuppliers = [...formData.supplierData];
                          newSuppliers[index].name = e.target.value;
                          handleInputChange('supplierData', newSuppliers);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="BM%"
                        value={supplier.bmPercentage}
                        onChange={(e) => {
                          const newSuppliers = [...formData.supplierData];
                          newSuppliers[index].bmPercentage = parseFloat(e.target.value) || 0;
                          handleInputChange('supplierData', newSuppliers);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="信頼性%"
                        value={supplier.reliability}
                        onChange={(e) => {
                          const newSuppliers = [...formData.supplierData];
                          newSuppliers[index].reliability = parseFloat(e.target.value) || 0;
                          handleInputChange('supplierData', newSuppliers);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label>プラントデータ</Label>
                  {formData.plantData.map((plant, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="プラント名"
                        value={plant.name}
                        onChange={(e) => {
                          const newPlants = [...formData.plantData];
                          newPlants[index].name = e.target.value;
                          handleInputChange('plantData', newPlants);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="効率%"
                        value={plant.efficiency}
                        onChange={(e) => {
                          const newPlants = [...formData.plantData];
                          newPlants[index].efficiency = parseFloat(e.target.value) || 0;
                          handleInputChange('plantData', newPlants);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="変換率"
                        value={plant.conversionRate}
                        onChange={(e) => {
                          const newPlants = [...formData.plantData];
                          newPlants[index].conversionRate = parseFloat(e.target.value) || 0;
                          handleInputChange('plantData', newPlants);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {result ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>クレジット概要</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>ANクレジット</span>
                      <span className="font-semibold">{result.anCredits.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PANクレジット</span>
                      <span className="font-semibold">{result.panCredits.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CFクレジット</span>
                      <span className="font-semibold">{result.cfCredits.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>総クレジット</span>
                        <span>{result.totalCredits.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>使用済み</span>
                      <span className="text-red-600">-{result.creditsUsed.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>利用可能</span>
                      <span className="text-green-600">{result.availableCredits.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span>信頼度</span>
                      <span className={getConfidenceColor(result.metadata.confidence)}>
                        {(result.metadata.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>計算詳細</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>換算係数</Label>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>AN → PAN</span>
                          <span>{(result.conversionFactors.anToPan * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PAN → CF</span>
                          <span>{(result.conversionFactors.panToCf * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>AN → CF</span>
                          <span>{(result.conversionFactors.anToCf * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>計算式</Label>
                      <div className="space-y-1 text-xs">
                        <div className="bg-gray-50 p-2 rounded">
                          {result.calculations.anCreditCalculation}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          {result.calculations.panCreditCalculation}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          {result.calculations.cfCreditCalculation}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={exportResults} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      結果をエクスポート
                    </Button>
                    <Button onClick={calculateCredits} disabled={isCalculating} className="flex-1">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      再計算
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Calculator className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  計算を実行すると結果が表示されます
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          {result && (result.anomalies.length > 0 || result.aiInsights.summary) ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>検出された異常</span>
                    <Badge variant="outline">{result.anomalies.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.anomalies.length > 0 ? (
                    <div className="space-y-3">
                      {result.anomalies.map((anomaly, index) => (
                        <Alert key={index} className={anomaly.severity === 'high' ? 'border-red-200 bg-red-50' : ''}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <div className="font-medium">{anomaly.description}</div>
                            <div className="text-sm mt-1">{anomaly.recommendation}</div>
                            <Badge variant={getSeverityColor(anomaly.severity)} className="mt-2">
                              {anomaly.severity}
                            </Badge>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
                      <p className="text-sm text-muted-foreground">
                        異常は検出されませんでした
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>AIインサイト</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.aiInsights.summary && (
                    <div>
                      <Label>サマリー</Label>
                      <p className="text-sm mt-1">{result.aiInsights.summary}</p>
                    </div>
                  )}

                  {result.aiInsights.keyFindings.length > 0 && (
                    <div>
                      <Label>主要な発見</Label>
                      <ul className="mt-2 space-y-1">
                        {result.aiInsights.keyFindings.map((finding, index) => (
                          <li key={index} className="text-sm flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.aiInsights.recommendations.length > 0 && (
                    <div>
                      <Label>推奨事項</Label>
                      <ul className="mt-2 space-y-1">
                        {result.aiInsights.recommendations.map((recommendation, index) => (
                          <li key={index} className="text-sm flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  AIモードで計算を実行すると分析結果が表示されます
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          {result && result.optimizations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>最適化機会</span>
                    <Badge variant="outline">{result.optimizations.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.optimizations.map((optimization, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{optimization.area}</h4>
                          <Badge variant="secondary">+{optimization.improvement.toFixed(1)}%</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>現在</span>
                            <span>{optimization.current}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>潜在</span>
                            <span className="text-green-600">{optimization.potential}</span>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                          {optimization.action}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">最適化影響予測</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        +{result.optimizations.reduce((sum, opt) => sum + opt.improvement, 0).toFixed(1)}%
                      </div>
                      <p className="text-sm text-muted-foreground">潜在的整体改善率</p>
                    </div>

                    <div className="space-y-2">
                      {result.optimizations.map((optimization, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{optimization.area}</span>
                            <span>+{optimization.improvement.toFixed(1)}%</span>
                          </div>
                          <Progress value={optimization.improvement} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        最適化により、年間約{(result.totalCredits * 0.12).toFixed(0)}クレジットの増加が見込まれます
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  詳細な最適化提案はAIモードで利用可能です
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prediction" className="space-y-4">
          {predictionData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>将来予測</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {predictionData.predictedCredits.toFixed(0)}
                    </div>
                    <p className="text-sm text-muted-foreground">予測クレジット生成量</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>予測信頼度</span>
                      <span className={getConfidenceColor(predictionData.confidence)}>
                        {(predictionData.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={predictionData.confidence * 100} className="h-2" />
                  </div>

                  <div>
                    <Label className="text-sm">影響要因</Label>
                    <div className="mt-2 space-y-2">
                      {predictionData.factors.map((factor: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{factor.factor}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={factor.weight * 100} className="h-2 w-16" />
                            <Badge
                              variant={factor.impact === 'positive' ? 'default' : factor.impact === 'negative' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {factor.impact}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">予測分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-semibold text-green-600">
                          +{(predictionData.predictedCredits * 0.08).toFixed(0)}
                        </div>
                        <p className="text-xs text-muted-foreground">予測増加量</p>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-blue-600">
                          +8.2%
                        </div>
                        <p className="text-xs text-muted-foreground">成長率</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>設備投資の効果が期待できる</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>サプライヤー品質の改善傾向</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span>季節変動による変動に注意</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        予測は過去データとAI分析に基づいています。実際の結果は異なる場合があります。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Activity className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  予測データは計算完了後に表示されます
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}