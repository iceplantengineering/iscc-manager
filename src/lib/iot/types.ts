/**
 * IoT Data Collection Component Types
 * Defines interfaces for edge data collectors, protocols, and device management
 */

export interface IoTDevice {
  deviceId: string;
  deviceType: 'SENSOR' | 'PLC' | 'METER' | 'SCANNER' | 'ANALYZER' | 'ACTUATOR';
  name: string;
  description: string;
  location: string;
  protocol: IoTProtocol;
  address: string;
  port?: number;
  scanRate: number; // milliseconds
  timeout: number; // milliseconds
  retryCount: number;
  status: DeviceStatus;
  lastSeen?: Date;
  lastReading?: SensorReading;
  configuration: DeviceConfiguration;
  metadata: Record<string, any>;
}

export interface SensorReading {
  readingId: string;
  deviceId: string;
  timestamp: Date;
  value: number | string | boolean;
  unit: string;
  quality: DataQuality;
  rawValue?: any;
  processedValue?: any;
  tags: string[];
  isValid: boolean;
  validationErrors: string[];
}

export interface DataQuality {
  status: 'GOOD' | 'UNCERTAIN' | 'BAD' | 'INVALID';
  confidence: number; // 0-1
  reason?: string;
  details?: Record<string, any>;
}

export interface IoTProtocol {
  name: string;
  version: string;
  type: 'OPC_UA' | 'MQTT' | 'MODBUS' | 'HTTP_REST' | 'TCP_SOCKET' | 'WEBSOCKET';
  parameters: ProtocolParameters;
  security: ProtocolSecurity;
}

export interface ProtocolParameters {
  endpoint: string;
  username?: string;
  password?: string;
  clientId?: string;
  topic?: string;
  nodeIds?: string[];
  registerAddresses?: number[];
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
}

export interface ProtocolSecurity {
  type: 'NONE' | 'TLS' | 'SSL' | 'BASIC_AUTH' | 'OAUTH2' | 'CERTIFICATE';
  credentials?: SecurityCredentials;
  certificates?: CertificateInfo;
}

export interface SecurityCredentials {
  username: string;
  password: string;
  token?: string;
  apiKey?: string;
}

export interface CertificateInfo {
  certPath: string;
  keyPath: string;
  caPath?: string;
  passphrase?: string;
}

export interface DeviceConfiguration {
  samplingRate: number;
  bufferSize: number;
  compression: boolean;
  encryption: boolean;
  batching: BatchingConfig;
  filtering: FilterConfig;
  validation: ValidationConfig;
}

export interface BatchingConfig {
  enabled: boolean;
  batchSize: number;
  batchTimeout: number; // milliseconds
  maxWaitTime: number; // milliseconds
}

export interface FilterConfig {
  enabled: boolean;
  rules: FilterRule[];
}

export interface FilterRule {
  field: string;
  operator: 'EQUAL' | 'NOT_EQUAL' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS' | 'RANGE';
  value: any;
  minValue?: number;
  maxValue?: number;
}

export interface ValidationConfig {
  enabled: boolean;
  rules: ValidationRule[];
}

export interface ValidationRule {
  type: 'RANGE' | 'PATTERN' | 'REQUIRED' | 'CUSTOM';
  field: string;
  parameters: Record<string, any>;
  errorMessage: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
}

export type DeviceStatus =
  | 'UNKNOWN'
  | 'OFFLINE'
  | 'CONNECTING'
  | 'ONLINE'
  | 'ERROR'
  | 'MAINTENANCE'
  | 'DECOMMISSIONED';

export interface EdgeCollector {
  collectorId: string;
  name: string;
  location: string;
  ipAddress: string;
  port: number;
  status: CollectorStatus;
  connectedDevices: string[];
  deviceCount: number;
  dataBuffer: DataBuffer;
  lastSync: Date;
  configuration: CollectorConfiguration;
  metrics: CollectorMetrics;
  health: HealthStatus;
}

export interface CollectorStatus {
  overall: 'HEALTHY' | 'WARNING' | 'ERROR' | 'OFFLINE';
  connectivity: boolean;
  processing: boolean;
  storage: boolean;
  lastUpdated: Date;
  errors: ErrorLog[];
}

export interface DataBuffer {
  bufferId: string;
  size: number;
  maxSize: number;
  usagePercentage: number;
  data: BufferedData[];
  oldestData?: Date;
  newestData?: Date;
  compressionRatio: number;
}

export interface BufferedData {
  dataId: string;
  deviceId: string;
  timestamp: Date;
  dataType: 'SENSOR_READING' | 'DEVICE_STATUS' | 'ALARM' | 'EVENT';
  rawData: any;
  processedData?: any;
  compressedData?: string;
  encryptedData?: string;
  transmissionStatus: 'PENDING' | 'TRANSMITTED' | 'FAILED' | 'RETRYING';
  retryCount: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  tags: string[];
}

export interface CollectorConfiguration {
  syncInterval: number; // milliseconds
  retryInterval: number; // milliseconds
  maxRetries: number;
  bufferSize: number;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  protocols: SupportedProtocol[];
  endpoints: Endpoint[];
}

export interface SupportedProtocol {
  name: string;
  enabled: boolean;
  version: string;
  configuration: any;
}

export interface Endpoint {
  id: string;
  type: 'ISA95' | 'IMBL' | 'CLOUD' | 'DATABASE';
  url: string;
  authentication: Authentication;
  priority: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
}

export interface Authentication {
  type: 'NONE' | 'API_KEY' | 'OAUTH2' | 'CERTIFICATE' | 'BASIC_AUTH';
  credentials: Record<string, any>;
}

export interface CollectorMetrics {
  uptime: number; // percentage
  messagesReceived: number;
  messagesSent: number;
  bytesReceived: number;
  bytesSent: number;
  errorRate: number; // percentage
  averageResponseTime: number; // milliseconds
  lastDeviceUpdate: Date;
  devicesOnline: number;
  devicesOffline: number;
}

export interface HealthStatus {
  status: 'HEALTHY' | 'WARNING' | 'ERROR' | 'CRITICAL';
  checks: HealthCheck[];
  lastCheck: Date;
  nextCheck: Date;
}

export interface HealthCheck {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
  timestamp: Date;
  duration: number; // milliseconds
}

export interface ErrorLog {
  errorId: string;
  timestamp: Date;
  level: 'ERROR' | 'WARNING' | 'INFO' | 'DEBUG';
  component: string;
  message: string;
  details?: any;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface DataStream {
  streamId: string;
  name: string;
  deviceId: string;
  dataType: string;
  configuration: StreamConfiguration;
  status: StreamStatus;
  metrics: StreamMetrics;
  lastActivity: Date;
}

export interface StreamConfiguration {
  enabled: boolean;
  samplingRate: number;
  buffering: boolean;
  bufferSize: number;
  filtering: FilterConfig;
  transformation: TransformConfig[];
}

export interface TransformConfig {
  name: string;
  type: 'SCALE' | 'OFFSET' | 'CALIBRATE' | 'SMOOTH' | 'AGGREGATE';
  parameters: Record<string, any>;
  enabled: boolean;
}

export interface StreamStatus {
  state: 'RUNNING' | 'STOPPED' | 'ERROR' | 'PAUSED';
  lastUpdate: Date;
  errorCount: number;
  warningCount: number;
  throughput: number; // messages per second
}

export interface StreamMetrics {
  totalMessages: number;
  messageRate: number; // per minute
  averageValue: number;
  minValue: number;
  maxValue: number;
  standardDeviation: number;
  lastValue: any;
  timestamp: Date;
}

// Event Types
export interface IoTEvent {
  eventId: string;
  eventType: 'DEVICE_CONNECTED' | 'DEVICE_DISCONNECTED' | 'DATA_RECEIVED' | 'ALARM_TRIGGERED' | 'ERROR_OCCURRED' | 'SYNC_COMPLETED';
  deviceId: string;
  collectorId?: string;
  timestamp: Date;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  message: string;
  details?: any;
  correlationId?: string;
}

// Protocol Adapter Interface
export interface ProtocolAdapter {
  adapterId: string;
  name: string;
  protocol: IoTProtocol;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  configuration: any;
  connect(): Promise<boolean>;
  disconnect(): Promise<boolean>;
  readData(deviceId: string): Promise<SensorReading>;
  writeData(deviceId: string, data: any): Promise<boolean>;
  subscribe(deviceId: string, callback: (data: SensorReading) => void): Promise<void>;
  unsubscribe(deviceId: string): Promise<void>;
  getDeviceStatus(deviceId: string): Promise<DeviceStatus>;
}

// Data Collection Strategy
export interface CollectionStrategy {
  strategyId: string;
  name: string;
  type: 'POLLING' | 'SUBSCRIPTION' | 'BATCH' | 'EVENT_DRIVEN';
  configuration: any;
  execute(device: IoTDevice): Promise<SensorReading[]>;
}

// Analytics and Monitoring
export interface DeviceAnalytics {
  deviceId: string;
  timeRange: {
    start: Date;
    end: Date;
  };
  metrics: {
    availability: number;
    reliability: number;
    accuracy: number;
    responseTime: number;
    dataQuality: number;
  };
  trends: {
    values: number[];
    timestamps: Date[];
    trends: 'INCREASING' | 'DECREASING' | 'STABLE';
  };
  anomalies: AnomalyDetection[];
}

export interface AnomalyDetection {
  timestamp: Date;
  type: 'SPIKE' | 'DROP' | 'DRIFT' | 'OUTLIER';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  value: number;
  expectedRange: {
    min: number;
    max: number;
  };
  confidence: number;
}