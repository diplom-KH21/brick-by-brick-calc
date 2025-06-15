
-- Создаем таблицу для хранения цен на услуги
CREATE TABLE public.prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL UNIQUE,
  service_name TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  unit TEXT NOT NULL,
  category TEXT NOT NULL,
  region_id TEXT DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включаем Row Level Security
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;

-- Создаем политику для чтения (все пользователи могут читать цены)
CREATE POLICY "Anyone can view prices" 
  ON public.prices 
  FOR SELECT 
  USING (true);

-- Заполняем таблицу базовыми данными из существующих услуг
INSERT INTO public.prices (service_id, service_name, price, unit, category) VALUES
  ('demolition-walls', 'Демонтаж стін', 150, 'м²', 'demolition'),
  ('demolition-floor', 'Демонтаж підлоги', 80, 'м²', 'demolition'),
  ('demolition-ceiling', 'Демонтаж стелі', 120, 'м²', 'demolition'),
  ('demolition-doors', 'Демонтаж дверей', 200, 'шт', 'demolition'),
  ('demolition-windows', 'Демонтаж вікон', 300, 'шт', 'demolition'),
  ('demolition-tiles', 'Демонтаж плитки', 100, 'м²', 'demolition'),
  ('demolition-electrical', 'Демонтаж електропроводки', 50, 'м.п.', 'demolition'),
  ('demolition-plumbing', 'Демонтаж сантехніки', 80, 'м.п.', 'demolition'),
  ('masonry-bricks', 'Кладка цегли', 800, 'м²', 'masonry'),
  ('masonry-blocks', 'Кладка блоків', 600, 'м²', 'masonry'),
  ('masonry-stone', 'Кладка каменю', 1200, 'м²', 'masonry'),
  ('masonry-reinforcement', 'Армування кладки', 150, 'м²', 'masonry'),
  ('concrete-foundation', 'Заливка фундаменту', 2000, 'м³', 'concrete'),
  ('concrete-floor', 'Бетонна стяжка підлоги', 400, 'м²', 'concrete'),
  ('concrete-walls', 'Бетонні стіни', 1500, 'м³', 'concrete'),
  ('concrete-ceiling', 'Бетонна стеля', 800, 'м²', 'concrete'),
  ('roofing-tiles', 'Покрівля черепицею', 600, 'м²', 'roofing'),
  ('roofing-metal', 'Металева покрівля', 400, 'м²', 'roofing'),
  ('roofing-membrane', 'Мембранна покрівля', 350, 'м²', 'roofing'),
  ('roofing-insulation', 'Утеплення покрівлі', 250, 'м²', 'roofing'),
  ('electrical-wiring', 'Електропроводка', 200, 'м.п.', 'electrical'),
  ('electrical-outlets', 'Установка розеток', 150, 'шт', 'electrical'),
  ('electrical-switches', 'Установка вимикачів', 120, 'шт', 'electrical'),
  ('electrical-lighting', 'Установка освітлення', 300, 'шт', 'electrical'),
  ('electrical-panel', 'Електричний щиток', 2000, 'шт', 'electrical'),
  ('plumbing-pipes', 'Сантехнічні труби', 250, 'м.п.', 'plumbing'),
  ('plumbing-fixtures', 'Сантехніка', 800, 'шт', 'plumbing'),
  ('plumbing-heating', 'Система опалення', 500, 'м.п.', 'plumbing'),
  ('plumbing-water', 'Водопостачання', 300, 'м.п.', 'plumbing'),
  ('finishing-plaster', 'Штукатурка стін', 200, 'м²', 'finishing'),
  ('finishing-paint', 'Фарбування стін', 120, 'м²', 'finishing'),
  ('finishing-wallpaper', 'Шпалери', 150, 'м²', 'finishing'),
  ('finishing-tiles', 'Облицювання плиткою', 400, 'м²', 'finishing'),
  ('finishing-laminate', 'Ламінат', 300, 'м²', 'finishing'),
  ('finishing-parquet', 'Паркет', 800, 'м²', 'finishing'),
  ('insulation-walls', 'Утеплення стін', 300, 'м²', 'insulation'),
  ('insulation-ceiling', 'Утеплення стелі', 250, 'м²', 'insulation'),
  ('insulation-floor', 'Утеплення підлоги', 200, 'м²', 'insulation'),
  ('windows-plastic', 'Пластикові вікна', 3000, 'шт', 'windows'),
  ('windows-wooden', 'Дерев''яні вікна', 5000, 'шт', 'windows'),
  ('doors-interior', 'Міжкімнатні двері', 2500, 'шт', 'doors'),
  ('doors-entrance', 'Вхідні двері', 8000, 'шт', 'doors');

-- Создаем индекс для быстрого поиска по service_id
CREATE INDEX idx_prices_service_id ON public.prices(service_id);

-- Создаем индекс для фильтрации по категории
CREATE INDEX idx_prices_category ON public.prices(category);
