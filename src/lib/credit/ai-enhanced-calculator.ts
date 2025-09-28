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
あなたはISCC+クレジット計算の専門家です。以下のデータに基づいて、クレジット計算の詳細分析を行ってください。

入力データ：
- AN投入量: ${data.anInput} kg
- PAN生産量: ${data.panProduction} kg
- CF生産量: ${data.cfProduction} kg
- PAN出荷: ${data.panShipments.length}件、合計${data.panShipments.reduce((sum, s) => sum + s.quantity, 0)} kg
- CF出荷: ${data.cfShipments.length}件、合計${data.cfShipments.reduce((sum, s) => sum + s.quantity, 0)} kg

計算結果：
- ANクレジット: ${baseResult.anCredits.toFixed(2)}
- PANクレジット: ${baseResult.panCredits.toFixed(2)}
- CFクレジット: ${baseResult.cfCredits.toFixed(2)}
- 総クレジット: ${baseResult.totalCredits.toFixed(2)}

サプライヤーデータ：
${data.supplierData.map(s => `- ${s.name}: BM% ${s.bmPercentage}%, 信頼性 ${s.reliability}%`).join('\n')}

プラントデータ：
${data.plantData.map(p => `- ${p.name}: 効率 ${p.efficiency}%, 変換率 ${p.conversionRate}`).join('\n')}

分析してください：
1. 計算の正確性評価
2. 潜在的な異常や問題点
3. 最適化機会の特定
4. 具体的な改善推奨事項

JSON形式で回答してください：
{
  "anomalies": [
    {
      "type": "calculation|data_quality|compliance|efficiency",
      "severity": "high|medium|low",
      "description": "異常の説明",
      "recommendation": "推奨事項"
    }
  ],
  "optimizations": [
    {
      "area": "対象領域",
      "current": "現在値",
      "potential": "潜在的改善値",
      "improvement": "改善率",
      "action": "具体的なアクション"
    }
  ],
  "insights": {
    "summary": "分析サマリー",
    "keyFindings": ["主要な発見1", "主要な発見2"],
    "recommendations": ["推奨事項1", "推奨事項2"]
  },
  "confidence": 0.95
}`;

    const request: LLMRequest = {
      provider: 'openai',
      prompt: analysisPrompt,
      maxTokens: 2000,
      temperature: 0.3,
      systemPrompt: 'あなたはISCC+クレジット計算の専門家として、正確で詳細な分析を提供してください。常にJSON形式で回答してください。',
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
          area: '変換効率',
          current: '82%',
          potential: '85%',
          improvement: 3,
          action: 'プロセスパラメータの最適化による変換効率の向上'
        }
      ],
      insights: {
        summary: 'クレジット計算は正常に実行されました。継続的な監視が推奨されます。',
        keyFindings: [
          'クレジット生成は安定しています',
          'サプライヤーのパフォーマンスは良好です'
        ],
        recommendations: [
          '月次での詳細なレビューを実施してください',
          '変換効率の改善を検討してください'
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
        description: 'ANからPANへの変換効率が低いです',
        recommendation: '製造プロセスの見直しと機器の点検を推奨します'
      });
    }

    const lowReliabilitySuppliers = data.supplierData.filter(s => s.reliability < 80);
    if (lowReliabilitySuppliers.length > 0) {
      anomalies.push({
        type: 'data_quality',
        severity: 'medium',
        description: `${lowReliabilitySuppliers.length}件のサプライヤーで信頼性が80%未満です`,
        recommendation: 'サプライヤーとの品質改善協議を開始してください'
      });
    }

    if (results.totalCredits < data.anInput * 0.8) {
      anomalies.push({
        type: 'calculation',
        severity: 'medium',
        description: '総クレジット生成量が期待値を下回っています',
        recommendation: 'BM%の確認と計算ロジックの検証が必要です'
      });
    }

    return anomalies;
  }

  private calculateOptimizations(data: CreditInputData, results: any): Array<any> {
    const optimizations = [];

    const currentEfficiency = results.panCredits / data.anInput;
    if (currentEfficiency < 0.85) {
      optimizations.push({
        area: '変換効率',
        current: `${(currentEfficiency * 100).toFixed(1)}%`,
        potential: '85%',
        improvement: 85 - (currentEfficiency * 100),
        action: '触媒の最適化と温度管理の改善'
      });
    }

    const avgSupplierBM = data.supplierData.reduce((sum, s) => sum + s.bmPercentage, 0) / data.supplierData.length;
    if (avgSupplierBM < 90) {
      optimizations.push({
        area: 'サプライヤーBM%',
        current: `${avgSupplierBM.toFixed(1)}%`,
        potential: '95%',
        improvement: 95 - avgSupplierBM,
        action: '高BM%サプライヤーの開拓と既存サプライヤーとの協力'
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
以下の履歴データに基づいて、今後のクレジット生成を予測してください。

履歴データ：
${historicalData.slice(-3).map(d => `
期間: ${d.timePeriod.start} ~ ${d.timePeriod.end}
AN投入: ${d.anInput} kg
PAN生産: ${d.panProduction} kg
効率: ${((d.panProduction / d.anInput) * 100).toFixed(1)}%
`).join('')}

予測期間: ${futurePeriod.start} ~ ${futurePeriod.end}

要因分析：
- 季節性パターン
- サプライヤー状況
- 設備稼働率
- 市場需要

JSON形式で予測結果を提供してください。`;

    const request: LLMRequest = {
      provider: 'openai',
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
          { factor: '設備稼働率', impact: 'positive', weight: 0.3 },
          { factor: 'サプライヤー品質', impact: 'positive', weight: 0.25 },
          { factor: '季節変動', impact: 'neutral', weight: 0.2 },
          { factor: '技術改善', impact: 'positive', weight: 0.25 }
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