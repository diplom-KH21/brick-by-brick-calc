
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

  // Update category when current index changes
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
          orientation="vertical"
          opts={{
            align: "start",
            loop: false,
          }}
          setApi={(api) => {
            if (api) {
              api.on("select", () => {
                setCurrentIndex(api.selectedScrollSnap());
              });
            }
          }}
        >
          <CarouselContent className="h-96">
            {constructionServices.map((service, index) => {
              const category = categories.find(c => c.id === service.category);
              return (
                <CarouselItem key={service.id}>
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
