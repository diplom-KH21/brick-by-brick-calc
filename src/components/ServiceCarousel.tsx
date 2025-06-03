
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ServiceCard from "./ServiceCard";
import { constructionServices, categories } from "@/data/services";
import { Calculator } from "lucide-react";

interface ServiceCarouselProps {
  selectedServices: Record<string, number>;
  onAreaChange: (serviceId: string, area: number) => void;
  onCategoryChange: (categoryId: string) => void;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({
  selectedServices,
  onAreaChange,
  onCategoryChange,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Обновляем категорию при изменении текущего индекса
  React.useEffect(() => {
    if (constructionServices[currentIndex]) {
      const currentService = constructionServices[currentIndex];
      onCategoryChange(currentService.category);
    }
  }, [currentIndex, onCategoryChange]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Calculator className="mr-3 h-6 w-6" />
          Оберіть послуги ({currentIndex + 1} з {constructionServices.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel 
          className="w-full"
          opts={{
            align: "start",
          }}
          onSelect={(api) => {
            if (api) {
              setCurrentIndex(api.selectedScrollSnap());
            }
          }}
        >
          <CarouselContent>
            {constructionServices.map((service, index) => {
              const category = categories.find(c => c.id === service.category);
              return (
                <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="space-y-4">
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
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default ServiceCarousel;
