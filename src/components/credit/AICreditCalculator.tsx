import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  const [hasCalculated, setHasCalculated] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const autoRecalcInitialized = useRef(false);
  const [formData, setFormData] = useState<CreditInputData>({
    anInput: 5000,
    panProduction: 4100,
    cfProduction: 2665,
    panShipments: [],
    cfShipments: [],
    supplierData: [
      { name: 'Supplier A', bmPercentage: 95, reliability: 92 },
      { name: 'Supplier B', bmPercentage: 92, reliability: 88 },
      { name: 'Supplier C', bmPercentage: 88, reliability: 85 },
    ],
    plantData: [
      { id: 'plant-1', name: 'Plant 1', efficiency: 87, conversionRate: 0.82 },
      { id: 'plant-2', name: 'Plant 2', efficiency: 89, conversionRate: 0.84 },
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
    if (validationError) {
      setValidationError(null);
    }
  };

  const isProductionDataValid = useMemo(() => {
    return formData.anInput > 0 && formData.panProduction > 0 && formData.cfProduction > 0;
  }, [formData]);

  const calculateCredits = useCallback(async () => {
    if (!isProductionDataValid) {
      setValidationError('Production data must be provided before calculation.');
      return;
    }

    setIsCalculating(true);
    try {
      setValidationError(null);
      setPredictionData(null);
      const calculationResult = await aiEnhancedCreditCalculator.calculateCredits(formData, useAI);
      setResult(calculationResult);

      // Generate historical data
      const historicalData = [formData, { ...formData, anInput: formData.anInput * 0.9, panProduction: formData.panProduction * 0.88 }];
      const prediction = await aiEnhancedCreditCalculator.predictFutureCredits(
        historicalData,
        {
          start: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        }
      );
      setPredictionData(prediction);
      setHasCalculated(true);
    } catch (error) {
      console.error('Calculation failed:', error);
    } finally {
      setIsCalculating(false);
    }
  }, [formData, useAI, isProductionDataValid]);

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

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return severity;
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'positive': return 'Positive';
      case 'negative': return 'Negative';
      case 'neutral': return 'Neutral';
      default: return impact;
    }
  };

  // Also recalculate when form data changes and AI mode is enabled
  useEffect(() => {
    if (!hasCalculated || !useAI) {
      autoRecalcInitialized.current = false;
      return;
    }

    if (!autoRecalcInitialized.current) {
      autoRecalcInitialized.current = true;
      return;
    }

    const timeoutId = setTimeout(() => {
      calculateCredits();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData, useAI, hasCalculated, calculateCredits]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Credit Calculator</h2>
          <p className="text-muted-foreground">
            Advanced credit calculation and optimization with AI analysis
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
            <span>AI Mode</span>
          </Label>
        </div>
      </div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList>
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="results">Calculation Results</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Production Data</CardTitle>
                <CardDescription>Raw material input and production performance data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="an-input">AN Input (kg)</Label>
                  <Input
                    id="an-input"
                    type="number"
                    value={formData.anInput}
                    onChange={(e) => handleInputChange('anInput', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pan-production">PAN Production (kg)</Label>
                  <Input
                    id="pan-production"
                    type="number"
                    value={formData.panProduction}
                    onChange={(e) => handleInputChange('panProduction', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cf-production">CF Production (kg)</Label>
                  <Input
                    id="cf-production"
                    type="number"
                    value={formData.cfProduction}
                    onChange={(e) => handleInputChange('cfProduction', parseFloat(e.target.value) || 0)}
                  />
                </div>

                {validationError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{validationError}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={calculateCredits}
                  disabled={isCalculating || !isProductionDataValid}
                  className="w-full"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Credits
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supplier & Plant Data</CardTitle>
                <CardDescription>Supplier and plant performance data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Supplier Data</Label>
                  {formData.supplierData.map((supplier, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3">
                      <Input
                        placeholder="Supplier name"
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
                        placeholder="Reliability%"
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
                  <Label>Plant Data</Label>
                  {formData.plantData.map((plant, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3">
                      <Input
                        placeholder="Plant name"
                        value={plant.name}
                        onChange={(e) => {
                          const newPlants = [...formData.plantData];
                          newPlants[index].name = e.target.value;
                          handleInputChange('plantData', newPlants);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Efficiency%"
                        value={plant.efficiency}
                        onChange={(e) => {
                          const newPlants = [...formData.plantData];
                          newPlants[index].efficiency = parseFloat(e.target.value) || 0;
                          handleInputChange('plantData', newPlants);
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Conversion rate"
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <PieChart className="w-5 h-5" />
                      <span>Credit Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>AN Credits</span>
                        <span className="font-semibold">{result.anCredits.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PAN Credits</span>
                        <span className="font-semibold">{result.panCredits.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CF Credits</span>
                        <span className="font-semibold">{result.cfCredits.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Credits</span>
                          <span>{result.totalCredits.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Used</span>
                        <span className="text-red-600">-{result.creditsUsed.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Available</span>
                        <span className="text-green-600">{result.availableCredits.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
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
                      <span>Calculation Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Conversion Factors</Label>
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
                        <Label>Calculations</Label>
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
                        Export Results
                      </Button>
                      <Button
                        onClick={calculateCredits}
                        disabled={isCalculating || !isProductionDataValid}
                        className="flex-1"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Recalculate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Detected Anomalies</span>
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
                                {getSeverityText(anomaly.severity)}
                              </Badge>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No anomalies detected
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Insights</span>
                      <Badge variant={result.metadata.calculationMethod === 'ai_enhanced' ? 'default' : 'secondary'}>
                        {result.metadata.calculationMethod === 'ai_enhanced' ? 'AI Enhanced' : 'Standard'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {result.metadata.calculationMethod === 'ai_enhanced'
                        ? 'Analysis powered by AI with detailed insights'
                        : 'Standard calculation without AI enhancement'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!useAI && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Enable AI mode to get detailed AI-powered insights and recommendations.
                        </AlertDescription>
                      </Alert>
                    )}

                    {result.aiInsights.summary && (
                      <div>
                        <Label>Summary</Label>
                        <p className="text-sm mt-1">{result.aiInsights.summary}</p>
                      </div>
                    )}

                    {result.aiInsights.keyFindings.length > 0 && (
                      <div>
                        <Label>Key Findings</Label>
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
                        <Label>Recommendations</Label>
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Optimization Opportunities</span>
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
                              <span>Current</span>
                              <span>{optimization.current}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Potential</span>
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
                    <CardTitle className="text-lg">Optimization Impact Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          +{result.optimizations.reduce((sum, opt) => sum + opt.improvement, 0).toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Potential overall improvement rate</p>
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
                          Optimization could yield approximately {(result.totalCredits * 0.12).toFixed(0)} additional credits annually
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {predictionData ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Future Prediction</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {predictionData.predictedCredits.toFixed(0)}
                        </div>
                        <p className="text-sm text-muted-foreground">Predicted credit generation</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Prediction Confidence</span>
                          <span className={getConfidenceColor(predictionData.confidence)}>
                            {(predictionData.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={predictionData.confidence * 100} className="h-2" />
                      </div>

                      <div>
                        <Label className="text-sm">Impact Factors</Label>
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
                                  {getImpactText(factor.impact)}
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
                      <CardTitle className="text-lg">Prediction Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-xl font-semibold text-green-600">
                              +{(predictionData.predictedCredits * 0.08).toFixed(0)}
                            </div>
                            <p className="text-xs text-muted-foreground">Predicted increase</p>
                          </div>
                          <div>
                            <div className="text-xl font-semibold text-blue-600">
                              +8.2%
                            </div>
                            <p className="text-xs text-muted-foreground">Growth rate</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Equipment investment effects expected</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Supplier quality improvement trend</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            <span>Watch for seasonal fluctuations</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <p className="text-xs text-muted-foreground">
                            Predictions are based on historical data and AI analysis. Actual results may vary.
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
                      Prediction data will be displayed after calculation completes
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Calculator className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Run calculation to see results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}