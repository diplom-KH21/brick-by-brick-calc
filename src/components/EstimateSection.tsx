
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, X } from 'lucide-react';
import { formatCurrency } from '@/utils/calculations';
import { usePrices } from '@/hooks/usePrices';

interface EstimateSectionProps {
  selectedServices: Record<string, number>;
  totalCost: number;
  onRemoveService: (serviceId: string) => void;
  onGeneratePDF: () => void;
  onGenerateEstimate: () => void;
  priceMultiplier?: number;
}

const EstimateSection = ({ 
  selectedServices, 
  totalCost, 
  onRemoveService,
  onGeneratePDF,
  onGenerateEstimate,
  priceMultiplier = 1.0
}: EstimateSectionProps) => {
  const { getPriceByServiceId } = usePrices();
  const selectedItemsCount = Object.entries(selectedServices).filter(([_, area]) => area > 0).length;

  if (selectedItemsCount === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Оберіть послуги для створення кошторису</p>
        </CardContent>
      </Card>
    );
  }

  const selectedItems = Object.entries(selectedServices)
    .filter(([_, area]) => area > 0)
    .map(([serviceId, area]) => {
      const service = getPriceByServiceId(serviceId);
      return service ? { service, area } : null;
    })
    .filter(Boolean);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Обрані послуги ({selectedItemsCount})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Список выбранных услуг */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {selectedItems.map(({ service, area }) => {
            const adjustedPrice = service.price * priceMultiplier;
            const serviceCost = adjustedPrice * area;
            
            return (
              <div key={service.service_id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <h4 className="text-sm font-medium text-gray-900 leading-tight">
                      {service.service_name}
                    </h4>
                    <div className="text-xs text-gray-600 mt-1">
                      {area} {service.unit} × {formatCurrency(adjustedPrice)}
                    </div>
                    <div className="text-sm font-semibold text-blue-600 mt-1">
                      {formatCurrency(serviceCost)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveService(service.service_id)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Общая стоимость */}
        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
          <span className="text-lg font-medium">Загальна вартість:</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalCost)}
          </span>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-3">
          <Button
            onClick={onGeneratePDF}
            variant="outline"
            className="w-full text-sm"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Завантажити PDF
          </Button>
          
          <Button
            onClick={onGenerateEstimate}
            className="w-full text-sm"
            variant="default"
            size="sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Переглянути кошторис
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimateSection;
