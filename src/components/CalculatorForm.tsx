import React, { useState, useMemo, useRef } from "react";
import ServiceList, { ServiceListRef } from "./ServiceList";
import CategorySidebar from "./CategorySidebar";
import EstimateSection from "./EstimateSection";
import EstimateTable from "./EstimateTable";
import RegionSelector, { regions } from "./RegionSelector";
import { formatCurrency } from "@/utils/calculations";
import { generatePDF } from "@/utils/pdfGenerator";
import { constructionServices } from "@/data/services";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, Save } from "lucide-react";

const CalculatorForm = () => {
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("dnipro");
  const [showEstimate, setShowEstimate] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const estimateRef = useRef<HTMLDivElement>(null);
  const serviceListRef = useRef<ServiceListRef>(null);

  const currentRegion = regions.find(r => r.id === selectedRegion);
  const priceMultiplier = currentRegion?.priceMultiplier || 1.0;

  const handleAreaChange = (serviceId: string, area: number) => {
    const updatedServices = {
      ...selectedServices,
      [serviceId]: area
    };
    
    setSelectedServices(updatedServices);
    
    // Calculate total cost with regional multiplier
    const total = Object.entries(updatedServices).reduce((sum, [id, quantity]) => {
      const service = constructionServices.find(s => s.id === id);
      return sum + (service ? service.price * quantity * priceMultiplier : 0);
    }, 0);
    
    setTotalCost(total);
  };

  const removeService = (serviceId: string) => {
    const updatedServices = { ...selectedServices };
    delete updatedServices[serviceId];
    setSelectedServices(updatedServices);
    
    // Recalculate total cost with regional multiplier
    const total = Object.entries(updatedServices).reduce((sum, [id, quantity]) => {
      const service = constructionServices.find(s => s.id === id);
      return sum + (service ? service.price * quantity * priceMultiplier : 0);
    }, 0);
    
    setTotalCost(total);
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    const newRegion = regions.find(r => r.id === regionId);
    const newMultiplier = newRegion?.priceMultiplier || 1.0;
    
    // Recalculate total cost with new regional multiplier
    const total = Object.entries(selectedServices).reduce((sum, [id, quantity]) => {
      const service = constructionServices.find(s => s.id === id);
      return sum + (service ? service.price * quantity * newMultiplier : 0);
    }, 0);
    
    setTotalCost(total);

    toast({
      title: "Регіон змінено",
      description: `Обрано регіон: ${newRegion?.name}. Ціни оновлено.`,
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    if (serviceListRef.current) {
      serviceListRef.current.scrollToCategory(categoryId);
    }
  };

  const saveEstimate = async () => {
    if (!user) {
      toast({
        title: "Увійдіть в систему",
        description: "Для збереження кошторису потрібно увійти в систему",
        variant: "destructive",
      });
      return;
    }

    const selectedItems = Object.entries(selectedServices)
      .filter(([_, area]) => area > 0);

    if (selectedItems.length === 0) {
      toast({
        title: "Помилка",
        description: "Оберіть хоча б одну послугу для збереження",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_estimates')
        .insert({
          user_id: user.id,
          title: `Кошторис від ${new Date().toLocaleDateString('uk-UA')}`,
          region_id: selectedRegion,
          selected_services: selectedServices,
          total_cost: totalCost
        });

      if (error) {
        toast({
          title: "Помилка",
          description: "Не вдалося зберегти кошторис",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Успіх",
          description: "Кошторис збережено в особистому кабінеті",
        });
      }
    } catch (error) {
      console.error('Error saving estimate:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося зберегти кошторис",
        variant: "destructive",
      });
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
      {/* Region Selector */}
      <RegionSelector
        selectedRegion={selectedRegion}
        onRegionChange={handleRegionChange}
      />

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
            priceMultiplier={priceMultiplier}
          />
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-4 lg:self-start">
          <EstimateSection
            selectedServices={selectedServices}
            totalCost={totalCost}
            onRemoveService={removeService}
            onGeneratePDF={handleGeneratePDF}
            onGenerateEstimate={handleGenerateEstimate}
            priceMultiplier={priceMultiplier}
          />
          
          {/* Save button */}
          {user && totalCost > 0 && (
            <div className="mt-4">
              <Button
                onClick={saveEstimate}
                className="w-full bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <Save className="mr-2 h-4 w-4" />
                Зберегти кошторис
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky estimate button - reduced by 10% and positioned higher */}
      {totalCost > 0 && (
        <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40">
          <div className="space-y-2">
            <Button 
              onClick={handleGenerateEstimate}
              className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg text-sm py-3"
              size="default"
            >
              <FileText className="mr-2 h-4 w-4" />
              Переглянути кошторис ({selectedItemsCount} послуг) - {formatCurrency(totalCost)}
            </Button>
            {user && (
              <Button
                onClick={saveEstimate}
                className="w-full bg-green-600 hover:bg-green-700 shadow-lg text-sm py-2"
                size="sm"
              >
                <Save className="mr-2 h-3 w-3" />
                Зберегти
              </Button>
            )}
          </div>
        </div>
      )}

      <EstimateTable
        ref={estimateRef}
        selectedServices={selectedServices}
        totalCost={totalCost}
        onGeneratePDF={handleGeneratePDF}
        priceMultiplier={priceMultiplier}
      />
    </div>
  );
};

export default CalculatorForm;
