// Immutable Mass Balance Ledger Types
// ISCC+ Mass Balance System Implementation

export interface MaterialPool {
  id: string;
  name: string;
  type: 'SUSTAINABLE' | 'CONVENTIONAL';
  materialCode: string;
  currentBalance: number;
  unit: string;
  certification?: {
    scheme: 'ISCC_PLUS' | 'ISCC_EU' | 'ISCC_CORPORATE';
    certificateId: string;
    validFrom: Date;
    validTo: Date;
    supplierSd: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LedgerEvent {
  id: string;
  eventId: string;
  eventType: LedgerEventType;
  timestamp: Date;
  sliceId: string; // Time slice identifier
  previousHash?: string;
  currentHash: string;
  data: any;
  metadata: {
    source: 'ERP' | 'MES' | 'SCADA' | 'IOT_EDGE' | 'MANUAL';
    userId?: string;
    deviceId?: string;
    contractId?: string;
    validationStatus: 'PENDING' | 'VALIDATED' | 'FAILED' | 'EXCEPTION';
  };
}

export type LedgerEventType =
  | 'INWARD_BALANCE_SUSTAINABLE'
  | 'INWARD_BALANCE_CONVENTIONAL'
  | 'BATCH_RECON'
  | 'CONSUMPTION_PROOF'
  | 'OUTWARD_BALANCE_SUSTAINABLE'
  | 'OUTWARD_BALANCE_CONVENTIONAL'
  | 'UTILITY_PROOF'
  | 'UTILITY_ATTESTATION'
  | 'EMISSION_PROOF'
  | 'EMISSION_ATTESTATION'
  | 'RECON_ATTESTATION'
  | 'RECON_EXCEPTION'
  | 'EDGE_EXCEPTION'
  | 'POOL_UPDATE';

export interface TimeSlice {
  id: string;
  startTime: Date;
  endTime: Date;
  hash: string;
  previousSliceHash?: string;
  eventIds: string[];
  totalEvents: number;
  status: 'OPEN' | 'CLOSED' | 'SEALED';
  createdAt: Date;
}

export interface ContractValidation {
  id: string;
  contractId: string;
  name: string;
  layer: 'C1-0' | 'C2-1' | 'C3-2' | 'C4-3'; // ISA-95 layers
  sourceSystem: string;
  targetSystem: string;
  schema: any;
  validationRules: ValidationRule[];
  isActive: boolean;
}

export interface ValidationRule {
  id: string;
  field: string;
  type: 'REQUIRED' | 'RANGE' | 'PATTERN' | 'CUSTOM';
  condition: any;
  errorMessage: string;
  severity: 'ERROR' | 'WARNING' | 'INFO';
}

export interface MaterialInward {
  id: string;
  grnId: string; // Goods Receipt Note
  materialCode: string;
  supplierSd?: string; // Supplier Sustainability Declaration
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  unit: string;
  qualityStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  warehouseLocation: string;
  receivedAt: Date;
  receivedBy: string;
  vehicleId?: string;
  transporter?: string;
}

export interface BatchOrder {
  id: string;
  batchNumber: string;
  productionOrderId: string;
  materialCode: string;
  plannedQuantity: number;
  actualQuantity?: number;
  startDate: Date;
  endDate?: Date;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  equipmentId: string;
  operatorId: string;
  losses: {
    planned: number;
    actual?: number;
    reason?: string;
  };
  quality: {
    status: 'PENDING' | 'PASS' | 'FAIL';
    testResults?: any[];
  };
}

export interface UtilityConsumption {
  id: string;
  timeSliceId: string;
  utilityType: 'ELECTRICITY' | 'STEAM' | 'NITROGEN' | 'WATER' | 'NATURAL_GAS' | 'COMPRESSED_AIR';
  consumption: number;
  unit: string;
  cost?: number;
  carbonIntensity?: number; // kg CO2 per unit
  measuredAt: Date;
  meterId: string;
  allocationMethod: 'TIME_WEIGHTED' | 'OUTPUT_PROPORTIONAL' | 'ENERGY_PER_TONNE';
  allocatedTo?: string[]; // Batch IDs
}

export interface EmissionData {
  id: string;
  timeSliceId: string;
  emissionType: 'CO2' | 'NOX' | 'SOX' | 'VOC' | 'WASTEWATER' | 'SOLID_WASTE';
  amount: number;
  unit: string;
  measuredAt: Date;
  monitorId: string;
  scope: 'SCOPE_1' | 'SCOPE_2';
  allocationMethod: 'TIME_WEIGHTED' | 'MASS_WEIGHTED' | 'ENERGY_WEIGHTED';
  allocatedTo?: string[]; // Batch IDs
}

export interface CertificateGeneration {
  id: string;
  certificateType: 'SD' | 'POS' | 'CARRY_FORWARD' | 'GHG_COMPLIANCE' | 'CARBON_INTENSITY' | 'APS_AUDIT_PACK' | 'ESG_REPORT';
  period: {
    startDate: Date;
    endDate: Date;
  };
  status: 'PENDING' | 'GENERATING' | 'COMPLETED' | 'FAILED';
  generatedAt?: Date;
  filePath?: string;
  checksum?: string;
  requestId: string;
  requestedBy: string;
  parameters: any;
}

export interface MassBalanceSummary {
  period: {
    startDate: Date;
    endDate: Date;
  };
  sustainablePool: {
    openingBalance: number;
    inward: number;
    consumed: number;
    outward: number;
    closingBalance: number;
    losses: number;
  };
  conventionalPool: {
    openingBalance: number;
    inward: number;
    consumed: number;
    outward: number;
    closingBalance: number;
    losses: number;
  };
  utilities: {
    [key in UtilityConsumption['utilityType']]?: {
      totalConsumption: number;
      totalCost: number;
      carbonEmissions: number;
    };
  };
  emissions: {
    [key in EmissionData['emissionType']]?: {
      totalAmount: number;
      carbonIntensity: number;
    };
  };
  integrity: {
    isBalanced: boolean;
    tolerance: number;
    variance: number;
    exceptions: string[];
  };
}