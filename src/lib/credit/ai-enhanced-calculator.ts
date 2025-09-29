import { llmService } from '../llm/service';
import { LLMRequest } from '../llm/types';
import { MassBalanceEngine } from '../massbalance/Engine';

export interface CreditInputData {
  anInput: number;
  panProduction: number;
  cfProduction: number;
  panShipments: Array<{
    quantity: number;
    date: string;
    customer: string;
  }>;
  cfShipments: Array<{
    quantity: number;
    date: string;
    customer: string;
  }>;
  supplierData: Array<{
    name: string;
    bmPercentage: number;
    reliability: number;
  }>;
  plantData: Array<{
    id: string;
    name: string;
    efficiency: number;
    conversionRate: number;
  }>;
  timePeriod: {
    start: string;
    end: string;
  };
}

export interface CreditCalculationResult {
  anCredits: number;
  panCredits: number;
  cfCredits: number;
  totalCredits: number;
  creditsUsed: number;
  availableCredits: number;
  conversionFactors: {
    anToPan: number;
    panToCf: number;
    anToCf: number;
  };
  calculations: {
    anCreditCalculation: string;
    panCreditCalculation: string;
    cfCreditCalculation: string;
  };
  anomalies: Array<{
    type: 'calculation' | 'data_quality' | 'compliance' | 'efficiency';
    severity: 'high' | 'medium' | 'low';
    description: string;
    recommendation: string;
  }>;
  optimizations: Array<{
    area: string;
    current: number;
    potential: number;
    improvement: number;
    action: string;
  }>;
  aiInsights: {
    summary: string;
    keyFindings: string[];
    recommendations: string[];
  };
  metadata: {
    calculatedAt: Date;
    calculationMethod: 'standard' | 'ai_enhanced';
    dataPoints: number;
    confidence: number;
  };
}

export class AIEnhancedCreditCalculator {
  private massBalanceEngine: MassBalanceEngine;
  private conversionFactors: Map<string, number> = new Map();

  constructor() {
    this.massBalanceEngine = MassBalanceEngine.getInstance();
    this.initializeConversionFactors();
  }

  private initializeConversionFactors() {
    this.conversionFactors.set('an_to_pan', 0.82);
    this.conversionFactors.set('pan_to_cf', 0.65);
    this.conversionFactors.set('an_to_cf', 0.53);
  }

  async calculateCredits(data: CreditInputData, useAI: boolean = true): Promise<CreditCalculationResult> {
    const baseResult = this.performBaseCalculations(data);

    if (useAI) {
      return await this.enhanceWithAI(baseResult, data);
    }

    return baseResult;
  }

  private performBaseCalculations(data: CreditInputData): CreditCalculationResult {
    const anToPanFactor = this.conversionFactors.get('an_to_pan') || 0.82;
    const panToCfFactor = this.conversionFactors.get('pan_to_cf') || 0.65;
    const anToCfFactor = this.conversionFactors.get('an_to_cf') || 0.53;

    const anCredits = data.anInput * 0.95; // BM% 95% for certified AN
    const panCredits = data.panProduction * 0.90; // BM% 90% for PAN
    const cfCredits = data.cfProduction * 0.85; // BM% 85% for CF

    const totalCreditsGenerated = anCredits + panCredits + cfCredits;
    const creditsUsed = this.calculateCreditsUsed(data);
    const availableCredits = totalCreditsGenerated - creditsUsed;

    return {
      anCredits,
      panCredits,
      cfCredits,
      totalCredits: totalCreditsGenerated,
      creditsUsed,
      availableCredits,
      conversionFactors: {
        anToPan: anToPanFactor,
        panToCf: panToCfFactor,
        anToCf: anToCfFactor,
      },
      calculations: {
        anCreditCalculation: `${data.anInput} kg × 95% = ${anCredits.toFixed(2)} credits`,
        panCreditCalculation: `${data.panProduction} kg × 90% = ${panCredits.toFixed(2)} credits`,
        cfCreditCalculation: `${data.cfProduction} kg × 85% = ${cfCredits.toFixed(2)} credits`,
      },
      anomalies: this.detectAnomalies(data, {
        anCredits,
        panCredits,
        cfCredits,
        totalCredits: totalCreditsGenerated,
      }),
      optimizations: this.calculateOptimizations(data, {
        anCredits,
        panCredits,
        cfCredits,
      }),
      aiInsights: {
        summary: '',
        keyFindings: [],
        recommendations: [],
      },
      metadata: {
        calculatedAt: new Date(),
        calculationMethod: 'standard',
        dataPoints: this.countDataPoints(data),
        confidence: 0.85,
      },
    };
  }

  private async enhanceWithAI(baseResult: CreditCalculationResult, data: CreditInputData): Promise<CreditCalculationResult> {
    try {
      const aiAnalysis = await this.performAIAnalysis(data, baseResult);

      return {
        ...baseResult,
        anomalies: [...baseResult.anomalies, ...aiAnalysis.additionalAnomalies],
        optimizations: aiAnalysis.optimizations,
        aiInsights: aiAnalysis.insights,
        metadata: {
          ...baseResult.metadata,
          calculationMethod: 'ai_enhanced',
          confidence: aiAnalysis.confidence,
        },
      };
    } catch (error) {
      console.warn('AI analysis failed, using base calculation:', error);
      return baseResult;
    }
  }

  private async performAIAnalysis(data: CreditInputData, baseResult: CreditCalculationResult) {
    const analysisPrompt = `
You are an ISCC+ credit calculation expert. Please perform detailed analysis of credit calculations based on the following data.

Input Data:
- AN Input: ${data.anInput} kg
- PAN Production: ${data.panProduction} kg
- CF Production: ${data.cfProduction} kg
- PAN Shipments: ${data.panShipments.length} items, total ${data.panShipments.reduce((sum, s) => sum + s.quantity, 0)} kg
- CF Shipments: ${data.cfShipments.length} items, total ${data.cfShipments.reduce((sum, s) => sum + s.quantity, 0)} kg

Calculation Results:
- AN Credits: ${baseResult.anCredits.toFixed(2)}
- PAN Credits: ${baseResult.panCredits.toFixed(2)}
- CF Credits: ${baseResult.cfCredits.toFixed(2)}
- Total Credits: ${baseResult.totalCredits.toFixed(2)}

Supplier Data:
${data.supplierData.map(s => `- ${s.name}: BM% ${s.bmPercentage}%, Reliability ${s.reliability}%`).join('\n')}

Plant Data:
${data.plantData.map(p => `- ${p.name}: Efficiency ${p.efficiency}%, Conversion Rate ${p.conversionRate}`).join('\n')}

Please analyze:
1. Calculation accuracy evaluation
2. Potential anomalies and issues
3. Optimization opportunities identification
4. Specific improvement recommendations

Please respond in JSON format:
{
  "anomalies": [
    {
      "type": "calculation|data_quality|compliance|efficiency",
      "severity": "high|medium|low",
      "description": "Anomaly description",
      "recommendation": "Recommendation"
    }
  ],
  "optimizations": [
    {
      "area": "Target area",
      "current": "Current value",
      "potential": "Potential improvement value",
      "improvement": "Improvement rate",
      "action": "Specific action"
    }
  ],
  "insights": {
    "summary": "Analysis summary",
    "keyFindings": ["Key finding 1", "Key finding 2"],
    "recommendations": ["Recommendation 1", "Recommendation 2"]
  },
  "confidence": 0.95
}`;

    // Get the first available provider instead of hardcoded 'openai'
    const availableProviders = llmService.getAvailableProviders();
    const provider = availableProviders.length > 0 ? availableProviders[0].id : 'deepseek';

    const request: LLMRequest = {
      provider,
      prompt: analysisPrompt,
      maxTokens: 2000,
      temperature: 0.3,
      systemPrompt: 'You are an ISCC+ credit calculation expert, please provide accurate and detailed analysis. Always respond in JSON format.',
    };

    const response = await llmService.generateResponse(request);

    try {
      const aiResult = JSON.parse(response.content);
      return {
        additionalAnomalies: aiResult.anomalies || [],
        optimizations: aiResult.optimizations || [],
        insights: aiResult.insights || { summary: '', keyFindings: [], recommendations: [] },
        confidence: aiResult.confidence || 0.9,
      };
    } catch (parseError) {
      console.warn('Failed to parse AI response, using fallback analysis');
      return this.getFallbackAnalysis(data, baseResult);
    }
  }

  private getFallbackAnalysis(data: CreditInputData, baseResult: CreditCalculationResult) {
    return {
      additionalAnomalies: [],
      optimizations: [
        {
          area: 'Conversion Efficiency',
          current: '82%',
          potential: '85%',
          improvement: 3,
          action: 'Improvement of conversion efficiency through process parameter optimization'
        }
      ],
      insights: {
        summary: 'Credit calculation has been executed successfully. Continuous monitoring is recommended.',
        keyFindings: [
          'Credit generation is stable',
          'Supplier performance is good'
        ],
        recommendations: [
          'Please conduct detailed monthly reviews',
          'Consider improving conversion efficiency'
        ]
      },
      confidence: 0.8,
    };
  }

  private calculateCreditsUsed(data: CreditInputData): number {
    const panCreditsUsed = data.panShipments.reduce((sum, shipment) => sum + shipment.quantity * 0.90, 0);
    const cfCreditsUsed = data.cfShipments.reduce((sum, shipment) => sum + shipment.quantity * 0.85, 0);
    return panCreditsUsed + cfCreditsUsed;
  }

  private detectAnomalies(data: CreditInputData, results: any): Array<any> {
    const anomalies = [];

    const efficiency = results.panCredits / data.anInput;
    if (efficiency < 0.75) {
      anomalies.push({
        type: 'efficiency',
        severity: 'high',
        description: 'AN to PAN conversion efficiency is low',
        recommendation: 'Recommend reviewing manufacturing process and inspecting equipment'
      });
    }

    const lowReliabilitySuppliers = data.supplierData.filter(s => s.reliability < 80);
    if (lowReliabilitySuppliers.length > 0) {
      anomalies.push({
        type: 'data_quality',
        severity: 'medium',
        description: `${lowReliabilitySuppliers.length} suppliers have reliability below 80%`,
        recommendation: 'Please start quality improvement discussions with suppliers'
      });
    }

    if (results.totalCredits < data.anInput * 0.8) {
      anomalies.push({
        type: 'calculation',
        severity: 'medium',
        description: 'Total credit generation is below expected value',
        recommendation: 'BM% verification and calculation logic validation is required'
      });
    }

    return anomalies;
  }

  private calculateOptimizations(data: CreditInputData, results: any): Array<any> {
    const optimizations = [];

    const currentEfficiency = results.panCredits / data.anInput;
    if (currentEfficiency < 0.85) {
      optimizations.push({
        area: 'Conversion Efficiency',
        current: `${(currentEfficiency * 100).toFixed(1)}%`,
        potential: '85%',
        improvement: 85 - (currentEfficiency * 100),
        action: 'Catalyst optimization and temperature management improvement'
      });
    }

    const avgSupplierBM = data.supplierData.reduce((sum, s) => sum + s.bmPercentage, 0) / data.supplierData.length;
    if (avgSupplierBM < 90) {
      optimizations.push({
        area: 'Supplier BM%',
        current: `${avgSupplierBM.toFixed(1)}%`,
        potential: '95%',
        improvement: 95 - avgSupplierBM,
        action: 'Development of high BM% suppliers and cooperation with existing suppliers'
      });
    }

    return optimizations;
  }

  private countDataPoints(data: CreditInputData): number {
    return (
      1 + // AN input
      1 + // PAN production
      1 + // CF production
      data.panShipments.length +
      data.cfShipments.length +
      data.supplierData.length +
      data.plantData.length
    );
  }

  async predictFutureCredits(
    historicalData: CreditInputData[],
    futurePeriod: { start: string; end: string }
  ): Promise<{
    predictedCredits: number;
    confidence: number;
    factors: Array<{
      factor: string;
      impact: 'positive' | 'negative' | 'neutral';
      weight: number;
    }>;
  }> {
    const avgANInput = historicalData.reduce((sum, d) => sum + d.anInput, 0) / historicalData.length;
    const avgEfficiency = historicalData.reduce((sum, d) => {
      const efficiency = d.panProduction / d.anInput;
      return sum + efficiency;
    }, 0) / historicalData.length;

    const predictedCredits = avgANInput * avgEfficiency * 0.90;

    const predictionPrompt = `
Based on the following historical data, please predict future credit generation.

Historical Data:
${historicalData.slice(-3).map(d => `
Period: ${d.timePeriod.start} ~ ${d.timePeriod.end}
AN Input: ${d.anInput} kg
PAN Production: ${d.panProduction} kg
Efficiency: ${((d.panProduction / d.anInput) * 100).toFixed(1)}%
`).join('')}

Prediction Period: ${futurePeriod.start} ~ ${futurePeriod.end}

Factor Analysis:
- Seasonal patterns
- Supplier conditions
- Equipment operation rate
- Market demand

Please provide prediction results in JSON format.`;

    const availableProviders = llmService.getAvailableProviders();
    const provider = availableProviders.length > 0 ? availableProviders[0].id : 'deepseek';

    const request: LLMRequest = {
      provider,
      prompt: predictionPrompt,
      maxTokens: 1000,
      temperature: 0.3,
    };

    try {
      const response = await llmService.generateResponse(request);
      const aiResult = JSON.parse(response.content);

      return {
        predictedCredits: aiResult.predictedCredits || predictedCredits,
        confidence: aiResult.confidence || 0.75,
        factors: aiResult.factors || [
          { factor: '設備稼働率', impact: 'positive', weight: 0.3 },
          { factor: 'サプライヤー品質', impact: 'positive', weight: 0.25 },
          { factor: '季節変動', impact: 'neutral', weight: 0.2 },
          { factor: '技術改善', impact: 'positive', weight: 0.25 }
        ],
      };
    } catch (error) {
      return {
        predictedCredits,
        confidence: 0.7,
        factors: [
          { factor: 'Equipment Operation Rate', impact: 'positive', weight: 0.3 },
          { factor: 'Supplier Quality', impact: 'positive', weight: 0.25 },
          { factor: 'Seasonal Fluctuations', impact: 'neutral', weight: 0.2 },
          { factor: 'Technical Improvements', impact: 'positive', weight: 0.25 }
        ],
      };
    }
  }

  async updateConversionFactors(plantData: Array<{
    id: string;
    name: string;
    actualConversionRates: Array<{
      period: string;
      anToPan: number;
      panToCf: number;
      anToCf: number;
    }>;
  }>): Promise<void> {
    const avgFactors = plantData.reduce((acc, plant) => {
      const latest = plant.actualConversionRates[plant.actualConversionRates.length - 1];
      return {
        anToPan: acc.anToPan + latest.anToPan,
        panToCf: acc.panToCf + latest.panToCf,
        anToCf: acc.anToCf + latest.anToCf,
      };
    }, { anToPan: 0, panToCf: 0, anToCf: 0 });

    const count = plantData.length;
    this.conversionFactors.set('an_to_pan', avgFactors.anToPan / count);
    this.conversionFactors.set('pan_to_cf', avgFactors.panToCf / count);
    this.conversionFactors.set('an_to_cf', avgFactors.anToCf / count);
  }

  getConversionFactors(): Record<string, number> {
    return Object.fromEntries(this.conversionFactors);
  }

  exportCalculationLog(result: CreditCalculationResult): string {
    return JSON.stringify({
      timestamp: result.metadata.calculatedAt,
      method: result.metadata.calculationMethod,
      input: {
        anCredits: result.anCredits,
        panCredits: result.panCredits,
        cfCredits: result.cfCredits,
        totalCredits: result.totalCredits,
        creditsUsed: result.creditsUsed,
        availableCredits: result.availableCredits,
      },
      anomalies: result.anomalies,
      optimizations: result.optimizations,
      aiInsights: result.aiInsights,
      metadata: result.metadata,
    }, null, 2);
  }
}

export const aiEnhancedCreditCalculator = new AIEnhancedCreditCalculator();