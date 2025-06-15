
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceCard from "./ServiceCard";
import { categories } from "@/data/services";
import { usePrices } from "@/hooks/usePrices";
import { Calculator, Loader2 } from "lucide-react";

interface ServiceListProps {
  selectedServices: Record<string, number>;
  onAreaChange: (serviceId: string, area: number) => void;
  onCategoryChange: (categoryId: string) => void;
  priceMultiplier?: number;
}

export interface ServiceListRef {
  scrollToCategory: (categoryId: string) => void;
}

const ServiceList = forwardRef<ServiceListRef, ServiceListProps>(({
  selectedServices,
  onAreaChange,
  onCategoryChange,
  priceMultiplier = 1.0,
}, ref) => {
  const [visibleCategory, setVisibleCategory] = useState<string>("");
  const categoryRefs = useRef<Record<string, HTMLDivElement>>({});
  const { prices, loading, error } = usePrices();

  useImperativeHandle(ref, () => ({
    scrollToCategory: (categoryId: string) => {
      const categoryRef = categoryRefs.current[categoryId];
      if (categoryRef) {
        categoryRef.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.getAttribute('data-category-id');
            if (categoryId && categoryId !== visibleCategory) {
              setVisibleCategory(categoryId);
              onCategoryChange(categoryId);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCategory, onCategoryChange]);

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Завантаження послуг...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg">
        <CardContent className="text-center py-12">
          <p className="text-red-600">Помилка завантаження: {error}</p>
        </CardContent>
      </Card>
    );
  }

  // Group services by category
  const servicesByCategory = categories.map(category => ({
    category,
    services: prices.filter(service => service.category === category.id)
  })).filter(group => group.services.length > 0);

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="flex items-center text-xl md:text-2xl">
          <Calculator className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
          Оберіть послуги
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6 md:space-y-8">
          {servicesByCategory.map(({ category, services }) => (
            <div
              key={category.id}
              ref={(el) => {
                if (el) categoryRefs.current[category.id] = el;
              }}
              data-category-id={category.id}
              className="space-y-3 md:space-y-4"
            >
              <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
                <span className="text-xl md:text-2xl">{category.icon}</span>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">{category.name}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.service_id}
                    service={service}
                    area={selectedServices[service.service_id] || 0}
                    onAreaChange={(area) => onAreaChange(service.service_id, area)}
                    priceMultiplier={priceMultiplier}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

ServiceList.displayName = "ServiceList";

export default ServiceList;
