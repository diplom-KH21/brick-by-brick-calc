
import { useState, useEffect } from 'react';
import { constructionServices } from '@/data/services';
import { useToast } from '@/hooks/use-toast';

export interface Price {
  id: string;
  service_id: string;
  service_name: string;
  price: number;
  unit: string;
  category: string;
  region_id: string;
  created_at: string;
  updated_at: string;
}

export const usePrices = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPrices = async () => {
    try {
      console.log('Using static data for prices...');
      
      // Конвертируем статические данные в формат Price
      const convertedPrices: Price[] = constructionServices.map(service => ({
        id: service.id,
        service_id: service.id,
        service_name: service.name,
        price: service.price,
        unit: service.unit,
        category: service.category,
        region_id: 'default',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      console.log('Prices loaded successfully:', convertedPrices.length, 'items');
      setPrices(convertedPrices);
      setError(null);
    } catch (err) {
      console.error('Error in fetchPrices:', err);
      setError('Виникла помилка при завантаженні цін');
      toast({
        title: "Помилка",
        description: "Виникла помилка при завантаженні цін",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const getPriceByServiceId = (serviceId: string): Price | undefined => {
    return prices.find(price => price.service_id === serviceId);
  };

  const getPricesByCategory = (category: string): Price[] => {
    return prices.filter(price => price.category === category);
  };

  return {
    prices,
    loading,
    error,
    refetch: fetchPrices,
    getPriceByServiceId,
    getPricesByCategory,
  };
};
