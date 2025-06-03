
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, X } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";
import { constructionServices } from "@/data/services";

interface EstimateSectionProps {
  selectedServices: Record<string, number>;
  totalCost: number;
  onRemoveService: (serviceId: string) => void;
  onGeneratePDF: () => void;
  onGenerateEstimate: () => void;
}

const EstimateSection: React.FC<EstimateSectionProps> = ({
  selectedServices,
  totalCost,
  onRemoveService,
  onGeneratePDF,
  onGenerateEstimate,
}) => {
  return (
    <Card className="shadow-lg sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <FileText className="mr-3 h-5 w-5" />
          Кошторис проекту
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {Object.entries(selectedServices)
            .filter(([_, area]) => area > 0)
            .map(([serviceId, area]) => {
              const serviceData = constructionServices.find(s => s.id === serviceId);
              const serviceCost = (serviceData?.price || 0) * area;
              return (
                <div key={serviceId} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="text-sm flex-1">
                    <div className="font-medium">{serviceData?.name}</div>
                    <div className="text-gray-500">
                      {area} {serviceData?.unit}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">
                      {formatCurrency(serviceCost)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveService(serviceId)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
        
        {totalCost > 0 && (
          <>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Всього:</span>
                <span className="text-blue-600">{formatCurrency(totalCost)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={onGenerateEstimate}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Сформувати кошторис
              </Button>
              
              <Button 
                onClick={onGeneratePDF}
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Завантажити PDF
              </Button>
            </div>
          </>
        )}
        
        {totalCost === 0 && (
          <div className="text-center text-gray-500 py-8">
            Введіть кількість для послуг
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EstimateSection;
