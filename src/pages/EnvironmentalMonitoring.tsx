import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnvironmentalMonitoringDashboard from '@/components/environmental/EnvironmentalMonitoringDashboard';
import {
  Leaf,
  Cloud,
  Wind,
  AlertTriangle,
  Shield,
  Activity,
  BarChart3,
  FileText,
  Settings,
  Database,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

const EnvironmentalMonitoringPage = () => {
  const [activeTab, setActiveTab] = useState("monitoring");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Environmental Monitoring Dashboard */}
      <EnvironmentalMonitoringDashboard />
    </div>
  );
};

export default EnvironmentalMonitoringPage;