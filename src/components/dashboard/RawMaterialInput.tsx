import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gauge, Droplets, Leaf, Plus, Search, Filter, Download, Upload } from "lucide-react";

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
}

interface RawMaterialData {
  petroleumBased: number;
  plantBased: number;
  total: number;
  biomassRatio: number;
}

interface RawMaterialInputProps {
  data: RawMaterialData;
}

export function RawMaterialInput({ data }: RawMaterialInputProps) {
  const { petroleumBased, plantBased, total, biomassRatio } = data;
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Sample material data with sustainability parameters
  const materials: MaterialData[] = [
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
    }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || material.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const certifiedMaterials = materials.filter(m => m.type === "certified");
  const totalCertifiedQuantity = certifiedMaterials.reduce((sum, m) => sum + m.quantity, 0);
  const avgSustainabilityScore = certifiedMaterials.length > 0
    ? Math.round(certifiedMaterials.reduce((sum, m) => sum + (m.sustainability?.sustainabilityScore || 0), 0) / certifiedMaterials.length)
    : 0;

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Droplets className="mr-2 h-5 w-5" />
            Raw Material Input & Biomass Ratio Display
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Raw Material Input Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="kpi-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Petroleum-based Materials</p>
                  <p className="text-2xl font-bold text-gray-700">{petroleumBased}kg</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Plant-based Materials</p>
                  <p className="text-2xl font-bold text-green-600">{plantBased}kg</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="kpi-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Input</p>
                  <p className="text-2xl font-bold text-primary">{total}kg</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Biomass Ratio Gauge */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Biomass Ratio</h3>
              <Badge
                variant="outline"
                className={`text-lg px-3 py-1 ${
                  biomassRatio >= 30 ? 'bg-green-50 text-green-700 border-green-200' :
                  biomassRatio >= 20 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {biomassRatio}%
              </Badge>
            </div>

            <div className="space-y-2">
              <Progress
                value={biomassRatio}
                className="h-4"
                style={{
                  background: `linear-gradient(to right,
                    hsl(var(--biomass)) 0%,
                    hsl(var(--biomass)) ${biomassRatio}%,
                    hsl(var(--muted)) ${biomassRatio}%,
                    hsl(var(--muted)) 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>Target: 30%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Real-time Input Status */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Real-time Input Status</span>
              <div className="flex items-center space-x-2">
                <div className="status-indicator status-active"></div>
                <span className="text-sm text-green-600">Inputting</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Material Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Sustainable Material Management
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Certified Materials</p>
                        <p className="text-2xl font-bold">{certifiedMaterials.length}</p>
                      </div>
                      <Badge variant="default">{totalCertifiedQuantity}kg</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Sustainability Score</p>
                        <p className="text-2xl font-bold">{avgSustainabilityScore}%</p>
                      </div>
                      <Badge variant="secondary">Excellent</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                        <p className="text-2xl font-bold">1.9</p>
                      </div>
                      <Badge variant="outline">kg CO₂e/kg</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search materials or suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
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
              </div>

              <div className="space-y-3">
                {filteredMaterials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{material.name}</h4>
                            <Badge variant={material.type === 'certified' ? 'default' : 'secondary'}>
                              {material.type}
                            </Badge>
                            <Badge variant="outline">{material.category}</Badge>
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
                          {material.sustainability && (
                            <div className="mt-3 p-3 bg-green-50 rounded-lg">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Biomass:</span>
                                  <span className="ml-1 font-medium">{material.sustainability.biomassContent}%</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Carbon:</span>
                                  <span className="ml-1 font-medium">{material.sustainability.carbonFootprint} kg CO₂e/kg</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Certification:</span>
                                  <span className="ml-1 font-medium">{material.sustainability.certificationType}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Score:</span>
                                  <span className="ml-1 font-medium">{material.sustainability.sustainabilityScore}%</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sustainability" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sustainability Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Certified Material Ratio</span>
                        <span className="font-bold">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span>Average Biomass Content</span>
                        <span className="font-bold">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span>Carbon Efficiency</span>
                        <span className="font-bold">Good</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>ISCC+ Compliance</span>
                        <Badge variant="default">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mass Balance Method</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Traceability</span>
                        <Badge variant="default">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Documentation</span>
                        <Badge variant="secondary">Up to date</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}