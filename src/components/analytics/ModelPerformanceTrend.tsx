import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { insightGenerator, PerformanceAnalysis } from '@/lib/llm/insight-generator';
import { llmService } from '@/lib/llm/service';

interface ModelPerformanceData {
  date: string;
  [key: string]: string | number;
}

interface ModelPerformanceTrendProps {
  models: any[];
}

const ModelPerformanceTrend: React.FC<ModelPerformanceTrendProps> = ({ models }) => {
  const [performanceAnalysis, setPerformanceAnalysis] = useState<PerformanceAnalysis[]>([]);
  const [trendData, setTrendData] = useState<ModelPerformanceData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generatePerformanceAnalysis();
  }, [models]);

  const generatePerformanceAnalysis = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Generate AI-powered performance analysis
      const analysis = await insightGenerator.generatePerformanceAnalysis(models);
      setPerformanceAnalysis(analysis);

      // Generate mock trend data based on analysis
      const mockTrendData = generateMockTrendData(models, analysis);
      setTrendData(mockTrendData);

    } catch (err) {
      console.error('Failed to generate performance analysis:', err);
      setError('Failed to load AI-powered analysis. Showing standard metrics.');

      // Fallback to basic display
      const basicAnalysis = models.map(model => ({
        modelId: model.id,
        modelName: model.name,
        accuracy: model.accuracy,
        trend: 'stable' as const,
        trendPercentage: 0,
        insights: ['Basic monitoring mode'],
        recommendations: ['Enable AI analysis for deeper insights'],
        nextSteps: ['Configure LLM API settings']
      }));
      setPerformanceAnalysis(basicAnalysis);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockTrendData = (models: any[], analysis: PerformanceAnalysis[]): ModelPerformanceData[] => {
    const dates = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates.map((date, index) => {
      const dataPoint: ModelPerformanceData = { date };

      models.forEach((model, modelIndex) => {
        const modelAnalysis = analysis[modelIndex];
        let baseAccuracy = model.accuracy;

        // Add some realistic variation based on trend
        if (modelAnalysis) {
          const trendValue = (index / 30) * modelAnalysis.trendPercentage * 0.1;
          const randomVariation = (Math.random() - 0.5) * 2;
          baseAccuracy = baseAccuracy + trendValue + randomVariation;
        }

        dataPoint[model.name] = Math.max(0, Math.min(100, baseAccuracy));
      });

      return dataPoint;
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTrendBadge = (trend: string, percentage: number) => {
    const variant = trend === 'improving' ? 'default' : trend === 'declining' ? 'destructive' : 'secondary';
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {getTrendIcon(trend)}
        {Math.abs(percentage).toFixed(1)}%
      </Badge>
    );
  };

  const getStatusIcon = (accuracy: number) => {
    if (accuracy >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (accuracy >= 80) return <Target className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Model Performance Trend
          </h3>
          <p className="text-sm text-gray-600">AI-powered performance analysis and trends</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generatePerformanceAnalysis}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Analyzing...' : 'Refresh Analysis'}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>30-Day Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value, name) => [`${Number(value).toFixed(1)}%`, name]}
              />
              <Legend />
              {models.map((model, index) => (
                <Line
                  key={model.id}
                  type="monotone"
                  dataKey={model.name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Model Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {performanceAnalysis.map((analysis, index) => (
          <Card key={analysis.modelId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(analysis.accuracy)}
                  <h4 className="font-medium">{analysis.modelName}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{analysis.accuracy.toFixed(1)}%</span>
                  {getTrendBadge(analysis.trend, analysis.trendPercentage)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* AI Insights */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  AI Insights
                </h5>
                <ul className="space-y-1">
                  {analysis.insights.map((insight, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h5>
                <ul className="space-y-1">
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-blue-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Next Steps</h5>
                <ul className="space-y-1">
                  {analysis.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-green-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModelPerformanceTrend;