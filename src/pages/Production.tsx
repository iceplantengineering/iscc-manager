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
  Factory,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Play,
  Pause
} from "lucide-react";
import BatchManagement from "@/components/dashboard/BatchManagement";

const ProductionPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Production statistics
  const productionStats = {
    activeBatches: 3,
    completedToday: 12,
    totalOutput: 2850,
    efficiency: 87.5,
    qualityRate: 96.8
  };

  // Production lines status
  const productionLines = [
    {
      id: 1,
      name: "Line 1 - Carbon Fiber",
      status: "active",
      currentBatch: "BM-20250920-001",
      efficiency: 92,
      output: 450,
      operator: "Operator A",
      supervisor: "Supervisor X"
    },
    {
      id: 2,
      name: "Line 2 - Bioplastic",
      status: "active",
      currentBatch: "BM-20250920-002",
      efficiency: 85,
      output: 320,
      operator: "Operator B",
      supervisor: "Supervisor Y"
    },
    {
      id: 3,
      name: "Line 3 - Composite Materials",
      status: "maintenance",
      currentBatch: null,
      efficiency: 0,
      output: 0,
      operator: "Maintenance",
      supervisor: "Supervisor Z"
    }
  ];

  // Upcoming schedules
  const upcomingSchedules = [
    {
      id: "SCH-001",
      product: "Carbon Fiber Composite",
      quantity: 500,
      unit: "kg",
      startTime: "2025-09-21 08:00",
      line: "Line 1",
      priority: "high",
      status: "scheduled"
    },
    {
      id: "SCH-002",
      product: "Bioplastic Compound",
      quantity: 750,
      unit: "kg",
      startTime: "2025-09-21 10:00",
      line: "Line 2",
      priority: "medium",
      status: "scheduled"
    },
    {
      id: "SCH-003",
      product: "Recycled Materials",
      quantity: 300,
      unit: "kg",
      startTime: "2025-09-21 13:00",
      line: "Line 3",
      priority: "low",
      status: "pending"
    }
  ];

  const getLineStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-4 w-4 text-green-600" />;
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Pause className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLineStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      maintenance: "secondary",
      idle: "outline"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.toUpperCase()}
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Production Management</h1>
            <p className="text-gray-600 mt-2">Batch management and production planning</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Batch
            </Button>
          </div>
        </div>

        {/* Production Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Batches</p>
                  <p className="text-2xl font-bold">{productionStats.activeBatches}</p>
                </div>
                <Factory className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold">{productionStats.completedToday}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Output</p>
                  <p className="text-2xl font-bold">{productionStats.totalOutput} kg</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold">{productionStats.efficiency}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quality Rate</p>
                  <p className="text-2xl font-bold">{productionStats.qualityRate}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="batches">Batch Management</TabsTrigger>
            <TabsTrigger value="lines">Production Lines</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Production Lines Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Production Lines Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productionLines.map((line) => (
                      <div key={line.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getLineStatusIcon(line.status)}
                          <div>
                            <p className="font-medium">{line.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {line.currentBatch ? `Batch: ${line.currentBatch}` : "No active batch"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getLineStatusBadge(line.status)}
                          <p className="text-sm text-muted-foreground mt-1">
                            {line.efficiency > 0 ? `${line.efficiency}% efficiency` : "Offline"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border-l-4 border-green-500 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">Batch BM-20250920-001 completed</p>
                        <p className="text-sm text-muted-foreground">Line 1 - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                      <Play className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium">Batch BM-20250920-003 started</p>
                        <p className="text-sm text-muted-foreground">Line 2 - 30 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="font-medium">Line 3 maintenance started</p>
                        <p className="text-sm text-muted-foreground">Scheduled for 4 hours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="batches" className="space-y-6">
            <BatchManagement />
          </TabsContent>

          <TabsContent value="lines" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productionLines.map((line) => (
                <Card key={line.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{line.name}</CardTitle>
                      {getLineStatusBadge(line.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Batch</span>
                        <span className="font-medium">{line.currentBatch || "None"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Efficiency</span>
                        <span className="font-medium">{line.efficiency}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Output Today</span>
                        <span className="font-medium">{line.output} kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Operator</span>
                        <span className="font-medium">{line.operator}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Supervisor</span>
                        <span className="font-medium">{line.supervisor}</span>
                      </div>
                      <div className="pt-2">
                        <Progress value={line.efficiency} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        {line.status === "active" && (
                          <Button variant="outline" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduling" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Production Schedule</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Schedule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSchedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{schedule.product}</h4>
                          {getPriorityBadge(schedule.priority)}
                          <Badge variant="outline">{schedule.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <span className="ml-1 font-medium">{schedule.quantity} {schedule.unit}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Start Time:</span>
                            <span className="ml-1 font-medium">{schedule.startTime}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Line:</span>
                            <span className="ml-1 font-medium">{schedule.line}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ID:</span>
                            <span className="ml-1 font-medium">{schedule.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductionPage;