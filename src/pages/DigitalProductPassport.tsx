import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DigitalProductPassportDashboard from '@/components/dpp/DigitalProductPassportDashboard';
import {
  Package,
  Hash,
  Leaf,
  QrCode,
  Shield,
  Globe,
  Smartphone,
  BarChart3,
  Settings,
  Database,
  TrendingUp,
  Target,
  Star,
  Award,
  CheckCircle
} from 'lucide-react';

const DigitalProductPassportPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Digital Product Passport Dashboard */}
      <DigitalProductPassportDashboard />
    </div>
  );
};

export default DigitalProductPassportPage;