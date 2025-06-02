
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServiceCard from "./ServiceCard";
import { calculateTotal, formatCurrency } from "@/utils/calculations";
import { constructionServices } from "@/data/services";
import { Calculator, FileText } from "lucide-react";

const CalculatorForm = () => {
  const [selectedServices, setSelectedServices] = useState<Record<string, { area: number; selected: boolean }>>({});
  const [totalCost, setTotalCost] = useState(0);

  const handleServiceToggle = (serviceId: string, price: number) => {
    const currentService = selectedServices[serviceId] || { area: 0, selected: false };
    const newSelected = !currentService.selected;
    const newArea = newSelected ? (currentService.area || 1) : currentService.area;
    
    const updatedServices = {
      ...selectedServices,
      [serviceId]: {
        area: newArea,
        selected: newSelected
      }
    };
    
    setSelectedServices(updatedServices);
    setTotalCost(calculateTotal(updatedServices, constructionServices));
  };

  const handleAreaChange = (serviceId: string, area: number, price: number) => {
    const currentService = selectedServices[serviceId] || { area: 0, selected: false };
    
    const updatedServices = {
      ...selectedServices,
      [serviceId]: {
        area: area,
        selected: currentService.selected
      }
    };
    
    setSelectedServices(updatedServices);
    setTotalCost(calculateTotal(updatedServices, constructionServices));
  };

  const handleGenerateEstimate = () => {
    const selectedItems = Object.entries(selectedServices)
      .filter(([_, service]) => service.selected && service.area > 0)
      .map(([serviceId, service]) => {
        const serviceData = constructionServices.find(s => s.id === serviceId);
        return `${serviceData?.name}: ${service.area} ${serviceData?.unit} × ${formatCurrency(serviceData?.price || 0)} = ${formatCurrency((serviceData?.price || 0) * service.area)}`;
      })
      .join('\n');

    console.log('Generated Estimate:');
    console.log(selectedItems);
    console.log(`\nОбщая стоимость: ${formatCurrency(totalCost)}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Services Selection */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Calculator className="mr-3 h-6 w-6" />
              Выберите услуги
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {constructionServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedServices[service.id]?.selected || false}
                  area={selectedServices[service.id]?.area || 0}
                  onToggle={() => handleServiceToggle(service.id, service.price)}
                  onAreaChange={(area) => handleAreaChange(service.id, area, service.price)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <Card className="shadow-lg sticky top-4">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileText className="mr-3 h-5 w-5" />
              Смета проекта
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(selectedServices)
                .filter(([_, service]) => service.selected && service.area > 0)
                .map(([serviceId, service]) => {
                  const serviceData = constructionServices.find(s => s.id === serviceId);
                  const serviceCost = (serviceData?.price || 0) * service.area;
                  return (
                    <div key={serviceId} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="text-sm">
                        <div className="font-medium">{serviceData?.name}</div>
                        <div className="text-gray-500">
                          {service.area} {serviceData?.unit}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {formatCurrency(serviceCost)}
                      </div>
                    </div>
                  );
                })}
            </div>
            
            {totalCost > 0 && (
              <>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-blue-600">{formatCurrency(totalCost)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerateEstimate}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Сформировать смету
                </Button>
              </>
            )}
            
            {totalCost === 0 && (
              <div className="text-center text-gray-500 py-8">
                Выберите услуги для расчета стоимости
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalculatorForm;
