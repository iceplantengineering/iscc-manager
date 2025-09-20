import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Leaf,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Factory,
  Package,
  Users,
  Clock
} from "lucide-react";
import CarbonFootprintCalculator from "@/components/dashboard/CarbonFootprintCalculator";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");

  // Sample data for charts
  const productionData = [
    { month: 'Jan', production: 1200, efficiency: 85, biomass: 65 },
    { month: 'Feb', production: 1350, efficiency: 87, biomass: 68 },
    { month: 'Mar', production: 1180, efficiency: 89, biomass: 70 },
    { month: 'Apr', production: 1420, efficiency: 88, biomass: 72 },
    { month: 'May', production: 1580, efficiency: 90, biomass: 75 },
    { month: 'Jun', production: 1650, efficiency: 92, biomass: 78 },
    { month: 'Jul', production: 1720, efficiency: 91, biomass: 80 },
    { month: 'Aug', production: 1690, efficiency: 93, biomass: 82 },
    { month: 'Sep', production: 1850, efficiency: 92, biomass: 85 }
  ];

  const carbonFootprintData = [
    { month: 'Jan', footprint: 2.8, target: 3.0, reduction: 6.7 },
    { month: 'Feb', footprint: 2.7, target: 3.0, reduction: 10.0 },
    { month: 'Mar', footprint: 2.6, target: 3.0, reduction: 13.3 },
    { month: 'Apr', footprint: 2.5, target: 3.0, reduction: 16.7 },
    { month: 'May', footprint: 2.4, target: 3.0, reduction: 20.0 },
    { month: 'Jun', footprint: 2.3, target: 3.0, reduction: 23.3 },
    { month: 'Jul', footprint: 2.2, target: 3.0, reduction: 26.7 },
    { month: 'Aug', footprint: 2.1, target: 3.0, reduction: 30.0 },
    { month: 'Sep', footprint: 2.0, target: 3.0, reduction: 33.3 }
  ];

  const costAnalysisData = [
    { category: 'Raw Materials', value: 45, color: '#8884d8' },
    { category: 'Energy', value: 20, color: '#82ca9d' },
    { category: 'Labor', value: 15, color: '#ffc658' },
    { category: 'Overhead', value: 12, color: '#ff7c7c' },
    { category: 'Compliance', value: 8, color: '#8dd1e1' }
  ];

  const sustainabilityMetrics = [
    { metric: 'Biomass Content', current: 85, target: 90, trend: 'up' },
    { metric: 'Carbon Efficiency', current: 78, target: 85, trend: 'up' },
    { metric: 'Waste Reduction', current: 92, target: 95, trend: 'up' },
    { metric: 'Energy Usage', current: 88, target: 80, trend: 'down' },
    { metric: 'Water Usage', current: 85, target: 75, trend: 'down' }
  ];

  const keyPerformanceIndicators = [
    {
      title: "Overall Equipment Effectiveness",
      value: "87.5%",
      target: "90%",
      trend: "up",
      change: "+2.3%"
    },
    {
      title: "Quality First Pass Yield",
      value: "96.8%",
      target: "98%",
      trend: "up",
      change: "+1.2%"
    },
    {
      title: "On-Time Delivery",
      value: "94.2%",
      target: "95%",
      trend: "stable",
      change: "0%"
    },
    {
      title: "Sustainability Score",
      value: "89.3%",
      target: "92%",
      trend: "up",
      change: "+3.7%"
    },
    {
      title: "Cost per Unit",
      value: "$2.45",
      target: "$2.30",
      trend: "down",
      change: "-2.1%"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reporting</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {keyPerformanceIndicators.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                  </div>
                  {getTrendIcon(kpi.trend)}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target: {kpi.target}</span>
                  <span className={kpi.change.startsWith('+') ? 'text-green-600' : kpi.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}>
                    {kpi.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Production Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Production Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="production" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Cost Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={costAnalysisData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costAnalysisData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Sustainability Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {sustainabilityMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Current: {metric.current}%</span>
                          <span>Target: {metric.target}%</span>
                        </div>
                        <Progress value={metric.current} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Production Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Production Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="production" stroke="#8884d8" name="Production (kg)" />
                      <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Efficiency (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Biomass Content Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Biomass Content Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="biomass" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Production Efficiency Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Production Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">92.3%</div>
                    <div className="text-sm text-muted-foreground">Overall Equipment Effectiveness</div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">+2.1%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">96.8%</div>
                    <div className="text-sm text-muted-foreground">Quality Yield</div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">+0.8%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">87.5%</div>
                    <div className="text-sm text-muted-foreground">Capacity Utilization</div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">+1.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-6">
            <CarbonFootprintCalculator />
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue vs Costs */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Revenue</span>
                      <span className="text-2xl font-bold text-green-600">$456,780</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Costs</span>
                      <span className="text-2xl font-bold text-red-600">$387,650</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-lg font-medium">Net Profit</span>
                      <span className="text-2xl font-bold text-blue-600">$69,130</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Profit Margin</span>
                      <span className="text-lg font-bold">15.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Savings */}
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Cost Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Energy Efficiency</span>
                      <span className="text-lg font-bold text-green-600">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Waste Reduction</span>
                      <span className="text-lg font-bold text-green-600">$8,320</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Material Optimization</span>
                      <span className="text-lg font-bold text-green-600">$15,780</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-lg font-medium">Total Savings</span>
                      <span className="text-xl font-bold text-green-600">$36,550</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="production" stroke="#8884d8" name="Revenue (k$)" />
                    <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Costs (k$)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsPage;