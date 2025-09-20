import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  Award,
  Hash,
  Calendar,
  MapPin,
  Package,
  Leaf,
  BarChart3
} from "lucide-react";

interface CertificateTemplate {
  id: string;
  name: string;
  type: 'iscc_plus' | 'iscc_eu' | 'custom';
  version: string;
  description: string;
  requiredFields: string[];
  logoUrl?: string;
}

interface CertificateData {
  id: string;
  certificateNumber: string;
  templateId: string;
  batchNumber: string;
  productName: string;
  customer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'draft' | 'pending' | 'approved' | 'issued' | 'expired';
  issuer: string;
  inspector: string;
  quantity: number;
  unit: string;
  sustainability: {
    biomassContent: number;
    carbonFootprint: number;
    massBalanceVerified: boolean;
    traceabilityComplete: boolean;
    sustainabilityScore: number;
  };
  parameters: {
    productionLine: string;
    productionDate: string;
    location: string;
    temperature: number;
    pressure: number;
    humidity: number;
  };
  documents: string[];
  notes: string;
  digitalSignature?: {
    signature: string;
    timestamp: string;
    certificateId: string;
  };
}

const CertificateGenerator = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([
    {
      id: 'CERT-001',
      certificateNumber: 'ISCC-PLUS-2025-001234',
      templateId: 'TPL-001',
      batchNumber: 'BM-20250920-001',
      productName: 'Carbon Fiber Composite',
      customer: 'Techno Materials Corp',
      issuedDate: '2025-09-20',
      expiryDate: '2026-09-19',
      status: 'issued',
      issuer: 'ISCC System GmbH',
      inspector: 'John Smith',
      quantity: 985,
      unit: 'kg',
      sustainability: {
        biomassContent: 68,
        carbonFootprint: 1.9,
        massBalanceVerified: true,
        traceabilityComplete: true,
        sustainabilityScore: 89
      },
      parameters: {
        productionLine: 'Line 1',
        productionDate: '2025-09-20',
        location: 'Production Hall A',
        temperature: 220,
        pressure: 85,
        humidity: 45
      },
      documents: ['production_report.pdf', 'quality_inspection.pdf', 'mass_balance.pdf'],
      notes: 'Standard production batch with excellent quality metrics',
      digitalSignature: {
        signature: 'digital_sig_12345',
        timestamp: '2025-09-20T16:30:00Z',
        certificateId: 'CERT-SSL-001'
      }
    },
    {
      id: 'CERT-002',
      certificateNumber: 'ISCC-EU-2025-005678',
      templateId: 'TPL-002',
      batchNumber: 'BM-20250919-012',
      productName: 'Bioplastic Compound',
      customer: 'Eco Solutions Ltd',
      issuedDate: '2025-09-19',
      expiryDate: '2026-09-18',
      status: 'approved',
      issuer: 'ISCC System GmbH',
      inspector: 'Sarah Johnson',
      quantity: 750,
      unit: 'kg',
      sustainability: {
        biomassContent: 96.7,
        carbonFootprint: 1.1,
        massBalanceVerified: true,
        traceabilityComplete: true,
        sustainabilityScore: 95
      },
      parameters: {
        productionLine: 'Line 2',
        productionDate: '2025-09-19',
        location: 'Production Hall B',
        temperature: 180,
        pressure: 65,
        humidity: 50
      },
      documents: ['batch_report.pdf', 'lab_analysis.pdf'],
      notes: 'High biomass content product with excellent sustainability metrics'
    }
  ]);

  const [templates] = useState<CertificateTemplate[]>([
    {
      id: 'TPL-001',
      name: 'ISCC PLUS Certificate',
      type: 'iscc_plus',
      version: '1.2',
      description: 'Standard ISCC PLUS certification for sustainable materials',
      requiredFields: ['batchNumber', 'productName', 'customer', 'quantity', 'biomassContent', 'carbonFootprint']
    },
    {
      id: 'TPL-002',
      name: 'ISCC EU Certificate',
      type: 'iscc_eu',
      version: '2.1',
      description: 'ISCC EU certification for biofuels and biomaterials',
      requiredFields: ['batchNumber', 'productName', 'customer', 'quantity', 'biomassContent', 'carbonFootprint']
    },
    {
      id: 'TPL-003',
      name: 'Custom Sustainability Certificate',
      type: 'custom',
      version: '1.0',
      description: 'Custom certificate for specific sustainability requirements',
      requiredFields: ['batchNumber', 'productName', 'customer', 'quantity']
    }
  ]);

  const [selectedCertificate, setSelectedCertificate] = useState<string>('');
  const [showCreateCertificate, setShowCreateCertificate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [previewMode, setPreviewMode] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      pending: 'secondary',
      approved: 'default',
      issued: 'default',
      expired: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const generateCertificateNumber = (templateType: string) => {
    const prefix = templateType === 'iscc_plus' ? 'ISCC-PLUS' : 'ISCC-EU';
    const year = new Date().getFullYear();
    const sequence = String(certificates.length + 1).padStart(6, '0');
    return `${prefix}-${year}-${sequence}`;
  };

  const downloadCertificate = (certificateId: string) => {
    // Simulate certificate download
    const cert = certificates.find(c => c.id === certificateId);
    if (cert) {
      const blob = new Blob([JSON.stringify(cert, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cert.certificateNumber}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const CertificatePreview = ({ certificate }: { certificate: CertificateData }) => (
    <div className="bg-white p-8 border-2 border-gray-300 rounded-lg max-w-4xl mx-auto">
      {/* Certificate Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Award className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">SUSTAINABILITY CERTIFICATE</h1>
        <div className="h-1 bg-blue-600 w-32 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">ISCC+ Compliant Production</p>
      </div>

      {/* Certificate Details */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-600">Certificate Number</Label>
            <p className="font-semibold">{certificate.certificateNumber}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Batch Number</Label>
            <p className="font-semibold">{certificate.batchNumber}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Product</Label>
            <p className="font-semibold">{certificate.productName}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Customer</Label>
            <p className="font-semibold">{certificate.customer}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-600">Issued Date</Label>
            <p className="font-semibold">{certificate.issuedDate}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Expiry Date</Label>
            <p className="font-semibold">{certificate.expiryDate}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Quantity</Label>
            <p className="font-semibold">{certificate.quantity} {certificate.unit}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Issuer</Label>
            <p className="font-semibold">{certificate.issuer}</p>
          </div>
        </div>
      </div>

      {/* Sustainability Metrics */}
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
          <Leaf className="h-5 w-5" />
          Sustainability Parameters
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{certificate.sustainability.biomassContent}%</p>
            <p className="text-sm text-green-600">Biomass Content</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{certificate.sustainability.carbonFootprint}</p>
            <p className="text-sm text-green-600">kg CO₂e/kg</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">{certificate.sustainability.sustainabilityScore}%</p>
            <p className="text-sm text-green-600">Sustainability Score</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-700">
              {certificate.sustainability.massBalanceVerified ? '✓' : '✗'}
            </p>
            <p className="text-sm text-green-600">Mass Balance</p>
          </div>
        </div>
      </div>

      {/* Production Details */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <Label className="text-sm font-medium text-gray-600">Production Line</Label>
          <p className="font-semibold">{certificate.parameters.productionLine}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Production Date</Label>
          <p className="font-semibold">{certificate.parameters.productionDate}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Location</Label>
          <p className="font-semibold">{certificate.parameters.location}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Inspector</Label>
          <p className="font-semibold">{certificate.inspector}</p>
        </div>
      </div>

      {/* Certificate Footer */}
      <div className="border-t pt-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Digital Certificate ID</p>
            <p className="font-mono text-sm">{certificate.id}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Verification Code</p>
            <p className="font-mono text-sm">VERIFY-{certificate.certificateNumber.slice(-6)}</p>
          </div>
        </div>
        {certificate.digitalSignature && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Digitally signed on {new Date(certificate.digitalSignature.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Certificate Generation System</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button onClick={() => setShowCreateCertificate(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Certificate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates by number, batch, or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Certificate List */}
          <div className="space-y-4">
            {filteredCertificates.map((certificate) => (
              <Card key={certificate.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(certificate.status)}
                      <div>
                        <CardTitle className="text-lg">{certificate.certificateNumber}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {certificate.productName} - {certificate.customer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(certificate.status)}
                      <Badge variant="outline">{certificate.batchNumber}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Quantity</Label>
                      <p className="text-sm font-medium">{certificate.quantity} {certificate.unit}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Biomass Content</Label>
                      <p className="text-sm font-medium">{certificate.sustainability.biomassContent}%</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Carbon Footprint</Label>
                      <p className="text-sm font-medium">{certificate.sustainability.carbonFootprint} kg CO₂e/kg</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Valid Until</Label>
                      <p className="text-sm font-medium">{certificate.expiryDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Issued: {certificate.issuedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{certificate.parameters.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setPreviewMode(true)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => downloadCertificate(certificate.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="outline">{template.type.replace('_', ' ').toUpperCase()}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium">Required Fields:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.requiredFields.map((field, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="defaultTemplate">Default Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TPL-001">ISCC PLUS Certificate</SelectItem>
                        <SelectItem value="TPL-002">ISCC EU Certificate</SelectItem>
                        <SelectItem value="TPL-003">Custom Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expiryPeriod">Certificate Validity Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">1 year</SelectItem>
                        <SelectItem value="24">2 years</SelectItem>
                        <SelectItem value="36">3 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="signatureType">Digital Signature Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="blockchain">Blockchain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-generate on batch completion</p>
                      <p className="text-sm text-muted-foreground">Create certificates automatically</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email notifications</p>
                      <p className="text-sm text-muted-foreground">Notify stakeholders</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Expiry reminders</p>
                      <p className="text-sm text-muted-foreground">Send renewal notices</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Certificate Preview Modal */}
      {previewMode && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Certificate Preview</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPreviewMode(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              {certificates.find(c => c.id === selectedCertificate) && (
                <CertificatePreview certificate={certificates.find(c => c.id === selectedCertificate)!} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;