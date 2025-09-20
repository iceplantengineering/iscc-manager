import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
  Leaf,
  Factory,
  Clock,
  BarChart3
} from "lucide-react";

interface ProcessChartProps {
  data?: any;
}

const ProcessChart = ({ data }: ProcessChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedMetric, setSelectedMetric] = useState("production");

  // Production data
  const productionData = [
    { time: "00:00", production: 120, efficiency: 85, quality: 92 },
    { time: "04:00", production: 135, efficiency: 88, quality: 94 },
    { time: "08:00", production: 180, efficiency: 92, quality: 96 },
    { time: "12:00", production: 165, efficiency: 89, quality: 95 },
    { time: "16:00", production: 155, efficiency: 87, quality: 93 },
    { time: "20:00", production: 140, efficiency: 86, quality: 94 }
  ];

  // Product Distribution
  const productDistribution = [
    { name: "Carbon Fiber", value: 35, color: "#3B82F6" },
    { name: "Plastic", value: 40, color: "#10B981" },
    { name: "Composite Materials", value: 25, color: "#F59E0B" }
  ];

  // Process Efficiency
  const processEfficiency = [
    { process: "Pre-treatment", current: 92, target: 95, trend: "up" },
    { process: "Mixing", current: 88, target: 90, trend: "up" },
    { process: "Molding", current: 85, target: 88, trend: "down" },
    { process: "Curing", current: 90, target: 92, trend: "stable" },
    { process: "Finishing", current: 87, target: 90, trend: "up" }
  ];

  // Real-time Metrics
  const realTimeMetrics = [
    {
      title: "Total Production",
      value: "892 kg",
      change: "+12%",
      trend: "up",
      icon: <Factory className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      title: "Equipment Uptime",
      value: "88%",
      change: "+3%",
      trend: "up",
      icon: <Activity className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      title: "Quality Pass Rate",
      value: "94.5%",
      change: "+1.2%",
      trend: "up",
      icon: <Target className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      title: "Energy Efficiency",
      value: "87%",
      change: "-2%",
      trend: "down",
      icon: <Zap className="w-5 h-5" />,
      color: "text-orange-600"
    }
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realTimeMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-gray-100 ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Production Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Production Trends
              </CardTitle>
              <div className="flex gap-2">
                {["24h", "7d", "30d"].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="production"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  name="Production (kg)"
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  name="Efficiency (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Product Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Process Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Process Efficiency Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processEfficiency.map((process, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium w-20">{process.process}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Current: {process.current}%
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Target: {process.target}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {process.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                    {process.trend === "down" && (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-gray-600">
                      Achievement: {Math.round((process.current / process.target) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Progress value={process.current} className="h-2" />
                  <Progress value={process.target} className="h-2 opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessChart;