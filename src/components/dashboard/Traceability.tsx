import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface ProductTrace {
  lotNumber: string;
  rawMaterials: {
    petroleum: number;
    plant: number;
    biomassRatio: number;
  };
  productionHistory: {
    startTime: string;
    endTime: string;
    line: string;
    operator: string;
  };
  certification: {
    isccStatus: 'certified' | 'pending' | 'expired';
    certificationDate: string;
    validUntil: string;
  };
  sdgsFactors: {
    ghgEmission: number;
    energyConsumption: number;
    waterUsage: number;
  };
}

interface TraceabilityProps {
  traceData: Record<string, ProductTrace>;
}

export function Traceability({ traceData }: TraceabilityProps) {
  const [searchLot, setSearchLot] = useState("");
  const [searchResult, setSearchResult] = useState<ProductTrace | null>(null);
  const [searchError, setSearchError] = useState("");

  const handleSearch = () => {
    setSearchError("");
    if (!searchLot.trim()) {
      setSearchError("Please enter a lot number");
      return;
    }

    const result = traceData[searchLot.trim()];
    if (result) {
      setSearchResult(result);
    } else {
      setSearchResult(null);
      setSearchError("No matching lot number found");
    }
  };

  const getCertificationStatus = (status: string) => {
    switch (status) {
      case 'certified':
        return { color: 'bg-green-50 text-green-700 border-green-200', text: 'Certified', icon: CheckCircle };
      case 'pending':
        return { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', text: 'Under Review', icon: AlertCircle };
      case 'expired':
        return { color: 'bg-red-50 text-red-700 border-red-200', text: 'Expired', icon: AlertCircle };
      default:
        return { color: 'bg-gray-50 text-gray-700 border-gray-200', text: 'Unknown', icon: AlertCircle };
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <FileText className="mr-2 h-5 w-5" />
          Traceability and Certification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Window */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter lot number (e.g., FB-20250910-001)"
              value={searchLot}
              onChange={(e) => setSearchLot(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="px-6">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          {searchError && (
            <div className="text-red-600 text-sm">{searchError}</div>
          )}
        </div>

        {/* Search Results Display */}
        {searchResult && (
          <div className="space-y-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lot Number: {searchLot}</h3>
              <div className="flex items-center space-x-2">
                {(() => {
                  const status = getCertificationStatus(searchResult.certification.isccStatus);
                  const IconComponent = status.icon;
                  return (
                    <Badge variant="outline" className={status.color}>
                      <IconComponent className="h-4 w-4 mr-1" />
                      ISCC+ {status.text}
                    </Badge>
                  );
                })()}
              </div>
            </div>

            {/* Raw Material Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="kpi-card">
                <div>
                  <p className="text-sm text-muted-foreground">Petroleum-based Materials</p>
                  <p className="text-xl font-bold text-gray-700">{searchResult.rawMaterials.petroleum}kg</p>
                </div>
              </div>
              <div className="kpi-card">
                <div>
                  <p className="text-sm text-muted-foreground">Plant-based Materials</p>
                  <p className="text-xl font-bold text-green-600">{searchResult.rawMaterials.plant}kg</p>
                </div>
              </div>
              <div className="kpi-card">
                <div>
                  <p className="text-sm text-muted-foreground">Biomass Ratio</p>
                  <p className="text-xl font-bold text-primary">{searchResult.rawMaterials.biomassRatio}%</p>
                </div>
              </div>
            </div>

            {/* Production History */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold">Production History</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Production Start Time</TableCell>
                    <TableCell>{searchResult.productionHistory.startTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Production End Time</TableCell>
                    <TableCell>{searchResult.productionHistory.endTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Production Line</TableCell>
                    <TableCell>{searchResult.productionHistory.line}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Operator</TableCell>
                    <TableCell>{searchResult.productionHistory.operator}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Certification Information */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold">Certification Information</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Certification Date</TableCell>
                    <TableCell>{searchResult.certification.certificationDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Expiration Date</TableCell>
                    <TableCell>{searchResult.certification.validUntil}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* SDGs Factor */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold">SDGs Factors (Environmental Impact Metrics)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="kpi-card">
                  <div>
                    <p className="text-sm text-muted-foreground">GHG Emissions</p>
                    <p className="text-xl font-bold text-orange-600">{searchResult.sdgsFactors.ghgEmission}kg-CO2</p>
                  </div>
                </div>
                <div className="kpi-card">
                  <div>
                    <p className="text-sm text-muted-foreground">Energy Consumption</p>
                    <p className="text-xl font-bold text-blue-600">{searchResult.sdgsFactors.energyConsumption}kWh</p>
                  </div>
                </div>
                <div className="kpi-card">
                  <div>
                    <p className="text-sm text-muted-foreground">Water Usage</p>
                    <p className="text-xl font-bold text-cyan-600">{searchResult.sdgsFactors.waterUsage}L</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}