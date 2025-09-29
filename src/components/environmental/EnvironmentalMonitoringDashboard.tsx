import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  ScatterChart,
  Scatter,
  ComposedChart
} from 'recharts';
import {
  Cloud,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Database,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Zap,
  Factory,
  Gauge,
  MapPin,
  Clock,
  BarChart3,
  Leaf,
  Radio,
  Wifi,
  Server,
  Settings,
  Bell,
  FileText,
  Eye,
  Edit
} from 'lucide-react';

// Types for environmental monitoring
interface EmissionReading {
  id: string;
  timestamp: Date;
  parameter: 'CO2' | 'NOX' | 'SO2' | 'CO' | 'VOC' | 'PM2.5' | 'PM10' | 'O3';
  value: number;
  unit: string;
  limit: number;
  status: 'normal' | 'warning' | 'critical' | 'exceeded';
  stack?: string;
  monitoringPoint: string;
  cemsId: string;
  isValidated: boolean;
  temperature?: number;
  pressure?: number;
  flowRate?: number;
}

interface CEMSSensor {
  id: string;
  name: string;
  type: 'ANALYZER' | 'FLOWMETER' | 'OPACITY' | 'TEMPERATURE' | 'PRESSURE';
  parameter: string;
  location: string;
  stack: string;
  status: 'online' | 'offline' | 'maintenance' | 'calibration';
  lastCalibration: Date;
  nextCalibration: Date;
  efficiency: number;
  alerts: number;
  isCertified: boolean;
  certificationExpiry: Date;
}

interface ComplianceReport {
  id: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  regulatoryBody: string;
  overallStatus: 'compliant' | 'non_compliant' | 'under_review';
  emissionParameters: {
    parameter: string;
    totalEmissions: number;
    allowableLimit: number;
    compliance: boolean;
    excursions: number;
  }[];
  violations: {
    parameter: string;
    date: Date;
    value: number;
    limit: number;
    severity: 'minor' | 'major' | 'critical';
    status: 'open' | 'resolved' | 'under_investigation';
  }[];
  recommendations: string[];
}

interface EnvironmentalAlert {
  id: string;
  type: 'EXCEEDANCE' | 'EQUIPMENT_FAILURE' | 'CALIBRATION_DUE' | 'DATA_GAP' | 'COMPLIANCE';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  parameter?: string;
  stack?: string;
  acknowledged: boolean;
  actionRequired: boolean;
  dueDate?: Date;
}

const EnvironmentalMonitoringDashboard = () => {
  const [activeTab, setActiveTab] = useState('realtime');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [isRealTime, setIsRealTime] = useState(true);
  const [emissionData, setEmissionData] = useState<EmissionReading[]>([]);
  const [alerts, setAlerts] = useState<EnvironmentalAlert[]>([]);
  const [cemsSensors, setCemsSensors] = useState<CEMSSensor[]>([]);

  // Mock real-time data generation
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        generateRealTimeEmissionData();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const generateRealTimeEmissionData = () => {
    const parameters = ['CO2', 'NOX', 'SO2', 'CO', 'PM2.5'];
    const randomParam = parameters[Math.floor(Math.random() * parameters.length)];

    const newReading: EmissionReading = {
      id: `emission_${Date.now()}`,
      timestamp: new Date(),
      parameter: randomParam as any,
      value: Math.random() * 100 + 20,
      unit: randomParam === 'CO2' ? 'mg/m³' : 'ppm',
      limit: getParameterLimit(randomParam),
      status: Math.random() > 0.8 ? 'warning' : 'normal',
      stack: 'Stack A',
      monitoringPoint: 'Main Emission Point',
      cemsId: 'CEMS-001',
      isValidated: Math.random() > 0.1,
      temperature: Math.random() * 50 + 150,
      pressure: Math.random() * 5 + 101,
      flowRate: Math.random() * 20 + 80
    };
    setEmissionData(prev => [...prev.slice(-49), newReading]);
  };

  const getParameterLimit = (parameter: string): number => {
    const limits = {
      'CO2': 500,
      'NOX': 150,
      'SO2': 100,
      'CO': 50,
      'VOC': 30,
      'PM2.5': 25,
      'PM10': 50,
      'O3': 75
    };
    return limits[parameter as keyof typeof limits] || 100;
  };

  // Sample emission data for charts
  const emissionTrendsData = [
    { hour: '00:00', CO2: 120, NOX: 45, SO2: 25, CO: 12, PM25: 8 },
    { hour: '04:00', CO2: 135, NOX: 52, SO2: 28, CO: 15, PM25: 10 },
    { hour: '08:00', CO2: 280, NOX: 85, SO2: 45, CO: 25, PM25: 18 },
    { hour: '12:00', CO2: 320, NOX: 95, SO2: 52, CO: 28, PM25: 22 },
    { hour: '16:00', CO2: 350, NOX: 88, SO2: 48, CO: 24, PM25: 20 },
    { hour: '20:00', CO2: 250, NOX: 72, SO2: 38, CO: 20, PM25: 15 }
  ];

  const complianceData = [
    { parameter: 'CO2', current: 320, limit: 400, compliance: 120 },
    { parameter: 'NOX', current: 85, limit: 100, compliance: 115 },
    { parameter: 'SO2', current: 48, limit: 75, compliance: 127 },
    { parameter: 'CO', current: 24, limit: 50, compliance: 126 },
    { parameter: 'PM2.5', current: 18, limit: 25, compliance: 107 }
  ];

  const cemsSensorsData: CEMSSensor[] = [
    {
      id: 'CEMS-001',
      name: 'Stack A CO2 Analyzer',
      type: 'ANALYZER',
      parameter: 'CO2',
      location: 'Main Stack',
      stack: 'Stack A',
      status: 'online',
      lastCalibration: new Date('2024-01-15'),
      nextCalibration: new Date('2024-04-15'),
      efficiency: 98,
      alerts: 0,
      isCertified: true,
      certificationExpiry: new Date('2024-12-31')
    },
    {
      id: 'CEMS-002',
      name: 'Stack A NOX Analyzer',
      type: 'ANALYZER',
      parameter: 'NOX',
      location: 'Main Stack',
      stack: 'Stack A',
      status: 'online',
      lastCalibration: new Date('2024-01-10'),
      nextCalibration: new Date('2024-04-10'),
      efficiency: 96,
      alerts: 1,
      isCertified: true,
      certificationExpiry: new Date('2024-12-31')
    },
    {
      id: 'FLOW-001',
      name: 'Stack A Flow Meter',
      type: 'FLOWMETER',
      parameter: 'Flow Rate',
      location: 'Main Stack',
      stack: 'Stack A',
      status: 'maintenance',
      lastCalibration: new Date('2024-01-01'),
      nextCalibration: new Date('2024-04-01'),
      efficiency: 88,
      alerts: 2,
      isCertified: true,
      certificationExpiry: new Date('2024-12-31')
    }
  ];

  const environmentalAlerts: EnvironmentalAlert[] = [
    {
      id: 'ALERT-001',
      type: 'EXCEEDANCE',
      severity: 'medium',
      title: 'NOX Level Exceedance',
      description: 'NOX levels exceeded 90% of permit limit for 15 minutes',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      parameter: 'NOX',
      stack: 'Stack A',
      acknowledged: false,
      actionRequired: true,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    {
      id: 'ALERT-002',
      type: 'CALIBRATION_DUE',
      severity: 'low',
      title: 'Sensor Calibration Due',
      description: 'Stack A Flow Meter requires calibration within 7 days',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      parameter: 'Flow Rate',
      stack: 'Stack A',
      acknowledged: true,
      actionRequired: true,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'ALERT-003',
      type: 'EQUIPMENT_FAILURE',
      severity: 'high',
      title: 'Data Logger Offline',
      description: 'Primary data logger for Stack B stopped transmitting',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      stack: 'Stack B',
      acknowledged: false,
      actionRequired: true,
      dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000)
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      online: 'default',
      offline: 'secondary',
      maintenance: 'outline',
      calibration: 'outline',
      normal: 'default',
      warning: 'outline',
      critical: 'destructive',
      exceeded: 'destructive',
      compliant: 'default',
      non_compliant: 'destructive',
      under_review: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'secondary',
      medium: 'outline',
      high: 'default',
      critical: 'destructive'
    } as const;

    return (
      <Badge variant={variants[severity as keyof typeof variants] || 'secondary'}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'normal':
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'offline':
      case 'critical':
      case 'exceeded':
      case 'non_compliant':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'maintenance':
      case 'calibration':
      case 'warning':
      case 'under_review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const calculateComplianceRate = () => {
    const compliant = complianceData.filter(item => item.current <= item.limit).length;
    return (compliant / complianceData.length) * 100;
  };

  const getActiveAlerts = () => {
    return environmentalAlerts.filter(alert => !alert.acknowledged);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Environmental Monitoring & CEMS</h1>
          <p className="text-muted-foreground">
            Continuous emission monitoring system and environmental compliance tracking
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
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              {selectedTimeRange}
            </Button>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                <p className="text-2xl font-bold">{calculateComplianceRate()}%</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+2.1%</span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{getActiveAlerts().length}</p>
                <div className="flex items-center gap-1 text-sm">
                  <AlertTriangle className="h-3 w-3 text-yellow-600" />
                  <span className="text-yellow-600">{getActiveAlerts().filter(a => a.severity === 'high').length} high priority</span>
                </div>
              </div>
              <Bell className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CEMS Uptime</p>
                <p className="text-2xl font-bold">98.2%</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+0.5%</span>
                  <span className="text-muted-foreground">reliability</span>
                </div>
              </div>
              <Radio className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Emissions</p>
                <p className="text-2xl font-bold">1,245 t</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">-5.8%</span>
                  <span className="text-muted-foreground">vs target</span>
                </div>
              </div>
              <Cloud className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts Section */}
      {getActiveAlerts().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Active Environmental Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getActiveAlerts().map((alert) => (
                <Alert key={alert.id} className={alert.severity === 'critical' ? 'border-red-500' : ''}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    <span>{alert.title}</span>
                    {getSeverityBadge(alert.severity)}
                  </AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">{alert.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {alert.timestamp.toLocaleString()} • {alert.stack}
                      </span>
                      {alert.dueDate && (
                        <span className="text-muted-foreground">
                          Due: {alert.dueDate.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-time Monitoring</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="cems">CEMS Management</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Real-time Emissions Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Emission Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emissionTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="CO2" stroke="#8884d8" name="CO₂ (mg/m³)" />
                    <Line type="monotone" dataKey="NOX" stroke="#82ca9d" name="NOₓ (ppm)" />
                    <Line type="monotone" dataKey="SO2" stroke="#ffc658" name="SO₂ (ppm)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Current Emission Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Current Emission Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((item) => (
                    <div key={item.parameter} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.parameter}</span>
                          {getStatusIcon(item.current <= item.limit ? 'normal' : 'warning')}
                        </div>
                        <span className="text-sm font-bold">
                          {item.current} / {item.limit} {item.parameter === 'CO2' ? 'mg/m³' : 'ppm'}
                        </span>
                      </div>
                      <Progress
                        value={Math.min((item.current / item.limit) * 100, 100)}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{Math.round((item.current / item.limit) * 100)}% of limit</span>
                        <span>Compliance: {item.compliance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Compliance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Regulatory Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">EPA Part 75</span>
                      {getStatusBadge('compliant')}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Continuous Emission Monitoring
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Last Audit: March 15, 2024</span>
                      <span>Next Audit: September 15, 2024</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">State Air Permit</span>
                      {getStatusBadge('compliant')}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Air Quality Operating Permit
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Permit #: AP-2024-001</span>
                      <span>Expires: Dec 31, 2024</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Greenhouse Gas Reporting</span>
                      {getStatusBadge('under_review')}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Mandatory GHG Emissions Reporting
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Q1 Report Submitted</span>
                      <span>Q2 Due: July 31, 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emission Compliance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Emission vs Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="parameter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#8884d8" name="Current Level" />
                    <Bar dataKey="limit" fill="#82ca9d" name="Permit Limit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">98.2%</div>
                  <div className="text-sm text-muted-foreground">Overall Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">142</div>
                  <div className="text-sm text-muted-foreground">Days Without Violation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-muted-foreground">Active Violations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">$45K</div>
                  <div className="text-sm text-muted-foreground">Potential Fines</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cems" className="space-y-6">
          <div className="grid gap-4">
            {cemsSensorsData.map((sensor) => (
              <Card key={sensor.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{sensor.name}</p>
                          <Badge variant="outline">{sensor.type}</Badge>
                          {getStatusIcon(sensor.status)}
                          {getStatusBadge(sensor.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {sensor.parameter} • {sensor.location} • {sensor.stack}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span>Calibration: {sensor.nextCalibration.toLocaleDateString()}</span>
                          <span>Certified: {sensor.isCertified ? 'Yes' : 'No'}</span>
                          {sensor.certificationExpiry && (
                            <span>Expires: {sensor.certificationExpiry.toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Efficiency</span>
                          <span className="text-sm">{sensor.efficiency}%</span>
                        </div>
                        <Progress value={sensor.efficiency} className="h-2 w-48" />
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Alerts: {sensor.alerts}
                          </span>
                          {sensor.alerts > 0 && (
                            <Badge variant="destructive" size="sm">
                              {sensor.alerts}
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
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Logs
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Emission Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Monthly Emission Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Reporting Period</p>
                      <p className="font-medium">March 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      {getStatusBadge('compliant')}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Emission Totals</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>CO₂</span>
                        <span>245.8 tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NOₓ</span>
                        <span>12.4 tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SO₂</span>
                        <span>8.2 tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PM2.5</span>
                        <span>2.1 tons</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Certificate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate ID</p>
                      <p className="font-medium">CEMS-CERT-2024-001</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issue Date</p>
                      <p className="font-medium">January 15, 2024</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Certified Parameters</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">CO₂</Badge>
                      <Badge variant="outline">NOₓ</Badge>
                      <Badge variant="outline">SO₂</Badge>
                      <Badge variant="outline">CO</Badge>
                      <Badge variant="outline">PM2.5</Badge>
                      <Badge variant="outline">Flow Rate</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Annual Compliance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Annual Compliance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">99.2%</div>
                  <div className="text-sm text-muted-foreground">Annual Compliance Rate</div>
                  <div className="text-xs text-green-600 mt-1">Industry Average: 95.8%</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-muted-foreground">Reportable Violations</div>
                  <div className="text-xs text-green-600 mt-1">Clean Record Maintained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">2,847</div>
                  <div className="text-sm text-muted-foreground">Validated Hours</div>
                  <div className="text-xs text-green-600 mt-1">99.8% Data Availability</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnvironmentalMonitoringDashboard;