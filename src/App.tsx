import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import OrderStock from "./pages/OrderStock";
import ProductionPlan from "./pages/ProductionPlan";
import IndirectMaterials from "./pages/IndirectMaterials";
import FinishedProducts from "./pages/FinishedProducts";
import Certification from "./pages/Certification";
import Carbon from "./pages/Carbon";
import Analytics from "./pages/Analytics";
import SupplierPortal from "./pages/SupplierPortal";
import Quality from "./pages/Quality";
import CostAnalysis from "./pages/CostAnalysis";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
import AdvancedReporting from "./pages/AdvancedReporting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/order-stock" element={<OrderStock />} />
            <Route path="/production-plan" element={<ProductionPlan />} />
            <Route path="/indirect-materials" element={<IndirectMaterials />} />
            <Route path="/finished-products" element={<FinishedProducts />} />
            <Route path="/supplier-portal" element={<SupplierPortal />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/cost-analysis" element={<CostAnalysis />} />
            <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
            <Route path="/advanced-reporting" element={<AdvancedReporting />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/carbon" element={<Carbon />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
