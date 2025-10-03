import { llmService } from './service';
import { LLMRequest } from './types';

export interface GeneratedInsight {
  id: string;
  type: 'anomaly' | 'trend' | 'warning' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  recommendations: string[];
}

export interface PerformanceAnalysis {
  modelId: string;
  modelName: string;
  accuracy: number;
  trend: 'improving' | 'stable' | 'declining';
  trendPercentage: number;
  insights: string[];
  recommendations: string[];
  nextSteps: string[];
}

export class InsightGenerator {

  async generateRealTimeInsights(context: {
    productionData?: any;
    qualityData?: any;
    energyData?: any;
    emissionsData?: any;
    costData?: any;
  }): Promise<GeneratedInsight[]> {
    const prompt = this.buildInsightPrompt(context);

    try {
      const request: LLMRequest = {
        provider: 'deepseek', // Use the configured provider
        prompt: prompt,
        systemPrompt: `You are an AI analytics expert for an ISCC+ certified manufacturing facility.
        Analyze the provided data and generate real-time insights. Return the response in this JSON format:
        {
          "insights": [
            {
              "type": "anomaly|trend|warning|opportunity",
              "title": "Brief descriptive title",
              "description": "Detailed explanation of the insight",
              "confidence": 85,
              "timeframe": "Next 24 hours|Current shift|This week",
              "impact": "high|medium|low",
              "category": "Production|Quality|Energy|Emissions|Cost|Safety",
              "recommendations": ["Action 1", "Action 2", "Action 3"]
            }
          ]
        }`,
        maxTokens: 2000,
        temperature: 0.3
      };

      const response = await llmService.generateResponse(request);

      // Parse the JSON response
      const data = JSON.parse(response.content);
      const insights = data.insights || [];

      // Add IDs and ensure data integrity
      return insights.map((insight: any, index: number) => ({
        id: `insight-${Date.now()}-${index}`,
        ...insight,
        confidence: Math.min(100, Math.max(0, insight.confidence || 75))
      }));

    } catch (error) {
      console.error('Failed to generate insights:', error);
      // Fallback insights
      return this.getFallbackInsights();
    }
  }

  async generatePerformanceAnalysis(modelData: any[]): Promise<PerformanceAnalysis[]> {
    const prompt = this.buildPerformancePrompt(modelData);

    try {
      const request: LLMRequest = {
        provider: 'deepseek',
        prompt: prompt,
        systemPrompt: `You are an AI/ML performance analyst. Analyze the model performance data and provide detailed analysis.
        Return the response in this JSON format:
        {
          "analyses": [
            {
              "modelId": "model-id",
              "modelName": "Model Name",
              "accuracy": 94.2,
              "trend": "improving|stable|declining",
              "trendPercentage": 5.2,
              "insights": ["Insight 1", "Insight 2"],
              "recommendations": ["Recommendation 1", "Recommendation 2"],
              "nextSteps": ["Next step 1", "Next step 2"]
            }
          ]
        }`,
        maxTokens: 2000,
        temperature: 0.2
      };

      const response = await llmService.generateResponse(request);
      const data = JSON.parse(response.content);
      return data.analyses || [];

    } catch (error) {
      console.error('Failed to generate performance analysis:', error);
      return this.getFallbackPerformanceAnalysis(modelData);
    }
  }

  private buildInsightPrompt(context: any): string {
    const currentDate = new Date().toISOString().split('T')[0];

    return `Generate real-time AI insights for an ISCC+ certified manufacturing facility.

Current date: ${currentDate}

Context data:
- Production: ${context.productionData ? JSON.stringify(context.productionData).substring(0, 300) + '...' : 'Normal operations'}
- Quality: ${context.qualityData ? JSON.stringify(context.qualityData).substring(0, 300) + '...' : 'Within expected parameters'}
- Energy: ${context.energyData ? JSON.stringify(context.energyData).substring(0, 300) + '...' : 'Standard consumption patterns'}
- Emissions: ${context.emissionsData ? JSON.stringify(context.emissionsData).substring(0, 300) + '...' : 'Within regulatory limits'}
- Costs: ${context.costData ? JSON.stringify(context.costData).substring(0, 300) + '...' : 'Budget compliance maintained'}

Focus on:
1. Potential issues or anomalies that need attention
2. Optimization opportunities
3. Trends that could impact future performance
4. Compliance and sustainability considerations

Generate 3-5 actionable insights with specific recommendations.`;
  }

  private buildPerformancePrompt(modelData: any[]): string {
    return `Analyze the performance of AI prediction models in a manufacturing environment.

Model data: ${JSON.stringify(modelData)}

Provide analysis for each model including:
- Current accuracy and performance metrics
- Performance trends (improving, stable, declining)
- Percentage change in recent performance
- Key insights about what's affecting performance
- Specific recommendations for improvement
- Next steps for maintenance or retraining

Focus on actionable insights that can improve model reliability and business value.`;
  }

  private getFallbackInsights(): GeneratedInsight[] {
    return [
      {
        id: 'fallback-1',
        type: 'warning',
        title: 'Limited Analytics Data Available',
        description: 'AI service temporarily unavailable - showing default monitoring recommendations',
        confidence: 70,
        timeframe: 'Current session',
        impact: 'medium',
        category: 'System',
        recommendations: [
          'Check LLM API configuration',
          'Verify network connectivity',
          'Review system logs for errors'
        ]
      }
    ];
  }

  private getFallbackPerformanceAnalysis(modelData: any[]): PerformanceAnalysis[] {
    return modelData.map((model, index) => ({
      modelId: model.id || `model-${index}`,
      modelName: model.name || `Model ${index + 1}`,
      accuracy: model.accuracy || 85,
      trend: 'stable',
      trendPercentage: 0,
      insights: ['Performance monitoring temporarily unavailable'],
      recommendations: ['Check system connectivity', 'Verify model training pipeline'],
      nextSteps: ['Restore API connection', 'Resume normal monitoring']
    }));
  }
}

export const insightGenerator = new InsightGenerator();