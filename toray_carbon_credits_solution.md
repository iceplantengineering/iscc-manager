# Solution Overview

**For:** Toray Composite Materials America, Inc.  
**Subject:** Carbon Credits through Mass balance process for Carbon Fiber Manufacturing  
**Date:** Sep 2025  
**Company:** Shinwa USA-ICE-JIT

---

## Table of Contents

1. [Background](#background)
2. [Problem Statement](#problem-statement)
3. [Gaps in Available Solutions](#gaps-in-available-solutions)
4. [Proposed Solution](#proposed-solution)
5. [Solution Context](#solution-context)
6. [System-flow Diagram](#system-flow-diagram)
7. [System Flow Description](#system-flow-description)
8. [Outputs](#outputs)
9. [Glossary](#glossary)

---

## Background

Carbon fibre is a cornerstone material for aerospace, automotive, and renewable energy industries. Its high strength-to-weight ratio makes it indispensable for lightweighting and energy transition applications. Yet, carbon fibre manufacturing is highly energy intensive. In parallel, regulators and buyers are demanding not just performance, but also verifiable sustainability credentials: product carbon footprints, certified bio- or recycled inputs, and compliance with European initiatives such as the ISCC Plus, Digital Product Passport. The industry is shifting from voluntary disclosures to mandatory compliance. Aerospace primes, automakers, and wind turbine manufacturers are already embedding sustainability criteria in procurement.

---

## Problem Statement

Carbon fibre plants are continuous-process operations. PAN precursor is fed into stabilization furnaces, then carbonized and graphitized at temperatures up to 3,000°C, producing finished tows wound onto bobbins. Lots are defined operationally, often around 10k bobbins at a time. Energy use is intense, dominated by electrical furnaces, and off-gases include CO₂, NOx, and potentially N₂O.

The challenge is not generating data.
- Plants already have ERP for procurement,
- MES for genealogy, and
- historians for furnace data.

The challenge is fragmentation. ERP knows what PAN was purchased, but not which bobbin consumed it. MES knows lot genealogy, but not emissions. Historians know kWh consumed, but not which certified lot to allocate it to.

Meanwhile, certification schemes for carbon Credits such as ISCC+ Mass Balance require auditable ledgers that tie certified input shares to physical outputs, month by month, lot by lot. ESG regulations such as CSRD require Scope 1/2 emissions reporting with dual methodology (location- and market-based). The Digital Product Passport will require each product unit to carry forward its carbon footprint, certified share, and recyclability metadata.

Today, none of these requirements can be met without manual spreadsheets, sample-based audits, and high risk of non-compliance. This is unsustainable as scrutiny tightens.

---

## Gaps in Available Solutions

| Capability / ISCC+ Requirement | Circularise | Carboledger | Proposed Solution |
|-------------------------------|-------------|-------------|-------------------|
| ISCC PLUS templates, Audit pack - SD, POS | ✅ Yes | ✅ Yes | ✅ Yes |
| Mass-balance Bookkeeping | ✅ Yes | ✅ Yes | ✅ Yes (+ Cross-layer reconciliation) |
| Continuous records | ⚠️ Reports/ZIP | ⚠️ Real-time bookkeeping layer | ✅ Ledger automatically updated through process flow |
| ISA-95 Data Traversal (L4-L1) | ❌ No Claim | ❌ No Claim | ✅ Core Design |
| System-generated Evidence (Zero human stitching) | ❌ Platform + Expert Support | ❌ Tooling + Guidance | ✅ Exceptions-only human review |
| Blockchain-backed Records | ✅ optional | ❌ Not needed | ❌ Not needed / No use case |
| Immutable Data Contracts | ❌ No Claim | ❌ No Claim | ✅ Yes |

---

## Proposed Solution

Proposed solution is a cyber-physical Mass Balance Ledger that traverses the ISA-95 automation pyramid end-to-end. It automates traceability and reconciliation of sustainable inputs across ERP, MES, SCADA, and sensor layers to eliminate manual data stitching and ensures audit-ready, tamperproof, real-time, continuous ISCC+ and GHG compliance.

### Key Features

**Chain of Custody**  
Tracks flows across ERP ↔ MES ↔ SCADA ↔ Sensors.

**Mass Balance**  
Cyber-physical ledger reconciles every kilogram in real time.

**Audit Docs (SD/POS)**  
Generated from the ledger, not curated manually.

**Continuous Records: APS v5.0-ready**  
Immutable, live, machine-verified data.

**Tamperproof Evidence**  
Data contracts enforce schema & validation at each ISA-95 boundary.

### Blockchain Vs Immutable Ledgers

Blockchain is often promoted for supply chain traceability and sustainability certification.

**Works best when:**
- Multiple independent actors maintain nodes.
- Trust is distributed through consensus.
- Data is transparent across open ecosystems.

**Why Not Here:**
- ISCC+ certification and carbon fibre mass balance occur within a controlled industrial ecosystem, not a public one.
- Manufacturing plants don't want production data exposed on public or consortium chains.
- Blockchain adds overhead, latency, and complexity without solving the core compliance challenge.

**Key Insights:**
- What ISCC+ needs is authentic correlation across ISA-95 layers, not a distributed consensus protocol.
- MATRIX-95 provides this with an immutable ledger, tamperproof yet efficient, within the enterprise's security perimeter.

---

## Solution Context

The Immutable Mass Balance Ledger (IMBL) is designed to reconcile sustainable and conventional feedstocks across the manufacturing process and generate compliance evidence automatically. The objective is to eliminate manual data stitching by capturing discrete and continuous events directly from ISA-95 pyramid- ERP, MES, SCADA, and IoT systems, validating them against formal data contracts, and storing them in an immutable ledger with temporal continuity.

The architecture ensures that auditors and regulators receive machine-verified evidence rather than post-facto reports, addressing APS v5.0 and emerging GHG/ESG requirements.

---

## System-flow Diagram

*[Complex system diagram showing the flow between RM WAREHOUSE, MANUFACTURING, FG WAREHOUSE, UTILITIES, SYSTEM-GENERATED EVIDENCE, and EMISSIONS & DISCHARGES sections with various components and connections through the Mass Balance Ledger]*

---

## System Flow Description

### 1. Raw Materials Receipts (Inbound Warehouse)

Raw materials enter the system via the Raw Material Warehouse (RM WH). Two pools are recognized:
- Sustainable feedstocks (bio, circular, certified with Supplier SD).
- Conventional feedstocks (non-certified fossil inputs).

**Source of truth = Plant IoT - Edge Collector**
- Weighbridge captures gross/tare/net weights.
- Dock/tank sensors confirm volume deltas.
- QR/barcode scanners capture Supplier SD references.
- All readings flow through Edge Collector → DMZ → Normalizer → Time-Signer → Ledger Ingest.

**Ledger writes inbound events directly:**
Captures the raw measurements from weighbridge, tank sensors, QR/SD scanner, timestamped and signed. This is the untouched physical truth.

Takes the validated IoT evidence from Event 1 and updates the material pool (Sustainable or Conventional). This is the business-facing ledger event auditors care about.

### 2. ERP to MES Transition

ERP performs lot allocation and generates production orders. Contract C4-3 validates the handover and records:

**EVENT_LOG_POOL_UPDATE**  
The ERP-certified stock pool is updated once the GRN is matched.

MES declares batch execution (inputs, outputs, declared losses).

### 3. SCADA/DCS Validation

SCADA/Historian systems provide operational truth: counters, batch totals, and declared losses. Contract C2-1 validates MES declarations against SCADA records.

**Ledger event created:**  
SCADA/Historian submits batch-scoped counters (tank issue totals, line totals, energy). C2-1 validates against expected tags, time window, and drift.

If within_tolerance = true, we do not move pools again (MES already moved them in BATCH_RECON). We emit a result/attestation that locks the reconciliation.

**Correction + Pool Adjustment (After investigation, if required)**  
If MES corrects the batch declaration, we post a correction and an explicit pool adjustment Close-out: finally, a RECON_ATTESTATION (now confirmed) closes the exception and unblocks SD/Carry-Forward.

**Rules of Thumb**
- SCADA proof never double-moves pools. MES moves; SCADA confirms or raises exceptions.
- Out-of-tolerance ⇒ exception + (later) explicit correction + explicit pool adjustment. No silent edits.
- Every proof links backward (to MES batch) and sideways (to Edge slice) to preserve lineage.
- Time windows are enforced (batch window ± tolerance); drift between source and ledger time is checked.

### 4. IoT Edge Evidence Path (ISA-95 Level 1)

Sensors and PLCs generate raw counters and process parameters. These do not connect directly to the ledger. The path is:
- Edge Data Collector (protocol adapters for OPC UA/Modbus, tag whitelists, local buffer).
- Industrial DMZ (publish via MQTT).
- Stream Normalizer (unit harmonization, tag -> metric mapping, quality checks).
- Time Authority & Signer (PTP/NTP validation, RFC 3161 timestamp, event hash/signature).
- Schema Registry & Contract Validation (ensures events comply with EDGE_PROOF schema).
- Ledger Ingest API

**Contract C1-0 writes:**

**EVENT_LOG_EDGE_PROOF**  
The Edge Collector reads whitelisted PLC tags (totalizers, level deltas, weighers) during the batch window, normalizes units, applies trusted time, and signs the payload. This is machine truth, straight from L1.

Rule: Edge proof does not move pools. We emit either an attestation (aligned) or an exception (mismatch, drift, out-of-calibration).

If the issue is calibration (expired cert, failed check), set "reason":"CALIBRATION_INVALID" and include "calibration_ok": false. Resolution requires a calibration event plus, if needed, a batch correction and explicit pool adjustment (never silent edits).

**Guardrails**
- No double-counting: Edge attestation never changes pools. Only MES (and explicit corrections) move pools.
- Triangulation: EDGE_PROOF ↔ CONSUMPTION_PROOF ↔ BATCH_RECON must be cross-linked per batch and time window.
- Time discipline: enforce batch window ± tolerance; check ts_source vs ts_ledger drift; every edge event carries TSA timestamp.
- Calibration precondition: reject attestation if any referenced device calibration is invalid during the window.
- Replay-ability: Raw EDGE_PROOF is persisted and addressable (event_id), so auditors can re-run reconciliation.

### 5. Finished Goods (Outbound Warehouse)

Finished goods are posted to the FG Warehouse in two pools: Sustainable and Conventional.

**Ledger events created:**

**OUTWARD_PROOF**  
ERP posts delivery order or dispatch note. If certified, an SD/PoS is generated. This record is the commercial proof of shipment.

**Rules for Outbound**
- Two pools: Sustainable vs Conventional, updated separately (OUTWARD_BALANCE_SUSTAINABLE / OUTWARD_BALANCE_CONVENTIONAL).
- Linkage: Every OUTWARD_BALANCE_* must link back to an OUTWARD_PROOF document event.
- Blocking rule: If any linked batch has an open RECON_EXCEPTION or EDGE_EXCEPTION, the ledger blocks SD generation.
- Generated Evidence: Once outbound balances post, the ledger can automatically issue:
  - Certified Carry-Forward Report (remaining pool).
  - Sustainability Declaration (customer-facing SD/PoS).
  - GHG / Carbon Intensity Certificate (if enabled).

**OUTWARD_BALANCE_CONVENTIONAL**  
Ledger deducts certified or conventional output pool. If certified, the SD reference is linked.

### 6. Utilities and Emissions (Continuous Inputs and Outputs)

Utility consumption (steam, electricity, nitrogen, water, natural gas) and emissions (CO₂, NOx, SOx, VOCs, wastewater, solid waste, flaring) are captured continuously through the Edge Data.

**Continuous ledger events created at set resolution:**

**UTILITY_PROOF (raw IoT/SCADA evidence)**  
Edge Collector aggregates counters for utilities (electricity, steam, nitrogen, water, natural gas) over a fixed time slice (e.g., hourly). Payload includes raw tag values, normalized units, and trusted time signature.

**UTILITY_ATTESTATION (allocation / CI link)**  
The ledger does not "move pools" for utilities. Instead, it attaches a utility attestation to relevant batches or production periods, enabling downstream carbon intensity calculations.

**Guardrails:**
- Always time-sliced. Utilities must be bounded by start/end windows.
- Attestations, not balances. They attach to batches or periods; they do not move certified pools.
- Allocation rules explicit. Method (time-weighted, proportional to output, energy-per-tonne) is stored in the ledger.
- Supports GHG/CI evidence. Attestations form the base for Scope 2 reporting and Carbon Intensity Certificates.
- Replayable. Raw UTILITY_PROOF events are addressable so auditors can re-run allocations.

**EMISSION_PROOF (raw sensor evidence)**  
Edge Collector reads stack sensors, wastewater meters, and flaring monitors. Data is aggregated for a defined window (e.g., hourly) and published via the Edge→DMZ→Normalizer→Signer pipeline. The ledger records the raw, signed evidence.

**EMISSION_ATTESTATION (allocation & compliance linkage)**  
Ledger attaches emissions to production batches or reporting periods. These attestations feed GHG compliance, carbon intensity, and ESG reporting packs.

**Guardrails**
- Time-sliced evidence. Must carry start/end window with trusted time anchor.
- No silent editing. If sensors drift or fail, exceptions are logged, not adjusted silently.
- Allocation explicit. Method for splitting emissions across batches must be persisted (time-weighted, mass-weighted, etc.).
- Compliance linkage. Emission attestations feed:
  - GHG Scope 1 (direct) and Scope 2 (energy-related, from utilities).
  - APS v5.0 Audit Pack.
  - ESG/CSRD reporting packs.
- Replayability. EMISSION_PROOF events are immutable and auditable, enabling recalculation of carbon intensity.

### 7. Ledger Spine and Temporal Continuity

All events flow into the Mass Balance Ledger. The ledger enforces the following properties:
- Time-slicing: events grouped into hourly or shift-based slices.
- Hash-chaining: slice hashes linked forward; retroactive changes invalidate the chain.
- Cross-referenced timestamps: each event carries both source system time and ledger time; drift outside tolerance is rejected.
- Append-only immutability: events cannot be modified once written.

---

## Outputs

The system generates compliance evidence without manual intervention:

☑ Certified Carry-Forward Report  
☑ Sustainability Declaration (SD/PoS)  
☑ APS v5.0 Audit Evidence Pack  
☑ GHG Emissions Compliance Report (Scopes 1 and 2)  
☑ Carbon Intensity Certificate (per tonne of output)  
☑ ESG/CSRD Reporting Pack  

Auditors see machine-verified ledger events first, followed by documents derived from them. This guarantees that reported sustainability attributes are anchored in reconciled, time-continuous data.

**Pool integrity:** certified and conventional feedstocks are tracked separately at inbound and outbound.

**Cross-layer reconciliation:** contracts at every ISA-95 boundary (ERP, MES, SCADA, IoT Edge).

**Cyber-physical validation:** OT and IoT evidence paths ensure declared balances match actual process counters.

**Temporal immutability:** time-sliced, hash-chained events eliminate retroactive tampering.

**Zero manual stitching:** compliance packs are generated from ledger state, not recompiled reports.

### Why Shinwa USA-ICE-JIT:

Our team has extensive experience in plant and process level data acquisition, ERP, MES integration, monitoring, reporting and analytics. Our team also has experts from Sustainable manufacturing area.

We look forward to understand your requirements to detail a more suitable system to realize the Carbon Credits through mass balance method at your facilities.

---

## Glossary

**APS v5.0**  
Audit Procedure Standard version 5.0, published by ISCC+, requiring continuous, machine-verifiable evidence instead of stitched reports.

**Attestation Event**  
A ledger event that confirms reconciliation or allocation (e.g., RECON_ATTESTATION, UTILITY_ATTESTATION). Does not move pools.

**Audit Docs (SD/PoS)**  
Sustainability Declarations (SD) or Proofs of Sustainability (PoS) generated directly from the ledger as evidence, replacing manual curation.

**Batch Order**  
Instruction created in MES to execute a production run, based on ERP Production Order.

**Batch Reconciliation (BATCH_RECON)**  
Ledger event validating MES-declared inputs/outputs/losses for a batch, moving material pools accordingly.

**Blockchain**  
A distributed ledger technology where multiple nodes maintain consensus. Useful for multi-party public ecosystems, but not optimal for closed industrial environments like carbon fibre plants.

**Calibration Certificate**  
External document proving a device (weighbridge, flow meter, sensor) is within its certified accuracy window.

**Carbon Fibre**  
High-strength, low-weight material used in aerospace, automotive, and renewable energy. Manufacturing is energy intensive and subject to growing sustainability compliance pressures.

**Carry-Forward Report**  
Ledger-generated report showing certified pool balances at a given cut-off, used for ISCC+ claims.

**Certified Pool**  
A ledger-managed stock of sustainable/certified material (e.g., RM.SUSTAINABLE.PAN-001). Tracked separately from conventional pools.

**Chain of Custody**  
Formal tracking of materials and data across ERP, MES, SCADA, and sensor layers to ensure certified inputs are verifiably linked to certified outputs.

**Consumption Proof (CONSUMPTION_PROOF)**  
Ledger event validating MES batch declarations against SCADA counters.

**Contract**  
Formal checkpoint between ISA-95 layers (C4-3: ERP↔MES, C3-2: MES↔SCADA, C2-1: SCADA↔PLC, C1-0: IoT Edge↔Ledger).

**Controlled Industrial Ecosystem**  
Environment where all production and compliance systems are owned and managed by one enterprise, reducing the need for public blockchain consensus.

**CSRD**  
(Corporate Sustainability Reporting Directive) EU regulation requiring companies to disclose Scope 1 and 2 emissions, sustainability data, and dual methodology reporting.

**Cyber-Physical Ledger**  
A ledger that integrates both digital business systems (ERP, MES) and physical process data (SCADA, sensors) to ensure traceable, verifiable reconciliation.

**Digital Product Passport (DPP)**  
Forthcoming EU requirement for each product unit to carry metadata on carbon footprint, certified content, and recyclability through the supply chain.

**Edge Collector**  
Gateway device/software that collects PLC/IoT signals, applies whitelists and buffering, and publishes to the Industrial DMZ.

**Edge Exception (EDGE_EXCEPTION)**  
Ledger event raised when IoT Edge data deviates from SCADA/MES declarations or fails calibration/timestamp checks.

**Edge Proof (EDGE_PROOF)**  
Raw, signed evidence payload from IoT Edge devices, forming the base for pool updates or attestations.

**Emission Proof (EMISSION_PROOF)**  
Ledger event capturing raw emission data (e.g., CO₂, NOx, wastewater) from plant monitors over a time slice.

**Emission Attestation (EMISSION_ATTESTATION)**  
Derived ledger event allocating emissions to batches or reporting periods for compliance purposes.

**ERP**  
(Enterprise Resource Planning) Business system layer (ISA-95 L4) handling purchase orders, GRNs, inventory, and production orders.

**ESG**  
(Environmental, Social, Governance) Framework for sustainability reporting. In this context, driven by EU CSRD and procurement criteria from aerospace/auto primes.

**Exception Event (RECON_EXCEPTION)**  
Ledger event marking a mismatch between declared and measured values that exceeds tolerance. Blocks downstream evidence until resolved.

**GHG (Greenhouse Gas) Compliance**  
Requirements to report Scope 1 (direct) and Scope 2 (energy-related) emissions with auditable, dual-methodology (location- vs. market-based).

**Finished Goods Warehouse (FG WH)**  
Warehouse managing outbound certified and conventional product pools.

**GRN**  
(Goods Receipt Note) ERP record of received material, linked to Supplier SD if available.

**Hash-Chaining**  
Linking of ledger slice hashes to guarantee continuity and detect retroactive tampering.

**Historians**  
Plant systems that store time-series process data (e.g., furnace kWh), but do not natively link to certified lots or genealogy.

**Immutable Ledger**  
Append-only, tamperproof record store inside the enterprise perimeter. Provides authenticity and continuity without blockchain overhead.

**Inward Balance (INWARD_BALANCE_*)**  
Ledger event updating raw material pools (sustainable or conventional) based on IoT inbound proof.

**ISA-95**  
International standard defining automation layers: ERP (L4), MES (L3), SCADA (L2), and Sensors/PLC (L1). Basis for traversing plant data in a structured way.

**ISCC+**  
International Sustainability and Carbon Certification scheme. Requires mass balance tracking of sustainable feedstock shares through production to outputs, with auditability.

**IoT Edge**  
Edge gateway and software stack that captures, normalizes, and signs OT data before ingestion into the ledger.

**Ledger**  
The Mass Balance Ledger (MBLN): append-only, immutable, time-sliced store of events and pool balances.

**Lot**  
Operationally defined production unit (e.g., ~10,000 bobbins). Lots must inherit certified share and carbon footprint from inputs and utilities.

**Lot Allocation (LOT_ALLOCATION)**  
Ledger event confirming ERP GRN reconciles with IoT inbound, assigning material to a specific lot.

**Mass Balance Method**  
Chain-of-custody model under ISCC+, ensuring certified input volumes equal certified outputs plus losses within defined tolerances.

**MES**  
(Manufacturing Execution System) System layer (ISA-95 L3) handling batch execution, BOMs, declared outputs, and losses.

**Off-gases**  
Process emissions from stabilization and carbonization (e.g., CO₂, NOx, N₂O) that must be tracked for Scope 1 reporting.

**Outbound Balance (OUTWARD_BALANCE_*)**  
Ledger event deducting from certified or conventional finished goods pools when material is dispatched.

**Outbound Proof (OUTWARD_PROOF)**  
ERP dispatch record or delivery order captured as ledger evidence for outbound events.

**PAN Precursor**  
Polyacrylonitrile raw material fed into stabilization ovens to produce carbon fibre. Can be fossil-based, bio-based, or recycled.

**Pool Integrity**  
Concept in mass balance where certified and conventional feedstocks are tracked in separate pools to prevent double-counting or greenwashing.

**Pool Update (POOL_UPDATE)**  
Ledger event adjusting pool balances due to consumption, production, or allocation.

**Production Order**  
ERP instruction to manufacture product, reconciled to MES Batch Order.

**Recon Attestation (RECON_ATTESTATION)**  
Ledger event confirming that SCADA counters matched MES declarations within tolerance.

**Recon Exception (RECON_EXCEPTION)**  
Ledger event indicating a declared vs. measured gap exceeded tolerance; blocks SD/Carry-Forward.

**SCADA**  
(Supervisory Control and Data Acquisition) System layer (ISA-95 L2) providing batch totals, counters, alarms, and historian data.

**Scope 1 Emissions**  
Direct emissions from owned sources (e.g., CO₂, NOx, N₂O from furnaces and off-gases).

**Scope 2 Emissions**  
Indirect emissions from purchased energy (e.g., electricity, steam), reported with both location- and market-based methodologies.

**Schema Registry**  
Component validating that inbound payloads conform to contract schemas before ledger ingestion.

**Sensor Layer (ISA-95 Level 1)**  
Physical devices (PLCs, meters, analysers) capturing process data. Foundation for tamperproof edge proofs in the ledger.

**Sustainability Declaration (SD)**  
Formal ISCC+ certificate document issued with certified material shipments.

**Supplier SD**  
Sustainability Declaration provided by the supplier, linked to inbound GRN.

**Tamperproof Evidence**  
Guarantee that data captured (from ERP, MES, SCADA, sensors) cannot be altered retroactively, enforced by contracts, schema validation, and immutability.

**Time-Slicing**  
Grouping of events into bounded windows (e.g., hourly/shift), each with a hash-chained slice root for continuity.

**Tolerance (ε)**  
Maximum allowed variance between declared and measured values; defined per stage and material.

**Utility Proof (UTILITY_PROOF)**  
Ledger event capturing time-sliced raw utility consumption (electricity, steam, water, gas).

**Utility Attestation (UTILITY_ATTESTATION)**  
Ledger event allocating utility consumption to batches or production periods, enabling carbon intensity calculations.

**Voluntary vs. Mandatory Compliance**  
Industry shift from optional sustainability disclosures to required ISCC+, CSRD, and DPP compliance, driven by aerospace, automotive, and renewable procurement.

---

*Document converted from PDF format by Shinwa USA-ICE-JIT*