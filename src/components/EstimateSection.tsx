
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from 'lucide-react';
import { formatCurrency } from '@/utils/calculations';

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Обрані послуги
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Обрано послуг: {selectedItemsCount}
          </p>
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <span className="text-lg font-medium">Загальна вартість:</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>

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
