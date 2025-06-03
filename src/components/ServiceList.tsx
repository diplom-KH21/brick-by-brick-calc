
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceCard from "./ServiceCard";
import { constructionServices, categories } from "@/data/services";
import { Calculator } from "lucide-react";

interface ServiceListProps {
  selectedServices: Record<string, number>;
  onAreaChange: (serviceId: string, area: number) => void;
  onCategoryChange: (categoryId: string) => void;
  onScrollToCategory: (categoryId: string) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  selectedServices,
  onAreaChange,
  onCategoryChange,
  onScrollToCategory,
}) => {
  const [visibleCategory, setVisibleCategory] = useState<string>("");
  const serviceRefs = useRef<Record<string, HTMLDivElement>>({});
  const categoryRefs = useRef<Record<string, HTMLDivElement>>({});

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

  useEffect(() => {
    onScrollToCategory = (categoryId: string) => {
      const categoryRef = categoryRefs.current[categoryId];
      if (categoryRef) {
        categoryRef.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
  }, []);

  // Group services by category
  const servicesByCategory = categories.map(category => ({
    category,
    services: constructionServices.filter(service => service.category === category.id)
  })).filter(group => group.services.length > 0);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Calculator className="mr-3 h-6 w-6" />
          Оберіть послуги
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {servicesByCategory.map(({ category, services }) => (
            <div
              key={category.id}
              ref={(el) => {
                if (el) categoryRefs.current[category.id] = el;
              }}
              data-category-id={category.id}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              </div>
              <div className="space-y-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    area={selectedServices[service.id] || 0}
                    onAreaChange={(area) => onAreaChange(service.id, area)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceList;
