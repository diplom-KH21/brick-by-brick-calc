
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  area: number;
  onAreaChange: (area: number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  area,
  onAreaChange,
}) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-3 md:p-4">
        <div className="space-y-2 md:space-y-3">
          <Label className="text-xs md:text-sm font-medium leading-tight">
            {service.name}
          </Label>
          <div className="text-xs md:text-sm text-gray-600">
            {formatCurrency(service.price)} за {service.unit}
          </div>
          
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="0"
                value={area || ""}
                onChange={(e) => onAreaChange(parseFloat(e.target.value) || 0)}
                className="w-16 md:w-20 h-7 md:h-8 text-xs md:text-sm"
                min="0"
                step="0.1"
              />
              <span className="text-xs md:text-sm text-gray-600">{service.unit}</span>
            </div>
            
            {area > 0 && (
              <div className="text-xs md:text-sm font-medium text-blue-600">
                = {formatCurrency(service.price * area)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
