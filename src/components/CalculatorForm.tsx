
import React, { useState, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceCard from "./ServiceCard";
import CategorySidebar from "./CategorySidebar";
import EstimateSection from "./EstimateSection";
import EstimateTable from "./EstimateTable";
import { formatCurrency } from "@/utils/calculations";
import { generatePDF } from "@/utils/pdfGenerator";
import { constructionServices, categories } from "@/data/services";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CalculatorForm = () => {
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showEstimate, setShowEstimate] = useState(false);
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement>(null);

  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") {
      return constructionServices;
    }
    return constructionServices.filter(service => service.category === selectedCategory);
  }, [selectedCategory]);

  const groupedServices = useMemo(() => {
    if (selectedCategory !== "all") {
      return { [selectedCategory]: filteredServices };
    }
    
    const grouped: Record<string, typeof constructionServices> = {};
    categories.forEach(category => {
      grouped[category.id] = constructionServices.filter(service => service.category === category.id);
    });
    return grouped;
  }, [filteredServices, selectedCategory]);

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
        <div className="lg:col-span-1">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Calculator className="mr-3 h-6 w-6" />
                Оберіть послуги
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(groupedServices).map(([categoryId, services]) => {
                const category = categories.find(c => c.id === categoryId);
                if (!category || services.length === 0) return null;
                
                return (
                  <div key={categoryId} className="space-y-4">
                    <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <ServiceCard
                          key={service.id}
                          service={service}
                          area={selectedServices[service.id] || 0}
                          onAreaChange={(area) => handleAreaChange(service.id, area)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
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
