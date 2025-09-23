# ISCC+ Production Manager

A comprehensive production management system for sustainable materials with ISCC+ certification support. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

### Core Functionality
- **Order & Stock Management**: Purchase order processing, inventory tracking, material receiving/shipping
- **Production Planning**: Production scheduling, batch management, instruction creation
- **Indirect Materials**: Utilities management, energy consumption, chemical tracking
- **Finished Products**: Product inventory, certificate management, shipping orders
- **Supplier Portal**: Supplier management, performance evaluation, relationship tracking
- **Quality Management**: Quality control, testing procedures, compliance monitoring
- **Cost Analysis**: Cost tracking, optimization opportunities, ROI analysis
- **Predictive Analytics**: AI-powered demand forecasting, quality predictions, risk assessment
- **Advanced Reporting**: Automated report generation, multi-format exports, scheduled distribution
- **ISCC+ Certification**: Complete certificate management, audit trails, compliance monitoring
- **Carbon Footprint**: Emission tracking, sustainability metrics, reduction initiatives
- **Analytics Dashboard**: Comprehensive insights across all business functions

### Key Capabilities
- **Mass Balance Methodology**: Implements ISCC+ mass balance calculation for sustainable materials
- **Real-time Monitoring**: Live dashboard with production metrics and sustainability KPIs
- **Certificate Generation**: Automated ISCC+ certificate creation with digital signatures
- **Compliance Management**: Audit trail tracking and compliance monitoring
- **Multi-language Ready**: Japanese communication support with English interface
- **Responsive Navigation**: Three-tier responsive design with grouped dropdown menus for optimal UX across all devices
- **Enhanced Dropdown System**: Improved click-based dropdown menus with visual feedback and better accessibility
- **Optimized Layout**: Clean horizontal navigation without scrollbars or overlapping elements

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Framework**: Shadcn UI components with Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router with HashRouter for deployment flexibility
- **State Management**: React Query for data fetching and caching

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iceplantengineering/iscc-manager.git
cd iscc-manager

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI Components
│   ├── ui/              # Shadcn UI components
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── ISCCCertification.tsx
│   │   ├── CarbonFootprintCalculator.tsx
│   │   ├── RawMaterialInput.tsx
│   │   ├── BatchManagement.tsx
│   │   └── CertificateGenerator.tsx
│   ├── SupplierPortal.tsx      # Supplier management
│   ├── QualityManagement.tsx   # Quality control system
│   ├── CostAnalysis.tsx        # Cost tracking & optimization
│   ├── PredictiveAnalytics.tsx # AI-powered predictions
│   ├── AdvancedReporting.tsx   # Report generation & exports
│   └── Navigation.tsx   # Enhanced navigation component with responsive dropdown menus
├── pages/               # Page Components
│   ├── Index.tsx             # Dashboard overview
│   ├── OrderStock.tsx         # Order & stock management
│   ├── ProductionPlan.tsx     # Production planning
│   ├── IndirectMaterials.tsx  # Utilities & indirect materials
│   ├── FinishedProducts.tsx    # Product inventory & certificates
│   ├── SupplierPortal.tsx     # Supplier management
│   ├── Quality.tsx            # Quality management
│   ├── CostAnalysis.tsx       # Cost analysis
│   ├── PredictiveAnalytics.tsx # Predictive insights
│   ├── AdvancedReporting.tsx  # Advanced reporting
│   ├── Certification.tsx       # ISCC+ certification
│   ├── Carbon.tsx            # Carbon footprint
│   └── Analytics.tsx         # Analytics & reporting
├── lib/                 # Utility functions and data
└── App.tsx             # Main application component
```

## 📋 Input Requirements & Operation Flow

### Input Information Requirements
The system requires comprehensive input data for ISCC+ compliance and production management:

**Core Input Categories:**
- **Master Data**: Materials, suppliers, products with certification details
- **Production Data**: Plans, actual results, quality control records
- **Inventory Data**: Purchase orders, receiving, shipping, stock levels
- **ISCC+ Data**: Mass balance calculations, certificate information, carbon footprint
- **Quality Data**: Inspection results, testing records, compliance verification
- **Cost Data**: Material costs, labor, overhead, budget tracking
- **Supplier Data**: Performance evaluations, sustainability metrics
- **Analytics Data**: Market trends, forecasts, external data sources

### Daily Operation Flow
**8:00-8:30**: System startup and daily planning confirmation
**Throughout day**: Real-time production data entry, material receiving/shipping
**Shift end**: Production results entry, quality inspection records
**Daily**: Inventory reconciliation, mass balance calculations

### Weekly Operation Flow
**Weekly**: Supplier performance evaluation, inventory counts
**Planning**: Weekly production planning and scheduling

### Monthly Operation Flow
**Monthly**: ISCC+ reporting, carbon footprint calculations, financial closing
**Quality**: Monthly quality reports and improvement tracking

### Annual Operation Flow
**Annual**: ISCC+ certification renewal, annual planning, budget preparation

For detailed input requirements and operation procedures, see the documentation in the `docs/` folder:

- `docs/INPUT_REQUIREMENTS.md` - Comprehensive input data specifications
- `docs/OPERATION_FLOW.md` - Daily operation procedures and timing
- `docs/INPUT_PRIORITIES.md` - Data priority and quality management

## 🎯 Application Architecture

### Dashboard Overview
The main dashboard provides a comprehensive summary view with:
- Key performance indicators across all modules
- Quick navigation cards to all functional areas
- Recent activities and system alerts
- Real-time status indicators and notifications

### Order & Stock Management
- Purchase order creation and tracking
- Material receiving and inspection
- Inventory management with lot tracking
- Supplier performance monitoring

### Production Planning & Execution
- Production scheduling and capacity planning
- Batch management with unique identifiers
- Work instruction generation and distribution
- Real-time production monitoring and OEE tracking

### Quality Management System
- Quality inspection procedures and checklists
- Test result management and trend analysis
- Non-conformance tracking and corrective actions
- Quality standards and compliance monitoring

### Supplier Relationship Management
- Supplier evaluation and scoring
- Certification status tracking
- Performance metrics and KPIs
- Communication and collaboration tools

### Cost Analysis & Optimization
- Real-time cost tracking by category
- Optimization opportunity identification
- ROI analysis for improvement projects
- Budget vs. actual variance analysis

### Predictive Analytics & AI
- Demand forecasting using machine learning
- Quality issue prediction and prevention
- Supply chain risk assessment
- Production efficiency optimization

### Advanced Reporting System
- Automated report generation and distribution
- Multiple export formats (PDF, Excel, PowerPoint)
- Scheduled report delivery
- Custom report builder

### ISCC+ Certification Management
- Mass balance calculations and reporting
- Certificate lifecycle management
- Audit preparation and response
- Compliance monitoring and documentation

### Carbon Footprint Management
- Scope 1, 2, and 3 emissions tracking
- Carbon footprint calculation and reporting
- Reduction initiative management
- Sustainability metrics and KPIs

## 🚀 Key Benefits

### For ISCC+ Compliance
- **Guaranteed Compliance**: Built-in ISCC+ mass balance methodology and audit trails
- **Automated Reporting**: Automated generation of compliance reports and certificates
- **Risk Mitigation**: Real-time monitoring and alerts for compliance issues
- **Audit Ready**: Complete documentation and traceability for certification audits

### For Operational Efficiency
- **Real-time Visibility**: Live dashboards and real-time data across all operations
- **Process Optimization**: AI-powered insights for continuous improvement
- **Resource Optimization**: Better planning and utilization of resources
- **Decision Support**: Data-driven insights for better business decisions

### For Sustainability Management
- **Carbon Tracking**: Comprehensive carbon footprint monitoring and reporting
- **Supplier Sustainability**: Supplier sustainability performance tracking
- **Resource Efficiency**: Monitoring and optimization of resource usage
- **Environmental Compliance**: Meeting environmental regulations and standards

### For Business Intelligence
- **360° Visibility**: Complete visibility across all business functions
- **Predictive Insights**: AI-powered predictions for better planning
- **Performance Monitoring**: KPI tracking and performance management
- **Strategic Planning**: Data-driven strategic decision making

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
VITE_API_BASE_URL=your_api_endpoint
VITE_ENABLE_ROUTE_MESSAGING=true
```

## 📋 ISCC+ Compliance

This application implements:
- **Mass Balance Methodology**: Tracks sustainable materials through production
- **Traceability**: Full supply chain visibility
- **Documentation**: Automated certificate generation
- **Audit Readiness**: Complete audit trail and compliance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- ISCC International for certification standards
- React team for the excellent framework
- Shadcn UI for the beautiful component library
- Vercel for Vite build tool

## 📞 Support

For support and questions:
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ for sustainable production management

## 📝 Development History

### Phase 1: IMBL System Implementation (Immutable Mass Balance Ledger)
- **Date**: 2025-01-XX
- **Features Added**:
  - Complete TypeScript types for mass balance ledger system
  - ImmutableMassBalanceLedger service class with hash-based event chaining
  - CertificateGenerator component with practical UI for certificate creation
  - MassBalanceDashboard for real-time mass balance monitoring
  - Integration with existing ISCC+ Production Manager architecture
  - Navigation and routing updates for new IMBL features

### Phase 2: ISA-95 Integration Layer
- **Date**: 2025-01-XX
- **Features Added**:
  - Comprehensive ISA-95 automation pyramid types (Levels 1-4)
  - Equipment hierarchy management (Enterprise → Site → Area → Work Center → Work Unit)
  - Material transformation tracking with yield calculations
  - Data contract validation across system layers
  - IntegrationDashboard for monitoring system integration status
  - Real-time equipment performance monitoring

### Phase 3: IoT Edge Data Collection System
- **Date**: 2025-01-XX
- **Features Added**:
  - EdgeCollectorService for IoT device management
  - Real-time device monitoring and data collection
  - Device buffering and compression optimization
  - Event logging and alert system
  - EdgeCollectorDashboard with comprehensive device management UI
  - Support for multiple device types (sensors, PLCs, meters, scanners)

### Phase 4: Utility Management & Energy Monitoring
- **Date**: 2025-01-XX
- **Features Added**:
  - Comprehensive utility consumption tracking (electricity, water, gas, steam)
  - Real-time energy monitoring with cost analytics
  - Device-level consumption tracking
  - Optimization recommendations and savings calculations
  - Carbon footprint correlation with utility usage
  - Interactive charts and trend analysis

### Phase 5: Environmental Monitoring & CEMS Integration
- **Date**: 2025-01-XX
- **Features Added**:
  - Continuous Emission Monitoring System (CEMS) integration
  - Real-time emission tracking for CO2, NOx, SOx, particulate matter
  - Environmental compliance management with regulatory thresholds
  - Automated reporting for environmental agencies
  - Emission reduction tracking and sustainability metrics
  - Environmental event logging and alert system

### Phase 6: Digital Product Passport (DPP)
- **Date**: 2025-01-XX
- **Features Added**:
  - Comprehensive product lifecycle transparency
  - Supply chain traceability and sustainability tracking
  - Carbon footprint analysis by product
  - QR code generation for consumer access
  - Blockchain verification for data integrity
  - Multi-language support and compliance documentation

### Phase 7: Advanced Analytics & AI Integration
- **Date**: 2025-01-XX
- **Features Added**:
  - AI-powered production optimization recommendations
  - Predictive maintenance and quality forecasting
  - Real-time anomaly detection and alerting
  - Advanced data visualization with interactive dashboards
  - Machine learning models for trend analysis
  - Automated insight generation and reporting

### Navigation & UI Improvements
- **Date**: 2025-01-XX
- **Features Added**:
  - Consolidated ISCC+ Certification and IMBL System navigation
  - Enhanced responsive design across all pages
  - Fixed responsive width issues for consistency
  - English translation for all Japanese text elements
  - Improved accessibility and user experience

### Form Management System
- **Date**: 2025-01-XX
- **Features Added**:
  - ProductionPlanForm for creating/editing production plans
  - FinishedProductForm for comprehensive product management
  - Common form components library with validation
  - Tabbed interfaces for complex data entry
  - Dynamic field management and real-time validation

### Responsive Design Fixes
- **Date**: 2025-01-23
- **Issues Fixed**:
  - Edge Data Collectors page width inconsistency
  - Container constraints added for consistent zoom behavior
  - All pages now use standardized `max-w-7xl mx-auto p-6 space-y-6` pattern

### Technical Achievements
- **Architecture**: Implemented scalable service-layer architecture with TypeScript
- **Performance**: Optimized data processing with time-sliced operations
- **Security**: Hash-based event chaining for data integrity
- **User Experience**: Responsive design with Shadcn UI components
- **Integration**: Seamless integration with existing ISCC+ Production Manager
- **Compliance**: Full ISCC+ mass balance methodology implementation

### Current Status
- **Branch**: `new-app-development`
- **Deployment**: Netlify deployment with successful builds
- **Features**: All planned features implemented and tested
- **Next Steps**: User testing and feedback collection for further improvements
