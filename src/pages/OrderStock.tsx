import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Package,
  Truck,
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  Building,
  Award,
  Users,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  supplier: string;
  material: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "in-transit" | "delivered" | "cancelled";
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  certified: boolean;
  priority: "low" | "medium" | "high";
  notes: string;
}

interface InventoryItem {
  id: string;
  material: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  location: string;
  certified: boolean;
  unitCost: number;
  totalValue: number;
  lastUpdated: string;
  supplier: string;
  status: "in-stock" | "low-stock" | "out-of-stock" | "reserved";
}

const OrderStockPage = () => {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      orderNumber: "PO-20250920-001",
      supplier: "Green Materials Inc.",
      material: "Carbon Fiber Composite",
      category: "Raw Materials",
      quantity: 5000,
      unit: "kg",
      unitPrice: 45.50,
      totalPrice: 227500,
      status: "in-transit",
      orderDate: "2025-09-18",
      expectedDelivery: "2025-09-25",
      certified: true,
      priority: "high",
      notes: "Urgent order for Q4 production"
    },
    {
      id: "ORD-002",
      orderNumber: "PO-20250920-002",
      supplier: "EcoChem Solutions",
      material: "Bio-based Polymer",
      category: "Raw Materials",
      quantity: 3000,
      unit: "kg",
      unitPrice: 38.75,
      totalPrice: 116250,
      status: "confirmed",
      orderDate: "2025-09-19",
      expectedDelivery: "2025-09-28",
      certified: true,
      priority: "medium",
      notes: "Regular monthly order"
    },
    {
      id: "ORD-003",
      orderNumber: "PO-20250920-003",
      supplier: "BioSupply Co.",
      material: "Biomass Feedstocks",
      category: "Raw Materials",
      quantity: 2000,
      unit: "kg",
      unitPrice: 28.50,
      totalPrice: 57000,
      status: "pending",
      orderDate: "2025-09-20",
      expectedDelivery: "2025-10-02",
      certified: false,
      priority: "medium",
      notes: "Pending supplier certification"
    }
  ]);

  const [inventory] = useState<InventoryItem[]>([
    {
      id: "INV-001",
      material: "Carbon Fiber Composite",
      category: "Raw Materials",
      quantity: 8500,
      unit: "kg",
      minStock: 2000,
      maxStock: 12000,
      location: "Warehouse A - Section 1",
      certified: true,
      unitCost: 45.50,
      totalValue: 386750,
      lastUpdated: "2025-09-20",
      supplier: "Green Materials Inc.",
      status: "in-stock"
    },
    {
      id: "INV-002",
      material: "Bio-based Polymer",
      category: "Raw Materials",
      quantity: 4200,
      unit: "kg",
      minStock: 1500,
      maxStock: 8000,
      location: "Warehouse B - Section 3",
      certified: true,
      unitCost: 38.75,
      totalValue: 162750,
      lastUpdated: "2025-09-20",
      supplier: "EcoChem Solutions",
      status: "in-stock"
    },
    {
      id: "INV-003",
      material: "Petroleum-based Resin",
      category: "Raw Materials",
      quantity: 680,
      unit: "kg",
      minStock: 1000,
      maxStock: 5000,
      location: "Warehouse C - Section 2",
      certified: false,
      unitCost: 32.20,
      totalValue: 21896,
      lastUpdated: "2025-09-20",
      supplier: "PolyTech Industries",
      status: "low-stock"
    }
  ]);

  const orderStats = {
    totalOrders: 156,
    pendingOrders: 12,
    confirmedOrders: 24,
    inTransit: 8,
    delivered: 112,
    totalInventory: 45600,
    certifiedMaterials: 89,
    nonCertified: 67,
    totalValue: 8950000
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>;
      case "confirmed":
        return <Badge className="bg-purple-100 text-purple-800">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case "in-stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case "low-stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case "out-of-stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
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
            <h1 className="text-3xl font-bold text-gray-900">Order & Stock Management</h1>
            <p className="text-gray-600 mt-2">Purchase order management and inventory tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{orderStats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-bold text-yellow-600">{orderStats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Inventory</p>
                  <p className="text-2xl font-bold">{orderStats.totalInventory.toLocaleString()}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold">${(orderStats.totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Purchase Orders</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Order Information */}
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{order.orderNumber}</h3>
                            {getStatusBadge(order.status)}
                            {getPriorityBadge(order.priority)}
                            {order.certified && <Badge className="bg-green-100 text-green-800">Certified</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{order.material} • {order.category}</p>
                          <p className="text-sm text-gray-600">Supplier: {order.supplier}</p>
                          {order.notes && (
                            <p className="text-sm text-gray-600 mt-1">Notes: {order.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div>
                      <h4 className="font-medium mb-2">Order Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span className="font-medium">{order.quantity.toLocaleString()} {order.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unit Price:</span>
                          <span className="font-medium">${order.unitPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Value:</span>
                          <span className="font-medium">${order.totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ordered:</span>
                          <span>{order.orderDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected:</span>
                          <span>{order.expectedDelivery}</span>
                        </div>
                        {order.actualDelivery && (
                          <div className="flex justify-between">
                            <span>Delivered:</span>
                            <span>{order.actualDelivery}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-end">
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Truck className="h-4 w-4 mr-2" />
                          Track Shipment
                        </Button>
                        {order.status === "pending" && (
                          <Button size="sm" variant="outline" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Inventory Status</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Low Stock Alerts
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Inventory Information */}
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{item.material}</h3>
                            {getStatusBadge(item.status)}
                            {item.certified && <Badge className="bg-green-100 text-green-800">Certified</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                          <p className="text-sm text-gray-600">Location: {item.location}</p>
                          <p className="text-sm text-gray-600">Supplier: {item.supplier}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stock Details */}
                    <div>
                      <h4 className="font-medium mb-2">Stock Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Current Stock:</span>
                          <span className="font-medium">{item.quantity.toLocaleString()} {item.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min Stock:</span>
                          <span>{item.minStock.toLocaleString()} {item.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Stock:</span>
                          <span>{item.maxStock.toLocaleString()} {item.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unit Cost:</span>
                          <span>${item.unitCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Value:</span>
                          <span className="font-medium">${item.totalValue.toLocaleString()}</span>
                        </div>
                      </div>
                      {item.status === "low-stock" && (
                        <div className="mt-2">
                          <Progress value={(item.quantity / item.maxStock) * 100} className="h-2" />
                          <p className="text-xs text-yellow-600 mt-1">
                            {((item.quantity / item.minStock) * 100).toFixed(0)}% of minimum stock
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-end">
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <Package className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {item.status === "low-stock" && (
                          <Button size="sm" variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="w-full">
                          <MapPin className="h-4 w-4 mr-2" />
                          Location
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Create Purchase Order
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Receive Materials
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-4 w-4" />
                  Petroleum-based Resin - Low stock (680kg remaining)
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock className="h-4 w-4" />
                  3 orders pending approval
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  2 shipments delivered today
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>Order PO-20250920-001 confirmed</div>
                <div>5000kg Carbon Fiber Composite received</div>
                <div>Inventory count completed for Warehouse A</div>
                <div>Supplier BioSupply Co. certification pending</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderStockPage;