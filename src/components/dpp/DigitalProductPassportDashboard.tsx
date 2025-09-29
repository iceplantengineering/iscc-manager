import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';
import {
  Package,
  Hash,
  Leaf,
  Factory,
  Truck,
  Globe,
  Smartphone,
  QrCode,
  BarChart3,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Share2,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Database,
  FileText,
  Image,
  Link as LinkIcon,
  MapPin,
  Calendar,
  Scale,
  Recycle,
  Award,
  Star,
  Zap,
  Droplets,
  Wind,
  Cloud,
  Users,
  Settings,
  RefreshCw
} from 'lucide-react';

// Types for Digital Product Passport
interface ProductPassport {
  id: string;
  productId: string;
  productName: string;
  productCategory: string;
  version: string;
  status: 'draft' | 'active' | 'archived' | 'deprecated';
  createdAt: Date;
  updatedAt: Date;
  lastVerified: Date;
  nextReview: Date;
  verificationLevel: 'basic' | 'standard' | 'enhanced' | 'premium';
  isVerified: boolean;
  verificationAuthority: string;
  blockchainHash?: string;
}

interface ProductInformation {
  productId: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  model: string;
  sku: string;
  gtin?: string;
  images: string[];
  specifications: {
    weight: number;
    dimensions: { length: number; width: number; height: number };
    material: string;
    color: string;
    [key: string]: any;
  };
  certifications: {
    type: string;
    number: string;
    issuedBy: string;
    issueDate: Date;
    expiryDate: Date;
    status: 'active' | 'expired' | 'pending';
  }[];
}

interface SustainabilityData {
  carbonFootprint: {
    total: number;
    unit: string;
    breakdown: {
      rawMaterials: number;
      production: number;
      transportation: number;
      usePhase: number;
      endOfLife: number;
    };
    reductionVsBaseline: number;
    offsetCredits: number;
  };
  materialComposition: {
    recycledContent: number;
    renewableContent: number;
    biobasedContent: number;
    materials: Array<{
      material: string;
      percentage: number;
      isRecycled: boolean;
      isRenewable: boolean;
      origin: string;
      certifications?: string[];
    }>;
  };
  waterFootprint: {
    total: number;
    unit: string;
    scarcityWeighted: number;
    breakdown: {
      production: number;
      supplyChain: number;
      usePhase: number;
    };
  };
  energyConsumption: {
    production: number;
    usePhase: number;
    renewablePercentage: number;
  };
  endOfLife: {
    recyclability: number;
    recycledContent: number;
    disposalMethod: string;
    takebackProgram: boolean;
  };
}

interface SupplyChainData {
  tier1Suppliers: Array<{
    id: string;
    name: string;
    location: string;
    certification: string;
    complianceScore: number;
    materials: string[];
  }>;
  manufacturing: {
    facility: string;
    location: string;
    certifications: string[];
    energySources: string[];
    carbonIntensity: number;
    laborStandards: string;
  };
  logistics: {
    transportationModes: Array<{
      mode: string;
      distance: number;
      emissions: number;
      provider: string;
    }>;
    warehouseLocations: string[];
    distributionNetwork: string;
  };
  traceability: {
    level: 'batch' | 'product' | 'component';
    technology: string;
    verificationMethod: string;
  };
}

interface ComplianceData {
  regulatoryFrameworks: Array<{
    framework: string;
    region: string;
    complianceStatus: 'compliant' | 'non_compliant' | 'partial' | 'exempt';
    lastAudit: Date;
    nextAudit: Date;
    certificateId?: string;
  }>;
  standards: Array<{
    standard: string;
    version: string;
    compliance: boolean;
    evidence: string[];
  }>;
  riskAssessments: Array<{
    risk: string;
    level: 'low' | 'medium' | 'high' | 'critical';
    mitigation: string;
    status: 'open' | 'in_progress' | 'mitigated';
  }>;
}

const DigitalProductPassportDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [passports, setPassports] = useState<ProductPassport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample passport data
  const samplePassports: ProductPassport[] = [
    {
      id: 'DPP-CFC-001',
      productId: 'CFC-2024-001',
      productName: 'Carbon Fiber Composite Panel',
      productCategory: 'Composite Materials',
      version: '1.0',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-03-01'),
      lastVerified: new Date('2024-02-28'),
      nextReview: new Date('2024-08-28'),
      verificationLevel: 'enhanced',
      isVerified: true,
      verificationAuthority: 'ISCC PLUS',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890'
    },
    {
      id: 'DPP-BIO-002',
      productId: 'BIO-2024-002',
      productName: 'Bio-based Resin Compound',
      productCategory: 'Chemicals',
      version: '2.1',
      status: 'active',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-03-15'),
      lastVerified: new Date('2024-03-10'),
      nextReview: new Date('2024-09-10'),
      verificationLevel: 'premium',
      isVerified: true,
      verificationAuthority: 'TÜV Rheinland',
      blockchainHash: '0x9876543210fedcba0987654321fedcba0987654321fedcba0987654321fedcba'
    }
  ];

  // Sample sustainability data
  const sustainabilityData: SustainabilityData = {
    carbonFootprint: {
      total: 12.5,
      unit: 'kg CO2e',
      breakdown: {
        rawMaterials: 3.2,
        production: 4.8,
        transportation: 1.8,
        usePhase: 2.4,
        endOfLife: 0.3
      },
      reductionVsBaseline: 35,
      offsetCredits: 2.1
    },
    materialComposition: {
      recycledContent: 45,
      renewableContent: 62,
      biobasedContent: 58,
      materials: [
        {
          material: 'Carbon Fiber',
          percentage: 40,
          isRecycled: true,
          isRenewable: false,
          origin: 'Recycled aerospace components',
          certifications: ['ISCC PLUS', 'GRS']
        },
        {
          material: 'Bio-resin',
          percentage: 35,
          isRecycled: false,
          isRenewable: true,
          origin: 'Plant-based sources',
          certifications: ['ASTM D6866', 'OK Biobased']
        },
        {
          material: 'Natural Fibers',
          percentage: 25,
          isRecycled: false,
          isRenewable: true,
          origin: 'Sustainable forestry',
          certifications: ['FSC', 'PEFC']
        }
      ]
    },
    waterFootprint: {
      total: 850,
      unit: 'liters',
      scarcityWeighted: 420,
      breakdown: {
        production: 620,
        supplyChain: 180,
        usePhase: 50
      }
    },
    energyConsumption: {
      production: 45,
      usePhase: 15,
      renewablePercentage: 78
    },
    endOfLife: {
      recyclability: 92,
      recycledContent: 45,
      disposalMethod: 'Mechanical recycling',
      takebackProgram: true
    }
  };

  // Sample supply chain data
  const supplyChainData: SupplyChainData = {
    tier1Suppliers: [
      {
        id: 'SUP-001',
        name: 'EcoCarbon Solutions',
        location: 'Germany',
        certification: 'ISCC PLUS',
        complianceScore: 95,
        materials: ['Recycled carbon fiber', 'Bio-resins']
      },
      {
        id: 'SUP-002',
        name: 'Green Materials Co',
        location: 'Netherlands',
        certification: 'FSC, PEFC',
        complianceScore: 92,
        materials: ['Natural fibers', 'Bio-based additives']
      }
    ],
    manufacturing: {
      facility: 'Green Manufacturing Plant A',
      location: 'Munich, Germany',
      certifications: ['ISO 14001', 'ISO 50001', 'ISCC PLUS'],
      energySources: ['Solar (65%)', 'Wind (25%)', 'Grid (10%)'],
      carbonIntensity: 0.12,
      laborStandards: 'SA8000 Certified'
    },
    logistics: {
      transportationModes: [
        {
          mode: 'Electric Truck',
          distance: 120,
          emissions: 0.08,
          provider: 'Green Logistics GmbH'
        },
        {
          mode: 'Rail',
          distance: 450,
          emissions: 0.05,
          provider: 'European Rail Freight'
        }
      ],
      warehouseLocations: ['Munich, DE', 'Rotterdam, NL', 'Paris, FR'],
      distributionNetwork: 'Pan-European Green Network'
    },
    traceability: {
      level: 'component' as const,
      technology: 'Blockchain + IoT',
      verificationMethod: 'Third-party audited'
    }
  };

  // Sample compliance data
  const complianceData: ComplianceData = {
    regulatoryFrameworks: [
      {
        framework: 'EU Digital Product Passport',
        region: 'European Union',
        complianceStatus: 'compliant' as const,
        lastAudit: new Date('2024-02-15'),
        nextAudit: new Date('2025-02-15'),
        certificateId: 'EUDPP-2024-001'
      },
      {
        framework: 'ESG Reporting',
        region: 'Global',
        complianceStatus: 'compliant' as const,
        lastAudit: new Date('2024-01-20'),
        nextAudit: new Date('2024-07-20'),
        certificateId: 'ESG-2024-042'
      }
    ],
    standards: [
      {
        standard: 'ISO 14040',
        version: '2006',
        compliance: true,
        evidence: ['LCA Report', 'Third-party verification']
      },
      {
        standard: 'ISO 14067',
        version: '2018',
        compliance: true,
        evidence: ['Carbon Footprint Analysis', 'Product Rule Documentation']
      }
    ],
    riskAssessments: [
      {
        risk: 'Supply Chain Disruption',
        level: 'medium' as const,
        mitigation: 'Multiple certified suppliers identified',
        status: 'mitigated' as const
      },
      {
        risk: 'Regulatory Changes',
        level: 'low' as const,
        mitigation: 'Regular monitoring of EU regulations',
        status: 'in_progress' as const
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      draft: 'outline',
      archived: 'secondary',
      deprecated: 'destructive',
      compliant: 'default',
      non_compliant: 'destructive',
      partial: 'outline',
      exempt: 'secondary'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getVerificationBadge = (level: string) => {
    const variants = {
      basic: 'secondary',
      standard: 'outline',
      enhanced: 'default',
      premium: 'default'
    } as const;

    return (
      <Badge variant={variants[level as keyof typeof variants] || 'secondary'}>
        {level.toUpperCase()}
      </Badge>
    );
  };

  const generateQRCode = (passportId: string) => {
    // Mock QR code generation - in real implementation, would generate actual QR code
    return `https://dpp.example.com/verify/${passportId}`;
  };

  const generatePassport = async () => {
    setIsGenerating(true);
    // Simulate passport generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newPassport: ProductPassport = {
      id: `DPP-${Date.now()}`,
      productId: 'NEW-001',
      productName: 'New Sustainable Product',
      productCategory: 'Composite Materials',
      version: '1.0',
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastVerified: new Date(),
      nextReview: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
      verificationLevel: 'basic',
      isVerified: false,
      verificationAuthority: 'Pending'
    };

    setPassports(prev => [...prev, newPassport]);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Digital Product Passport (DPP)</h1>
          <p className="text-muted-foreground">
            Comprehensive product lifecycle transparency and sustainability tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={generatePassport} disabled={isGenerating}>
            <Plus className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Create Passport'}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Passports</p>
                <p className="text-2xl font-bold">{samplePassports.length}</p>
                <p className="text-xs text-muted-foreground">Verified products</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Carbon Reduction</p>
                <p className="text-2xl font-bold">35%</p>
                <p className="text-xs text-muted-foreground">vs industry baseline</p>
              </div>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Supply Chain Transparency</p>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-muted-foreground">Fully traceable</p>
              </div>
              <Hash className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-muted-foreground">EU DPP Ready</p>
              </div>
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="supplychain">Supply Chain</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Product Passport List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Passports
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search passports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {samplePassports.map((passport) => (
                  <div key={passport.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{passport.productName}</h3>
                            {getStatusBadge(passport.status)}
                            {getVerificationBadge(passport.verificationLevel)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {passport.productCategory} • ID: {passport.productId}
                          </p>
                          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                            <span>Created: {passport.createdAt.toLocaleDateString()}</span>
                            <span>Verified: {passport.verificationAuthority}</span>
                            <span>Next Review: {passport.nextReview.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Code
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <QrCode className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Generate QR Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create scannable QR codes for product verification
                </p>
                <Button variant="outline" className="w-full">
                  Generate QR
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">Mobile Verification</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enable customers to verify product sustainability
                </p>
                <Button variant="outline" className="w-full">
                  Setup Mobile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Public Portal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Share sustainability data with stakeholders
                </p>
                <Button variant="outline" className="w-full">
                  Configure Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Carbon Footprint */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Carbon Footprint Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {sustainabilityData.carbonFootprint.total} kg CO₂e
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Carbon Footprint
                    </div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">
                        {sustainabilityData.carbonFootprint.reductionVsBaseline}% reduction
                      </span>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={Object.entries(sustainabilityData.carbonFootprint.breakdown).map(([key, value]) => ({
                      name: key.replace(/([A-Z])/g, ' $1').trim(),
                      value
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Material Composition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5" />
                  Material Composition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {sustainabilityData.materialComposition.recycledContent}%
                      </div>
                      <div className="text-xs text-muted-foreground">Recycled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {sustainabilityData.materialComposition.renewableContent}%
                      </div>
                      <div className="text-xs text-muted-foreground">Renewable</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {sustainabilityData.materialComposition.biobasedContent}%
                      </div>
                      <div className="text-xs text-muted-foreground">Biobased</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sustainabilityData.materialComposition.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{material.material}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{material.percentage}%</span>
                          {material.isRecycled && <Recycle className="h-3 w-3 text-blue-600" />}
                          {material.isRenewable && <Leaf className="h-3 w-3 text-green-600" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sustainability Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {sustainabilityData.waterFootprint.total} L
                  </div>
                  <div className="text-sm text-muted-foreground">Water Footprint</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {sustainabilityData.energyConsumption.renewablePercentage}%
                  </div>
                  <div className="text-sm text-muted-foreground">Renewable Energy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {sustainabilityData.endOfLife.recyclability}%
                  </div>
                  <div className="text-sm text-muted-foreground">Recyclability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {sustainabilityData.endOfLife.recycledContent}%
                  </div>
                  <div className="text-sm text-muted-foreground">Recycled Content</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplychain" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Supply Chain Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Supply Chain Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Manufacturing Facility</span>
                      <MapPin className="h-4 w-4 text-gray-600" />
                    </div>
                    <p className="text-sm">{supplyChainData.manufacturing.facility}</p>
                    <p className="text-xs text-muted-foreground">{supplyChainData.manufacturing.location}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {supplyChainData.manufacturing.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Carbon Intensity</span>
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-lg font-bold">{supplyChainData.manufacturing.carbonIntensity} kg CO2e/unit</p>
                    <p className="text-xs text-muted-foreground">Below industry average</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Traceability Level</span>
                      <Hash className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="font-medium">{supplyChainData.traceability.level.charAt(0).toUpperCase() + supplyChainData.traceability.level.slice(1)} Level</p>
                    <p className="text-xs text-muted-foreground">{supplyChainData.traceability.technology}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Suppliers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Key Suppliers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supplyChainData.tier1Suppliers.map((supplier, index) => (
                    <div key={supplier.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{supplier.name}</span>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{supplier.complianceScore}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{supplier.location}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {supplier.certification}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {supplier.materials.join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transportation Network */}
          <Card>
            <CardHeader>
              <CardTitle>Transportation & Logistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Transportation Modes</h4>
                  <div className="space-y-2">
                    {supplyChainData.logistics.transportationModes.map((mode, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm font-medium">{mode.mode}</span>
                        <div className="text-right">
                          <div className="text-sm">{mode.distance} km</div>
                          <div className="text-xs text-muted-foreground">{mode.emissions} kg CO2e</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Network Coverage</h4>
                  <div className="space-y-2">
                    <div className="p-2 border rounded">
                      <span className="text-sm font-medium">Warehouse Locations</span>
                      <div className="text-xs text-muted-foreground">
                        {supplyChainData.logistics.warehouseLocations.join(', ')}
                      </div>
                    </div>
                    <div className="p-2 border rounded">
                      <span className="text-sm font-medium">Distribution Network</span>
                      <div className="text-xs text-muted-foreground">
                        {supplyChainData.logistics.distributionNetwork}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Regulatory Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Regulatory Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceData.regulatoryFrameworks.map((framework, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{framework.framework}</span>
                        {getStatusBadge(framework.complianceStatus)}
                      </div>
                      <p className="text-sm text-muted-foreground">{framework.region}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Last Audit: {framework.lastAudit.toLocaleDateString()}</span>
                        <span>Next: {framework.nextAudit.toLocaleDateString()}</span>
                      </div>
                      {framework.certificateId && (
                        <div className="text-xs text-blue-600 mt-1">
                          Certificate: {framework.certificateId}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Standards & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Standards & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceData.standards.map((standard, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{standard.standard}</span>
                        {standard.compliance ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Version {standard.version}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {standard.evidence.map((evidence, evidenceIndex) => (
                          <Badge key={evidenceIndex} variant="outline" className="text-xs">
                            {evidence}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment & Mitigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {complianceData.riskAssessments.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{risk.risk}</span>
                      {getVerificationBadge(risk.level)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{risk.mitigation}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Status:</span>
                      {getStatusBadge(risk.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">VERIFIED</div>
                    <div className="text-sm text-muted-foreground">
                      Enhanced Level Verification
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last verified: March 15, 2024
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Verification Authority</span>
                      <span className="font-medium">ISCC PLUS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Verification Method</span>
                      <span className="font-medium">Third-party Audit</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Blockchain Verified</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Next Review</span>
                      <span className="font-medium">August 28, 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Product Verification QR Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border-2 border-dashed rounded-lg">
                    <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Scan to verify product sustainability credentials
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download QR Code
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Verification Link</h4>
                    <div className="p-2 bg-gray-50 rounded text-xs font-mono break-all">
                      {generateQRCode(samplePassports[0].id)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verification History */}
          <Card>
            <CardHeader>
              <CardTitle>Verification History & Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium">Enhanced Verification Completed</div>
                    <div className="text-sm text-muted-foreground">
                      ISCC PLUS verification completed - Enhanced level achieved
                    </div>
                    <div className="text-xs text-muted-foreground">March 15, 2024</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">Annual Review</div>
                    <div className="text-sm text-muted-foreground">
                      Scheduled annual compliance review and verification
                    </div>
                    <div className="text-xs text-muted-foreground">Scheduled: August 28, 2024</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <div className="font-medium">Premium Verification Upgrade</div>
                    <div className="text-sm text-muted-foreground">
                      Optional upgrade to premium verification level with blockchain integration
                    </div>
                    <div className="text-xs text-muted-foreground">Available: Q2 2024</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DigitalProductPassportDashboard;