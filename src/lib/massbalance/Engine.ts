import {
  MaterialPool,
  LedgerEvent,
  TimeSlice,
  MassBalanceSummary,
  MaterialMovement,
  PoolAdjustment,
  ValidationRule
} from '../imbl/types';

/**
 * Advanced Mass Balance Engine
 * Provides real-time pool tracking, sophisticated calculations, and validation logic
 */
export class MassBalanceEngine {
  private static instance: MassBalanceEngine;
  private pools: Map<string, MaterialPool> = new Map();
  private events: LedgerEvent[] = [];
  private timeSlices: Map<string, TimeSlice> = new Map();
  private currentTimeSlice: TimeSlice | null = null;
  private validationRules: ValidationRule[] = [];

  private constructor() {
    this.initializeDefaultPools();
    this.initializeValidationRules();
  }

  static getInstance(): MassBalanceEngine {
    if (!MassBalanceEngine.instance) {
      MassBalanceEngine.instance = new MassBalanceEngine();
    }
    return MassBalanceEngine.instance;
  }

  // Initialize default material pools
  private initializeDefaultPools(): void {
    const defaultPools: MaterialPool[] = [
      {
        id: 'SUSTAINABLE_PAN',
        name: 'Sustainable PAN Precursor',
        type: 'SUSTAINABLE',
        currentBalance: 2500,
        unit: 'kg',
        minimumBalance: 100,
        maximumBalance: 10000,
        createdBy: 'SYSTEM',
        createdAt: new Date(),
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
        isActive: true,
        materialId: 'PAN_SUSTAINABLE',
        location: 'RM Warehouse',
        qualityStatus: 'CERTIFIED',
        batchNumber: 'BATCH_SUST_001',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        costPerUnit: 2.5,
        currency: 'USD',
        supplierId: 'SUPPLIER_001',
        certificationId: 'ISCC_CERT_001',
        carbonFootprint: 0.8,
        waterFootprint: 50,
        energyConsumption: 12,
        metadata: {
          sustainabilityScore: 95,
          origin: 'Biomass',
          certification: 'ISCC PLUS'
        }
      },
      {
        id: 'CONVENTIONAL_PAN',
        name: 'Conventional PAN Precursor',
        type: 'CONVENTIONAL',
        currentBalance: 3200,
        unit: 'kg',
        minimumBalance: 100,
        maximumBalance: 10000,
        createdBy: 'SYSTEM',
        createdAt: new Date(),
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
        isActive: true,
        materialId: 'PAN_CONVENTIONAL',
        location: 'RM Warehouse',
        qualityStatus: 'CERTIFIED',
        batchNumber: 'BATCH_CONV_001',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        costPerUnit: 2.2,
        currency: 'USD',
        supplierId: 'SUPPLIER_002',
        carbonFootprint: 2.1,
        waterFootprint: 45,
        energyConsumption: 10,
        metadata: {
          origin: 'Fossil-based',
          certification: 'Standard'
        }
      },
      {
        id: 'SUSTAINABLE_CARBON_FIBER',
        name: 'Sustainable Carbon Fiber',
        type: 'SUSTAINABLE',
        currentBalance: 850,
        unit: 'kg',
        minimumBalance: 50,
        maximumBalance: 5000,
        createdBy: 'SYSTEM',
        createdAt: new Date(),
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
        isActive: true,
        materialId: 'CF_SUSTAINABLE',
        location: 'FG Warehouse',
        qualityStatus: 'CERTIFIED',
        batchNumber: 'BATCH_CF_SUST_001',
        expiryDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000), // 2 years
        costPerUnit: 15.8,
        currency: 'USD',
        supplierId: 'INTERNAL',
        carbonFootprint: 1.2,
        waterFootprint: 200,
        energyConsumption: 85,
        metadata: {
          yield: 0.85, // 85% yield from PAN
          process: 'Carbonization',
          certification: 'ISCC PLUS'
        }
      },
      {
        id: 'CONVENTIONAL_CARBON_FIBER',
        name: 'Conventional Carbon Fiber',
        type: 'CONVENTIONAL',
        currentBalance: 1200,
        unit: 'kg',
        minimumBalance: 50,
        maximumBalance: 5000,
        createdBy: 'SYSTEM',
        createdAt: new Date(),
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
        isActive: true,
        materialId: 'CF_CONVENTIONAL',
        location: 'FG Warehouse',
        qualityStatus: 'CERTIFIED',
        batchNumber: 'BATCH_CF_CONV_001',
        expiryDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000),
        costPerUnit: 14.2,
        currency: 'USD',
        supplierId: 'INTERNAL',
        carbonFootprint: 3.5,
        waterFootprint: 180,
        energyConsumption: 80,
        metadata: {
          yield: 0.87,
          process: 'Carbonization',
          certification: 'Standard'
        }
      }
    ];

    defaultPools.forEach(pool => {
      this.pools.set(pool.id, pool);
    });

    this.initializeCurrentTimeSlice();
  }

  // Initialize validation rules
  private initializeValidationRules(): void {
    this.validationRules = [
      {
        id: 'POOL_BALANCE_VALID',
        name: 'Pool Balance Validation',
        description: 'Ensure material pool balances are within acceptable limits',
        type: 'RANGE',
        parameters: { min: 0, max: 'MAXIMUM_BALANCE' },
        severity: 'ERROR',
        isActive: true
      },
      {
        id: 'MASS_BALANCE_EQUATION',
        name: 'Mass Balance Equation',
        description: 'Validate mass balance: Input - Output = Accumulation',
        type: 'CALCULATION',
        parameters: { tolerance: 0.01 },
        severity: 'ERROR',
        isActive: true
      },
      {
        id: 'SUSTAINABILITY_RATIO',
        name: 'Sustainability Ratio',
        description: 'Ensure sustainable/conventional ratio meets requirements',
        type: 'RANGE',
        parameters: { min: 0.1, max: 1.0 },
        severity: 'WARNING',
        isActive: true
      },
      {
        id: 'BATCH_INTEGRITY',
        name: 'Batch Integrity',
        description: 'Validate batch genealogy and material tracking',
        type: 'CONSISTENCY',
        parameters: { requireCompleteGenealogy: true },
        severity: 'ERROR',
        isActive: true
      },
      {
        id: 'TIME_SLICE_CONTINUITY',
        name: 'Time Slice Continuity',
        description: 'Ensure continuous time slice coverage',
        type: 'TEMPORAL',
        parameters: { maxGapMs: 1000 },
        severity: 'WARNING',
        isActive: true
      }
    ];
  }

  // Initialize current time slice
  private initializeCurrentTimeSlice(): void {
    this.currentTimeSlice = {
      sliceId: this.generateTimeSliceId(),
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000), // 1 hour slice
      status: 'OPEN',
      openingBalances: this.getCurrentBalances(),
      events: [],
      closingBalances: {},
      adjustments: [],
      checksum: '',
      createdBy: 'SYSTEM',
      createdAt: new Date(),
      isValid: true,
      validationErrors: []
    };

    this.timeSlices.set(this.currentTimeSlice.sliceId, this.currentTimeSlice);
  }

  // Add material inward movement
  addMaterialInward(
    poolId: string,
    quantity: number,
    source: string,
    referenceId?: string,
    metadata?: Record<string, any>
  ): LedgerEvent {
    const pool = this.pools.get(poolId);
    if (!pool) {
      throw new Error(`Pool ${poolId} not found`);
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const event: LedgerEvent = {
      eventId: this.generateEventId(),
      timestamp: new Date(),
      eventType: 'INWARD_BALANCE_' + pool.type,
      poolId,
      quantity,
      unit: pool.unit,
      source,
      destination: poolId,
      referenceId,
      batchNumber: pool.batchNumber,
      qualityStatus: pool.qualityStatus,
      sustainabilityScore: pool.metadata?.sustainabilityScore || 0,
      carbonFootprint: pool.carbonFootprint,
      waterFootprint: pool.waterFootprint,
      energyConsumption: pool.energyConsumption,
      costPerUnit: pool.costPerUnit,
      currency: pool.currency,
      previousHash: this.getLatestHash(),
      checksum: '',
      isValid: true,
      validationErrors: [],
      createdBy: 'USER',
      createdAt: new Date(),
      metadata
    };

    event.checksum = this.generateChecksum(event);

    // Update pool balance
    pool.currentBalance += quantity;
    pool.updatedAt = new Date();
    pool.updatedBy = 'USER';

    // Add to events
    this.events.push(event);

    // Add to current time slice
    if (this.currentTimeSlice) {
      this.currentTimeSlice.events.push(event);
    }

    // Validate after update
    this.validatePoolBalances();

    return event;
  }

  // Add material outward movement
  addMaterialOutward(
    poolId: string,
    quantity: number,
    destination: string,
    referenceId?: string,
    metadata?: Record<string, any>
  ): LedgerEvent {
    const pool = this.pools.get(poolId);
    if (!pool) {
      throw new Error(`Pool ${poolId} not found`);
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    if (pool.currentBalance < quantity) {
      throw new Error(`Insufficient balance in pool ${poolId}. Available: ${pool.currentBalance}, Required: ${quantity}`);
    }

    const event: LedgerEvent = {
      eventId: this.generateEventId(),
      timestamp: new Date(),
      eventType: 'OUTWARD_BALANCE_' + pool.type,
      poolId,
      quantity: -quantity, // Negative for outward
      unit: pool.unit,
      source: poolId,
      destination,
      referenceId,
      batchNumber: pool.batchNumber,
      qualityStatus: pool.qualityStatus,
      sustainabilityScore: pool.metadata?.sustainabilityScore || 0,
      carbonFootprint: pool.carbonFootprint,
      waterFootprint: pool.waterFootprint,
      energyConsumption: pool.energyConsumption,
      costPerUnit: pool.costPerUnit,
      currency: pool.currency,
      previousHash: this.getLatestHash(),
      checksum: '',
      isValid: true,
      validationErrors: [],
      createdBy: 'USER',
      createdAt: new Date(),
      metadata
    };

    event.checksum = this.generateChecksum(event);

    // Update pool balance
    pool.currentBalance -= quantity;
    pool.updatedAt = new Date();
    pool.updatedBy = 'USER';

    // Add to events
    this.events.push(event);

    // Add to current time slice
    if (this.currentTimeSlice) {
      this.currentTimeSlice.events.push(event);
    }

    // Validate after update
    this.validatePoolBalances();

    return event;
  }

  // Process batch reconciliation
  processBatchReconciliation(
    batchId: string,
    actualQuantity: number,
    expectedQuantity: number,
    varianceReason: string,
    adjustmentType: 'CORRECTION' | 'LOSS' | 'GAIN' | 'QUALITY_ADJUST'
  ): LedgerEvent {
    const variance = actualQuantity - expectedQuantity;

    const event: LedgerEvent = {
      eventId: this.generateEventId(),
      timestamp: new Date(),
      eventType: 'BATCH_RECON',
      poolId: 'SYSTEM', // System pool for reconciliations
      quantity: variance,
      unit: 'kg',
      source: batchId,
      destination: 'SYSTEM',
      referenceId: batchId,
      batchNumber: batchId,
      qualityStatus: 'RECONCILED',
      sustainabilityScore: 0,
      carbonFootprint: 0,
      waterFootprint: 0,
      energyConsumption: 0,
      costPerUnit: 0,
      currency: 'USD',
      previousHash: this.getLatestHash(),
      checksum: '',
      isValid: Math.abs(variance) <= expectedQuantity * 0.01, // 1% tolerance
      validationErrors: Math.abs(variance) > expectedQuantity * 0.01 ?
        [`Variance of ${variance}kg exceeds 1% tolerance`] : [],
      createdBy: 'USER',
      createdAt: new Date(),
      metadata: {
        varianceReason,
        adjustmentType,
        expectedQuantity,
        actualQuantity,
        variancePercentage: ((variance / expectedQuantity) * 100).toFixed(2) + '%'
      }
    };

    event.checksum = this.generateChecksum(event);
    this.events.push(event);

    if (this.currentTimeSlice) {
      this.currentTimeSlice.events.push(event);
    }

    return event;
  }

  // Process material transformation (e.g., PAN to Carbon Fiber)
  processTransformation(
    sourcePoolId: string,
    targetPoolId: string,
    inputQuantity: number,
    yieldFactor: number = 0.85,
    referenceId?: string
  ): { inputEvent: LedgerEvent; outputEvent: LedgerEvent } {
    const sourcePool = this.pools.get(sourcePoolId);
    const targetPool = this.pools.get(targetPoolId);

    if (!sourcePool || !targetPool) {
      throw new Error('Source or target pool not found');
    }

    const outputQuantity = inputQuantity * yieldFactor;

    // Remove from source
    const inputEvent = this.addMaterialOutward(
      sourcePoolId,
      inputQuantity,
      'TRANSFORMATION',
      referenceId,
      { yieldFactor, targetPoolId }
    );

    // Add to target
    const outputEvent = this.addMaterialInward(
      targetPoolId,
      outputQuantity,
      'TRANSFORMATION',
      referenceId,
      { yieldFactor, sourcePoolId, inputQuantity }
    );

    return { inputEvent, outputEvent };
  }

  // Get current mass balance summary
  getMassBalanceSummary(timeRange?: { start: Date; end: Date }): MassBalanceSummary {
    const filteredEvents = timeRange ?
      this.events.filter(e => e.timestamp >= timeRange.start && e.timestamp <= timeRange.end) :
      this.events;

    const inwardEvents = filteredEvents.filter(e => e.eventType.includes('INWARD'));
    const outwardEvents = filteredEvents.filter(e => e.eventType.includes('OUTWARD'));
    const reconEvents = filteredEvents.filter(e => e.eventType === 'BATCH_RECON');

    const sustainablePool = this.pools.get('SUSTAINABLE_PAN');
    const conventionalPool = this.pools.get('SUSTAINABLE_CARBON_FIBER');

    return {
      totalSustainableInflow: inwardEvents
        .filter(e => e.eventType.includes('SUSTAINABLE'))
        .reduce((sum, e) => sum + Math.abs(e.quantity), 0),
      totalConventionalInflow: inwardEvents
        .filter(e => e.eventType.includes('CONVENTIONAL'))
        .reduce((sum, e) => sum + Math.abs(e.quantity), 0),
      totalSustainableOutflow: outwardEvents
        .filter(e => e.eventType.includes('SUSTAINABLE'))
        .reduce((sum, e) => sum + Math.abs(e.quantity), 0),
      totalConventionalOutflow: outwardEvents
        .filter(e => e.eventType.includes('CONVENTIONAL'))
        .reduce((sum, e) => sum + Math.abs(e.quantity), 0),
      currentSustainableBalance: sustainablePool?.currentBalance || 0,
      currentConventionalBalance: conventionalPool?.currentBalance || 0,
      sustainabilityRatio: sustainablePool && conventionalPool ?
        sustainablePool.currentBalance / (sustainablePool.currentBalance + conventionalPool.currentBalance) : 0,
      efficiency: this.calculateEfficiency(filteredEvents),
      carbonReduction: this.calculateCarbonReduction(filteredEvents),
      lastUpdated: new Date(),
      isValid: true,
      validationErrors: [],
      pools: Array.from(this.pools.values())
    };
  }

  // Get real-time pool status
  getPoolStatuses(): MaterialPool[] {
    return Array.from(this.pools.values());
  }

  // Get recent movements
  getRecentMovements(limit: number = 50): LedgerEvent[] {
    return [...this.events]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Get pool balance history
  getPoolBalanceHistory(poolId: string, hours: number = 24): { timestamp: Date; balance: number }[] {
    const history: { timestamp: Date; balance: number }[] = [];
    const pool = this.pools.get(poolId);
    if (!pool) return history;

    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    const relevantEvents = this.events
      .filter(e => e.poolId === poolId && e.timestamp >= cutoff)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    let currentBalance = pool.currentBalance;

    // Work backwards to reconstruct balance
    for (let i = relevantEvents.length - 1; i >= 0; i--) {
      const event = relevantEvents[i];
      history.unshift({
        timestamp: event.timestamp,
        balance: currentBalance
      });
      currentBalance -= event.quantity; // reverse the effect
    }

    // Add current state
    history.push({
      timestamp: new Date(),
      balance: pool.currentBalance
    });

    return history;
  }

  // Calculate mass balance efficiency
  private calculateEfficiency(events: LedgerEvent[]): number {
    const inwardTotal = events
      .filter(e => e.eventType.includes('INWARD'))
      .reduce((sum, e) => sum + Math.abs(e.quantity), 0);
    const outwardTotal = events
      .filter(e => e.eventType.includes('OUTWARD'))
      .reduce((sum, e) => sum + Math.abs(e.quantity), 0);

    if (inwardTotal === 0) return 100;
    return Math.min((outwardTotal / inwardTotal) * 100, 100);
  }

  // Calculate carbon reduction
  private calculateCarbonReduction(events: LedgerEvent[]): number {
    const sustainableCarbon = events
      .filter(e => e.eventType.includes('SUSTAINABLE') && e.eventType.includes('OUTWARD'))
      .reduce((sum, e) => sum + (Math.abs(e.quantity) * e.carbonFootprint), 0);
    const conventionalCarbon = events
      .filter(e => e.eventType.includes('CONVENTIONAL') && e.eventType.includes('OUTWARD'))
      .reduce((sum, e) => sum + (Math.abs(e.quantity) * 3.5), 0); // Assume 3.5 kg CO2/kg for conventional

    if (conventionalCarbon === 0) return 0;
    return ((conventionalCarbon - sustainableCarbon) / conventionalCarbon) * 100;
  }

  // Validate pool balances
  private validatePoolBalances(): void {
    for (const pool of this.pools.values()) {
      if (pool.currentBalance < pool.minimumBalance) {
        console.warn(`Pool ${pool.id} balance below minimum: ${pool.currentBalance} < ${pool.minimumBalance}`);
      }
      if (pool.currentBalance > pool.maximumBalance) {
        console.warn(`Pool ${pool.id} balance above maximum: ${pool.currentBalance} > ${pool.maximumBalance}`);
      }
    }
  }

  // Get current balances
  private getCurrentBalances(): Record<string, number> {
    const balances: Record<string, number> = {};
    for (const [id, pool] of this.pools) {
      balances[id] = pool.currentBalance;
    }
    return balances;
  }

  // Get latest hash for chaining
  private getLatestHash(): string {
    if (this.events.length === 0) return 'genesis';
    return this.events[this.events.length - 1].checksum;
  }

  // Generate checksum for event
  private generateChecksum(event: LedgerEvent): string {
    const data = JSON.stringify({
      eventId: event.eventId,
      timestamp: event.timestamp.getTime(),
      poolId: event.poolId,
      quantity: event.quantity,
      previousHash: event.previousHash
    });

    // Simple hash function for demo
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  // Generate unique event ID
  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate time slice ID
  private generateTimeSliceId(): string {
    return `slice_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Close current time slice and create new one
  closeTimeSlice(): TimeSlice {
    if (!this.currentTimeSlice) {
      throw new Error('No active time slice');
    }

    this.currentTimeSlice.endTime = new Date();
    this.currentTimeSlice.status = 'CLOSED';
    this.currentTimeSlice.closingBalances = this.getCurrentBalances();

    const closedSlice = { ...this.currentTimeSlice };
    this.initializeCurrentTimeSlice();

    return closedSlice;
  }

  // Get all time slices
  getTimeSlices(): TimeSlice[] {
    return Array.from(this.timeSlices.values())
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  // Get system health
  getSystemHealth(): {
    status: 'HEALTHY' | 'WARNING' | 'ERROR';
    totalEvents: number;
    activePools: number;
    timeSliceStatus: string;
    validationErrors: string[];
  } {
    const totalEvents = this.events.length;
    const activePools = Array.from(this.pools.values()).filter(p => p.isActive).length;
    const validationErrors: string[] = [];

    // Check pool balances
    for (const pool of this.pools.values()) {
      if (pool.currentBalance < pool.minimumBalance) {
        validationErrors.push(`Pool ${pool.id} below minimum balance`);
      }
      if (pool.currentBalance > pool.maximumBalance) {
        validationErrors.push(`Pool ${pool.id} above maximum balance`);
      }
    }

    let status: 'HEALTHY' | 'WARNING' | 'ERROR' = 'HEALTHY';
    if (validationErrors.length > 0) {
      status = validationErrors.some(e => e.includes('ERROR')) ? 'ERROR' : 'WARNING';
    }

    return {
      status,
      totalEvents,
      activePools,
      timeSliceStatus: this.currentTimeSlice?.status || 'NONE',
      validationErrors
    };
  }
}