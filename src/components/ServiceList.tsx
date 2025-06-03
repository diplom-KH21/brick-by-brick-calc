
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceCard from "./ServiceCard";
import { constructionServices, categories } from "@/data/services";
import { Calculator } from "lucide-react";

interface ServiceListProps {
  selectedServices: Record<string, number>;
  onAreaChange: (serviceId: string, area: number) => void;
  onCategoryChange: (categoryId: string) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  selectedServices,
  onAreaChange,
  onCategoryChange,
}) => {
  const [visibleCategory, setVisibleCategory] = useState<string>("");
  const serviceRefs = useRef<Record<string, HTMLDivElement>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceId = entry.target.getAttribute('data-service-id');
            if (serviceId) {
              const service = constructionServices.find(s => s.id === serviceId);
              if (service && service.category !== visibleCategory) {
                setVisibleCategory(service.category);
                onCategoryChange(service.category);
              }
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    Object.values(serviceRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCategory, onCategoryChange]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Calculator className="mr-3 h-6 w-6" />
          Оберіть послуги
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={containerRef}
          className="h-96 overflow-y-auto space-y-6 pr-2"
        >
          {constructionServices.map((service) => {
            const category = categories.find(c => c.id === service.category);
            return (
              <div
                key={service.id}
                ref={(el) => {
                  if (el) serviceRefs.current[service.id] = el;
                }}
                data-service-id={service.id}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
                  <span className="text-2xl">{category?.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{category?.name}</h3>
                </div>
                <ServiceCard
                  service={service}
                  area={selectedServices[service.id] || 0}
                  onAreaChange={(area) => onAreaChange(service.id, area)}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceList;
