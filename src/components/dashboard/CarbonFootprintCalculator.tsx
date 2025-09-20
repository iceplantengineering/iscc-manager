import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Leaf,
  Factory,
  Truck,
  Zap,
  Droplet,
  Wind
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface CarbonFactor {
  category: string;
  subcategory: string;
  factor: number;
  unit: string;
  source: string;
}

interface ProcessData {
  id: string;
  processName: string;
  energyConsumption: number;
  utilityUsage: {
    water: number;
    steam: number;
    electricity: number;
  };
  emissions: {
    co2Equivalent: number;
    otherGases: Record<string, number>;
  };
  materialConsumption: number;
  outputQuantity: number;
}

interface CarbonFootprintResult {
  totalFootprint: number;
  breakdown: {
    materials: number;
    energy: number;
    transportation: number;
    waste: number;
    other: number;
  };
  intensity: number;
  reductionPotential: number;
  recommendations: string[];
}

const CarbonFootprintCalculator = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('month');
  const [calculationResults, setCalculationResults] = useState<CarbonFootprintResult | null>(null);

  // Carbon emission factors database
  const carbonFactors: CarbonFactor[] = [
    { category: 'Materials', subcategory: 'Plant-based Resin', factor: 1.8, unit: 'kg CO2e/kg', source: 'ISCC Database' },
    { category: 'Materials', subcategory: 'Petroleum-based Resin', factor: 3.2, unit: 'kg CO2e/kg', source: 'EPA Database' },
    { category: 'Materials', subcategory: 'Recycled Carbon Fiber', factor: 2.1, unit: 'kg CO2e/kg', source: 'Industry Standard' },
    { category: 'Energy', subcategory: 'Electricity (Grid)', factor: 0.5, unit: 'kg CO2e/kWh', source: 'Regional Grid' },
    { category: 'Energy', subcategory: 'Natural Gas', factor: 2.3, unit: 'kg CO2e/m3', source: 'IPCC Guidelines' },
    { category: 'Energy', subcategory: 'Steam', factor: 0.9, unit: 'kg CO2e/kg', source: 'Plant Data' },
    { category: 'Transportation', subcategory: 'Truck (Diesel)', factor: 2.7, unit: 'kg CO2e/kg-km', source: 'GLEC Framework' },
    { category: 'Transportation', subcategory: 'Rail', factor: 0.04, unit: 'kg CO2e/ton-km', source: 'EPA' },
    { category: 'Utilities', subcategory: 'Water', factor: 0.3, unit: 'kg CO2e/m3', source: 'Industry Average' },
    { category: 'Utilities', subcategory: 'Wastewater Treatment', factor: 0.8, unit: 'kg CO2e/m3', source: 'Treatment Plant' }
  ];

  // Sample process data
  const processData: ProcessData[] = [
    {
      id: 'P-001',
      processName: 'Carbon Fiber Production',
      energyConsumption: 450,
      utilityUsage: { water: 120, steam: 80, electricity: 250 },
      emissions: { co2Equivalent: 890, otherGases: { CH4: 12, N2O: 2.5 } },
      materialConsumption: 1000,
      outputQuantity: 850
    },
    {
      id: 'P-002',
      processName: 'Composite Manufacturing',
      energyConsumption: 320,
      utilityUsage: { water: 85, steam: 60, electricity: 175 },
      emissions: { co2Equivalent: 620, otherGases: { CH4: 8, N2O: 1.8 } },
      materialConsumption: 1200,
      outputQuantity: 980
    },
    {
      id: 'P-003',
      processName: 'Finishing & Packaging',
      energyConsumption: 180,
      utilityUsage: { water: 45, steam: 30, electricity: 105 },
      emissions: { co2Equivalent: 340, otherGases: { CH4: 4, N2O: 0.9 } },
      materialConsumption: 980,
      outputQuantity: 950
    }
  ];

  // Chart data
  const monthlyTrendData = [
    { month: 'Jan', footprint: 2850, target: 3000, biomass: 45 },
    { month: 'Feb', footprint: 2720, target: 3000, biomass: 48 },
    { month: 'Mar', footprint: 2680, target: 3000, biomass: 52 },
    { month: 'Apr', footprint: 2590, target: 3000, biomass: 55 },
    { month: 'May', footprint: 2450, target: 3000, biomass: 58 },
    { month: 'Jun', footprint: 2380, target: 3000, biomass: 62 },
    { month: 'Jul', footprint: 2320, target: 3000, biomass: 65 },
    { month: 'Aug', footprint: 2280, target: 3000, biomass: 68 },
    { month: 'Sep', footprint: 2240, target: 3000, biomass: 70 }
  ];

  const emissionBreakdownData = [
    { name: 'Materials', value: 35, color: '#8884d8' },
    { name: 'Energy', value: 28, color: '#82ca9d' },
    { name: 'Transportation', value: 18, color: '#ffc658' },
    { name: 'Waste', value: 12, color: '#ff7c7c' },
    { name: 'Other', value: 7, color: '#8dd1e1' }
  ];

  const calculateCarbonFootprint = (processId: string): CarbonFootprintResult => {
    const process = processData.find(p => p.id === processId);
    if (!process) return {
      totalFootprint: 0,
      breakdown: { materials: 0, energy: 0, transportation: 0, waste: 0, other: 0 },
      intensity: 0,
      reductionPotential: 0,
      recommendations: []
    };

    const materials = process.materialConsumption * 2.5; // Average factor
    const energy = process.energyConsumption * 0.6;
    const transportation = (process.materialConsumption + process.outputQuantity) * 0.15;
    const waste = (process.materialConsumption - process.outputQuantity) * 1.2;
    const other = process.emissions.co2Equivalent * 0.1;

    const total = materials + energy + transportation + waste + other;
    const intensity = total / process.outputQuantity;

    return {
      totalFootprint: Math.round(total),
      breakdown: {
        materials: Math.round(materials),
        energy: Math.round(energy),
        transportation: Math.round(transportation),
        waste: Math.round(waste),
        other: Math.round(other)
      },
      intensity: Math.round(intensity * 100) / 100,
      reductionPotential: Math.round(total * 0.15),
      recommendations: [
        'Increase biomass content by 10% to reduce materials footprint',
        'Switch to renewable energy sources for 25% energy consumption',
        'Optimize transportation routes to reduce delivery distances',
        'Implement waste recycling program for production residues'
      ]
    };
  };

  const performCalculation = () => {
    if (selectedProcess) {
      const results = calculateCarbonFootprint(selectedProcess);
      setCalculationResults(results);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Carbon Footprint Calculator</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="timeRange" className="text-sm">Time Range:</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="factors">Emission Factors</TabsTrigger>
          <TabsTrigger value="reduction">Reduction Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Process Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="process">Select Process</Label>
                  <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a process" />
                    </SelectTrigger>
                    <SelectContent>
                      {processData.map((process) => (
                        <SelectItem key={process.id} value={process.id}>
                          {process.processName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={performCalculation} className="w-full">
                  Calculate Carbon Footprint
                </Button>
              </CardContent>
            </Card>

            {calculationResults && (
              <Card>
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Footprint</span>
                      <Badge variant="outline">{formatNumber(calculationResults.totalFootprint)} kg CO₂e</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Intensity</span>
                      <span>{calculationResults.intensity} kg CO₂e/unit</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Reduction Potential</span>
                      <Badge variant="secondary">{formatNumber(calculationResults.reductionPotential)} kg CO₂e</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {calculationResults && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emission Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={emissionBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {emissionBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detailed Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(calculationResults.breakdown).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize">{key}</span>
                        <span className="font-medium">{formatNumber(value)} kg CO₂e</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="footprint" stroke="#8884d8" name="Actual Footprint" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Reduction Rate</span>
                    </div>
                    <span className="font-medium text-green-600">21.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Biomass Content</span>
                    </div>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Factory className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Process Efficiency</span>
                    </div>
                    <span className="font-medium">88%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>ISCC+ Compliance</span>
                    <Badge variant="default">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Carbon Tax Status</span>
                    <Badge variant="secondary">Below Threshold</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reporting Status</span>
                    <Badge variant="default">Current</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="factors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Emission Factors Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Subcategory</th>
                      <th className="text-right p-2">Factor</th>
                      <th className="text-left p-2">Unit</th>
                      <th className="text-left p-2">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carbonFactors.map((factor, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{factor.category}</td>
                        <td className="p-2">{factor.subcategory}</td>
                        <td className="p-2 text-right">{factor.factor}</td>
                        <td className="p-2">{factor.unit}</td>
                        <td className="p-2">{factor.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reduction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Reduction Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calculationResults?.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{recommendation}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Estimated impact: {Math.round(calculationResults.reductionPotential / 4)} kg CO₂e reduction
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reduction Targets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">2030 Target</span>
                    <span className="text-sm">50% Reduction</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">2025 Target</span>
                    <span className="text-sm">25% Reduction</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarbonFootprintCalculator;