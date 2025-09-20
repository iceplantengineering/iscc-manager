import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function DashboardHeader() {
  return (
    <Card className="dashboard-card mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            ISCC+ Certified Biomass & Carbon Credit Management Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time Production Monitoring • Traceability • Certification Management System
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="status-indicator status-active mr-2"></div>
            System Active
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            ISCC+ Certified
          </Badge>
        </div>
      </div>
    </Card>
  );
}