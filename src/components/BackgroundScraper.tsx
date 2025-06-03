
import React, { useEffect, useState } from 'react';

interface ScrapedPrice {
  name: string;
  price: number;
  source: string;
}

const BackgroundScraper = () => {
  const [isScrapingActive, setIsScrapingActive] = useState(false);

  // Популярные украинские строительные сайты
  const ukrainianConstructionSites = [
    'https://epicentrk.ua',
    'https://budmagazin.com.ua',
    'https://leroy-merlin.ua',
    'https://novaposhta.ua',
    'https://rozetka.com.ua',
    'https://olx.ua'
  ];

  const scrapeConstructionSites = async () => {
    if (isScrapingActive) return;
    
    setIsScrapingActive(true);
    const scrapedPrices: ScrapedPrice[] = [];

    for (const site of ukrainianConstructionSites) {
      try {
        // Используем публичный CORS прокси для парсинга
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(site)}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.contents) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.contents, 'text/html');
          
          // Селекторы для поиска цен и названий строительных материалов/услуг
          const priceSelectors = [
            '.price', '.cost', '.amount', '[data-price]', 
            '.product-price', '.service-price', '.item-price',
            '.price-current', '.price-value', '.product-cost'
          ];
          
          const nameSelectors = [
            '.title', '.name', '.product-name', '.service-name',
            'h2', 'h3', '.item-title', '[data-name]', '.product-title'
          ];
          
          // Поиск строительных материалов и услуг
          const buildingKeywords = [
            'цемент', 'бетон', 'штукатурка', 'краска', 'клей', 'плитка',
            'кирпич', 'блок', 'профиль', 'гипсокартон', 'утеплитель',
            'ремонт', 'монтаж', 'укладка', 'покраска', 'штукатурные работы'
          ];
          
          priceSelectors.forEach(selector => {
            const priceElements = doc.querySelectorAll(selector);
            priceElements.forEach((element, index) => {
              if (index >= 15) return; // Ограничиваем количество
              
              const priceText = element.textContent?.trim();
              const price = parseFloat(priceText?.replace(/[^\d.,]/g, '')?.replace(',', '.') || '0');
              
              if (price > 0 && price < 100000) { // Разумные пределы цен
                // Ищем название товара/услуги
                let name = 'Строительная услуга';
                const parentElement = element.closest('.product, .service, .item, .card');
                
                if (parentElement) {
                  const nameElement = parentElement.querySelector(nameSelectors.join(', '));
                  const foundName = nameElement?.textContent?.trim();
                  
                  // Проверяем, содержит ли название строительные ключевые слова
                  if (foundName && buildingKeywords.some(keyword => 
                    foundName.toLowerCase().includes(keyword.toLowerCase())
                  )) {
                    name = foundName.substring(0, 100);
                    
                    scrapedPrices.push({
                      name: name,
                      price: price,
                      source: new URL(site).hostname
                    });
                  }
                }
              }
            });
          });
        }
      } catch (error) {
        console.log(`Не удалось получить данные с ${site}:`, error);
      }
      
      // Небольшая пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Группируем и усредняем цены по похожим названиям
    const averagedPrices = calculateAveragePrices(scrapedPrices);
    
    // Здесь можно добавить логику обновления цен в основном списке услуг
    console.log('Получены усредненные цены:', averagedPrices);
    
    setIsScrapingActive(false);
  };

  const calculateAveragePrices = (prices: ScrapedPrice[]): ScrapedPrice[] => {
    const groupedPrices: { [key: string]: number[] } = {};
    
    prices.forEach(item => {
      const normalizedName = item.name.toLowerCase().trim();
      if (!groupedPrices[normalizedName]) {
        groupedPrices[normalizedName] = [];
      }
      groupedPrices[normalizedName].push(item.price);
    });
    
    return Object.entries(groupedPrices).map(([name, priceArray]) => ({
      name: name,
      price: Math.round(priceArray.reduce((sum, price) => sum + price, 0) / priceArray.length),
      source: 'averaged'
    }));
  };

  useEffect(() => {
    // Запускаем парсинг при загрузке компонента
    const timer = setTimeout(() => {
      scrapeConstructionSites();
    }, 3000); // Запуск через 3 секунды после загрузки

    // Периодическое обновление цен (раз в час)
    const interval = setInterval(() => {
      scrapeConstructionSites();
    }, 3600000); // 1 час

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Компонент невидим для пользователя
  return null;
};

export default BackgroundScraper;
