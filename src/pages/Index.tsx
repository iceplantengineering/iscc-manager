import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  ClipboardList,
  Wrench,
  Box,
  Award,
  BarChart3,
  Leaf,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Database,
  Settings,
  FileText,
  Truck,
  Package,
  Factory,
  Building,
  Shield,
  Brain,
  Cloud,
  Hash,
  Zap
} from "lucide-react";
import {
  generateRawMaterialData,
  generateProductionLots,
  generateMassBalanceData,
  generateTraceabilityData,
  generateAlerts
} from "@/lib/dummyData";

const Index = () => {
  // Dashboard summary statistics
  const dashboardStats = {
    totalOrders: 156,
    totalInventory: 342,
    activePlans: 8,
    activeBatches: 6,
    biomassProducts: 98,
    totalValue: 8950000,
    carbonReduction: 21.4,
    efficiency: 87.5
  };

  // Quick navigation cards
  const navigationCards = [
    {
      title: "Order & Stock",
      description: "Manage purchase orders and inventory tracking",
      icon: ShoppingCart,
      href: "/order-stock",
      color: "blue",
      stats: `${dashboardStats.totalOrders} orders`,
      trend: "up"
    },
    {
      title: "Production Plan",
      description: "Production planning and batch instructions",
      icon: ClipboardList,
      href: "/production-plan",
      color: "green",
      stats: `${dashboardStats.activePlans} active plans`,
      trend: "stable"
    },
    {
      title: "Indirect Materials",
      description: "Utilities and indirect materials management",
      icon: Wrench,
      href: "/indirect-materials",
      color: "orange",
      stats: `${dashboardStats.totalInventory} items`,
      trend: "up"
    },
    {
      title: "Finished Products",
      description: "Product inventory and certificate management",
      icon: Box,
      href: "/finished-products",
      color: "purple",
      stats: `${dashboardStats.biomassProducts} products`,
      trend: "up"
    },
        {
      title: "Carbon Footprint",
      description: "Track emissions and sustainability metrics",
      icon: Leaf,
      href: "/carbon",
      color: "teal",
      stats: `${dashboardStats.carbonReduction}% reduction`,
      trend: "up"
    },
    {
      title: "Environmental Monitoring",
      description: "CEMS emission monitoring and compliance",
      icon: Cloud,
      href: "/environmental-monitoring",
      color: "sky",
      stats: "98.2% compliant",
      trend: "up"
    },
    {
      title: "Digital Product Passport",
      description: "Product lifecycle transparency and DPP management",
      icon: Hash,
      href: "/digital-product-passport",
      color: "indigo",
      stats: "EU DPP Ready",
      trend: "up"
    },
    {
      title: "Supplier Portal",
      description: "Supplier management and relationships",
      icon: Building,
      href: "/supplier-portal",
      color: "cyan",
      stats: "24 suppliers",
      trend: "up"
    },
    {
      title: "Quality Management",
      description: "Quality control and compliance monitoring",
      icon: Shield,
      href: "/quality",
      color: "rose",
      stats: "80.8% pass rate",
      trend: "up"
    },
    {
      title: "Analytics",
      description: "Comprehensive insights and reporting",
      icon: BarChart3,
      href: "/analytics",
      color: "indigo",
      stats: `${dashboardStats.efficiency}% efficiency`,
      trend: "up"
    },
    {
      title: "Advanced Analytics",
      description: "AI-powered predictions and optimization",
      icon: Brain,
      href: "/advanced-analytics",
      color: "purple",
      stats: "AI models active",
      trend: "up"
    },
    {
      title: "Utility Management",
      description: "Energy monitoring and utility optimization",
      icon: Zap,
      href: "/utility-management",
      color: "yellow",
      stats: "Real-time monitoring",
      trend: "up"
    },
      ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: "production",
      title: "Batch BM-20250920-001 completed",
      description: "Carbon Fiber Composite - 985kg",
      timestamp: "2 hours ago",
      status: "success"
    },
    {
      id: 2,
      type: "certification",
      title: "New certificate issued",
      description: "ISCC-PLUS-2025-001235",
      timestamp: "4 hours ago",
      status: "success"
    },
    {
      id: 3,
      type: "material",
      title: "Low stock alert",
      description: "Petroleum-based Resin - 680kg remaining",
      timestamp: "6 hours ago",
      status: "warning"
    },
    {
      id: 4,
      type: "carbon",
      title: "Carbon footprint target achieved",
      description: "21.4% reduction vs 15% target",
      timestamp: "1 day ago",
      status: "success"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Database className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">ISCC+ Production Manager</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive production management system for sustainable materials with ISCC+ certification
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{dashboardStats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Plans</p>
                  <p className="text-2xl font-bold">{dashboardStats.activePlans}</p>
                </div>
                <ClipboardList className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Biomass Products</p>
                  <p className="text-2xl font-bold">{dashboardStats.biomassProducts}</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inventory Value</p>
                  <p className="text-2xl font-bold">${(dashboardStats.totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationCards.map((card, index) => (
            <Link key={index} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-48">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <card.icon className={`h-8 w-8 text-${card.color}-600`} />
                    {getTrendIcon(card.trend)}
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{card.stats}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/order-stock">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Create Purchase Order
                  </Button>
                </Link>
                <Link to="/production-plan">
                  <Button variant="outline" className="w-full justify-start">
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Create Production Plan
                  </Button>
                </Link>
                <Link to="/finished-products">
                  <Button variant="outline" className="w-full justify-start">
                    <Box className="h-4 w-4 mr-2" />
                    Generate Certificate
                  </Button>
                </Link>
                <Link to="/environmental-monitoring">
                  <Button variant="outline" className="w-full justify-start">
                    <Cloud className="h-4 w-4 mr-2" />
                    Monitor CEMS
                  </Button>
                </Link>
                <Link to="/digital-product-passport">
                  <Button variant="outline" className="w-full justify-start">
                    <Hash className="h-4 w-4 mr-2" />
                    Create DPP
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </Link>
                <Link to="/advanced-analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Analytics
                  </Button>
                </Link>
                <Link to="/supplier-portal">
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="h-4 w-4 mr-2" />
                    Add Supplier
                  </Button>
                </Link>
                <Link to="/quality">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Run Quality Test
                  </Button>
                </Link>
                <Link to="/utility-management">
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="h-4 w-4 mr-2" />
                    Monitor Utilities
                  </Button>
                </Link>
                <Link to="/mass-balance">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    View IMBL Dashboard
                  </Button>
                </Link>
                <Link to="/certificate-generator">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Generate Certificate
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">All Systems</p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">API Services</p>
                <p className="text-xs text-muted-foreground">Running</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">Backup</p>
                <p className="text-xs text-muted-foreground">Up to date</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;