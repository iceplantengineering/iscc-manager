# System-flow Diagram - Detailed Description

## Overview

The System-flow Diagram illustrates the comprehensive data flow architecture for the Immutable Mass Balance Ledger (IMBL) system across the entire carbon fiber manufacturing process. The diagram follows the ISA-95 automation pyramid structure and shows how data moves from physical sensors through various system layers to generate compliance evidence.

## Main System Components

### 1. RM WAREHOUSE (Raw Materials Warehouse)
**Location:** Top Left Section

**Components:**
- **Material Receipt Areas**
  - Sustainable materials input zone
  - Conventional materials input zone
- **IoT Edge Collectors** (represented by circular icons)
  - Weighbridge sensors for gross/tare/net weight measurement
  - Dock/tank level sensors for volume confirmation
  - QR/Barcode scanners for Supplier SD (Sustainability Declaration) capture
- **Edge Data Collectors**
  - Protocol adapters for various industrial communication standards
  - Local buffering and data validation
  - Connection to Industrial DMZ

**Data Flow:**
Raw materials → Weighbridge/Sensors → Edge Collector → Industrial DMZ → Mass Balance Ledger

### 2. MANUFACTURING (Central Section)
**Location:** Center of Diagram

**ISA-95 Layers (Bottom to Top):**

#### Level 1 - Sensors/Field Devices
- **GAMS - L1: PLC/Logi** (Process Logic Controllers)
- **GAMS - L1: MES/Logi** (Manufacturing Execution System Logic)
- **GAMS - L1: SCADA/Logi** (Supervisory Control and Data Acquisition Logic)
- **GAMS - L1: Sensor Logi** (Sensor Logic Controllers)

#### Level 2 - Control Systems
- **Black Cycle** (Stabilization process control)
- **Batch Data** (Batch processing information)
- **Quality Parameters and Analytics** (Process monitoring and control)

#### Level 3 - Manufacturing Execution
- **ERP** (Enterprise Resource Planning)
- **MES** (Manufacturing Execution System)
- **LIMS/QMS** (Laboratory Information Management/Quality Management System)

#### Level 4 - Business Systems
- **Lot Information** (Production lot tracking and genealogy)
- **Edge Data Collectors** (Multiple collection points throughout manufacturing)

**Key Process Flows:**
1. PAN Precursor Input → Stabilization Furnaces
2. Stabilization → Carbonization (up to 3,000°C)
3. Carbonization → Graphitization
4. Finished Tows → Bobbin Winding (approximately 10k bobbins per lot)

### 3. FG WAREHOUSE (Finished Goods Warehouse)
**Location:** Top Right Section

**Components:**
- **Material Dispatch Areas**
  - Sustainable finished goods pool
  - Conventional finished goods pool
- **IoT Edge Collectors**
  - Weighbridge sensors for outbound measurement
  - QR/Barcode scanners for product identification
  - Dispatch documentation scanners
- **ERP Integration**
  - Delivery order processing
  - Customer SD/PoS generation

**Data Flow:**
Finished Goods → Weighbridge/Scanners → Edge Collector → Mass Balance Ledger → Sustainability Declarations

### 4. MASS BALANCE LEDGER (Central Bottom Section)
**Location:** Horizontal band across bottom center

**Core Components:**
- **L1: Immutable Data Contracts** (Physical sensor validation)
- **L2: Contract Data Contracts** (SCADA validation contracts)
- **L3: Contract Data Contracts** (MES validation contracts)
- **L4: Contract Data Contracts** (ERP validation contracts)

**Validation Pipeline:**
1. **Real-time Communication** (MQTT/Industrial protocols)
2. **Time-stamped Data Collection** (PTP/NTP synchronization)
3. **Schema Only Validation** (Data contract enforcement)
4. **Immutable Ledger Records** (Append-only storage)

**Ledger Event Categories:**
- INWARD_BALANCE_SUSTAINABLE/CONVENTIONAL
- BATCH_RECON, CONSUMPTION_PROOF
- OUTWARD_BALANCE_SUSTAINABLE/CONVENTIONAL

### 5. UTILITIES (Bottom Left Section)
**Location:** Lower Left

**Monitored Utilities:**
- **Steam (S)** - Process heating requirements
- **Electricity (E)** - Primary energy for furnaces (dominant cost)
- **Nitrogen (N)** - Atmosphere control in furnaces
- **Water (W)** - Cooling and auxiliary processes
- **Natural Gas (NG)** - Backup/auxiliary heating
- **Compressed Air (CA)** - Pneumatic systems and cleaning

**Data Collection:**
- Edge Data Collectors monitor utility consumption continuously
- Time-sliced aggregation (typically hourly intervals)
- Integration with Energy Management Systems
- Carbon intensity calculations for Scope 2 emissions

### 6. SYSTEM-GENERATED EVIDENCE (Bottom Center-Right)
**Location:** Lower Center-Right Section

**Automated Report Generation:**
- **Carry-Forward Report** (Certified pool balances)
- **Sustainability Declaration (SD)** (Customer certificates)
- **APS v5.0 Audit Evidence Pack** (Regulatory compliance)
- **GHG Emissions Compliance Report** (Scope 1 & 2)
- **Carbon Intensity Certificate** (Per-tonne calculations)
- **ESG/CSRD Reporting Pack** (Regulatory reporting)

### 7. EMISSIONS & DISCHARGES (Bottom Right Section)
**Location:** Lower Right

**Monitored Emissions:**
- **CO₂ (Carbon Dioxide)** - Primary greenhouse gas from combustion
- **NOₓ (Nitrogen Oxides)** - From high-temperature processes
- **SOₓ (Sulfur Oxides)** - From fuel combustion
- **VOCs (Volatile Organic Compounds)** - Process off-gases
- **Wastewater** - Process water discharge monitoring
- **Solid Waste** - Production waste tracking

**Monitoring Systems:**
- Continuous Emission Monitoring Systems (CEMS)
- Stack analyzers and flow meters
- Wastewater quality monitoring
- Waste generation tracking

## Data Flow Architecture

### Horizontal Data Flows

#### 1. Raw Materials to Manufacturing
```
RM Warehouse → Edge Collectors → Industrial DMZ → Stream Normalizer → 
Time Authority & Signer → Schema Registry → Ledger Ingest → Mass Balance Ledger
```

#### 2. Manufacturing to Finished Goods
```
Manufacturing Systems → MES/SCADA → Edge Collectors → Validation Contracts → 
Mass Balance Ledger → FG Warehouse → Customer Documentation
```

### Vertical Integration (ISA-95 Layers)

#### 1. Sensor to Business Layer Integration
```
L1 (Sensors/PLCs) → L2 (SCADA/DCS) → L3 (MES) → L4 (ERP) → Ledger Validation
```

#### 2. Contract Validation at Each Layer
- **C1-0 Contract:** IoT Edge ↔ Ledger (Physical sensor validation)
- **C2-1 Contract:** SCADA ↔ MES (Process data reconciliation)
- **C3-2 Contract:** MES ↔ ERP (Production order validation)
- **C4-3 Contract:** ERP ↔ Business Systems (Commercial validation)

### Continuous Monitoring Flows

#### 1. Utility Monitoring
```
Utility Meters → Edge Collectors → Time-sliced Aggregation → 
Utility Attestations → Carbon Intensity Calculations
```

#### 2. Emissions Monitoring
```
CEMS/Stack Monitors → Edge Collectors → Emission Proofs → 
Emission Attestations → GHG Compliance Reports
```

## Key Architectural Principles

### 1. Immutability and Auditability
- All data events are append-only in the ledger
- Hash-chaining ensures temporal continuity
- No retroactive modifications allowed
- Full audit trail from sensor to final report

### 2. Real-time Validation
- Data contracts enforce schema compliance at each ISA-95 boundary
- Immediate validation prevents downstream errors
- Exception handling for out-of-tolerance conditions
- Automated reconciliation across system layers

### 3. Separation of Concerns
- Physical truth (sensors) vs. business logic (ERP/MES)
- Sustainable vs. conventional material pools maintained separately
- Utilities and emissions tracked as attestations, not pool movements
- Clear responsibility boundaries between system layers

### 4. Compliance Automation
- Automatic generation of all required compliance documents
- Real-time pool balance tracking for mass balance compliance
- Continuous carbon footprint calculation
- Exception-based human intervention only

## Integration Points

### 1. External System Interfaces
- **ERP Systems:** SAP, Oracle, or similar enterprise systems
- **MES Systems:** Batch genealogy and production execution
- **SCADA/DCS:** Process historians and control systems
- **LIMS/QMS:** Quality data and laboratory results

### 2. Communication Protocols
- **OPC UA:** Standard industrial communication protocol
- **MQTT:** Lightweight messaging for IoT devices
- **Modbus:** Legacy industrial protocol support
- **HTTP/REST:** Modern web service integration

### 3. Time Synchronization
- **PTP (Precision Time Protocol):** Microsecond accuracy for industrial networks
- **NTP (Network Time Protocol):** Standard network time synchronization
- **RFC 3161:** Trusted timestamping for legal compliance

This comprehensive system architecture ensures that every kilogram of material and every kWh of energy is tracked through an immutable, auditable ledger that automatically generates all required compliance documentation for carbon credits and sustainability reporting.