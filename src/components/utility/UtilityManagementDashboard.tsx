import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Zap,
  Droplets,
  Wind,
  Thermometer,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Settings,
  Activity,
  Clock,
  Target,
  Leaf,
  DollarSign,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  BarChart3
} from 'lucide-react';

// Types for utility management
interface UtilityReading {
  id: string;
  timestamp: Date;
  utilityType: 'ELECTRICITY' | 'WATER' | 'STEAM' | 'COMPRESSED_AIR' | 'NATURAL_GAS';
  meterId: string;
  reading: number;
  unit: string;
  cost?: number;
  efficiency?: number;
  peakDemand?: boolean;
  renewablePercentage?: number;
  processArea: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
}

interface UtilityDevice {
  id: string;
  name: string;
  type: 'METER' | 'SENSOR' | 'CONTROLLER' | 'VALVE';
  utilityType: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastReading?: Date;
  efficiency: number;
  maintenanceSchedule?: Date;
  alerts: number;
}

interface OptimizationRecommendation {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  priority: 'low' | 'medium' | 'high';
  category: 'energy' | 'water' | 'cost' | 'maintenance';
  estimatedImplementation: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const UtilityManagementDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [isRealTime, setIsRealTime] = useState(true);
  const [utilityData, setUtilityData] = useState<UtilityReading[]>([]);
  const [devices, setDevices] = useState<UtilityDevice[]>([]);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);

  // Mock real-time data generation
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        generateRealTimeData();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const generateRealTimeData = () => {
    const newReading: UtilityReading = {
      id: `reading_${Date.now()}`,
      timestamp: new Date(),
      utilityType: 'ELECTRICITY',
      meterId: 'ELEC_M001',
      reading: Math.random() * 1000 + 2000,
      unit: 'kWh',
      cost: Math.random() * 50 + 200,
      efficiency: Math.random() * 20 + 80,
      renewablePercentage: Math.random() * 30 + 20,
      processArea: 'Production Line A',
      status: 'normal'
    };
    setUtilityData(prev => [...prev.slice(-99), newReading]);
  };

  // Sample data for charts
  const energyConsumptionData = [
    { hour: '00:00', consumption: 1200, cost: 144, renewable: 360 },
    { hour: '04:00', consumption: 800, cost: 96, renewable: 240 },
    { hour: '08:00', consumption: 2200, cost: 264, renewable: 660 },
    { hour: '12:00', consumption: 2800, cost: 336, renewable: 840 },
    { hour: '16:00', consumption: 3200, cost: 384, renewable: 960 },
    { hour: '20:00', consumption: 1800, cost: 216, renewable: 540 }
  ];

  const costBreakdownData = [
    { category: 'Electricity', value: 45, color: '#8884d8' },
    { category: 'Natural Gas', value: 25, color: '#82ca9d' },
    { category: 'Water', value: 15, color: '#ffc658' },
    { category: 'Steam', value: 10, color: '#ff7c7c' },
    { category: 'Compressed Air', value: 5, color: '#8dd1e1' }
  ];

  const efficiencyTrendData = [
    { date: '2024-01', efficiency: 75, target: 80 },
    { date: '2024-02', efficiency: 78, target: 80 },
    { date: '2024-03', efficiency: 82, target: 80 },
    { date: '2024-04', efficiency: 85, target: 80 },
    { date: '2024-05', efficiency: 87, target: 80 },
    { date: '2024-06', efficiency: 89, target: 80 }
  ];

  const deviceStatusData = [
    {
      id: 'DEV-001',
      name: 'Main Electricity Meter',
      type: 'METER',
      utilityType: 'ELECTRICITY',
      location: 'Substation A',
      status: 'online' as const,
      lastReading: new Date(Date.now() - 5 * 60 * 1000),
      efficiency: 95,
      alerts: 0
    },
    {
      id: 'DEV-002',
      name: 'Water Flow Sensor',
      type: 'SENSOR',
      utilityType: 'WATER',
      location: 'Production Line B',
      status: 'online' as const,
      lastReading: new Date(Date.now() - 2 * 60 * 1000),
      efficiency: 88,
      alerts: 1
    },
    {
      id: 'DEV-003',
      name: 'Steam Control Valve',
      type: 'VALVE',
      utilityType: 'STEAM',
      location: 'Boiler Room',
      status: 'maintenance' as const,
      lastReading: new Date(Date.now() - 60 * 60 * 1000),
      efficiency: 72,
      alerts: 2
    }
  ];

  const optimizationRecommendations: OptimizationRecommendation[] = [
    {
      id: 'OPT-001',
      title: 'Install Variable Frequency Drives',
      description: 'Upgrade motor controls to reduce energy consumption during low-load periods',
      potentialSavings: 15000,
      priority: 'high',
      category: 'energy',
      estimatedImplementation: '2-3 weeks',
      status: 'pending'
    },
    {
      id: 'OPT-002',
      title: 'Water Recycling System',
      description: 'Implement closed-loop cooling water system to reduce fresh water usage by 40%',
      potentialSavings: 8500,
      priority: 'medium',
      category: 'water',
      estimatedImplementation: '4-6 weeks',
      status: 'in_progress'
    },
    {
      id: 'OPT-003',
      title: 'Steam Trap Maintenance',
      description: 'Schedule preventive maintenance for steam traps to improve efficiency',
      potentialSavings: 3200,
      priority: 'medium',
      category: 'maintenance',
      estimatedImplementation: '1 week',
      status: 'pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      online: 'default',
      offline: 'secondary',
      maintenance: 'outline',
      normal: 'default',
      warning: 'outline',
      critical: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'secondary',
      medium: 'outline',
      high: 'destructive'
    } as const;

    return (
      <Badge variant={variants[priority as keyof typeof variants] || 'secondary'}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'offline':
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'maintenance':
      case 'warning':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const calculateTotalSavings = () => {
    return optimizationRecommendations
      .filter(rec => rec.status === 'completed')
      .reduce((sum, rec) => sum + rec.potentialSavings, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Utility Management & Energy Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time utility consumption monitoring and optimization platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant={isRealTime ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealTime(!isRealTime)}
            >
              <Activity className="h-4 w-4 mr-2" />
              {isRealTime ? 'Live' : 'Paused'}
            </Button>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Energy Usage</p>
                <p className="text-2xl font-bold">12,450 kWh</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">-5.2%</span>
                  <span className="text-muted-foreground">vs last week</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Water Consumption</p>
                <p className="text-2xl font-bold">8,250 L</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">+2.1%</span>
                  <span className="text-muted-foreground">vs last week</span>
                </div>
              </div>
              <Droplets className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">$4,280</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">-8.3%</span>
                  <span className="text-muted-foreground">vs last week</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency Score</p>
                <p className="text-2xl font-bold">87.3%</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+3.1%</span>
                  <span className="text-muted-foreground">improvement</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="devices">Device Management</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Real-time Consumption Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Energy Consumption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={energyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="consumption" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Current Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Current Utility Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Electricity</span>
                    </div>
                    {getStatusBadge('normal')}
                  </div>
                  <p className="text-2xl font-bold">2,450 kW</p>
                  <p className="text-sm text-muted-foreground">Current Load</p>
                  <Progress value={75} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">75% of capacity</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Water</span>
                    </div>
                    {getStatusBadge('normal')}
                  </div>
                  <p className="text-2xl font-bold">1,250 L/min</p>
                  <p className="text-sm text-muted-foreground">Flow Rate</p>
                  <Progress value={60} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">60% of capacity</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Steam</span>
                    </div>
                    {getStatusBadge('warning')}
                  </div>
                  <p className="text-2xl font-bold">8.5 bar</p>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <Progress value={85} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">85% of capacity</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">Compressed Air</span>
                    </div>
                    {getStatusBadge('normal')}
                  </div>
                  <p className="text-2xl font-bold">6.2 bar</p>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <Progress value={45} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">45% of capacity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Efficiency Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Efficiency Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={efficiencyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Actual Efficiency" />
                    <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Consumption Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Consumption Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={energyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumption" fill="#8884d8" name="Consumption (kWh)" />
                    <Bar dataKey="renewable" fill="#82ca9d" name="Renewable (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">$4,280</div>
                  <div className="text-sm text-muted-foreground">This Month</div>
                  <div className="flex items-center justify-center mt-1">
                    <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">-8.3%</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">$26,750</div>
                  <div className="text-sm text-muted-foreground">Year to Date Savings</div>
                  <div className="flex items-center justify-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+15.2%</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">$51,340</div>
                  <div className="text-sm text-muted-foreground">Projected Annual Savings</div>
                  <div className="flex items-center justify-center mt-1">
                    <Target className="h-4 w-4 text-purple-600 mr-1" />
                    <span className="text-xs text-purple-600">On target</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid gap-4">
            {deviceStatusData.map((device) => (
              <Card key={device.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{device.name}</p>
                          <Badge variant="outline">{device.type}</Badge>
                          {getStatusIcon(device.status)}
                          {getStatusBadge(device.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {device.utilityType} • {device.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Last Reading: {device.lastReading?.toLocaleString()}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Efficiency</span>
                          <span className="text-sm">{device.efficiency}%</span>
                        </div>
                        <Progress value={device.efficiency} className="h-2 w-48" />
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Alerts: {device.alerts}
                          </span>
                          {device.alerts > 0 && (
                            <Badge variant="destructive" size="sm">
                              {device.alerts}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <Activity className="h-4 w-4 mr-1" />
                        Diagnostics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationRecommendations.map((rec) => (
                    <div key={rec.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{rec.title}</p>
                          {getPriorityBadge(rec.priority)}
                          {getStatusBadge(rec.status)}
                        </div>
                        <span className="font-bold text-green-600">
                          ${rec.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {rec.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Implementation: {rec.estimatedImplementation}</span>
                        <span>Category: {rec.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Sustainability Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Carbon Reduction</span>
                      <span className="font-bold text-green-600">245 tons CO₂</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      78% of annual target achieved
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Renewable Energy</span>
                      <span className="font-bold text-green-600">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: 40% by 2025
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Water Efficiency</span>
                      <span className="font-bold text-blue-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Industry average: 72%
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total Savings Achieved</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${calculateTotalSavings().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UtilityManagementDashboard;