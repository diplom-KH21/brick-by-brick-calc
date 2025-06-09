import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Download, Globe, Calculator } from 'lucide-react';

interface ScrapedService {
  name: string;
  price: number;
  unit: string;
  source: string;
}

const WebScraper = () => {
  const [url, setUrl] = useState('https://www.rabotniki.ua/plitochnye-raboty/dnepr');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedService[]>([]);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const { toast } = useToast();

  // Специальная функция для парсинга rabotniki.ua
  const parseRabotnikiUA = (doc: Document): ScrapedService[] => {
    const services: ScrapedService[] = [];
    
    // Ищем элементы с услугами (различные возможные селекторы)
    const serviceSelectors = [
      '.service-item',
      '.price-item', 
      '[data-service]',
      '.work-item',
      '.service-card',
      '.price-card'
    ];
    
    serviceSelectors.forEach(selector => {
      const elements = doc.querySelectorAll(selector);
      elements.forEach((element, index) => {
        const nameElement = element.querySelector('.service-name, .work-name, h3, h4, .title');
        const priceElement = element.querySelector('.price, .cost, .amount, [data-price]');
        
        if (nameElement && priceElement) {
          const name = nameElement.textContent?.trim();
          const priceText = priceElement.textContent?.trim();
          const price = parseFloat(priceText?.replace(/[^\d.,]/g, '')?.replace(',', '.') || '0');
          
          if (name && price > 0 && name.toLowerCase().includes('плитк')) {
            services.push({
              name: name.substring(0, 100),
              price: price,
              unit: 'м²',
              source: 'rabotniki.ua'
            });
          }
        }
      });
    });
    
    // Если не найдено через специальные селекторы, ищем общие паттерны
    if (services.length === 0) {
      const allElements = doc.querySelectorAll('*');
      allElements.forEach(element => {
        const text = element.textContent?.trim() || '';
        
        // Ищем текст, который содержит "плитк" и цену
        if (text.includes('плитк') && text.match(/\d+.*грн/)) {
          const priceMatch = text.match(/(\d+(?:[.,]\d+)?)\s*грн/);
          if (priceMatch) {
            const price = parseFloat(priceMatch[1].replace(',', '.'));
            if (price > 0) {
              services.push({
                name: text.substring(0, 100),
                price: price,
                unit: 'м²',
                source: 'rabotniki.ua'
              });
            }
          }
        }
      });
    }
    
    return services.slice(0, 20); // Ограничиваем результаты
  };

  const scrapeWebsite = async (targetUrl: string) => {
    setIsLoading(true);
    
    try {
      console.log(`Начинаем парсинг: ${targetUrl}`);
      
      // Используем CORS прокси
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data.contents) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        let services: ScrapedService[] = [];
        
        // Специальная обработка для rabotniki.ua
        if (targetUrl.includes('rabotniki.ua')) {
          services = parseRabotnikiUA(doc);
          console.log(`Найдено услуг на rabotniki.ua: ${services.length}`);
        } else {
          // Общий парсинг для других сайтов
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
        }
        
        if (services.length > 0) {
          setScrapedData(prev => [...prev, ...services]);
          
          // Вычисляем среднюю цену
          const totalPrice = services.reduce((sum, service) => sum + service.price, 0);
          const avgPrice = totalPrice / services.length;
          setAveragePrice(avgPrice);
          
          toast({
            title: "Парсинг завершен",
            description: `Найдено ${services.length} услуг. Средняя цена: ${Math.round(avgPrice)} грн/м²`,
          });
        } else {
          toast({
            title: "Данные не найдены",
            description: "На данном сайте не удалось найти информацию о плиточных работах",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Ошибка парсинга:', error);
      toast({
        title: "Ошибка парсинга",
        description: "Не удалось получить данные с указанного сайта",
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
    link.download = 'scraped-tile-services.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    setScrapedData([]);
    setAveragePrice(null);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Globe className="mr-3 h-5 w-5" />
          Парсинг цен на плиточные работы
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">URL сайта для парсинга:</label>
          <div className="flex space-x-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.rabotniki.ua/plitochnye-raboty/dnepr"
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
          <label className="text-sm font-medium">Рекомендуемые сайты для плиточных работ:</label>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUrl('https://www.rabotniki.ua/plitochnye-raboty/dnepr')}
              className="justify-start text-xs"
            >
              rabotniki.ua - Плиточные работы Днепр
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUrl('https://www.rabotniki.ua/plitochnye-raboty/kiev')}
              className="justify-start text-xs"
            >
              rabotniki.ua - Плиточные работы Киев
            </Button>
          </div>
        </div>
        
        {averagePrice && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calculator className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Средняя цена: {Math.round(averagePrice)} грн/м²
              </span>
            </div>
          </div>
        )}
        
        {scrapedData.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Найденные услуги ({scrapedData.length}):</h3>
              <div className="flex space-x-2">
                <Button
                  onClick={exportData}
                  size="sm"
                  variant="outline"
                >
                  <Download className="mr-1 h-3 w-3" />
                  Экспорт
                </Button>
                <Button
                  onClick={clearData}
                  size="sm"
                  variant="outline"
                >
                  Очистить
                </Button>
              </div>
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
          <strong>Примечание:</strong> Парсер адаптирован для поиска плиточных работ на украинских сайтах. 
          Результаты помогут определить среднюю рыночную стоимость услуг.
        </div>
      </CardContent>
    </Card>
  );
};

export default WebScraper;
