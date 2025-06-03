import React, { useState, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import CategorySidebar from "./CategorySidebar";
import { calculateTotal, formatCurrency } from "@/utils/calculations";
import { constructionServices, categories } from "@/data/services";
import { Calculator, FileText, Download, CheckCircle } from "lucide-react";
import jsPDF from 'jspdf';
import { useToast } from "@/hooks/use-toast";

const CalculatorForm = () => {
  const [selectedServices, setSelectedServices] = useState<Record<string, { area: number; selected: boolean }>>({});
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

  const generatePDF = () => {
    try {
      const selectedItems = Object.entries(selectedServices)
        .filter(([_, service]) => service.selected && service.area > 0);

      if (selectedItems.length === 0) {
        toast({
          title: "Pomylka",
          description: "Oberit' khocja b odnu posluhu dlja formuvannja koshtorysu",
          variant: "destructive",
        });
        return;
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Використовуємо базовий шрифт
      pdf.setFont('helvetica');
      
      // Заголовок
      pdf.setFontSize(20);
      pdf.text('KOSHTORYS BUDIVEL\'NYKH ROBIT', 105, 20, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text('Data skladannja: ' + new Date().toLocaleDateString('uk-UA'), 105, 30, { align: 'center' });
      
      // Заголовки таблиці
      pdf.setFontSize(10);
      let yPosition = 50;
      
      pdf.text('Najmenuvannja robit', 15, yPosition);
      pdf.text('Kil\'kist\'', 80, yPosition);
      pdf.text('Od. vymiru', 110, yPosition);
      pdf.text('Cina za od.', 140, yPosition);
      pdf.text('Suma', 170, yPosition);
      
      // Лінія під заголовками
      pdf.line(10, yPosition + 2, 200, yPosition + 2);
      yPosition += 10;
      
      // Дані таблиці
      selectedItems.forEach(([serviceId, service]) => {
        const serviceData = constructionServices.find(s => s.id === serviceId);
        const serviceCost = (serviceData?.price || 0) * service.area;
        
        // Транслітерація назви послуги
        const transliteratedName = transliterate(serviceData?.name || '');
        const transliteratedUnit = transliterate(serviceData?.unit || '');
        
        pdf.text(transliteratedName, 15, yPosition);
        pdf.text(service.area.toString(), 80, yPosition);
        pdf.text(transliteratedUnit, 110, yPosition);
        pdf.text((serviceData?.price || 0).toString() + ' hrn', 140, yPosition);
        pdf.text(serviceCost.toString() + ' hrn', 170, yPosition);
        
        yPosition += 8;
        
        // Перевіряємо, чи потрібна нова сторінка
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
      });
      
      // Лінія перед підсумком
      pdf.line(10, yPosition + 2, 200, yPosition + 2);
      yPosition += 10;
      
      // Загальна сума
      pdf.setFontSize(12);
      pdf.text('ZAGAL\'NA VARTIST\':', 15, yPosition);
      pdf.text(totalCost.toString() + ' hrn', 170, yPosition);
      
      // Примітка
      yPosition += 20;
      pdf.setFontSize(8);
      pdf.text('Prymitka: Koshtorys je poperednim rozrakhunkom.', 15, yPosition);
      pdf.text('Tochna vartist\' robit mozhe vidriznjatysja zalezhno', 15, yPosition + 5);
      pdf.text('vid konkretnykh umov ob\'jekta.', 15, yPosition + 10);

      pdf.save('koshtorys-budivelnykh-robit.pdf');

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

  // Функція транслітерації
  const transliterate = (text: string): string => {
    const map: { [key: string]: string } = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'je',
      'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'ji', 'й': 'j', 'к': 'k', 'л': 'l',
      'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'kh', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'ju', 'я': 'ja',
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Je',
      'Ж': 'Zh', 'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'Ji', 'Й': 'J', 'К': 'K', 'Л': 'L',
      'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
      'Ф': 'F', 'Х': 'Kh', 'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ь': '', 'Ю': 'Ju', 'Я': 'Ja'
    };
    
    return text.split('').map(char => map[char] || char).join('');
  };

  const handleGenerateEstimate = () => {
    const selectedItems = Object.entries(selectedServices)
      .filter(([_, service]) => service.selected && service.area > 0);

    if (selectedItems.length === 0) {
      toast({
        title: "Помилка",
        description: "Оберіть хоча б одну послугу для формування кошторису",
        variant: "destructive",
      });
      return;
    }

    setShowEstimate(true);
    
    // Scroll to estimate after a brief delay to ensure it's rendered
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

  const selectedItems = Object.entries(selectedServices)
    .filter(([_, service]) => service.selected && service.area > 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Sidebar */}
        <div className="lg:col-span-1">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Services Selection */}
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
                          isSelected={selectedServices[service.id]?.selected || false}
                          area={selectedServices[service.id]?.area || 0}
                          onToggle={() => handleServiceToggle(service.id, service.price)}
                          onAreaChange={(area) => handleAreaChange(service.id, area, service.price)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
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
                      <span>Всього:</span>
                      <span className="text-blue-600">{formatCurrency(totalCost)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handleGenerateEstimate}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Сформувати кошторис
                    </Button>
                    
                    <Button 
                      onClick={generatePDF}
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
                  Оберіть послуги для розрахунку вартості
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generated Estimate Section */}
      {showEstimate && selectedItems.length > 0 && (
        <div ref={estimateRef} className="mt-12">
          <Card className="shadow-lg border-2 border-green-200 bg-green-50">
            <CardHeader className="bg-green-100 rounded-t-lg">
              <CardTitle className="flex items-center text-2xl text-green-800">
                <CheckCircle className="mr-3 h-6 w-6" />
                Кошторис будівельних робіт
              </CardTitle>
              <p className="text-green-700">
                Дата складання: {new Date().toLocaleDateString('uk-UA')}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Обрані послуги:</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Найменування робіт</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Кількість</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Од. виміру</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Ціна за од.</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Сума</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map(([serviceId, service]) => {
                        const serviceData = constructionServices.find(s => s.id === serviceId);
                        const serviceCost = (serviceData?.price || 0) * service.area;
                        return (
                          <tr key={serviceId} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 font-medium">
                              {serviceData?.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              {service.area}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              {serviceData?.unit}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              {formatCurrency(serviceData?.price || 0)}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                              {formatCurrency(serviceCost)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-blue-100 font-bold">
                        <td className="border border-gray-300 px-4 py-3" colSpan={4}>
                          ЗАГАЛЬНА ВАРТІСТЬ:
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-lg text-blue-700">
                          {formatCurrency(totalCost)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Примітка:</strong> Кошторис є попереднім розрахунком. Точна вартість робіт може відрізнятися 
                    залежно від конкретних умов об'єкта, складності виконання робіт та ринкових цін на матеріали.
                  </p>
                </div>

                <div className="flex justify-center mt-6">
                  <Button 
                    onClick={generatePDF}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Завантажити кошторис у форматі PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
