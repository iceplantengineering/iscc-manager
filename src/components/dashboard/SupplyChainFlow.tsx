import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Factory,
  Truck,
  Package,
  Recycle,
  Leaf,
  Droplets,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface SupplyChainFlowProps {
  data?: any;
}

const SupplyChainFlow = ({ data }: SupplyChainFlowProps) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const stages = [
    {
      id: "procurement",
      title: "Raw Material Sourcing",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      status: "active",
      progress: 85,
      details: {
        suppliers: 12,
        activeOrders: 8,
        quality: 98,
        sustainability: 92
      },
      flow: {
        from: null,
        to: "processing"
      }
    },
    {
      id: "processing",
      title: "Manufacturing",
      icon: <Factory className="w-6 h-6 text-blue-600" />,
      status: "active",
      progress: 72,
      details: {
        productionLines: 3,
        activeLots: 5,
        efficiency: 88,
        capacity: 75
      },
      flow: {
        from: "procurement",
        to: "warehouse"
      }
    },
    {
      id: "warehouse",
      title: "Inventory Management",
      icon: <Package className="w-6 h-6 text-orange-600" />,
      status: "active",
      progress: 90,
      details: {
        totalCapacity: 1000,
        currentStock: 680,
        utilization: 68,
        turnover: 4.2
      },
      flow: {
        from: "processing",
        to: "distribution"
      }
    },
    {
      id: "distribution",
      title: "Distribution & Shipping",
      icon: <Truck className="w-6 h-6 text-purple-600" />,
      status: "active",
      progress: 45,
      details: {
        pendingShipments: 12,
        inTransit: 8,
        delivered: 156,
        onTime: 94
      },
      flow: {
        from: "warehouse",
        to: "recycling"
      }
    },
    {
      id: "recycling",
      title: "Recycling & Recovery",
      icon: <Recycle className="w-6 h-6 text-teal-600" />,
      status: "pending",
      progress: 30,
      details: {
        collectionRate: 65,
        recycledProducts: 420,
        co2Reduced: 12.5,
        circularity: 78
      },
      flow: {
        from: "distribution",
        to: null
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          Supply Chain Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Supply Chain Flow Visualization */}
        <div className="relative mb-8">
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex flex-col items-center relative">
                {/* Stage Nodes */}
                <div
                  className={`
                    relative z-10 w-16 h-16 rounded-full border-4 border-white shadow-lg
                    flex items-center justify-center cursor-pointer transition-all duration-300
                    ${selectedStage === stage.id ? 'ring-4 ring-blue-400 scale-110' : ''}
                    ${getStatusColor(stage.status)}
                  `}
                  onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                >
                  {stage.icon}
                </div>

                {/* Connection Lines */}
                {index < stages.length - 1 && (
                  <div className="absolute top-8 left-16 w-16 h-1 bg-gradient-to-r from-blue-300 to-green-300">
                    <ChevronRight className="w-4 h-4 text-gray-600 absolute -top-1.5 right-0" />
                  </div>
                )}

                {/* Stage Names */}
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-700">{stage.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getStatusIcon(stage.status)}
                    <span className="text-xs text-gray-500">{stage.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Information */}
        {selectedStage && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            {stages
              .filter(stage => stage.id === selectedStage)
              .map(stage => (
                <div key={stage.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{stage.title}</h3>
                    <Badge variant={stage.status === "active" ? "default" : "secondary"}>
                      {stage.status === "active" ? "Active" : "Pending"}
                    </Badge>
                  </div>

                  <Progress value={stage.progress} className="h-2" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(stage.details).map(([key, value]) => (
                      <div key={key} className="bg-white rounded p-3 text-center">
                        <p className="text-2xl font-bold text-blue-600">{value}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {key === "suppliers" && "Suppliers"}
                          {key === "activeOrders" && "Active Orders"}
                          {key === "quality" && "Quality Score"}
                          {key === "sustainability" && "Sustainability"}
                          {key === "productionLines" && "Production Lines"}
                          {key === "activeLots" && "Active Lots"}
                          {key === "efficiency" && "Efficiency %"}
                          {key === "capacity" && "Capacity %"}
                          {key === "totalCapacity" && "Total Capacity"}
                          {key === "currentStock" && "Current Stock"}
                          {key === "utilization" && "Utilization %"}
                          {key === "turnover" && "Turnover Rate"}
                          {key === "pendingShipments" && "Pending Shipments"}
                          {key === "inTransit" && "In Transit"}
                          {key === "delivered" && "Delivered"}
                          {key === "onTime" && "On-time %"}
                          {key === "collectionRate" && "Collection Rate %"}
                          {key === "recycledProducts" && "Recycled Products"}
                          {key === "co2Reduced" && "CO2 Reduced tons"}
                          {key === "circularity" && "Circularity %"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Flow Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Sustainability</h4>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Biomass Ratio</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CO2 Reduction</span>
                <span className="font-medium">-45%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Recycling Rate</span>
                <span className="font-medium">78%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Factory className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Production Efficiency</h4>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Overall Efficiency</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Equipment Uptime</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Quality Pass Rate</span>
                <span className="font-medium">96%</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-purple-800">Logistics Efficiency</h4>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Delivery On-time</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Inventory Turnover</span>
                <span className="font-medium">4.2x</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transport Cost</span>
                <span className="font-medium">-12%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyChainFlow;