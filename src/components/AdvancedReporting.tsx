import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Filter,
  RefreshCw,
  Settings,
  Eye,
  Share2,
  Database,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Globe,
  Mail,
  Printer,
  FileSpreadsheet,
  FileImage,
  File,
  Zap,
  Target,
  Award,
  Star,
  Users
} from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  format: "pdf" | "excel" | "powerpoint" | "html" | "csv";
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "ad-hoc";
  lastGenerated: string;
  nextGeneration: string;
  status: "active" | "scheduled" | "draft";
  dataSize: string;
  recipients: number;
  createdBy: string;
}

interface ReportSchedule {
  id: string;
  reportId: string;
  reportName: string;
  schedule: string;
  recipients: string[];
  format: string;
  status: "active" | "paused" | "failed";
  nextRun: string;
  lastRun: string;
}

const AdvancedReporting = () => {
  const [reportTemplates] = useState<ReportTemplate[]>([
    {
      id: "RPT-001",
      name: "Monthly Production Dashboard",
      category: "Production",
      description: "Comprehensive monthly production performance report with KPIs and trends",
      format: "pdf",
      frequency: "monthly",
      lastGenerated: "2025-09-01",
      nextGeneration: "2025-10-01",
      status: "active",
      dataSize: "2.4 MB",
      recipients: 8,
      createdBy: "Production Team"
    },
    {
      id: "RPT-002",
      name: "ISCC+ Compliance Summary",
      category: "Compliance",
      description: "Quarterly compliance report for ISCC+ certification requirements",
      format: "pdf",
      frequency: "quarterly",
      lastGenerated: "2025-07-01",
      nextGeneration: "2025-10-01",
      status: "active",
      dataSize: "1.8 MB",
      recipients: 12,
      createdBy: "Compliance Manager"
    },
    {
      id: "RPT-003",
      name: "Supplier Performance Analysis",
      category: "Supplier",
      description: "Monthly supplier performance metrics and sustainability ratings",
      format: "excel",
      frequency: "monthly",
      lastGenerated: "2025-09-15",
      nextGeneration: "2025-10-15",
      status: "active",
      dataSize: "3.1 MB",
      recipients: 6,
      createdBy: "Procurement Team"
    },
    {
      id: "RPT-004",
      name: "Carbon Footprint Annual Report",
      category: "Sustainability",
      description: "Annual carbon footprint analysis and sustainability progress report",
      format: "powerpoint",
      frequency: "yearly",
      lastGenerated: "2025-01-15",
      nextGeneration: "2026-01-15",
      status: "scheduled",
      dataSize: "5.2 MB",
      recipients: 15,
      createdBy: "Sustainability Team"
    },
    {
      id: "RPT-005",
      name: "Quality Control Daily Report",
      category: "Quality",
      description: "Daily quality testing results and compliance status",
      format: "html",
      frequency: "daily",
      lastGenerated: "2025-09-20",
      nextGeneration: "2025-09-21",
      status: "active",
      dataSize: "450 KB",
      recipients: 4,
      createdBy: "Quality Manager"
    }
  ]);

  const [scheduledReports] = useState<ReportSchedule[]>([
    {
      id: "SCHED-001",
      reportId: "RPT-001",
      reportName: "Monthly Production Dashboard",
      schedule: "Every 1st of the month at 08:00",
      recipients: ["production@company.com", "management@company.com"],
      format: "PDF",
      status: "active",
      nextRun: "2025-10-01 08:00",
      lastRun: "2025-09-01 08:00"
    },
    {
      id: "SCHED-002",
      reportId: "RPT-002",
      reportName: "ISCC+ Compliance Summary",
      schedule: "Every quarter on the 1st day at 10:00",
      recipients: ["compliance@company.com", "auditors@company.com"],
      format: "PDF",
      status: "active",
      nextRun: "2025-10-01 10:00",
      lastRun: "2025-07-01 10:00"
    }
  ]);

  const reportStats = {
    totalReports: 45,
    activeReports: 32,
    scheduledReports: 12,
    totalRecipients: 156,
    monthlyReports: 18,
    quarterlyReports: 8,
    annualReports: 3,
    avgFileSize: "2.3 MB",
    dataProcessed: "245 GB"
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf": return <FileText className="h-5 w-5 text-red-600" />;
      case "excel": return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case "powerpoint": return <FileImage className="h-5 w-5 text-orange-600" />;
      case "html": return <Globe className="h-5 w-5 text-blue-600" />;
      case "csv": return <File className="h-5 w-5 text-gray-600" />;
      default: return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getFrequencyBadge = (frequency: string) => {
    switch (frequency) {
      case "daily": return <Badge className="bg-blue-100 text-blue-800">Daily</Badge>;
      case "weekly": return <Badge className="bg-purple-100 text-purple-800">Weekly</Badge>;
      case "monthly": return <Badge className="bg-green-100 text-green-800">Monthly</Badge>;
      case "quarterly": return <Badge className="bg-yellow-100 text-yellow-800">Quarterly</Badge>;
      case "yearly": return <Badge className="bg-red-100 text-red-800">Yearly</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Ad-hoc</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "scheduled": return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "draft": return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "paused": return <Badge className="bg-orange-100 text-orange-800">Paused</Badge>;
      case "failed": return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Reporting & Exports</h1>
            <p className="text-gray-600 mt-2">Comprehensive reporting system with automated scheduling and distribution</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </div>
        </div>

        {/* Reporting Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{reportStats.totalReports}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Reports</p>
                  <p className="text-2xl font-bold text-green-600">{reportStats.activeReports}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{reportStats.scheduledReports}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recipients</p>
                  <p className="text-2xl font-bold">{reportStats.totalRecipients}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Report Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Production</span>
                  <span className="font-medium">15 reports</span>
                </div>
                <Progress value={33} className="h-2" />
                <div className="flex justify-between items-center">
                  <span>Compliance</span>
                  <span className="font-medium">12 reports</span>
                </div>
                <Progress value={27} className="h-2" />
                <div className="flex justify-between items-center">
                  <span>Quality</span>
                  <span className="font-medium">10 reports</span>
                </div>
                <Progress value={22} className="h-2" />
                <div className="flex justify-between items-center">
                  <span>Supplier</span>
                  <span className="font-medium">8 reports</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Frequency Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Monthly</span>
                  <span className="font-medium">{reportStats.monthlyReports} reports</span>
                </div>
                <Progress value={40} className="h-2" />
                <div className="flex justify-between items-center">
                  <span>Quarterly</span>
                  <span className="font-medium">{reportStats.quarterlyReports} reports</span>
                </div>
                <Progress value={18} className="h-2" />
                <div className="flex justify-between items-center">
                  <span>Daily</span>
                  <span className="font-medium">5 reports</span>
                </div>
                <Progress value={11} className="h-2" />
                <div className="flex justify-between items-center">
                  <span>Annual</span>
                  <span className="font-medium">{reportStats.annualReports} reports</span>
                </div>
                <Progress value={7} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Total Data Processed</span>
                  <span className="font-medium">{reportStats.dataProcessed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average File Size</span>
                  <span className="font-medium">{reportStats.avgFileSize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Processing Speed</span>
                  <span className="font-medium">2.3 sec/report</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Success Rate</span>
                  <span className="font-medium text-green-600">99.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Templates</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTemplates.map((report) => (
                <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Report Information */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-3 mb-3">
                        {getFormatIcon(report.format)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{report.name}</h3>
                            {getFrequencyBadge(report.frequency)}
                            {getStatusBadge(report.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Category: {report.category}</span>
                            <span>Size: {report.dataSize}</span>
                            <span>Recipients: {report.recipients}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Schedule Information */}
                    <div>
                      <h4 className="font-medium mb-2">Schedule</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Last Generated:</span>
                          <span className="font-medium">{report.lastGenerated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Generation:</span>
                          <span className="font-medium">{report.nextGeneration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Created by:</span>
                          <span>{report.createdBy}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-end">
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Automated Report Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledReports.map((schedule) => (
                <div key={schedule.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="grid md:grid-cols-4 gap-4">
                    {/* Schedule Information */}
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-3 mb-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{schedule.reportName}</h3>
                            {getStatusBadge(schedule.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{schedule.schedule}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Format: {schedule.format}</span>
                            <span>Recipients: {schedule.recipients.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timing Information */}
                    <div>
                      <h4 className="font-medium mb-2">Schedule Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Next Run:</span>
                          <span className="font-medium">{schedule.nextRun}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Run:</span>
                          <span className="font-medium">{schedule.lastRun}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recipients:</span>
                          <span>{schedule.recipients.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-end">
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Run Now
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options & Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg hover:bg-gray-50">
                <FileText className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">PDF Reports</h3>
                <p className="text-sm text-gray-600">Professional formatted reports with charts and tables</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Export PDF
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-gray-50">
                <FileSpreadsheet className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Excel Files</h3>
                <p className="text-sm text-gray-600">Raw data with formulas and pivot tables</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Export Excel
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-gray-50">
                <FileImage className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">PowerPoint</h3>
                <p className="text-sm text-gray-600">Executive presentations with visual analytics</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Export PPT
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-gray-50">
                <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Raw Data</h3>
                <p className="text-sm text-gray-600">CSV/JSON for custom analysis and integration</p>
                <Button size="sm" variant="outline" className="mt-2">
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedReporting;