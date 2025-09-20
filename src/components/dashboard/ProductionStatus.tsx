import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Factory, Package, Calendar } from "lucide-react";

interface ProductionLot {
  id: string;
  productType: string;
  quantity: number;
  productionDate: string;
  status: 'active' | 'completed' | 'pending';
}

interface ProductionStatusProps {
  lots: ProductionLot[];
  totalProduction: number;
  availableCredits: number;
}

export function ProductionStatus({ lots, totalProduction, availableCredits }: ProductionStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'In Production';
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <Factory className="mr-2 h-5 w-5" />
          Production Status & Product Characteristics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Production Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Production</p>
                <p className="text-2xl font-bold text-primary">{totalProduction}kg</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Credits</p>
                <p className="text-2xl font-bold text-green-600">{availableCredits}kg</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Production Lot List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Production Lot List</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lot Number</TableHead>
                  <TableHead>Product Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Production Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lots.map((lot) => (
                  <TableRow key={lot.id}>
                    <TableCell className="font-mono text-sm">{lot.id}</TableCell>
                    <TableCell>{lot.productType}</TableCell>
                    <TableCell>{lot.quantity}kg</TableCell>
                    <TableCell>{lot.productionDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(lot.status)}>
                        <div className={`status-indicator mr-2 ${
                          lot.status === 'active' ? 'status-active' : 
                          lot.status === 'pending' ? 'status-warning' : 'bg-blue-500'
                        }`}></div>
                        {getStatusText(lot.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}