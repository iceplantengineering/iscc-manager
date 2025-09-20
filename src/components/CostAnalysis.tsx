import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calculator,
  Target,
  Zap,
  FileText,
  Download,
  Settings,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Percent,
  Activity,
  Wallet,
  Minus
} from "lucide-react";

interface CostItem {
  id: string;
  category: string;
  subcategory: string;
  material: string;
  currentCost: number;
  targetCost: number;
  previousCost: number;
  unit: string;
  monthlyUsage: number;
  trend: "up" | "down" | "stable";
  impact: "high" | "medium" | "low";
  optimizationPotential: number;
}

interface OptimizationOpportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  potentialSavings: number;
  implementationCost: number;
  paybackPeriod: number;
  difficulty: "low" | "medium" | "high";
  status: "identified" | "in-progress" | "implemented";
  priority: number;
}

const CostAnalysis = () => {
  const [costItems] = useState<CostItem[]>([
    {
      id: "COST-001",
      category: "Raw Materials",
      subcategory: "Polymers",
      material: "Carbon Fiber Composite",
      currentCost: 45.50,
      targetCost: 42.00,
      previousCost: 48.20,
      unit: "kg",
      monthlyUsage: 8500,
      trend: "down",
      impact: "high",
      optimizationPotential: 15
    },
    {
      id: "COST-002",
      category: "Raw Materials",
      subcategory: "Bio-materials",
      material: "Bio-based Polymer",
      currentCost: 38.75,
      targetCost: 35.00,
      previousCost: 37.20,
      unit: "kg",
      monthlyUsage: 6200,
      trend: "up",
      impact: "high",
      optimizationPotential: 12
    },
    {
      id: "COST-003",
      category: "Energy",
      subcategory: "Electricity",
      material: "Process Power",
      currentCost: 0.125,
      targetCost: 0.110,
      previousCost: 0.118,
      unit: "kWh",
      monthlyUsage: 24500,
      trend: "up",
      impact: "medium",
      optimizationPotential: 20
    },
    {
      id: "COST-004",
      category: "Labor",
      subcategory: "Production",
      material: "Labor Hours",
      currentCost: 28.50,
      targetCost: 26.00,
      previousCost: 29.00,
      unit: "hour",
      monthlyUsage: 4800,
      trend: "down",
      impact: "medium",
      optimizationPotential: 8
    }
  ]);

  const [opportunities] = useState<OptimizationOpportunity[]>([
    {
      id: "OPT-001",
      title: "Renewable Energy Transition",
      description: "Switch to solar power for 30% of energy consumption",
      category: "Energy",
      potentialSavings: 28500,
      implementationCost: 150000,
      paybackPeriod: 63,
      difficulty: "medium",
      status: "identified",
      priority: 1
    },
    {
      id: "OPT-002",
      title: "Bulk Purchase Optimization",
      description: "Consolidate supplier orders for volume discounts",
      category: "Raw Materials",
      potentialSavings: 42500,
      implementationCost: 5000,
      paybackPeriod: 3,
      difficulty: "low",
      status: "in-progress",
      priority: 2
    },
    {
      id: "OPT-003",
      title: "Process Automation",
      description: "Implement automated quality control systems",
      category: "Labor",
      potentialSavings: 62000,
      implementationCost: 85000,
      paybackPeriod: 16,
      difficulty: "high",
      status: "identified",
      priority: 3
    }
  ]);

  const costStats = {
    totalMonthlyCost: 2456800,
    previousMonthCost: 2580200,
    costReduction: 123400,
    reductionPercentage: 4.8,
    targetAchievement: 73,
    totalOptimizations: 28,
    activeOptimizations: 8,
    annualSavings: 1480800
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Impact</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Low Impact</Badge>;
    }
  };

  const getPriorityBadge = (priority: number) => {
    if (priority <= 2) return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
    if (priority <= 5) return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
    return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "implemented":
        return <Badge className="bg-green-100 text-green-800">Implemented</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Identified</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cost Analysis & Optimization</h1>
            <p className="text-gray-600 mt-2">Cost tracking, analysis, and optimization opportunities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Cost Overview Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Cost</p>
                  <p className="text-2xl font-bold">${(costStats.totalMonthlyCost / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cost Reduction</p>
                  <p className="text-2xl font-bold text-green-600">-{costStats.reductionPercentage}%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Target Achievement</p>
                  <p className="text-2xl font-bold text-blue-600">{costStats.targetAchievement}%</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Annual Savings</p>
                  <p className="text-2xl font-bold text-green-600">${(costStats.annualSavings / 1000).toFixed(0)}K</p>
                </div>
                <Wallet className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Distribution Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Raw Materials</span>
                  </div>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-3" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Energy</span>
                  </div>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} className="h-3" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span>Labor</span>
                  </div>
                  <span className="font-medium">20%</span>
                </div>
                <Progress value={20} className="h-3" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span>Other Costs</span>
                  </div>
                  <span className="font-medium">10%</span>
                </div>
                <Progress value={10} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>vs Last Month</span>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingDown className="h-4 w-4" />
                    -4.8% ($123,400 savings)
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>vs Last Quarter</span>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingDown className="h-4 w-4" />
                    -2.3% ($298,700 savings)
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>vs Last Year</span>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingDown className="h-4 w-4" />
                    -8.1% ($1,248,900 savings)
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Target Progress</span>
                    <span>{costStats.targetAchievement}% achieved</span>
                  </div>
                  <Progress value={costStats.targetAchievement} className="h-2 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Cost Items */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid md:grid-cols-5 gap-4">
                    {/* Cost Information */}
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{item.material}</h3>
                          <p className="text-sm text-gray-600">{item.category} • {item.subcategory}</p>
                          <div className="mt-2">{getImpactBadge(item.impact)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(item.trend)}
                          <span className="text-sm text-gray-600">{item.trend}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Monthly Usage: {item.monthlyUsage.toLocaleString()} {item.unit}
                      </p>
                    </div>

                    {/* Cost Details */}
                    <div>
                      <h4 className="font-medium mb-2">Cost Analysis</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Current:</span>
                          <span className="font-medium">${item.currentCost}/{item.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Target:</span>
                          <span className="font-medium">${item.targetCost}/{item.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Previous:</span>
                          <span className="font-medium">${item.previousCost}/{item.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Variance Analysis */}
                    <div>
                      <h4 className="font-medium mb-2">Variance Analysis</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>vs Target:</span>
                          <span className={item.currentCost > item.targetCost ? "text-red-600" : "text-green-600"}>
                            {((item.currentCost - item.targetCost) / item.targetCost * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>vs Previous:</span>
                          <span className={item.currentCost > item.previousCost ? "text-red-600" : "text-green-600"}>
                            {((item.currentCost - item.previousCost) / item.previousCost * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Monthly Impact:</span>
                          <span className="font-medium">
                            ${((item.currentCost - item.targetCost) * item.monthlyUsage).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Optimization */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium mb-2">Optimization</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Potential:</span>
                            <span className="font-medium">{item.optimizationPotential}%</span>
                          </div>
                          <Progress value={item.optimizationPotential} className="h-2" />
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Optimization Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Opportunity Details */}
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{opportunity.title}</h3>
                          <p className="text-sm text-gray-600">{opportunity.description}</p>
                          <div className="mt-2 flex gap-2">
                            {getPriorityBadge(opportunity.priority)}
                            <Badge variant="outline">{opportunity.category}</Badge>
                            {getStatusBadge(opportunity.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Impact */}
                    <div>
                      <h4 className="font-medium mb-2">Financial Impact</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Potential Savings:</span>
                          <span className="font-medium text-green-600">
                            ${opportunity.potentialSavings.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Implementation Cost:</span>
                          <span className="font-medium">
                            ${opportunity.implementationCost.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Payback Period:</span>
                          <span className="font-medium">{opportunity.paybackPeriod} months</span>
                        </div>
                      </div>
                    </div>

                    {/* Implementation */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium mb-2">Implementation</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Difficulty:</span>
                            <span>{getDifficultyBadge(opportunity.difficulty)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>ROI:</span>
                            <span className="font-medium">
                              {((opportunity.potentialSavings / opportunity.implementationCost) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mt-2">
                        <Button size="sm" className="w-full">
                          <Activity className="h-4 w-4 mr-2" />
                          {opportunity.status === "identified" ? "Start Project" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostAnalysis;