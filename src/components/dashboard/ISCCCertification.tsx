import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Download,
  Upload,
  Eye,
  Edit
} from "lucide-react";

interface CertificateData {
  id: string;
  certificateNumber: string;
  certificationType: string;
  issuedDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'pending' | 'suspended';
  issuer: string;
  scope: string[];
  biomassContent: number;
  carbonFootprint: number;
  traceabilityChain: string[];
}

interface FeedstockData {
  id: string;
  supplier: string;
  materialType: string;
  certificateId: string;
  quantity: number;
  unit: string;
  origin: string;
  sustainabilityScore: number;
  carbonFootprint: number;
  deliveryDate: string;
  quality: string;
}

const ISCCCertification = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([
    {
      id: 'CERT-001',
      certificateNumber: 'ISCC-PLUS-2025-001234',
      certificationType: 'ISCC PLUS',
      issuedDate: '2025-01-15',
      expiryDate: '2026-01-14',
      status: 'valid',
      issuer: 'ISCC System GmbH',
      scope: ['Biomass Products', 'Carbon Fiber', 'Recycled Materials'],
      biomassContent: 85,
      carbonFootprint: 2.3,
      traceabilityChain: ['Supplier A', 'Manufacturing Plant', 'Warehouse', 'Customer']
    },
    {
      id: 'CERT-002',
      certificateNumber: 'ISCC-EU-2025-005678',
      certificationType: 'ISCC EU',
      issuedDate: '2024-12-01',
      expiryDate: '2025-11-30',
      status: 'valid',
      issuer: 'ISCC System GmbH',
      scope: ['Biofuels', 'Biomaterials'],
      biomassContent: 70,
      carbonFootprint: 3.1,
      traceabilityChain: ['Supplier B', 'Refinery', 'Distribution']
    }
  ]);

  const [feedstocks, setFeedstocks] = useState<FeedstockData[]>([
    {
      id: 'FS-001',
      supplier: 'Green Materials Corp',
      materialType: 'Plant-based Resin',
      certificateId: 'CERT-001',
      quantity: 1250,
      unit: 'kg',
      origin: 'Southeast Asia',
      sustainabilityScore: 92,
      carbonFootprint: 1.8,
      deliveryDate: '2025-09-20',
      quality: 'A+'
    },
    {
      id: 'FS-002',
      supplier: 'Sustainable Supply Co',
      materialType: 'Recycled Carbon Fiber',
      certificateId: 'CERT-001',
      quantity: 680,
      unit: 'kg',
      origin: 'Europe',
      sustainabilityScore: 88,
      carbonFootprint: 2.1,
      deliveryDate: '2025-09-18',
      quality: 'A'
    }
  ]);

  const [selectedCertificate, setSelectedCertificate] = useState<string>('');
  const [showAddFeedstock, setShowAddFeedstock] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'expired':
      case 'suspended':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      valid: 'default',
      pending: 'secondary',
      expired: 'destructive',
      suspended: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const generateCertificate = (certificateId: string) => {
    return `/api/certificates/${certificateId}/generate`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ISCC+ Certification Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Certificate
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="feedstocks">Feedstock Management</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          <div className="grid gap-4">
            {certificates.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(cert.status)}
                      <CardTitle className="text-lg">{cert.certificateNumber}</CardTitle>
                      {getStatusBadge(cert.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Type</Label>
                      <p className="text-sm">{cert.certificationType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Issued</Label>
                      <p className="text-sm">{cert.issuedDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Expires</Label>
                      <p className="text-sm">{cert.expiryDate}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Biomass Content</Label>
                      <p className="text-sm">{cert.biomassContent}%</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-600">Scope</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cert.scope.map((scope, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-600">Carbon Footprint</Label>
                    <p className="text-sm">{cert.carbonFootprint} kg CO₂e/kg</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedstocks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Certified Feedstock Management</h3>
            <Button onClick={() => setShowAddFeedstock(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Add Feedstock
            </Button>
          </div>

          <div className="grid gap-4">
            {feedstocks.map((feedstock) => (
              <Card key={feedstock.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{feedstock.materialType}</CardTitle>
                    <Badge variant="outline">
                      {feedstock.certificateId}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Supplier</Label>
                      <p className="text-sm">{feedstock.supplier}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Quantity</Label>
                      <p className="text-sm">{feedstock.quantity} {feedstock.unit}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Origin</Label>
                      <p className="text-sm">{feedstock.origin}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Sustainability Score</Label>
                      <p className="text-sm">{feedstock.sustainabilityScore}%</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Carbon Footprint</Label>
                      <p className="text-sm">{feedstock.carbonFootprint} kg CO₂e/kg</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Quality</Label>
                      <p className="text-sm">{feedstock.quality}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Valid Certificates</span>
                    <Badge variant="default">{certificates.filter(c => c.status === 'valid').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pending Renewals</span>
                    <Badge variant="secondary">{certificates.filter(c => c.status === 'pending').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Expired Certificates</span>
                    <Badge variant="destructive">{certificates.filter(c => c.status === 'expired').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Biomass Content</span>
                    <span>{Math.round(certificates.reduce((sum, c) => sum + c.biomassContent, 0) / certificates.length)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Certificate Verified</p>
                      <p className="text-xs text-gray-600">CERT-001 - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Feedstock Validated</p>
                      <p className="text-xs text-gray-600">FS-002 - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Report Generated</p>
                      <p className="text-xs text-gray-600">Monthly Compliance - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ISCCCertification;