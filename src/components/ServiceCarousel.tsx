
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ServiceCard from "./ServiceCard";
import { categories } from "@/data/services";
import { usePrices } from "@/hooks/usePrices";
import { Calculator, Loader2 } from "lucide-react";

interface ServiceCarouselProps {
  selectedServices: Record<string, number>;
  onAreaChange: (serviceId: string, area: number) => void;
  onCategoryChange: (categoryId: string) => void;
  priceMultiplier?: number;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({
  selectedServices,
  onAreaChange,
  onCategoryChange,
  priceMultiplier = 1.0,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { prices, loading, error } = usePrices();

  // Update category when current index changes
  React.useEffect(() => {
    if (prices[currentIndex]) {
      const currentService = prices[currentIndex];
      onCategoryChange(currentService.category);
    }
  }, [currentIndex, onCategoryChange, prices]);

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

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Calculator className="mr-3 h-6 w-6" />
          Оберіть послуги ({currentIndex + 1} з {prices.length})
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
            {prices.map((service, index) => {
              const category = categories.find(c => c.id === service.category);
              return (
                <CarouselItem key={service.service_id}>
                  <div className="p-1">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
                        <span className="text-2xl">{category?.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-900">{category?.name}</h3>
                      </div>
                      <ServiceCard
                        service={service}
                        area={selectedServices[service.service_id] || 0}
                        onAreaChange={(area) => onAreaChange(service.service_id, area)}
                        priceMultiplier={priceMultiplier}
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
