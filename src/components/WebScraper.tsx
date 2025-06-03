
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download, Globe } from 'lucide-react';

interface ScrapedService {
  name: string;
  price: number;
  unit: string;
  source: string;
}

const WebScraper = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedService[]>([]);
  const { toast } = useToast();

  // Список популярных украинских строительных сайтов
  const popularSites = [
    'https://budmagazin.com.ua',
    'https://epicentrk.ua',
    'https://nova-poshta.ua',
    'https://leroy-merlin.ua',
    'https://olx.ua'
  ];

  const scrapeWebsite = async (targetUrl: string) => {
    setIsLoading(true);
    
    try {
      // Поскольку прямой парсинг заблокирован CORS политикой браузера,
      // используем публичный CORS прокси для демонстрации
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data.contents) {
        // Парсим HTML содержимое
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        // Примерные селекторы для поиска цен и названий
        // (нужно адаптировать под каждый конкретный сайт)
        const services: ScrapedService[] = [];
        
        // Ищем элементы с ценами (разные варианты селекторов)
        const priceSelectors = [
          '.price', '.cost', '.amount', '[data-price]', 
          '.product-price', '.service-price', '.item-price'
        ];
        
        const nameSelectors = [
          '.title', '.name', '.product-name', '.service-name',
          'h2', 'h3', '.item-title', '[data-name]'
        ];
        
        // Пробуем найти цены
        priceSelectors.forEach(selector => {
          const priceElements = doc.querySelectorAll(selector);
          priceElements.forEach((element, index) => {
            const priceText = element.textContent?.trim();
            const price = parseFloat(priceText?.replace(/[^\d.,]/g, '')?.replace(',', '.') || '0');
            
            if (price > 0 && index < 20) { // Ограничиваем до 20 результатов
              // Пытаемся найти соответствующее название
              let name = 'Услуга';
              const parentElement = element.closest('.product, .service, .item');
              if (parentElement) {
                const nameElement = parentElement.querySelector(nameSelectors.join(', '));
                name = nameElement?.textContent?.trim() || `Услуга ${index + 1}`;
              }
              
              services.push({
                name: name.substring(0, 100), // Ограничиваем длину названия
                price: price,
                unit: 'м²', // По умолчанию
                source: new URL(targetUrl).hostname
              });
            }
          });
        });
        
        if (services.length > 0) {
          setScrapedData(prev => [...prev, ...services.slice(0, 10)]); // Добавляем первые 10
          toast({
            title: "Парсинг завершен",
            description: `Найдено ${services.length} услуг с сайта ${new URL(targetUrl).hostname}`,
          });
        } else {
          toast({
            title: "Данные не найдены",
            description: "На данном сайте не удалось найти подходящие данные о ценах",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Ошибка парсинга:', error);
      toast({
        title: "Ошибка парсинга",
        description: "Не удалось получить данные с указанного сайта. Возможно, сайт блокирует запросы.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrape = () => {
    if (!url.trim()) {
      toast({
        title: "Введите URL",
        description: "Пожалуйста, введите адрес сайта для парсинга",
        variant: "destructive",
      });
      return;
    }
    
    scrapeWebsite(url);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(scrapedData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scraped-services.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Globe className="mr-3 h-5 w-5" />
          Парсинг строительных сайтов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">URL сайта для парсинга:</label>
          <div className="flex space-x-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
            />
            <Button 
              onClick={handleScrape}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? 'Парсинг...' : 'Парсить'}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Популярные сайты:</label>
          <div className="grid grid-cols-1 gap-2">
            {popularSites.map((site, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setUrl(site)}
                className="justify-start text-xs"
              >
                {site}
              </Button>
            ))}
          </div>
        </div>
        
        {scrapedData.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Найденные услуги ({scrapedData.length}):</h3>
              <Button
                onClick={exportData}
                size="sm"
                variant="outline"
              >
                <Download className="mr-1 h-3 w-3" />
                Экспорт
              </Button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {scrapedData.map((service, index) => (
                <div key={index} className="text-xs p-2 bg-gray-50 rounded">
                  <div className="font-medium">{service.name}</div>
                  <div className="text-gray-600">
                    {service.price} грн за {service.unit} ({service.source})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 p-2 bg-yellow-50 rounded">
          <strong>Примечание:</strong> Парсинг работает через публичный CORS прокси и может не работать на всех сайтах. 
          Для производственного использования рекомендуется использовать серверный парсинг.
        </div>
      </CardContent>
    </Card>
  );
};

export default WebScraper;
