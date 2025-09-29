import {
  ISA95Timestamp,
  DataContract,
  L1SensorReading,
  L1PLCData,
  L2SCADAData,
  L2ControlLoop,
  L2BatchData,
  L3ProductionOrder,
  L3BatchRecord,
  L4SalesOrder,
  L4ProductionPlan,
  UtilityReading,
  EmissionReading,
  ContractValidation,
  ValidationRule,
  ValidationResult,
  ISA95IntegrationEvent,
  EdgeCollector
} from './types';

/**
 * ISA-95 Integration Service
 * Handles data flow, validation, and transformation between ISA-95 layers
 */
export class ISA95IntegrationService {
  private static instance: ISA95IntegrationService;
  private eventLog: ISA95IntegrationEvent[] = [];
  private edgeCollectors: Map<string, EdgeCollector> = new Map();
  private dataContracts: Map<string, DataContract<any>> = new Map();

  private constructor() {}

  static getInstance(): ISA95IntegrationService {
    if (!ISA95IntegrationService.instance) {
      ISA95IntegrationService.instance = new ISA95IntegrationService();
    }
    return ISA95IntegrationService.instance;
  }

  // Helper method to create timestamps
  private createTimestamp(precision: 'microsecond' | 'millisecond' | 'second' = 'millisecond', source: 'PTP' | 'NTP' | 'RFC3161' | 'SYSTEM' = 'SYSTEM'): ISA95Timestamp {
    return {
      timestamp: new Date(),
      precision,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      source
    };
  }

  // Helper method to log events
  private logEvent(event: Omit<ISA95IntegrationEvent, 'eventId' | 'timestamp' | 'status'>): void {
    const fullEvent: ISA95IntegrationEvent = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: this.createTimestamp(),
      status: 'PENDING',
      ...event
    };

    this.eventLog.push(fullEvent);
    console.log(`[ISA95 Integration] ${event.eventType}: ${JSON.stringify(event.data)}`);
  }

  // Level 1 to Level 2 Integration
  async processL1ToL2(sensorData: L1SensorReading[], plcData: L1PLCData[]): Promise<ContractValidation> {
    this.logEvent({
      eventType: 'DATA_RECEIVED',
      sourceLayer: 1,
      targetLayer: 2,
      data: { sensorCount: sensorData.length, plcCount: plcData.length },
      correlationId: `l1_l2_${Date.now()}`
    });

    const validationRules: ValidationRule[] = [
      {
        ruleId: 'schema_l1_sensor',
        ruleType: 'SCHEMA',
        description: 'Validate L1 sensor data schema',
        parameters: { required: ['sensorId', 'sensorType', 'value', 'unit', 'quality'] }
      },
      {
        ruleId: 'timestamp_accuracy',
        ruleType: 'TIMESTAMP',
        description: 'Validate timestamp precision and synchronization',
        parameters: { maxAgeMs: 5000, precision: 'millisecond' }
      },
      {
        ruleId: 'data_quality',
        ruleType: 'RANGE',
        description: 'Validate data quality indicators',
        parameters: { validQualities: ['GOOD', 'UNCERTAIN'] }
      }
    ];

    const results: ValidationResult[] = [];

    // Validate sensor data
    for (const sensor of sensorData) {
      // Schema validation
      const requiredFields = ['sensorId', 'sensorType', 'value', 'unit', 'quality'];
      const missingFields = requiredFields.filter(field => !(sensor as any)[field]);

      if (missingFields.length > 0) {
        results.push({
          ruleId: 'schema_l1_sensor',
          passed: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
          severity: 'ERROR'
        });
      } else {
        results.push({
          ruleId: 'schema_l1_sensor',
          passed: true,
          message: 'Schema validation passed',
          severity: 'INFO'
        });
      }

      // Quality validation
      if (sensor.quality === 'BAD') {
        results.push({
          ruleId: 'data_quality',
          passed: false,
          message: `Sensor ${sensor.sensorId} has BAD quality`,
          severity: 'WARNING'
        });
      }

      // Timestamp validation
      const age = Date.now() - sensor.timestamp.timestamp.getTime();
      if (age > 5000) {
        results.push({
          ruleId: 'timestamp_accuracy',
          passed: false,
          message: `Sensor ${sensor.sensorId} timestamp is ${age}ms old`,
          severity: 'WARNING'
        });
      }
    }

    const overallStatus = results.every(r => r.passed || r.severity === 'INFO') ? 'VALID' :
                         results.some(r => !r.passed && r.severity === 'ERROR') ? 'INVALID' : 'WARNING';

    const validation: ContractValidation = {
      contractId: 'C1-0',
      contractType: 'C1-0',
      sourceData: { sensorData, plcData },
      targetData: { validated: true, resultCount: results.length },
      validationRules,
      validationResults: results,
      overallStatus,
      timestamp: this.createTimestamp()
    };

    this.logEvent({
      eventType: 'CONTRACT_VALIDATION',
      sourceLayer: 1,
      targetLayer: 2,
      data: { status: overallStatus, resultsCount: results.length },
      correlationId: validation.contractId
    });

    return validation;
  }

  // Level 2 to Level 3 Integration
  async processL2ToL3(scadaData: L2SCADAData[], batchData: L2BatchData[]): Promise<ContractValidation> {
    this.logEvent({
      eventType: 'DATA_RECEIVED',
      sourceLayer: 2,
      targetLayer: 3,
      data: { scadaCount: scadaData.length, batchCount: batchData.length },
      correlationId: `l2_l3_${Date.now()}`
    });

    const validationRules: ValidationRule[] = [
      {
        ruleId: 'batch_progress',
        ruleType: 'RANGE',
        description: 'Validate batch phase progress',
        parameters: { min: 0, max: 100 }
      },
      {
        ruleId: 'recipe_consistency',
        ruleType: 'CONSISTENCY',
        description: 'Validate recipe parameter consistency',
        parameters: { requiredParams: ['temperature', 'pressure', 'time'] }
      },
      {
        ruleId: 'data_reconciliation',
        ruleType: 'CALCULATION',
        description: 'Reconcile SCADA and batch data',
        parameters: { tolerance: 0.05 }
      }
    ];

    const results: ValidationResult[] = [];

    // Validate batch progress
    for (const batch of batchData) {
      if (batch.phaseProgress < 0 || batch.phaseProgress > 100) {
        results.push({
          ruleId: 'batch_progress',
          passed: false,
          message: `Batch ${batch.batchId} progress ${batch.phaseProgress}% out of range`,
          severity: 'ERROR'
        });
      }

      // Validate recipe parameters
      const requiredParams = ['temperature', 'pressure', 'time'];
      const missingParams = requiredParams.filter(param => !(batch.recipeParameters as any)[param]);

      if (missingParams.length > 0) {
        results.push({
          ruleId: 'recipe_consistency',
          passed: false,
          message: `Batch ${batch.batchId} missing recipe parameters: ${missingParams.join(', ')}`,
          severity: 'WARNING'
        });
      }
    }

    const overallStatus = results.every(r => r.passed || r.severity === 'INFO') ? 'VALID' :
                         results.some(r => !r.passed && r.severity === 'ERROR') ? 'INVALID' : 'WARNING';

    const validation: ContractValidation = {
      contractId: 'C2-1',
      contractType: 'C2-1',
      sourceData: { scadaData, batchData },
      targetData: { validated: true, batchCount: batchData.length },
      validationRules,
      validationResults: results,
      overallStatus,
      timestamp: this.createTimestamp()
    };

    return validation;
  }

  // Level 3 to Level 4 Integration
  async processL3ToL4(productionOrders: L3ProductionOrder[], batchRecords: L3BatchRecord[]): Promise<ContractValidation> {
    this.logEvent({
      eventType: 'DATA_RECEIVED',
      sourceLayer: 3,
      targetLayer: 4,
      data: { orderCount: productionOrders.length, batchCount: batchRecords.length },
      correlationId: `l3_l4_${Date.now()}`
    });

    const validationRules: ValidationRule[] = [
      {
        ruleId: 'order_completion',
        ruleType: 'CONSISTENCY',
        description: 'Validate order completion vs batch records',
        parameters: { tolerance: 0.02 }
      },
      {
        ruleId: 'material_balance',
        ruleType: 'CALCULATION',
        description: 'Validate material consumption vs production',
        parameters: { tolerance: 0.01 }
      },
      {
        ruleId: 'genealogy_tracking',
        ruleType: 'CONSISTENCY',
        description: 'Validate material genealogy completeness',
        parameters: { requireParentChild: true }
      }
    ];

    const results: ValidationResult[] = [];

    // Validate order vs batch consistency
    for (const order of productionOrders) {
      const relatedBatches = batchRecords.filter(batch => batch.orderId === order.orderId);
      const totalBatchQuantity = relatedBatches.reduce((sum, batch) => sum + batch.quantity, 0);

      if (order.status === 'COMPLETED') {
        const variance = Math.abs(order.actualQuantity - totalBatchQuantity) / order.targetQuantity;
        if (variance > 0.02) {
          results.push({
            ruleId: 'order_completion',
            passed: false,
            message: `Order ${order.orderId} quantity variance ${variance.toFixed(2)}% exceeds tolerance`,
            severity: 'WARNING'
          });
        }
      }
    }

    // Validate material genealogy
    for (const batch of batchRecords) {
      if (!batch.genealogy.batchId || batch.genealogy.batchId !== batch.batchId) {
        results.push({
          ruleId: 'genealogy_tracking',
          passed: false,
          message: `Batch ${batch.batchId} has incomplete genealogy data`,
          severity: 'ERROR'
        });
      }
    }

    const overallStatus = results.every(r => r.passed || r.severity === 'INFO') ? 'VALID' :
                         results.some(r => !r.passed && r.severity === 'ERROR') ? 'INVALID' : 'WARNING';

    const validation: ContractValidation = {
      contractId: 'C3-2',
      contractType: 'C3-2',
      sourceData: { productionOrders, batchRecords },
      targetData: { validated: true, orderCount: productionOrders.length },
      validationRules,
      validationResults: results,
      overallStatus,
      timestamp: this.createTimestamp()
    };

    return validation;
  }

  // Utility Data Processing
  async processUtilityData(utilityReadings: UtilityReading[]): Promise<UtilityReading[]> {
    this.logEvent({
      eventType: 'DATA_RECEIVED',
      sourceLayer: 1,
      targetLayer: 4,
      data: { utilityCount: utilityReadings.length },
      correlationId: `utility_${Date.now()}`
    });

    // Validate and normalize utility readings
    const validatedReadings: UtilityReading[] = [];

    for (const reading of utilityReadings) {
      // Basic validation
      if (reading.reading < 0) {
        console.warn(`Negative reading detected for ${reading.utilityType} meter ${reading.meterId}`);
        continue;
      }

      // Create a validated copy
      const validatedReading: UtilityReading = {
        ...reading,
        timestamp: this.createTimestamp('millisecond', 'PTP')
      };

      validatedReadings.push(validatedReading);
    }

    return validatedReadings;
  }

  // Emissions Data Processing
  async processEmissionData(emissionReadings: EmissionReading[]): Promise<EmissionReading[]> {
    this.logEvent({
      eventType: 'DATA_RECEIVED',
      sourceLayer: 1,
      targetLayer: 4,
      data: { emissionCount: emissionReadings.length },
      correlationId: `emission_${Date.now()}`
    });

    // Validate and normalize emission readings
    const validatedReadings: EmissionReading[] = [];

    for (const reading of emissionReadings) {
      // Basic validation
      if (reading.concentration < 0 || reading.flowRate < 0) {
        console.warn(`Invalid emission data for ${reading.pollutant} stack ${reading.stackId}`);
        continue;
      }

      // Create a validated copy
      const validatedReading: EmissionReading = {
        ...reading,
        timestamp: this.createTimestamp('millisecond', 'PTP')
      };

      validatedReadings.push(validatedReading);
    }

    return validatedReadings;
  }

  // Edge Collector Management
  registerEdgeCollector(collector: EdgeCollector): void {
    this.edgeCollectors.set(collector.collectorId, collector);
    this.logEvent({
      eventType: 'DATA_RECEIVED',
      sourceLayer: 1,
      data: { action: 'REGISTER_COLLECTOR', collectorId: collector.collectorId },
      correlationId: `collector_${collector.collectorId}`
    });
  }

  getEdgeCollector(collectorId: string): EdgeCollector | undefined {
    return this.edgeCollectors.get(collectorId);
  }

  getAllEdgeCollectors(): EdgeCollector[] {
    return Array.from(this.edgeCollectors.values());
  }

  // Data Contract Management
  createDataContract<T>(data: T, schema: any): DataContract<T> {
    const contractId = `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const hash = this.generateHash(data);

    const contract: DataContract<T> = {
      id: contractId,
      version: '1.0',
      schema,
      isValid: true,
      validationErrors: [],
      hash,
      timestamp: this.createTimestamp()
    };

    this.dataContracts.set(contractId, contract);
    return contract;
  }

  getDataContract(contractId: string): DataContract<any> | undefined {
    return this.dataContracts.get(contractId);
  }

  // Event Log Management
  getEventLog(limit?: number): ISA95IntegrationEvent[] {
    const events = [...this.eventLog].reverse();
    return limit ? events.slice(0, limit) : events;
  }

  clearEventLog(): void {
    this.eventLog = [];
  }

  // Helper method for hash generation (simplified)
  private generateHash(data: any): string {
    // In a real implementation, this would use a proper cryptographic hash
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  // System Health Check
  async systemHealthCheck(): Promise<{
    status: 'HEALTHY' | 'WARNING' | 'ERROR';
    details: {
      edgeCollectors: number;
      activeContracts: number;
      recentEvents: number;
      lastValidation: string;
    };
  }> {
    const activeCollectors = Array.from(this.edgeCollectors.values()).filter(c => c.status === 'ONLINE').length;
    const recentEvents = this.eventLog.filter(e =>
      e.timestamp.timestamp.getTime() > Date.now() - 3600000 // Last hour
    ).length;

    const lastValidation = this.eventLog
      .filter(e => e.eventType === 'CONTRACT_VALIDATION')
      .sort((a, b) => b.timestamp.timestamp.getTime() - a.timestamp.timestamp.getTime())[0];

    const status = activeCollectors > 0 && recentEvents > 0 ? 'HEALTHY' :
                   activeCollectors === 0 ? 'ERROR' : 'WARNING';

    return {
      status,
      details: {
        edgeCollectors: activeCollectors,
        activeContracts: this.dataContracts.size,
        recentEvents,
        lastValidation: lastValidation?.timestamp.timestamp.toISOString() || 'Never'
      }
    };
  }
}