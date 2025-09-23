import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormSection, FormField, FormActions, TagInput, DateTimePicker, NumberInput } from '@/components/common/FormComponents';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, X, Target, Clock, Users, Package, BarChart3, AlertTriangle } from 'lucide-react';

interface MaterialRequirement {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  supplier: string;
}

interface QualityCheck {
  parameter: string;
  specification: string;
  method: string;
  required: boolean;
}

interface ProductionPlanData {
  id?: string;
  planName: string;
  productType: string;
  targetQuantity: number;
  unit: string;
  startDate: string;
  endDate: string;
  productionLine: string;
  shift: string;
  status: 'draft' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  materialRequirements: MaterialRequirement[];
  qualityChecks: QualityCheck[];
  equipmentRequired: string[];
  assignedOperators: string[];
  estimatedCost: number;
  notes: string;
  tags: string[];
}

const ProductionPlanForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ProductionPlanData>({
    planName: '',
    productType: '',
    targetQuantity: 0,
    unit: 'kg',
    startDate: '',
    endDate: '',
    productionLine: '',
    shift: 'day',
    status: 'draft',
    priority: 'medium',
    description: '',
    materialRequirements: [],
    qualityChecks: [],
    equipmentRequired: [],
    assignedOperators: [],
    estimatedCost: 0,
    notes: '',
    tags: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const productTypes = [
    'Carbon Fiber Composite',
    'Biomass Material',
    'Sustainable Plastic',
    'Green Steel',
    'Eco-friendly Concrete'
  ];

  const productionLines = [
    'Line A - Carbon Fiber',
    'Line B - Biomass Processing',
    'Line C - Composite Materials',
    'Line D - Sustainable Packaging'
  ];

  const shifts = [
    { value: 'day', label: 'Day Shift (06:00-18:00)' },
    { value: 'night', label: 'Night Shift (18:00-06:00)' },
    { value: '24h', label: '24 Hour Operation' }
  ];

  const materials = [
    { id: '1', name: 'Petroleum-based Resin', unit: 'kg', supplier: 'ChemCorp' },
    { id: '2', name: 'Carbon Fiber', unit: 'kg', supplier: 'FiberTech' },
    { id: '3', name: 'Biomass Feedstock', unit: 'kg', supplier: 'GreenBio' },
    { id: '4', name: 'Additives', unit: 'L', supplier: 'ChemAdd' }
  ];

  const addMaterialRequirement = () => {
    setFormData(prev => ({
      ...prev,
      materialRequirements: [...prev.materialRequirements, {
        materialId: '',
        materialName: '',
        quantity: 0,
        unit: 'kg',
        supplier: ''
      }]
    }));
  };

  const removeMaterialRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materialRequirements: prev.materialRequirements.filter((_, i) => i !== index)
    }));
  };

  const updateMaterialRequirement = (index: number, field: keyof MaterialRequirement, value: any) => {
    setFormData(prev => ({
      ...prev,
      materialRequirements: prev.materialRequirements.map((req, i) =>
        i === index ? { ...req, [field]: value } : req
      )
    }));
  };

  const addQualityCheck = () => {
    setFormData(prev => ({
      ...prev,
      qualityChecks: [...prev.qualityChecks, {
        parameter: '',
        specification: '',
        method: '',
        required: true
      }]
    }));
  };

  const removeQualityCheck = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualityChecks: prev.qualityChecks.filter((_, i) => i !== index)
    }));
  };

  const updateQualityCheck = (index: number, field: keyof QualityCheck, value: any) => {
    setFormData(prev => ({
      ...prev,
      qualityChecks: prev.qualityChecks.map((check, i) =>
        i === index ? { ...check, [field]: value } : check
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would save to your backend
      console.log('Saving production plan:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      navigate('/production-plan');
    } catch (error) {
      console.error('Error saving production plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      approved: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status.replace('_', ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              {isEditing ? 'Edit Production Plan' : 'New Production Plan'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Modify existing production plan' : 'Create a new production plan'}
            </p>
          </div>
          <div className="flex gap-2">
            {formData.status !== 'draft' && getStatusBadge(formData.status)}
            {getPriorityBadge(formData.priority)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <FormSection title="Basic Information" icon={<Package className="h-5 w-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Plan Name" required>
                <Input
                  value={formData.planName}
                  onChange={(e) => setFormData(prev => ({ ...prev, planName: e.target.value }))}
                  placeholder="Enter plan name"
                />
              </FormField>
              <FormField label="Product Type" required>
                <Select value={formData.productType} onValueChange={(value) => setFormData(prev => ({ ...prev, productType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Target Quantity" required>
                <div className="flex gap-2">
                  <NumberInput
                    value={formData.targetQuantity}
                    onChange={(value) => setFormData(prev => ({ ...prev, targetQuantity: value }))}
                    label=""
                    min={1}
                  />
                  <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="tons">tons</SelectItem>
                      <SelectItem value="units">units</SelectItem>
                      <SelectItem value="liters">liters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormField>
              <FormField label="Production Line" required>
                <Select value={formData.productionLine} onValueChange={(value) => setFormData(prev => ({ ...prev, productionLine: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select production line" />
                  </SelectTrigger>
                  <SelectContent>
                    {productionLines.map(line => (
                      <SelectItem key={line} value={line}>{line}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
            <FormField label="Description">
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the production plan..."
                rows={3}
              />
            </FormField>
          </FormSection>

          {/* Scheduling */}
          <FormSection title="Scheduling" icon={<Clock className="h-5 w-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DateTimePicker
                value={formData.startDate}
                onChange={(value) => setFormData(prev => ({ ...prev, startDate: value }))}
                label="Start Date"
              />
              <DateTimePicker
                value={formData.endDate}
                onChange={(value) => setFormData(prev => ({ ...prev, endDate: value }))}
                label="End Date"
              />
              <FormField label="Shift">
                <Select value={formData.shift} onValueChange={(value) => setFormData(prev => ({ ...prev, shift: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shifts.map(shift => (
                      <SelectItem key={shift.value} value={shift.value}>{shift.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </FormSection>

          {/* Material Requirements */}
          <FormSection title="Material Requirements" icon={<Package className="h-5 w-5" />}>
            <div className="space-y-4">
              {formData.materialRequirements.map((req, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Material {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMaterialRequirement(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <FormField label="Material">
                      <Select
                        value={req.materialId}
                        onValueChange={(value) => {
                          const selected = materials.find(m => m.id === value);
                          updateMaterialRequirement(index, 'materialId', value);
                          updateMaterialRequirement(index, 'materialName', selected?.name || '');
                          updateMaterialRequirement(index, 'unit', selected?.unit || 'kg');
                          updateMaterialRequirement(index, 'supplier', selected?.supplier || '');
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          {materials.map(material => (
                            <SelectItem key={material.id} value={material.id}>
                              {material.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Quantity">
                      <NumberInput
                        value={req.quantity}
                        onChange={(value) => updateMaterialRequirement(index, 'quantity', value)}
                        label=""
                        min={0}
                      />
                    </FormField>
                    <FormField label="Unit">
                      <Input value={req.unit} disabled />
                    </FormField>
                    <FormField label="Supplier">
                      <Input value={req.supplier} disabled />
                    </FormField>
                  </div>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addMaterialRequirement}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Material Requirement
              </Button>
            </div>
          </FormSection>

          {/* Quality Checks */}
          <FormSection title="Quality Checks" icon={<BarChart3 className="h-5 w-5" />}>
            <div className="space-y-4">
              {formData.qualityChecks.map((check, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Quality Check {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeQualityCheck(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField label="Parameter">
                      <Input
                        value={check.parameter}
                        onChange={(e) => updateQualityCheck(index, 'parameter', e.target.value)}
                        placeholder="e.g., Tensile Strength"
                      />
                    </FormField>
                    <FormField label="Specification">
                      <Input
                        value={check.specification}
                        onChange={(e) => updateQualityCheck(index, 'specification', e.target.value)}
                        placeholder="e.g., ≥ 500 MPa"
                      />
                    </FormField>
                    <FormField label="Method">
                      <Input
                        value={check.method}
                        onChange={(e) => updateQualityCheck(index, 'method', e.target.value)}
                        placeholder="e.g., ASTM D638"
                      />
                    </FormField>
                    <FormField label="Required">
                      <Select
                        value={check.required ? 'true' : 'false'}
                        onValueChange={(value) => updateQualityCheck(index, 'required', value === 'true')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Required</SelectItem>
                          <SelectItem value="false">Optional</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addQualityCheck}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Quality Check
              </Button>
            </div>
          </FormSection>

          {/* Additional Settings */}
          <FormSection title="Additional Settings" icon={<Users className="h-5 w-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Priority">
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Estimated Cost">
                <NumberInput
                  value={formData.estimatedCost}
                  onChange={(value) => setFormData(prev => ({ ...prev, estimatedCost: value }))}
                  label=""
                  min={0}
                  unit="$"
                />
              </FormField>
            </div>
            <FormField label="Equipment Required">
              <TagInput
                tags={formData.equipmentRequired}
                onTagsChange={(tags) => setFormData(prev => ({ ...prev, equipmentRequired: tags }))}
                placeholder="Add equipment..."
              />
            </FormField>
            <FormField label="Assigned Operators">
              <TagInput
                tags={formData.assignedOperators}
                onTagsChange={(tags) => setFormData(prev => ({ ...prev, assignedOperators: tags }))}
                placeholder="Add operator name..."
              />
            </FormField>
            <FormField label="Tags">
              <TagInput
                tags={formData.tags}
                onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags: tags }))}
                placeholder="Add tags..."
              />
            </FormField>
            <FormField label="Notes">
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes..."
                rows={3}
              />
            </FormField>
          </FormSection>

          {/* Form Actions */}
          <FormActions
            onCancel={() => navigate('/production-plan')}
            onSave={handleSubmit}
            isSubmitting={isSubmitting}
            saveLabel={isEditing ? 'Update Plan' : 'Create Plan'}
          />
        </form>
      </div>
    </div>
  );
};

export default ProductionPlanForm;