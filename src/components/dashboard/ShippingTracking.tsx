import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Navigation,
  Route,
  TrendingUp,
  Phone,
  Mail,
  List
} from "lucide-react";

interface ShippingTrackingProps {
  data?: any;
}

const ShippingTracking = ({ data }: ShippingTrackingProps) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [trackingView, setTrackingView] = useState("map");

  // Shipping Statuses
  const statuses = [
    { id: "all", name: "All", count: 28 },
    { id: "preparing", name: "Preparing", count: 5, color: "bg-blue-500" },
    { id: "in_transit", name: "In Transit", count: 12, color: "bg-yellow-500" },
    { id: "delivered", name: "Delivered", count: 8, color: "bg-green-500" },
    { id: "delayed", name: "Delayed", count: 3, color: "bg-red-500" }
  ];

  // Shipping Data with ERP Integration
  const shipments = [
    {
      id: "SHP-20250920-001",
      orderId: "ORD-789456",
      customer: "Techno Materials Corp.",
      destination: "1-2-3 Akasaka, Minato-ku, Tokyo",
      items: [
        { name: "Carbon Fiber Products", quantity: 50, weight: "250kg" },
        { name: "Composite Materials", quantity: 30, weight: "180kg" }
      ],
      status: "in_transit",
      carrier: "JP Express",
      trackingNumber: "JPX-7890123456",
      estimatedDelivery: "2025-09-21 14:00",
      actualDelivery: null,
      progress: 65,
      currentLocation: "Saitama City, Saitama Pref.",
      driver: "Taro Yamada",
      vehicle: "Truck T-1234",
      contact: "090-1234-5678",
      isccCertified: true,
      carbonFootprint: "45.2 kg CO2",
      erpSync: {
        sapSync: true,
        oracleSync: true,
        lastERPUpdate: "2025-09-20 10:30",
        invoiceGenerated: true,
        paymentStatus: "pending"
      }
    },
    {
      id: "SHP-20250920-002",
      orderId: "ORD-789457",
      customer: "Environmental Solutions Corp.",
      destination: "1-1-1 Umeda, Kita-ku, Osaka City, Osaka Pref.",
      items: [
        { name: "Plastic Products", quantity: 100, weight: "500kg" }
      ],
      status: "preparing",
      carrier: "Green Logistics",
      trackingNumber: "GL-9876543210",
      estimatedDelivery: "2025-09-22 10:00",
      actualDelivery: null,
      progress: 20,
      currentLocation: "Warehouse C-1",
      driver: null,
      vehicle: null,
      contact: "06-1234-5678",
      isccCertified: true,
      carbonFootprint: "78.5 kg CO2"
    },
    {
      id: "SHP-20250919-003",
      orderId: "ORD-789432",
      customer: "Sustainable Industries Corp.",
      destination: "3-2-1 Sakae, Naka-ku, Nagoya City, Aichi Pref.",
      items: [
        { name: "Carbon Fiber Products", quantity: 25, weight: "125kg" },
        { name: "Plastic Products", quantity: 75, weight: "375kg" }
      ],
      status: "delivered",
      carrier: "Eco Delivery Service",
      trackingNumber: "ECD-4567891230",
      estimatedDelivery: "2025-09-20 09:00",
      actualDelivery: "2025-09-20 08:45",
      progress: 100,
      currentLocation: "Delivery Completed",
      driver: "Hanako Sato",
      vehicle: "EV Truck E-5678",
      contact: "052-1234-5678",
      isccCertified: true,
      carbonFootprint: "32.1 kg CO2"
    },
    {
      id: "SHP-20250920-004",
      orderId: "ORD-789458",
      customer: "Future Creation Corp.",
      destination: "1-2-3 Hakata Ekimae, Hakata-ku, Fukuoka City, Fukuoka Pref.",
      items: [
        { name: "Composite Material Products", quantity: 40, weight: "240kg" }
      ],
      status: "delayed",
      carrier: "West Japan Delivery",
      trackingNumber: "WJD-1234567890",
      estimatedDelivery: "2025-09-21 16:00",
      actualDelivery: null,
      progress: 40,
      currentLocation: "Hiroshima City, Hiroshima Pref.",
      driver: "Ichiro Suzuki",
      vehicle: "Truck W-9012",
      contact: "092-1234-5678",
      isccCertified: true,
      carbonFootprint: "89.3 kg CO2",
      delayReason: "Traffic congestion due to bad weather"
    }
  ];

  // Shipping Route (for simple map display)
  const routeData = [
    { location: "Tokyo Warehouse", time: "Departure", lat: 35.6762, lng: 139.6503, status: "completed" },
    { location: "Saitama Pref.", time: "12:30", lat: 35.8569, lng: 139.6489, status: "current" },
    { location: "Gunma Pref.", time: "14:00", lat: 36.3912, lng: 139.0608, status: "upcoming" },
    { location: "Nagano Pref.", time: "16:00", lat: 36.6513, lng: 138.1810, status: "upcoming" },
    { location: "Niigata Pref.", time: "18:30", lat: 37.9022, lng: 139.0236, status: "upcoming" }
  ];

  // Shipping Metrics Summary with ERP Integration
  const shippingMetrics = {
    totalShipments: 28,
    onTimeDelivery: 94.5,
    averageDeliveryTime: "2.3 days",
    totalCarbonSaved: "156.8 kg CO2",
    activeVehicles: 8,
    averageSpeed: "65 km/h",
    customerSatisfaction: 4.7,
    erpIntegrationRate: 98.2,
    automatedInvoicing: 87.5,
    realTimeTracking: 95.8
  };

  const filteredShipments = selectedStatus === "all"
    ? shipments
    : shipments.filter(shipment => shipment.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing": return <Badge className="bg-blue-100 text-blue-800">Preparing</Badge>;
      case "in_transit": return <Badge className="bg-yellow-100 text-yellow-800">In Transit</Badge>;
      case "delivered": return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "delayed": return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            Shipping & Delivery Tracking with ERP Integration
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={trackingView === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setTrackingView("map")}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Map
            </Button>
            <Button
              variant={trackingView === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setTrackingView("list")}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Shipping Metrics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Truck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{shippingMetrics.totalShipments}</p>
            <p className="text-sm text-gray-600">Total Shipments</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{shippingMetrics.onTimeDelivery}%</p>
            <p className="text-sm text-gray-600">On-time Rate</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{shippingMetrics.totalCarbonSaved}</p>
            <p className="text-sm text-gray-600">CO2 Reduction</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <Route className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{shippingMetrics.activeVehicles}</p>
            <p className="text-sm text-gray-600">Active Vehicles</p>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <Button
              key={status.id}
              variant={selectedStatus === status.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status.id)}
              className="flex items-center gap-2"
            >
              {status.count > 0 && (
                <div className={`w-2 h-2 rounded-full ${status.color || "bg-gray-500"}`} />
              )}
              {status.name}
              {status.count > 0 && (
                <Badge variant="secondary" className="text-xs">{status.count}</Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Shipping List/Map View */}
        {trackingView === "list" ? (
          <div className="space-y-4">
            {filteredShipments.map((shipment) => (
              <div key={shipment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{shipment.id}</h3>
                      {getStatusBadge(shipment.status)}
                      {shipment.isccCertified && (
                        <Badge variant="outline" className="text-green-600">ISCC+</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{shipment.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{shipment.carrier}</p>
                    <p className="text-xs text-gray-600">{shipment.trackingNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Destination</p>
                        <p className="text-sm text-gray-600">{shipment.destination}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Package className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Cargo Details</p>
                        {shipment.items.map((item, index) => (
                          <p key={index} className="text-sm text-gray-600">
                            {item.name} × {item.quantity} ({item.weight})
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Estimated Delivery</p>
                        <p className="text-sm text-gray-600">{shipment.estimatedDelivery}</p>
                        {shipment.actualDelivery && (
                          <p className="text-sm text-green-600">Actual: {shipment.actualDelivery}</p>
                        )}
                      </div>
                    </div>

                    {shipment.currentLocation && (
                      <div className="flex items-start gap-2">
                        <Navigation className="w-4 h-4 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Current Location</p>
                          <p className="text-sm text-gray-600">{shipment.currentLocation}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Shipping Progress</span>
                        <span>{shipment.progress}%</span>
                      </div>
                      <Progress value={shipment.progress} className="h-2" />
                    </div>
                  </div>
                </div>

                {shipment.driver && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Driver: {shipment.driver}</span>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <Mail className="w-4 h-4" />
                        <span>{shipment.contact}</span>
                      </div>
                    </div>
                  </div>
                )}

                {shipment.delayReason && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-700">Delay Reason: {shipment.delayReason}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Real-time Shipping Map</h3>
            <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Shipping Route Map</p>
              <p className="text-sm text-gray-500 mt-2">
                8 vehicles active | Average speed 65 km/h
              </p>

              {/* Simplified Route Display */}
              <div className="mt-6 space-y-2">
                {routeData.map((point, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className={`w-3 h-3 rounded-full ${
                      point.status === "completed" ? "bg-green-500" :
                      point.status === "current" ? "bg-yellow-500" :
                      point.status === "upcoming" ? "bg-gray-300" : "bg-gray-500"
                    }`} />
                    <span className="font-medium">{point.location}</span>
                    <span className="text-gray-600">{point.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingTracking;