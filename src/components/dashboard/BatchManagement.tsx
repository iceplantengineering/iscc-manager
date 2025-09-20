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
  MapPin
} from "lucide-react";
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
  Cell
} from "recharts";

interface BatchMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  sustainability: {
    biomassContent: number;
    carbonFootprint: number;
    certificationType: string;
    sustainabilityScore: number;
  };
}

interface BatchProcessStep {
  step: number;
  name: string;
  startTime: string;
  endTime: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  operator: string;
  parameters: Record<string, any>;
  energyConsumption: number;
  utilityUsage: {
    water: number;
    steam: number;
    electricity: number;
  };
  qualityMetrics: {
    temperature: number;
    pressure: number;
    ph: number | null;
    viscosity: number | null;
  };
}

interface BatchData {
  id: string;
  batchNumber: string;
  productType: string;
  plannedQuantity: number;
  actualQuantity: number;
  unit: string;
  status: 'planned' | 'in_progress' | 'completed' | 'quality_check' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  productionLine: string;
  startTime: string;
  endTime: string | null;
  estimatedDuration: number;
  actualDuration: number | null;
  materials: BatchMaterial[];
  processSteps: BatchProcessStep[];
  quality: {
    grade: string;
    yield: number;
    defects: number;
    inspectionResults: any[];
  };
  sustainability: {
    totalBiomassContent: number;
    totalCarbonFootprint: number;
    massBalanceVerified: boolean;
    isccCompliance: 'pending' | 'compliant' | 'non_compliant';
  };
  operator: string;
  supervisor: string;
  location: string;
  equipment: string[];
  notes: string[];
}

const BatchManagement = () => {
  const [batches, setBatches] = useState<BatchData[]>([
    {
      id: 'B-001',
      batchNumber: 'BM-20250920-001',
      productType: 'Carbon Fiber Composite',
      plannedQuantity: 1000,
      actualQuantity: 985,
      unit: 'kg',
      status: 'completed',
      priority: 'high',
      productionLine: 'Line 1',
      startTime: '2025-09-20 08:00:00',
      endTime: '2025-09-20 16:30:00',
      estimatedDuration: 8.5,
      actualDuration: 8.5,
      materials: [
        {
          id: 'M-001',
          name: 'Plant-based Resin',
          quantity: 600,
          unit: 'kg',
          sustainability: {
            biomassContent: 85,
            carbonFootprint: 1.8,
            certificationType: 'ISCC+',
            sustainabilityScore: 92
          }
        },
        {
          id: 'M-002',
          name: 'Carbon Fiber',
          quantity: 400,
          unit: 'kg',
          sustainability: {
            biomassContent: 45,
            carbonFootprint: 2.1,
            certificationType: 'ISCC EU',
            sustainabilityScore: 88
          }
        }
      ],
      processSteps: [
        {
          step: 1,
          name: 'Material Preparation',
          startTime: '2025-09-20 08:00:00',
          endTime: '2025-09-20 09:30:00',
          status: 'completed',
          operator: 'Operator A',
          parameters: { mixing_speed: 120, temperature: 180 },
          energyConsumption: 45,
          utilityUsage: { water: 50, steam: 30, electricity: 85 },
          qualityMetrics: { temperature: 180, pressure: 2.5, ph: null, viscosity: null }
        },
        {
          step: 2,
          name: 'Extrusion Process',
          startTime: '2025-09-20 09:30:00',
          endTime: '2025-09-20 12:00:00',
          status: 'completed',
          operator: 'Operator A',
          parameters: { extrusion_speed: 2.5, die_pressure: 85 },
          energyConsumption: 120,
          utilityUsage: { water: 80, steam: 60, electricity: 200 },
          qualityMetrics: { temperature: 220, pressure: 85, ph: null, viscosity: 850 }
        }
      ],
      quality: {
        grade: 'A',
        yield: 98.5,
        defects: 3,
        inspectionResults: []
      },
      sustainability: {
        totalBiomassContent: 68,
        totalCarbonFootprint: 1.9,
        massBalanceVerified: true,
        isccCompliance: 'compliant'
      },
      operator: 'Operator A',
      supervisor: 'Supervisor X',
      location: 'Production Hall A',
      equipment: ['Extruder-1', 'Mixer-2', 'Quality Scanner-3'],
      notes: ['Production completed successfully', 'Quality parameters within specifications']
    },
    {
      id: 'B-002',
      batchNumber: 'BM-20250920-002',
      productType: 'Bioplastic Compound',
      plannedQuantity: 750,
      actualQuantity: 0,
      unit: 'kg',
      status: 'in_progress',
      priority: 'medium',
      productionLine: 'Line 2',
      startTime: '2025-09-20 10:00:00',
      endTime: null,
      estimatedDuration: 6,
      actualDuration: null,
      materials: [
        {
          id: 'M-003',
          name: 'Biopolymer Resin',
          quantity: 500,
          unit: 'kg',
          sustainability: {
            biomassContent: 95,
            carbonFootprint: 1.2,
            certificationType: 'ISCC+',
            sustainabilityScore: 96
          }
        },
        {
          id: 'M-004',
          name: 'Natural Fibers',
          quantity: 250,
          unit: 'kg',
          sustainability: {
            biomassContent: 100,
            carbonFootprint: 0.8,
            certificationType: 'ISCC EU',
            sustainabilityScore: 98
          }
        }
      ],
      processSteps: [
        {
          step: 1,
          name: 'Material Preparation',
          startTime: '2025-09-20 10:00:00',
          endTime: null,
          status: 'in_progress',
          operator: 'Operator B',
          parameters: { mixing_speed: 100, temperature: 160 },
          energyConsumption: 35,
          utilityUsage: { water: 40, steam: 25, electricity: 70 },
          qualityMetrics: { temperature: 162, pressure: 2.2, ph: null, viscosity: null }
        }
      ],
      quality: {
        grade: 'pending',
        yield: 0,
        defects: 0,
        inspectionResults: []
      },
      sustainability: {
        totalBiomassContent: 96.7,
        totalCarbonFootprint: 1.1,
        massBalanceVerified: false,
        isccCompliance: 'pending'
      },
      operator: 'Operator B',
      supervisor: 'Supervisor Y',
      location: 'Production Hall B',
      equipment: ['Mixer-3', 'Reactor-2'],
      notes: ['Production in progress']
    }
  ]);

  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      planned: 'secondary',
      in_progress: 'default',
      completed: 'default',
      quality_check: 'secondary',
      failed: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'secondary',
      medium: 'default',
      high: 'default',
      urgent: 'destructive'
    } as const;

    return (
      <Badge variant={variants[priority as keyof typeof variants] || 'secondary'}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.productType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const batchStats = {
    total: batches.length,
    inProgress: batches.filter(b => b.status === 'in_progress').length,
    completed: batches.filter(b => b.status === 'completed').length,
    avgYield: batches.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.quality.yield, 0) / batches.filter(b => b.status === 'completed').length || 0,
    avgBiomassContent: batches.reduce((sum, b) => sum + b.sustainability.totalBiomassContent, 0) / batches.length
  };

  const performanceData = [
    { month: 'Jan', yield: 96.5, efficiency: 85, biomass: 65 },
    { month: 'Feb', yield: 97.2, efficiency: 87, biomass: 68 },
    { month: 'Mar', yield: 98.1, efficiency: 89, biomass: 70 },
    { month: 'Apr', yield: 97.8, efficiency: 88, biomass: 72 },
    { month: 'May', yield: 98.5, efficiency: 90, biomass: 75 },
    { month: 'Jun', yield: 99.1, efficiency: 92, biomass: 78 },
    { month: 'Jul', yield: 98.8, efficiency: 91, biomass: 80 },
    { month: 'Aug', yield: 99.3, efficiency: 93, biomass: 82 },
    { month: 'Sep', yield: 98.9, efficiency: 92, biomass: 85 }
  ];

  const generateBatchId = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const sequence = String(batches.length + 1).padStart(3, '0');
    return `BM-${timestamp}-${sequence}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Batch Management System</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => setShowCreateBatch(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Batch
          </Button>
        </div>
      </div>

      {/* Batch Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Batches</p>
                <p className="text-2xl font-bold">{batchStats.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{batchStats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{batchStats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Yield</p>
                <p className="text-2xl font-bold">{batchStats.avgYield.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Biomass</p>
                <p className="text-2xl font-bold">{batchStats.avgBiomassContent.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="batches" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="batches">Batch Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="planning">Production Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="batches" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search batch numbers or product types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Batch List */}
          <div className="space-y-4">
            {filteredBatches.map((batch) => (
              <Card key={batch.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(batch.status)}
                      <div>
                        <CardTitle className="text-lg">{batch.batchNumber}</CardTitle>
                        <p className="text-sm text-muted-foreground">{batch.productType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(batch.status)}
                      {getPriorityBadge(batch.priority)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Quantity</Label>
                      <p className="text-sm font-medium">
                        {batch.actualQuantity || batch.plannedQuantity} {batch.unit}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Production Line</Label>
                      <p className="text-sm font-medium">{batch.productionLine}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Duration</Label>
                      <p className="text-sm font-medium">
                        {batch.actualDuration || batch.estimatedDuration}h
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Operator</Label>
                      <p className="text-sm font-medium">{batch.operator}</p>
                    </div>
                  </div>

                  {/* Sustainability Metrics */}
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Biomass Content</Label>
                        <p className="font-medium">{batch.sustainability.totalBiomassContent}%</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Carbon Footprint</Label>
                        <p className="font-medium">{batch.sustainability.totalCarbonFootprint} kg CO₂e/kg</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Mass Balance</Label>
                        <p className="font-medium">
                          {batch.sustainability.massBalanceVerified ? 'Verified' : 'Pending'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">ISCC Compliance</Label>
                        <Badge variant={batch.sustainability.isccCompliance === 'compliant' ? 'default' : 'secondary'}>
                          {batch.sustainability.isccCompliance.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="mb-4">
                    <Label className="text-sm font-medium text-gray-600 mb-2 block">Process Steps</Label>
                    <div className="flex gap-2 overflow-x-auto">
                      {batch.processSteps.map((step, index) => (
                        <div key={step.step} className="flex-shrink-0 text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            step.status === 'completed' ? 'bg-green-100 text-green-800' :
                            step.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            step.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {step.step}
                          </div>
                          <p className="text-xs mt-1">{step.name.split(' ')[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{batch.supervisor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{batch.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Batch Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="yield" stroke="#8884d8" name="Yield %" />
                    <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" name="Efficiency %" />
                    <Line type="monotone" dataKey="biomass" stroke="#ffc658" name="Biomass %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Equipment Effectiveness</span>
                    <span className="font-bold">87.5%</span>
                  </div>
                  <Progress value={87.5} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Quality First Pass Yield</span>
                    <span className="font-bold">96.8%</span>
                  </div>
                  <Progress value={96.8} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>On-Time Delivery</span>
                    <span className="font-bold">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Sustainability Score</span>
                    <span className="font-bold">89.3%</span>
                  </div>
                  <Progress value={89.3} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Planning & Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="productType">Product Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carbon_fiber">Carbon Fiber Composite</SelectItem>
                        <SelectItem value="bioplastic">Bioplastic Compound</SelectItem>
                        <SelectItem value="recycled">Recycled Materials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input type="number" placeholder="Enter quantity" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">Create Production Plan</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Production Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Carbon Fiber Composite</p>
                    <p className="text-sm text-muted-foreground">Tomorrow 08:00 - Line 1</p>
                  </div>
                  <Badge>500kg</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Bioplastic Compound</p>
                    <p className="text-sm text-muted-foreground">Tomorrow 10:00 - Line 2</p>
                  </div>
                  <Badge>750kg</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchManagement;