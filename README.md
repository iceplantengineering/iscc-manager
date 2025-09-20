# ISCC+ Production Manager

A comprehensive production management system for sustainable materials with ISCC+ certification support. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

### Core Functionality
- **Material Management**: Track raw materials with sustainability parameters and certification status
- **Production Management**: Batch management with unique identifiers and real-time monitoring
- **ISCC+ Certification**: Complete certificate management with audit trails and compliance monitoring
- **Carbon Footprint Tracking**: Real-time carbon emission calculations and reduction initiatives
- **Analytics & Reporting**: Comprehensive insights with production, sustainability, and financial metrics

### Key Capabilities
- **Mass Balance Methodology**: Implements ISCC+ mass balance calculation for sustainable materials
- **Real-time Monitoring**: Live dashboard with production metrics and sustainability KPIs
- **Certificate Generation**: Automated ISCC+ certificate creation with digital signatures
- **Compliance Management**: Audit trail tracking and compliance monitoring
- **Multi-language Ready**: Japanese communication support with English interface

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
│   └── Navigation.tsx   # Main navigation component
├── pages/               # Page Components
│   ├── Index.tsx        # Dashboard overview
│   ├── Materials.tsx    # Material management
│   ├── Production.tsx   # Production management
│   ├── Certification.tsx # ISCC+ certification
│   ├── Carbon.tsx       # Carbon footprint
│   └── Analytics.tsx    # Analytics & reporting
├── lib/                 # Utility functions and data
└── App.tsx             # Main application component
```

## 🎯 Application Architecture

### Dashboard Overview
The main dashboard provides a summary view with:
- Key metrics and statistics
- Quick navigation cards
- Recent activities
- System status indicators

### Material Management
- Raw material tracking with sustainability parameters
- Certification status management
- Inventory monitoring
- Supplier information

### Production Management
- Batch creation and tracking
- Production line monitoring
- Quality control integration
- Real-time performance metrics

### ISCC+ Certification
- Certificate lifecycle management
- Audit trail tracking
- Compliance monitoring
- Automated certificate generation

### Carbon Footprint
- Emission factor database
- Real-time carbon calculations
- Reduction initiatives tracking
- Sustainability reporting

### Analytics & Reporting
- Production performance metrics
- Financial analysis
- Sustainability KPIs
- Export capabilities

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
