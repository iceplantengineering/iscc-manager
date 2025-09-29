import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Download, FileText, Award, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { imbl, CertificateGeneration } from "@/lib/imbl";

interface CertificateFormData {
  certificateType: string;
  periodStart: string;
  periodEnd: string;
  customerName?: string;
  orderNumber?: string;
  notes?: string;
}

const CertificateGenerator = () => {
  const [formData, setFormData] = useState<CertificateFormData>({
    certificateType: "",
    periodStart: "",
    periodEnd: "",
    customerName: "",
    orderNumber: "",
    notes: ""
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [recentCertificates, setRecentCertificates] = useState<CertificateGeneration[]>([]);

  // Certificate types with descriptions
  const certificateTypes = [
    {
      value: "SD",
      label: "Sustainability Declaration (SD)",
      description: "Customer sustainability declaration",
      color: "emerald"
    },
    {
      value: "POS",
      label: "Proof of Sustainability (PoS)",
      description: "Sustainability proof certificate",
      color: "green"
    },
    {
      value: "CARRY_FORWARD",
      label: "Carry-Forward Report",
      description: "Certification pool carry-forward report",
      color: "blue"
    },
    {
      value: "GHG_COMPLIANCE",
      label: "GHG Compliance Report",
      description: "Greenhouse gas compliance report",
      color: "purple"
    },
    {
      value: "CARBON_INTENSITY",
      label: "Carbon Intensity Certificate",
      description: "Carbon intensity certificate",
      color: "teal"
    },
    {
      value: "APS_AUDIT_PACK",
      label: "APS v5.0 Audit Pack",
      description: "ISCC+ audit evidence package",
      color: "orange"
    },
    {
      value: "ESG_REPORT",
      label: "ESG/CSRD Report",
      description: "ESG/CSRD report package",
      color: "cyan"
    }
  ];

  // Handle form input changes
  const handleInputChange = (field: keyof CertificateFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate certificate
  const generateCertificate = async () => {
    if (!formData.certificateType || !formData.periodStart || !formData.periodEnd) {
      alert("Please fill in required fields");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate certificate generation process
      const steps = [
        { progress: 20, message: "Collecting mass balance data..." },
        { progress: 40, message: "Validating pool consistency..." },
        { progress: 60, message: "Calculating emission data..." },
        { progress: 80, message: "Generating certificate..." },
        { progress: 100, message: "Complete!" }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setGenerationProgress(step.progress);
      }

      // Create certificate request
      const certificateRequest: CertificateGeneration = {
        id: `cert_${Date.now()}`,
        certificateType: formData.certificateType as any,
        period: {
          startDate: new Date(formData.periodStart),
          endDate: new Date(formData.periodEnd)
        },
        status: 'COMPLETED',
        generatedAt: new Date(),
        filePath: `/certificates/${formData.certificateType}_${Date.now()}.pdf`,
        checksum: `sha256_${Math.random().toString(36).substr(2, 9)}`,
        requestId: `req_${Date.now()}`,
        requestedBy: "current_user",
        parameters: {
          customerName: formData.customerName,
          orderNumber: formData.orderNumber,
          notes: formData.notes
        }
      };

      // Add to recent certificates
      setRecentCertificates(prev => [certificateRequest, ...prev.slice(0, 9)]);

      // Reset form
      setFormData({
        certificateType: "",
        periodStart: "",
        periodEnd: "",
        customerName: "",
        orderNumber: "",
        notes: ""
      });

      alert("Certificate generated successfully!");
    } catch (error) {
      console.error("Certificate generation failed:", error);
      alert("Certificate generation failed.");
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  // Download certificate
  const downloadCertificate = (certificate: CertificateGeneration) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = certificate.filePath!;
    link.download = `${certificate.certificateType}_${certificate.period.startDate.toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get status icon
  const getStatusIcon = (status: CertificateGeneration['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'GENERATING':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'FAILED':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">ISCC+ Certificate Generator</h1>
          <p className="text-muted-foreground">Automated certificate generation system based on mass balance ledger</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2 self-start sm:self-auto">
          IMBL System
        </Badge>
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">Generate Certificate</TabsTrigger>
          <TabsTrigger value="history">Generation History</TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Generate New Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="certificateType">Certificate Type *</Label>
                    <Select value={formData.certificateType} onValueChange={(value) => handleInputChange('certificateType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select certificate type" />
                      </SelectTrigger>
                      <SelectContent>
                        {certificateTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{type.label}</span>
                              <span className="text-xs text-muted-foreground">{type.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="periodStart">Start Date *</Label>
                      <Input
                        id="periodStart"
                        type="date"
                        value={formData.periodStart}
                        onChange={(e) => handleInputChange('periodStart', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="periodEnd">End Date *</Label>
                      <Input
                        id="periodEnd"
                        type="date"
                        value={formData.periodEnd}
                        onChange={(e) => handleInputChange('periodEnd', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customerName">Customer Name (Optional)</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="orderNumber">Order Number (Optional)</Label>
                    <Input
                      id="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                      placeholder="Enter order number"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Enter additional notes or requirements"
                      rows={6}
                    />
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Certificate Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Time:</span>
                        <span>2-5 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format:</span>
                        <span>PDF (A4)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Validation:</span>
                        <span>IMBL Blockchain Verified</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Retention:</span>
                        <span>10 years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isGenerating && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Generating Certificate...</span>
                    <span className="text-sm text-muted-foreground">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={generateCertificate}
                  disabled={isGenerating || !formData.certificateType || !formData.periodStart || !formData.periodEnd}
                  className="flex-1"
                >
                  <Award className="h-4 w-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate Certificate'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      certificateType: "",
                      periodStart: "",
                      periodEnd: "",
                      customerName: "",
                      orderNumber: "",
                      notes: ""
                    });
                  }}
                  disabled={isGenerating}
                >
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Certificate Generation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentCertificates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No certificates generated yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCertificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(certificate.status)}
                        <div>
                          <p className="font-medium">
                            {certificate.certificateType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {certificate.period.startDate.toLocaleDateString()} - {certificate.period.endDate.toLocaleDateString()}
                          </p>
                          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                            <span>Generated: {certificate.generatedAt.toLocaleString()}</span>
                            <span>Request ID: {certificate.requestId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={certificate.status === 'COMPLETED' ? 'default' : 'secondary'}>
                          {certificate.status}
                        </Badge>
                        {certificate.status === 'COMPLETED' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadCertificate(certificate)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificateGenerator;