
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/calculations";

interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
}

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  area: number;
  onToggle: () => void;
  onAreaChange: (area: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  area,
  onToggle,
  onAreaChange,
}) => {
  return (
    <Card className={`transition-all duration-200 cursor-pointer ${
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggle}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <Label className="text-sm font-medium cursor-pointer" onClick={onToggle}>
              {service.name}
            </Label>
            <div className="text-sm text-gray-600 mb-2">
              {formatCurrency(service.price)} за {service.unit}
            </div>
            
            {isSelected && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={area || ""}
                    onChange={(e) => onAreaChange(parseFloat(e.target.value) || 0)}
                    className="w-20 h-8 text-sm"
                    min="0"
                    step="0.1"
                  />
                  <span className="text-sm text-gray-600">{service.unit}</span>
                </div>
                
                {area > 0 && (
                  <div className="text-sm font-medium text-blue-600">
                    = {formatCurrency(service.price * area)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
