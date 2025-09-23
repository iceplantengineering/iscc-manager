import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Database,
  Server,
  Cpu,
  Zap,
  Thermometer,
  Scale,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import { EdgeCollectorService } from '@/lib/iot/EdgeCollectorService';
import type {
  EdgeCollector,
  IoTDevice,
  SensorReading,
  IoTEvent,
  DeviceStatus
} from '@/lib/iot/types';

const EdgeCollectorDashboard = () => {
  const [service] = useState(() => EdgeCollectorService.getInstance());
  const [collectors, setCollectors] = useState<EdgeCollector[]>([]);
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [events, setEvents] = useState<IoTEvent[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for demonstration
  const mockCollectors: EdgeCollector[] = [
    {
      collectorId: 'COL_001',
      name: 'RM Warehouse Edge Collector',
      location: 'Raw Materials Warehouse',
      ipAddress: '192.168.1.101',
      port: 8080,
      status: {
        overall: 'HEALTHY',
        connectivity: true,
        processing: true,
        storage: true,
        lastUpdated: new Date(),
        errors: []
      },
      connectedDevices: ['RM_SCALE_001', 'RM_SCANNER_001', 'RM_LEVEL_001'],
      deviceCount: 3,
      dataBuffer: {
        bufferId: 'BUF_001',
        size: 1250,
        maxSize: 5000,
        usagePercentage: 25.0,
        data: [],
        compressionRatio: 0.85
      },
      lastSync: new Date(),
      configuration: {
        syncInterval: 30000,
        retryInterval: 5000,
        maxRetries: 3,
        bufferSize: 5000,
        compressionEnabled: true,
        encryptionEnabled: true,
        protocols: [{ name: 'MQTT', enabled: true, version: '3.1.1', configuration: {} }],
        endpoints: []
      },
      metrics: {
        uptime: 99.8,
        messagesReceived: 15420,
        messagesSent: 15380,
        bytesReceived: 2456000,
        bytesSent: 2412000,
        errorRate: 0.2,
        averageResponseTime: 45,
        lastDeviceUpdate: new Date(),
        devicesOnline: 3,
        devicesOffline: 0
      },
      health: {
        status: 'HEALTHY',
        checks: [
          { name: 'connectivity', status: 'PASS', message: 'All connections stable', timestamp: new Date(), duration: 15 },
          { name: 'buffer_usage', status: 'PASS', message: 'Buffer usage optimal', timestamp: new Date(), duration: 8 },
          { name: 'device_health', status: 'PASS', message: 'All devices online', timestamp: new Date(), duration: 12 }
        ],
        lastCheck: new Date(),
        nextCheck: new Date(Date.now() + 60000)
      }
    },
    {
      collectorId: 'COL_002',
      name: 'Manufacturing Edge Collector',
      location: 'Production Floor',
      ipAddress: '192.168.1.102',
      port: 8080,
      status: {
        overall: 'WARNING',
        connectivity: true,
        processing: true,
        storage: false,
        lastUpdated: new Date(),
        errors: []
      },
      connectedDevices: ['PLC_001', 'TEMP_001', 'PRESSURE_001', 'FLOW_001'],
      deviceCount: 4,
      dataBuffer: {
        bufferId: 'BUF_002',
        size: 4200,
        maxSize: 5000,
        usagePercentage: 84.0,
        data: [],
        compressionRatio: 0.82
      },
      lastSync: new Date(),
      configuration: {
        syncInterval: 30000,
        retryInterval: 5000,
        maxRetries: 3,
        bufferSize: 5000,
        compressionEnabled: true,
        encryptionEnabled: true,
        protocols: [{ name: 'OPC_UA', enabled: true, version: '1.04', configuration: {} }],
        endpoints: []
      },
      metrics: {
        uptime: 96.5,
        messagesReceived: 28350,
        messagesSent: 28100,
        bytesReceived: 4256000,
        bytesSent: 4212000,
        errorRate: 1.8,
        averageResponseTime: 78,
        lastDeviceUpdate: new Date(),
        devicesOnline: 3,
        devicesOffline: 1
      },
      health: {
        status: 'WARNING',
        checks: [
          { name: 'connectivity', status: 'PASS', message: 'Network connection stable', timestamp: new Date(), duration: 20 },
          { name: 'buffer_usage', status: 'WARNING', message: 'Buffer usage high (84%)', timestamp: new Date(), duration: 5 },
          { name: 'device_health', status: 'WARNING', message: '1 device offline', timestamp: new Date(), duration: 10 }
        ],
        lastCheck: new Date(),
        nextCheck: new Date(Date.now() + 60000)
      }
    }
  ];

  const mockDevices: IoTDevice[] = [
    {
      deviceId: 'RM_SCALE_001',
      deviceType: 'SENSOR',
      name: 'Weighbridge Scale 1',
      description: 'Raw material weighbridge for gross/tare weight measurement',
      location: 'RM Warehouse - Bay 1',
      protocol: {
        name: 'Modbus TCP',
        version: '1.0',
        type: 'MODBUS',
        parameters: { endpoint: '192.168.1.201:502', registerAddresses: [40001, 40002] },
        security: { type: 'NONE' }
      },
      address: '192.168.1.201',
      port: 502,
      scanRate: 1000,
      timeout: 5000,
      retryCount: 3,
      status: 'ONLINE',
      lastSeen: new Date(),
      lastReading: {
        readingId: 'read_001',
        deviceId: 'RM_SCALE_001',
        timestamp: new Date(),
        value: 1250.5,
        unit: 'kg',
        quality: { status: 'GOOD', confidence: 0.98 },
        isValid: true,
        validationErrors: [],
        tags: []
      },
      configuration: {
        samplingRate: 1000,
        bufferSize: 1000,
        compression: true,
        encryption: false,
        batching: { enabled: true, batchSize: 10, batchTimeout: 10000, maxWaitTime: 30000 },
        filtering: { enabled: true, rules: [] },
        validation: { enabled: true, rules: [] }
      },
      metadata: { model: 'Metler Toledo', serial: 'WT2021001', calibrationDate: '2024-01-15' }
    },
    {
      deviceId: 'PLC_001',
      deviceType: 'PLC',
      name: 'Stabilization PLC',
      description: 'Main PLC for stabilization furnace control',
      location: 'Production Line 1',
      protocol: {
        name: 'OPC UA',
        version: '1.04',
        type: 'OPC_UA',
        parameters: { endpoint: 'opc.tcp://192.168.1.151:4840', nodeIds: ['ns=2;s=Temperature'] },
        security: { type: 'NONE' }
      },
      address: '192.168.1.151',
      port: 4840,
      scanRate: 500,
      timeout: 3000,
      retryCount: 3,
      status: 'ONLINE',
      lastSeen: new Date(),
      configuration: {
        samplingRate: 500,
        bufferSize: 2000,
        compression: true,
        encryption: true,
        batching: { enabled: true, batchSize: 50, batchTimeout: 5000, maxWaitTime: 15000 },
        filtering: { enabled: true, rules: [] },
        validation: { enabled: true, rules: [] }
      },
      metadata: { model: 'Siemens S7-1500', firmware: '4.2.0', ipAddress: '192.168.1.151' }
    },
    {
      deviceId: 'TEMP_001',
      deviceType: 'SENSOR',
      name: 'Furnace Temperature Sensor',
      description: 'Temperature monitoring for stabilization furnace',
      location: 'Production Line 1 - Furnace 1',
      protocol: {
        name: 'Modbus TCP',
        version: '1.0',
        type: 'MODBUS',
        parameters: { endpoint: '192.168.1.161:502', registerAddresses: [40001] },
        security: { type: 'NONE' }
      },
      address: '192.168.1.161',
      port: 502,
      scanRate: 2000,
      timeout: 5000,
      retryCount: 3,
      status: 'ERROR',
      lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
      configuration: {
        samplingRate: 2000,
        bufferSize: 500,
        compression: true,
        encryption: false,
        batching: { enabled: true, batchSize: 25, batchTimeout: 10000, maxWaitTime: 30000 },
        filtering: { enabled: true, rules: [] },
        validation: { enabled: true, rules: [] }
      },
      metadata: { model: 'PT100', range: '0-400°C', accuracy: '±0.1°C' }
    }
  ];

  const mockEvents: IoTEvent[] = [
    {
      eventId: 'evt_001',
      eventType: 'DATA_RECEIVED',
      deviceId: 'RM_SCALE_001',
      timestamp: new Date(),
      severity: 'INFO',
      message: 'Weight reading: 1250.5 kg',
      details: { value: 1250.5, unit: 'kg', quality: 'GOOD' }
    },
    {
      eventId: 'evt_002',
      eventType: 'DEVICE_DISCONNECTED',
      deviceId: 'TEMP_001',
      timestamp: new Date(Date.now() - 300000),
      severity: 'ERROR',
      message: 'Device communication lost',
      details: { error: 'Connection timeout', retries: 3 }
    },
    {
      eventId: 'evt_003',
      eventType: 'ALARM_TRIGGERED',
      deviceId: 'COL_002',
      timestamp: new Date(Date.now() - 120000),
      severity: 'WARNING',
      message: 'Buffer usage above 80%',
      details: { currentUsage: 84, threshold: 80 }
    }
  ];

  useEffect(() => {
    initializeService();
  }, []);

  const initializeService = async () => {
    try {
      await service.initialize();
      setIsInitialized(true);

      // Register mock collectors and devices
      mockCollectors.forEach(collector => {
        service.registerCollector(collector);
      });

      mockDevices.forEach(device => {
        service.registerDevice(device);
      });

      setCollectors(mockCollectors);
      setDevices(mockDevices);
      setEvents(service.getEventLog(20));

      // Start real-time updates
      startRealTimeUpdates();
    } catch (error) {
      console.error('Failed to initialize Edge Collector Service:', error);
    }
  };

  const startRealTimeUpdates = () => {
    setInterval(() => {
      // Update collector metrics
      setCollectors(prev => prev.map(collector => ({
        ...collector,
        metrics: {
          ...collector.metrics,
          uptime: Math.random() * 3 + 97, // 97-100%
          messagesReceived: collector.metrics.messagesReceived + Math.floor(Math.random() * 10),
          messagesSent: collector.metrics.messagesSent + Math.floor(Math.random() * 8),
          lastDeviceUpdate: new Date()
        },
        dataBuffer: {
          ...collector.dataBuffer,
          size: Math.min(collector.dataBuffer.size + Math.floor(Math.random() * 20), collector.dataBuffer.maxSize),
          usagePercentage: Math.min(((collector.dataBuffer.size + Math.floor(Math.random() * 20)) / collector.dataBuffer.maxSize) * 100, 100)
        }
      })));

      // Update device status occasionally
      setDevices(prev => prev.map(device => {
        if (Math.random() > 0.95) { // 5% chance of status change
          const statuses: DeviceStatus[] = ['ONLINE', 'OFFLINE', 'ERROR', 'CONNECTING'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          return {
            ...device,
            status: newStatus,
            lastSeen: newStatus === 'ONLINE' ? new Date() : device.lastSeen
          };
        }
        return device;
      }));

      // Update events
      setEvents(service.getEventLog(20));
    }, 3000);
  };

  const refreshDashboard = async () => {
    setIsRefreshing(true);
    try {
      setCollectors(service.getAllCollectors());
      setDevices(service.getAllDevices());
      setEvents(service.getEventLog(20));
    } catch (error) {
      console.error('Dashboard refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':
      case 'ONLINE':
      case 'PASS':
        return 'text-green-600 bg-green-100';
      case 'WARNING':
      case 'OFFLINE':
        return 'text-yellow-600 bg-yellow-100';
      case 'ERROR':
      case 'FAIL':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY':
      case 'ONLINE':
      case 'PASS':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'ERROR':
      case 'FAIL':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'OFFLINE':
        return <WifiOff className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'SENSOR': return <Thermometer className="h-5 w-5" />;
      case 'PLC': return <Cpu className="h-5 w-5" />;
      case 'METER': return <Scale className="h-5 w-5" />;
      case 'SCANNER': return <Database className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edge Data Collectors</h1>
          <p className="text-muted-foreground">
            IoT device management and real-time data collection
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isInitialized ? "default" : "secondary"}>
            {isInitialized ? "Running" : "Initializing"}
          </Badge>
          <Button onClick={refreshDashboard} disabled={isRefreshing} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Collectors</p>
                <p className="text-2xl font-bold">{collectors.filter(c => c.status.overall === 'HEALTHY').length}</p>
                <p className="text-sm text-muted-foreground">of {collectors.length} total</p>
              </div>
              <Server className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Devices</p>
                <p className="text-2xl font-bold">{devices.filter(d => d.status === 'ONLINE').length}</p>
                <p className="text-sm text-muted-foreground">of {devices.length} total</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Processed</p>
                <p className="text-2xl font-bold">
                  {collectors.reduce((sum, c) => sum + c.metrics.messagesReceived, 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">messages</p>
              </div>
              <Database className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">
                  {collectors.length > 0 ? (collectors.reduce((sum, c) => sum + c.metrics.uptime, 0) / collectors.length).toFixed(1) : 0}%
                </p>
                <p className="text-sm text-muted-foreground">average uptime</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="collectors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="collectors">Collectors</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="events">Event Log</TabsTrigger>
        </TabsList>

        <TabsContent value="collectors">
          <div className="grid gap-4">
            {collectors.map((collector) => (
              <Card key={collector.collectorId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5" />
                      <div>
                        <span className="font-medium">{collector.name}</span>
                        <p className="text-sm text-muted-foreground">{collector.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(collector.status.overall)}>
                        {getStatusIcon(collector.status.overall)}
                        {collector.status.overall}
                      </Badge>
                      <Badge variant="outline">
                        {collector.connectedDevices.length}/{collector.deviceCount} Devices
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Connection Info</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>IP Address:</span>
                            <span className="font-medium">{collector.ipAddress}:{collector.port}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <div className="flex items-center gap-1">
                              {collector.status.connectivity ? <Wifi className="h-3 w-3 text-green-600" /> : <WifiOff className="h-3 w-3 text-red-600" />}
                              <span>{collector.status.connectivity ? 'Connected' : 'Disconnected'}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Sync:</span>
                            <span>{collector.lastSync.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Performance</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Uptime:</span>
                            <span className="font-medium">{collector.metrics.uptime.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Response Time:</span>
                            <span className="font-medium">{collector.metrics.averageResponseTime.toFixed(0)}ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Error Rate:</span>
                            <span className="font-medium">{collector.metrics.errorRate.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Data Buffer</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Usage:</span>
                            <span className="font-medium">{collector.dataBuffer.usagePercentage.toFixed(1)}%</span>
                          </div>
                          <Progress
                            value={collector.dataBuffer.usagePercentage}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{collector.dataBuffer.size} / {collector.dataBuffer.maxSize}</span>
                            <span>Compression: {(collector.dataBuffer.compressionRatio * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3 text-blue-600" />
                          <span>{formatBytes(collector.metrics.bytesReceived)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Upload className="h-3 w-3 text-green-600" />
                          <span>{formatBytes(collector.metrics.bytesSent)}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {collector.metrics.messagesReceived.toLocaleString()} / {collector.metrics.messagesSent.toLocaleString()} messages
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="devices">
          <div className="grid gap-4">
            {devices.map((device) => (
              <Card key={device.deviceId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.deviceType)}
                      <div>
                        <span className="font-medium">{device.name}</span>
                        <p className="text-sm text-muted-foreground">{device.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(device.status)}>
                      {getStatusIcon(device.status)}
                      {device.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Device Information</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="font-medium">{device.deviceType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Location:</span>
                            <span className="font-medium">{device.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Protocol:</span>
                            <span className="font-medium">{device.protocol.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Connection Settings</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Address:</span>
                            <span className="font-medium">{device.address}:{device.port}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Scan Interval:</span>
                            <span className="font-medium">{device.scanRate}ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Detected:</span>
                            <span className="font-medium">
                              {device.lastSeen ? device.lastSeen.toLocaleTimeString() : 'Never'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {device.lastReading && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Latest Data</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Value:</span>
                              <span className="font-medium">
                                {device.lastReading.value} {device.lastReading.unit}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quality:</span>
                              <Badge variant="outline" className={getStatusColor(device.lastReading.quality.status)}>
                                {device.lastReading.quality.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Validation:</span>
                              <span className={`font-medium ${device.lastReading.isValid ? 'text-green-600' : 'text-red-600'}`}>
                                {device.lastReading.isValid ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {device.metadata.model && `モデル: ${device.metadata.model}`}
                        {device.metadata.serial && ` • Serial: ${device.metadata.serial}`}
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3 mr-2" />
                        Settings
                      </Button>
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
                {events.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No events</p>
                  </div>
                ) : (
                  events.map((event) => (
                    <div key={event.eventId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(event.severity)}
                        <div>
                          <p className="font-medium">{event.eventType}</p>
                          <p className="text-sm text-muted-foreground">{event.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.deviceId} • {event.timestamp.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={event.severity === 'ERROR' ? 'destructive' :
                                      event.severity === 'WARNING' ? 'default' : 'secondary'}>
                        {event.severity}
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

export default EdgeCollectorDashboard;