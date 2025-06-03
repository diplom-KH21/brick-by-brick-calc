
import React, { useState, useMemo, useRef } from "react";
import ServiceList from "./ServiceList";
import CategorySidebar from "./CategorySidebar";
import EstimateSection from "./EstimateSection";
import EstimateTable from "./EstimateTable";
import { formatCurrency } from "@/utils/calculations";
import { generatePDF } from "@/utils/pdfGenerator";
import { constructionServices } from "@/data/services";
import { useToast } from "@/hooks/use-toast";

const CalculatorForm = () => {
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showEstimate, setShowEstimate] = useState(false);
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 lg:sticky lg:top-4 lg:self-start">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="lg:col-span-2">
          <ServiceList
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
