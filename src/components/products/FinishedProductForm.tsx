import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormSection, FormField, FormActions, TagInput, NumberInput } from '@/components/common/FormComponents';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, X, Package, Award, DollarSign, Leaf, FileText, Hash, Globe } from 'lucide-react';

interface CertificateInfo {
  id: string;
  type: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  authority: string;
}

interface SupplyChainInfo {
  supplierId: string;
  supplierName: string;
  materialName: string;
  percentage: number;
  isSustainable: boolean;
  country: string;
}

interface SustainabilityMetrics {
  carbonFootprint: number;
  renewableContent: number;
  recyclability: number;
  energyEfficiency: number;
  waterUsage: number;
}

interface FinishedProductData {
  id?: string;
  productName: string;
  productCode: string;
  category: string;
  description: string;
  specifications: {
    weight: number;
    dimensions: string;
    color: string;
    grade: string;
    shelfLife: string;
  };
  inventory: {
    currentStock: number;
    minimumStock: number;
    maximumStock: number;
    unit: string;
    location: string;
  };
  pricing: {
    unitPrice: number;
    currency: string;
    bulkDiscount: number;
    minimumOrder: number;
  };
  sustainability: SustainabilityMetrics;
  certificates: CertificateInfo[];
  supplyChain: SupplyChainInfo[];
  status: 'active' | 'inactive' | 'discontinued';
  quality: {
    grade: string;
    passRate: number;
    lastInspection: string;
    nextInspection: string;
  };
  regulatory: {
    complianceStatus: string;
    regulations: string[];
    restrictions: string[];
  };
  dppEnabled: boolean;
  dppId?: string;
  tags: string[];
  images: string[];
  documents: string[];
}

const FinishedProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<FinishedProductData>({
    productName: '',
    productCode: '',
    category: '',
    description: '',
    specifications: {
      weight: 0,
      dimensions: '',
      color: '',
      grade: '',
      shelfLife: ''
    },
    inventory: {
      currentStock: 0,
      minimumStock: 0,
      maximumStock: 0,
      unit: 'kg',
      location: ''
    },
    pricing: {
      unitPrice: 0,
      currency: 'USD',
      bulkDiscount: 0,
      minimumOrder: 1
    },
    sustainability: {
      carbonFootprint: 0,
      renewableContent: 0,
      recyclability: 0,
      energyEfficiency: 0,
      waterUsage: 0
    },
    certificates: [],
    supplyChain: [],
    status: 'active',
    quality: {
      grade: '',
      passRate: 0,
      lastInspection: '',
      nextInspection: ''
    },
    regulatory: {
      complianceStatus: '',
      regulations: [],
      restrictions: []
    },
    dppEnabled: false,
    tags: [],
    images: [],
    documents: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const productCategories = [
    'Carbon Fiber Composites',
    'Biomass Materials',
    'Sustainable Packaging',
    'Green Construction',
    'Eco-friendly Textiles',
    'Recycled Products'
  ];

  const certificateTypes = [
    'ISCC PLUS',
    'ISCC EU',
    'FSC',
    'PEFC',
    'ISO 14001',
    'ISO 9001',
    'Global Recycled Standard'
  ];

  const countries = [
    'Japan', 'Germany', 'USA', 'China', 'India', 'Brazil', 'Canada', 'Australia'
  ];

  const addCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, {
        id: '',
        type: '',
        number: '',
        issueDate: '',
        expiryDate: '',
        authority: ''
      }]
    }));
  };

  const removeCertificate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const updateCertificate = (index: number, field: keyof CertificateInfo, value: any) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const addSupplyChainItem = () => {
    setFormData(prev => ({
      ...prev,
      supplyChain: [...prev.supplyChain, {
        supplierId: '',
        supplierName: '',
        materialName: '',
        percentage: 0,
        isSustainable: false,
        country: ''
      }]
    }));
  };

  const removeSupplyChainItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      supplyChain: prev.supplyChain.filter((_, i) => i !== index)
    }));
  };

  const updateSupplyChainItem = (index: number, field: keyof SupplyChainInfo, value: any) => {
    setFormData(prev => ({
      ...prev,
      supplyChain: prev.supplyChain.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Saving finished product:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/finished-products');
    } catch (error) {
      console.error('Error saving finished product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-yellow-100 text-yellow-800',
      discontinued: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8 text-purple-600" />
              {isEditing ? 'Edit Finished Product' : 'New Finished Product'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Modify product information and certificates' : 'Add a new finished product'}
            </p>
          </div>
          {getStatusBadge(formData.status)}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <FormSection title="Basic Information" icon={<Package className="h-5 w-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Product Name" required>
                    <Input
                      value={formData.productName}
                      onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                      placeholder="Enter product name"
                    />
                  </FormField>
                  <FormField label="Product Code" required>
                    <Input
                      value={formData.productCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, productCode: e.target.value }))}
                      placeholder="Enter product code"
                    />
                  </FormField>
                  <FormField label="Category" required>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Status">
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>
                <FormField label="Description">
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the product..."
                    rows={3}
                  />
                </FormField>
              </FormSection>

              <FormSection title="Inventory & Pricing" icon={<DollarSign className="h-5 w-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Inventory Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Current Stock">
                        <NumberInput
                          value={formData.inventory.currentStock}
                          onChange={(value) => setFormData(prev => ({
                            ...prev,
                            inventory: { ...prev.inventory, currentStock: value }
                          }))}
                          label=""
                        />
                      </FormField>
                      <FormField label="Minimum Stock">
                        <NumberInput
                          value={formData.inventory.minimumStock}
                          onChange={(value) => setFormData(prev => ({
                            ...prev,
                            inventory: { ...prev.inventory, minimumStock: value }
                          }))}
                          label=""
                        />
                      </FormField>
                      <FormField label="Maximum Stock">
                        <NumberInput
                          value={formData.inventory.maximumStock}
                          onChange={(value) => setFormData(prev => ({
                            ...prev,
                            inventory: { ...prev.inventory, maximumStock: value }
                          }))}
                          label=""
                        />
                      </FormField>
                      <FormField label="Unit">
                        <Select value={formData.inventory.unit} onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          inventory: { ...prev.inventory, unit: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="tons">tons</SelectItem>
                            <SelectItem value="units">units</SelectItem>
                            <SelectItem value="liters">liters</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                    </div>
                    <FormField label="Storage Location">
                      <Input
                        value={formData.inventory.location}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          inventory: { ...prev.inventory, location: e.target.value }
                        }))}
                        placeholder="e.g., Warehouse A, Section 3"
                      />
                    </FormField>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Pricing Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Unit Price">
                        <NumberInput
                          value={formData.pricing.unitPrice}
                          onChange={(value) => setFormData(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, unitPrice: value }
                          }))}
                          label=""
                          min={0}
                          unit="$"
                        />
                      </FormField>
                      <FormField label="Currency">
                        <Select value={formData.pricing.currency} onValueChange={(value) => setFormData(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, currency: value }
                        }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="JPY">JPY</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Bulk Discount (%)">
                        <NumberInput
                          value={formData.pricing.bulkDiscount}
                          onChange={(value) => setFormData(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, bulkDiscount: value }
                          }))}
                          label=""
                          min={0}
                          max={100}
                        />
                      </FormField>
                      <FormField label="Minimum Order">
                        <NumberInput
                          value={formData.pricing.minimumOrder}
                          onChange={(value) => setFormData(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, minimumOrder: value }
                          }))}
                          label=""
                          min={1}
                        />
                      </FormField>
                    </div>
                  </div>
                </div>
              </FormSection>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-6">
              <FormSection title="Product Specifications" icon={<FileText className="h-5 w-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Weight">
                    <NumberInput
                      value={formData.specifications.weight}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        specifications: { ...prev.specifications, weight: value }
                      }))}
                      label=""
                      min={0}
                      unit="kg"
                    />
                  </FormField>
                  <FormField label="Dimensions">
                    <Input
                      value={formData.specifications.dimensions}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        specifications: { ...prev.specifications, dimensions: e.target.value }
                      }))}
                      placeholder="e.g., 100cm x 50cm x 2cm"
                    />
                  </FormField>
                  <FormField label="Color">
                    <Input
                      value={formData.specifications.color}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        specifications: { ...prev.specifications, color: e.target.value }
                      }))}
                      placeholder="e.g., Natural Black"
                    />
                  </FormField>
                  <FormField label="Grade">
                    <Input
                      value={formData.specifications.grade}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        specifications: { ...prev.specifications, grade: e.target.value }
                      }))}
                      placeholder="e.g., Industrial Grade"
                    />
                  </FormField>
                </div>
                <FormField label="Shelf Life">
                  <Input
                    value={formData.specifications.shelfLife}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      specifications: { ...prev.specifications, shelfLife: e.target.value }
                    }))}
                    placeholder="e.g., 12 months from production date"
                  />
                </FormField>
              </FormSection>

              <FormSection title="Quality Information" icon={<Award className="h-5 w-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Quality Grade">
                    <Input
                      value={formData.quality.grade}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        quality: { ...prev.quality, grade: e.target.value }
                      }))}
                      placeholder="e.g., Grade A"
                    />
                  </FormField>
                  <FormField label="Pass Rate (%)">
                    <NumberInput
                      value={formData.quality.passRate}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        quality: { ...prev.quality, passRate: value }
                      }))}
                      label=""
                      min={0}
                      max={100}
                    />
                  </FormField>
                  <FormField label="Last Inspection">
                    <Input
                      type="date"
                      value={formData.quality.lastInspection}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        quality: { ...prev.quality, lastInspection: e.target.value }
                      }))}
                    />
                  </FormField>
                  <FormField label="Next Inspection">
                    <Input
                      type="date"
                      value={formData.quality.nextInspection}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        quality: { ...prev.quality, nextInspection: e.target.value }
                      }))}
                    />
                  </FormField>
                </div>
              </FormSection>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              <FormSection title="Certificates & Compliance" icon={<Award className="h-5 w-5" />}>
                <div className="space-y-4">
                  {formData.certificates.map((cert, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Certificate {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCertificate(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <FormField label="Certificate Type">
                          <Select
                            value={cert.type}
                            onValueChange={(value) => updateCertificate(index, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {certificateTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormField>
                        <FormField label="Certificate Number">
                          <Input
                            value={cert.number}
                            onChange={(e) => updateCertificate(index, 'number', e.target.value)}
                            placeholder="Certificate number"
                          />
                        </FormField>
                        <FormField label="Authority">
                          <Input
                            value={cert.authority}
                            onChange={(e) => updateCertificate(index, 'authority', e.target.value)}
                            placeholder="Issuing authority"
                          />
                        </FormField>
                        <FormField label="Issue Date">
                          <Input
                            type="date"
                            value={cert.issueDate}
                            onChange={(e) => updateCertificate(index, 'issueDate', e.target.value)}
                          />
                        </FormField>
                        <FormField label="Expiry Date">
                          <Input
                            type="date"
                            value={cert.expiryDate}
                            onChange={(e) => updateCertificate(index, 'expiryDate', e.target.value)}
                          />
                        </FormField>
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCertificate}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certificate
                  </Button>
                </div>

                <FormField label="Digital Product Passport">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.dppEnabled}
                        onChange={(e) => setFormData(prev => ({ ...prev, dppEnabled: e.target.checked }))}
                      />
                      Enable DPP for this product
                    </label>
                    {formData.dppEnabled && (
                      <Input
                        value={formData.dppId || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, dppId: e.target.value }))}
                        placeholder="DPP ID"
                        className="w-48"
                      />
                    )}
                  </div>
                </FormField>
              </FormSection>
            </TabsContent>

            <TabsContent value="sustainability" className="space-y-6">
              <FormSection title="Sustainability Metrics" icon={<Leaf className="h-5 w-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Carbon Footprint (kg CO2e)">
                    <NumberInput
                      value={formData.sustainability.carbonFootprint}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        sustainability: { ...prev.sustainability, carbonFootprint: value }
                      }))}
                      label=""
                      min={0}
                    />
                  </FormField>
                  <FormField label="Renewable Content (%)">
                    <NumberInput
                      value={formData.sustainability.renewableContent}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        sustainability: { ...prev.sustainability, renewableContent: value }
                      }))}
                      label=""
                      min={0}
                      max={100}
                    />
                  </FormField>
                  <FormField label="Recyclability (%)">
                    <NumberInput
                      value={formData.sustainability.recyclability}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        sustainability: { ...prev.sustainability, recyclability: value }
                      }))}
                      label=""
                      min={0}
                      max={100}
                    />
                  </FormField>
                  <FormField label="Energy Efficiency (%)">
                    <NumberInput
                      value={formData.sustainability.energyEfficiency}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        sustainability: { ...prev.sustainability, energyEfficiency: value }
                      }))}
                      label=""
                      min={0}
                      max={100}
                    />
                  </FormField>
                  <FormField label="Water Usage (L per unit)">
                    <NumberInput
                      value={formData.sustainability.waterUsage}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        sustainability: { ...prev.sustainability, waterUsage: value }
                      }))}
                      label=""
                      min={0}
                    />
                  </FormField>
                </div>
              </FormSection>
            </TabsContent>

            <TabsContent value="supply-chain" className="space-y-6">
              <FormSection title="Supply Chain Information" icon={<Globe className="h-5 w-5" />}>
                <div className="space-y-4">
                  {formData.supplyChain.map((item, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Supply Chain Item {index + 1}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSupplyChainItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <FormField label="Supplier Name">
                          <Input
                            value={item.supplierName}
                            onChange={(e) => updateSupplyChainItem(index, 'supplierName', e.target.value)}
                            placeholder="Supplier name"
                          />
                        </FormField>
                        <FormField label="Material">
                          <Input
                            value={item.materialName}
                            onChange={(e) => updateSupplyChainItem(index, 'materialName', e.target.value)}
                            placeholder="Material name"
                          />
                        </FormField>
                        <FormField label="Percentage (%)">
                          <NumberInput
                            value={item.percentage}
                            onChange={(value) => updateSupplyChainItem(index, 'percentage', value)}
                            label=""
                            min={0}
                            max={100}
                          />
                        </FormField>
                        <FormField label="Country">
                          <Select
                            value={item.country}
                            onValueChange={(value) => updateSupplyChainItem(index, 'country', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormField>
                        <FormField label="Sustainable Source">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.isSustainable}
                              onChange={(e) => updateSupplyChainItem(index, 'isSustainable', e.target.checked)}
                            />
                            Sustainable material source
                          </label>
                        </FormField>
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSupplyChainItem}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Supply Chain Item
                  </Button>
                </div>
              </FormSection>
            </TabsContent>
          </Tabs>

          {/* Tags */}
          <FormSection title="Additional Information">
            <FormField label="Tags">
              <TagInput
                tags={formData.tags}
                onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
                placeholder="Add tags..."
              />
            </FormField>
          </FormSection>

          {/* Form Actions */}
          <FormActions
            onCancel={() => navigate('/finished-products')}
            onSave={handleSubmit}
            isSubmitting={isSubmitting}
            saveLabel={isEditing ? 'Update Product' : 'Create Product'}
          />
        </form>
      </div>
    </div>
  );
};

export default FinishedProductForm;