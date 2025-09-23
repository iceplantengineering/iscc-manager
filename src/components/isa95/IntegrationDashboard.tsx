import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  RefreshCw,
  Layers,
  Database,
  Zap,
  Cloud,
  Cpu,
  Factory,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { ISA95IntegrationService } from '@/lib/isa95/IntegrationService';
import type {
  ISA95IntegrationEvent,
  ContractValidation,
  EdgeCollector,
  UtilityReading,
  EmissionReading
} from '@/lib/isa95/types';

const IntegrationDashboard = () => {
  const [service] = useState(() => ISA95IntegrationService.getInstance());
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [recentEvents, setRecentEvents] = useState<ISA95IntegrationEvent[]>([]);
  const [edgeCollectors, setEdgeCollectors] = useState<EdgeCollector[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for demonstration
  const mockLayerStatus = [
    {
      layer: 'L1 - Sensors/PLCs',
      status: 'healthy',
      deviceCount: 156,
      activeDevices: 148,
      lastUpdate: '2 minutes ago',
      description: 'Field devices and sensor data collection'
    },
    {
      layer: 'L2 - SCADA/Control',
      status: 'healthy',
      deviceCount: 24,
      activeDevices: 24,
      lastUpdate: '1 minute ago',
      description: 'Control systems and monitoring data'
    },
    {
      layer: 'L3 - MES/Execution',
      status: 'warning',
      deviceCount: 8,
      activeDevices: 7,
      lastUpdate: '5 minutes ago',
      description: 'Manufacturing execution system and batch management'
    },
    {
      layer: 'L4 - ERP/Planning',
      status: 'healthy',
      deviceCount: 4,
      activeDevices: 4,
      lastUpdate: '3 minutes ago',
      description: 'Business planning and logistics management'
    }
  ];

  const mockValidations: ContractValidation[] = [
    {
      contractId: 'C1-0_001',
      contractType: 'C1-0',
      sourceData: { sensors: 45, plcs: 12 },
      targetData: { validated: true },
      validationRules: [],
      validationResults: [
        { ruleId: 'schema', passed: true, message: 'Schema validation completed', severity: 'INFO' },
        { ruleId: 'timestamp', passed: false, message: 'Timestamp error detected', severity: 'WARNING' }
      ],
      overallStatus: 'WARNING',
      timestamp: {
        timestamp: new Date(),
        precision: 'millisecond',
        timezone: 'Asia/Tokyo',
        source: 'PTP'
      }
    },
    {
      contractId: 'C2-1_001',
      contractType: 'C2-1',
      sourceData: { scada: 18, batch: 6 },
      targetData: { validated: true },
      validationRules: [],
      validationResults: [
        { ruleId: 'progress', passed: true, message: 'Batch progress normal', severity: 'INFO' },
        { ruleId: 'recipe', passed: true, message: 'Recipe parameters match', severity: 'INFO' }
      ],
      overallStatus: 'VALID',
      timestamp: {
        timestamp: new Date(),
        precision: 'millisecond',
        timezone: 'Asia/Tokyo',
        source: 'PTP'
      }
    },
    {
      contractId: 'C3-2_001',
      contractType: 'C3-2',
      sourceData: { orders: 3, batches: 15 },
      targetData: { validated: true },
      validationRules: [],
      validationResults: [
        { ruleId: 'completion', passed: true, message: 'Production completion confirmed', severity: 'INFO' },
        { ruleId: 'balance', passed: false, message: 'Material balance error', severity: 'ERROR' }
      ],
      overallStatus: 'INVALID',
      timestamp: {
        timestamp: new Date(),
        precision: 'millisecond',
        timezone: 'Asia/Tokyo',
        source: 'PTP'
      }
    }
  ];

  const mockUtilityData: UtilityReading[] = [
    {
      utilityType: 'ELECTRICITY',
      meterId: 'ELEC_M001',
      reading: 1250.5,
      unit: 'kWh',
      timestamp: {
        timestamp: new Date(),
        precision: 'millisecond',
        timezone: 'Asia/Tokyo',
        source: 'PTP'
      },
      processArea: 'Stabilization Furnaces'
    },
    {
      utilityType: 'STEAM',
      meterId: 'STEAM_M001',
      reading: 245.8,
      unit: 'tons',
      timestamp: {
        timestamp: new Date(),
        precision: 'millisecond',
        timezone: 'Asia/Tokyo',
        source: 'PTP'
      },
      processArea: 'Carbonization Process'
    },
    {
      utilityType: 'NITROGEN',
      meterId: 'N2_M001',
      reading: 89.2,
      unit: 'kg',
      timestamp: {
        timestamp: new Date(),
        precision: 'millisecond',
        timezone: 'Asia/Tokyo',
        source: 'PTP'
      },
      processArea: 'Furnace Atmosphere'
    }
  ];

  useEffect(() => {
    refreshDashboard();
  }, []);

  const refreshDashboard = async () => {
    setIsRefreshing(true);
    try {
      // Get system health
      const health = await service.systemHealthCheck();
      setSystemHealth(health);

      // Get recent events
      const events = service.getEventLog(20);
      setRecentEvents(events);

      // Get edge collectors
      const collectors = service.getAllEdgeCollectors();
      setEdgeCollectors(collectors);
    } catch (error) {
      console.error('Dashboard refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'VALID':
      case 'COMPLETED':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'WARNING':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
      case 'INVALID':
      case 'FAILED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'VALID':
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
      case 'INVALID':
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLayerIcon = (layer: string) => {
    if (layer.includes('L1')) return <Cpu className="h-5 w-5" />;
    if (layer.includes('L2')) return <Activity className="h-5 w-5" />;
    if (layer.includes('L3')) return <Factory className="h-5 w-5" />;
    if (layer.includes('L4')) return <Database className="h-5 w-5" />;
    return <Layers className="h-5 w-5" />;
  };

  const getUtilityIcon = (type: string) => {
    switch (type) {
      case 'ELECTRICITY': return <Zap className="h-4 w-4 text-yellow-600" />;
      case 'STEAM': return <Cloud className="h-4 w-4 text-gray-600" />;
      case 'NITROGEN': return <Activity className="h-4 w-4 text-blue-600" />;
      default: return <Database className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">ISA-95 Integration Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of data flow and contract validation across automation pyramid layers
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className={getStatusColor(systemHealth?.status || 'unknown')}
          >
            {getStatusIcon(systemHealth?.status || 'unknown')}
            {systemHealth?.status || 'Unknown'}
          </Badge>
          <Button onClick={refreshDashboard} disabled={isRefreshing} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Edge Collectors</p>
                <p className="text-2xl font-bold">{systemHealth?.details.edgeCollectors || 0}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Contracts</p>
                <p className="text-2xl font-bold">{systemHealth?.details.activeContracts || 0}</p>
                <p className="text-sm text-muted-foreground">Validating</p>
              </div>
              <Database className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Events</p>
                <p className="text-2xl font-bold">{systemHealth?.details.recentEvents || 0}</p>
                <p className="text-sm text-muted-foreground">Last hour</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">
                  {mockLayerStatus.reduce((acc, layer) =>
                    acc + (layer.activeDevices / layer.deviceCount), 0
                  ) / mockLayerStatus.length * 100
                }%
                </p>
                <p className="text-sm text-muted-foreground">All layers average</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="layers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="layers">Layer Status</TabsTrigger>
          <TabsTrigger value="validations">Contract Validation</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
          <TabsTrigger value="events">Event Log</TabsTrigger>
        </TabsList>

        <TabsContent value="layers">
          <div className="grid gap-4">
            {mockLayerStatus.map((layer, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {getLayerIcon(layer.layer)}
                    {layer.layer}
                    <Badge variant="outline" className={getStatusColor(layer.status)}>
                      {getStatusIcon(layer.status)}
                      {layer.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Device Operation</p>
                      <div className="mt-2">
                        <Progress value={(layer.activeDevices / layer.deviceCount) * 100} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">
                          {layer.activeDevices} / {layer.deviceCount} devices active
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Update</p>
                      <p className="text-lg font-medium">{layer.lastUpdate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="text-sm">{layer.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validations">
          <div className="space-y-4">
            {mockValidations.map((validation, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5" />
                      {validation.contractId}
                      <Badge variant="outline" className={getStatusColor(validation.overallStatus)}>
                        {getStatusIcon(validation.overallStatus)}
                        {validation.overallStatus}
                      </Badge>
                    </div>
                    <Badge variant="secondary">
                      {validation.contractType}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {validation.validationResults.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.passed ? 'VALID' : 'INVALID')}
                          <div>
                            <p className="font-medium">{result.ruleId}</p>
                            <p className="text-sm text-muted-foreground">{result.message}</p>
                          </div>
                        </div>
                        <Badge variant={result.severity === 'ERROR' ? 'destructive' :
                                        result.severity === 'WARNING' ? 'default' : 'secondary'}>
                          {result.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="utilities">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUtilityData.map((utility, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {getUtilityIcon(utility.utilityType)}
                    {utility.utilityType}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Meter ID</span>
                      <span className="font-medium">{utility.meterId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Reading</span>
                      <span className="font-medium">{utility.reading} {utility.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Process Area</span>
                      <span className="text-sm">{utility.processArea}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Updated</span>
                      <span className="text-sm">
                        {utility.timestamp.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-5 w-5" />
                Event Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No events available</p>
                  </div>
                ) : (
                  recentEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(event.status)}
                        <div>
                          <p className="font-medium">{event.eventType}</p>
                          <p className="text-sm text-muted-foreground">
                            L{event.sourceLayer} → L{event.targetLayer || 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.timestamp.timestamp.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={event.status === 'COMPLETED' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationDashboard;