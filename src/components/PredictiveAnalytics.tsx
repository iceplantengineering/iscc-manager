import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Target,
  Zap,
  Activity,
  Settings,
  RefreshCw,
  Eye,
  Download,
  Calendar,
  Percent,
  ArrowRight,
  Zap as Bolt,
  LineChart,
  PieChart as ChartPie,
  Database
} from "lucide-react";

interface Prediction {
  id: string;
  type: "demand" | "quality" | "cost" | "supply_chain" | "production";
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  impact: "high" | "medium" | "low";
  status: "predicted" | "observed" | "resolved";
  predictedValue: number;
  actualValue?: number;
  accuracy: number;
  model: string;
  factors: string[];
  recommendations: string[];
}

interface ModelPerformance {
  name: string;
  accuracy: number;
  dataPoints: number;
  lastTrained: string;
  rmse: number;
  mae: number;
  trend: "improving" | "stable" | "declining";
}

const PredictiveAnalytics = () => {
  const [predictions] = useState<Prediction[]>([
    {
      id: "PRED-001",
      type: "demand",
      title: "Carbon Fiber Composite Demand Surge",
      description: "Expected 23% increase in demand for Q4 2025 due to new automotive contracts",
      confidence: 85,
      timeframe: "Q4 2025",
      impact: "high",
      status: "predicted",
      predictedValue: 12400,
      accuracy: 82,
      model: "LSTM Demand Forecast",
      factors: ["Historical demand patterns", "Industry growth projections", "New customer contracts"],
      recommendations: [
        "Increase production capacity by 15%",
        "Secure additional raw material supply",
        "Hire 3 additional production staff"
      ]
    },
    {
      id: "PRED-002",
      type: "quality",
      title: "Bio-based Polymer Quality Variance",
      description: "Predicted 12% increase in quality issues due to supplier material inconsistencies",
      confidence: 78,
      timeframe: "Next 2 months",
      impact: "medium",
      status: "predicted",
      predictedValue: 15,
      accuracy: 76,
      model: "Random Forest Quality Predictor",
      factors: ["Supplier performance history", "Material batch variations", "Environmental conditions"],
      recommendations: [
        "Implement additional quality checks",
        "Work with supplier on process improvements",
        "Consider alternative suppliers"
      ]
    },
    {
      id: "PRED-003",
      type: "supply_chain",
      title: "Petroleum-based Resin Supply Disruption",
      description: "High probability of supply disruption from primary supplier due to maintenance",
      confidence: 92,
      timeframe: "October 2025",
      impact: "high",
      status: "predicted",
      predictedValue: 85,
      accuracy: 88,
      model: "Supply Chain Risk Assessment",
      factors: ["Supplier maintenance schedule", "Historical reliability", "Alternative supplier capacity"],
      recommendations: [
        "Increase safety stock by 20%",
        "Pre-qualify backup suppliers",
        "Adjust production scheduling"
      ]
    },
    {
      id: "PRED-004",
      type: "production",
      title: "Production Efficiency Optimization",
      description: "Opportunity to increase line efficiency by 8% through process optimization",
      confidence: 73,
      timeframe: "3-6 months",
      impact: "medium",
      status: "predicted",
      predictedValue: 93,
      accuracy: 70,
      model: "Production Efficiency Predictor",
      factors: ["Current line performance", "Equipment age", "Operator experience levels"],
      recommendations: [
        "Implement predictive maintenance",
        "Optimize machine scheduling",
        "Invest in staff training"
      ]
    }
  ]);

  const [modelPerformance] = useState<ModelPerformance[]>([
    {
      name: "Demand Forecast Model",
      accuracy: 87.5,
      dataPoints: 1248,
      lastTrained: "2025-09-15",
      rmse: 0.082,
      mae: 0.065,
      trend: "improving"
    },
    {
      name: "Quality Prediction Model",
      accuracy: 82.3,
      dataPoints: 892,
      lastTrained: "2025-09-10",
      rmse: 0.125,
      mae: 0.098,
      trend: "stable"
    },
    {
      name: "Supply Chain Risk Model",
      accuracy: 90.1,
      dataPoints: 567,
      lastTrained: "2025-09-12",
      rmse: 0.058,
      mae: 0.042,
      trend: "improving"
    },
    {
      name: "Cost Optimization Model",
      accuracy: 79.8,
      dataPoints: 1456,
      lastTrained: "2025-09-08",
      rmse: 0.145,
      mae: 0.112,
      trend: "declining"
    }
  ]);

  const analyticsStats = {
    totalPredictions: 156,
    accuratePredictions: 128,
    averageAccuracy: 84.2,
    highImpactPredictions: 24,
    activeModels: 8,
    dataPointsTrained: 4163,
    avgProcessingTime: 1.2
  };

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case "demand": return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case "quality": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "cost": return <Target className="h-5 w-5 text-purple-600" />;
      case "supply_chain": return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "production": return <Activity className="h-5 w-5 text-orange-600" />;
      default: return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high": return <Badge className="bg-red-100 text-red-800">High Impact</Badge>;
      case "medium": return <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>;
      default: return <Badge className="bg-green-100 text-green-800">Low Impact</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "observed": return <Badge className="bg-green-100 text-green-800">Observed</Badge>;
      case "predicted": return <Badge className="bg-blue-100 text-blue-800">Predicted</Badge>;
      case "resolved": return <Badge className="bg-gray-100 text-gray-800">Resolved</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Predictive Analytics</h1>
            <p className="text-gray-600 mt-2">AI-powered predictions and insights for proactive decision making</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retrain Models
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Insights
            </Button>
          </div>
        </div>

        {/* Analytics Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Predictions</p>
                  <p className="text-2xl font-bold">{analyticsStats.totalPredictions}</p>
                </div>
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-green-600">{analyticsStats.averageAccuracy}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Impact</p>
                  <p className="text-2xl font-bold text-red-600">{analyticsStats.highImpactPredictions}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Models</p>
                  <p className="text-2xl font-bold">{analyticsStats.activeModels}</p>
                </div>
                <Database className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Model Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Model Performance Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modelPerformance.map((model, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{model.name}</h3>
                        {getTrendIcon(model.trend)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Accuracy</span>
                          <span className="font-medium">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Data Points: {model.dataPoints}</span>
                          <span>RMSE: {model.rmse}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last trained: {model.lastTrained}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Predictions Dashboard */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Current Predictions</h2>
          {predictions.map((prediction) => (
            <Card key={prediction.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Prediction Details */}
                  <div className="md:col-span-2">
                    <div className="flex items-start gap-3 mb-4">
                      {getPredictionIcon(prediction.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{prediction.title}</h3>
                          {getImpactBadge(prediction.impact)}
                          {getStatusBadge(prediction.status)}
                        </div>
                        <p className="text-gray-600 mb-3">{prediction.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {prediction.timeframe}
                          </div>
                          <div className="flex items-center gap-1">
                            <Percent className="h-4 w-4" />
                            {prediction.confidence}% confidence
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {prediction.accuracy}% accuracy
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-medium mb-2">Key Factors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <ArrowRight className="h-3 w-3 mt-0.5 text-gray-400 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Prediction Metrics */}
                  <div>
                    <h4 className="font-medium mb-3">Prediction Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Confidence Level</span>
                          <span>{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Model Accuracy</span>
                          <span>{prediction.accuracy}%</span>
                        </div>
                        <Progress value={prediction.accuracy} className="h-2" />
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium">Model: {prediction.model}</p>
                        <p className="text-xs text-gray-600">
                          {prediction.actualValue
                            ? `Predicted: ${prediction.predictedValue}, Actual: ${prediction.actualValue}`
                            : `Predicted Value: ${prediction.predictedValue}`
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Analyze Details
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure Model
                      </Button>
                    </div>
                    {prediction.status === "predicted" && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-800">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Monitoring for actual results
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Insights & Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-medium mb-3">Prediction Accuracy by Type</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Supply Chain</span>
                    <span className="font-medium">90.1%</span>
                  </div>
                  <Progress value={90.1} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Demand Forecast</span>
                    <span className="font-medium">87.5%</span>
                  </div>
                  <Progress value={87.5} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Quality Prediction</span>
                    <span className="font-medium">82.3%</span>
                  </div>
                  <Progress value={82.3} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Cost Optimization</span>
                    <span className="font-medium">79.8%</span>
                  </div>
                  <Progress value={79.8} className="h-2" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-3">Model Performance Trends</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Improving
                    </span>
                    <span>2 models</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      Stable
                    </span>
                    <span>5 models</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Declining
                    </span>
                    <span>1 model</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    Cost Optimization model shows declining performance - retraining recommended
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-3">System Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Points Trained</span>
                    <span className="font-medium">{analyticsStats.dataPointsTrained.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Processing Time</span>
                    <span className="font-medium">{analyticsStats.avgProcessingTime}s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Model Updates</span>
                    <span className="font-medium">3/week</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>API Calls Today</span>
                    <span className="font-medium">1,247</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;