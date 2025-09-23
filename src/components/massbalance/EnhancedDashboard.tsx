import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Plus,
  Minus,
  ArrowRight,
  Activity,
  Database,
  Leaf,
  Factory,
  Package,
  Scale,
  Zap,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { MassBalanceEngine } from '@/lib/massbalance/Engine';
import type {
  MaterialPool,
  LedgerEvent,
  MassBalanceSummary,
  TimeSlice
} from '@/lib/imbl/types';

const EnhancedMassBalanceDashboard = () => {
  const [engine] = useState(() => MassBalanceEngine.getInstance());
  const [summary, setSummary] = useState<MassBalanceSummary | null>(null);
  const [pools, setPools] = useState<MaterialPool[]>([]);
  const [recentMovements, setRecentMovements] = useState<LedgerEvent[]>([]);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form states
  const [movementForm, setMovementForm] = useState({
    type: 'INWARD',
    poolId: '',
    quantity: '',
    source: '',
    destination: '',
    referenceId: ''
  });

  const [transformationForm, setTransformationForm] = useState({
    sourcePoolId: '',
    targetPoolId: '',
    inputQuantity: '',
    yieldFactor: '0.85',
    referenceId: ''
  });

  useEffect(() => {
    refreshDashboard();
    startRealTimeUpdates();
  }, []);

  const refreshDashboard = async () => {
    setIsRefreshing(true);
    try {
      const summaryData = engine.getMassBalanceSummary();
      const poolsData = engine.getPoolStatuses();
      const movementsData = engine.getRecentMovements(20);
      const healthData = engine.getSystemHealth();

      setSummary(summaryData);
      setPools(poolsData);
      setRecentMovements(movementsData);
      setSystemHealth(healthData);
    } catch (error) {
      console.error('Dashboard refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const startRealTimeUpdates = () => {
    setInterval(() => {
      refreshDashboard();
    }, 5000); // Update every 5 seconds
  };

  const handleMovementSubmit = () => {
    try {
      const quantity = parseFloat(movementForm.quantity);
      if (!quantity || quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
      }

      if (movementForm.type === 'INWARD') {
        engine.addMaterialInward(
          movementForm.poolId,
          quantity,
          movementForm.source,
          movementForm.referenceId
        );
      } else {
        engine.addMaterialOutward(
          movementForm.poolId,
          quantity,
          movementForm.destination,
          movementForm.referenceId
        );
      }

      setMovementForm({
        type: 'INWARD',
        poolId: '',
        quantity: '',
        source: '',
        destination: '',
        referenceId: ''
      });

      refreshDashboard();
      alert('Movement processed successfully');
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleTransformationSubmit = () => {
    try {
      const inputQuantity = parseFloat(transformationForm.inputQuantity);
      const yieldFactor = parseFloat(transformationForm.yieldFactor);

      if (!inputQuantity || inputQuantity <= 0) {
        alert('Please enter a valid input quantity');
        return;
      }

      const result = engine.processTransformation(
        transformationForm.sourcePoolId,
        transformationForm.targetPoolId,
        inputQuantity,
        yieldFactor,
        transformationForm.referenceId
      );

      setTransformationForm({
        sourcePoolId: '',
        targetPoolId: '',
        inputQuantity: '',
        yieldFactor: '0.85',
        referenceId: ''
      });

      refreshDashboard();
      alert(`Transformation processed: ${inputQuantity}kg → ${result.outputEvent.quantity}kg`);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':
      case 'VALID':
      case 'COMPLETED':
        return 'text-green-600 bg-green-100';
      case 'WARNING':
        return 'text-yellow-600 bg-yellow-100';
      case 'ERROR':
      case 'INVALID':
      case 'FAILED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY':
      case 'VALID':
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'ERROR':
      case 'INVALID':
      case 'FAILED':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (value: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Mass Balance Engine</h1>
          <p className="text-muted-foreground">
            Real-time pool tracking with advanced calculation logic
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={getStatusColor(systemHealth?.status || 'UNKNOWN')}>
            {getStatusIcon(systemHealth?.status || 'UNKNOWN')}
            {systemHealth?.status || 'Unknown'}
          </Badge>
          <Button onClick={refreshDashboard} disabled={isRefreshing} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sustainable Balance</p>
                <p className="text-2xl font-bold">{formatNumber(summary?.currentSustainableBalance || 0)} kg</p>
                <p className="text-sm text-muted-foreground">
                  {summary?.sustainabilityRatio ? ((summary.sustainabilityRatio * 100).toFixed(1) + '% ratio') : 'N/A'}
                </p>
              </div>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conventional Balance</p>
                <p className="text-2xl font-bold">{formatNumber(summary?.currentConventionalBalance || 0)} kg</p>
                <p className="text-sm text-muted-foreground">
                  {summary?.pools ? summary.pools.length + ' pools' : 'N/A'}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Efficiency</p>
                <p className="text-2xl font-bold">{(summary?.efficiency || 0).toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-sm text-muted-foreground">
                    {(summary?.carbonReduction || 0).toFixed(1)}% CO₂ reduction
                  </span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{formatNumber(systemHealth?.totalEvents || 0)}</p>
                <p className="text-sm text-muted-foreground">
                  {systemHealth?.validationErrors?.length || 0} issues
                </p>
              </div>
              <Database className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pools">Pool Management</TabsTrigger>
          <TabsTrigger value="movements">Material Movements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Scale className="h-5 w-5" />
                  Material Pool Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pools.map((pool) => (
                    <div key={pool.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{pool.name}</h4>
                          <p className="text-sm text-muted-foreground">{pool.location}</p>
                        </div>
                        <Badge variant={pool.type === 'SUSTAINABLE' ? 'default' : 'secondary'}>
                          {pool.type}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current Balance:</span>
                          <span className="font-medium">{formatNumber(pool.currentBalance)} {pool.unit}</span>
                        </div>
                        <Progress
                          value={(pool.currentBalance / pool.maximumBalance) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Min: {formatNumber(pool.minimumBalance)}</span>
                          <span>Max: {formatNumber(pool.maximumBalance)}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Value:</span>
                          <span>{formatCurrency(pool.currentBalance * pool.costPerUnit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Carbon Footprint:</span>
                          <span>{pool.carbonFootprint} kg CO₂/kg</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentMovements.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No recent movements</p>
                    </div>
                  ) : (
                    recentMovements.map((movement) => (
                      <div key={movement.eventId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {movement.eventType.includes('INWARD') ? (
                            <Plus className="h-4 w-4 text-green-600" />
                          ) : movement.eventType.includes('OUTWARD') ? (
                            <Minus className="h-4 w-4 text-red-600" />
                          ) : (
                            <Activity className="h-4 w-4 text-blue-600" />
                          )}
                          <div>
                            <p className="font-medium text-sm">
                              {movement.eventType.replace(/_/g, ' ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {movement.source} → {movement.destination}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {movement.timestamp.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium text-sm ${
                            movement.quantity > 0 ? 'text-green-600' : movement.quantity < 0 ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {movement.quantity > 0 ? '+' : ''}{movement.quantity} {movement.unit}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(Math.abs(movement.quantity) * movement.costPerUnit)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pools">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Material Movement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="movementType">Movement Type</Label>
                      <Select
                        value={movementForm.type}
                        onValueChange={(value) => setMovementForm(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INWARD">Inward</SelectItem>
                          <SelectItem value="OUTWARD">Outward</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="poolId">Pool</Label>
                      <Select
                        value={movementForm.poolId}
                        onValueChange={(value) => setMovementForm(prev => ({ ...prev, poolId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pool" />
                        </SelectTrigger>
                        <SelectContent>
                          {pools.map((pool) => (
                            <SelectItem key={pool.id} value={pool.id}>
                              {pool.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={movementForm.quantity}
                      onChange={(e) => setMovementForm(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="Enter quantity"
                    />
                  </div>

                  <div>
                    <Label htmlFor={movementForm.type === 'INWARD' ? 'source' : 'destination'}>
                      {movementForm.type === 'INWARD' ? 'Source' : 'Destination'}
                    </Label>
                    <Input
                      id={movementForm.type === 'INWARD' ? 'source' : 'destination'}
                      value={movementForm.type === 'INWARD' ? movementForm.source : movementForm.destination}
                      onChange={(e) => setMovementForm(prev => ({
                        ...prev,
                        ...(movementForm.type === 'INWARD' ? { source: e.target.value } : { destination: e.target.value })
                      }))}
                      placeholder={`Enter ${movementForm.type === 'INWARD' ? 'source' : 'destination'}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor="referenceId">Reference ID (Optional)</Label>
                    <Input
                      id="referenceId"
                      value={movementForm.referenceId}
                      onChange={(e) => setMovementForm(prev => ({ ...prev, referenceId: e.target.value }))}
                      placeholder="Enter reference ID"
                    />
                  </div>

                  <Button onClick={handleMovementSubmit} className="w-full">
                    Process Movement
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Material Transformation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sourcePool">Source Pool</Label>
                      <Select
                        value={transformationForm.sourcePoolId}
                        onValueChange={(value) => setTransformationForm(prev => ({ ...prev, sourcePoolId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          {pools.filter(p => p.name.includes('PAN')).map((pool) => (
                            <SelectItem key={pool.id} value={pool.id}>
                              {pool.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="targetPool">Target Pool</Label>
                      <Select
                        value={transformationForm.targetPoolId}
                        onValueChange={(value) => setTransformationForm(prev => ({ ...prev, targetPoolId: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                          {pools.filter(p => p.name.includes('Carbon Fiber')).map((pool) => (
                            <SelectItem key={pool.id} value={pool.id}>
                              {pool.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inputQuantity">Input Quantity (kg)</Label>
                      <Input
                        id="inputQuantity"
                        type="number"
                        value={transformationForm.inputQuantity}
                        onChange={(e) => setTransformationForm(prev => ({ ...prev, inputQuantity: e.target.value }))}
                        placeholder="Enter input quantity"
                      />
                    </div>

                    <div>
                      <Label htmlFor="yieldFactor">Yield Factor</Label>
                      <Input
                        id="yieldFactor"
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={transformationForm.yieldFactor}
                        onChange={(e) => setTransformationForm(prev => ({ ...prev, yieldFactor: e.target.value }))}
                        placeholder="0.85"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="transformReference">Reference ID (Optional)</Label>
                    <Input
                      id="transformReference"
                      value={transformationForm.referenceId}
                      onChange={(e) => setTransformationForm(prev => ({ ...prev, referenceId: e.target.value }))}
                      placeholder="Enter reference ID"
                    />
                  </div>

                  <Button onClick={handleTransformationSubmit} className="w-full">
                    Process Transformation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Material Movement History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentMovements.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No movement history available</p>
                  </div>
                ) : (
                  recentMovements.map((movement) => (
                    <div key={movement.eventId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {movement.eventType.includes('INWARD') && (
                          <Plus className="h-5 w-5 text-green-600" />
                        )}
                        {movement.eventType.includes('OUTWARD') && (
                          <Minus className="h-5 w-5 text-red-600" />
                        )}
                        {movement.eventType === 'BATCH_RECON' && (
                          <Activity className="h-5 w-5 text-blue-600" />
                        )}

                        <div>
                          <p className="font-medium">
                            {movement.eventType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {movement.source} → {movement.destination}
                          </p>
                          <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                            <span>{movement.timestamp.toLocaleString()}</span>
                            {movement.referenceId && <span>Ref: {movement.referenceId}</span>}
                            {movement.batchNumber && <span>Batch: {movement.batchNumber}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`font-bold ${
                          movement.quantity > 0 ? 'text-green-600' : movement.quantity < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {movement.quantity > 0 ? '+' : ''}{formatNumber(movement.quantity)} {movement.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(Math.abs(movement.quantity) * movement.costPerUnit)}
                        </p>
                        <Badge
                          variant={movement.qualityStatus === 'CERTIFIED' ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {movement.qualityStatus}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <PieChart className="h-5 w-5" />
                  Material Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pools.map((pool) => {
                    const totalValue = pools.reduce((sum, p) => sum + (p.currentBalance * p.costPerUnit), 0);
                    const poolValue = pool.currentBalance * pool.costPerUnit;
                    const percentage = totalValue > 0 ? (poolValue / totalValue) * 100 : 0;

                    return (
                      <div key={pool.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{pool.name}</span>
                          <span className="text-sm">{formatCurrency(poolValue)}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{percentage.toFixed(1)}% of total</span>
                          <span>{formatNumber(pool.currentBalance)} kg</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <LineChart className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {(summary?.efficiency || 0).toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground">Efficiency</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {(summary?.carbonReduction || 0).toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">System Health</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Events</span>
                        <span className="font-medium">{formatNumber(systemHealth?.totalEvents || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Pools</span>
                        <span className="font-medium">{systemHealth?.activePools || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Validation Errors</span>
                        <span className={`font-medium ${systemHealth?.validationErrors?.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {systemHealth?.validationErrors?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {systemHealth?.validationErrors && systemHealth.validationErrors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-red-600">Validation Issues</h4>
                      <div className="space-y-1">
                        {systemHealth.validationErrors.slice(0, 3).map((error, index) => (
                          <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            {error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedMassBalanceDashboard;