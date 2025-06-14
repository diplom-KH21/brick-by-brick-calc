
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, FileText, Calculator } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";
import { constructionServices } from "@/data/services";

interface EstimateSectionProps {
  selectedServices: Record<string, number>;
  totalCost: number;
  onRemoveService: (serviceId: string) => void;
  onGeneratePDF: () => void;
  onGenerateEstimate: () => void;
  priceMultiplier?: number;
}

const EstimateSection: React.FC<EstimateSectionProps> = ({
  selectedServices,
  totalCost,
  onRemoveService,
  onGeneratePDF,
  onGenerateEstimate,
  priceMultiplier = 1.0,
}) => {
  const selectedItems = Object.entries(selectedServices).filter(([_, area]) => area > 0);

  return (
    <Card className="shadow-lg h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <Calculator className="mr-3 h-6 w-6" />
          Кошторис
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Оберіть послуги для розрахунку вартості
          </p>
        ) : (
          <>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {selectedItems.map(([serviceId, area]) => {
                const service = constructionServices.find(s => s.id === serviceId);
                if (!service) return null;
                
                const adjustedPrice = service.price * priceMultiplier;
                
                return (
                  <div key={serviceId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {area} {service.unit} × {formatCurrency(adjustedPrice)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatCurrency(adjustedPrice * area)}
                      </span>
                      <Button
                        onClick={() => onRemoveService(serviceId)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Загальна сума:</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrency(totalCost)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={onGenerateEstimate}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Переглянути кошторис
                </Button>
                
                <Button 
                  onClick={onGeneratePDF}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                >
                  <FileText className="mr-2 h-3 w-3" />
                  Завантажити PDF
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EstimateSection;
