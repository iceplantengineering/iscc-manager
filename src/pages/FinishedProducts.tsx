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
  Box,
  Package,
  Truck,
  Award,
  FileText,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  QrCode,
  Certificate,
  Leaf,
  Users,
  Clock,
  Star,
  Settings
} from "lucide-react";

const FinishedProductsPage = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  // Finished product statistics
  const productStats = {
    totalProducts: 156,
    biomassProducts: 98,
    nonBiomassProducts: 58,
    totalInventory: 45600,
    certifiedProducts: 98,
    pendingShipments: 23,
    totalValue: 8950000
  };

  // Product categories
  const productCategories = [
    { name: "Biomass Products", count: 98, percentage: 63, certified: true },
    { name: "Non-BM Products", count: 58, percentage: 37, certified: false }
  ];

  // Product inventory
  const productInventory = [
    {
      id: "FP-001",
      productName: "Carbon Fiber Composite Sheet",
      productCode: "CFC-001",
      category: "Biomass Products",
      classification: "Certified Sustainable",
      batchNumber: "CF-0920-A01",
      quantity: 2500,
      unit: "kg",
      location: "Warehouse A-01",
      productionDate: "2025-09-20",
      expiryDate: "2026-09-20",
      status: "available",
      sustainabilityScore: 95,
      biomassContent: 78,
      carbonFootprint: 2.1,
      certificateNumber: "ISCC-PLUS-2025-001234",
      qualityGrade: "A",
      unitValue: 45.50
    },
    {
      id: "FP-002",
      productName: "Bio-based Plastic Film",
      productCode: "BPF-002",
      category: "Biomass Products",
      classification: "Certified Sustainable",
      batchNumber: "BF-0920-B01",
      quantity: 1200,
      unit: "m",
      location: "Warehouse B-03",
      productionDate: "2025-09-19",
      expiryDate: "2026-03-19",
      status: "available",
      sustainabilityScore: 88,
      biomassContent: 85,
      carbonFootprint: 1.8,
      certificateNumber: "ISCC-PLUS-2025-001235",
      qualityGrade: "A",
      unitValue: 12.75
    },
    {
      id: "FP-003",
      productName: "Sustainable Packaging Box",
      productCode: "SPB-003",
      category: "Biomass Products",
      classification: "Certified Sustainable",
      batchNumber: "SP-0920-C01",
      quantity: 8500,
      unit: "units",
      location: "Warehouse C-02",
      productionDate: "2025-09-18",
      expiryDate: "2027-09-18",
      status: "reserved",
      sustainabilityScore: 92,
      biomassContent: 92,
      carbonFootprint: 0.8,
      certificateNumber: "ISCC-PLUS-2025-001236",
      qualityGrade: "A+",
      unitValue: 3.25
    },
    {
      id: "FP-004",
      productName: "Conventional Resin Compound",
      productCode: "CRC-004",
      category: "Non-BM Products",
      classification: "Conventional",
      batchNumber: "CR-0920-D01",
      quantity: 3200,
      unit: "kg",
      location: "Warehouse D-01",
      productionDate: "2025-09-20",
      expiryDate: "2026-09-20",
      status: "available",
      sustainabilityScore: 45,
      biomassContent: 0,
      carbonFootprint: 4.2,
      certificateNumber: null,
      qualityGrade: "B",
      unitValue: 18.90
    }
  ];

  // Shipping orders
  const shippingOrders = [
    {
      id: "SO-20250920-001",
      customer: "EcoManufacturing Co",
      productId: "FP-001",
      productName: "Carbon Fiber Composite Sheet",
      quantity: 500,
      unit: "kg",
      orderDate: "2025-09-20",
      shippingDate: "2025-09-22",
      status: "pending",
      destination: "Osaka, Japan",
      trackingNumber: null,
      transportation: "Sea Freight",
      specialInstructions: "Handle with care, moisture sensitive",
      documentsRequired: ["Certificate of Analysis", "ISCC+ Certificate", "Packing List"]
    },
    {
      id: "SO-20250919-002",
      customer: "Green Solutions Ltd",
      productId: "FP-002",
      productName: "Bio-based Plastic Film",
      quantity: 800,
      unit: "m",
      orderDate: "2025-09-19",
      shippingDate: "2025-09-21",
      status: "processing",
      destination: "Singapore",
      trackingNumber: "TRK-789456123",
      transportation: "Air Freight",
      specialInstructions: "Temperature controlled",
      documentsRequired: ["Certificate of Analysis", "ISCC+ Certificate"]
    },
    {
      id: "SO-20250918-003",
      customer: "Sustainable Packaging Inc",
      productId: "FP-003",
      productName: "Sustainable Packaging Box",
      quantity: 2000,
      unit: "units",
      orderDate: "2025-09-18",
      shippingDate: "2025-09-20",
      status: "shipped",
      destination: "Los Angeles, USA",
      trackingNumber: "TRK-789456124",
      transportation: "Sea Freight",
      specialInstructions: "Stack max 10 layers",
      documentsRequired: ["ISCC+ Certificate", "Packing List"]
    }
  ];

  // Certificates
  const certificates = [
    {
      id: "CERT-001",
      certificateNumber: "ISCC-PLUS-2025-001234",
      productId: "FP-001",
      productName: "Carbon Fiber Composite Sheet",
      issueDate: "2025-09-20",
      expiryDate: "2026-09-20",
      status: "active",
      certificationBody: "ISCC International",
      standard: "ISCC PLUS",
      scope: "Sustainable Biomass Products",
      biomassContent: 78,
      carbonFootprint: 2.1,
      sustainabilityScore: 95,
      qrCode: "QR-ISCC-001234",
      downloadUrl: "/certificates/ISCC-PLUS-2025-001234.pdf"
    },
    {
      id: "CERT-002",
      certificateNumber: "ISCC-PLUS-2025-001235",
      productId: "FP-002",
      productName: "Bio-based Plastic Film",
      issueDate: "2025-09-19",
      expiryDate: "2026-09-19",
      status: "active",
      certificationBody: "ISCC International",
      standard: "ISCC PLUS",
      scope: "Bio-based Materials",
      biomassContent: 85,
      carbonFootprint: 1.8,
      sustainabilityScore: 88,
      qrCode: "QR-ISCC-001235",
      downloadUrl: "/certificates/ISCC-PLUS-2025-001235.pdf"
    }
  ];

  // Product quality metrics
  const qualityMetrics = [
    {
      productId: "FP-001",
      productName: "Carbon Fiber Composite Sheet",
      qualityGrade: "A",
      inspectionDate: "2025-09-20",
      inspector: "Quality Team A",
      tests: [
        { parameter: "Tensile Strength", result: "48 MPa", standard: "≥ 45 MPa", status: "pass" },
        { parameter: "Elasticity", result: "16%", standard: "≥ 15%", status: "pass" },
        { parameter: "Biomass Content", result: "78%", standard: "≥ 70%", status: "pass" },
        { parameter: "Surface Finish", result: "Good", standard: "Acceptable", status: "pass" }
      ],
      overallStatus: "approved"
    },
    {
      productId: "FP-002",
      productName: "Bio-based Plastic Film",
      qualityGrade: "A",
      inspectionDate: "2025-09-19",
      inspector: "Quality Team B",
      tests: [
        { parameter: "Thickness", result: "0.08mm", standard: "0.05-0.1mm", status: "pass" },
        { parameter: "Transparency", result: "87%", standard: "≥ 85%", status: "pass" },
        { parameter: "Biomass Content", result: "85%", standard: "≥ 80%", status: "pass" },
        { parameter: "Tensile Strength", result: "42 MPa", standard: "≥ 40 MPa", status: "pass" }
      ],
      overallStatus: "approved"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      available: "default",
      reserved: "secondary",
      pending: "secondary",
      processing: "default",
      shipped: "default",
      active: "default",
      expired: "destructive"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getQualityBadge = (grade: string) => {
    const variants = {
      "A+": "default",
      "A": "default",
      "B": "secondary",
      "C": "outline"
    } as const;

    return (
      <Badge variant={variants[grade as keyof typeof variants] || "secondary"}>
        Grade {grade}
      </Badge>
    );
  };

  const getClassificationBadge = (classification: string) => {
    const variants = {
      "Certified Sustainable": "default",
      "Conventional": "secondary"
    } as const;

    return (
      <Badge variant={variants[classification as keyof typeof variants] || "secondary"}>
        {classification}
      </Badge>
    );
  };

  const getSustainabilityIcon = (score: number) => {
    if (score >= 90) return <Leaf className="h-4 w-4 text-green-600" />;
    if (score >= 70) return <Leaf className="h-4 w-4 text-yellow-600" />;
    return <Leaf className="h-4 w-4 text-red-600" />;
  };

  const getTestStatusIcon = (status: string) => {
    return status === "pass" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finished Product Information</h1>
            <p className="text-gray-600 mt-2">Manage finished products, certificates, and shipping operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Product
            </Button>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{productStats.totalProducts}</p>
                  <p className="text-xs text-muted-foreground">{productStats.certifiedProducts} certified</p>
                </div>
                <Box className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Biomass Products</p>
                  <p className="text-2xl font-bold text-green-600">{productStats.biomassProducts}</p>
                  <p className="text-xs text-muted-foreground">{Math.round((productStats.biomassProducts / productStats.totalProducts) * 100)}%</p>
                </div>
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Inventory</p>
                  <p className="text-2xl font-bold">{productStats.totalInventory.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Various units</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold">${(productStats.totalValue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-muted-foreground">{productStats.pendingShipments} pending</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Product Inventory</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Orders</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search products..." className="pl-10 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="biomass">Biomass Products</SelectItem>
                    <SelectItem value="non-biomass">Non-BM Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid gap-4">
              {productInventory.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{product.productName}</p>
                            <Badge variant="outline">{product.productCode}</Badge>
                            {getClassificationBadge(product.classification)}
                            {getQualityBadge(product.qualityGrade)}
                            {getStatusBadge(product.status)}
                          </div>
                          <p className="text-sm text-gray-600">Batch: {product.batchNumber}</p>
                          <p className="text-sm text-gray-600">Location: {product.location}</p>
                          <p className="text-sm text-gray-600">
                            Produced: {product.productionDate} • Expires: {product.expiryDate}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            {getSustainabilityIcon(product.sustainabilityScore)}
                            <span className="text-sm font-medium">Sustainability</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Biomass: </span>
                              <span className="font-medium">{product.biomassContent}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">CFP: </span>
                              <span className="font-medium">{product.carbonFootprint}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Score: </span>
                              <span className="font-medium">{product.sustainabilityScore}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Value: </span>
                              <span className="font-medium">${product.unitValue}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Inventory Details</p>
                          <p className="text-lg font-bold">{product.quantity.toLocaleString()} {product.unit}</p>
                          {product.certificateNumber && (
                            <p className="text-xs text-gray-600 mt-1">
                              Certificate: {product.certificateNumber}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Certificate
                        </Button>
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6">
            <div className="grid gap-4">
              {shippingOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{order.id}</p>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-lg font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.productName}</p>
                          <p className="text-sm text-gray-600">
                            {order.quantity} {order.unit} • {order.transportation}
                          </p>
                          <p className="text-sm text-gray-600">
                            Order: {order.orderDate} • Ship: {order.shippingDate}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Destination</p>
                          <p className="font-medium">{order.destination}</p>
                          {order.trackingNumber && (
                            <p className="text-sm text-gray-600">
                              Tracking: {order.trackingNumber}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Special Instructions</p>
                          <p className="text-sm text-gray-600">{order.specialInstructions}</p>
                          <p className="text-sm font-medium mt-2">Documents Required</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {order.documentsRequired.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
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
                          <Truck className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Documents
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <div className="grid gap-4">
              {certificates.map((cert) => (
                <Card key={cert.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{cert.certificateNumber}</p>
                            {getStatusBadge(cert.status)}
                            <Badge variant="outline">{cert.standard}</Badge>
                          </div>
                          <p className="text-lg font-medium">{cert.productName}</p>
                          <p className="text-sm text-gray-600">
                            Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                          </p>
                          <p className="text-sm text-gray-600">
                            Certification Body: {cert.certificationBody}
                          </p>
                          <p className="text-sm text-gray-600">Scope: {cert.scope}</p>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm font-medium">Sustainability Metrics</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Biomass Content:</span>
                              <span className="font-medium ml-1">{cert.biomassContent}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Carbon Footprint:</span>
                              <span className="font-medium ml-1">{cert.carbonFootprint}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Sustainability Score:</span>
                              <span className="font-medium ml-1">{cert.sustainabilityScore}%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Certificate Actions</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <QrCode className="h-4 w-4 mr-1" />
                              QR Code
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Certificate
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

          <TabsContent value="quality" className="space-y-6">
            <div className="grid gap-6">
              {qualityMetrics.map((quality) => (
                <Card key={quality.productId}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{quality.productName}</p>
                            {getQualityBadge(quality.qualityGrade)}
                            <Badge variant="outline">{quality.inspector}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Inspection Date: {quality.inspectionDate}
                          </p>
                          <p className="text-sm text-gray-600">
                            Overall Status: {quality.overallStatus.toUpperCase()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-3">Quality Test Results</p>
                          <div className="space-y-2">
                            {quality.tests.map((test, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center gap-2">
                                  {getTestStatusIcon(test.status)}
                                  <span className="text-sm font-medium">{test.parameter}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm">{test.result}</span>
                                  <span className="text-xs text-gray-600 ml-2">({test.standard})</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Certificate
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

export default FinishedProductsPage;