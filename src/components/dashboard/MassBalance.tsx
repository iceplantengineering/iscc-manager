import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Scale, Recycle } from "lucide-react";

interface MassBalanceData {
  petroleumProducts: number;
  biomassProducts: number;
  totalProducts: number;
  creditBalance: number;
  creditUsed: number;
  allocatedLots: string[];
}

interface MassBalanceProps {
  data: MassBalanceData;
}

const COLORS = ['hsl(var(--chart-4))', 'hsl(var(--chart-2))'];

export function MassBalance({ data }: MassBalanceProps) {
  const { petroleumProducts, biomassProducts, totalProducts, creditBalance, creditUsed, allocatedLots } = data;

  const pieData = [
    { name: '100% Petroleum Products', value: petroleumProducts, color: COLORS[0] },
    { name: 'Biomass Products', value: biomassProducts, color: COLORS[1] }
  ];

  const barData = [
    {
      name: 'Product Allocation',
      petroleum: petroleumProducts,
      biomass: biomassProducts
    }
  ];

  const creditUtilization = (creditUsed / (creditBalance + creditUsed)) * 100;

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center text-primary">
          <Scale className="mr-2 h-5 w-5" />
          Mass Balance Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Product Allocation Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Petroleum Products</p>
                <p className="text-2xl font-bold text-gray-700">{petroleumProducts} units</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Scale className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Biomass Products</p>
                <p className="text-2xl font-bold text-green-600">{biomassProducts} units</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Recycle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-primary">{totalProducts} units</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Scale className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Allocation Ratio</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Quantity Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="petroleum" fill={COLORS[0]} name="Petroleum Products" />
                  <Bar dataKey="biomass" fill={COLORS[1]} name="Biomass Products" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Credit Utilization Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Credit Utilization Status</h3>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Balance: {creditBalance}kg
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Progress value={creditUtilization} className="h-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Used: {creditUsed}kg</span>
              <span>Utilization: {creditUtilization.toFixed(1)}%</span>
              <span>Total: {creditBalance + creditUsed}kg</span>
            </div>
          </div>
        </div>

        {/* Allocated Lots */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Biomass Product Allocated Lots</h3>
          <div className="flex flex-wrap gap-2">
            {allocatedLots.map((lot, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {lot}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}