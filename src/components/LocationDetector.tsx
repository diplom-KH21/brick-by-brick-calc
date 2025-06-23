
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { getCurrentPosition, detectRegionByCoordinates } from "@/utils/geolocation";
import { useToast } from "@/hooks/use-toast";

interface LocationDetectorProps {
  onLocationDetected: (regionId: string) => void;
  isDetecting: boolean;
  onDetectionStart: () => void;
  onDetectionEnd: () => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({
  onLocationDetected,
  isDetecting,
  onDetectionStart,
  onDetectionEnd,
}) => {
  const { toast } = useToast();

  const handleDetectLocation = async () => {
    onDetectionStart();

    try {
      const coordinates = await getCurrentPosition();
      const detectedRegion = detectRegionByCoordinates(coordinates);
      
      onLocationDetected(detectedRegion);
      
      toast({
        title: "Місцезнаходження визначено",
        description: "Регіон автоматично встановлено на основі вашого місцезнаходження",
      });
    } catch (error) {
      console.error('Помилка визначення геолокації:', error);
      
      let errorMessage = "Не вдалося визначити місцезнаходження";
      
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Доступ до геолокації заборонено";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Місцезнаходження недоступне";
            break;
          case error.TIMEOUT:
            errorMessage = "Тайм-аут запиту геолокації";
            break;
        }
      }
      
      toast({
        title: "Помилка геолокації",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      onDetectionEnd();
    }
  };

  return (
    <Button
      onClick={handleDetectLocation}
      variant="outline"
      size="sm"
      disabled={isDetecting}
      className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-2"
    >
      {isDetecting ? (
        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
      ) : (
        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
      )}
      <span className="hidden sm:inline">Визначити автоматично</span>
      <span className="sm:hidden">Автоматично</span>
    </Button>
  );
};

export default LocationDetector;
