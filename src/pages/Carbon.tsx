import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  TrendingUp,
  TrendingDown,
  Calculator,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  BarChart3,
  Globe,
  Factory,
  Truck,
  Droplets,
  Zap
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

const CarbonPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Carbon statistics
  const carbonStats = {
    totalFootprint: 2240,
    reductionRate: 21.4,
    biomassContent: 70,
    efficiency: 87,
    co2PerUnit: 2.0
  };

  // Monthly trend data
  const monthlyTrendData = [
    { month: 'Jan', footprint: 2850, target: 3000, biomass: 45 },
    { month: 'Feb', footprint: 2720, target: 3000, biomass: 48 },
    { month: 'Mar', footprint: 2680, target: 3000, biomass: 52 },
    { month: 'Apr', footprint: 2590, target: 3000, biomass: 55 },
    { month: 'May', footprint: 2450, target: 3000, biomass: 58 },
    { month: 'Jun', footprint: 2380, target: 3000, biomass: 62 },
    { month: 'Jul', footprint: 2320, target: 3000, biomass: 65 },
    { month: 'Aug', footprint: 2280, target: 3000, biomass: 68 },
    { month: 'Sep', footprint: 2240, target: 3000, biomass: 70 }
  ];

  // Emission breakdown data
  const emissionBreakdownData = [
    { name: 'Materials', value: 35, color: '#8884d8' },
    { name: 'Energy', value: 28, color: '#82ca9d' },
    { name: 'Transportation', value: 18, color: '#ffc658' },
    { name: 'Waste', value: 12, color: '#ff7c7c' },
    { name: 'Other', value: 7, color: '#8dd1e1' }
  ];

  // Reduction initiatives
  const reductionInitiatives = [
    {
      title: "Renewable Energy Transition",
      status: "in_progress",
      progress: 65,
      potentialReduction: 450,
      co2Reduced: 292
    },
    {
      title: "Process Optimization",
      status: "completed",
      progress: 100,
      potentialReduction: 320,
      co2Reduced: 320
    },
    {
      title: "Material Substitution",
      status: "planning",
      progress: 15,
      potentialReduction: 280,
      co2Reduced: 42
    },
    {
      title: "Logistics Optimization",
      status: "in_progress",
      progress: 40,
      potentialReduction: 180,
      co2Reduced: 72
    }
  ];

  // Targets and goals
  const targets = [
    {
      name: "2030 Net Zero",
      current: 2240,
      target: 0,
      unit: "t CO2e",
      deadline: "2030",
      progress: 21.4
    },
    {
      name: "2025 Reduction",
      current: 21.4,
      target: 25,
      unit: "%",
      deadline: "2025",
      progress: 85.6
    },
    {
      name: "Biomass Content",
      current: 70,
      target: 85,
      unit: "%",
      deadline: "2026",
      progress: 82.4
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      planning: "secondary",
      in_progress: "default",
      completed: "default",
      on_hold: "outline"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Carbon Footprint Management</h1>
            <p className="text-gray-600 mt-2">Track, analyze, and reduce carbon emissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Carbon Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Footprint</p>
                  <p className="text-2xl font-bold">{carbonStats.totalFootprint.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">t CO2e</p>
                </div>
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reduction Rate</p>
                  <p className="text-2xl font-bold text-green-600">{carbonStats.reductionRate}%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Biomass Content</p>
                  <p className="text-2xl font-bold">{carbonStats.biomassContent}%</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold">{carbonStats.efficiency}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CO2 per Unit</p>
                  <p className="text-2xl font-bold">{carbonStats.co2PerUnit}</p>
                  <p className="text-xs text-muted-foreground">kg CO2e/unit</p>
                </div>
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Carbon Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Footprint Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="footprint" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                      <Line type="monotone" dataKey="target" stroke="#22c55e" strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Emission Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Emission Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={emissionBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {emissionBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">On Track</span>
                    </div>
                    <p className="text-sm text-green-700">
                      21.4% reduction achieved, exceeding quarterly target of 15%
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Improvement</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Biomass content increased to 70%, up from 65% last quarter
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Opportunity</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Transportation emissions remain high, optimization potential identified
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <CarbonFootprintCalculator />
          </TabsContent>

          <TabsContent value="initiatives" className="space-y-6">
            <div className="grid gap-6">
              {reductionInitiatives.map((initiative, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{initiative.title}</CardTitle>
                      {getStatusBadge(initiative.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{initiative.progress}%</span>
                        </div>
                        <Progress value={initiative.progress} className="h-2" />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{initiative.co2Reduced} t</p>
                        <p className="text-sm text-muted-foreground">CO2 Reduced</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{initiative.potentialReduction} t</p>
                        <p className="text-sm text-muted-foreground">Potential Reduction</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="targets" className="space-y-6">
            <div className="grid gap-6">
              {targets.map((target, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{target.name}</CardTitle>
                      <Badge variant="outline">Target: {target.deadline}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{target.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={target.progress} className="h-2" />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {target.current} {target.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Target: {target.target} {target.unit}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Target Achievement Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Achievement Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Q1 2025: 15% Reduction Target</p>
                      <p className="text-sm text-muted-foreground">Achieved 21.4% - Exceeded target</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Q4 2025: 25% Reduction Target</p>
                      <p className="text-sm text-muted-foreground">On track for achievement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">2030: Net Zero Target</p>
                      <p className="text-sm text-muted-foreground">Long-term strategic goal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CarbonPage;