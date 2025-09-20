import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  BarChart3,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  Target,
  Zap,
  Eye,
  Edit
} from "lucide-react";

interface QualityTest {
  id: string;
  batchId: string;
  materialName: string;
  testName: string;
  standard: string;
  testDate: string;
  result: "pass" | "fail" | "warning";
  value: number;
  specification: {
    min: number;
    max: number;
    unit: string;
  };
  testedBy: string;
  status: "completed" | "pending" | "in-progress";
  remarks: string;
}

interface QualityStandard {
  id: string;
  name: string;
  category: string;
  version: string;
  lastUpdated: string;
  status: "active" | "draft" | "archived";
  complianceRate: number;
  relatedTests: number;
}

const QualityManagement = () => {
  const [tests] = useState<QualityTest[]>([
    {
      id: "QT-001",
      batchId: "BM-20250920-001",
      materialName: "Carbon Fiber Composite",
      testName: "Mechanical Strength",
      standard: "ISO 527-2",
      testDate: "2025-09-20",
      result: "pass",
      value: 850,
      specification: { min: 700, max: 900, unit: "MPa" },
      testedBy: "Dr. Sarah Johnson",
      status: "completed",
      remarks: "Excellent mechanical properties, exceeds minimum requirements by 21%"
    },
    {
      id: "QT-002",
      batchId: "BM-20250920-002",
      materialName: "Bio-based Polymer",
      testName: "Biodegradation Rate",
      standard: "ISO 14855",
      testDate: "2025-09-19",
      result: "warning",
      value: 45,
      specification: { min: 60, max: 90, unit: "%" },
      testedBy: "Dr. Michael Chen",
      status: "completed",
      remarks: "Below target range, requires investigation"
    },
    {
      id: "QT-003",
      batchId: "BM-20250920-003",
      materialName: "Recycled PET",
      testName: "Contaminant Analysis",
      standard: "FDA 21 CFR 177.1520",
      testDate: "2025-09-21",
      result: "fail",
      value: 15,
      specification: { min: 0, max: 5, unit: "ppm" },
      testedBy: "Dr. Emily Rodriguez",
      status: "completed",
      remarks: "Contaminant levels exceed specification, batch rejected"
    },
    {
      id: "QT-004",
      batchId: "BM-20250920-004",
      materialName: "Carbon Fiber Composite",
      testName: "Thermal Stability",
      standard: "ASTM E1131",
      testDate: "2025-09-21",
      result: "pending",
      value: 0,
      specification: { min: 200, max: 300, unit: "°C" },
      testedBy: "Lab Technician",
      status: "in-progress",
      remarks: "Test in progress, expected completion by 16:00"
    }
  ]);

  const [standards] = useState<QualityStandard[]>([
    {
      id: "QS-001",
      name: "ISCC PLUS Certification Requirements",
      category: "Sustainability",
      version: "v2.3",
      lastUpdated: "2025-09-01",
      status: "active",
      complianceRate: 94,
      relatedTests: 15
    },
    {
      id: "QS-002",
      name: "Carbon Fiber Composite Specifications",
      category: "Materials",
      version: "v3.1",
      lastUpdated: "2025-08-15",
      status: "active",
      complianceRate: 88,
      relatedTests: 8
    },
    {
      id: "QS-003",
      name: "Bio-based Material Testing Protocol",
      category: "Biomaterials",
      version: "v1.5",
      lastUpdated: "2025-09-10",
      status: "draft",
      complianceRate: 76,
      relatedTests: 12
    }
  ]);

  const qualityStats = {
    totalTests: 234,
    passedTests: 189,
    failedTests: 18,
    warningTests: 27,
    passRate: 80.8,
    complianceRate: 86.5,
    activeStandards: 8,
    pendingTests: 5
  };

  const getTestResultBadge = (result: string) => {
    switch (result) {
      case "pass":
        return <Badge className="bg-green-100 text-green-800">Pass</Badge>;
      case "fail":
        return <Badge className="bg-red-100 text-red-800">Fail</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStandardStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quality Management System</h1>
            <p className="text-gray-600 mt-2">Quality control and compliance monitoring</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Run Test
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </div>
        </div>

        {/* Quality Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold">{qualityStats.totalTests}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                  <p className="text-2xl font-bold text-green-600">{qualityStats.passRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{qualityStats.complianceRate}%</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Standards</p>
                  <p className="text-2xl font-bold">{qualityStats.activeStandards}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quality Standards Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Standards Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {standards.map((standard) => (
                <Card key={standard.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{standard.name}</h3>
                        <p className="text-sm text-gray-600">{standard.category} • {standard.version}</p>
                        <div className="mt-2">{getStandardStatusBadge(standard.status)}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Compliance Rate</span>
                        <div className="flex items-center gap-2">
                          <Progress value={standard.complianceRate} className="h-2 w-16" />
                          <span className="font-medium">{standard.complianceRate}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Related Tests</span>
                        <span>{standard.relatedTests}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Updated</span>
                        <span>{standard.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tests.map((test) => (
                <div key={test.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Test Information */}
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{test.testName}</h3>
                          <p className="text-sm text-gray-600">Batch: {test.batchId} • {test.materialName}</p>
                          <div className="mt-2">{getTestResultBadge(test.result)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(test.status)}
                          <span className="text-sm text-gray-600">{test.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Standard:</span> {test.standard} •
                        <span className="font-medium"> Tested by:</span> {test.testedBy}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{test.remarks}</p>
                    </div>

                    {/* Test Results */}
                    <div>
                      <h4 className="font-medium mb-2">Test Results</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Actual Value:</span>
                          <span className="font-medium">{test.value} {test.specification.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Specification:</span>
                          <span>{test.specification.min} - {test.specification.max} {test.specification.unit}</span>
                        </div>
                        {test.result === "pass" && (
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4" />
                            Within specification
                          </div>
                        )}
                        {test.result === "fail" && (
                          <div className="flex items-center gap-2 text-red-600 text-sm">
                            <TrendingDown className="h-4 w-4" />
                            Outside specification limits
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-end">
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {test.testDate}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {test.status !== "completed" && (
                          <Button size="sm" variant="outline" className="w-full">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Test
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-medium mb-2">Test Results by Category</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Passed Tests
                    </span>
                    <span>{qualityStats.passedTests} ({qualityStats.passRate}%)</span>
                  </div>
                  <Progress value={qualityStats.passRate} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      Warnings
                    </span>
                    <span>{qualityStats.warningTests}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      Failed Tests
                    </span>
                    <span>{qualityStats.failedTests}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Test Types Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mechanical Tests</span>
                    <span>85 (36%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Chemical Analysis</span>
                    <span>72 (31%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Thermal Tests</span>
                    <span>42 (18%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Other Tests</span>
                    <span>35 (15%)</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Laboratory Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Test Duration</span>
                    <span>2.3 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Lab Utilization</span>
                    <span>78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Equipment Uptime</span>
                    <span>95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending Tests</span>
                    <span>{qualityStats.pendingTests}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QualityManagement;