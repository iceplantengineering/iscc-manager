import { MaterialPool, LedgerEvent, TimeSlice, MassBalanceSummary, CertificateGeneration } from './types';

export class ImmutableMassBalanceLedger {
  private events: LedgerEvent[] = [];
  private timeSlices: TimeSlice[] = [];
  private materialPools: Map<string, MaterialPool> = new Map();
  private currentSlice: TimeSlice | null = null;

  constructor() {
    this.initializeDefaultPools();
    this.initializeCurrentTimeSlice();
  }

  // Initialize default material pools
  private initializeDefaultPools() {
    const defaultPools: MaterialPool[] = [
      {
        id: 'SUSTAINABLE_PAN',
        name: 'Sustainable PAN Precursor',
        type: 'SUSTAINABLE',
        materialCode: 'PAN-001-S',
        currentBalance: 0,
        unit: 'kg',
        certification: {
          scheme: 'ISCC_PLUS',
          certificateId: 'ISCC-PLUS-2025-001',
          validFrom: new Date('2025-01-01'),
          validTo: new Date('2025-12-31'),
          supplierSd: 'SD-2025-001'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'CONVENTIONAL_PAN',
        name: 'Conventional PAN Precursor',
        type: 'CONVENTIONAL',
        materialCode: 'PAN-001-C',
        currentBalance: 0,
        unit: 'kg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    defaultPools.forEach(pool => {
      this.materialPools.set(pool.id, pool);
    });
  }

  // Initialize current time slice
  private initializeCurrentTimeSlice() {
    const now = new Date();
    const sliceStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0);
    const sliceEnd = new Date(sliceStart.getTime() + 60 * 60 * 1000); // 1 hour slice

    this.currentSlice = {
      id: `slice_${sliceStart.toISOString()}`,
      startTime: sliceStart,
      endTime: sliceEnd,
      hash: this.generateHash(''),
      eventIds: [],
      totalEvents: 0,
      status: 'OPEN',
      createdAt: now
    };
    this.timeSlices.push(this.currentSlice);
  }

  // Add event to ledger
  addEvent(event: Omit<LedgerEvent, 'id' | 'eventId' | 'timestamp' | 'currentHash'>): LedgerEvent {
    const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date();

    const previousEvent = this.events[this.events.length - 1];
    const previousHash = previousEvent ? previousEvent.currentHash : '';

    const ledgerEvent: LedgerEvent = {
      ...event,
      id: eventId,
      eventId,
      timestamp,
      previousHash,
      currentHash: this.generateHash(JSON.stringify({ ...event, timestamp }))
    };

    this.events.push(ledgerEvent);

    // Add to current time slice
    if (this.currentSlice) {
      this.currentSlice.eventIds.push(ledgerEvent.id);
      this.currentSlice.totalEvents++;
      this.currentSlice.hash = this.generateHash(this.currentSlice.eventIds.join(''));
    }

    return ledgerEvent;
  }

  // Material inward transaction
  addMaterialInward(materialId: string, quantity: number, grnId: string, metadata: any = {}): LedgerEvent {
    const pool = this.materialPools.get(materialId);
    if (!pool) {
      throw new Error(`Material pool ${materialId} not found`);
    }

    const event = this.addEvent({
      eventType: pool.type === 'SUSTAINABLE' ? 'INWARD_BALANCE_SUSTAINABLE' : 'INWARD_BALANCE_CONVENTIONAL',
      sliceId: this.currentSlice!.id,
      data: {
        materialId,
        quantity,
        grnId,
        previousBalance: pool.currentBalance,
        newBalance: pool.currentBalance + quantity,
        ...metadata
      },
      metadata: {
        source: 'IOT_EDGE',
        validationStatus: 'PENDING',
        ...metadata
      }
    });

    // Update pool balance
    pool.currentBalance += quantity;
    pool.updatedAt = new Date();

    return event;
  }

  // Material outward transaction
  addMaterialOutward(materialId: string, quantity: number, deliveryOrderId: string, metadata: any = {}): LedgerEvent {
    const pool = this.materialPools.get(materialId);
    if (!pool) {
      throw new Error(`Material pool ${materialId} not found`);
    }

    if (pool.currentBalance < quantity) {
      throw new Error(`Insufficient balance in pool ${materialId}`);
    }

    const event = this.addEvent({
      eventType: pool.type === 'SUSTAINABLE' ? 'OUTWARD_BALANCE_SUSTAINABLE' : 'OUTWARD_BALANCE_CONVENTIONAL',
      sliceId: this.currentSlice!.id,
      data: {
        materialId,
        quantity,
        deliveryOrderId,
        previousBalance: pool.currentBalance,
        newBalance: pool.currentBalance - quantity,
        ...metadata
      },
      metadata: {
        source: 'ERP',
        validationStatus: 'PENDING',
        ...metadata
      }
    });

    // Update pool balance
    pool.currentBalance -= quantity;
    pool.updatedAt = new Date();

    return event;
  }

  // Get current pool balances
  getPoolBalances(): MaterialPool[] {
    return Array.from(this.materialPools.values());
  }

  // Generate mass balance summary for period
  getMassBalanceSummary(startDate: Date, endDate: Date): MassBalanceSummary {
    const relevantEvents = this.events.filter(event =>
      event.timestamp >= startDate && event.timestamp <= endDate
    );

    const sustainableInward = relevantEvents
      .filter(e => e.eventType === 'INWARD_BALANCE_SUSTAINABLE')
      .reduce((sum, e) => sum + e.data.quantity, 0);

    const sustainableOutward = relevantEvents
      .filter(e => e.eventType === 'OUTWARD_BALANCE_SUSTAINABLE')
      .reduce((sum, e) => sum + e.data.quantity, 0);

    const conventionalInward = relevantEvents
      .filter(e => e.eventType === 'INWARD_BALANCE_CONVENTIONAL')
      .reduce((sum, e) => sum + e.data.quantity, 0);

    const conventionalOutward = relevantEvents
      .filter(e => e.eventType === 'OUTWARD_BALANCE_CONVENTIONAL')
      .reduce((sum, e) => sum + e.data.quantity, 0);

    return {
      period: { startDate, endDate },
      sustainablePool: {
        openingBalance: 0, // TODO: Implement opening balance calculation
        inward: sustainableInward,
        consumed: 0, // TODO: Implement consumption tracking
        outward: sustainableOutward,
        closingBalance: this.materialPools.get('SUSTAINABLE_PAN')?.currentBalance || 0,
        losses: 0 // TODO: Implement loss tracking
      },
      conventionalPool: {
        openingBalance: 0,
        inward: conventionalInward,
        consumed: 0,
        outward: conventionalOutward,
        closingBalance: this.materialPools.get('CONVENTIONAL_PAN')?.currentBalance || 0,
        losses: 0
      },
      utilities: {},
      emissions: {},
      integrity: {
        isBalanced: true, // TODO: Implement balance validation
        tolerance: 0.01, // 1% tolerance
        variance: 0,
        exceptions: []
      }
    };
  }

  // Generate certificate request
  generateCertificateRequest(type: CertificateGeneration['certificateType'], period: { startDate: Date; endDate: Date }): CertificateGeneration {
    const summary = this.getMassBalanceSummary(period.startDate, period.endDate);

    return {
      id: `cert_${Date.now()}`,
      certificateType: type,
      period,
      status: 'PENDING',
      requestId: `req_${Date.now()}`,
      requestedBy: 'system',
      parameters: {
        summary,
        poolBalances: this.getPoolBalances(),
        totalEvents: relevantEvents.length
      }
    };
  }

  // Simple hash generation (in production, use proper cryptographic hash)
  private generateHash(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Get all events
  getEvents(): LedgerEvent[] {
    return [...this.events];
  }

  // Get time slices
  getTimeSlices(): TimeSlice[] {
    return [...this.timeSlices];
  }

  // Clear all data (for testing)
  clear(): void {
    this.events = [];
    this.timeSlices = [];
    this.materialPools.clear();
    this.initializeDefaultPools();
    this.initializeCurrentTimeSlice();
  }
}