import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Leaf,
  DollarSign,
  Activity,
  Settings,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

interface PredictionModel {
  id: string;
  name: string;
  type: 'production' | 'quality' | 'energy' | 'emissions' | 'cost';
  accuracy: number;
  status: 'active' | 'training' | 'error';
  lastTrained: string;
  nextPrediction: string;
  metrics: {
    mae: number;
    rmse: number;
    r2: number;
  };
}

interface OptimizationRecommendation {
  id: string;
  title: string;
  category: 'production' | 'energy' | 'quality' | 'cost' | 'sustainability';
  priority: 'high' | 'medium' | 'low';
  impact: {
    cost: number;
    efficiency: number;
    sustainability: number;
  };
  description: string;
  implementation: string;
  estimatedTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
}

interface PredictiveInsight {
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

const AdvancedAnalyticsDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedModel, setSelectedModel] = useState('all');
  const [isRealTime, setIsRealTime] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock prediction models data
  const predictionModels: PredictionModel[] = [
    {
      id: 'production-forecast',
      name: 'Production Output Forecast',
      type: 'production',
      accuracy: 94.2,
      status: 'active',
      lastTrained: '2025-09-22 14:30',
      nextPrediction: '2025-09-23 09:00',
      metrics: { mae: 2.3, rmse: 3.1, r2: 0.94 }
    },
    {
      id: 'quality-prediction',
      name: 'Quality Defect Prediction',
      type: 'quality',
      accuracy: 91.8,
      status: 'active',
      lastTrained: '2025-09-22 16:45',
      nextPrediction: '2025-09-23 08:00',
      metrics: { mae: 0.8, rmse: 1.2, r2: 0.92 }
    },
    {
      id: 'energy-optimization',
      name: 'Energy Consumption Optimization',
      type: 'energy',
      accuracy: 89.5,
      status: 'active',
      lastTrained: '2025-09-22 12:20',
      nextPrediction: '2025-09-23 07:30',
      metrics: { mae: 45.2, rmse: 67.8, r2: 0.89 }
    },
    {
      id: 'emissions-forecast',
      name: 'Emissions Forecast',
      type: 'emissions',
      accuracy: 87.3,
      status: 'training',
      lastTrained: '2025-09-22 10:15',
      nextPrediction: '2025-09-23 10:00',
      metrics: { mae: 1.2, rmse: 1.8, r2: 0.87 }
    },
    {
      id: 'cost-optimization',
      name: 'Production Cost Optimization',
      type: 'cost',
      accuracy: 92.7,
      status: 'active',
      lastTrained: '2025-09-22 18:00',
      nextPrediction: '2025-09-23 11:00',
      metrics: { mae: 1250, rmse: 1890, r2: 0.93 }
    }
  ];

  // Mock optimization recommendations
  const optimizationRecommendations: OptimizationRecommendation[] = [
    {
      id: 'opt-001',
      title: 'Optimize Production Schedule',
      category: 'production',
      priority: 'high',
      impact: { cost: 15000, efficiency: 12, sustainability: 8 },
      description: 'AI-optimized production scheduling can reduce energy consumption during peak hours',
      implementation: 'Implement AI scheduling algorithm in Production Plan module',
      estimatedTime: '2-3 weeks',
      status: 'approved'
    },
    {
      id: 'opt-002',
      title: 'Energy Storage Integration',
      category: 'energy',
      priority: 'medium',
      impact: { cost: 25000, efficiency: 15, sustainability: 20 },
      description: 'Install battery storage system to utilize off-peak energy rates',
      implementation: 'Procurement and installation of industrial battery storage',
      estimatedTime: '3-4 months',
      status: 'pending'
    },
    {
      id: 'opt-003',
      title: 'Predictive Maintenance Upgrade',
      category: 'quality',
      priority: 'high',
      impact: { cost: 8000, efficiency: 18, sustainability: 5 },
      description: 'Enhance predictive maintenance system with vibration analysis',
      implementation: 'Install vibration sensors and upgrade ML models',
      estimatedTime: '4-6 weeks',
      status: 'approved'
    },
    {
      id: 'opt-004',
      title: 'Waste Heat Recovery',
      category: 'sustainability',
      priority: 'medium',
      impact: { cost: 30000, efficiency: 8, sustainability: 25 },
      description: 'Capture and reuse waste heat from production processes',
      implementation: 'Install heat exchangers and thermal storage system',
      estimatedTime: '2-3 months',
      status: 'pending'
    }
  ];

  // Mock predictive insights
  const predictiveInsights: PredictiveInsight[] = [
    {
      id: 'insight-001',
      type: 'warning',
      title: 'Potential Quality Issue Detected',
      description: 'AI model predicts 15% increase in defect rate for Batch BM-20250925-003',
      confidence: 89,
      timeframe: 'Next 48 hours',
      impact: 'high',
      category: 'Quality Control',
      recommendations: [
        'Increase inspection frequency',
        'Review raw material quality',
        'Adjust production parameters'
      ]
    },
    {
      id: 'insight-002',
      type: 'opportunity',
      title: 'Energy Cost Optimization Window',
      description: 'Favorable energy prices expected next week - optimal time for energy-intensive processes',
      confidence: 92,
      timeframe: 'Next 7 days',
      impact: 'medium',
      category: 'Energy Management',
      recommendations: [
        'Reschedule high-energy processes',
        'Maximize production during off-peak hours',
        'Utilize energy storage systems'
      ]
    },
    {
      id: 'insight-003',
      type: 'anomaly',
      title: 'Unusual Production Pattern Detected',
      description: 'Production line efficiency shows abnormal deviation from expected pattern',
      confidence: 76,
      timeframe: 'Current shift',
      impact: 'medium',
      category: 'Production Monitoring',
      recommendations: [
        'Inspect equipment immediately',
        'Review operator performance',
        'Check material quality consistency'
      ]
    }
  ];

  // Mock forecast data
  const productionForecastData = [
    { date: 'Sep 23', actual: 1250, predicted: 1230, confidence: [1180, 1280] },
    { date: 'Sep 24', actual: 1320, predicted: 1290, confidence: [1240, 1340] },
    { date: 'Sep 25', predicted: 1350, confidence: [1300, 1400] },
    { date: 'Sep 26', predicted: 1380, confidence: [1330, 1430] },
    { date: 'Sep 27', predicted: 1400, confidence: [1350, 1450] },
    { date: 'Sep 28', predicted: 1420, confidence: [1370, 1470] },
    { date: 'Sep 29', predicted: 1390, confidence: [1340, 1440] }
  ];

  const energyOptimizationData = [
    { time: '00:00', current: 450, optimized: 380, saving: 70 },
    { time: '04:00', current: 420, optimized: 350, saving: 70 },
    { time: '08:00', current: 680, optimized: 620, saving: 60 },
    { time: '12:00', current: 750, optimized: 680, saving: 70 },
    { time: '16:00', current: 720, optimized: 650, saving: 70 },
    { time: '20:00', current: 580, optimized: 520, saving: 60 }
  ];

  const qualityPredictionData = [
    { batch: 'BM-001', defect_rate: 2.1, predicted: 2.3, status: 'normal' },
    { batch: 'BM-002', defect_rate: 1.8, predicted: 1.9, status: 'normal' },
    { batch: 'BM-003', defect_rate: 2.5, predicted: 3.8, status: 'warning' },
    { batch: 'BM-004', defect_rate: 2.2, predicted: 2.4, status: 'normal' },
    { batch: 'BM-005', defect_rate: 1.9, predicted: 2.1, status: 'normal' }
  ];

  const costOptimizationData = [
    { category: 'Raw Materials', current: 45000, optimized: 42000, saving: 3000 },
    { category: 'Energy', current: 28000, optimized: 24000, saving: 4000 },
    { category: 'Labor', current: 35000, optimized: 33500, saving: 1500 },
    { category: 'Maintenance', current: 18000, optimized: 16000, saving: 2000 },
    { category: 'Overhead', current: 22000, optimized: 21000, saving: 1000 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'training':
        return <Badge className="bg-yellow-100 text-yellow-800">Training</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      case 'implemented':
        return <Badge className="bg-green-100 text-green-800">Implemented</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
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
        return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'production':
        return <Activity className="h-4 w-4" />;
      case 'quality':
        return <CheckCircle className="h-4 w-4" />;
      case 'energy':
        return <Zap className="h-4 w-4" />;
      case 'emissions':
        return <Leaf className="h-4 w-4" />;
      case 'cost':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-600" />
              Advanced Analytics & AI
            </h1>
            <p className="text-gray-600 mt-1">Predictive analytics, machine learning models, and optimization recommendations</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant={isRealTime ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealTime(!isRealTime)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {isRealTime ? 'Live' : 'Paused'}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Model Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {predictionModels.map((model) => (
                <Card key={model.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      {getTypeIcon(model.type)}
                      <div className="text-right">
                        <div className="text-lg font-bold">{model.accuracy}%</div>
                        <div className="text-xs text-gray-500">Accuracy</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">{model.name}</div>
                      {getStatusBadge(model.status)}
                      <div className="text-xs text-gray-500">Next: {model.nextPrediction.split(' ')[1]}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Models</p>
                      <p className="text-2xl font-bold">4/5</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                      <p className="text-2xl font-bold">91.1%</p>
                    </div>
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Cost Savings</p>
                      <p className="text-2xl font-bold">$47.2K</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Alerts</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Production Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={productionForecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Energy Optimization Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={energyOptimizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" fill="#6b7280" />
                      <Bar dataKey="optimized" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            {/* Prediction Models */}
            <Card>
              <CardHeader>
                <CardTitle>AI Prediction Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictionModels.map((model) => (
                    <div key={model.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(model.type)}
                          <div>
                            <h3 className="font-medium">{model.name}</h3>
                            <p className="text-sm text-gray-500">Type: {model.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(model.status)}
                          <div className="text-right">
                            <div className="text-lg font-bold">{model.accuracy}%</div>
                            <div className="text-xs text-gray-500">Accuracy</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">MAE:</span>
                          <span className="ml-1 font-medium">{model.metrics.mae}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">RMSE:</span>
                          <span className="ml-1 font-medium">{model.metrics.rmse}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">R²:</span>
                          <span className="ml-1 font-medium">{model.metrics.r2}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Next Run:</span>
                          <span className="ml-1 font-medium">{model.nextPrediction}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quality Predictions */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Predictions & Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={qualityPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="batch" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="defect_rate" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            {/* Optimization Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Driven Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationRecommendations.map((rec) => (
                    <div key={rec.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{rec.title}</h3>
                          <p className="text-sm text-gray-600">{rec.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(rec.priority)}
                          {getStatusBadge(rec.status)}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">${rec.impact.cost.toLocaleString()}</div>
                          <div className="text-xs text-blue-600">Cost Savings</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">+{rec.impact.efficiency}%</div>
                          <div className="text-xs text-green-600">Efficiency</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded">
                          <div className="text-lg font-bold text-emerald-600">+{rec.impact.sustainability}%</div>
                          <div className="text-xs text-emerald-600">Sustainability</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Implementation: {rec.implementation}</span>
                        <span>Timeline: {rec.estimatedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Optimization Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costOptimizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="current" fill="#6b7280" />
                    <Bar dataKey="optimized" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveInsights.map((insight) => (
                    <div key={insight.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium">{insight.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{insight.confidence}% confidence</Badge>
                              <Badge variant="outline">{insight.impact} impact</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span>{insight.category}</span>
                            <span>•</span>
                            <span>{insight.timeframe}</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Recommended Actions:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {insight.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Model Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Brain className="h-12 w-12 mx-auto mb-4" />
                  <p>Model performance tracking and historical accuracy trends</p>
                  <p className="text-sm">Detailed performance metrics and improvement suggestions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;