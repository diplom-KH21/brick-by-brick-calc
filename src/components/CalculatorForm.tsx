
import React, { useState, useMemo, useRef } from "react";
import ServiceList, { ServiceListRef } from "./ServiceList";
import CategorySidebar from "./CategorySidebar";
import EstimateSection from "./EstimateSection";
import EstimateTable from "./EstimateTable";
import { formatCurrency } from "@/utils/calculations";
import { generatePDF } from "@/utils/pdfGenerator";
import { constructionServices } from "@/data/services";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const CalculatorForm = () => {
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showEstimate, setShowEstimate] = useState(false);
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement>(null);
  const serviceListRef = useRef<ServiceListRef>(null);

  const handleAreaChange = (serviceId: string, area: number) => {
    const updatedServices = {
      ...selectedServices,
      [serviceId]: area
    };
    
    setSelectedServices(updatedServices);
    
    // Calculate total cost
    const total = Object.entries(updatedServices).reduce((sum, [id, quantity]) => {
      const service = constructionServices.find(s => s.id === id);
      return sum + (service ? service.price * quantity : 0);
    }, 0);
    
    setTotalCost(total);
  };

  const removeService = (serviceId: string) => {
    const updatedServices = { ...selectedServices };
    delete updatedServices[serviceId];
    setSelectedServices(updatedServices);
    
    // Recalculate total cost
    const total = Object.entries(updatedServices).reduce((sum, [id, quantity]) => {
      const service = constructionServices.find(s => s.id === id);
      return sum + (service ? service.price * quantity : 0);
    }, 0);
    
    setTotalCost(total);
  };

  const handleCategoryClick = (categoryId: string) => {
    if (serviceListRef.current) {
      serviceListRef.current.scrollToCategory(categoryId);
    }
  };

  const handleGeneratePDF = () => {
    try {
      const selectedItems = Object.entries(selectedServices)
        .filter(([_, area]) => area > 0);

      if (selectedItems.length === 0) {
        toast({
          title: "Pomylka",
          description: "Oberit' khocja b odnu posluhu dlja formuvannja koshtorysu",
          variant: "destructive",
        });
        return;
      }

      generatePDF(selectedServices, totalCost);

      toast({
        title: "PDF zgenerovano",
        description: "Koshtorys uspishno zavantazheno u formati PDF",
      });

    } catch (error) {
      console.error('Pomylka generaciji PDF:', error);
      toast({
        title: "Pomylka",
        description: "Ne vdalosja zgeneruvaty PDF fajl",
        variant: "destructive",
      });
    }
  };

  const handleGenerateEstimate = () => {
    const selectedItems = Object.entries(selectedServices)
      .filter(([_, area]) => area > 0);

    if (selectedItems.length === 0) {
      toast({
        title: "Помилка",
        description: "Введіть кількість хоча б для однієї послуги",
        variant: "destructive",
      });
      return;
    }

    setShowEstimate(true);
    
    setTimeout(() => {
      estimateRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);

    toast({
      title: "Кошторис сформовано",
      description: `Обрано ${selectedItems.length} послуг на суму ${formatCurrency(totalCost)}`,
    });
  };

  const selectedItemsCount = Object.entries(selectedServices).filter(([_, area]) => area > 0).length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
        <div className="lg:col-span-1">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        <div className="lg:col-span-2">
          <ServiceList
            ref={serviceListRef}
            selectedServices={selectedServices}
            onAreaChange={handleAreaChange}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-4 lg:self-start">
          <EstimateSection
            selectedServices={selectedServices}
            totalCost={totalCost}
            onRemoveService={removeService}
            onGeneratePDF={handleGeneratePDF}
            onGenerateEstimate={handleGenerateEstimate}
          />
        </div>
      </div>

      {/* Mobile sticky estimate button */}
      {totalCost > 0 && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <Button 
            onClick={handleGenerateEstimate}
            className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            size="lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Переглянути кошторис ({selectedItemsCount} послуг) - {formatCurrency(totalCost)}
          </Button>
        </div>
      )}

      <EstimateTable
        ref={estimateRef}
        selectedServices={selectedServices}
        totalCost={totalCost}
        onGeneratePDF={handleGeneratePDF}
      />
    </div>
  );
};

export default CalculatorForm;
