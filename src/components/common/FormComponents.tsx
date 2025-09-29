import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Save, Calendar, MapPin, Users, Package, DollarSign } from 'lucide-react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, required, children, error }) => (
  <div className="space-y-2">
    <Label className={`flex items-center gap-1 ${required ? 'required' : ''}`}>
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, icon, children }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
    </CardContent>
  </Card>
);

interface FormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isSubmitting?: boolean;
  saveLabel?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onSave,
  isSubmitting = false,
  saveLabel = 'Save'
}) => (
  <div className="flex justify-between items-center pt-6 border-t">
    <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
      Cancel
    </Button>
    <Button onClick={onSave} disabled={isSubmitting}>
      <Save className="h-4 w-4 mr-2" />
      {isSubmitting ? 'Saving...' : saveLabel}
    </Button>
  </div>
);

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onTagsChange, placeholder = 'Add tag...' }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, label }) => (
  <FormField label={label}>
    <div className="relative">
      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  </FormField>
);

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  label,
  min = 0,
  max = Infinity,
  step = 1,
  unit
}) => (
  <FormField label={label}>
    <div className="relative">
      {unit && (
        <span className="absolute right-3 top-3 text-sm text-gray-500">{unit}</span>
      )}
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={unit ? 'pr-10' : ''}
      />
    </div>
  </FormField>
);