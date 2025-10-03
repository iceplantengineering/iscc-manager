import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { insightGenerator, GeneratedInsight } from '@/lib/llm/insight-generator';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  Activity,
  RefreshCw,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';

interface RealTimeInsightsProps {
  productionData?: any;
  qualityData?: any;
  energyData?: any;
  emissionsData?: any;
  costData?: any;
}

const RealTimeInsights: React.FC<RealTimeInsightsProps> = ({
  productionData,
  qualityData,
  energyData,
  emissionsData,
  costData
}) => {
  const [insights, setInsights] = useState<GeneratedInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  useEffect(() => {
    generateInsights();
    // Auto-refresh every 5 minutes
    const interval = setInterval(generateInsights, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [productionData, qualityData, energyData, emissionsData, costData]);

  const generateInsights = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const context = {
        productionData: productionData || generateMockProductionData(),
        qualityData: qualityData || generateMockQualityData(),
        energyData: energyData || generateMockEnergyData(),
        emissionsData: emissionsData || generateMockEmissionsData(),
        costData: costData || generateMockCostData()
      };

      const newInsights = await insightGenerator.generateRealTimeInsights(context);
      setInsights(newInsights);
      setLastRefreshed(new Date());

    } catch (err) {
      console.error('Failed to generate insights:', err);
      setError('Failed to generate AI insights. Please check your LLM API configuration.');
      setInsights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'opportunity':
        return <Target className="h-5 w-5 text-green-600" />;
      case 'anomaly':
        return <Activity className="h-5 w-5 text-red-600" />;
      case 'trend':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      default:
        return <Brain className="h-5 w-5 text-purple-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'opportunity':
        return 'border-green-200 bg-green-50';
      case 'anomaly':
        return 'border-red-200 bg-red-50';
      case 'trend':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-purple-200 bg-purple-50';
    }
  };

  const formatTimeSinceRefresh = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Real-time AI Insights
            <RefreshCw className="h-4 w-4 animate-spin ml-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Brain className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <p>Generating AI-powered insights...</p>
            <p className="text-sm">Analyzing current production and system data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Real-time AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <p className="text-gray-700 mb-4">{error}</p>
            <Button onClick={generateInsights} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Real-time AI Insights
          </h3>
          <p className="text-sm text-gray-600">
            AI-powered analysis of current operations and recommendations
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastRefreshed && (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTimeSinceRefresh(lastRefreshed)}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={generateInsights}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 gap-4">
        {insights.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No insights available</p>
              <p className="text-sm text-gray-400">Check LLM API configuration and data sources</p>
            </CardContent>
          </Card>
        ) : (
          insights.map((insight) => (
            <Card
              key={insight.id}
              className={`border-l-4 ${getTypeColor(insight.type)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        <Badge variant="outline">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{insight.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {insight.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {insight.timeframe}
                      </span>
                    </div>

                    {insight.recommendations && insight.recommendations.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</h5>
                        <ul className="space-y-1">
                          {insight.recommendations.map((rec, index) => (
                            <li
                              key={index}
                              className="text-sm text-blue-600 flex items-start gap-2"
                            >
                              <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// Mock data generators for fallback/demo purposes
function generateMockProductionData() {
  return {
    currentOutput: 1250,
    targetOutput: 1200,
    efficiency: 92.3,
    activeLines: 8,
    totalLines: 10,
    shiftProgress: 0.75,
    currentBatch: 'BM-20250925-003'
  };
}

function generateMockQualityData() {
  return {
    defectRate: 2.1,
    targetDefectRate: 2.5,
    qualityScore: 94.2,
    inspections: 156,
    passed: 148,
    failed: 8,
    trending: 'improving'
  };
}

function generateMockEnergyData() {
  return {
    currentConsumption: 680,
    optimizedConsumption: 620,
    efficiency: 91.2,
    costPerUnit: 0.12,
    renewablePercentage: 35,
    peakHours: false
  };
}

function generateMockEmissionsData() {
  return {
    currentEmissions: 145.2,
    targetEmissions: 150,
    compliance: 96.8,
    carbonIntensity: 0.85,
    offsetCredits: 125
  };
}

function generateMockCostData() {
  return {
    materialCosts: 45000,
    laborCosts: 35000,
    energyCosts: 28000,
    maintenanceCosts: 18000,
    totalCosts: 126000,
    budgetVariance: -2200
  };
}

export default RealTimeInsights;