import { useState, useEffect } from "react";
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
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Leaf,
  Droplets,
  Gauge,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface SustainabilityParameters {
  biomassContent: number;
  carbonFootprint: number;
  certificationType: string;
  origin: string;
  sustainabilityScore: number;
  traceabilityId: string;
  certificateExpiry: string;
}

interface MaterialData {
  id: string;
  name: string;
  type: 'certified' | 'non-certified';
  category: 'biomass' | 'fossil' | 'recycled';
  quantity: number;
  unit: string;
  supplier: string;
  sustainability?: SustainabilityParameters;
  location: string;
  quality: string;
  lastUpdated: string;
  status: 'normal' | 'low' | 'critical';
}

const MaterialsPage = () => {
  const [materials, setMaterials] = useState<MaterialData[]>([
    {
      id: "RM-001",
      name: "Plant-based Resin",
      type: "certified",
      category: "biomass",
      quantity: 1250,
      unit: "kg",
      supplier: "Green Materials Corp",
      location: "Warehouse A-1",
      quality: "A+",
      status: "normal",
      lastUpdated: "2025-09-20 10:30",
      sustainability: {
        biomassContent: 85,
        carbonFootprint: 1.8,
        certificationType: "ISCC+",
        origin: "Southeast Asia",
        sustainabilityScore: 92,
        traceabilityId: "TRACE-001",
        certificateExpiry: "2026-01-14"
      }
    },
    {
      id: "RM-002",
      name: "Petroleum-based Resin",
      type: "non-certified",
      category: "fossil",
      quantity: 680,
      unit: "kg",
      supplier: "PetroChem Industries",
      location: "Warehouse A-2",
      quality: "A",
      status: "low",
      lastUpdated: "2025-09-20 09:15"
    },
    {
      id: "RM-003",
      name: "Recycled Carbon Fiber",
      type: "certified",
      category: "recycled",
      quantity: 420,
      unit: "kg",
      supplier: "Sustainable Supply Co",
      location: "Warehouse B-1",
      quality: "A",
      status: "normal",
      lastUpdated: "2025-09-20 11:00",
      sustainability: {
        biomassContent: 45,
        carbonFootprint: 2.1,
        certificationType: "ISCC EU",
        origin: "Europe",
        sustainabilityScore: 88,
        traceabilityId: "TRACE-002",
        certificateExpiry: "2025-11-30"
      }
    },
    {
      id: "RM-004",
      name: "Natural Fiber Reinforcement",
      type: "certified",
      category: "biomass",
      quantity: 890,
      unit: "kg",
      supplier: "BioFibers Ltd",
      location: "Warehouse B-2",
      quality: "A+",
      status: "normal",
      lastUpdated: "2025-09-20 08:45",
      sustainability: {
        biomassContent: 95,
        carbonFootprint: 0.9,
        certificationType: "ISCC+",
        origin: "South America",
        sustainabilityScore: 94,
        traceabilityId: "TRACE-003",
        certificateExpiry: "2026-03-15"
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || material.type === filterType;
    const matchesCategory = filterCategory === "all" || material.category === filterCategory;
    const matchesStatus = filterStatus === "all" || material.status === filterStatus;
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const stats = {
    totalMaterials: materials.length,
    certifiedMaterials: materials.filter(m => m.type === 'certified').length,
    totalQuantity: materials.reduce((sum, m) => sum + m.quantity, 0),
    avgSustainabilityScore: materials
      .filter(m => m.sustainability)
      .reduce((sum, m) => sum + (m.sustainability?.sustainabilityScore || 0), 0) / materials.filter(m => m.sustainability).length || 0,
    lowStockItems: materials.filter(m => m.status === 'low' || m.status === 'critical').length
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      normal: 'default',
      low: 'secondary',
      critical: 'destructive'
    } as const;

    const icons = {
      normal: <CheckCircle className="h-3 w-3" />,
      low: <Clock className="h-3 w-3" />,
      critical: <AlertTriangle className="h-3 w-3" />
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Material Management</h1>
            <p className="text-gray-600 mt-2">Manage raw materials with sustainability tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Material
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Materials</p>
                  <p className="text-2xl font-bold">{stats.totalMaterials}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certified</p>
                  <p className="text-2xl font-bold">{stats.certifiedMaterials}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Quantity</p>
                  <p className="text-2xl font-bold">{stats.totalQuantity.toLocaleString()} kg</p>
                </div>
                <Gauge className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Sustainability</p>
                  <p className="text-2xl font-bold">{stats.avgSustainabilityScore.toFixed(1)}%</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-red-600">{stats.lowStockItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search materials or suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="certified">Certified</SelectItem>
                  <SelectItem value="non-certified">Non-certified</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="biomass">Biomass</SelectItem>
                  <SelectItem value="fossil">Fossil</SelectItem>
                  <SelectItem value="recycled">Recycled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Materials List */}
        <div className="space-y-4">
          {filteredMaterials.map((material) => (
            <Card key={material.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{material.name}</h3>
                      <Badge variant={material.type === 'certified' ? 'default' : 'secondary'}>
                        {material.type}
                      </Badge>
                      <Badge variant="outline">{material.category}</Badge>
                      {getStatusBadge(material.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="ml-1 font-medium">{material.quantity} {material.unit}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Supplier:</span>
                        <span className="ml-1 font-medium">{material.supplier}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quality:</span>
                        <span className="ml-1 font-medium">{material.quality}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-1 font-medium">{material.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {material.sustainability && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Sustainability Parameters
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-green-700">Biomass Content:</span>
                        <span className="ml-1 font-medium text-green-900">{material.sustainability.biomassContent}%</span>
                      </div>
                      <div>
                        <span className="text-green-700">Carbon Footprint:</span>
                        <span className="ml-1 font-medium text-green-900">{material.sustainability.carbonFootprint} kg CO₂e/kg</span>
                      </div>
                      <div>
                        <span className="text-green-700">Certification:</span>
                        <span className="ml-1 font-medium text-green-900">{material.sustainability.certificationType}</span>
                      </div>
                      <div>
                        <span className="text-green-700">Score:</span>
                        <span className="ml-1 font-medium text-green-900">{material.sustainability.sustainabilityScore}%</span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-700">Origin:</span>
                        <span className="ml-1 font-medium text-green-900">{material.sustainability.origin}</span>
                      </div>
                      <div>
                        <span className="text-green-700">Certificate Expiry:</span>
                        <span className="ml-1 font-medium text-green-900">{material.sustainability.certificateExpiry}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Last updated: {material.lastUpdated}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;