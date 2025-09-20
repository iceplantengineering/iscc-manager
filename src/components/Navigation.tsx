import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  ShoppingCart,
  FileText,
  Settings,
  Menu,
  X,
  Leaf,
  BarChart3,
  Award,
  Zap,
  Package,
  Truck,
  Database,
  ClipboardList,
  Wrench,
  Box,
  Factory,
  Building,
  Shield,
  DollarSign,
  Brain,
  Download
} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      description: "Overview & key metrics"
    },
    {
      title: "Order & Stock",
      href: "/order-stock",
      icon: ShoppingCart,
      description: "Purchase orders & inventory"
    },
    {
      title: "Production Plan",
      href: "/production-plan",
      icon: ClipboardList,
      description: "Production planning & instructions"
    },
    {
      title: "Indirect Materials",
      href: "/indirect-materials",
      icon: Wrench,
      description: "Utilities & indirect materials"
    },
    {
      title: "Finished Products",
      href: "/finished-products",
      icon: Box,
      description: "Product inventory & certificates"
    },
    {
      title: "Supplier Portal",
      href: "/supplier-portal",
      icon: Building,
      description: "Supplier management & relations"
    },
    {
      title: "Quality Management",
      href: "/quality",
      icon: Shield,
      description: "Quality control & compliance"
    },
    {
      title: "Cost Analysis",
      href: "/cost-analysis",
      icon: DollarSign,
      description: "Cost tracking & optimization"
    },
    {
      title: "Predictive Analytics",
      href: "/predictive-analytics",
      icon: Brain,
      description: "AI-powered predictions & insights"
    },
    {
      title: "Advanced Reporting",
      href: "/advanced-reporting",
      icon: Download,
      description: "Report generation & exports"
    },
    {
      title: "ISCC+ Certification",
      href: "/certification",
      icon: Award,
      description: "Certificates & compliance"
    },
    {
      title: "Carbon Footprint",
      href: "/carbon",
      icon: Leaf,
      description: "Emissions & sustainability"
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      description: "Reports & insights"
    }
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ISCC+ Manager</span>
            </Link>

            <div className="flex space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">ISCC+ Manager</span>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="mt-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <div>
                    <div>{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;