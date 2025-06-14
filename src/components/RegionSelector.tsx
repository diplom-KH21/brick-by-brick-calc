
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export interface Region {
  id: string;
  name: string;
  priceMultiplier: number;
}

export const regions: Region[] = [
  { id: "dnipro", name: "Дніпро", priceMultiplier: 1.0 },
  { id: "kyiv", name: "Київ", priceMultiplier: 1.4 },
  { id: "odesa", name: "Одеса", priceMultiplier: 1.25 },
  { id: "kharkiv", name: "Харків", priceMultiplier: 1.0 },
  { id: "lviv", name: "Львів", priceMultiplier: 1.05 },
];

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (regionId: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onRegionChange,
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <MapPin className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Оберіть регіон</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <Button
              key={region.id}
              variant={selectedRegion === region.id ? "default" : "outline"}
              size="sm"
              onClick={() => onRegionChange(region.id)}
              className={selectedRegion === region.id 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "hover:bg-blue-50"
              }
            >
              {region.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionSelector;
