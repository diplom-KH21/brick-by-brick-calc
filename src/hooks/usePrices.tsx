
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      console.log('Fetching prices from database...');
      
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .order('category', { ascending: true })
        .order('service_name', { ascending: true });

      if (error) {
        console.error('Error fetching prices:', error);
        throw error;
      }

      console.log('Prices loaded successfully:', data?.length, 'items');
      setPrices(data || []);
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
