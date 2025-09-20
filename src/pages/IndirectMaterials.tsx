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
  Wrench,
  Zap,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Settings,
  Thermometer,
  Gauge,
  Activity,
  Recycle,
  Package,
  Truck
} from "lucide-react";

const IndirectMaterialsPage = () => {
  const [activeTab, setActiveTab] = useState("energy");

  // Energy consumption statistics
  const energyStats = {
    totalConsumption: 24500,
    renewableEnergy: 7350,
    efficiency: 87.5,
    costPerKwh: 0.12,
    monthlySavings: 3200
  };

  // Utility statistics
  const utilityStats = {
    waterUsage: 15000,
    steamUsage: 8500,
    compressedAir: 3200,
    totalCost: 45600,
    efficiencyImprovement: 12.5
  };

  // Energy consumption data
  const energyConsumption = [
    {
      id: "ENERGY-001",
      type: "Electricity",
      source: "Grid",
      consumption: 12500,
      unit: "kWh",
      cost: 1500,
      renewable: 30,
      efficiency: 92,
      monitoringPoint: "Main Line A",
      status: "active"
    },
    {
      id: "ENERGY-002",
      type: "Natural Gas",
      source: "Utility",
      consumption: 8500,
      unit: "m³",
      cost: 1020,
      renewable: 0,
      efficiency: 88,
      monitoringPoint: "Boiler Room",
      status: "active"
    },
    {
      id: "ENERGY-003",
      type: "Solar",
      source: "On-site",
      consumption: 3500,
      unit: "kWh",
      cost: 0,
      renewable: 100,
      efficiency: 95,
      monitoringPoint: "Roof Panels",
      status: "active"
    }
  ];

  // Water usage data
  const waterUsage = [
    {
      id: "WATER-001",
      type: "Process Water",
      source: "Municipal",
      consumption: 8500,
      unit: "L",
      cost: 425,
      recycled: 25,
      quality: "Standard",
      monitoringPoint: "Production Line A",
      status: "active"
    },
    {
      id: "WATER-002",
      type: "Cooling Water",
      source: "Recycled",
      consumption: 4500,
      unit: "L",
      cost: 135,
      recycled: 85,
      quality: "Treated",
      monitoringPoint: "Cooling System",
      status: "active"
    },
    {
      id: "WATER-003",
      type: "Sanitary Water",
      source: "Municipal",
      consumption: 2000,
      unit: "L",
      cost: 100,
      recycled: 0,
      quality: "Potable",
      monitoringPoint: "Facilities",
      status: "active"
    }
  ];

  // Chemical and cleaning agents
  const chemicals = [
    {
      id: "CHEM-001",
      name: "Bio-based Cleaning Agent",
      category: "Cleaning",
      supplier: "EcoClean Solutions",
      inventory: 250,
      unit: "L",
      minStock: 50,
      safetyRating: "Low",
      ecoFriendly: true,
      monthlyUsage: 45,
      costPerUnit: 12.50,
      location: "Storage Room A-01"
    },
    {
      id: "CHEM-002",
      name: "Industrial Degreaser",
      category: "Maintenance",
      supplier: "Industrial Supplies Co",
      inventory: 80,
      unit: "L",
      minStock: 30,
      safetyRating: "Medium",
      ecoFriendly: false,
      monthlyUsage: 25,
      costPerUnit: 8.75,
      location: "Storage Room B-02"
    },
    {
      id: "CHEM-003",
      name: "Water Treatment Chemical",
      category: "Treatment",
      supplier: "WaterTech Inc",
      inventory: 500,
      unit: "kg",
      minStock: 100,
      safetyRating: "Medium",
      ecoFriendly: true,
      monthlyUsage: 85,
      costPerUnit: 15.20,
      location: "Treatment Plant"
    }
  ];

  // Packaging materials
  const packagingMaterials = [
    {
      id: "PKG-001",
      name: "Recycled Cardboard Boxes",
      type: "Primary",
      material: "Recycled Paper",
      inventory: 1500,
      unit: "units",
      minStock: 300,
      sustainability: 95,
      supplier: "GreenPack Solutions",
      monthlyUsage: 320,
      costPerUnit: 0.45,
      location: "Packaging Area A"
    },
    {
      id: "PKG-002",
      name: "Bio-based Stretch Film",
      type: "Secondary",
      material: "PLA",
      inventory: 850,
      unit: "m",
      minStock: 200,
      sustainability: 88,
      supplier: "BioFilm Technologies",
      monthlyUsage: 180,
      costPerUnit: 0.12,
      location: "Packaging Area B"
    },
    {
      id: "PKG-003",
      name: "Compostable Labels",
      type: "Tertiary",
      material: "Biodegradable Paper",
      inventory: 5000,
      unit: "units",
      minStock: 1000,
      sustainability: 92,
      supplier: "EcoLabel Co",
      monthlyUsage: 1200,
      costPerUnit: 0.03,
      location: "Packaging Area C"
    }
  ];

  // Maintenance supplies
  const maintenanceSupplies = [
    {
      id: "MAINT-001",
      name: "Bio-lubricant",
      category: "Lubricants",
      supplier: "BioLube Inc",
      inventory: 45,
      unit: "L",
      minStock: 10,
      usage: "Machinery",
      ecoFriendly: true,
      monthlyUsage: 8,
      costPerUnit: 25.50,
      location: "Maintenance Room"
    },
    {
      id: "MAINT-002",
      name: "Industrial Gloves",
      category: "PPE",
      supplier: "SafetyFirst Co",
      inventory: 200,
      unit: "pairs",
      minStock: 50,
      usage: "General",
      ecoFriendly: false,
      monthlyUsage: 35,
      costPerUnit: 2.75,
      location: "Safety Equipment"
    },
    {
      id: "MAINT-003",
      name: "Recycle Rags",
      category: "Cleaning",
      supplier: "WasteNot Solutions",
      inventory: 150,
      unit: "kg",
      minStock: 30,
      usage: "Cleaning",
      ecoFriendly: true,
      monthlyUsage: 25,
      costPerUnit: 1.20,
      location: "Cleaning Supplies"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      maintenance: "outline",
      alert: "destructive"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getSafetyBadge = (rating: string) => {
    const variants = {
      low: "default",
      medium: "secondary",
      high: "destructive"
    } as const;

    return (
      <Badge variant={variants[rating as keyof typeof variants] || "secondary"}>
        {rating.toUpperCase()} RISK
      </Badge>
    );
  };

  const getEcoIcon = (ecoFriendly: boolean) => {
    return ecoFriendly ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
    );
  };

  const calculateUsagePercentage = (used: number, total: number) => {
    return Math.min((used / total) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Indirect Materials & Utilities</h1>
            <p className="text-gray-600 mt-2">Manage energy, utilities, chemicals, and indirect materials</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Energy Usage</p>
                  <p className="text-2xl font-bold">{energyStats.totalConsumption.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{Math.round((energyStats.renewableEnergy / energyStats.totalConsumption) * 100)}% renewable</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Water Usage</p>
                  <p className="text-2xl font-bold">{utilityStats.waterUsage.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Liters today</p>
                </div>
                <Droplets className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chemical Inventory</p>
                  <p className="text-2xl font-bold">{chemicals.length}</p>
                  <p className="text-xs text-muted-foreground">{chemicals.filter(c => c.ecoFriendly).length} eco-friendly</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">${utilityStats.totalCost.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Monthly utilities</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="chemicals">Chemicals</TabsTrigger>
            <TabsTrigger value="packaging">Packaging</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="energy" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Energy Consumption Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Consumption</span>
                      <span className="font-bold">{energyStats.totalConsumption.toLocaleString()} kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Renewable Energy</span>
                      <span className="font-bold text-green-600">{energyStats.renewableEnergy.toLocaleString()} kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Energy Efficiency</span>
                      <span className="font-bold">{energyStats.efficiency}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cost per kWh</span>
                      <span className="font-bold">${energyStats.costPerKwh}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Monthly Savings</span>
                      <span className="font-bold text-green-600">${energyStats.monthlySavings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Energy Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {energyConsumption.map((energy) => (
                      <div key={energy.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{energy.type}</p>
                            {getStatusBadge(energy.status)}
                          </div>
                          <span className="text-sm text-gray-600">{energy.consumption.toLocaleString()} {energy.unit}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Source: </span>
                            <span>{energy.source}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Cost: </span>
                            <span>${energy.cost}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Renewable: </span>
                            <span className={energy.renewable > 0 ? "text-green-600" : ""}>{energy.renewable}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Efficiency: </span>
                            <span>{energy.efficiency}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="water" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Water Usage Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Water Usage</span>
                      <span className="font-bold">{utilityStats.waterUsage.toLocaleString()} L</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Steam Usage</span>
                      <span className="font-bold">{utilityStats.steamUsage.toLocaleString()} kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Compressed Air</span>
                      <span className="font-bold">{utilityStats.compressedAir.toLocaleString()} m³</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Cost</span>
                      <span className="font-bold">${utilityStats.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Efficiency Improvement</span>
                      <span className="font-bold text-green-600">+{utilityStats.efficiencyImprovement}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Water Sources & Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {waterUsage.map((water) => (
                      <div key={water.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{water.type}</p>
                            {getStatusBadge(water.status)}
                          </div>
                          <span className="text-sm text-gray-600">{water.consumption.toLocaleString()} {water.unit}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Source: </span>
                            <span>{water.source}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Cost: </span>
                            <span>${water.cost}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Recycled: </span>
                            <span className={water.recycled > 0 ? "text-green-600" : ""}>{water.recycled}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Quality: </span>
                            <span>{water.quality}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chemicals" className="space-y-6">
            <div className="grid gap-4">
              {chemicals.map((chemical) => (
                <Card key={chemical.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{chemical.name}</p>
                            {getEcoIcon(chemical.ecoFriendly)}
                            {getSafetyBadge(chemical.safetyRating)}
                          </div>
                          <p className="text-sm text-gray-600">Category: {chemical.category}</p>
                          <p className="text-sm text-gray-600">Supplier: {chemical.supplier}</p>
                          <p className="text-sm text-gray-600">Location: {chemical.location}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Inventory Level</span>
                            <span className="text-sm">{chemical.inventory} / {chemical.minStock * 5} {chemical.unit}</span>
                          </div>
                          <Progress
                            value={calculateUsagePercentage(chemical.inventory, chemical.minStock * 5)}
                            className="h-2 w-48"
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Min: {chemical.minStock}</span>
                            <span>Monthly Usage: {chemical.monthlyUsage}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Cost Information</p>
                          <p className="text-sm text-gray-600">${chemical.costPerUnit} per {chemical.unit}</p>
                          <p className="text-sm text-gray-600">Monthly Cost: ${(chemical.monthlyUsage * chemical.costPerUnit).toFixed(2)}</p>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packaging" className="space-y-6">
            <div className="grid gap-4">
              {packagingMaterials.map((pkg) => (
                <Card key={pkg.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{pkg.name}</p>
                            <Badge variant="outline">{pkg.type}</Badge>
                            <Badge variant={pkg.sustainability > 90 ? "default" : "secondary"}>
                              {pkg.sustainability}% Sustainable
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Material: {pkg.material}</p>
                          <p className="text-sm text-gray-600">Supplier: {pkg.supplier}</p>
                          <p className="text-sm text-gray-600">Location: {pkg.location}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Inventory Level</span>
                            <span className="text-sm">{pkg.inventory} / {pkg.minStock * 5} {pkg.unit}</span>
                          </div>
                          <Progress
                            value={calculateUsagePercentage(pkg.inventory, pkg.minStock * 5)}
                            className="h-2 w-48"
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Min: {pkg.minStock}</span>
                            <span>Monthly Usage: {pkg.monthlyUsage}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Cost Information</p>
                          <p className="text-sm text-gray-600">${pkg.costPerUnit} per {pkg.unit}</p>
                          <p className="text-sm text-gray-600">Monthly Cost: ${(pkg.monthlyUsage * pkg.costPerUnit).toFixed(2)}</p>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid gap-4">
              {maintenanceSupplies.map((supply) => (
                <Card key={supply.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{supply.name}</p>
                            <Badge variant="outline">{supply.category}</Badge>
                            {getEcoIcon(supply.ecoFriendly)}
                          </div>
                          <p className="text-sm text-gray-600">Supplier: {supply.supplier}</p>
                          <p className="text-sm text-gray-600">Usage: {supply.usage}</p>
                          <p className="text-sm text-gray-600">Location: {supply.location}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Inventory Level</span>
                            <span className="text-sm">{supply.inventory} / {supply.minStock * 5} {supply.unit}</span>
                          </div>
                          <Progress
                            value={calculateUsagePercentage(supply.inventory, supply.minStock * 5)}
                            className="h-2 w-48"
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Min: {supply.minStock}</span>
                            <span>Monthly Usage: {supply.monthlyUsage}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium">Cost Information</p>
                          <p className="text-sm text-gray-600">${supply.costPerUnit} per {supply.unit}</p>
                          <p className="text-sm text-gray-600">Monthly Cost: ${(supply.monthlyUsage * supply.costPerUnit).toFixed(2)}</p>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndirectMaterialsPage;