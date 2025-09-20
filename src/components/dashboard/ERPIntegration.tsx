import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Server,
  Cloud,
  FileText,
  Users,
  Activity,
  TrendingUp,
  Settings
} from "lucide-react";

interface ERPIntegrationProps {
  data?: any;
}

const ERPIntegration = ({ data }: ERPIntegrationProps) => {
  const [syncStatus, setSyncStatus] = useState({
    lastSync: "2025-09-20 10:45:32",
    nextSync: "2025-09-20 11:00:32",
    isSyncing: false,
    syncProgress: 0
  });

  // ERP System Status
  const erpSystems = [
    {
      name: "SAP S/4HANA",
      status: "connected",
      version: "2023",
      lastSync: "5 min ago",
      dataIntegrity: 99.8,
      modules: ["MM", "SD", "PP", "QM"],
      uptime: "99.9%"
    },
    {
      name: "Oracle NetSuite",
      status: "connected",
      version: "2024.1",
      lastSync: "2 min ago",
      dataIntegrity: 99.5,
      modules: ["Inventory", "Orders", "Financial"],
      uptime: "99.7%"
    },
    {
      name: "Microsoft Dynamics 365",
      status: "warning",
      version: "2024",
      lastSync: "15 min ago",
      dataIntegrity: 97.2,
      modules: ["Finance", "Supply Chain"],
      uptime: "98.5%"
    }
  ];

  // Data Sync Metrics
  const syncMetrics = {
    totalRecords: 12543,
    syncedToday: 1247,
    failedSyncs: 3,
    avgSyncTime: "2.3s",
    dataAccuracy: 99.6
  };

  // Integration Workflows
  const workflows = [
    {
      id: "order-to-cash",
      name: "Order to Cash",
      status: "active",
      description: "End-to-end order processing and billing",
      steps: ["Order Entry", "Inventory Check", "Production", "Shipping", "Invoicing"],
      currentStep: 3,
      efficiency: 94.5,
      dailyVolume: 156
    },
    {
      id: "procure-to-pay",
      name: "Procure to Pay",
      status: "active",
      description: "Purchase order to payment processing",
      steps: ["PO Creation", "Goods Receipt", "Invoice Verification", "Payment"],
      currentStep: 2,
      efficiency: 91.2,
      dailyVolume: 89
    },
    {
      id: "plan-to-produce",
      name: "Plan to Produce",
      status: "active",
      description: "Production planning and execution",
      steps: ["Demand Planning", "MRP", "Production Order", "Execution", "Completion"],
      currentStep: 4,
      efficiency: 88.7,
      dailyVolume: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "bg-green-500";
      case "active": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "error": return "bg-red-500";
      case "disconnected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected": return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "active": return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "warning": return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case "error": return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case "disconnected": return <Badge className="bg-red-100 text-red-800">Disconnected</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const simulateSync = () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true, syncProgress: 0 }));

    const interval = setInterval(() => {
      setSyncStatus(prev => {
        const newProgress = prev.syncProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            isSyncing: false,
            syncProgress: 100,
            lastSync: new Date().toLocaleString(),
            nextSync: new Date(Date.now() + 15 * 60 * 1000).toLocaleString()
          };
        }
        return { ...prev, syncProgress: newProgress };
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* ERP System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">ERP Systems</h3>
          </div>
          <div className="space-y-2">
            {erpSystems.map((system, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{system.name}</span>
                {getStatusBadge(system.status)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Sync Status</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Last Sync</span>
              <span className="font-medium">{syncStatus.lastSync}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Next Sync</span>
              <span className="font-medium">{syncStatus.nextSync}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Records Today</span>
              <span className="font-medium">{syncMetrics.syncedToday}</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-800">Performance</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Data Accuracy</span>
              <span className="font-medium">{syncMetrics.dataAccuracy}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Avg Sync Time</span>
              <span className="font-medium">{syncMetrics.avgSyncTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Failed Syncs</span>
              <span className="font-medium text-red-600">{syncMetrics.failedSyncs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            ERP System Integration Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {erpSystems.map((system, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{system.name}</h3>
                  {getStatusBadge(system.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Version</span>
                    <span>{system.version}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Sync</span>
                    <span>{system.lastSync}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Data Integrity</span>
                    <span className="font-medium">{system.dataIntegrity}%</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium">{system.uptime}</span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Active Modules</p>
                    <div className="flex flex-wrap gap-1">
                      {system.modules.map((module, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Workflows */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Integration Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{workflow.name}</h3>
                    <p className="text-sm text-gray-600">{workflow.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(workflow.status)}
                    <div className="text-right">
                      <p className="text-sm font-medium">{workflow.efficiency}%</p>
                      <p className="text-xs text-gray-600">Efficiency</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Workflow Steps */}
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {workflow.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          idx < workflow.currentStep ? 'bg-green-500 text-white' :
                          idx === workflow.currentStep ? 'bg-blue-500 text-white' :
                          'bg-gray-300 text-gray-600'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className="text-sm whitespace-nowrap">{step}</span>
                        {idx < workflow.steps.length - 1 && (
                          <div className="w-4 h-0.5 bg-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Daily Volume</span>
                    <span className="font-medium">{workflow.dailyVolume} transactions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sync Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            Data Synchronization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Manual Data Sync</p>
                <p className="text-sm text-gray-600">
                  Force synchronization with all ERP systems
                </p>
              </div>
              <Button
                onClick={simulateSync}
                disabled={syncStatus.isSyncing}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {syncStatus.isSyncing ? "Syncing..." : "Sync Now"}
              </Button>
            </div>

            {syncStatus.isSyncing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sync Progress</span>
                  <span>{syncStatus.syncProgress}%</span>
                </div>
                <Progress value={syncStatus.syncProgress} className="h-2" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{syncMetrics.totalRecords}</p>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{syncMetrics.syncedToday}</p>
                <p className="text-sm text-gray-600">Synced Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{syncMetrics.failedSyncs}</p>
                <p className="text-sm text-gray-600">Failed Syncs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{syncMetrics.dataAccuracy}%</p>
                <p className="text-sm text-gray-600">Data Accuracy</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ERPIntegration;