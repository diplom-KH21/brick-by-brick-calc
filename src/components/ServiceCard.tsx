
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/calculations";
import { Price } from "@/hooks/usePrices";

interface ServiceCardProps {
  service: Price;
  area: number;
  onAreaChange: (area: number) => void;
  priceMultiplier?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  area,
  onAreaChange,
  priceMultiplier = 1.0,
}) => {
  const adjustedPrice = service.price * priceMultiplier;

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-3 md:p-4">
        <div className="space-y-2 md:space-y-3">
          <Label className="text-xs md:text-sm font-medium leading-tight">
            {service.service_name}
          </Label>
          <div className="text-xs md:text-sm text-gray-600">
            {formatCurrency(adjustedPrice)} за {service.unit}
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
                step="1"
              />
              <span className="text-xs md:text-sm text-gray-600">{service.unit}</span>
            </div>
            
            {area > 0 && (
              <div className="text-xs md:text-sm font-medium text-blue-600">
                = {formatCurrency(adjustedPrice * area)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
