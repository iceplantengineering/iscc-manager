import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Factory,
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
  Globe
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
    totalMaterials: 24,
    certifiedMaterials: 18,
    activeBatches: 3,
    completedToday: 12,
    totalCertificates: 24,
    activeCertificates: 18,
    carbonReduction: 21.4,
    efficiency: 87.5
  };

  // Quick navigation cards
  const navigationCards = [
    {
      title: "Material Management",
      description: "Manage raw materials with sustainability tracking",
      icon: Package,
      href: "/materials",
      color: "blue",
      stats: `${dashboardStats.totalMaterials} materials`,
      trend: "up"
    },
    {
      title: "Production",
      description: "Batch management and production planning",
      icon: Factory,
      href: "/production",
      color: "green",
      stats: `${dashboardStats.activeBatches} active batches`,
      trend: "stable"
    },
    {
      title: "ISCC+ Certification",
      description: "Manage certificates and compliance",
      icon: Award,
      href: "/certification",
      color: "purple",
      stats: `${dashboardStats.activeCertificates} active`,
      trend: "up"
    },
    {
      title: "Carbon Footprint",
      description: "Track emissions and sustainability metrics",
      icon: Leaf,
      href: "/carbon",
      color: "emerald",
      stats: `${dashboardStats.carbonReduction}% reduction`,
      trend: "up"
    },
    {
      title: "Analytics",
      description: "Comprehensive insights and reporting",
      icon: BarChart3,
      href: "/analytics",
      color: "orange",
      stats: `${dashboardStats.efficiency}% efficiency`,
      trend: "up"
    }
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
                  <p className="text-sm text-muted-foreground">Total Materials</p>
                  <p className="text-2xl font-bold">{dashboardStats.totalMaterials}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Batches</p>
                  <p className="text-2xl font-bold">{dashboardStats.activeBatches}</p>
                </div>
                <Factory className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold">{dashboardStats.activeCertificates}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Carbon Reduction</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardStats.carbonReduction}%</p>
                </div>
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Link to="/materials">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Add New Material
                  </Button>
                </Link>
                <Link to="/production">
                  <Button variant="outline" className="w-full justify-start">
                    <Factory className="h-4 w-4 mr-2" />
                    Create New Batch
                  </Button>
                </Link>
                <Link to="/certification">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Generate Certificate
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Reports
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