
import React, { useState, useMemo, useRef, useEffect } from "react";
import ServiceList, { ServiceListRef } from "./ServiceList";
import CategorySidebar from "./CategorySidebar";
import EstimateSection from "./EstimateSection";
import EstimateTable from "./EstimateTable";
import RegionSelector, { regions } from "./RegionSelector";
import { formatCurrency } from "@/utils/calculations";
import { generatePDFWithData } from "@/utils/pdfGenerator";
import { usePrices } from "@/hooks/usePrices";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, Edit } from "lucide-react";

interface EditData {
  id: string;
  title: string;
  regionId: string;
  selectedServices: Record<string, number>;
  totalCost: number;
}

interface CalculatorFormProps {
  editData?: EditData;
}

const CalculatorForm = ({ editData }: CalculatorFormProps) => {
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>({});
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("dnipro");
  const [showEstimate, setShowEstimate] = useState(false);
  const [editingEstimateId, setEditingEstimateId] = useState<string | null>(null);
  const [editDataLoaded, setEditDataLoaded] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { prices, getPriceByServiceId, loading: pricesLoading } = usePrices();
  const estimateRef = useRef<HTMLDivElement>(null);
  const serviceListRef = useRef<ServiceListRef>(null);

  const currentRegion = regions.find(r => r.id === selectedRegion);
  const priceMultiplier = currentRegion?.priceMultiplier || 1.0;

  // Функция для пересчета стоимости
  const recalculateTotal = (services: Record<string, number>, multiplier: number) => {
    const total = Object.entries(services).reduce((sum, [id, quantity]) => {
      const service = getPriceByServiceId(id);
      return sum + (service ? service.price * quantity * multiplier : 0);
    }, 0);
    setTotalCost(total);
    return total;
  };

  // Загружаем данные для редактирования при монтировании компонента
  useEffect(() => {
    if (editData && !editDataLoaded) {
      console.log('Loading edit data:', editData);
      setSelectedServices(editData.selectedServices);
      setSelectedRegion(editData.regionId);
      setEditingEstimateId(editData.id);
      setEditDataLoaded(true);
      
      toast({
        title: "Режим редагування",
        description: `Завантажено кошторис "${editData.title}" для редагування`,
      });
    }
  }, [editData, editDataLoaded, toast]);

  // Пересчитываем стоимость когда загружены цены или изменились услуги/регион
  useEffect(() => {
    if (!pricesLoading && editDataLoaded && editData) {
      const region = regions.find(r => r.id === editData.regionId);
      const multiplier = region?.priceMultiplier || 1.0;
      recalculateTotal(editData.selectedServices, multiplier);
    }
  }, [pricesLoading, editDataLoaded, editData, getPriceByServiceId]);

  // Добавляем отдельный useEffect для пересчета при изменении selectedServices
  useEffect(() => {
    if (!pricesLoading) {
      recalculateTotal(selectedServices, priceMultiplier);
    }
  }, [selectedServices, priceMultiplier, pricesLoading, getPriceByServiceId]);

  const handleAreaChange = (serviceId: string, area: number) => {
    const updatedServices = {
      ...selectedServices,
      [serviceId]: area
    };
    
    setSelectedServices(updatedServices);
  };

  const removeService = (serviceId: string) => {
    const updatedServices = { ...selectedServices };
    delete updatedServices[serviceId];
    setSelectedServices(updatedServices);
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
    const newRegion = regions.find(r => r.id === regionId);
    const newMultiplier = newRegion?.priceMultiplier || 1.0;
    
    recalculateTotal(selectedServices, newMultiplier);

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

  const handleGeneratePDF = () => {
    try {
      const selectedItems = Object.entries(selectedServices)
        .filter(([_, area]) => area > 0);

      if (selectedItems.length === 0) {
        toast({
          title: "Помилка",
          description: "Оберіть хоча б одну послугу для формування кошторису",
          variant: "destructive",
        });
        return;
      }

      // Prepare services data for PDF generation
      const servicesForPDF = selectedItems.reduce((acc, [serviceId, area]) => {
        const service = getPriceByServiceId(serviceId);
        if (service) {
          acc[serviceId] = area;
        }
        return acc;
      }, {} as Record<string, number>);

      // Prepare services data with adjusted prices
      const servicesData = selectedItems.map(([serviceId, _]) => {
        const service = getPriceByServiceId(serviceId);
        if (service) {
          return {
            service_id: service.service_id,
            service_name: service.service_name,
            price: service.price * priceMultiplier,
            unit: service.unit
          };
        }
        return null;
      }).filter(Boolean) as Array<{ service_id: string; service_name: string; price: number; unit: string; }>;

      generatePDFWithData(servicesForPDF, totalCost, servicesData);

      toast({
        title: "PDF згенеровано",
        description: "Кошторис успішно завантажено у форматі PDF",
      });

    } catch (error) {
      console.error('Помилка генерації PDF:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося згенерувати PDF файл",
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
      {/* Индикатор режима редактирования */}
      {editingEstimateId && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Edit className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">
              Режим редагування кошторису
            </span>
          </div>
          <p className="text-blue-600 text-sm mt-1">
            Ви редагуєте збережений кошторис. Внесіть зміни та збережіть оновлений варіант.
          </p>
        </div>
      )}

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
        </div>
      </div>

      {/* Mobile sticky estimate button */}
      {totalCost > 0 && !showEstimate && (
        <div className="lg:hidden fixed bottom-20 left-4 right-4 z-30">
          <Button 
            onClick={handleGenerateEstimate}
            className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg text-xs py-2.5"
            size="sm"
          >
            <FileText className="mr-2 h-3 w-3" />
            Переглянути кошторис ({selectedItemsCount} послуг) - {formatCurrency(totalCost)}
          </Button>
        </div>
      )}

      {showEstimate && (
        <EstimateTable
          ref={estimateRef}
          selectedServices={selectedServices}
          totalCost={totalCost}
          onGeneratePDF={handleGeneratePDF}
          priceMultiplier={priceMultiplier}
        />
      )}
    </div>
  );
};

export default CalculatorForm;
