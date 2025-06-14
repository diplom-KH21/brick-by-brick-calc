
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
      className="text-blue-600 border-blue-200 hover:bg-blue-50"
    >
      {isDetecting ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <MapPin className="h-4 w-4 mr-2" />
      )}
      {isDetecting ? "Визначення..." : "Визначити автоматично"}
    </Button>
  );
};

export default LocationDetector;
