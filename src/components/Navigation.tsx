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
  Download,
  ChevronDown,
  MoreHorizontal
} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  // Core navigation items (always visible)
  const coreNavigationItems = [
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
    }
  ];

  // Management group
  const managementItems = [
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
    }
  ];

  // Analytics group
  const analyticsItems = [
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
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      description: "Reports & insights"
    }
  ];

  // Compliance group
  const complianceItems = [
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
    }
  ];

  // All items for mobile menu
  const allNavigationItems = [
    ...coreNavigationItems,
    ...managementItems,
    ...analyticsItems,
    ...complianceItems
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  // Dropdown menu component
  const DropdownMenu = ({ title, items, icon: Icon }: { title: string; items: any[]; icon: any }) => (
    <div className="relative group">
      <Button
        variant="ghost"
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Icon className="h-4 w-4 mr-2" />
        {title}
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>

      <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-4 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center space-x-8 min-w-0 flex-1">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <Database className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ISCC+ Manager</span>
            </Link>

            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
              {/* Core Navigation Items */}
              {coreNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Link>
              ))}

              {/* Management Dropdown */}
              <DropdownMenu
                title="Management"
                items={managementItems}
                icon={Building}
              />

              {/* Analytics Dropdown */}
              <DropdownMenu
                title="Analytics"
                items={analyticsItems}
                icon={BarChart3}
              />

              {/* Compliance Dropdown */}
              <DropdownMenu
                title="Compliance"
                items={complianceItems}
                icon={Award}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </nav>

      {/* Tablet Navigation */}
      <nav className="hidden md:flex lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Database className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">ISCC+ Manager</span>
          </Link>

          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
            {coreNavigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{item.title}</span>
              </Link>
            ))}

            {/* More Menu for Tablet */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreHorizontal className="h-4 w-4" />
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>

              <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Management
                  </div>
                  {managementItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-4 py-2 text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.title}
                    </Link>
                  ))}

                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                    Analytics
                  </div>
                  {analyticsItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-4 py-2 text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.title}
                    </Link>
                  ))}

                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                    Compliance
                  </div>
                  {complianceItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-4 py-2 text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="flex-shrink-0">
            <Settings className="h-4 w-4" />
          </Button>
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
              {allNavigationItems.map((item) => (
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