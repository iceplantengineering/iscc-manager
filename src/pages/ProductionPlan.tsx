import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  ClipboardList,
  Factory,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  Users,
  Calendar,
  Target,
  FileText,
  Settings,
  TrendingUp,
  TrendingDown,
  Package
} from "lucide-react";

const ProductionPlanPage = () => {
  const [activeTab, setActiveTab] = useState("planning");

  // Production planning statistics
  const planStats = {
    activePlans: 8,
    completedPlans: 45,
    pendingApproval: 3,
    totalCapacity: 15000,
    utilizedCapacity: 12400,
    efficiency: 87.5
  };

  // Batch statistics
  const batchStats = {
    activeBatches: 6,
    completedToday: 12,
    plannedTomorrow: 4,
    totalProduction: 8950,
    qualityPass: 96.8
  };

  // Production plans
  const productionPlans = [
    {
      id: "PP-20250920-001",
      product: "Carbon Fiber Composite",
      planType: "Weekly",
      quantity: 2000,
      unit: "kg",
      startDate: "2025-09-20",
      endDate: "2025-09-26",
      status: "active",
      priority: "high",
      assignedLine: "Line A",
      progress: 35,
      materials: ["Certified Soybean Oil", "Carbon Fiber", "Bio-resin"],
      qualityTarget: 98
    },
    {
      id: "PP-20250919-002",
      product: "Bio-based Plastic Film",
      planType: "Daily",
      quantity: 500,
      unit: "kg",
      startDate: "2025-09-19",
      endDate: "2025-09-19",
      status: "completed",
      priority: "medium",
      assignedLine: "Line B",
      progress: 100,
      materials: ["Bio-plastic Pellets", "Green Additives"],
      qualityTarget: 95
    },
    {
      id: "PP-20250921-003",
      product: "Sustainable Packaging",
      planType: "Monthly",
      quantity: 10000,
      unit: "units",
      startDate: "2025-09-21",
      endDate: "2025-10-20",
      status: "pending",
      priority: "low",
      assignedLine: "Line C",
      progress: 0,
      materials: ["Recycled Materials", "Bio-ink"],
      qualityTarget: 92
    }
  ];

  // Active batches
  const activeBatches = [
    {
      id: "BM-20250920-001",
      planId: "PP-20250920-001",
      product: "Carbon Fiber Composite",
      batchNumber: "CF-0920-A01",
      quantity: 500,
      unit: "kg",
      startTime: "2025-09-20 08:00",
      estimatedEnd: "2025-09-20 16:00",
      status: "in_progress",
      progress: 65,
      operator: "John Smith",
      line: "Line A",
      qualityChecks: 3,
      passedChecks: 3,
      materials: [
        { name: "Certified Soybean Oil", used: 250, certified: true },
        { name: "Carbon Fiber", used: 180, certified: true },
        { name: "Bio-resin", used: 70, certified: true }
      ]
    },
    {
      id: "BM-20250920-002",
      planId: "PP-20250920-001",
      product: "Carbon Fiber Composite",
      batchNumber: "CF-0920-A02",
      quantity: 500,
      unit: "kg",
      startTime: "2025-09-20 10:00",
      estimatedEnd: "2025-09-20 18:00",
      status: "in_progress",
      progress: 40,
      operator: "Sarah Johnson",
      line: "Line A",
      qualityChecks: 2,
      passedChecks: 2,
      materials: [
        { name: "Certified Soybean Oil", used: 250, certified: true },
        { name: "Carbon Fiber", used: 180, certified: true },
        { name: "Bio-resin", used: 70, certified: true }
      ]
    }
  ];

  // Production lines
  const productionLines = [
    {
      id: "LINE-A",
      name: "Line A - Composite Production",
      status: "running",
      currentProduct: "Carbon Fiber Composite",
      efficiency: 92.5,
      uptime: 96.2,
      operator: "John Smith",
      todayProduction: 850,
      targetProduction: 1000
    },
    {
      id: "LINE-B",
      name: "Line B - Film Production",
      status: "running",
      currentProduct: "Bio-based Plastic Film",
      efficiency: 88.3,
      uptime: 94.8,
      operator: "Mike Wilson",
      todayProduction: 420,
      targetProduction: 500
    },
    {
      id: "LINE-C",
      name: "Line C - Packaging Production",
      status: "idle",
      currentProduct: null,
      efficiency: 85.7,
      uptime: 92.1,
      operator: null,
      todayProduction: 0,
      targetProduction: 800
    }
  ];

  // Recipes/formulas
  const recipes = [
    {
      id: "REC-001",
      name: "Carbon Fiber Composite Formula",
      version: "2.1",
      status: "active",
      product: "Carbon Fiber Composite",
      materials: [
        { name: "Certified Soybean Oil", percentage: 50, required: true },
        { name: "Carbon Fiber", percentage: 36, required: true },
        { name: "Bio-resin", percentage: 14, required: true }
      ],
      qualityParameters: {
        tensileStrength: "≥ 45 MPa",
        elasticity: "≥ 15%",
        biomassContent: "≥ 70%"
      },
      lastUpdated: "2025-09-15",
      updatedBy: "Dr. Chen"
    },
    {
      id: "REC-002",
      name: "Bio-based Plastic Film Formula",
      version: "1.8",
      status: "active",
      product: "Bio-based Plastic Film",
      materials: [
        { name: "Bio-plastic Pellets", percentage: 85, required: true },
        { name: "Green Additives", percentage: 15, required: true }
      ],
      qualityParameters: {
        thickness: "0.05-0.1mm",
        transparency: "≥ 85%",
        biomassContent: "≥ 80%"
      },
      lastUpdated: "2025-09-10",
      updatedBy: "Dr. Chen"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      completed: "default",
      pending: "secondary",
      in_progress: "default",
      running: "default",
      idle: "outline",
      paused: "secondary"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    } as const;

    return (
      <Badge variant={variants[priority as keyof typeof variants] || "secondary"}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const getLineStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4 text-green-600" />;
      case "idle":
        return <Pause className="h-4 w-4 text-gray-600" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-600" />;
      default:
        return <Factory className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Production Planning & Instructions</h1>
            <p className="text-gray-600 mt-2">Manage production plans, batches, and manufacturing instructions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Schedule
            </Button>
            <Link to="/production-plan/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Plans</p>
                  <p className="text-2xl font-bold">{planStats.activePlans}</p>
                  <p className="text-xs text-muted-foreground">{planStats.pendingApproval} pending</p>
                </div>
                <ClipboardList className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Batches</p>
                  <p className="text-2xl font-bold">{batchStats.activeBatches}</p>
                  <p className="text-xs text-muted-foreground">{batchStats.completedToday} completed</p>
                </div>
                <Factory className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Capacity Utilization</p>
                  <p className="text-2xl font-bold">{planStats.efficiency}%</p>
                  <p className="text-xs text-muted-foreground">{planStats.utilizedCapacity}/{planStats.totalCapacity} kg</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quality Pass Rate</p>
                  <p className="text-2xl font-bold text-green-600">{batchStats.qualityPass}%</p>
                  <p className="text-xs text-muted-foreground">Today's batches</p>
                </div>
                <Target className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="planning">Production Plans</TabsTrigger>
            <TabsTrigger value="batches">Active Batches</TabsTrigger>
            <TabsTrigger value="lines">Production Lines</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search plans..." className="pl-10 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid gap-4">
              {productionPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{plan.id}</p>
                            {getStatusBadge(plan.status)}
                            {getPriorityBadge(plan.priority)}
                          </div>
                          <p className="text-lg font-medium">{plan.product}</p>
                          <p className="text-sm text-gray-600">{plan.planType} • {plan.quantity} {plan.unit}</p>
                          <p className="text-sm text-gray-600">Line: {plan.assignedLine}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm">{plan.progress}%</span>
                          </div>
                          <Progress value={plan.progress} className="h-2 w-48" />
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Start: {plan.startDate}</p>
                          <p className="text-sm text-gray-600">End: {plan.endDate}</p>
                          <p className="text-sm text-gray-600">Quality Target: {plan.qualityTarget}%</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">Materials:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {plan.materials.map((material, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="batches" className="space-y-6">
            <div className="grid gap-4">
              {activeBatches.map((batch) => (
                <Card key={batch.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{batch.batchNumber}</p>
                            <Badge variant="outline">{batch.id}</Badge>
                            {getStatusBadge(batch.status)}
                          </div>
                          <p className="text-lg font-medium">{batch.product}</p>
                          <p className="text-sm text-gray-600">Operator: {batch.operator} • Line: {batch.line}</p>
                          <p className="text-sm text-gray-600">Quality: {batch.passedChecks}/{batch.qualityChecks} checks passed</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm">{batch.progress}%</span>
                          </div>
                          <Progress value={batch.progress} className="h-2 w-48" />
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Start: {batch.startTime}</p>
                          <p className="text-sm text-gray-600">Est. End: {batch.estimatedEnd}</p>
                          <p className="text-sm text-gray-600">Quantity: {batch.quantity} {batch.unit}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Materials Used:</p>
                          <div className="space-y-1">
                            {batch.materials.map((material, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${material.certified ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                <span className="text-sm">{material.name}: {material.used} {batch.unit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Instructions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lines" className="space-y-6">
            <div className="grid gap-4">
              {productionLines.map((line) => (
                <Card key={line.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{line.name}</p>
                            {getLineStatusIcon(line.status)}
                            {getStatusBadge(line.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {line.currentProduct ? `Current: ${line.currentProduct}` : 'Idle'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Operator: {line.operator || 'Unassigned'}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Efficiency</span>
                            <span className="text-sm">{line.efficiency}%</span>
                          </div>
                          <Progress value={line.efficiency} className="h-2 w-32" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Uptime</span>
                            <span className="text-sm">{line.uptime}%</span>
                          </div>
                          <Progress value={line.uptime} className="h-2 w-32" />
                        </div>

                        <div>
                          <p className="text-sm font-medium">Today's Production</p>
                          <p className="text-lg font-bold">{line.todayProduction} / {line.targetProduction} {line.todayProduction > 0 ? 'kg' : ''}</p>
                          <Progress value={(line.todayProduction / line.targetProduction) * 100} className="h-2 w-32" />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Monitor
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div className="grid gap-6">
              {recipes.map((recipe) => (
                <Card key={recipe.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{recipe.name}</p>
                            <Badge variant="outline">v{recipe.version}</Badge>
                            {getStatusBadge(recipe.status)}
                          </div>
                          <p className="text-sm text-gray-600">Product: {recipe.product}</p>
                          <p className="text-sm text-gray-600">Updated: {recipe.lastUpdated} by {recipe.updatedBy}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Material Composition:</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {recipe.materials.map((material, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <span className="text-sm">{material.name}</span>
                                <span className="text-sm font-medium">{material.percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Quality Parameters:</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {Object.entries(recipe.qualityParameters).map(([key, value]) => (
                              <div key={key} className="p-2 bg-gray-50 rounded">
                                <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                <p className="text-sm font-medium">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Recipe
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Production Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overall Efficiency</span>
                      <span className="font-bold">{planStats.efficiency}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Capacity Utilization</span>
                      <span className="font-bold">{Math.round((planStats.utilizedCapacity / planStats.totalCapacity) * 100)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Quality Pass Rate</span>
                      <span className="font-bold text-green-600">{batchStats.qualityPass}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Batch Time</span>
                      <span className="font-bold">6.2 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Production Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Top Product</span>
                      <span className="font-bold">Carbon Fiber Composite</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Most Efficient Line</span>
                      <span className="font-bold">Line A (92.5%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Waste Reduction</span>
                      <span className="font-bold text-green-600">-12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Energy per Unit</span>
                      <span className="font-bold">2.4 kWh/kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Optimization Opportunity</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Line C has been idle for 4 hours. Consider reallocating resources to increase overall capacity utilization by 15%.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Performance Excellence</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Quality pass rate has improved to 96.8%, exceeding the target of 95%. Maintain current quality control procedures.
                    </p>
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

export default ProductionPlanPage;