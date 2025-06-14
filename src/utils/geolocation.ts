
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RegionBounds {
  regionId: string;
  latitude: number;
  longitude: number;
  radius: number; // радиус в километрах
}

// Приблизительные координаты городов Украины
const regionCoordinates: RegionBounds[] = [
  { regionId: "dnipro", latitude: 48.4647, longitude: 35.0462, radius: 100 },
  { regionId: "kyiv", latitude: 50.4501, longitude: 30.5234, radius: 150 },
  { regionId: "odesa", latitude: 46.4825, longitude: 30.7233, radius: 100 },
  { regionId: "kharkiv", latitude: 49.9935, longitude: 36.2304, radius: 100 },
  { regionId: "lviv", latitude: 49.8397, longitude: 24.0297, radius: 100 },
];

// Функция для вычисления расстояния между двумя точками (формула гаверсинусов)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Радиус Земли в километрах
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Геолокация не поддерживается браузером'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 минут
      }
    );
  });
}

export function detectRegionByCoordinates(coordinates: Coordinates): string {
  let closestRegion = "dnipro"; // регион по умолчанию
  let minDistance = Infinity;

  regionCoordinates.forEach(region => {
    const distance = calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      region.latitude,
      region.longitude
    );

    if (distance < region.radius && distance < minDistance) {
      minDistance = distance;
      closestRegion = region.regionId;
    }
  });

  return closestRegion;
}
