import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  FileText,
  Calendar,
  MapPin,
  Leaf,
  BarChart3,
  TrendingUp,
  Users,
  Certificate,
  Hash
} from "lucide-react";
import ISCCCertification from "@/components/dashboard/ISCCCertification";
import CertificateGenerator from "@/components/dashboard/CertificateGenerator";

const CertificationPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Certification statistics
  const certificationStats = {
    totalCertificates: 24,
    activeCertificates: 18,
    expiredCertificates: 3,
    pendingRenewals: 3,
    complianceRate: 94.5
  };

  // Audit trail
  const auditTrail = [
    {
      id: 1,
      action: "Certificate Verified",
      certificateId: "CERT-001",
      timestamp: "2025-09-20 10:30:00",
      user: "John Smith",
      status: "success"
    },
    {
      id: 2,
      action: "Feedstock Validated",
      certificateId: "FS-002",
      timestamp: "2025-09-20 09:15:00",
      user: "Sarah Johnson",
      status: "success"
    },
    {
      id: 3,
      action: "Report Generated",
      certificateId: "MONTHLY-001",
      timestamp: "2025-09-19 16:00:00",
      user: "System",
      status: "success"
    },
    {
      id: 4,
      action: "Compliance Check Failed",
      certificateId: "CERT-008",
      timestamp: "2025-09-19 14:30:00",
      user: "Mike Wilson",
      status: "warning"
    }
  ];

  // Upcoming audits
  const upcomingAudits = [
    {
      id: "AUDIT-001",
      type: "Internal Audit",
      date: "2025-09-25",
      scope: "Mass Balance Verification",
      auditor: "Internal Team",
      status: "scheduled"
    },
    {
      id: "AUDIT-002",
      type: "External Audit",
      date: "2025-10-15",
      scope: "ISCC+ Certification Renewal",
      auditor: "ISCC Auditor",
      status: "confirmed"
    },
    {
      id: "AUDIT-003",
      type: "Supplier Audit",
      date: "2025-11-01",
      scope: "Supply Chain Verification",
      auditor: "Third Party",
      status: "pending"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAuditStatusBadge = (status: string) => {
    const variants = {
      scheduled: "secondary",
      confirmed: "default",
      pending: "outline",
      completed: "default"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ISCC+ Certification Management</h1>
            <p className="text-gray-600 mt-2">Manage sustainability certificates and compliance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Link to="/certificate-generator">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Certificate
              </Button>
            </Link>
          </div>
        </div>

        {/* Certification Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-bold">{certificationStats.totalCertificates}</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{certificationStats.activeCertificates}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expired</p>
                  <p className="text-2xl font-bold">{certificationStats.expiredCertificates}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Renewal</p>
                  <p className="text-2xl font-bold">{certificationStats.pendingRenewals}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold">{certificationStats.complianceRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Audit Trail */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Audit Trail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditTrail.map((audit) => (
                      <div key={audit.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        {getStatusIcon(audit.status)}
                        <div className="flex-1">
                          <p className="font-medium">{audit.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {audit.certificateId} • {audit.timestamp}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">{audit.user}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Audits */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Audits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingAudits.map((audit) => (
                      <div key={audit.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{audit.type}</p>
                          <p className="text-sm text-muted-foreground">{audit.scope}</p>
                          <p className="text-sm text-muted-foreground">
                            {audit.date} • {audit.auditor}
                          </p>
                        </div>
                        {getAuditStatusBadge(audit.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">ISCC+ Compliance</span>
                      <Badge variant="default">94%</Badge>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mass Balance Method</span>
                      <Badge variant="default">98%</Badge>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Documentation</span>
                      <Badge variant="default">92%</Badge>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Traceability</span>
                      <Badge variant="default">96%</Badge>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <ISCCCertification />
          </TabsContent>

          <TabsContent value="generator" className="space-y-6">
            <CertificateGenerator />
          </TabsContent>

          <TabsContent value="audits" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Audit Completion Rate</span>
                      <span className="font-bold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Findings Resolution</span>
                      <span className="font-bold">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Audit Duration</span>
                      <span className="font-bold">3.2 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audit Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Internal Audit</p>
                          <p className="text-sm text-muted-foreground">Mass Balance Verification</p>
                          <p className="text-sm text-blue-600">Sept 25, 2025</p>
                        </div>
                        <Badge variant="secondary">Scheduled</Badge>
                      </div>
                    </div>
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">External Audit</p>
                          <p className="text-sm text-muted-foreground">ISCC+ Certification Renewal</p>
                          <p className="text-sm text-green-600">Oct 15, 2025</p>
                        </div>
                        <Badge variant="default">Confirmed</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Audit Findings & Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-800">Open Findings</h4>
                      <p className="text-2xl font-bold text-yellow-600">3</p>
                      <p className="text-sm text-yellow-700">Requiring attention</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800">Resolved This Month</h4>
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-sm text-green-700">Successfully addressed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CertificationPage;