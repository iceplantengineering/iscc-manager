/**
 * ISA-95 Integration Layer Types
 * Defines the data contracts and interfaces for each ISA-95 layer
 * following the standard automation pyramid structure
 */

export interface ISA95Timestamp {
  timestamp: Date;
  precision: 'microsecond' | 'millisecond' | 'second';
  timezone: string;
  source: 'PTP' | 'NTP' | 'RFC3161' | 'SYSTEM';
}

export interface DataContract<T> {
  id: string;
  version: string;
  schema: T;
  isValid: boolean;
  validationErrors: string[];
  hash: string;
  previousHash?: string;
  timestamp: ISA95Timestamp;
}

// Level 1 - Sensor/Field Device Layer
export interface L1SensorReading {
  sensorId: string;
  sensorType: 'WEIGHBRIDGE' | 'LEVEL_SENSOR' | 'TEMPERATURE' | 'PRESSURE' | 'FLOW' | 'COMPOSITION';
  value: number;
  unit: string;
  quality: 'GOOD' | 'UNCERTAIN' | 'BAD';
  timestamp: ISA95Timestamp;
  location: string;
  equipmentId?: string;
}

export interface L1PLCData {
  plcId: string;
  programName: string;
  cycleTime: number;
  inputs: Record<string, L1SensorReading>;
  outputs: Record<string, any>;
  alarms: L1Alarm[];
  timestamp: ISA95Timestamp;
}

export interface L1Alarm {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  acknowledged: boolean;
  timestamp: ISA95Timestamp;
}

// Level 2 - Control System Layer
export interface L2SCADAData {
  systemId: string;
  tagName: string;
  value: any;
  engineeringUnit: string;
  timestamp: ISA95Timestamp;
  quality: 'GOOD' | 'UNCERTAIN' | 'BAD';
  description: string;
  dataSource: 'PLC' | 'SENSOR' | 'CALCULATED';
}

export interface L2ControlLoop {
  loopId: string;
  processVariable: L2SCADAData;
  setpoint: number;
  output: number;
  mode: 'AUTO' | 'MANUAL' | 'CASCADE';
  timestamp: ISA95Timestamp;
}

export interface L2BatchData {
  batchId: string;
  batchPhase: string;
  phaseProgress: number;
  actualValues: Record<string, L2SCADAData>;
  recipeParameters: Record<string, number>;
  startTime: ISA95Timestamp;
  estimatedEndTime: Date;
}

// Level 3 - Manufacturing Execution Layer
export interface L3ProductionOrder {
  orderId: string;
  materialId: string;
  targetQuantity: number;
  actualQuantity: number;
  unit: string;
  status: 'SCHEDULED' | 'RUNNING' | 'COMPLETED' | 'CANCELLED';
  startTime: ISA95Timestamp;
  endTime?: ISA95Timestamp;
  equipmentId: string;
  recipeId: string;
  batches: L3BatchRecord[];
}

export interface L3BatchRecord {
  batchId: string;
  orderId: string;
  materialId: string;
  startTime: ISA95Timestamp;
  endTime?: ISA95Timestamp;
  quantity: number;
  qualityStatus: 'PENDING' | 'PASSED' | 'FAILED' | 'REJECTED';
  qualityData: L3QualityData[];
  genealogy: L3MaterialGenealogy;
}

export interface L3QualityData {
  testId: string;
  parameter: string;
  specification: {
    min: number;
    max: number;
    unit: string;
  };
  actualValue: number;
  result: 'PASS' | 'FAIL' | 'WARNING';
  timestamp: ISA95Timestamp;
  analyst: string;
  equipmentId: string;
}

export interface L3MaterialGenealogy {
  batchId: string;
  parentBatches: string[];
  childBatches: string[];
  consumedMaterials: L3MaterialConsumption[];
  producedMaterials: L3MaterialProduction[];
}

export interface L3MaterialConsumption {
  materialId: string;
  batchId: string;
  quantity: number;
  unit: string;
  timestamp: ISA95Timestamp;
  isSustainable: boolean;
}

export interface L3MaterialProduction {
  materialId: string;
  batchId: string;
  quantity: number;
  unit: string;
  timestamp: ISA95Timestamp;
  isSustainable: boolean;
}

// Level 4 - Business Planning & Logistics Layer
export interface L4SalesOrder {
  orderId: string;
  customerId: string;
  materialId: string;
  quantity: number;
  unit: string;
  deliveryDate: Date;
  status: 'OPEN' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  productionOrders: L4ProductionPlan[];
}

export interface L4ProductionPlan {
  planId: string;
  salesOrderId?: string;
  materialId: string;
  plannedQuantity: number;
  scheduledStart: Date;
  scheduledEnd: Date;
  status: 'PLANNED' | 'RELEASED' | 'IN_PROGRESS' | 'COMPLETED';
  assignedResources: string[];
  requirements: L4PlanRequirement[];
}

export interface L4PlanRequirement {
  type: 'MATERIAL' | 'EQUIPMENT' | 'LABOR' | 'UTILITY';
  resourceId: string;
  quantity: number;
  unit: string;
  isCritical: boolean;
}

export interface L4InventoryRecord {
  materialId: string;
  location: string;
  quantity: number;
  unit: string;
  batchNumber?: string;
  qualityStatus: 'AVAILABLE' | 'QUARANTINED' | 'RESERVED' | 'EXPIRED';
  lastUpdated: ISA95Timestamp;
  isSustainable: boolean;
  poolBalance?: number;
}

// Utility Management Interface
export interface UtilityReading {
  utilityType: 'STEAM' | 'ELECTRICITY' | 'NITROGEN' | 'WATER' | 'NATURAL_GAS' | 'COMPRESSED_AIR';
  meterId: string;
  reading: number;
  unit: string;
  timestamp: ISA95Timestamp;
  equipmentId?: string;
  processArea?: string;
}

export interface UtilityAggregation {
  utilityType: string;
  timeSliceStart: Date;
  timeSliceEnd: Date;
  totalConsumption: number;
  unit: string;
  cost: number;
  carbonIntensity: number; // kg CO2e per unit
  sourceMeters: string[];
}

// Emissions Monitoring Interface
export interface EmissionReading {
  pollutant: 'CO2' | 'NOX' | 'SOX' | 'VOC' | 'PARTICULATE';
  stackId: string;
  concentration: number;
  flowRate: number;
  temperature: number;
  timestamp: ISA95Timestamp;
  unit: string;
  method: 'CEMS' | 'CALCULATED' | 'MANUAL';
}

export interface EmissionAggregation {
  pollutant: string;
  timeSliceStart: Date;
  timeSliceEnd: Date;
  totalEmissions: number;
  unit: string;
  emissionRate: number;
  complianceStatus: 'COMPLIANT' | 'EXCEEDED' | 'WARNING';
  permitLimit?: number;
}

// Contract Validation Interface
export interface ContractValidation {
  contractId: string;
  contractType: 'C1-0' | 'C2-1' | 'C3-2' | 'C4-3';
  sourceData: any;
  targetData: any;
  validationRules: ValidationRule[];
  validationResults: ValidationResult[];
  overallStatus: 'VALID' | 'INVALID' | 'WARNING';
  timestamp: ISA95Timestamp;
}

export interface ValidationRule {
  ruleId: string;
  ruleType: 'SCHEMA' | 'RANGE' | 'CONSISTENCY' | 'TIMESTAMP' | 'CALCULATION';
  description: string;
  parameters: Record<string, any>;
}

export interface ValidationResult {
  ruleId: string;
  passed: boolean;
  message: string;
  details?: any;
  severity: 'ERROR' | 'WARNING' | 'INFO';
}

// Integration Event Types
export interface ISA95IntegrationEvent {
  eventId: string;
  eventType: 'DATA_RECEIVED' | 'CONTRACT_VALIDATION' | 'LEDGER_UPDATE' | 'ALERT';
  sourceLayer: 1 | 2 | 3 | 4;
  targetLayer?: 1 | 2 | 3 | 4;
  data: any;
  timestamp: ISA95Timestamp;
  correlationId?: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  errorMessage?: string;
}

// Edge Collector Interface
export interface EdgeCollector {
  collectorId: string;
  location: string;
  ipAddress: string;
  protocols: string[];
  connectedDevices: EdgeDevice[];
  dataBuffer: BufferedData[];
  lastSync: ISA95Timestamp;
  status: 'ONLINE' | 'OFFLINE' | 'ERROR';
}

export interface EdgeDevice {
  deviceId: string;
  deviceType: 'SENSOR' | 'PLC' | 'METER' | 'SCANNER' | 'ANALYZER';
  protocol: string;
  address: string;
  scanRate: number; // milliseconds
  lastReading?: ISA95Timestamp;
  status: 'ACTIVE' | 'INACTIVE' | 'FAULT';
}

export interface BufferedData {
  dataId: string;
  deviceId: string;
  timestamp: ISA95Timestamp;
  rawData: any;
  processedData?: any;
  transmissionStatus: 'PENDING' | 'TRANSMITTED' | 'FAILED';
  retryCount: number;
}