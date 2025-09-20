import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Building,
  Truck,
  FileText,
  Award,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Mail,
  Phone,
  Globe,
  Package,
  BarChart3,
  Star,
  Clock
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  location: string;
  category: string;
  certificationStatus: "certified" | "pending" | "non-certified";
  sustainabilityScore: number;
  reliabilityScore: number;
  totalOrders: number;
  lastDelivery: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  materials: string[];
  performance: {
    onTimeDelivery: number;
    qualityScore: number;
    priceCompetitiveness: number;
    responsiveness: number;
  };
}

const SupplierPortal = () => {
  const [suppliers] = useState<Supplier[]>([
    {
      id: "SUP-001",
      name: "Green Materials Inc.",
      location: "Germany",
      category: "Raw Materials",
      certificationStatus: "certified",
      sustainabilityScore: 92,
      reliabilityScore: 88,
      totalOrders: 45,
      lastDelivery: "2025-09-19",
      contact: {
        email: "contact@greenmaterials.de",
        phone: "+49 123 456789",
        website: "www.greenmaterials.de"
      },
      materials: ["Recycled Plastics", "Bio-based Polymers"],
      performance: {
        onTimeDelivery: 95,
        qualityScore: 92,
        priceCompetitiveness: 78,
        responsiveness: 90
      }
    },
    {
      id: "SUP-002",
      name: "EcoChem Solutions",
      location: "Netherlands",
      category: "Chemicals",
      certificationStatus: "certified",
      sustainabilityScore: 87,
      reliabilityScore: 91,
      totalOrders: 32,
      lastDelivery: "2025-09-18",
      contact: {
        email: "info@ecochem.nl",
        phone: "+31 10 234567",
        website: "www.ecochem.nl"
      },
      materials: ["Sustainable Resins", "Water-based Coatings"],
      performance: {
        onTimeDelivery: 88,
        qualityScore: 89,
        priceCompetitiveness: 85,
        responsiveness: 92
      }
    },
    {
      id: "SUP-003",
      name: "BioSupply Co.",
      location: "Brazil",
      category: "Raw Materials",
      certificationStatus: "pending",
      sustainabilityScore: 78,
      reliabilityScore: 82,
      totalOrders: 18,
      lastDelivery: "2025-09-17",
      contact: {
        email: "sales@biosupply.com.br",
        phone: "+55 11 987654",
        website: "www.biosupply.com.br"
      },
      materials: ["Biomass Feedstocks", "Natural Fibers"],
      performance: {
        onTimeDelivery: 82,
        qualityScore: 85,
        priceCompetitiveness: 91,
        responsiveness: 78
      }
    }
  ]);

  const supplierStats = {
    totalSuppliers: 24,
    certifiedSuppliers: 18,
    pendingCertification: 4,
    nonCertified: 2,
    avgSustainabilityScore: 86.5,
    avgReliabilityScore: 87.2
  };

  const getCertificationBadge = (status: string) => {
    switch (status) {
      case "certified":
        return <Badge className="bg-green-100 text-green-800">ISCC+ Certified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Non-Certified</Badge>;
    }
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 85) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 75) return <div className="h-4 w-4 bg-yellow-500 rounded-full" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Portal</h1>
            <p className="text-gray-600 mt-2">Manage supplier relationships and certifications</p>
          </div>
          <Button>
            <Building className="h-4 w-4 mr-2" />
            Add New Supplier
          </Button>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Suppliers</p>
                  <p className="text-2xl font-bold">{supplierStats.totalSuppliers}</p>
                </div>
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certified</p>
                  <p className="text-2xl font-bold text-green-600">{supplierStats.certifiedSuppliers}</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{supplierStats.pendingCertification}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sustainability</p>
                  <p className="text-2xl font-bold">{supplierStats.avgSustainabilityScore}%</p>
                </div>
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reliability</p>
                  <p className="text-2xl font-bold">{supplierStats.avgReliabilityScore}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supplier Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Supplier Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-medium mb-2">Sustainability Score Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Excellent (90-100%)</span>
                    <span>8 suppliers</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Good (80-89%)</span>
                    <span>12 suppliers</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Needs Improvement (&lt;80%)</span>
                    <span>4 suppliers</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Certification Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ISCC+ Certified</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Pending Review</span>
                    <span>17%</span>
                  </div>
                  <Progress value={17} className="h-2" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Top Categories</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raw Materials</span>
                    <span>12 suppliers</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Chemicals</span>
                    <span>8 suppliers</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Logistics</span>
                    <span>4 suppliers</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplier List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Supplier Directory</h2>
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Supplier Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{supplier.name}</h3>
                        <p className="text-gray-600">{supplier.location} • {supplier.category}</p>
                        <div className="mt-2">{getCertificationBadge(supplier.certificationStatus)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {supplier.contact.email}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4" />
                          {supplier.contact.phone}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          {supplier.contact.website}
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                          <Package className="h-4 w-4" />
                          {supplier.totalOrders} orders
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Materials Supplied:</h4>
                      <div className="flex flex-wrap gap-2">
                        {supplier.materials.map((material, index) => (
                          <Badge key={index} variant="outline">{material}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h4 className="font-medium mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-2">
                            {getPerformanceIcon(supplier.performance.onTimeDelivery)}
                            On-Time Delivery
                          </span>
                          <span>{supplier.performance.onTimeDelivery}%</span>
                        </div>
                        <Progress value={supplier.performance.onTimeDelivery} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-2">
                            {getPerformanceIcon(supplier.performance.qualityScore)}
                            Quality Score
                          </span>
                          <span>{supplier.performance.qualityScore}%</span>
                        </div>
                        <Progress value={supplier.performance.qualityScore} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-2">
                            {getPerformanceIcon(supplier.performance.priceCompetitiveness)}
                            Price Competitiveness
                          </span>
                          <span>{supplier.performance.priceCompetitiveness}%</span>
                        </div>
                        <Progress value={supplier.performance.priceCompetitiveness} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-2">
                            {getPerformanceIcon(supplier.performance.responsiveness)}
                            Responsiveness
                          </span>
                          <span>{supplier.performance.responsiveness}%</span>
                        </div>
                        <Progress value={supplier.performance.responsiveness} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Sustainability</span>
                        <div className="flex items-center gap-2">
                          <Progress value={supplier.sustainabilityScore} className="h-2 w-16" />
                          <span className="text-sm font-medium">{supplier.sustainabilityScore}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Reliability</span>
                        <div className="flex items-center gap-2">
                          <Progress value={supplier.reliabilityScore} className="h-2 w-16" />
                          <span className="text-sm font-medium">{supplier.reliabilityScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Button size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
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

export default SupplierPortal;