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
  ShoppingCart,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar
} from "lucide-react";

const OrderStockPage = () => {
  const [activeTab, setActiveTab] = useState("orders");

  // Order statistics
  const orderStats = {
    totalOrders: 156,
    pendingOrders: 12,
    inTransit: 8,
    delivered: 136,
    certifiedMaterials: 89,
    nonCertified: 67
  };

  // Inventory statistics
  const inventoryStats = {
    totalItems: 342,
    lowStock: 15,
    optimalStock: 298,
    overstock: 29,
    totalValue: 2450000,
    certifiedValue: 1890000
  };

  // Purchase orders
  const purchaseOrders = [
    {
      id: "PO-20250920-001",
      supplier: "Green Biomass Ltd",
      material: "Certified Soybean Oil",
      quantity: 5000,
      unit: "kg",
      status: "pending",
      orderDate: "2025-09-20",
      deliveryDate: "2025-09-25",
      certification: "ISCC+",
      sustainabilityScore: 95
    },
    {
      id: "PO-20250919-002",
      supplier: "Eco Chemicals Co",
      material: "Bio-based Solvent",
      quantity: 2000,
      unit: "L",
      status: "in_transit",
      orderDate: "2025-09-19",
      deliveryDate: "2025-09-22",
      certification: "ISCC+",
      sustainabilityScore: 88
    },
    {
      id: "PO-20250918-003",
      supplier: "Traditional Supply Inc",
      material: "Petroleum-based Resin",
      quantity: 3000,
      unit: "kg",
      status: "delivered",
      orderDate: "2025-09-18",
      deliveryDate: "2025-09-20",
      certification: "Non-certified",
      sustainabilityScore: 45
    }
  ];

  // Inventory items
  const inventoryItems = [
    {
      id: "INV-001",
      material: "Certified Corn Starch",
      quantity: 12500,
      unit: "kg",
      minStock: 5000,
      maxStock: 20000,
      location: "Warehouse A-01",
      status: "optimal",
      certification: "ISCC+",
      supplier: "BioMaterials Inc",
      lastUpdated: "2025-09-20"
    },
    {
      id: "INV-002",
      material: "Bio-based Plasticizer",
      quantity: 800,
      unit: "kg",
      minStock: 2000,
      maxStock: 5000,
      location: "Warehouse B-03",
      status: "low",
      certification: "ISCC+",
      supplier: "Green Chemicals Ltd",
      lastUpdated: "2025-09-19"
    },
    {
      id: "INV-003",
      material: "Recycled PET Pellets",
      quantity: 8500,
      unit: "kg",
      minStock: 3000,
      maxStock: 6000,
      location: "Warehouse C-02",
      status: "overstock",
      certification: "Non-certified",
      supplier: "Recycle Solutions Co",
      lastUpdated: "2025-09-18"
    }
  ];

  // Supplier information
  const suppliers = [
    {
      id: "SUP-001",
      name: "Green Biomass Ltd",
      certification: "ISCC+ Certified",
      rating: 4.8,
      totalOrders: 45,
      performance: 96,
      contact: "contact@greenbiomass.com",
      materials: ["Soybean Oil", "Corn Starch", "Canola Oil"]
    },
    {
      id: "SUP-002",
      name: "Eco Chemicals Co",
      certification: "ISCC+ Certified",
      rating: 4.6,
      totalOrders: 32,
      performance: 94,
      contact: "orders@ecochemicals.com",
      materials: ["Bio-based Solvent", "Green Surfactants"]
    },
    {
      id: "SUP-003",
      name: "Traditional Supply Inc",
      certification: "Conventional",
      rating: 3.9,
      totalOrders: 28,
      performance: 87,
      contact: "sales@traditional.com",
      materials: ["Petroleum Resin", "Mineral Oil", "Synthetic Additives"]
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      in_transit: "default",
      delivered: "default",
      optimal: "default",
      low: "destructive",
      overstock: "outline"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "low":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "overstock":
        return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const calculateStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order & Stock Management</h1>
            <p className="text-gray-600 mt-2">Manage purchase orders, inventory, and supplier relationships</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{orderStats.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">{orderStats.pendingOrders} pending</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Items</p>
                  <p className="text-2xl font-bold">{inventoryStats.totalItems}</p>
                  <p className="text-xs text-muted-foreground">{inventoryStats.lowStock} low stock</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certified Materials</p>
                  <p className="text-2xl font-bold text-green-600">{orderStats.certifiedMaterials}</p>
                  <p className="text-xs text-muted-foreground">{Math.round((orderStats.certifiedMaterials / orderStats.totalOrders) * 100)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold">${(inventoryStats.totalValue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-muted-foreground">Certified: ${(inventoryStats.certifiedValue / 1000000).toFixed(1)}M</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search orders..." className="pl-10 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid gap-4">
              {purchaseOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.supplier}</p>
                        </div>
                        <div className="h-px w-8 bg-gray-300"></div>
                        <div>
                          <p className="font-medium">{order.material}</p>
                          <p className="text-sm text-gray-600">{order.quantity} {order.unit}</p>
                        </div>
                        <div className="h-px w-8 bg-gray-300"></div>
                        <div>
                          <p className="text-sm text-gray-600">Ordered: {order.orderDate}</p>
                          <p className="text-sm text-gray-600">Delivery: {order.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant={order.certification === "ISCC+" ? "default" : "secondary"}>
                            {order.certification}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">Score: {order.sustainabilityScore}%</p>
                        </div>
                        {getStatusBadge(order.status)}
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

          <TabsContent value="inventory" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search inventory..." className="pl-10 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="optimal">Optimal</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="overstock">Overstock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {inventoryItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{item.material}</p>
                            {getStockStatusIcon(item.status)}
                          </div>
                          <p className="text-sm text-gray-600">{item.id} • {item.location}</p>
                          <p className="text-sm text-gray-600">Supplier: {item.supplier}</p>
                        </div>
                        <div className="h-px w-8 bg-gray-300"></div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Stock Level</span>
                            <span className="text-sm">{item.quantity} / {item.maxStock} {item.unit}</span>
                          </div>
                          <Progress
                            value={calculateStockPercentage(item.quantity, item.maxStock)}
                            className="h-2 w-48"
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Min: {item.minStock}</span>
                            <span>Max: {item.maxStock}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant={item.certification === "ISCC+" ? "default" : "secondary"}>
                            {item.certification}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">Updated: {item.lastUpdated}</p>
                        </div>
                        {getStatusBadge(item.status)}
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

          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid gap-6">
              {suppliers.map((supplier) => (
                <Card key={supplier.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{supplier.name}</h3>
                            <Badge variant={supplier.certification.includes("ISCC+") ? "default" : "secondary"}>
                              {supplier.certification}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{supplier.contact}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Rating</p>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">{supplier.rating}</span>
                              <span className="text-yellow-500">★</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Orders</p>
                            <p className="font-semibold">{supplier.totalOrders}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Performance</p>
                            <p className="font-semibold">{supplier.performance}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Materials</p>
                            <p className="font-semibold">{supplier.materials.length}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Materials Supplied:</p>
                          <div className="flex flex-wrap gap-2">
                            {supplier.materials.map((material, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Orders
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
                  <CardTitle>Order Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Orders This Month</span>
                      <span className="font-bold">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">vs Last Month</span>
                      <span className="text-green-600 font-bold">+15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Certified Materials</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Delivery Time</span>
                      <span className="font-bold">3.2 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Optimal Stock</span>
                      <span className="font-bold">{inventoryStats.optimalStock}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Low Stock Items</span>
                      <span className="text-red-600 font-bold">{inventoryStats.lowStock}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Overstock Items</span>
                      <span className="text-yellow-600 font-bold">{inventoryStats.overstock}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Inventory Turnover</span>
                      <span className="font-bold">4.2x/year</span>
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
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Action Required</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      15 items are below minimum stock levels. Consider placing urgent orders for Bio-based Plasticizer and Green Surfactants.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Optimization Opportunity</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Reduce overstock items to free up warehouse space and improve cash flow by approximately $85,000.
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

export default OrderStockPage;