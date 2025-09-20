import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Warehouse,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  RefreshCw,
  Eye,
  Truck,
  Factory
} from "lucide-react";

interface RealTimeInventoryProps {
  data?: any;
}

const RealTimeInventory = ({ data }: RealTimeInventoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDetails, setShowDetails] = useState(false);

  // Inventory Categories
  const categories = [
    { id: "all", name: "All", icon: <Package className="w-4 h-4" /> },
    { id: "raw", name: "Raw Materials", icon: <Factory className="w-4 h-4" /> },
    { id: "semi", name: "Semi-finished", icon: <RefreshCw className="w-4 h-4" /> },
    { id: "finished", name: "Finished Goods", icon: <Warehouse className="w-4 h-4" /> }
  ];

  // Inventory Data
  const inventoryData = [
    {
      id: "RM-001",
      name: "Biomass Raw Material",
      category: "raw",
      currentStock: 1250,
      maxCapacity: 2000,
      unit: "kg",
      location: "Warehouse A-1",
      status: "normal",
      lastUpdated: "2025-09-20 10:30",
      supplier: "Green Materials Corp.",
      leadTime: 3,
      quality: "A+",
      biomassRatio: 85
    },
    {
      id: "RM-002",
      name: "Petroleum-based Material",
      category: "raw",
      currentStock: 680,
      maxCapacity: 1500,
      unit: "kg",
      location: "Warehouse A-2",
      status: "low",
      lastUpdated: "2025-09-20 09:15",
      supplier: "Petrochemical Industries",
      leadTime: 5,
      quality: "A",
      biomassRatio: 15
    },
    {
      id: "SP-001",
      name: "Premix",
      category: "semi",
      currentStock: 320,
      maxCapacity: 500,
      unit: "kg",
      location: "Warehouse B-1",
      status: "normal",
      lastUpdated: "2025-09-20 11:00",
      productionLine: "Line 1",
      shelfLife: 30,
      quality: "A"
    },
    {
      id: "FP-001",
      name: "Carbon Fiber Products",
      category: "finished",
      currentStock: 450,
      maxCapacity: 800,
      unit: "units",
      location: "Warehouse C-1",
      status: "optimal",
      lastUpdated: "2025-09-20 10:45",
      productionDate: "2025-09-18",
      certification: "ISCC+",
      readyForShipment: true
    },
    {
      id: "FP-002",
      name: "Composite Material Products",
      category: "finished",
      currentStock: 280,
      maxCapacity: 600,
      unit: "units",
      location: "Warehouse C-2",
      status: "normal",
      lastUpdated: "2025-09-20 09:30",
      productionDate: "2025-09-17",
      certification: "ISCC+",
      readyForShipment: false
    }
  ];

  // Inventory Metrics Summary
  const inventoryMetrics = {
    totalItems: 5,
    totalValue: "¥12,450,000",
    utilization: 68,
    turnoverRate: 4.2,
    itemsLowStock: 1,
    itemsOptimal: 2,
    itemsExcess: 0,
    avgShelfLife: 45
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "bg-green-500";
      case "normal": return "bg-blue-500";
      case "low": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      case "excess": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "optimal": return <Badge className="bg-green-100 text-green-800">Optimal</Badge>;
      case "normal": return <Badge className="bg-blue-100 text-blue-800">Normal</Badge>;
      case "low": return <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>;
      case "critical": return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "excess": return <Badge className="bg-orange-100 text-orange-800">Excess</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredData = selectedCategory === "all"
    ? inventoryData
    : inventoryData.filter(item => item.category === selectedCategory);

  const totalStock = filteredData.reduce((sum, item) => sum + item.currentStock, 0);
  const totalCapacity = filteredData.reduce((sum, item) => sum + item.maxCapacity, 0);
  const utilizationRate = Math.round((totalStock / totalCapacity) * 100);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="w-5 h-5 text-blue-600" />
            Real-time Inventory Management
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
            <Eye className="w-4 h-4 mr-1" />
            {showDetails ? "Simple View" : "Detailed View"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Inventory Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Warehouse className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{totalStock}</p>
            <p className="text-sm text-gray-600">Total Inventory</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{utilizationRate}%</p>
            <p className="text-sm text-gray-600">Utilization</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{inventoryMetrics.itemsLowStock}</p>
            <p className="text-sm text-gray-600">Low Stock Items</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{inventoryMetrics.turnoverRate}</p>
            <p className="text-sm text-gray-600">Turnover/Month</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Inventory List */}
        <div className="space-y-3">
          {filteredData.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.id} | {item.location}</p>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Stock Level</span>
                    <span>{item.currentStock} / {item.maxCapacity} {item.unit}</span>
                  </div>
                  <Progress
                    value={(item.currentStock / item.maxCapacity) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    {Math.round((item.currentStock / item.maxCapacity) * 100)}% Full
                  </p>
                </div>

                <div className="space-y-2">
                  {item.supplier && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Supplier</span>
                      <span>{item.supplier}</span>
                    </div>
                  )}
                  {item.productionDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Production Date</span>
                      <span>{item.productionDate}</span>
                    </div>
                  )}
                  {item.certification && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Certification</span>
                      <Badge variant="outline" className="text-xs">{item.certification}</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Updated</span>
                    <span>{item.lastUpdated}</span>
                  </div>
                  {item.biomassRatio && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Biomass Ratio</span>
                      <span className="text-green-600 font-medium">{item.biomassRatio}%</span>
                    </div>
                  )}
                  {item.readyForShipment !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ready for Shipment</span>
                      {item.readyForShipment ? (
                        <Badge className="bg-green-100 text-green-800">Ready</Badge>
                      ) : (
                        <Badge variant="secondary">In Progress</Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Alert */}
        {inventoryMetrics.itemsLowStock > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Inventory Alert</span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              {inventoryMetrics.itemsLowStock} items are running low on stock. Please check replenishment plan.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeInventory;